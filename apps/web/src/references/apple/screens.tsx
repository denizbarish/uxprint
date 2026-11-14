"use client";

import type { ReactNode } from "react";
import { ValuesScreen } from "./pages/values";
import { HubScreen } from "./pages/hub";
import { NewsScreen } from "./pages/news";
import { ContactScreen, LegalScreen } from "./pages/info";
import { SitemapScreen } from "./pages/sitemap";
import { FeatureScreen } from "./pages/feature";
import { ServiceScreen } from "./pages/service";
import { StoreScreen } from "./pages/store";
import { CompareScreen } from "./pages/compare";
import { DetailScreen } from "./pages/detail";
import { FamilyScreen } from "./pages/family";
import { HomeScreen } from "./pages/home";

export const appleScreens: Record<string, () => ReactNode> = {
  home: () => <HomeScreen />,
  "product-family": () => <FamilyScreen />,
  "product-detail": () => <DetailScreen />,
  compare: () => <CompareScreen />,
  "store": () => <StoreScreen />,
  "service": () => <ServiceScreen />,
  "feature-story": () => <FeatureScreen />,
  "sitemap": () => <SitemapScreen />,
  "contact": () => <ContactScreen />,
  "legal": () => <LegalScreen />,
  "values": () => <ValuesScreen />,
  "audience-hub": () => <HubScreen />,
  "newsroom": () => <NewsScreen />,
};
