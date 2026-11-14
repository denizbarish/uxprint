"use client";

import { Btn, Logo, Shell } from "../chrome";
import { phrase } from "../filler";
import { Faq } from "../parts";
import "./help.css";

const GROUPS = [
  { title: 14, rows: [25, 17, 34, 44, 44] },
  { title: 18, rows: [45, 51, 34, 40, 46, 39] },
  { title: 23, rows: [46, 11, 47, 26, 26, 21] },
];

/** Help centre index (measured on /help): centred logo bar, breadcrumb, grouped question lists. */
export function HelpScreen() {
  return (
    <Shell>
      <header className="dl-help__bar">
        <Logo className="dl-help__logo" />
      </header>
      <main className="dl-help__main">
        <nav className="dl-help__crumbs" aria-label="Breadcrumb">
          <a href="#">Help desk</a>
          <svg viewBox="0 0 6 10" aria-hidden="true">
            <path d="M1 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <a href="#" aria-current="page">
            Start
          </a>
        </nav>
        <h1 className="dl-help__title">Common questions and answers</h1>
        <div className="dl-help__groups">
          {GROUPS.map((group, index) => (
            <section key={index} className="dl-help__group" aria-labelledby={`dl-help-${index}`}>
              <h2 id={`dl-help-${index}`} className="dl-help__ghead">
                {phrase(group.title, index * 7 + 2)}
              </h2>
              <Faq lengths={group.rows} className="dl-faq--help" seed={index * 9} />
            </section>
          ))}
        </div>
        <div className="dl-help__more">
          <p>Still have a question left?</p>
          <Btn href="#" className="dl-btn--r16 dl-help__btn">
            Write to us
          </Btn>
        </div>
      </main>
    </Shell>
  );
}
