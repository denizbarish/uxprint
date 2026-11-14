# uxprint

UI/UX prints of well-designed platforms, ready for AI coding agents.

A print is the measured record of one platform's interface: colour, type, spacing, radius, shadow, layout, components with their hover, active and focus states, motion (durations, easings, keyframes), flows such as sign up and log in, and the libraries the platform ships. An agent reads it as `DESIGN.md` and builds to it.

## Use a print

```
npx @denizbarish/uxprint list                 # what is available (--json for machines)
npx @denizbarish/uxprint add linear           # writes DESIGN.md into the current project
npx @denizbarish/uxprint show linear --json   # the structured record
```

`add` links `DESIGN.md` from `AGENTS.md` and `CLAUDE.md` when the project has them, so Claude Code, Codex, Cursor and other agents pick it up.

### MCP

```json
{ "mcpServers": { "uxprint": { "command": "npx", "args": ["-y", "@denizbarish/uxprint", "mcp"] } } }
```

Tools: `list_prints` (optional `query`) and `get_print` (`slug`, `format`: `design-md` or `json`).

### Claude Code plugin

The `plugin/` folder is a Claude Code plugin: the MCP server plus two skills, `uxprint-apply` (build to a print) and `uxprint-record` (record a new platform). The repository root is its marketplace.

## What a print is, and is not

- Values are measured in a real browser and copied without rounding.
- What could not be observed is marked as such: screens behind an account, script-driven animation.
- A print reproduces a system, not a brand. No logo, copy, image or application code of the platform is stored or published; what a print keeps is measurements, plus the platform's `@keyframes` rules so motion can be reproduced exactly. The platform's name appears as a label. The gallery previews are rebuilt with neutral content.

## Repository

| Path | What |
| --- | --- |
| `prints/<slug>/print.json` | The records |
| `packages/uxprint` | Schema, `DESIGN.md` renderer, CLI and MCP server (the npm package) |
| `apps/web` | The gallery: browse prints, live previews, libraries, send to agent |
| `tools/` | Page discovery, survey, capture (Craft Anything), measurement (Playwright), draft and pixel comparison |
| `plugin/` | Claude Code plugin |

## Record a platform

```
pnpm install
node tools/discover.mjs <slug> <home url>
node tools/survey.mjs <slug>
node tools/capture.mjs <slug> <url> [url...]
node tools/measure.mjs <slug> <url> [url...]
node tools/draft.mjs <slug>
```

`discover` lists every page reachable from the navigation and the footer, `survey` takes a full-page screenshot and an outline of each. Pages are then grouped into templates (`templates` in `print.json`), and at least one reference screen is built per template.

Then write `prints/<slug>/print.json` from `captures/<slug>/` and run `pnpm validate`. `plugin/skills/uxprint-record/SKILL.md` has the full method. Capture needs [Craft Anything](https://github.com/storytold/craft-anything) (`craft-anything-cli` on PATH or `CRAFT_ANYTHING_CLI`).

## Compare with the original

```
pnpm --filter web build
node tools/compare.mjs <slug> [--screen <id>]
```

Each reference screen is compared pixel by pixel with the original, full page at 1440 and 390 (a screen that only has a viewport capture is compared at 1440) (logo and media placeholders are masked). The scores go to `apps/web/src/references/<slug>/compare.json` and show in the gallery. Screenshots of the originals stay on your machine (`apps/web/public/_originals`, ignored by git and by the Docker image); the published gallery shows the score and a link to the original. To see them side by side locally:

```
docker compose -p uxprint -f compose.yaml -f compose.local.yaml up -d --build
```

## Develop

```
pnpm install
pnpm build
pnpm test
```

## Sponsors

uxprint is free and open source. If it saves you time, you can [sponsor the work on GitHub](https://github.com/sponsors/denizbarish). Public sponsors are listed in the gallery (`node tools/sponsors.mjs` refreshes the list).

## License

MIT
