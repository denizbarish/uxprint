"use client";

import { useState } from "react";
import { Shell } from "../chrome";
import { Media, Paddles } from "../parts";
import { headline, label, text } from "../text";
import { LocalNav } from "./detail";
import "./feature.css";

function Intro({ eyebrow, title, body, link, dark }: { eyebrow: string; title: number; body: number; link?: string; dark?: boolean }) {
  return (
    <div className={`ap-ft-intro${dark ? " ap-on-dark" : ""}`}>
      <h2 className="ap-ft-intro__eyebrow">{eyebrow}</h2>
      <p className="ap-ft-intro__title">{headline(title, title)}.</p>
      <p className="ap-ft-intro__body">{text(body, body)}</p>
      {link ? (
        <a href="#" className="ap-ft-intro__link">
          {link}
        </a>
      ) : null}
    </div>
  );
}

function Gallery({ height, cards, width = 1000, dark = false }: { height: number; cards: number; width?: number; dark?: boolean }) {
  return (
    <div className="ap-ft-gallery" style={{ height }}>
      <ul>
        {Array.from({ length: cards }, (_, index) => (
          <li key={index} style={{ width }}>
            <Media className="ap-ft-gallery__media" dark={dark} />
            <p className="ap-ft-gallery__cap">{text(90, index + 3)}</p>
          </li>
        ))}
      </ul>
      <div className="ap-ft-gallery__controls">
        <Paddles dark={dark} />
      </div>
    </div>
  );
}

const MORE = [
  [14, 386],
  [30, 251],
  [21, 200],
  [18, 300],
  [24, 220],
  [16, 260],
  [20, 240],
];

/** Platform feature story (/os/ios): dark opening chapters, light galleries, a text grid and two closing cards. */
export function FeatureScreen() {
  const [playing, setPlaying] = useState(true);
  return (
    <Shell
      dark
      localNav={<LocalNav title="System 27" links={["Overview", "Preview", "All Features"]} dark />}
      notes={{ list: [1634, 127, 264, 148, 210, 86, 302, 330, 358, 399, 247, 287, 385, 179], paragraphs: [127] }}
      crumb="System 27"
    >
      <section className="ap-ft-welcome ap-on-dark">
        <h1 className="ap-ft-welcome__eyebrow">System 27</h1>
        <p className="ap-ft-welcome__title">
          Brighter screens. Smarter help.
          <br />
          Calls that feel closer.
        </p>
        <p className="ap-ft-welcome__note">Arrives this autumn as a free update.</p>
        <Media className="ap-ft-welcome__media" dark />
      </section>

      <section className="ap-ft-sec ap-ft-sec--charcoal ap-on-dark ap-ft-sec--highlights" aria-labelledby="ft-high">
        <h2 id="ft-high" className="ap-ft-head">
          See what is new in this release.
        </h2>
        <div className="ap-ft-hl">
          <Media className="ap-ft-hl__media" dark />
          <div className="ap-ft-hl__pass">
            <div className="ap-ft-hl__dots">
              {[0, 1, 2, 3, 4].map((dot) => (
                <span key={dot} data-active={dot === 0 ? "" : undefined} />
              ))}
            </div>
            <button type="button" className="ap-ft-hl__play" aria-label={playing ? "Pause" : "Play"} onClick={() => setPlaying((value) => !value)}>
              {playing ? (
                <svg viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M3 2h2v8H3zM7 2h2v8H7z" fill="currentColor" />
                </svg>
              ) : (
                <svg viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M3 1.5v9l7-4.5z" fill="currentColor" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="ap-ft-sec ap-ft-sec--charcoal ap-ft-sec--flush-top" aria-label="Assistant">
        <div className="ap-ft-wrap">
          <Intro eyebrow={label(17, 1)} title={48} body={163} dark />
        </div>
        <Media className="ap-ft-wide" dark />
      </section>

      <section className="ap-ft-sec ap-ft-sec--alt ap-ft-sec--no-bottom" aria-label="Smart features">
        <div className="ap-ft-wrap">
          <Intro eyebrow={label(26, 2)} title={32} body={150} />
        </div>
        <Gallery height={691} cards={4} width={696} />
      </section>

      <section className="ap-ft-sec ap-ft-sec--alt ap-ft-sec--no-bottom ap-ft-sec--overlap" aria-label="Family safety">
        <div className="ap-ft-wrap">
          <Intro eyebrow={label(12, 3)} title={59} body={113} link="Learn more" />
        </div>
        <Gallery height={762} cards={5} width={372} />
      </section>

      <section className="ap-ft-sec ap-ft-sec--alt ap-ft-sec--overlap" aria-label="Improvements">
        <div className="ap-ft-wrap">
          <Intro eyebrow={label(15, 4)} title={44} body={100} />
        </div>
        <Gallery height={626} cards={4} width={696} />
      </section>

      <section className="ap-ft-sec ap-ft-sec--no-bottom" aria-labelledby="ft-more">
        <div className="ap-ft-wrap">
          <h2 id="ft-more" className="ap-ft-head">
            Even more to explore.
          </h2>
          <div className="ap-ft-more">
            {MORE.map(([title, body], index) => (
              <div key={index}>
                <h3>{headline(title ?? 20, index + 80)}</h3>
                <p>{text(body ?? 200, index + 81)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ap-ft-sec ap-ft-sec--no-bottom" aria-labelledby="ft-compat">
        <div className="ap-ft-wrap">
          <div className="ap-ft-card ap-ft-card--tall">
            <h2 id="ft-compat">Runs on these phones and more.</h2>
            <a href="#" className="ap-btn ap-btn--primary">
              See all models
            </a>
            <div className="ap-ft-card__links">
              <a href="#">Model Two</a>
              <a href="#">Model Three Plus</a>
              <a href="#">Model Four</a>
              <a href="#">Model Five Max</a>
            </div>
            <Media className="ap-ft-card__media" />
          </div>
        </div>
      </section>

      <section className="ap-ft-sec ap-ft-sec--small-top" aria-labelledby="ft-dev">
        <div className="ap-ft-wrap">
          <div className="ap-ft-card">
            <Media className="ap-ft-card__icon" />
            <h2 id="ft-dev">Builders, take a look at what is new.</h2>
            <a href="#" className="ap-ft-card__more">
              See the developer preview notes
            </a>
          </div>
        </div>
      </section>
    </Shell>
  );
}
