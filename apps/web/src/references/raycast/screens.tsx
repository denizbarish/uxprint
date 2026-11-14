"use client";

import type { ReactNode } from "react";
import { AuthScreen } from "./pages/auth";
import { BlogScreen } from "./pages/blog";
import { ChangelogScreen } from "./pages/changelog";
import { CompanyScreen } from "./pages/company";
import { CoreFeatureScreen } from "./pages/core-feature";
import { CustomersScreen } from "./pages/customers";
import { FeedbackScreen } from "./pages/feedback";
import { HomeScreen } from "./pages/home";
import { StoreScreen } from "./pages/store";
import { StoreCategoryScreen } from "./pages/store-category";
import { LegalScreen } from "./pages/legal";
import { PressScreen } from "./pages/press";
import { PricingScreen } from "./pages/pricing";
import { ProductScreen } from "./pages/product";

export const raycastScreens: Record<string, () => ReactNode> = {
  auth: () => <AuthScreen />,
  blog: () => <BlogScreen />,
  changelog: () => <ChangelogScreen />,
  company: () => <CompanyScreen />,
  "core-feature": () => <CoreFeatureScreen />,
  customers: () => <CustomersScreen />,
  feedback: () => <FeedbackScreen />,
  home: () => <HomeScreen />,
  store: () => <StoreScreen />,
  "store-category": () => <StoreCategoryScreen />,
  legal: () => <LegalScreen />,
  press: () => <PressScreen />,
  pricing: () => <PricingScreen />,
  product: () => <ProductScreen />,
};
