"use client";

import { Shell } from "../chrome";
import { Media, More, Paddles } from "../parts";
import { headline, label, text } from "../text";
import "./store.css";

/** Tinted cards stand in for the original color-backed cards; a leading "*" marks a dark tint that needs light text. */
type Shelf = { lead: string; rest: string; cards: ("promo" | "product" | "tall")[]; tints?: string[] };

const SHELVES: Shelf[] = [
  { lead: "Just in.", rest: "Bright new models for every day.", cards: ["tall", "tall", "tall", "tall"], tints: ["#f5c2d8", "#b3cfea", "#c4b7ec", "#9aceaa"] },
  { lead: "Make it yours.", rest: "Add a personal touch.", cards: ["promo", "product", "product", "product", "product"], tints: ["*#ef3e3b"] },
  { lead: "Seasonal picks.", rest: "Ready to wrap.", cards: ["promo", "product", "product", "product", "product"], tints: ["*#1f70a1"] },
  { lead: "Bold colors.", rest: "Find a shade you like.", cards: ["promo", "product", "product", "product", "product"], tints: ["#f0a884"] },
  { lead: "Home basics.", rest: "Room for more.", cards: ["promo", "product", "product", "product", "product"], tints: ["*#1b4c45"] },
  { lead: "Only here.", rest: "The full package.", cards: ["tall", "product", "tall", "tall"], tints: ["#fee283"] },
  { lead: "Deals and offers.", rest: "Special pricing, stores and more.", cards: ["tall", "tall", "tall", "tall"] },
];

const CHAPTERS = ["Desk", "Phone", "Slate", "Wrist", "Optic", "Home", "Earbuds", "Tag", "Add-ons", "Gift Card"];

/** Store front (/store): no region strip, ribbon, title row, product chapter strip, seven card shelves, quick links. */
export function StoreScreen() {
  return (
    <Shell region={false} notes={{ list: [1400, 900, 1200, 600], paragraphs: [3000, 2400, 3200, 1800, 2600, 2200, 1500, 2800, 1900, 2500, 1700, 2100, 900, 3000, 2400, 3200, 1800, 2600, 2200, 1500, 2800, 1900, 2500, 2600] }} crumb="Store">
      <div className="ap-st-ribbon">
        <p>
          {text(98, 4).replace(/\.$/, "")} <More>Learn more</More>
        </p>
      </div>
      <div className="ap-st">
        <header className="ap-st-head">
          <h1>Shop</h1>
          <div className="ap-st-head__side">
            <p>Gifts they will open twice this season.</p>
            <a href="#">Talk with an expert ↗</a>
            <a href="#">Find a store ↗</a>
          </div>
        </header>
        <nav className="ap-st-chapters" aria-label="Shop by product">
          <ul>
            {CHAPTERS.map((name) => (
              <li key={name}>
                <a href="#">
                  <Media className="ap-st-chapters__icon" />
                  <span>{name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {SHELVES.map((shelf, s) => (
          <section key={shelf.lead} className="ap-st-shelf" aria-label={shelf.lead}>
            <h2>
              <span>{shelf.lead}</span> {shelf.rest}
            </h2>
            <ul className="ap-st-shelf__row">
              {shelf.cards.map((kind, c) => {
                const tint = shelf.tints?.[c];
                const dark = tint?.startsWith("*") ?? false;
                return (
                <li key={c} className={`ap-st-card ap-st-card--${kind}${dark ? " ap-st-card--dark" : ""}`}>
                  <a href="#" className="ap-st-card__link" style={tint ? { background: tint.replace("*", "") } : undefined}>
                    {kind === "product" ? (
                      <>
                        <Media className="ap-st-card__img" />
                        <span className="ap-st-card__new">{c % 2 ? "New" : ""}</span>
                        <span className="ap-st-card__name">{`${label(12, s * 9 + c)} ${["One", "Two", "Mini"][c % 3]}`}</span>
                        <span className="ap-st-card__price">{c % 2 ? text(40, c) : `$${129 + c * 70}.00`}</span>
                      </>
                    ) : (
                      <>
                        <span className="ap-st-card__eyebrow">{label(10, s * 5 + c).toUpperCase()}</span>
                        <span className="ap-st-card__title">{headline(kind === "promo" ? 26 : 20, s * 7 + c)}</span>
                        <span className="ap-st-card__body">{text(kind === "promo" ? 20 : 70, s * 3 + c)}</span>
                        <Media className="ap-st-card__art" />
                      </>
                    )}
                  </a>
                </li>
                );
              })}
            </ul>
            <Paddles />
          </section>
        ))}
        <section className="ap-st-quick" aria-labelledby="st-quick">
          <h2 id="st-quick">Quick links</h2>
          <ul>
            {["Find a Store", "Track Order", "Help Center", "Send Back", "My Saves"].map((name) => (
              <li key={name}>
                <a href="#">{name} ↗</a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Shell>
  );
}
