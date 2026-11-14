#!/usr/bin/env node
// Lists every page a visitor can reach from the home page's navigation and footer, on the same site.
// Usage: node tools/discover.mjs <slug> <home url>   ->  captures/_sitemaps/<slug>.json
// Menus that open on hover or click are opened first, so their links count too. Only menu triggers are
// clicked, and requests that are not reads are aborted, so nothing is submitted.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { requireSlug } from "./lib.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const USAGE = "usage: node tools/discover.mjs <slug> <home url>";
const slug = requireSlug(process.argv[2], USAGE);
const home = process.argv[3];
if (!home) {
  console.error(USAGE);
  process.exit(2);
}

/** Runs in the page: links inside the header, nav and footer, with the region each was found in. */
function readLinks() {
  const regionOf = (el) => {
    // A hidden link has no box: its position would read as the top of the page and count as navigation.
    if (el.getClientRects().length === 0 && !el.closest("footer,[role=contentinfo],header,nav,[role=banner],[role=navigation]")) return null;
    if (el.closest("footer,[role=contentinfo]")) return "footer";
    if (el.closest("header,nav,[role=banner],[role=navigation],[role=menu],[role=dialog],[data-radix-popper-content-wrapper]")) return "nav";
    // Sites built without landmark elements: fall back to where the link sits on the page.
    const top = el.getBoundingClientRect().top + scrollY;
    if (top < 140) return "nav";
    if (top > document.documentElement.scrollHeight - 900) return "footer";
    return null;
  };
  return [...document.querySelectorAll("a[href]")]
    .map((a) => ({ href: a.href, text: (a.innerText || a.getAttribute("aria-label") || "").trim().replace(/\s+/g, " ").slice(0, 60), region: regionOf(a) }))
    .filter((link) => link.region);
}

const browser = await chromium.launch();
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, serviceWorkers: "block" });
  let clicking = false;
  await context.route("**/*", (route) => (!clicking || /^(GET|HEAD|OPTIONS)$/.test(route.request().method()) ? route.continue() : route.abort()));
  const page = await context.newPage();
  await page.goto(home, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(3000);
  const origin = new URL(page.url()).origin;
  const found = new Map();
  const collect = async () => {
    for (const link of await page.evaluate(readLinks)) {
      let url;
      try {
        url = new URL(link.href);
      } catch {
        continue;
      }
      if (url.origin !== origin || !/^https?:$/.test(url.protocol)) continue;
      const key = url.origin + url.pathname.replace(/\/$/, "");
      const entry = found.get(key) ?? { url: key || origin, text: link.text, regions: [] };
      if (!entry.text) entry.text = link.text;
      if (!entry.regions.includes(link.region)) entry.regions.push(link.region);
      found.set(key, entry);
    }
  };
  await collect();

  // Open each top-level menu trigger in the header: hover first, click if hovering opened nothing.
  const triggers = page.locator("header button, nav button, header [aria-haspopup], nav [aria-haspopup]");
  const count = Math.min(await triggers.count(), 24);
  for (let index = 0; index < count; index += 1) {
    const trigger = triggers.nth(index);
    if (!(await trigger.isVisible().catch(() => false))) continue;
    const before = found.size;
    await trigger.hover({ timeout: 2000 }).catch(() => {});
    await page.waitForTimeout(500);
    await collect();
    if (found.size === before && (await trigger.getAttribute("aria-expanded").catch(() => null)) !== null) {
      const url = page.url();
      clicking = true;
      await trigger.click({ timeout: 2000 }).catch(() => {});
      await page.waitForTimeout(500);
      if (page.url() !== url) {
        await page.goto(home, { waitUntil: "load", timeout: 60000 });
        await page.waitForTimeout(1500);
        continue;
      }
      await collect();
      await page.keyboard.press("Escape").catch(() => {});
    }
  }
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
  await page.waitForTimeout(1500);
  await collect();

  const pages = [...found.values()].sort((a, b) => a.url.localeCompare(b.url));
  const out = join(root, "captures", "_sitemaps");
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, `${slug}.json`), JSON.stringify({ slug, home, origin, discoveredAt: new Date().toISOString(), pages }, null, 1));
  console.log(`${slug}: ${pages.length} pages (nav ${pages.filter((p) => p.regions.includes("nav")).length}, footer ${pages.filter((p) => p.regions.includes("footer")).length})`);
} finally {
  await browser.close();
}
