"use client";

import { Flag, GreenFooter, Shell, TopBar } from "../chrome";
import { FeatureRows, FinalCta, Hero } from "./home";
import "./home.css";

/** One template behind every course page: the home layout with a single-line course band. */
export function CourseScreen() {
  return (
    <Shell>
      <header className="dl-head">
        <TopBar cta />
        <Hero title="Grow your Botany skills a few minutes at a time." />
        <div className="dl-coursebar">
          <Flag index={0} className="dl-coursebar__flag" />
          <h3 className="dl-coursebar__text">A calm, steady way to learn Botany online every day</h3>
        </div>
      </header>
      <main>
        <FeatureRows />
        <FinalCta title="Study Botany with us today" />
      </main>
      <GreenFooter />
    </Shell>
  );
}
