---
name: uxprint-apply
description: Use when the user wants an interface to look or feel like a known platform ("make it like Linear", "Stripe-style checkout", "use the Vercel look"), names a uxprint print, or asks which design references are available. Fetches the measured record of that platform's UI/UX and builds to it.
---

# Apply a uxprint print

A print is the measured record of one platform's interface: colour, type, spacing, radius, shadow, layout, components with their states, motion (durations, easings, keyframes), flows (sign up, log in) and the libraries the platform ships. Build from the record, not from memory of what the platform looks like.

## Steps

1. Find the print. Call the `list_prints` tool (pass a query such as "dark dashboard"), or run `npx @denizbarish/uxprint list`. If nothing matches, say so and stop; do not imitate the platform from memory and call it a print.
2. Put it in the project: `npx @denizbarish/uxprint add <slug>` writes `DESIGN.md` and links it from `AGENTS.md` and `CLAUDE.md` when they exist. It refuses to replace an existing `DESIGN.md`; ask before passing `--force`.
3. Read all of `DESIGN.md` before writing UI code. For exact tokens in code, `get_print` with `format: "json"` returns the structured record.
4. Map the tokens once (CSS variables or the Tailwind theme), then build components from the Components section, states included.

## Rules

- Values are measured. Use them as written: `510` is not `500`, `0.16s` is not `150ms`, `#08090a` is not `black`.
- Every interactive element gets its recorded hover, active and focus-visible states and its recorded transition.
- Use the keyframes from the Motion section as given. Honour `prefers-reduced-motion`.
- Anything listed under "Not recorded" or "Not measured" was not observed. Design it to fit the system and tell the user it is your addition; never present it as the platform's.
- Reproduce the system, not the brand. Never copy the platform's logo, name, copy, illustrations or photos.
- Libraries: prefer the ones under "Detected" when the project has no equivalent yet. Adding a dependency is the user's call; propose it, with the reason.
- If the project already has a design system, ask which wins before overwriting tokens.
