"use client";

import type { ReactNode } from "react";
import "./base.css";
import "./chrome.css";
import "./pages/home.css";
import "./pages/legacy.css";
import "./pages/platform.css";
import "./pages/solution.css";
import "./pages/pricing.css";
import "./pages/about.css";
import "./pages/customers.css";
import "./pages/legal.css";
import "./pages/contact.css";
import "./pages/blog.css";
import "./pages/directory.css";
import "./pages/segment.css";
import "./pages/careers.css";
import { HomeScreen } from "./pages/home";
import { ProductScreen } from "./pages/product";
import { PlatformScreen } from "./pages/platform";
import { SolutionScreen } from "./pages/solution";
import { PricingScreen } from "./pages/pricing";
import { AboutScreen } from "./pages/about";
import { CustomersScreen } from "./pages/customers";
import { LegalScreen } from "./pages/legal";
import { ContactScreen } from "./pages/contact";
import { BlogScreen } from "./pages/blog";
import { DirectoryScreen } from "./pages/directory";
import { SegmentScreen } from "./pages/segment";
import { CareersScreen } from "./pages/careers";

export const stripeScreens: Record<string, () => ReactNode> = {
  home: () => <HomeScreen />,
  product: () => <ProductScreen />,
  platform: () => <PlatformScreen />,
  solution: () => <SolutionScreen />,
  pricing: () => <PricingScreen />,
  about: () => <AboutScreen />,
  customers: () => <CustomersScreen />,
  legal: () => <LegalScreen />,
  contact: () => <ContactScreen />,
  blog: () => <BlogScreen />,
  directory: () => <DirectoryScreen />,
  segment: () => <SegmentScreen />,
  careers: () => <CareersScreen />,
};
