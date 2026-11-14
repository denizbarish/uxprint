---
name: uxprint-record
description: Use inside a checkout of the uxprint repository when asked to record a new platform (the user gives one or more URLs) or to refresh an existing print. Covers capture, measurement and writing print.json.
---

# Record a platform as a print

Needs the uxprint repository, Node 20 or newer, `pnpm install`, and Craft Anything (`craft-anything-cli` on PATH, or its path in `CRAFT_ANYTHING_CLI`).

## Steps

1. Choose the pages: home, pricing, one long-form page (docs or changelog), log in and sign up. Only public pages. Never create an account, and never type anything into a form except a malformed email.
2. Capture, measure and condense, with the same URL list each time:
   ```
   node tools/capture.mjs <slug> <url> [url...]
   node tools/measure.mjs <slug> <url> [url...]
   node tools/draft.mjs <slug>
   ```
   `captures/<slug>/` now holds, per page, screenshots at 1440, 768 and 390, opened menus (`states/`), readable tiles (`tiles/`), `capture.json` and `measure.json`; plus `draft.json` across pages.
3. Read `draft.json` and each `measure.json`, and look at the tiles and `screen-*.png` files. Screenshots show layout and intent; numbers come from the JSON.
4. Write `prints/<slug>/print.json` to the schema in `packages/uxprint/src/schema.ts`. `prints/linear/print.json` is the worked example.
5. Check it: `pnpm --filter uxprint build && node packages/uxprint/dist/cli.js validate`, then read `node packages/uxprint/dist/cli.js show <slug>` as an agent would.

## Where each section comes from

| Section | Source |
| --- | --- |
| color, radius, shadow, spacing | `draft.json` `design`, ranked by use; `measure.json` `rootVariables` for the platform's own scale |
| typography | `measure.json` `type` (size, weight, line height, tracking, features) and `fonts` |
| components and states | `measure.json` `controls`: `base` is the resting style, `states` holds the forced hover, focus-visible and active differences |
| motion | `measure.json` `transitions`, `keyframes`, `animations`, and duration or easing variables in `rootVariables` |
| flows | `measure.json` `steps` on log in and sign up pages, with the `screen-*.png` files |
| libraries.detected | `measure.json` `libraries` (signature and file) and `libraryHints` (attributes on rendered elements) |
| layout | `capture.json` `layouts` and the tiles |

## Rules

- Copy values exactly. Convert `rgb()` to hex for colour tokens; change nothing else.
- Write only what was measured or seen. Where something was not observed, say so in the record (`motion.unmeasured`, `flows[].notRecorded`, or the token's `use`). A guess presented as a measurement is the worst defect a print can have.
- Rename hashed keyframes (`TZTsQG_scaleIn`) to plain kebab-case names; keep the CSS body unchanged.
- Describe screens generically. Do not paste the platform's copy beyond a short quoted label that shows a pattern, and never store its logo, images or code in the repository. `captures/` is gitignored and stays local.
- Mark weak library evidence as weak (a bare word in a script is weaker than an attribute on a rendered element).
- If a site blocks the capture, record what was reachable and report the rest; do not work around bot protection.
