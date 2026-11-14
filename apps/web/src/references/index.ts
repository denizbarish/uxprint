import type { CompareScores, ReferenceRegistry } from "./types";
import linear from "./linear/registry.json";
import linearScores from "./linear/compare.json";
import vercel from "./vercel/registry.json";
import vercelScores from "./vercel/compare.json";
import stripe from "./stripe/registry.json";
import stripeScores from "./stripe/compare.json";
import raycast from "./raycast/registry.json";
import raycastScores from "./raycast/compare.json";

/** Prints without screens here simply have no live reference. */
const registries: Record<string, ReferenceRegistry> = {
  linear: linear as ReferenceRegistry,
  vercel: vercel as ReferenceRegistry,
  stripe: stripe as ReferenceRegistry,
  raycast: raycast as ReferenceRegistry,
};

const scores: Record<string, CompareScores> = {
  linear: linearScores,
  vercel: vercelScores,
  stripe: stripeScores,
  raycast: raycastScores,
};

export function getReferences(slug: string): ReferenceRegistry | undefined {
  const registry = registries[slug];
  return registry?.screens.length ? registry : undefined;
}

export function getCompareScores(slug: string): CompareScores {
  return scores[slug] ?? {};
}

export function allReferenceScreens(): { slug: string; screen: string }[] {
  return Object.entries(registries).flatMap(([slug, registry]) =>
    registry.screens.map((screen) => ({ slug, screen: screen.id })),
  );
}
