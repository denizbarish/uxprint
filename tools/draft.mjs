#!/usr/bin/env node
// Condenses captures/<slug>/ into captures/<slug>/draft.json (measured values, ranked by use)
// and cuts the long screenshots into readable tiles. A print is written from these, by hand.
// Usage: node tools/draft.mjs <slug>
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { requireSlug } from "./lib.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const slug = requireSlug(process.argv[2], "usage: node tools/draft.mjs <slug>");
const base = join(root, "captures", slug);
if (!existsSync(join(base, "pages.json"))) {
  console.error("usage: node tools/draft.mjs <slug>   (run tools/capture.mjs first)");
  process.exit(2);
}

const { pages, capturedAt } = JSON.parse(readFileSync(join(base, "pages.json"), "utf8"));
const DESIGN_KEYS = ["fonts", "font_sizes", "font_weights", "text_colors", "backgrounds", "radii", "shadows", "spacing", "max_widths"];
const totals = Object.fromEntries(DESIGN_KEYS.map((key) => [key, new Map()]));
const controls = new Map();
const draftPages = [];

async function tile(source, outDir, width, tileHeight, maxTiles) {
  if (!existsSync(source)) return [];
  const { width: pixelWidth, height } = await sharp(source).metadata();
  const scale = pixelWidth / width;
  mkdirSync(outDir, { recursive: true });
  const files = [];
  for (let index = 0; index < maxTiles && index * tileHeight * scale < height; index += 1) {
    const out = join(outDir, `${width}-${index + 1}.png`);
    const top = Math.round(index * tileHeight * scale);
    await sharp(source)
      .extract({ left: 0, top, width: pixelWidth, height: Math.min(Math.round(tileHeight * scale), height - top) })
      .toFile(out);
    files.push(out);
  }
  return files;
}

for (const page of pages.filter((entry) => entry.captured)) {
  const dir = join(base, page.name);
  const capture = JSON.parse(readFileSync(join(dir, "capture.json"), "utf8"));

  for (const key of DESIGN_KEYS) {
    for (const { value, count } of capture.design?.[key] ?? []) {
      totals[key].set(value, (totals[key].get(value) ?? 0) + count);
    }
  }

  // Buttons, links and fields grouped by their measured look: height, type and colours.
  for (const node of capture.outline ?? []) {
    if (!["button", "a", "input", "textarea", "select"].includes(node.tag) || !node.text || node.box.h < 16 || node.box.h > 72) continue;
    const key = [node.tag, `h${node.box.h}`, node.font, node.color, node.background ?? "none"].join(" | ");
    const entry = controls.get(key) ?? { count: 0, examples: [] };
    entry.count += 1;
    if (entry.examples.length < 3) entry.examples.push(`${node.text.slice(0, 40)} (w${node.box.w})`);
    controls.set(key, entry);
  }

  rmSync(join(dir, "tiles"), { recursive: true, force: true });
  const statesFile = join(dir, "states", "states.json");
  draftPages.push({
    name: page.name,
    url: page.url,
    title: capture.title,
    headings: (capture.headings ?? []).slice(0, 30),
    headingSizes: capture.layouts?.[0]?.type,
    breakpoints: capture.breakpoints ?? [],
    layoutBlocks: Object.fromEntries((capture.layouts ?? []).map((layout) => [layout.width, layout.blocks.slice(0, 40)])),
    states: existsSync(statesFile) ? JSON.parse(readFileSync(statesFile, "utf8")).states.map(({ kind, label, file, changed }) => ({ kind, label, changed, file: file ? join(dir, "states", file) : undefined })) : [],
    a11y: capture.a11y,
    tiles: [...(await tile(join(dir, "screenshot-1440.png"), join(dir, "tiles"), 1440, 1600, 6)), ...(await tile(join(dir, "screenshot-390.png"), join(dir, "tiles"), 390, 1600, 3))],
    noise: ["noise-1440.png", "noise-768.png", "noise-390.png"].map((file) => join(dir, file)).filter((file) => existsSync(file)),
  });
}

const ranked = (map, limit) => [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([value, count]) => ({ value, count }));
const draft = {
  slug,
  capturedAt: capturedAt.slice(0, 10),
  widths: [1440, 768, 390],
  design: Object.fromEntries(DESIGN_KEYS.map((key) => [key, ranked(totals[key], 30)])),
  controls: [...controls.entries()].sort((a, b) => b[1].count - a[1].count).slice(0, 40).map(([look, entry]) => ({ look, ...entry })),
  pages: draftPages,
};
writeFileSync(join(base, "draft.json"), JSON.stringify(draft, null, 1));
console.log(`${slug}: draft.json written, ${draftPages.length} pages, ${draftPages.reduce((sum, page) => sum + page.tiles.length, 0)} tiles`);
