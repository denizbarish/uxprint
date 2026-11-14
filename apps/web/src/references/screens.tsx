"use client";

import dynamic from "next/dynamic";
import type { ComponentType, ReactNode } from "react";

type Screens = Record<string, () => ReactNode>;

/** One chunk per platform, so opening a Linear screen does not download the others. */
const load = (screens: () => Promise<Screens>) =>
  dynamic(async () => {
    const map = await screens();
    return function PlatformScreen({ screen }: { screen: string }) {
      return map[screen]?.() ?? null;
    };
  });

const bySlug: Record<string, ComponentType<{ screen: string }>> = {
  linear: load(() => import("./linear/screens").then((module) => module.linearScreens)),
  vercel: load(() => import("./vercel/screens").then((module) => module.vercelScreens)),
  stripe: load(() => import("./stripe/screens").then((module) => module.stripeScreens)),
  raycast: load(() => import("./raycast/screens").then((module) => module.raycastScreens)),
  apple: load(() => import("./apple/screens").then((module) => module.appleScreens)),
  spotify: load(() => import("./spotify/screens").then((module) => module.spotifyScreens)),
  uber: load(() => import("./uber/screens").then((module) => module.uberScreens)),
  duolingo: load(() => import("./duolingo/screens").then((module) => module.duolingoScreens)),
  busuu: load(() => import("./busuu/screens").then((module) => module.busuuScreens)),
};

export function ReferenceScreen({ slug, screen }: { slug: string; screen: string }) {
  const Platform = bySlug[slug];
  return Platform ? <Platform screen={screen} /> : null;
}
