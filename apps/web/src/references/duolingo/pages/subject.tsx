"use client";

import { Art, Btn, LangMenu, LinkRow, Logo, Shell } from "../chrome";
import { filler, SUBJECTS } from "../filler";
import { Faq } from "../parts";
import "./subject.css";

const ROWS = [
  { title: "A patient coach in your bag", body: 76 },
  { title: "Practice kids ask for", body: 82 },
  { title: "Clear help, one step at a time", body: 62 },
];

const FAQ = [22, 42, 54, 50, 43, 38, 58, 32, 64, 45];

/** Single-subject landing (measured on /math; /chess shares the layout on a tinted hero). */
export function SubjectScreen() {
  return (
    <Shell className="dl-subj">
      <header className="dl-subj__head">
        <nav className="dl-subj__nav" aria-label="Main">
          <Logo className="dl-subj__logo" />
          <LangMenu tone="muted" className="dl-subj__lang" />
        </nav>
        <div className="dl-subj__hero dl-subj__wrap">
          <div className="dl-subj__herocopy">
            <h1 className="dl-subj__h1">Drawing looks tough, so we kept it light.</h1>
            <div className="dl-subj__actions">
              <Btn href="#" variant="blue" className="dl-btn--r16 dl-subj__btn">
                Begin today
              </Btn>
              <Btn variant="thin" className="dl-btn--r16 dl-subj__btn">
                Sign in to my profile
              </Btn>
            </div>
          </div>
          <Art className="dl-subj__heroart" />
        </div>
      </header>

      <main className="dl-subj__main dl-subj__wrap">
        <section className="dl-subj__rows">
          {ROWS.map((row, index) => (
            <section key={row.title} className={`dl-subj__row ${index % 2 ? "" : "dl-subj__row--flip"}`}>
              <div className="dl-subj__rowcopy">
                <h2>{row.title}</h2>
                <p>{filler(row.body, index + 7)}</p>
                <Btn href="#" variant="thin" className="dl-btn--r16 dl-subj__btn">
                  Begin today
                </Btn>
              </div>
              <Art className="dl-subj__phone" />
            </section>
          ))}
        </section>
        <hr className="dl-subj__rule" />
        <section className="dl-subj__grades">
          <h2 className="dl-subj__h2">Drawing at every level</h2>
          <p className="dl-subj__sub">{filler(107, 5)}</p>
          <ul className="dl-subj__grid">
            {SUBJECTS.slice(8, 16).map((name, index) => (
              <li key={name} className="dl-subj__card">
                <span className="dl-subj__icon" aria-hidden="true" data-compare-mask="" style={{ background: ["#58cc02", "#1cb0f6", "#ff9600", "#ff4b4b", "#ce82ff", "#58cc02", "#1cb0f6", "#ff9600"][index] }} />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </section>
        <hr className="dl-subj__rule" />
        <section className="dl-subj__faq">
          <h2 className="dl-subj__h2">Questions people often ask</h2>
          <Faq lengths={FAQ} className="dl-faq--rule" seed={20} />
        </section>
      </main>

      <section className="dl-subj__final">
        <div className="dl-subj__hero dl-subj__wrap dl-subj__hero--final">
          <div className="dl-subj__herocopy">
            <h2 className="dl-subj__h1">Ready to grow your drawing confidence?</h2>
            <div className="dl-subj__actions">
              <Btn href="#" variant="blue" className="dl-btn--r16 dl-subj__btn">
                Begin today
              </Btn>
            </div>
          </div>
          <Art className="dl-subj__finalart" />
        </div>
      </section>

      <footer className="dl-subj__foot">
        <LinkRow className="dl-linkrow--light" />
      </footer>
    </Shell>
  );
}
