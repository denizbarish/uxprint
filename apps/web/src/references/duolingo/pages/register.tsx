"use client";

import { LangMenu, Logo, Shell } from "../chrome";
import { CourseGrid } from "../catalog";
import "./register.css";

/** First public step of sign-up: pick a course (measured on /register). Later steps need an account. */
export function RegisterScreen() {
  return (
    <Shell>
      <div className="dl-reg__bar">
        <nav className="dl-reg__nav" aria-label="Main">
          <Logo className="dl-reg__logo" />
          <LangMenu className="dl-reg__lang" />
        </nav>
      </div>
      <main className="dl-reg">
        <div className="dl-reg__panel">
          <h1 className="dl-reg__title">I would like to study...</h1>
          <CourseGrid as="button" className="dl-reg__grid" />
        </div>
      </main>
    </Shell>
  );
}
