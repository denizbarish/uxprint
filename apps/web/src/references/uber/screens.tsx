"use client";

import type { ReactNode } from "react";
import { AboutScreen } from "./pages/about";
import { BlogScreen } from "./pages/blog";
import { BusinessScreen } from "./pages/business";
import { DirectoryScreen, DocumentsScreen } from "./pages/index-list";
import { CityScreen } from "./pages/city";
import { DriveScreen } from "./pages/drive";
import { FeatureScreen } from "./pages/feature";
import { HomeScreen } from "./pages/home";
import { RideScreen } from "./pages/ride";

export const uberScreens: Record<string, () => ReactNode> = {
  home: () => <HomeScreen />,
  ride: () => <RideScreen />,
  city: () => <CityScreen />,
  earn: () => <DriveScreen />,
  story: () => <FeatureScreen />,
  about: () => <AboutScreen />,
  teams: () => <BusinessScreen />,
  posts: () => <BlogScreen />,
  documents: () => <DocumentsScreen />,
  places: () => <DirectoryScreen />,
};
