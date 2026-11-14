import { SitePage } from "../chrome";
import "./legal.css";

/* Legal text template (rebuilt from the terms page): title, effective date, intro, contents, numbered clauses.
   Clause lengths follow the original line counts so the page keeps its length; the wording is our own. */

const sections = [
  "The service",
  "Restrictions",
  "Third-party apps",
  "Payment terms",
  "Term and ending",
  "Warranties and disclaimers",
  "Limits of liability",
  "Indemnity",
  "Confidentiality",
  "Data",
  "General terms",
];

/** Clause line counts per section, measured at 1440 (17px text in a 624px column). 0 means a paragraph without a heading. */
const layout: number[][] = [
  [10, 9, 10, 20],
  [6, 31, 5],
  [0, 20],
  [7, 21, 10, 14, 8],
  [17, 5, 19, 4],
  [2, 12],
  [0, 26],
  [14, 7, 17, 9, 5],
  [18, 17, 6, 12],
  [17, 6, 10, 8, 9],
  [3, 7, 6, 3, 3, 8, 7, 6, 9, 13, 4],
];

const clauseTitles = ["Scope", "Accounts", "Ownership", "Permissions", "Use rules", "Changes", "Notices", "Records", "Support", "Fees", "Taxes"];

const pool = [
  "The customer may use the service only as described in these terms and in any order form that refers to them.",
  "Each party keeps all rights in its own materials, and nothing in these terms moves ownership from one party to the other.",
  "Acme may update the service from time to time, as long as the update does not make the service materially worse.",
  "The customer is responsible for the activity on its accounts and for keeping its sign-in details safe and private.",
  "Fees are due as stated in the order, and any amounts not paid on time may carry a late charge as allowed by law.",
  "Either party may end these terms with written notice if the other party fails to fix a serious breach within thirty days.",
];

function text(lines: number, seed: number): string {
  const target = Math.max(1, lines) * 76 - 24;
  let out = "";
  for (let i = seed; out.length < target; i++) out += (out ? " " : "") + pool[i % pool.length];
  return out.slice(0, target).replace(/\s+\S*$/, "") + ".";
}

export function LegalScreen() {
  return (
    <SitePage className="lr-legal">
      <article className="lr-legal-doc">
        <h1>Terms of Service</h1>
        <p className="lr-legal-date">Effective date: June 09, 2026</p>
        <p className="lr-legal-lead">{text(7, 0).toUpperCase()}</p>
        <p className="lr-legal-lead">{text(7, 3).toUpperCase()}</p>
        <hr />
        <ol className="lr-legal-toc">
          {sections.map((title, index) => (
            <li key={title}>
              <a href={`#s-${index + 1}`}>{title}</a>
            </li>
          ))}
        </ol>
        <hr />
        {sections.map((title, index) => (
          <section key={title} id={`s-${index + 1}`} aria-labelledby={`h-s-${index + 1}`}>
            <h2 id={`h-s-${index + 1}`}>{title}</h2>
            {(layout[index] ?? []).map((lines, clause) =>
              lines === 0 ? null : (
                <div className="lr-legal-clause" key={clause}>
                  {layout[index]?.[0] === 0 ? null : (
                    <h3>
                      <span>
                        {index + 1}.{clause + 1}
                      </span>
                      {clauseTitles[(index + clause) % clauseTitles.length]}
                    </h3>
                  )}
                  <p>{text(lines, index + clause)}</p>
                </div>
              ),
            )}
          </section>
        ))}
      </article>
    </SitePage>
  );
}
