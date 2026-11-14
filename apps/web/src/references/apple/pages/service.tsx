"use client";

import { useState } from "react";
import { Chevron, Shell } from "../chrome";
import { Media, More } from "../parts";
import { headline, label, text } from "../text";
import { LocalNav } from "./detail";
import "./service.css";

const OFFERS = [
  [11, 13, 64],
  [5, 7, 52],
  [14, 9, 55],
];

const FAQ = [21, 24, 27, 25, 15, 23, 50];

const WALL = [
  [0, 1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12, 13],
  [14, 15, 16, 17, 18, 19, 20],
];

/** Three rows of title tiles drifting sideways; the pause button stops the drift. */
function Marquee() {
  const [paused, setPaused] = useState(false);
  return (
    <div className={`ap-svc-wall${paused ? " ap-svc-wall--paused" : ""}`}>
      {WALL.map((row, rowIndex) => (
        <ul key={rowIndex} className={`ap-svc-wall__row ap-svc-wall__row--${rowIndex + 1}`}>
          {row.map((index) => (
            <li key={index}>
              <a href="#">
                <Media className="ap-svc-wall__art" dark />
                <span className="ap-svc-wall__copy">
                  <small>{label(6 + (index % 3) * 2, index + 60)}</small>
                  {headline(12 + (index % 4) * 4, index + 20)}
                </span>
              </a>
            </li>
          ))}
        </ul>
      ))}
      <div className="ap-svc-wall__foot">
        <a href="#" className="ap-svc-all">
          See all titles
        </a>
        <button type="button" className="ap-svc-wall__pause" aria-pressed={paused} aria-label={paused ? "Play" : "Pause"} onClick={() => setPaused(!paused)}>
          {paused ? (
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M5 3.5v9l7.5-4.5z" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M5 3.5v9M11 3.5v9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

/** Subscription service page (service survey page): dark local nav and hero, offers, big statements, tile grid, dark band, FAQ, bundle band. */
export function ServiceScreen() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Shell dark localNav={<LocalNav title="Play Club" dark />} notes={{ list: [211, 486, 65, 108], paragraphs: [670, 505, 112, 160] }} crumb="Play Club">
      <section className="ap-svc-hero ap-on-dark">
        <div className="ap-svc-hero__ribbon">
          <p>
            {text(77, 8).replace(/\.$/, "")} <More>Learn more</More>
          </p>
        </div>
        <Media className="ap-svc-hero__media" dark />
        <h1 className="ap-svc-hero__title">Play Club</h1>
        <a href="#" className="ap-svc-pill">
          Start free
        </a>
      </section>

      <div className="ap-svc-gap" aria-hidden="true" />

      <section className="ap-svc-offers" aria-labelledby="svc-offers">
        <h2 id="svc-offers">Join and save.</h2>
        <ul>
          {OFFERS.map(([eyebrow, title, body], index) => (
            <li key={index} className="ap-svc-offer">
              <h3>{label(eyebrow ?? 10, index + 3)}</h3>
              <p className="ap-svc-offer__title">{headline(title ?? 12, index + 4)}</p>
              <p className="ap-svc-offer__body">{text(body ?? 60, index + 5)}</p>
              <a href="#" className="ap-svc-pill ap-svc-pill--sm">
                {["Try 3 months free", "Try 1 month free", "Get started"][index]}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="ap-svc-statement" aria-labelledby="svc-statement">
        <h2 id="svc-statement">
          Quests. Races. Riddles.
          <br />
          Start the next round.
        </h2>
        <p>{text(310, 12)}</p>
        <div className="ap-svc-feature ap-on-dark">
          <Media className="ap-svc-feature__media" dark />
          <h3>
            Lantern
            <br />
            Valley
          </h3>
          <p>Adventure</p>
          <a href="#" className="ap-svc-pill ap-svc-pill--light">
            Play now
          </a>
        </div>
        <Marquee />
      </section>

      <section className="ap-svc-band ap-on-dark" aria-labelledby="svc-band">
        <span className="ap-svc-band__icon" aria-hidden="true" />
        <p className="ap-svc-band__eyebrow">Play Hub</p>
        <h2 id="svc-band">
          One new place
          <br />
          for every title.
        </h2>
        <p className="ap-svc-band__body">{text(356, 30)}</p>
        <a href="#" className="ap-svc-pill ap-svc-pill--light">
          Learn more
        </a>
        <ul className="ap-svc-band__cards">
          {[0, 1, 2].map((index) => (
            <li key={index}>
              <Media className="ap-svc-band__art" dark />
              <p>{text(220, index + 31)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="ap-svc-devices" aria-labelledby="svc-devices">
        <h2 id="svc-devices">
          Play on all
          <br />
          your screens.
        </h2>
        <ul>
          {["Phone", "Slate", "Desk", "Stream Box", "Optic"].map((name) => (
            <li key={name}>
              <span className="ap-svc-devices__icon" aria-hidden="true" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="ap-svc-faq" aria-labelledby="svc-faq">
        <h2 id="svc-faq">Asked and answered.</h2>
        <ul>
          {FAQ.map((length, index) => (
            <li key={index}>
              <h3>
                <button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)}>
                  <span>{headline(length, index + 40)}?</span>
                  <Chevron dir="down" />
                </button>
              </h3>
              <div className="ap-svc-faq__panel" hidden={open !== index}>
                <p>{text(310, index + 41)}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="ap-svc-bundle" aria-labelledby="svc-bundle">
        <div>
          <p className="ap-svc-bundle__mark">Bundle</p>
          <h2 id="svc-bundle">{headline(82, 50)}.</h2>
          <div className="ap-svc-bundle__ctas">
            <a href="#" className="ap-btn ap-btn--dark">
              Try the bundle free
            </a>
            <a href="#" className="ap-btn ap-btn--outline">
              Learn more
            </a>
          </div>
        </div>
        <Media className="ap-svc-bundle__logos" />
      </section>
    </Shell>
  );
}
