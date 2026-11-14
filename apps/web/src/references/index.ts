import type { CompareScores, ReferenceRegistry } from "./types";
import linear from "./linear/registry.json";
import linearScores from "./linear/compare.json";
import vercel from "./vercel/registry.json";
import vercelScores from "./vercel/compare.json";
import stripe from "./stripe/registry.json";
import stripeScores from "./stripe/compare.json";
import raycast from "./raycast/registry.json";
import raycastScores from "./raycast/compare.json";
import apple from "./apple/registry.json";
import appleScores from "./apple/compare.json";
import spotify from "./spotify/registry.json";
import spotifyScores from "./spotify/compare.json";
import uber from "./uber/registry.json";
import uberScores from "./uber/compare.json";
import duolingo from "./duolingo/registry.json";
import duolingoScores from "./duolingo/compare.json";
import busuu from "./busuu/registry.json";
import busuuScores from "./busuu/compare.json";

/** Prints without screens here simply have no live reference. */
const registries: Record<string, ReferenceRegistry> = {
  linear: linear as ReferenceRegistry,
  vercel: vercel as ReferenceRegistry,
  stripe: stripe as ReferenceRegistry,
  raycast: raycast as ReferenceRegistry,
  apple: apple as ReferenceRegistry,
  spotify: spotify as ReferenceRegistry,
  uber: uber as ReferenceRegistry,
  duolingo: duolingo as ReferenceRegistry,
  busuu: busuu as ReferenceRegistry,
};

const scores: Record<string, CompareScores> = {
  linear: linearScores,
  vercel: vercelScores,
  stripe: stripeScores,
  raycast: raycastScores,
  apple: appleScores,
  spotify: spotifyScores,
  uber: uberScores,
  duolingo: duolingoScores,
  busuu: busuuScores,
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
