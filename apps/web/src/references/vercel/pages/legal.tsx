"use client";

import type { CSSProperties } from "react";
import { Page } from "../chrome";
import "./frame.css";
import "./legal.css";

const sentences = [
  "We use small files and similar tools when you visit the service.",
  "This notice explains what they are, why we use them, and the choices you have.",
  "Terms in capitals that are not defined here have the meaning given in our main terms.",
  "Some files are set by us and some are set by partners who help us run the service.",
  "Files that are needed keep you signed in and let the pages work as expected.",
  "Settings files remember the choices you make, such as language or region.",
  "Measurement files count visits so we can see which pages are used most.",
  "You can clear or block these files in your browser settings at any time.",
  "If you block them, some parts of the service may not work as intended.",
  "We review this notice from time to time and post any change on this page.",
  "Local storage keeps small pieces of data on your device between visits.",
  "Tags in emails and pages tell us whether a message was opened or a page was seen.",
];

/**
 * Neutral copy sized to the original paragraph. Length follows the phone wrap (about 38 characters
 * per 308px line); the desktop height is held by --lines.
 */
function copy(phoneLines: number, seed: number): string {
  const target = phoneLines * 38 - 12;
  let text = "";
  let i = seed;
  while (text.length < target) {
    const next = sentences[i % sentences.length] ?? "";
    const room = target - text.length - (text ? 1 : 0);
    if (next.length <= room) {
      text += (text ? " " : "") + next;
    } else {
      const cut = next.slice(0, room).replace(/\s+\S*$/, "");
      if (cut.length > 12) text += (text ? " " : "") + cut.replace(/[,.]$/, "") + ".";
      break;
    }
    i += 1;
  }
  return text;
}

/** Each paragraph: [desktop lines, phone lines], as measured. */
const sections: { title: string; paras: [number, number][] }[] = [
  { title: "What are small files, tags and local storage?", paras: [[7, 15], [6, 11], [4, 8], [2, 4]] },
  { title: "How and why do we use them?", paras: [[6, 12], [6, 11], [5, 10], [8, 17]] },
  { title: "Your choices", paras: [[3, 5], [4, 8], [2, 4]] },
  { title: "Our customers", paras: [[4, 8]] },
  { title: "Changes to this notice", paras: [[8, 17]] },
  { title: "How to reach us", paras: [[2, 3]] },
];

function Para({ lines, phone, seed }: { lines: number; phone: number; seed: number }) {
  return (
    <p className="vc-legal__p" style={{ "--lines": lines } as CSSProperties}>
      {copy(phone, seed)}
    </p>
  );
}

/** Legal document template, built from /legal/cookie-policy. */
export function LegalScreen() {
  return (
    <Page>
      <div className="vc-frame vc-legal">
        <span className="vc-frame__plus vc-frame__plus--tl" aria-hidden="true" />
        <div className="vc-frame__row vc-frame__row--guides vc-legal__gap" />
        <div className="vc-frame__row vc-frame__row--guides vc-legal__title">
          <h1 className="vc-h56">Cookie Notice</h1>
        </div>
        <div className="vc-frame__row vc-frame__row--guides vc-legal__date">
          <p>
            Last updated <time dateTime="2020-04-21">April 21, 2020</time>
          </p>
        </div>
        <div className="vc-frame__cols vc-legal__body">
          <article className="vc-legal__main">
            <p className="vc-legal__p" style={{ "--lines": 5 } as CSSProperties}>
              {copy(7, 0)} You can also reach us at <a href="#">privacy@acme.example</a> with any other questions, or read our <a href="#">Privacy Notice</a>.
            </p>
            {sections.map((section, s) => (
              <section key={section.title} id={`legal-${s}`} aria-labelledby={`legal-h-${s}`}>
                <h2 className="vc-h32 vc-legal__h" id={`legal-h-${s}`}>
                  {section.title}
                </h2>
                {section.paras.map(([lines, phone], p) => (
                  <Para key={p} lines={lines} phone={phone} seed={s * 3 + p} />
                ))}
              </section>
            ))}
          </article>
          <nav className="vc-legal__toc" aria-label="On this page">
            <p className="vc-legal__toc-title">Cookie Notice</p>
            <ul>
              {sections.map((section, s) => (
                <li key={section.title}>
                  <a href={`#legal-${s}`} className="vc-focus">
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <span className="vc-frame__plus vc-frame__plus--br" aria-hidden="true" />
      </div>
    </Page>
  );
}
