"use client";

import { MarketingShell, useBrand } from "../chrome";
import { filler, phrase } from "../filler";
import { Hero, Prose } from "../parts";
import "./press.css";

/**
 * Source name and headline length per coverage row, as measured (no original text).
 * Headlines render 8% longer because the substitute face sets narrower than the original.
 */
const COVERAGE: [number, number][] = [
  [13, 118], [24, 59], [13, 46], [8, 90], [13, 97], [22, 53], [16, 42], [9, 51], [17, 58],
  [6, 79], [7, 82], [5, 32], [10, 55], [7, 57], [18, 65], [9, 45], [11, 67],
];

const TEAM = [84, 38, 71, 43];

export function PressScreen() {
  const brand = useBrand();
  return (
    <MarketingShell className="bu-press">
      <Hero
        className="bu-hero--press"
        title={`${brand} Media Centre`}
        action={
          <a href="#" className="bu-btn bu-btn--mint bu-btn--lg">
            Contact us
          </a>
        }
      />
      <Prose className="bu-press__intro">
        <h2>Who is {brand}?</h2>
        <p>{filler(141, 61)}</p>
        <p>{filler(197, 62)}</p>
        <h2>How does {brand} work?</h2>
        <p>{filler(239, 63)}</p>
        <h2>Who studies with {brand}?</h2>
        <p>{filler(192, 64)}</p>
        <p>{filler(255, 65)}</p>
        <p>{filler(154, 66)}</p>
        <h2>When did {brand} start?</h2>
        <p>{filler(500, 67)}</p>
        <h2>Our media team can:</h2>
        <ul>
          {TEAM.map((length, index) => (
            <li key={length}>{filler(length, 70 + index)}</li>
          ))}
        </ul>
        <h3>For media questions:</h3>
        <p>
          <a href="#">media@example.com</a>
        </p>
        <p>
          For other questions, please <a href="#">write to us here</a>
        </p>
        <p>
          Read more <a href="#">about {brand}</a> {filler(20, 75)} <a href="#">this short company summary</a>
        </p>
      </Prose>
      <section className="bu-factcard" aria-label="Media resources">
        <div className="bu-factcard__col">
          <h2>Media kit</h2>
          <p className="bu-factcard__lead">{filler(73, 76)}</p>
          <a href="#" className="bu-btn bu-btn--navy bu-factcard__btn">
            Download
          </a>
        </div>
        <div className="bu-factcard__col">
          <h2>Awards</h2>
          <p className="bu-factcard__lead">{filler(135, 77)}</p>
          <a href="#" className="bu-btn bu-btn--navy bu-factcard__btn">
            See all
          </a>
        </div>
      </section>
      <Prose className="bu-press__news">
        <h2>{brand} in the news</h2>
        <ul className="bu-coverage">
          {COVERAGE.map(([source, headline], index) => (
            <li key={index}>
              <h3>
                <span>{phrase(source, 80 + index)}:</span> <a href="#">{filler(Math.round(headline * 1.08), 100 + index)}</a>
              </h3>
            </li>
          ))}
        </ul>
      </Prose>
    </MarketingShell>
  );
}
