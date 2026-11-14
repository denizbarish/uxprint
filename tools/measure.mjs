#!/usr/bin/env node
// Measures what a screenshot cannot show: motion, control states, type detail, forms and library hints.
// Reads the page's served code and styles (deep mode); nothing it reads is published.
// Usage: node tools/measure.mjs <slug> <url> [url...]   ->  captures/<slug>/<page>/measure.json
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { pageNames, requireSlug } from "./lib.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const USAGE = "usage: node tools/measure.mjs <slug> <url> [url...]";
const [slugArg, ...urls] = process.argv.slice(2);
const slug = requireSlug(slugArg, USAGE);
if (urls.length === 0) {
  console.error(USAGE);
  process.exit(2);
}

const STATE_PROPS = [
  "color", "backgroundColor", "backgroundImage", "borderTopColor", "borderTopWidth", "borderRadius", "boxShadow",
  "opacity", "transform", "filter", "outlineColor", "outlineWidth", "outlineOffset", "outlineStyle", "textDecorationLine",
];
const BASE_PROPS = [
  ...STATE_PROPS, "height", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "gap", "fontSize", "fontWeight",
  "lineHeight", "letterSpacing", "cursor", "transitionProperty", "transitionDuration", "transitionTimingFunction", "transitionDelay",
];

// Strings that survive minification, one or more per library. Evidence is the matched text and the file it was in.
const LIBRARY_SIGNATURES = [
  ["React", "react", "UI runtime", /react\.transitional\.element|react\.element|__reactFiber\$/],
  ["Next.js", "next", "Framework", /__NEXT_DATA__|next\/dist\/|__next_f/],
  ["Base UI", "@base-ui/react", "Unstyled accessible primitives", /data-base-ui-|Base UI:/],
  ["Radix UI", "radix-ui", "Unstyled accessible primitives", /data-radix-|@radix-ui\//],
  ["Headless UI", "@headlessui/react", "Unstyled accessible primitives", /data-headlessui-state|headlessui-/],
  ["React Aria", "react-aria-components", "Unstyled accessible primitives", /data-rac\b|react-aria-/],
  ["Floating UI", "@floating-ui/react", "Popover and tooltip positioning", /data-floating-ui-|floating-ui/],
  ["Motion", "motion", "Animation: layout, presence, springs", /data-framer-appear-id|framerAppearId|data-projection-id|AnimatePresence/],
  ["GSAP", "gsap", "Timeline animation", /GreenSock|gsap\.registerPlugin|ScrollTrigger/],
  ["Lenis", "lenis", "Smooth scrolling", /lenis-smooth|lenis-scrolling|"lenis"/],
  ["three.js", "three", "WebGL scenes", /THREE\.WebGLRenderer|WebGLRenderer/],
  ["Rive", "@rive-app/canvas", "Interactive vector animation", /@rive-app|rive\.wasm|RiveFile/],
  ["Lottie", "lottie-web", "After Effects animation playback", /bodymovin|lottie-web|"lottie"/],
  ["Vaul", "vaul", "Bottom-sheet drawer", /data-vaul-drawer|vaul-drawer/],
  ["cmdk", "cmdk", "Command menu", /cmdk-item|cmdk-input|\[cmdk-/],
  ["Sonner", "sonner", "Toasts", /data-sonner-toast/],
  ["Embla Carousel", "embla-carousel-react", "Carousel", /embla__|EmblaCarousel|emblaApi/],
  ["Swiper", "swiper", "Carousel", /swiper-slide|swiper-wrapper/],
  ["ProseMirror", "prosemirror-view", "Rich text editing", /ProseMirror/],
  ["MobX", "mobx", "State", /\[MobX\]|\[mobx\]/],
  ["TanStack Query", "@tanstack/react-query", "Server state", /No QueryClient set/],
  ["Shiki", "shiki", "Code highlighting", /shiki/],
  ["Prism", "prismjs", "Code highlighting", /Prism\.languages|prismjs/],
  ["styled-components", "styled-components", "Styling", /styled-components|data-styled/],
  ["Emotion", "@emotion/react", "Styling", /data-emotion|@emotion\//],
  ["StyleX", "@stylexjs/stylex", "Styling", /stylex/],
];

/** Runs in the page: everything readable without interacting. */
function readPage({ BASE_PROPS }) {
  const describe = (el) => {
    const text = (el.innerText || el.getAttribute("aria-label") || el.getAttribute("placeholder") || "").trim().replace(/\s+/g, " ").slice(0, 40);
    return `${el.tagName.toLowerCase()}${el.getAttribute("role") ? `[role=${el.getAttribute("role")}]` : ""}${text ? ` "${text}"` : ""}`;
  };
  const visible = (el) => {
    const box = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    return box.width > 4 && box.height > 4 && style.visibility !== "hidden" && style.display !== "none";
  };
  const pick = (el, props) => {
    const style = getComputedStyle(el);
    return Object.fromEntries(props.map((prop) => [prop, style[prop]]));
  };

  // Transitions, grouped by what animates and how.
  const transitions = new Map();
  for (const el of document.querySelectorAll("body *")) {
    const style = getComputedStyle(el);
    if (!style.transitionDuration.split(",").some((part) => parseFloat(part) > 0)) continue;
    const key = [style.transitionProperty, style.transitionDuration, style.transitionTimingFunction, style.transitionDelay].join(" | ");
    const entry = transitions.get(key) ?? { count: 0, examples: [] };
    entry.count += 1;
    if (entry.examples.length < 4 && visible(el)) entry.examples.push(describe(el));
    transitions.set(key, entry);
  }

  // Keyframes from every stylesheet the page lets us read; unreadable ones are fetched outside.
  const keyframes = [];
  const unreadableSheets = [];
  const walk = (rules) => {
    for (const rule of rules) {
      if (rule instanceof CSSKeyframesRule) keyframes.push({ name: rule.name, css: rule.cssText.replace(/\s+/g, " ").slice(0, 700) });
      else if (rule.cssRules) walk(rule.cssRules);
    }
  };
  for (const sheet of document.styleSheets) {
    try {
      walk(sheet.cssRules);
    } catch {
      if (sheet.href) unreadableSheets.push(sheet.href);
    }
  }

  // Type detail for text elements: the capture has size and weight, this adds line height and tracking.
  const type = new Map();
  for (const el of document.querySelectorAll("h1,h2,h3,h4,h5,p,li,a,button,label,input,code,small,figcaption,td,th")) {
    if (!visible(el) || !(el.innerText || el.value || "").trim()) continue;
    const style = getComputedStyle(el);
    const key = [style.fontSize, style.fontWeight, style.lineHeight, style.letterSpacing, style.fontFamily.split(",")[0].replace(/"/g, ""), style.textTransform, style.fontFeatureSettings, style.fontVariationSettings].join(" | ");
    const entry = type.get(key) ?? { count: 0, tags: new Set(), colors: new Set(), example: describe(el) };
    entry.count += 1;
    entry.tags.add(el.tagName.toLowerCase());
    entry.colors.add(style.color);
    type.set(key, entry);
  }

  // Controls, one per distinct look, tagged so states can be forced on them from outside.
  const controls = [];
  const seen = new Set();
  let id = 0;
  for (const el of document.querySelectorAll("[data-uxprint-id]")) el.removeAttribute("data-uxprint-id");
  for (const el of document.querySelectorAll('a,button,input,textarea,select,summary,[role=button],[role=tab],[role=switch],[role=menuitem],[role=checkbox],[role=radio],[role=link],[tabindex="0"]')) {
    if (!visible(el)) continue;
    const base = pick(el, BASE_PROPS);
    const signature = [el.tagName, el.getAttribute("role"), el.type, base.height, base.fontSize, base.fontWeight, base.color, base.backgroundColor, base.borderRadius, base.paddingLeft, base.boxShadow].join("|");
    if (seen.has(signature) || controls.length >= 70) continue;
    seen.add(signature);
    el.setAttribute("data-uxprint-id", String(id));
    const box = el.getBoundingClientRect();
    controls.push({
      id: id++,
      element: describe(el),
      type: el.getAttribute("type") ?? undefined,
      disabled: el.disabled === true || el.getAttribute("aria-disabled") === "true" || undefined,
      width: Math.round(box.width),
      hasIcon: !!el.querySelector("svg,img") || undefined,
      base,
    });
  }

  // Tag each visible form so the caller can find the same element again; a DOM index would count hidden forms too.
  const forms = [...document.querySelectorAll("form")].filter(visible).map((form, index) => ({
    tag: (form.setAttribute("data-uxprint-form", String(index)), index),
    action: form.getAttribute("action") ? "set" : "none",
    fields: [...form.querySelectorAll("input,textarea,select")].filter((field) => field.type !== "hidden").map((field) => ({
      tag: field.tagName.toLowerCase(),
      type: field.type,
      name: field.name || undefined,
      autocomplete: field.autocomplete || undefined,
      inputmode: field.inputMode || undefined,
      required: field.required || undefined,
      placeholder: field.placeholder || undefined,
      label: (field.labels?.[0]?.innerText || field.getAttribute("aria-label") || "").trim() || undefined,
    })),
    buttons: [...form.querySelectorAll("button,[type=submit]")].filter(visible).map(describe),
  }));

  // Hints the DOM gives about the libraries behind it.
  const attributeNames = new Set();
  const classHints = new Set();
  for (const el of document.querySelectorAll("*")) {
    for (const attribute of el.attributes) {
      if (/^data-(radix|base-ui|framer|motion|headlessui|state|slot|sonner|vaul|cmdk|rac|reach|floating-ui|lenis|scroll|aos|swiper|embla|tippy|popper|rive|lottie)/.test(attribute.name)) attributeNames.add(attribute.name.replace(/-_?[a-z0-9]*\d[a-z0-9_:-]*$/i, ""));
    }
    if (typeof el.className === "string") for (const hint of el.className.match(/\b(swiper|embla|splide|lenis|gsap|aos|simplebar|tippy|sonner|cmdk|vaul)[\w-]*/g) ?? []) classHints.add(hint);
    if (el.id && /^(base-ui-|radix-|headlessui-|react-aria)/.test(el.id)) attributeNames.add(`id^=${el.id.match(/^[a-z-]+/)[0]}`);
  }
  const globals = ["__NEXT_DATA__", "next", "__NUXT__", "__remixContext", "__staticRouterHydrationData", "gsap", "ScrollTrigger", "Lenis", "THREE", "lottie", "rive", "Swiper", "jQuery", "Alpine", "htmx", "__framer_importFromPackage", "Webflow", "Shopify", "__SVELTEKIT__", "___gatsby", "__ASTRO__", "React", "Vue", "Stimulus", "Turbo"].filter((name) => name in window);

  return {
    title: document.title,
    scrollHeight: document.documentElement.scrollHeight,
    transitions: [...transitions.entries()].sort((a, b) => b[1].count - a[1].count).slice(0, 40).map(([key, entry]) => {
      const [property, duration, easing, delay] = key.split(" | ");
      return { property, duration, easing, delay, ...entry };
    }),
    keyframes,
    unreadableSheets,
    type: [...type.entries()].sort((a, b) => b[1].count - a[1].count).slice(0, 45).map(([key, entry]) => {
      const [fontSize, fontWeight, lineHeight, letterSpacing, family, textTransform, fontFeatureSettings, fontVariationSettings] = key.split(" | ");
      return { fontSize, fontWeight, lineHeight, letterSpacing, family, textTransform, fontFeatureSettings, fontVariationSettings, count: entry.count, tags: [...entry.tags], colors: [...entry.colors].slice(0, 4), example: entry.example };
    }),
    controls,
    forms,
    fonts: [...new Set([...document.fonts].filter((font) => font.status === "loaded").map((font) => `${font.family.replace(/"/g, "")} ${font.weight} ${font.style}`))],
    libraryHints: { attributes: [...attributeNames].sort(), classes: [...classHints].sort().slice(0, 30), globals, generator: document.querySelector("meta[name=generator]")?.content },
    rootVariables: [...document.styleSheets].flatMap((sheet) => {
      try {
        return [...sheet.cssRules].filter((rule) => rule.selectorText === ":root" || rule.selectorText === "html").flatMap((rule) => [...rule.style].filter((name) => name.startsWith("--")).map((name) => [name, rule.style.getPropertyValue(name).trim().slice(0, 80)]));
      } catch {
        return [];
      }
    }).slice(0, 400),
  };
}

/** Runs in the page: running animations at the current scroll position. */
function readAnimations() {
  return document.getAnimations().map((animation) => {
    const timing = animation.effect?.getComputedTiming?.() ?? {};
    const target = animation.effect?.target;
    return {
      kind: animation.constructor.name,
      name: animation.animationName ?? animation.transitionProperty ?? animation.id ?? "",
      target: target ? `${target.tagName.toLowerCase()}${target.getAttribute?.("role") ? `[role=${target.getAttribute("role")}]` : ""}` : "",
      duration: timing.duration,
      delay: timing.delay,
      easing: animation.effect?.getTiming?.().easing,
      iterations: timing.iterations === Infinity ? "infinite" : timing.iterations,
      direction: timing.direction,
      fill: timing.fill,
      keyframes: (animation.effect?.getKeyframes?.() ?? []).map(({ offset, easing, composite, computedOffset, ...properties }) => ({ offset, easing, ...properties })).slice(0, 8),
    };
  });
}

/** Runs in the page: what the form says after a submit it refused. */
function readMessages() {
  const native = [...document.querySelectorAll("input,textarea,select")].filter((field) => field.willValidate && !field.validity.valid).map((field) => ({ field: field.name || field.type, native: field.validationMessage }));
  const custom = [...document.querySelectorAll('[role=alert],[aria-live],[aria-invalid=true],[class*=error i]')].map((el) => (el.innerText || "").trim().slice(0, 120)).filter(Boolean);
  return { native, custom: [...new Set(custom)].slice(0, 8) };
}

const browser = await chromium.launch();
const names = pageNames(urls);
try {
  for (const [index, url] of urls.entries()) {
    const name = names[index];
    const dir = join(root, "captures", slug, name);
    mkdirSync(dir, { recursive: true });
    // Service workers are blocked because their requests bypass routing, and the write guard below relies on it.
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, serviceWorkers: "block" });
    try {
    // Write guard: off while the page loads and is read, switched on for good at the first interaction with a
    // form. From then on every request that is not a read is aborted and no new socket opens, in every page
    // of the context (popups included), so a late or debounced submit cannot reach the site either.
    const writes = { guarding: false, blocked: [] };
    await context.route("**/*", (route) => {
      const method = route.request().method();
      if (!writes.guarding || method === "GET" || method === "HEAD" || method === "OPTIONS") return route.continue();
      writes.blocked.push(method);
      return route.abort();
    });
    await context.routeWebSocket("**/*", (socket) => {
      if (writes.guarding) socket.close();
      else socket.connectToServer();
    });
    const page = await context.newPage();
    const scripts = new Map();
    page.on("response", (response) => {
      if (response.request().resourceType() === "script") scripts.set(response.url(), response.text().catch(() => ""));
    });
    await page.goto(url, { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(3500);

    // Elements parked off-state below the fold (hidden or shifted) are scroll reveals; note them before scrolling.
    await page.evaluate(() => {
      let id = 0;
      for (const el of document.querySelectorAll("main *, section *")) {
        const style = getComputedStyle(el);
        const box = el.getBoundingClientRect();
        if (box.top < innerHeight || box.width < 40 || box.height < 20) continue;
        if (parseFloat(style.opacity) < 1 || style.transform !== "none" || style.filter !== "none" || style.clipPath !== "none") {
          el.setAttribute("data-uxprint-reveal", JSON.stringify({ id: id++, opacity: style.opacity, transform: style.transform, filter: style.filter, clipPath: style.clipPath }));
          if (id >= 60) break;
        }
      }
    });

    const animations = new Map();
    const collect = async () => {
      for (const animation of await page.evaluate(readAnimations)) {
        const key = [animation.kind, animation.name, animation.target, animation.duration, animation.easing].join("|");
        if (!animations.has(key)) animations.set(key, animation);
      }
    };
    await collect();
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < Math.min(height, 16000); y += 450) {
      await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
      await page.waitForTimeout(220);
      await collect();
    }
    await page.waitForTimeout(1200);
    const reveals = await page.evaluate(() =>
      [...document.querySelectorAll("[data-uxprint-reveal]")].map((el) => {
        const before = JSON.parse(el.getAttribute("data-uxprint-reveal"));
        const style = getComputedStyle(el);
        const after = { opacity: style.opacity, transform: style.transform, filter: style.filter, clipPath: style.clipPath };
        const changed = Object.keys(after).filter((key) => after[key] !== before[key]);
        return changed.length
          ? { element: el.tagName.toLowerCase(), from: Object.fromEntries(changed.map((key) => [key, before[key]])), to: Object.fromEntries(changed.map((key) => [key, after[key]])), transition: `${style.transitionProperty} ${style.transitionDuration} ${style.transitionTimingFunction} ${style.transitionDelay}`, animation: style.animationName !== "none" ? `${style.animationName} ${style.animationDuration} ${style.animationTimingFunction}` : undefined }
          : null;
      }).filter(Boolean),
    );
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(400);

    /** Runs one interaction under the write guard and returns the methods it had to abort. */
    const withoutWrites = async (interaction) => {
      writes.guarding = true;
      const from = writes.blocked.length;
      await interaction();
      return writes.blocked.slice(from);
    };

    const cdp = await context.newCDPSession(page);
    await cdp.send("DOM.enable");
    await cdp.send("CSS.enable");

    /** Reads the page as it stands: styles, control states (forced, nothing is clicked) and what an empty submit shows. */
    const snapshot = async (label) => {
      await page.screenshot({ path: join(dir, `screen-${label}.png`) });
      const read = await page.evaluate(readPage, { BASE_PROPS });
      const { root: documentNode } = await cdp.send("DOM.getDocument", { depth: 0 });
      for (const control of read.controls) {
        const { nodeId } = await cdp.send("DOM.querySelector", { nodeId: documentNode.nodeId, selector: `[data-uxprint-id="${control.id}"]` }).catch(() => ({ nodeId: 0 }));
        if (!nodeId) continue;
        control.states = {};
        for (const [state, pseudo] of [["hover", ["hover"]], ["focus-visible", ["focus", "focus-visible"]], ["active", ["hover", "active"]]]) {
          await cdp.send("CSS.forcePseudoState", { nodeId, forcedPseudoClasses: pseudo });
          // Wait out the control's own transition so the settled value is read.
          const longest = (list) => Math.max(...list.split(",").map((part) => parseFloat(part) * (part.includes("ms") ? 1 : 1000)), 0);
          const wait = Math.min(900, longest(control.base.transitionDuration) + longest(control.base.transitionDelay) + 80);
          await page.waitForTimeout(wait);
          const now = await page.evaluate(({ id, props }) => {
            const el = document.querySelector(`[data-uxprint-id="${id}"]`);
            if (!el) return null;
            const style = getComputedStyle(el);
            return Object.fromEntries(props.map((prop) => [prop, style[prop]]));
          }, { id: control.id, props: STATE_PROPS });
          const diff = now && Object.fromEntries(Object.entries(now).filter(([prop, value]) => value !== control.base[prop]));
          if (diff && Object.keys(diff).length) control.states[state] = diff;
        }
        await cdp.send("CSS.forcePseudoState", { nodeId, forcedPseudoClasses: [] });
      }

      // Nothing is typed here and write requests are aborted, so no account or message is ever created.
      read.validation = [];
      for (const form of read.forms) {
        if (form.fields.length === 0) continue;
        // Only an explicit submit control: an untyped button inside a form is often a social sign-in.
        const submit = page.locator(`form[data-uxprint-form="${form.tag}"]`).locator("button[type=submit], input[type=submit]").first();
        if (!(await submit.isVisible().catch(() => false))) continue;
        const before = page.url();
        const blocked = await withoutWrites(async () => {
          await submit.click({ timeout: 3000 }).catch(() => {});
          await page.waitForTimeout(900);
        });
        if (page.url() !== before) {
          // The click moved to another page (or another site): the tags and ids set above are gone, so go back and stop.
          read.validation.push({ form: form.tag, stayedOnPage: false, leftSite: new URL(page.url()).origin !== new URL(before).origin });
          await page.goto(before, { waitUntil: "load", timeout: 60000 });
          await page.waitForTimeout(1500);
          break;
        }
        // With a blocked request the page accepted the empty form; any message on screen is a network error, not validation.
        read.validation.push({ form: form.tag, stayedOnPage: true, ...(blocked.length ? { acceptedEmpty: true, blockedRequests: blocked } : { messages: await page.evaluate(readMessages) }) });
        await page.screenshot({ path: join(dir, `screen-${label}-empty-submit.png`) });
      }
      return read;
    };

    const data = await snapshot("initial");

    // Keyframes in stylesheets the page could not read (cross-origin): fetch the text and pull them out.
    for (const href of data.unreadableSheets.slice(0, 12)) {
      try {
        const css = await (await context.request.get(href)).text();
        for (const match of css.matchAll(/@keyframes\s+([\w-]+)\s*\{((?:[^{}]*\{[^{}]*\})*)[^{}]*\}/g)) {
          data.keyframes.push({ name: match[1], css: match[0].replace(/\s+/g, " ").slice(0, 700) });
        }
      } catch {}
    }
    data.keyframes = [...new Map(data.keyframes.map((entry) => [entry.name, entry])).values()].slice(0, 120);

    // Sign-in and sign-up screens: open the email path and record what it asks for and how it rejects bad input.
    const steps = [];
    if (/(^|\/)(log[-_]?in|sign[-_]?in|sign[-_]?up|register)(\/|$)/i.test(new URL(url).pathname)) {
      const trigger = page.getByRole("button", { name: /email/i }).or(page.getByRole("link", { name: /email/i })).first();
      if (await trigger.isVisible().catch(() => false)) {
        const label = (await trigger.innerText()).trim();
        // The trigger may itself send something (a button that mails a link), so it runs under the guard too.
        await withoutWrites(async () => {
          await trigger.click();
          await page.waitForTimeout(1500);
        });
        const step = await snapshot("email");
        let invalid;
        const field = page.locator('input[type=email], input[name*=email i], input[autocomplete=email]').first();
        if (await field.isVisible().catch(() => false)) {
          await field.fill("not-an-email");
          const blocked = await withoutWrites(async () => {
            await field.press("Enter");
            await page.waitForTimeout(1200);
          });
          invalid = { typed: "not-an-email", stayedOnPage: new URL(page.url()).pathname === new URL(url).pathname, ...(blocked.length ? { acceptedInvalid: true, blockedRequests: blocked } : { messages: await page.evaluate(readMessages) }) };
          await page.screenshot({ path: join(dir, "screen-email-invalid.png") });
        }
        steps.push({ action: `Click "${label}"`, url: page.url(), forms: step.forms, controls: step.controls, validation: step.validation, invalid });
      }
    }

    // Libraries: signature strings in the scripts the page loaded, plus Tailwind's variables in its styles.
    const libraries = new Map();
    for (const [scriptUrl, body] of scripts) {
      const text = await body;
      for (const [libraryName, npm, purpose, pattern] of LIBRARY_SIGNATURES) {
        if (libraries.has(libraryName)) continue;
        const match = text.match(pattern);
        if (match) libraries.set(libraryName, { name: libraryName, npm, purpose, evidence: `"${match[0]}" in ${new URL(scriptUrl).pathname.split("/").pop()}` });
      }
    }
    if (await page.evaluate(() => [...document.querySelectorAll("*")].slice(0, 400).some((el) => getComputedStyle(el).getPropertyValue("--tw-ring-shadow") !== "" || getComputedStyle(el).getPropertyValue("--tw-border-style") !== ""))) {
      libraries.set("Tailwind CSS", { name: "Tailwind CSS", npm: "tailwindcss", purpose: "Styling", evidence: "--tw-* custom properties on rendered elements" });
    }

    writeFileSync(join(dir, "measure.json"), JSON.stringify({ url, measuredAt: new Date().toISOString(), viewport: [1440, 900], ...data, animations: [...animations.values()].slice(0, 80), reveals, steps, libraries: [...libraries.values()], scriptCount: scripts.size }, null, 1));
    console.log(`${slug}/${name}: transitions=${data.transitions.length} keyframes=${data.keyframes.length} animations=${animations.size} reveals=${reveals.length} controls=${data.controls.length} forms=${data.forms.length} steps=${steps.length}`);
    } catch (error) {
      console.log(`${slug}/${name}: failed: ${error.message.split("\n")[0].slice(0, 200)}`);
    }
    await context.close();
  }
} finally {
  await browser.close();
}
