"use client";

import type { ReactNode } from "react";
import { BusinessScreen } from "./pages/business";
import { CourseScreen } from "./pages/course";
import { CoursesScreen } from "./pages/courses";
import { EfficacyScreen } from "./pages/efficacy";
import { HelpScreen } from "./pages/help";
import { HomeScreen } from "./pages/home";
import { LegalScreen } from "./pages/legal";
import { LoginScreen } from "./pages/login";
import { RegisterScreen } from "./pages/register";
import { SubjectScreen } from "./pages/subject";
import { SubscriptionScreen } from "./pages/subscription";

export const duolingoScreens: Record<string, () => ReactNode> = {
  home: () => <HomeScreen />,
  course: () => <CourseScreen />,
  subscription: () => <SubscriptionScreen />,
  subject: () => <SubjectScreen />,
  business: () => <BusinessScreen />,
  efficacy: () => <EfficacyScreen />,
  help: () => <HelpScreen />,
  legal: () => <LegalScreen />,
  courses: () => <CoursesScreen />,
  register: () => <RegisterScreen />,
  login: () => <LoginScreen />,
};
