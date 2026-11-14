"use client";

import { Shell } from "../chrome";
import { Dots, Media, TileCopy } from "../parts";
import { headline, text } from "../text";
import "./home.css";

type Promo = { title: string; sub: number; dark?: boolean; split?: boolean; cta2?: string };

const PROMOS: Promo[] = [
  { title: "Model Four Max", sub: 12, dark: true },
  { title: "Stream Box", sub: 36 },
  { title: "Wrist Series", sub: 52, dark: true, split: true },
  { title: "Slate", sub: 70 },
  { title: "Swap Plan", sub: 30, cta2: "" },
  { title: "Card", sub: 48, cta2: "Apply now" },
];

const SHELF = [74, 86, 85, 28, 68, 108, 99, 69];

/** Home: three full-width hero tiles, a 2x3 promo grid, a media carousel. Layout from / (5955px at 1440). */
export function HomeScreen() {
  return (
    <Shell>
      <section className="ap-home-hero" aria-label="Featured">
        <article className="ap-htile">
          <a href="#" className="ap-htile__link" aria-label="Model Hub" />
          <TileCopy title="Model Hub" sub={headline(24, 1)} secondary="Buy" />
          <Media className="ap-htile__media" />
        </article>
        <article className="ap-htile ap-htile--mosaic ap-on-dark">
          <a href="#" className="ap-htile__link" aria-label="Seasonal gifts" />
          <Media className="ap-htile__mosaic-top" dark />
          <Media className="ap-htile__mosaic-left" dark />
          <Media className="ap-htile__mosaic-right" dark />
          <TileCopy title="Gifts worth giving." sub={headline(36, 2)} primary="Shop gifts" />
        </article>
        <article className="ap-htile">
          <a href="#" className="ap-htile__link" aria-label="Model Fold" />
          <TileCopy title="Model Fold" sub="Open it up." secondary="Buy" />
          <Media className="ap-htile__media ap-htile__media--wide" />
        </article>
      </section>

      <section className="ap-home-promo" aria-label="More to explore">
        {PROMOS.map((promo, index) => (
          <article key={promo.title} className={`ap-ptile${promo.dark ? " ap-ptile--dark ap-on-dark" : ""}${promo.split ? " ap-ptile--split" : ""}`}>
            <a href="#" className="ap-htile__link" aria-label={promo.title} />
            <TileCopy level="h3" title={promo.title} sub={headline(promo.sub, index + 10)} secondary={promo.cta2 === undefined ? "Buy" : promo.cta2 || undefined} />
            <Media className="ap-ptile__media" dark={promo.dark} />
          </article>
        ))}
      </section>

      <section className="ap-home-media" aria-label="Media">
        <h2 className="ap-home-media__title">Something for every evening.</h2>
        <div className="ap-home-media__track">
          {[0, 1, 2].map((index) => (
            <a key={index} href="#" className={`ap-home-media__card${index === 1 ? " is-current" : ""}`}>
              <Media className="ap-home-media__art" dark />
              <span className="ap-home-media__caption">
                <span className="ap-home-media__pill">Watch now</span>
                <span>{text(SHELF[index] ?? 60, index).replace(/\.$/, "")}</span>
              </span>
            </a>
          ))}
        </div>
        <div className="ap-home-media__row">
          {[0, 1, 2, 3, 4].map((index) => (
            <a key={index} href="#" className="ap-home-media__small">
              <Media className="ap-home-media__art" dark />
              <span className="ap-home-media__pill">{["Listen now", "Watch now", "Play now", "Listen now", "Read now"][index]}</span>
            </a>
          ))}
        </div>
        <div className="ap-home-media__nav">
          <Dots count={7} />
          <button type="button" className="ap-home-media__play" aria-label="Play">
            <svg viewBox="0 0 10 10" aria-hidden="true">
              <path d="M2.5 1.5v7l6-3.5z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </section>
    </Shell>
  );
}
