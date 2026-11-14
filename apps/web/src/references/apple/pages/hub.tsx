"use client";

import { useState } from "react";
import { Chevron, Shell } from "../chrome";
import { Media, More, Paddles } from "../parts";
import { headline, text } from "../text";
import { LocalNav } from "./detail";
import "./hub.css";

type Card = { label: string; title: number; light?: boolean; width?: "wide" };

/** Card copy lengths keep the original's line counts (3 lines in a 372px card, 2 in a 696px card). */
const FACTS: Card[] = [
  { label: "Speed", title: 46 },
  { label: "Built-in Smarts", title: 50, light: true },
  { label: "Team Choice", title: 48 },
  { label: "Savings", title: 44 },
  { label: "Care", title: 46 },
];

const MAKES: Card[] = [
  { label: "Simple Tools", title: 46 },
  { label: "Built-in Smarts", title: 34, light: true, width: "wide" },
  { label: "Value", title: 52, width: "wide" },
  { label: "Security", title: 44 },
];

const NEWS = [
  { lead: "What changed this season.", body: 96 },
  { lead: "The newest desk model.", body: 84 },
  { lead: "Setup in one afternoon.", body: 92 },
  { lead: "Tools for the front desk.", body: 88 },
];

const STATS = [
  { value: "Teams save 90 minutes a week on routine setup.", note: 58 },
  { value: "Desk models use half the power of last year.", note: 58 },
  { value: "Updates land twice as fast as before.", note: 39 },
];

const STORIES = [
  { lead: "Northside Clinics.", body: 118 },
  { lead: "Harbor Freight Co.", body: 124 },
  { lead: "Maple Schools.", body: 110 },
  { lead: "Riverbank Studio.", body: 116 },
  { lead: "Summit Partners.", body: 120 },
];

const TABS = ["Desk", "Slate", "Phone", "Headset Pro", "Screens"];

const PRODUCTS = [
  { name: "Desk Air", chip: "with Core 2", fit: 40 },
  { name: "Desk Air 13 in and 15 in", chip: "with Core 5", fit: 54 },
  { name: "Desk Pro 14 in and 16 in", chip: "with Core 5 or Core 5 Plus", fit: 48, fresh: true },
  { name: "Desk Studio 24 in", chip: "with Core 5", fit: 52 },
  { name: "Desk Mini", chip: "with Core 5 or Core 5 Plus", fit: 44 },
  { name: "Desk Tower", chip: "with Core 5 Plus", fit: 50 },
  { name: "Desk Display", chip: "27 in panel", fit: 46 },
];

const STEPS = [
  { title: "Small Teams", links: ["Shop online for your team", "Talk with a specialist", "Call 0-800-000-0000"] },
  { title: "Larger Groups", links: ["Reach a sales specialist for groups"] },
  { title: "Reseller Network", links: ["Find a nearby partner"] },
];

const FAQ = [45, 72, 40, 38, 68, 66, 42, 50, 46];

function Gallery({ cards, dark = false }: { cards: Card[]; dark?: boolean }) {
  return (
    <>
      <ul className="ap-hb-row">
        {cards.map((card, index) => (
          <li key={index} className={`ap-hb-card${card.light ? " ap-hb-card--light" : ""}${card.width ? " ap-hb-card--wide" : ""}`}>
            <Media className="ap-hb-card__media" dark={!card.light} />
            <div className="ap-hb-card__copy">
              <h3>{card.label}</h3>
              <p>{headline(card.title, index + 700 + (dark ? 20 : 0))}.</p>
            </div>
            <button type="button" className="ap-hb-card__more" aria-label={`More about ${card.label}`}>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      <div className="ap-hb-paddles">
        <Paddles dark={dark} />
      </div>
    </>
  );
}

function Faq() {
  const [open, setOpen] = useState<number[]>([]);
  const all = open.length === FAQ.length;
  return (
    <>
      <div className="ap-hb-faq__all">
        <button type="button" onClick={() => setOpen(all ? [] : FAQ.map((_, index) => index))}>
          {all ? "Collapse all" : "Expand all"}
        </button>
      </div>
      <ul className="ap-hb-faq">
        {FAQ.map((length, index) => {
          const isOpen = open.includes(index);
          return (
            <li key={index}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? open.filter((item) => item !== index) : [...open, index])}
                >
                  <span>{headline(length, index + 760)}?</span>
                  <Chevron dir="down" />
                </button>
              </h3>
              <div className="ap-hb-faq__panel" hidden={!isOpen}>
                <p>{text(220, index + 780)}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

/** Audience hub (/business, /education, /healthcare): dark welcome, card galleries, stats, banner, product tabs, next steps, FAQ, router. */
export function HubScreen() {
  const [tab, setTab] = useState(0);
  return (
    <Shell
      dark
      darkFooter
      localNav={<LocalNav title="Acme for Teams" links={["Small Teams", "Large Groups"]} dark />}
      notes={{ list: [107, 656, 93, 121, 200, 141, 182, 313, 184, 40], paragraphs: [2530, 126, 27] }}
      crumb="For Teams"
    >
      <section className="ap-hb-welcome ap-on-dark" aria-labelledby="hb-title">
        <Media className="ap-hb-welcome__media" dark />
        <div className="ap-hb-wrap">
          <h1 id="hb-title">Acme for Teams</h1>
          <p>{text(226, 701)}</p>
        </div>
      </section>

      <section className="ap-hb ap-hb--facts" aria-labelledby="hb-facts">
        <h2 id="hb-facts" className="ap-hb__title">
          Teams get more done with Desk.
        </h2>
        <Gallery cards={FACTS} />
      </section>

      <section className="ap-hb ap-hb--news ap-on-dark" aria-labelledby="hb-news">
        <h2 id="hb-news" className="ap-hb__title">
          Fresh and worth a look.
        </h2>
        <ul className="ap-hb-row">
          {NEWS.map((item, index) => (
            <li key={index} className="ap-hb-news">
              <Media className="ap-hb-news__media" dark />
              <p className="ap-hb-news__caption">
                <strong>{item.lead}</strong> {text(item.body, index + 720)}
              </p>
              <a href="#" className="ap-hb-news__cta">
                {index === 0 ? "Watch the clip" : "Read the overview"}
                <Chevron />
              </a>
            </li>
          ))}
        </ul>
        <div className="ap-hb-paddles">
          <Paddles dark />
        </div>
      </section>

      <section className="ap-hb ap-hb--makes ap-on-dark" aria-labelledby="hb-makes">
        <h2 id="hb-makes" className="ap-hb__title">
          Devices and software
          <br />
          built to fit together.
        </h2>
        <Gallery cards={MAKES} dark />
        <ul className="ap-hb-stats">
          {STATS.map((stat, index) => (
            <li key={index}>
              <p className="ap-hb-stats__value">{stat.value}</p>
              <p className="ap-hb-stats__note">{text(stat.note, index + 740)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="ap-hb ap-hb--stories ap-on-dark" aria-labelledby="hb-stories">
        <h2 id="hb-stories" className="ap-hb__title">
          Real teams.
          <br />
          Real results.
        </h2>
        <ul className="ap-hb-row">
          {STORIES.map((story, index) => (
            <li key={index} className="ap-hb-story">
              <Media className="ap-hb-story__media" dark />
              <p className="ap-hb-story__caption">
                <strong>{story.lead}</strong> {text(story.body, index + 750)}
              </p>
              <More className="ap-hb-story__cta">See the case</More>
            </li>
          ))}
        </ul>
        <div className="ap-hb-paddles">
          <Paddles dark />
        </div>
      </section>

      <div className="ap-hb-light">
        <section className="ap-hb-banner" aria-labelledby="hb-banner">
          <a href="#" className="ap-hb-banner__card">
            <div className="ap-hb-banner__copy">
              <div className="ap-hb-banner__badge">
                <Media className="ap-hb-banner__mark" />
                Teams
              </div>
              <h2 id="hb-banner">A single kit of tools to plan, run and grow your team.</h2>
              <span className="ap-hb-banner__more">
                Learn more <Chevron />
              </span>
            </div>
            <Media className="ap-hb-banner__media" />
          </a>
        </section>

        <section className="ap-hb-products" aria-labelledby="hb-products">
          <h2 id="hb-products" className="ap-hb__title">
            Find the right device
            <br />
            for each role.
          </h2>
          <div className="ap-hb-tabs" role="tablist" aria-label="Product families">
            {TABS.map((name, index) => (
              <button key={name} type="button" role="tab" aria-selected={tab === index} onClick={() => setTab(index)}>
                {name}
              </button>
            ))}
          </div>
          <ul className="ap-hb-row ap-hb-row--products" role="tabpanel" aria-label={TABS[tab]}>
            {PRODUCTS.map((product, index) => (
              <li key={index} className="ap-hb-product">
                <Media className="ap-hb-product__media" />
                <ul className="ap-hb-product__colors" aria-label="Finishes">
                  {["#e3e4e5", "#c8d8e0", "#f0e4d3", "#2e3642"].map((color) => (
                    <li key={color} style={{ background: color }} />
                  ))}
                </ul>
                <h3>
                  {product.fresh ? <span className="ap-hb-product__new">New finish</span> : null}
                  <span className="ap-hb-product__name">{product.name}</span>
                  <span className="ap-hb-product__chip">{product.chip}</span>
                </h3>
                <p className="ap-hb-product__fit">{text(product.fit, index + 790)}</p>
                <p className="ap-hb-product__price">From $0,000 or $00.00/mo. for 12 mo.</p>
                <div className="ap-hb-product__ctas">
                  <a href="#" className="ap-btn ap-btn--primary">
                    Learn more
                  </a>
                  <More>Buy</More>
                </div>
              </li>
            ))}
          </ul>
          <div className="ap-hb-paddles">
            <Paddles />
          </div>
        </section>

        <section className="ap-hb-steps" aria-labelledby="hb-steps">
          <h2 id="hb-steps" className="ap-hb__title">
            Pick your next move.
          </h2>
          <ul className="ap-hb-row ap-hb-row--steps">
            {STEPS.map((step) => (
              <li key={step.title} className="ap-hb-step">
                <span className="ap-hb-step__icon" aria-hidden="true" />
                <h3>{step.title}</h3>
                <ul>
                  {step.links.map((link) => (
                    <li key={link}>
                      <More>{link}</More>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className="ap-hb-paddles ap-hb-paddles--phone">
            <Paddles />
          </div>
        </section>
      </div>

      <section className="ap-hb ap-hb--faq" aria-labelledby="hb-faq">
        <h2 id="hb-faq" className="ap-hb__title">
          Questions and answers.
        </h2>
        <Faq />
      </section>

      <section className="ap-hb-router ap-on-dark" aria-labelledby="hb-router">
        <h2 id="hb-router">Acme for Teams</h2>
        <nav aria-label="Acme for Teams">
          <div>
            <h3>Keep exploring</h3>
            <ul className="ap-hb-router__big">
              {["Small Teams", "Larger Groups", "Acme and Clinics", "Acme and Agencies"].map((name) => (
                <li key={name}>
                  <a href="#">{name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Shop</h3>
            <ul>
              {["Desk", "Slate", "Phone", "Headset Pro"].map((name) => (
                <li key={name}>
                  <a href="#">{name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Find out</h3>
            <ul>
              {["Payment Plans", "Trade Up"].map((name) => (
                <li key={name}>
                  <a href="#">{name}</a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </section>
    </Shell>
  );
}
