"use client";

import type { ReactNode } from "react";
import { AppLandingScreen } from "./pages/app-landing";
import { AuthScreen } from "./pages/auth";
import { CareersScreen } from "./pages/careers";
import { ContentScreen } from "./pages/content";
import { CourseScreen } from "./pages/course";
import { HomeScreen } from "./pages/home";
import { LanguagePickerScreen } from "./pages/language-picker";
import { LegalScreen } from "./pages/legal";
import { PaywallScreen } from "./pages/paywall";
import { PressScreen } from "./pages/press";
import { StatementScreen } from "./pages/statement";

export const busuuScreens: Record<string, () => ReactNode> = {
  home: () => <HomeScreen />,
  course: () => <CourseScreen />,
  content: () => <ContentScreen />,
  "app-landing": () => <AppLandingScreen />,
  paywall: () => <PaywallScreen />,
  legal: () => <LegalScreen />,
  auth: () => <AuthScreen />,
  statement: () => <StatementScreen />,
  "language-picker": () => <LanguagePickerScreen />,
  press: () => <PressScreen />,
  careers: () => <CareersScreen />,
};
