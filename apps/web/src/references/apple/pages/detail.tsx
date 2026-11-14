"use client";

import type { ReactNode } from "react";
import { Shell } from "../chrome";
import { Media, Paddles } from "../parts";
import { headline, label, text } from "../text";
import "./detail.css";

/** Sticky product bar: title left, optional links and a small Buy pill right. Turns frosted once stuck. */
export function LocalNav({
  title,
  links = [],
  dark = false,
  buy = true,
  solid = false,
  extra,
}: {
  title: string;
  links?: string[];
  dark?: boolean;
  /** Pages without a store action (notices, press room) drop the Buy pill. */
  buy?: boolean;
  /** Opaque bar that takes its own 52px instead of floating over the first section. */
  solid?: boolean;
  extra?: ReactNode;
}) {
  return (
    <nav className={`ap-ln${dark ? " ap-ln--dark" : ""}${solid ? " ap-ln--solid" : ""}`} aria-label={title}>
      <div className="ap-ln__content">
        <a href="#" className="ap-ln__title">
          {title}
        </a>
        <div className="ap-ln__menu">
          {links.length ? (
            <ul>
              {links.map((link, index) => (
                <li key={link}>
                  <a href="#" aria-current={index === 0 ? "page" : undefined}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          {extra}
          {buy ? (
            <a href="#" className="ap-ln__buy">
              Buy
            </a>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

function Compat({ count, dark = false }: { count: number; dark?: boolean }) {
  return (
    <div className={`ap-det-compat${dark ? " ap-det-compat--dark" : ""}`}>
      <h3>Works with these</h3>
      <ul>
        {Array.from({ length: count }, (_, index) => (
          <li key={index}>
            <strong>{`Slate ${["Max", "Air", "Mini", "One", "Lite"][index % 5]} ${13 - (index % 3)} in`}</strong>
            <span>{index % 2 ? "(second generation)" : "(with chip M9)"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const FEATURES = [
  [23, 39],
  [11, 46],
  [16, 41],
  [19, 54],
  [21, 37],
  [22, 51],
  [20, 33],
  [15, 44],
  [13, 52],
  [10, 49],
  [14, 40],
  [12, 45],
  [17, 38],
  [11, 42],
];

/** Product detail (accessory survey page): sticky local nav, centred hero, two full-bleed product chapters, feature matrix, finder. */
export function DetailScreen() {
  return (
    <Shell
      localNav={<LocalNav title="Stylus" />}
      notes={{ list: [259, 53, 57], paragraphs: [56, 86, 77, 1793, 1775] }}
      crumb="Stylus"
    >
      <section className="ap-det-hero">
        <h1 className="ap-det-hero__title">Sketch it. Note it.</h1>
        <Media className="ap-det-hero__img" />
      </section>

      <section className="ap-det-chapter ap-det-chapter--dark ap-on-dark" aria-labelledby="det-one">
        <div className="ap-det-wrap">
          <div className="ap-det-intro">
            <h2 id="det-one">Stylus Two</h2>
            <p className="ap-det-intro__price">$149</p>
            <a href="#" className="ap-btn ap-btn--primary">
              Buy
            </a>
            <p className="ap-det-intro__body">{text(563, 3)}</p>
          </div>
          <Media className="ap-det-chapter__art" dark />
          <Compat count={10} dark />
        </div>
        <Media className="ap-det-chapter__wide" dark />
        <div className="ap-det-wrap">
          <ul className="ap-det-cards">
            {[0, 1, 2, 3].map((index) => (
              <li key={index} className="ap-det-card">
                <Media className="ap-det-card__media" dark />
                <div className="ap-det-card__copy">
                  <h3>{label(7, index + 10)}</h3>
                  <p>{text(130, index + 11)}</p>
                </div>
              </li>
            ))}
          </ul>
          <Paddles dark />
        </div>
      </section>

      <section className="ap-det-chapter" aria-labelledby="det-two">
        <div className="ap-det-wrap">
          <div className="ap-det-intro">
            <h2 id="det-two">
              Stylus
              <br />
              <span>Mini</span>
            </h2>
            <p className="ap-det-intro__price">$79</p>
            <a href="#" className="ap-btn ap-btn--primary">
              Buy
            </a>
            <p className="ap-det-intro__body">{text(379, 5)}</p>
          </div>
          <Media className="ap-det-chapter__art ap-det-chapter__art--tall" />
          <Compat count={14} />
        </div>
        <Media className="ap-det-chapter__wide ap-det-chapter__wide--light" />
      </section>

      <section className="ap-det-features" aria-labelledby="det-features">
        <div className="ap-det-matrix">
          <div className="ap-det-matrix__head">
            <h2 id="det-features">
              Stylus
              <br />
              features
            </h2>
            <div className="ap-det-matrix__cols">
              {["Stylus Two", "Stylus Mini"].map((name) => (
                <div key={name}>
                  <p>{name}</p>
                  <Media className="ap-det-matrix__pen" />
                </div>
              ))}
            </div>
          </div>
          <ul>
            {FEATURES.map(([title, desc], index) => (
              <li key={index}>
                <Media className="ap-det-matrix__img" />
                <div>
                  <p className="ap-det-matrix__name">{headline(title ?? 15, index + 60)}</p>
                  <p className="ap-det-matrix__desc">{text(desc ?? 40, index + 61)}</p>
                </div>
                <span className="ap-det-matrix__mark" aria-label="Yes">
                  ✓
                </span>
                <span className="ap-det-matrix__mark" aria-label={index % 3 === 2 ? "No" : "Yes"}>
                  {index % 3 === 2 ? "-" : "✓"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ap-det-finder" aria-labelledby="det-finder">
        <h2 id="det-finder">Find the stylus that pairs with your slate.</h2>
        <label className="ap-det-finder__select">
          <span className="ap-visually-hidden">Choose your slate model</span>
          <select defaultValue="">
            <option value="">Choose your model</option>
            <option>Slate Max</option>
            <option>Slate Air</option>
          </select>
        </label>
        <Media className="ap-det-finder__tile" />
        <p className="ap-det-finder__note">{text(121, 70)}</p>
        <p className="ap-det-finder__note">
          {text(60, 71)} <a href="#">Check your slate version</a> or <a href="#">Learn more</a>
        </p>
      </section>

      <section className="ap-det-values" aria-label="Why buy here">
        {[0, 1, 2, 3, 4].map((index) => (
          <div key={index} className="ap-det-value">
            <span className="ap-det-value__icon" aria-hidden="true" />
            <h3>{headline(18, index + 80)}</h3>
            <p>{text(70, index + 81)}</p>
            <a href="#">Learn more</a>
          </div>
        ))}
      </section>
    </Shell>
  );
}
