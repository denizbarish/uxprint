#!/usr/bin/env node
// Pixel comparison of a print's reference screens against the originals.
//
//   node tools/compare.mjs <slug> [--screen <id>] [--url http://localhost:4311] [--port 4311] [--threshold 16]
//
// Without --url it serves apps/web/out itself. The screen list comes from
// apps/web/src/references/<slug>/registry.json. A screen is compared with
//   capture: a viewport screenshot under captures/<slug>/ (1440x900), and/or
//   capturePhone: the same at 390x844 (wins over the survey at phone width), and/or
//   survey:  the full-page screenshots under captures/_survey/<slug>/<page>/ at 1440 and 390.
// Similarity is the share of pixels whose largest channel difference is below the threshold (16/255).
// Boxes marked [data-compare-mask] in the reference are left out; where one page is taller than the
// other, the extra rows count as different. Results:
//   apps/web/src/references/<slug>/compare.json   scores (published with the gallery)
//   apps/web/public/_originals/<slug>/            originals for the local side-by-side view (gitignored)
//   captures/<slug>/_compare/                     diff images

import { createReadStream, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const slug = args.find((arg, index) => !arg.startsWith("--") && !args[index - 1]?.startsWith("--"));
const option = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};

if (!slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
  console.error("Usage: node tools/compare.mjs <slug> [--screen <id>] [--url <base>] [--port 4311] [--threshold 16]");
  process.exit(1);
}

const threshold = Number(option("threshold", "16"));
const registryFile = join(root, "apps/web/src/references", slug, "registry.json");
if (!existsSync(registryFile)) {
  console.error(`No reference screens for "${slug}" (${registryFile} is missing).`);
  process.exit(1);
}
const registry = JSON.parse(readFileSync(registryFile, "utf8"));
const print = JSON.parse(readFileSync(join(root, "prints", slug, "print.json"), "utf8"));
const only = option("screen", "");
const screens = registry.screens.filter((screen) => (screen.capture || screen.capturePhone || screen.survey) && (!only || screen.id === only));
const MAX_HEIGHT = 12000;
const originalsDir = join(root, "apps/web/public/_originals", slug);
mkdirSync(originalsDir, { recursive: true });
const outDir = join(root, "captures", slug, "_compare");
mkdirSync(outDir, { recursive: true });

const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".json": "application/json", ".txt": "text/plain", ".md": "text/markdown", ".svg": "image/svg+xml", ".png": "image/png" };

/** Minimal static server for the export: directories resolve to index.html. */
function serve(dir, port) {
  const server = createServer((request, response) => {
    const path = decodeURIComponent(new URL(request.url ?? "/", "http://x").pathname);
    let file = normalize(join(dir, path));
    if (!file.startsWith(dir)) return response.writeHead(403).end();
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
    if (!existsSync(file)) return response.writeHead(404).end("Not found");
    response.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
    createReadStream(file).pipe(response);
  });
  return new Promise((done, fail) => {
    server.once("error", fail);
    server.listen(port, "127.0.0.1", () => done(server));
  });
}

async function rawRgb(input) {
  const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
}

let server;
let base = option("url", "");
if (!base) {
  const dir = join(root, "apps/web/out");
  if (!existsSync(dir)) {
    console.error("apps/web/out is missing. Run: pnpm --filter uxprint build && pnpm --filter web build");
    process.exit(1);
  }
  const port = Number(option("port", "4311"));
  server = await serve(dir, port);
  base = `http://127.0.0.1:${port}`;
}

const browser = await chromium.launch();
const results = [];

/** Compares two screenshots of the same width; returns the score and a diff image. */
async function compare(originalInput, shot, masks) {
  const original = await rawRgb(originalInput);
  const reference = await rawRgb(shot);
  if (original.width !== reference.width) return { note: `width ${reference.width} vs ${original.width}` };
  const width = original.width;
  const shared = Math.min(original.height, reference.height);
  const height = Math.max(original.height, reference.height);
  const masked = new Uint8Array(width * shared);
  for (const box of masks) {
    for (let y = Math.max(0, box.y); y < Math.min(shared, box.y + box.h); y++) {
      for (let x = Math.max(0, box.x); x < Math.min(width, box.x + box.w); x++) masked[y * width + x] = 1;
    }
  }
  const diff = Buffer.alloc(width * shared * 3);
  let counted = (height - shared) * width;
  let same = 0;
  for (let i = 0; i < width * shared; i++) {
    const o = i * 3;
    if (masked[i]) {
      diff[o] = 90;
      diff[o + 1] = 120;
      diff[o + 2] = 200;
      continue;
    }
    counted++;
    const delta = Math.max(
      Math.abs(original.data[o] - reference.data[o]),
      Math.abs(original.data[o + 1] - reference.data[o + 1]),
      Math.abs(original.data[o + 2] - reference.data[o + 2]),
    );
    if (delta < threshold) {
      same++;
      const faded = 200 + Math.round(((original.data[o] + original.data[o + 1] + original.data[o + 2]) / 3) * 0.2);
      diff[o] = faded;
      diff[o + 1] = faded;
      diff[o + 2] = faded;
    } else {
      diff[o] = 230;
      diff[o + 1] = 30;
      diff[o + 2] = 30;
    }
  }
  return {
    similarity: (same / counted) * 100,
    heights: `${reference.height} vs ${original.height}`,
    diff: sharp(diff, { raw: { width, height: shared, channels: 3 } }).png(),
  };
}

try {
  for (const screen of screens) {
    const jobs = [
      ...(screen.capture ? [{ kind: "desktop", width: 1440, height: 900, full: false, file: join(root, "captures", slug, screen.capture) }] : []),
      // A viewport capture shows the exact state of the screen, so it wins over the survey at desktop width.
      ...(screen.survey && !screen.capture ? [{ kind: "desktop", width: 1440, height: 900, full: true, file: join(root, "captures", "_survey", slug, screen.survey, "full-1440.png") }] : []),
      ...(screen.capturePhone ? [{ kind: "phone", width: 390, height: 844, full: false, file: join(root, "captures", slug, screen.capturePhone) }] : []),
      ...(screen.survey && !screen.capturePhone ? [{ kind: "phone", width: 390, height: 844, full: true, file: join(root, "captures", "_survey", slug, screen.survey, "full-390.png") }] : []),
    ];
    for (const job of jobs) {
      const row = { screen: screen.id, kind: job.kind };
      results.push(row);
      if (!existsSync(job.file)) {
        row.note = "original missing";
        continue;
      }
      const context = await browser.newContext({ viewport: { width: job.width, height: job.height }, deviceScaleFactor: 1 });
      try {
        const page = await context.newPage();
        await page.goto(`${base}/ref/${slug}/${screen.id}/?brand=${encodeURIComponent(print.name)}`, { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);
        if (job.full) {
          // Scroll through once so scroll-revealed sections are in their final state.
          const total = await page.evaluate(() => document.documentElement.scrollHeight);
          for (let y = 0; y < Math.min(total, MAX_HEIGHT); y += 800) {
            await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
            await page.waitForTimeout(120);
          }
          await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
        }
        // Let measured entrance animations finish.
        await page.waitForTimeout(900);
        const masks = await page.$$eval("[data-compare-mask]", (nodes) =>
          nodes.map((node) => {
            const box = node.getBoundingClientRect();
            return { x: Math.floor(box.left), y: Math.floor(box.top + scrollY), w: Math.ceil(box.width), h: Math.ceil(box.height) };
          }),
        );
        const fullHeight = Math.min(await page.evaluate(() => document.documentElement.scrollHeight), MAX_HEIGHT);
        const shot = await page.screenshot({
          caret: "hide",
          animations: "disabled",
          ...(job.full ? { fullPage: true, clip: { x: 0, y: 0, width: job.width, height: fullHeight } } : {}),
        });
        const outcome = await compare(job.file, shot, masks);
        if (outcome.note) {
          row.note = outcome.note;
          continue;
        }
        row.similarity = outcome.similarity;
        row.heights = outcome.heights;
        await outcome.diff.toFile(join(outDir, `${screen.id}-${job.kind}-diff.png`));
        await sharp(shot).toFile(join(outDir, `${screen.id}-${job.kind}-reference.png`));
        await sharp(job.file).jpeg({ quality: 82 }).toFile(join(originalsDir, `${screen.id}-${job.kind}.jpg`));
      } catch (error) {
        row.note = error.message.split("\n")[0].slice(0, 120);
      } finally {
        await context.close();
      }
    }
  }
} finally {
  await browser.close();
  server?.close();
}

// Scores are merged, so --screen updates one entry and keeps the rest.
const scoresFile = join(root, "apps/web/src/references", slug, "compare.json");
const scores = existsSync(scoresFile) ? JSON.parse(readFileSync(scoresFile, "utf8")) : {};
for (const row of results) {
  if (row.similarity === undefined) continue;
  scores[row.screen] = { ...scores[row.screen], [row.kind]: Math.round(row.similarity * 100) / 100 };
}
for (const id of Object.keys(scores)) if (!registry.screens.some((screen) => screen.id === id)) delete scores[id];
writeFileSync(scoresFile, JSON.stringify(scores, null, 2) + "\n");

const rows = results.map((row) => [row.screen, row.kind, row.similarity === undefined ? `n/a (${row.note})` : `${row.similarity.toFixed(2)}%`, row.heights ?? ""]);
const header = ["screen", "width", "similarity", "height (ours vs original)"];
const widths = header.map((title, index) => Math.max(title.length, ...rows.map((row) => String(row[index]).length)));
const line = (cells) => `| ${cells.map((cell, index) => String(cell).padEnd(widths[index])).join(" | ")} |`;
console.log(line(header));
console.log(line(widths.map((width) => "-".repeat(width))));
for (const row of rows) console.log(line(row));
console.log(`\nThreshold ${threshold}/255 per channel. Diffs: ${join("captures", slug, "_compare")}/`);
