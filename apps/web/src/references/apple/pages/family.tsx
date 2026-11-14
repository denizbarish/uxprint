"use client";

import { useState, type CSSProperties } from "react";
import { Shell } from "../chrome";
import { Ctas, Media, More, Paddles, SectionHead } from "../parts";
import { headline, label, text } from "../text";
import "./family.css";

/** Promo strip above a page, 52px on desktop. */
export function Ribbon({ length = 110 }: { length?: number }) {
  return (
    <div className="ap-ribbon">
      <p>
        {text(length, 7).replace(/\.$/, "")} <More>Learn more</More>
      </p>
    </div>
  );
}

/** Product chapter strip: icon over a short label, optional orange "New" note. */
export function ChapterNav({ items }: { items: { name: string; isNew?: boolean }[] }) {
  return (
    <nav className="ap-chapter" aria-label="Products">
      <ul>
        {items.map((item) => (
          <li key={item.name}>
            <a href="#">
              <Media className="ap-chapter__icon" />
              <span className="ap-chapter__label">{item.name}</span>
              {item.isNew ? <span className="ap-chapter__new">New</span> : null}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const CHAPTERS = [
  { name: "Model Air" },
  { name: "Model Lite" },
  { name: "Model Pro", isNew: true },
  { name: "Desk One", isNew: true },
  { name: "Desk Mini", isNew: true },
  { name: "Desk Studio", isNew: true },
  { name: "Compare" },
  { name: "Find Yours" },
  { name: "Screens" },
  { name: "Add-ons" },
];

const FILTERS = ["All models", "Portable", "Desktop", "Screens"];

const LINEUP = [
  { name: "Model Lite", tag: 35, lines: 1, dots: 4 },
  { name: "Model Air 13 and 15", tag: 34, lines: 3, dots: 4 },
  { name: "Model Pro 14 and 16", tag: 40, lines: 3, dots: 2, isNew: true },
  { name: "Desk Studio", tag: 38, lines: 3, dots: 1, isNew: true },
  { name: "Desk One", tag: 36, lines: 3, dots: 6, isNew: true },
];

const REASONS = [
  [13, 30, 99],
  [11, 29, 78],
  [17, 60, 46],
  [14, 52, 78],
  [18, 19, 46],
  [19, 49, 103],
];

const ACCORDION = [
  [14, 391],
  [12, 267],
  [19, 131],
  [16, 180],
  [13, 210],
];

const QUICK: { header: number; big: number[]; small: number[] }[] = [
  { header: 11, big: [15, 11, 11, 11, 4, 8, 10, 8], small: [11, 21] },
  { header: 8, big: [], small: [8, 14, 15, 13, 14, 9, 14] },
  { header: 13, big: [], small: [11, 9, 8, 27, 13, 20, 18, 7, 16, 9, 13] },
];

/** Product family overview (/mac): ribbon, title with chapter strip, lineup shelf, reasons shelf, banners, accordion, quick links. */
export function FamilyScreen() {
  const [filter, setFilter] = useState(0);
  const [panel, setPanel] = useState(0);
  return (
    <Shell notes={{ list: [57, 1066], paragraphs: [886, 209, 1002, 2898, 4209, 3600, 67, 158, 105, 50] }} crumb="Desk">
      <Ribbon length={112} />
      <header className="ap-fam-head">
        <h1 className="ap-fam-head__title">Desk</h1>
        <ChapterNav items={CHAPTERS} />
      </header>

      <section className="ap-fam-sec ap-fam-sec--alt ap-fam-sec--reduced" aria-labelledby="fam-lineup">
        <div className="ap-fam-wrap">
          <SectionHead>
            <span id="fam-lineup">See every model.</span>
          </SectionHead>
          <div className="ap-segment" role="tablist" aria-label="Filter models">
            {FILTERS.map((name, index) => (
              <button key={name} type="button" role="tab" aria-selected={filter === index} onClick={() => setFilter(index)}>
                {name}
              </button>
            ))}
          </div>
        </div>
        <ul className="ap-shelf ap-lineup">
          {LINEUP.map((item, index) => (
            <li key={item.name} className="ap-lineup__card">
              <Media className="ap-lineup__img" />
              <div className="ap-lineup__dots" aria-hidden="true">
                {Array.from({ length: item.dots }, (_, dot) => (
                  <span key={dot} style={{ "--c": `hsl(${dot * 70} 12% ${70 - dot * 8}%)` } as CSSProperties} />
                ))}
              </div>
              <p className="ap-lineup__new">{item.isNew ? "New chip inside" : ""}</p>
              <h3 className="ap-lineup__name">{item.name}</h3>
              <p className="ap-lineup__tag">{headline(item.tag, index + 3)}.</p>
              <p className="ap-lineup__price" data-lines={item.lines}>
                {text(item.lines === 1 ? 35 : 91, index + 20)}
              </p>
              <div className="ap-lineup__ctas">
                <a href="#" className="ap-btn ap-btn--primary">
                  Learn more
                </a>
                <More>Buy</More>
              </div>
            </li>
          ))}
        </ul>
        <div className="ap-fam-wrap">
          <Paddles />
        </div>
      </section>

      <section className="ap-fam-sec ap-fam-sec--alt" aria-labelledby="fam-why">
        <div className="ap-fam-wrap">
          <SectionHead more="Shop Desk">
            <span id="fam-why">
              Reasons to buy your
              <br />
              next desk model here.
            </span>
          </SectionHead>
        </div>
        <ul className="ap-shelf ap-why">
          {REASONS.map(([eyebrow, title, body], index) => (
            <li key={index} className="ap-why__card">
              <h3 className="ap-why__eyebrow">{label(eyebrow ?? 12, index + 70)}</h3>
              <p className="ap-why__title">{headline(title ?? 30, index + 30)}.</p>
              <p className="ap-why__body">{text(body ?? 80, index + 31)}</p>
              <Media className="ap-why__img" />
              <span className="ap-why__plus" aria-hidden="true">
                <svg viewBox="0 0 12 12">
                  <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
            </li>
          ))}
        </ul>
        <div className="ap-fam-wrap">
          <Paddles />
        </div>
      </section>

      <section className="ap-fam-sec" aria-labelledby="fam-help">
        <div className="ap-fam-wrap">
          <SectionHead>
            <span id="fam-help">Help me decide.</span>
          </SectionHead>
          <a href="#" className="ap-banner ap-banner--wide">
            <span className="ap-banner__copy">
              <span className="ap-banner__title">Answer a few short questions to find the right model.</span>
              <span className="ap-btn ap-btn--primary">Get started</span>
            </span>
            <Media className="ap-banner__img" />
          </a>
        </div>
      </section>

      <section className="ap-fam-sec ap-fam-sec--alt ap-fam-sec--flush" aria-labelledby="fam-switch">
        <div className="ap-fam-wrap">
          <SectionHead>
            <span id="fam-switch">Moving to Desk.</span>
          </SectionHead>
          <div className="ap-banner-pair">
            <a href="#" className="ap-banner ap-banner--tall">
              <span className="ap-banner__title">{headline(33, 40)}.</span>
              <span className="ap-banner__body">{text(171, 41)}</span>
              <span className="ap-banner__link">Read the moving guide</span>
              <Media className="ap-banner__img" />
            </a>
            <a href="#" className="ap-banner ap-banner--tall">
              <span className="ap-banner__title">{headline(14, 42)}.</span>
              <span className="ap-banner__body">{text(40, 43)}</span>
              <span className="ap-banner__link">See how it works</span>
              <Media className="ap-banner__img" />
            </a>
          </div>
        </div>
      </section>

      <section className="ap-fam-sec ap-fam-sec--alt" aria-labelledby="fam-more">
        <div className="ap-fam-wrap">
          <SectionHead>
            <span id="fam-more">Works with more.</span>
          </SectionHead>
          <div className="ap-banner-pair">
            {[46, 57].map((body, index) => (
              <a key={index} href="#" className="ap-banner">
                <span className="ap-banner__title">{headline(15 - index, 44 + index)}.</span>
                <span className="ap-banner__body">{text(body, 45 + index)}</span>
                <span className="ap-banner__link">{index ? "Learn more" : "See what is possible"}</span>
                <Media className="ap-banner__img" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="ap-fam-sec" aria-labelledby="fam-features">
        <div className="ap-fam-wrap">
          <SectionHead more="Find out more about everyday use">
            <span id="fam-features">Built for what you do.</span>
          </SectionHead>
          <div className="ap-accordion">
            <div className="ap-accordion__list">
              {ACCORDION.map(([title, body], index) => (
                <div key={index} className="ap-accordion__item" data-open={panel === index ? "" : undefined}>
                  <h3>
                    <button type="button" aria-expanded={panel === index} onClick={() => setPanel(index)}>
                      {headline(title ?? 12, index + 50)}
                    </button>
                  </h3>
                  <div className="ap-accordion__panel" hidden={panel !== index}>
                    <p>{text(body ?? 200, index + 51)}</p>
                  </div>
                </div>
              ))}
            </div>
            <Media className="ap-accordion__img" />
          </div>
        </div>
      </section>

      <section className="ap-fam-sec ap-fam-sec--secondary" aria-labelledby="fam-quick">
        <div className="ap-fam-wrap">
          <SectionHead>
            <span id="fam-quick">Desk</span>
          </SectionHead>
          <div className="ap-quick">
            {QUICK.map((column, c) => (
              <div key={c} className="ap-quick__col">
                <h3>{label(column.header, c + 90)}</h3>
                {column.big.length ? (
                  <ul className="ap-quick__big">
                    {column.big.map((_, index) => (
                      <li key={index}>
                        <a href="#">{index === 0 ? "View All" : `Model ${index}`}</a>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <ul className="ap-quick__small">
                  {column.small.map((length, index) => (
                    <li key={index}>
                      <a href="#">{label(length, c * 20 + index + 91)}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Shell>
  );
}

