"use client";

import { Chevron, Shell } from "../chrome";
import { Media, More, Paddles } from "../parts";
import { headline, label, text } from "../text";
import { LocalNav } from "./detail";
import "./values.css";

const FEATURES = [
  { label: "Screen Reader", title: 50, sub: true },
  { label: "Live Captions", title: 46, tint: "#d5edf8" },
  { label: "Hearing Assist", title: 44, dark: true },
  { label: "Personal Voice", title: 40 },
  { label: "Switch Control", title: 46 },
  { label: "Door Detection", title: 42, dark: true },
];

const RESOURCES = ["Help Videos", "Inclusion Support", "Helpful Accessories", "Assistive Tools"];

const VALUES = [
  { title: "Learning", body: 92 },
  { title: "Climate", body: 96 },
  { title: "Belonging and Fairness", body: 100 },
  { title: "Privacy", body: 94 },
];

function PlusButton({ name, dark = false }: { name: string; dark?: boolean }) {
  return (
    <button type="button" className={`ap-vl-plus${dark ? " ap-vl-plus--dark" : ""}`} aria-label={`More about ${name}`}>
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    </button>
  );
}

/** Values editorial (/accessibility, /privacy, /environment): sticky media hero with intro, feature shelf, resources, story shelf, news list, value cards. */
export function ValuesScreen() {
  return (
    <Shell
      dark
      buystrip
      localNav={<LocalNav title="Inclusion" links={["Overview", "Features"]} buy={false} dark />}
      notes={{ list: [139, 548, 1484, 276, 67, 588, 543, 144, 166, 101, 139], paragraphs: [] }}
      crumb="Inclusion"
    >
      <section className="ap-vl-hero" aria-labelledby="vl-hero">
        <div className="ap-vl-hero__sticky ap-on-dark">
          <Media className="ap-vl-hero__media" dark />
          <span className="ap-vl-hero__icon" aria-hidden="true" />
          <h1 id="vl-hero">
            Built so everyone
            <br />
            can take part.
          </h1>
        </div>
        <p className="ap-vl-hero__intro">{text(257, 801)}</p>
      </section>

      <section className="ap-vl ap-vl--features" aria-labelledby="vl-features">
        <div className="ap-vl__head">
          <h2 id="vl-features" className="ap-vl__title ap-vl__title--56">
            {headline(66, 802)}.
          </h2>
          <More className="ap-vl__cta">See every feature</More>
        </div>
        <ul className="ap-vl-row">
          {FEATURES.map((card, index) => (
            <li
              key={card.label}
              className={`ap-vl-feature${card.dark ? " ap-vl-feature--dark ap-on-dark" : ""}`}
              style={card.tint ? { background: card.tint } : undefined}
            >
              <div className="ap-vl-feature__copy">
                <h3>{card.label}</h3>
                <p>{headline(card.title, index + 810)}.</p>
                {card.sub ? <p className="ap-vl-feature__sub">{label(22, index + 820)}</p> : null}
              </div>
              <Media className="ap-vl-feature__media" dark={card.dark} />
              <PlusButton name={card.label} dark={!card.dark} />
            </li>
          ))}
        </ul>
        <div className="ap-vl-paddles">
          <Paddles />
        </div>
      </section>

      <section className="ap-vl ap-vl--resources" aria-labelledby="vl-resources">
        <h2 id="vl-resources" className="ap-vl__title">
          Find help and tools for inclusion.
        </h2>
        <ul className="ap-vl-row">
          {RESOURCES.map((name, index) => (
            <li key={name} className="ap-vl-card">
              <span className="ap-vl-card__icon" aria-hidden="true" />
              <h3>{name}</h3>
              <p>{text(58, index + 830)}</p>
              <span className="ap-vl-card__go" aria-hidden="true">
                <Chevron />
              </span>
            </li>
          ))}
        </ul>
        <div className="ap-vl-paddles">
          <Paddles />
        </div>
      </section>

      <section className="ap-vl ap-vl--stories" aria-labelledby="vl-stories">
        <h2 id="vl-stories" className="ap-vl__title ap-vl__title--56">
          See how inclusive design
          <br />
          changes everyday life.
        </h2>
        <ul className="ap-vl-row">
          {[0, 1, 2].map((index) => (
            <li key={index} className="ap-vl-story ap-on-dark">
              <Media className="ap-vl-story__media" dark />
              <div className="ap-vl-story__copy">
                <p className="ap-vl-story__title">{headline(48, index + 840)}.</p>
                <p className="ap-vl-story__cta">Watch now</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="ap-vl-paddles">
          <Paddles />
        </div>
      </section>

      <section className="ap-vl ap-vl--news" aria-labelledby="vl-news">
        <h2 id="vl-news" className="ap-vl__title">
          More news on inclusion.
        </h2>
        <ul className="ap-vl-news">
          {Array.from({ length: 6 }, (_, index) => (
            <li key={index}>
              <a href="#">
                <Media className="ap-vl-news__media" />
                <div>
                  <p className="ap-vl-news__tag">{index % 3 === 2 ? "FEATURE" : index < 2 ? "UPDATE" : "PRESS RELEASE"}</p>
                  <h3>{headline(70, index + 850)}</h3>
                  <p className="ap-vl-news__date">Month 00, 2026</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <div className="ap-vl-news__more">
          <button type="button">
            <Chevron dir="down" />
            Show more
          </button>
        </div>
      </section>

      <section className="ap-vl ap-vl--values" aria-labelledby="vl-values">
        <h2 id="vl-values" className="ap-vl__title">
          Values that guide our work.
        </h2>
        <ul className="ap-vl-row">
          {VALUES.map((value, index) => (
            <li key={value.title} className="ap-vl-card ap-vl-card--value">
              <span className="ap-vl-card__icon" aria-hidden="true" />
              <h3>{value.title}</h3>
              <p>{text(value.body, index + 860)}</p>
              <More>Learn more</More>
            </li>
          ))}
        </ul>
        <div className="ap-vl-paddles">
          <Paddles />
        </div>
      </section>
    </Shell>
  );
}
