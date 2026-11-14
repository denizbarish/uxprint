#!/usr/bin/env node
// Visits every page in captures/_sitemaps/<slug>.json and records what is needed to group pages into
// templates and to compare a rebuilt screen with the original: full-page screenshots at 1440 and 390,
// plus a structural outline. Output: captures/_survey/<slug>/ (local only, never published).
// Usage: node tools/survey.mjs <slug>
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";
import { pageNames, requireSlug } from "./lib.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const slug = requireSlug(process.argv[2], "usage: node tools/survey.mjs <slug>");
const sitemapFile = join(root, "captures", "_sitemaps", `${slug}.json`);
if (!existsSync(sitemapFile)) {
  console.error(`run tools/discover.mjs ${slug} <home url> first`);
  process.exit(2);
}
const sitemap = JSON.parse(readFileSync(sitemapFile, "utf8"));
const MAX_HEIGHT = 12000;

/** Runs in the page: the outline of the page, block by block, without any of its text. */
function readOutline() {
  const visible = (el) => {
    const box = el.getBoundingClientRect();
    return box.width > 0 && box.height > 0 && getComputedStyle(el).visibility !== "hidden";
  };
  // Descend to the element whose children are the page's sections.
  let container = document.querySelector("main") ?? document.body;
  for (let depth = 0; depth < 6; depth += 1) {
    const tall = [...container.children].filter((child) => visible(child) && child.getBoundingClientRect().height > 80);
    if (tall.length >= 3 || tall.length === 0) break;
    container = tall.sort((a, b) => b.getBoundingClientRect().height - a.getBoundingClientRect().height)[0];
  }
  const blocks = [...container.children].filter((child) => visible(child) && child.getBoundingClientRect().height > 80).slice(0, 40).map((block) => {
    const box = block.getBoundingClientRect();
    const heading = block.querySelector("h1,h2,h3");
    const headingStyle = heading && getComputedStyle(heading);
    // Columns: the largest group of similar-sized siblings sharing one row.
    let columns = 1;
    for (const parent of block.querySelectorAll("*")) {
      if (parent.children.length < 2 || parent.children.length > 8) continue;
      const boxes = [...parent.children].map((child) => child.getBoundingClientRect()).filter((b) => b.width > 120 && b.height > 80);
      if (boxes.length >= 2 && boxes.every((b) => Math.abs(b.top - boxes[0].top) < 4)) columns = Math.max(columns, boxes.length);
    }
    return {
      height: Math.round(box.height),
      heading: heading ? `${heading.tagName.toLowerCase()} ${headingStyle.fontSize}/${headingStyle.fontWeight}` : null,
      columns,
      media: block.querySelectorAll("img,video,canvas,picture").length,
      paragraphs: block.querySelectorAll("p,li").length,
      controls: block.querySelectorAll("a[class],button").length,
      fields: block.querySelectorAll("input,textarea,select").length,
      tables: block.querySelectorAll("table").length,
      background: getComputedStyle(block).backgroundColor,
    };
  });
  const h1 = document.querySelector("h1");
  const h1Style = h1 && getComputedStyle(h1);
  return {
    height: document.documentElement.scrollHeight,
    h1: h1 ? { size: h1Style.fontSize, weight: h1Style.fontWeight, align: h1Style.textAlign, top: Math.round(h1.getBoundingClientRect().top + scrollY) } : null,
    words: (document.body.innerText || "").split(/\s+/).length,
    counts: { h2: document.querySelectorAll("h2").length, media: document.querySelectorAll("img,video,canvas").length, fields: document.querySelectorAll("input:not([type=hidden]),textarea,select").length, tables: document.querySelectorAll("table").length, code: document.querySelectorAll("pre").length },
    hasSidebar: !!document.querySelector("aside, nav[aria-label*=doc i], [class*=sidebar i]"),
    blocks,
  };
}

async function settle(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < Math.min(height, MAX_HEIGHT); y += 800) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await page.waitForTimeout(140);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(600);
}

async function shoot(page, path) {
  const height = Math.min(await page.evaluate(() => document.documentElement.scrollHeight), MAX_HEIGHT);
  const width = page.viewportSize().width;
  await page.screenshot({ path, fullPage: true, clip: { x: 0, y: 0, width, height } });
}

const outRoot = join(root, "captures", "_survey", slug);
mkdirSync(outRoot, { recursive: true });
const urls = sitemap.pages.map((entry) => entry.url);
// The home page goes first so it is named "home".
urls.sort((a, b) => new URL(a).pathname.length - new URL(b).pathname.length);
const names = pageNames(urls);
const seen = new Set();
const results = [];
const browser = await chromium.launch();
try {
  for (const [index, url] of urls.entries()) {
    const name = names[index];
    const dir = join(outRoot, name);
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    try {
      const page = await context.newPage();
      const response = await page.goto(url, { waitUntil: "load", timeout: 60000 });
      await page.waitForTimeout(2500);
      const final = new URL(page.url());
      const finalKey = final.origin + final.pathname.replace(/\/$/, "");
      if (final.origin !== sitemap.origin) {
        results.push({ name, url, skipped: `redirects off-site to ${final.origin}` });
      } else if (seen.has(finalKey)) {
        results.push({ name, url, skipped: `same page as ${finalKey}` });
      } else if (response && response.status() >= 400) {
        results.push({ name, url, skipped: `status ${response.status()}` });
      } else {
        seen.add(finalKey);
        mkdirSync(dir, { recursive: true });
        await settle(page);
        const outline = await page.evaluate(readOutline);
        await shoot(page, join(dir, "full-1440.png"));
        await page.setViewportSize({ width: 390, height: 844 });
        await page.waitForTimeout(700);
        await settle(page);
        await shoot(page, join(dir, "full-390.png"));
        await sharp(join(dir, "full-1440.png")).resize({ width: 360 }).extract({ left: 0, top: 0, width: 360, height: Math.min(900, Math.round(Math.min(outline.height, MAX_HEIGHT) / 4)) }).png().toFile(join(dir, "thumb.png"));
        results.push({ name, url, finalUrl: finalKey, regions: sitemap.pages.find((entry) => entry.url === url)?.regions, ...outline });
      }
    } catch (error) {
      results.push({ name, url, skipped: `failed: ${error.message.split("\n")[0].slice(0, 160)}` });
    }
    await context.close();
    const last = results.at(-1);
    console.log(`${slug}/${name}: ${last.skipped ?? `height=${last.height} blocks=${last.blocks.length}`}`);
    writeFileSync(join(outRoot, "index.json"), JSON.stringify({ slug, origin: sitemap.origin, surveyedAt: new Date().toISOString(), pages: results }, null, 1));
  }
} finally {
  await browser.close();
}
