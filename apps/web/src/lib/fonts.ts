import type { Print } from "@denizbarish/uxprint";

type Family = Print["typography"]["families"][number];

/** Substitute faces the gallery self-hosts, so a print renders in the right face without a network request. */
const hostedFaces: Record<string, string> = {
  "Inter Variable": '"Inter Variable"',
  Inter: '"Inter Variable"',
  Geist: '"Geist Variable"',
  "Geist Mono": '"Geist Mono Variable"',
  "JetBrains Mono": '"JetBrains Mono Variable"',
};

const genericFallback: Record<Family["role"], string> = {
  sans: '"Inter Variable", system-ui, sans-serif',
  display: '"Inter Variable", system-ui, sans-serif',
  serif: "Georgia, serif",
  mono: '"JetBrains Mono Variable", ui-monospace, monospace',
};

/**
 * The platform's own stack, then its hosted substitute, then a face of the same kind.
 * A stack that names only proprietary faces would otherwise fall through to the browser's serif default.
 */
export function renderStack(family: Family): string {
  const own = family.stack.replace(/,\s*(sans-serif|serif|monospace)\s*$/, "");
  return [own, hostedFaces[family.substitute.name], genericFallback[family.role]].filter(Boolean).join(", ");
}
