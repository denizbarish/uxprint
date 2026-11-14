"use client";

import type { ReactNode } from "react";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./vercel.css";
import { HomeScreen } from "./pages/home";
import { ProductScreen } from "./pages/product";
import { PricingScreen } from "./pages/pricing";
import { AboutScreen } from "./pages/about";
import { CustomersScreen } from "./pages/customers";
import { ListingScreen } from "./pages/listing";
import { LegalScreen } from "./pages/legal";
import { ContactScreen } from "./pages/contact";
import { DocsScreen } from "./pages/docs";
import { LoginScreen, SignupScreen } from "./pages/auth";
import { SolutionScreen } from "./pages/solution";
import { CareersScreen } from "./pages/careers";
import { CatalogScreen } from "./pages/catalog";

export const vercelScreens: Record<string, () => ReactNode> = {
  home: () => <HomeScreen />,
  product: () => <ProductScreen />,
  pricing: () => <PricingScreen />,
  "about": () => <AboutScreen />,
  "customers": () => <CustomersScreen />,
  "listing": () => <ListingScreen />,
  "legal": () => <LegalScreen />,
  "contact": () => <ContactScreen />,
  "docs": () => <DocsScreen />,
  "login": () => <LoginScreen />,
  "signup": () => <SignupScreen />,
  "solution": () => <SolutionScreen />,
  "careers": () => <CareersScreen />,
  "catalog": () => <CatalogScreen />,
};
