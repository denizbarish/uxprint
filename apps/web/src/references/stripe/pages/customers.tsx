"use client";

import { useState } from "react";
import { LegacyPage, Media, SubNav } from "../chrome";
import { useBrand, withBrand } from "../brand";
import { Chevron } from "../icons";
import { Band } from "./solution";

function Pill({ children, ghost = false, ink = false }: { children: string; ghost?: boolean; ink?: boolean }) {
  return (
    <a href="#" className={`s-pill${ghost ? " s-pill--ghost" : ""}${ink ? " c-ink" : ""}`}>
      {children}
      <Chevron />
    </a>
  );
}

const mosaic = [
  { left: 540, top: 119, color: "#ffb100", label: "Read story" },
  { left: 810, top: 59, color: "#ffa0b6", label: "Read story" },
  { left: 1080, top: 154, color: "#874fff", label: "Watch video" },
  { left: 540, top: 491, color: "#26251e", label: "Read story" },
  { left: 810, top: 431, color: "#2e2827", label: "Read story" },
  { left: 1080, top: 526, color: "#1e52f1", label: "Read story" },
];

const results = [
  ["$70M", "total rise in a delivery app's yearly revenue"],
  ["6 months faster", "for a clinic platform to launch payments"],
  ["10%", "lift in a messaging firm's approval rate"],
  ["12 new countries", "reached by a health app in one month"],
];

const useCases = ["Marketplaces", "SaaS", "Platforms", "Ecommerce"];

const tiles = [
  { col: 0, top: 403, h: 624, title: "A crowdfunding site grows its global reach and keeps improving the backer experience" },
  { col: 1, top: 407, h: 309, title: "Behind the scenes: how a grocery app powers same-day delivery at scale" },
  { col: 1, top: 713, h: 309, title: "A food app lifts checkout conversion and launches a new instant payout feature" },
  { col: 0, top: 1019, h: 309, title: "A delivery service lifts approval rates, adding millions in yearly revenue" },
  { col: 0, top: 1325, h: 309, title: "An events app tripled trial conversions with recurring plans" },
  { col: 1, top: 1015, h: 624, title: "A rideshare company improves the driver and rider experience" },
];

export function CustomersScreen() {
  const brand = useBrand();
  const b = (text: string) => withBrand(text, brand);
  const [size, setSize] = useState(0);
  const [useCase, setUseCase] = useState(0);

  return (
    <LegacyPage accent="#635bff">
      <SubNav name="Customers" links={["Overview", "All customer stories"]} active={1} />

      <section className="c-hero">
        <div className="p-container">
          <h1 className="p-display c-hero__title">The payments platform behind millions of businesses</h1>
          <p className="p-lead c-hero__lead">
            {b(
              "We are building a platform for ambitious companies around the world to make moving money as simple, borderless, and programmable as the rest of the internet. Our teams are based in many global offices, and we serve hundreds of thousands of businesses each year, from new startups to the largest companies.",
            )}
          </p>
          <div className="p-actions">
            <Pill ink>See all stories</Pill>
            <a href="#" className="s-pill s-pill--ghost c-ink-text">
              Contact sales
              <Chevron />
            </a>
          </div>
          {mosaic.map((card, index) => (
            <a key={index} href="#" className="c-mosaic" style={{ left: card.left, top: card.top, background: card.color }}>
              <Media className="c-mosaic__media" tone="dark" />
              <span>{card.label}</span>
            </a>
          ))}
        </div>
      </section>

      <Band height={707} className="c-results">
        <h2 className="p-h2">We help customers reach measurable results</h2>
        <div className="p-grid4 c-results__grid">
          {results.map(([value, label]) => (
            <div key={value} className="p-feature">
              <p className="c-stat">{value}</p>
              <p className="p-body">{label}</p>
            </div>
          ))}
        </div>
      </Band>

      <Band height={360} tint className="c-logos">
        <div className="c-logos__grid">
          {Array.from({ length: 8 }, (_, index) => (
            <Media key={index} className="c-logos__item" tone="plain" />
          ))}
        </div>
      </Band>

      <Band height={1125} className="c-size">
        <p className="p-eyebrow">Customers by size</p>
        <h2 className="p-h2 c-narrow">{b("Companies of all sizes around the world use Acme")}</h2>
        <div className="c-toolbar">
          <div className="c-segment" role="tablist" aria-label="Company size">
            {["Startup", "Enterprise"].map((label, index) => (
              <button key={label} type="button" role="tab" aria-selected={size === index} onClick={() => setSize(index)}>
                {label}
              </button>
            ))}
          </div>
          <a href="#" className="c-all">
            All customer stories
          </a>
        </div>
        <div className="c-story">
          <div className="c-story__stats">
            <p className="c-stat">Weeks to minutes</p>
            <p className="p-body">Cut in customer onboarding time</p>
            <p className="c-stat c-gap">2-5x faster</p>
            <p className="p-body">Faster reconciliation with one report</p>
            <h3 className="p-feature__title c-gap">Products used</h3>
            <ul className="c-used">
              <li>Plans</li>
              <li>Platforms</li>
              <li className="c-more">3 more</li>
            </ul>
          </div>
          <a href="#" className="c-story__card">
            <Media className="c-fill" tone="cool" />
            <span className="c-story__title">{b("A giving platform built on Acme creates best-in-class fundraising for nonprofits")}</span>
          </a>
        </div>
        <div className="c-marks">
          {Array.from({ length: 3 }, (_, index) => (
            <button key={index} type="button" className="c-marks__item" aria-label={`Show story ${index + 1}`} aria-pressed={index === 0}>
              <Media className="c-marks__logo" tone="plain" />
            </button>
          ))}
        </div>
      </Band>

      <Band height={1311} tint className="c-partner">
        <p className="p-eyebrow">Building together</p>
        <h2 className="p-h2 c-wide">We partner with customers to build breakthrough products</h2>
        <p className="p-lead c-wide">{b("Acme is a fast-moving payments platform and builds new products together with customers, specifically for our customers' needs.")}</p>
        <h3 className="p-h3 c-case__title">How we built instant payouts with a rideshare app</h3>
        <div className="c-case">
          <h4 className="p-feature__title">Challenge</h4>
          <p className="p-body">The top request from drivers was the ability to get paid faster. Weekly payouts were the norm, and many drivers needed their earnings sooner to cover daily costs.</p>
          <h4 className="p-feature__title c-gap">Solution</h4>
          <p className="p-body">{b("The team worked with Acme to build an express payout feature, giving drivers the ability to cash out their earnings as often as they like.")}</p>
          <h4 className="p-feature__title c-gap">Products</h4>
          <ul className="c-links">
            <li>
              <a href="#">Platforms</a>
            </li>
            <li>
              <a href="#">Payments</a>
            </li>
          </ul>
        </div>
        <Media className="c-phone" tone="soft" />
        <Media className="c-photo" tone="warm" />
        <div className="c-marks c-marks--four">
          {Array.from({ length: 4 }, (_, index) => (
            <button key={index} type="button" className="c-marks__item" aria-label={`Show partner ${index + 1}`} aria-pressed={index === 0}>
              <Media className="c-marks__logo" tone="plain" />
            </button>
          ))}
        </div>
      </Band>

      <Band height={1748} className="c-cases">
        <p className="p-eyebrow">Customers by use case</p>
        <h2 className="p-h2 c-narrow">We speed up growth for all types of businesses</h2>
        <div className="c-tabs" role="tablist" aria-label="Use case">
          {useCases.map((label, index) => (
            <button key={label} type="button" role="tab" aria-selected={useCase === index} onClick={() => setUseCase(index)}>
              {label}
            </button>
          ))}
        </div>
        {tiles.map((tile) => (
          <a key={tile.title} href="#" className="c-tile" style={{ top: tile.top, left: tile.col === 0 ? -8 : 540, height: tile.h }}>
            <Media className="c-fill" tone={tile.col === 0 ? "warm" : "cool"} />
            <span className="c-tile__title">{tile.title}</span>
          </a>
        ))}
      </Band>

      <Band height={1493} tint className="c-solutions">
        <p className="p-eyebrow">Customers by solution</p>
        <h2 className="p-h2 c-wide">{"We obsess over payments so our customers don't have to"}</h2>
        <div className="c-cols">
          <p className="p-lead">Our teams think hard about the right features so that we can offer a powerful platform without making you spend months building payment features.</p>
          <p className="p-lead">That means more time to focus on your core product and customer experience, and less time spent on payments or edge cases.</p>
        </div>
        <ul className="c-solution-links">
          {["Accept payments", "Run plans and renewals", "Offer flexible payouts", "Tune checkout", "Reduce fraud", "Scale global payments", "Lift conversion", "Embed financial services"].map((item) => (
            <li key={item}>
              <a href="#">{item}</a>
            </li>
          ))}
        </ul>
        <Media className="c-collage" tone="soft" />
      </Band>

      <Band height={618} className="c-cta">
        <div className="u-cta">
          <div>
            <h3 className="p-h3">Ready to get started?</h3>
            <p className="p-lead">Create an account and start taking payments with no contracts or banking details required. Or, contact us to design a custom package for your business.</p>
            <div className="p-actions">
              <Pill>Start now</Pill>
              <Pill ghost>Contact sales</Pill>
            </div>
          </div>
          <div className="p-feature">
            <span className="p-feature__icon" data-compare-mask="" />
            <h3 className="p-feature__title">Always know what you pay</h3>
            <p className="p-body">Simple per-charge pricing with no hidden fees</p>
            <Pill ghost>Pricing details</Pill>
          </div>
          <div className="p-feature">
            <span className="p-feature__icon" data-compare-mask="" />
            <h3 className="p-feature__title">Start your integration</h3>
            <p className="p-body">{b("Get up and running with Acme in as little as 10 minutes")}</p>
            <Pill ghost>API reference</Pill>
          </div>
        </div>
      </Band>
    </LegacyPage>
  );
}
