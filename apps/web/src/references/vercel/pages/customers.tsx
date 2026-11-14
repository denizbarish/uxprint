"use client";

import { useRef, useState } from "react";
import { Page } from "../chrome";
import { Btn, Icon, LogoBar, Media } from "../ui";
import "./customers.css";

const slides = [
  "How Northwind ships agent-written code to production in 5 minutes on Acme.",
  "Bluebird and Acme are rebuilding storefront tooling for faster shops.",
  "How Lumen ships features customers ask for in 30 minutes on Acme.",
  "How Harbor serves real-time data to millions of daily users.",
  "How Fable cut idea-to-prototype time by 75% with Acme.",
];

const stories: [string, string, string, number][] = [
  ["Northwind", "How Northwind scales search for 650K readers", "Health", 72],
  ["Bluebird", "How Bluebird ships agent-written code to production in minutes", "Finance & Insurance", 80],
  ["Lumen", "Lumen and Acme are rebuilding storefronts for speed", "Commerce, Software", 70],
  ["Harbor", "How Harbor ships features customers ask for in 30 minutes on Acme", "AI", 70],
  ["Fable Weather", "How Fable serves live forecasts to 350 million daily users on Acme", "Software", 48],
  ["Code and Craft", "How Code and Craft cut idea to prototype by 75%", "Agency", 70],
  ["Cedar", "How Cedar runs tenant docs for two large teams on Acme", "Software", 60],
  ["Quill", "How Quill workers run untrusted code at scale on Acme", "Business Services, AI", 60],
  ["Marlow", "How Marlow turns rough ideas into patent-pending work", "Software", 70],
  ["Ridge", "How Ridge kept 100% uptime through 100x traffic surges on Acme", "Finance & Insurance", 64],
  ["Stable", "How Stable ships AI testing agents in hours, not weeks", "Finance & Insurance", 66],
  ["Pylon", "How Pylon built a game-changing app in a single flight", "Software", 70],
  ["Sensa", "How Sensa went from zero to product in six weeks", "Software", 70],
];

const logoSizes: [number, number][] = [
  [59, 30], [114, 19], [59, 30], [44, 34], [105, 20], [137, 16], [68, 27], [33, 46], [108, 20], [72, 26], [112, 19], [96, 20],
];

/** Customer stories template, built from /customers. */
export function CustomersScreen() {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  function go(next: number) {
    const target = Math.max(0, Math.min(slides.length - 1, next));
    setIndex(target);
    const slide = track.current?.children[target] as HTMLElement | undefined;
    track.current?.scrollTo({ left: slide ? slide.offsetLeft - 24 : 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  return (
    <Page>
      <h1 className="vc-cust-title">Customer stories</h1>
      <section aria-roledescription="carousel" aria-label="Featured stories">
        <div className="vc-cust-track" ref={track}>
          {slides.map((caption, i) => (
            <a key={caption} href="#" className="vc-cust-slide vc-focus" aria-label={`Story ${i + 1} of ${slides.length}`}>
              <Media tone="photo" className="vc-cust-slide__img" />
              <span className="vc-cust-slide__caption">{caption}</span>
            </a>
          ))}
        </div>
        <div className="vc-cust-controls">
          <button type="button" className="vc-cust-arrow vc-focus" aria-label="Previous story" onClick={() => go(index - 1)} disabled={index === 0}>
            <Icon name="chevron-left" />
          </button>
          <button type="button" className="vc-cust-arrow vc-focus" aria-label="Next story" onClick={() => go(index + 1)} disabled={index === slides.length - 1}>
            <Icon name="chevron-right" />
          </button>
          <div className="vc-cust-progress" aria-hidden="true">
            <span style={{ width: `${((index + 1) / slides.length) * 100}%` }} />
          </div>
        </div>
      </section>
      <section className="vc-cust-list" aria-label="All stories">
        <ul>
          {stories.map(([name, text, sector, logo]) => (
            <li key={name}>
              <a href="#" className="vc-cust-row vc-focus">
                <span className="vc-cust-row__name">{name}</span>
                <span className="vc-cust-row__text">{text}</span>
                <span className="vc-cust-row__logo">
                  <LogoBar width={logo} height={22} />
                </span>
                <span className="vc-cust-row__sector vc-mono">{sector}</span>
                <span className="vc-cust-row__read vc-mono">
                  Read story <Icon name="arrow-right" size={12} />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <a href="#" className="vc-btn vc-btn--32 vc-btn--pill vc-cust-all">
          <span className="vc-btn__label">View all stories</span>
        </a>
      </section>
      <figure className="vc-cust-quote">
        <blockquote>
          <p>“Acme is why we can keep up. In a world of agents, the teams that ship fastest win, and without Acme we simply could not move at the pace this market asks for.”</p>
        </blockquote>
        <figcaption className="vc-cust-quote__by">
          <span>Mara Quinn, Chief Business Officer, Harbor</span>
          <span className="vc-cust-quote__desc">How Harbor serves 500,000 dynamic pages to 60 million users on Acme</span>
          <Btn pill>
            Read story <Icon name="chevron-right" size={12} />
          </Btn>
        </figcaption>
      </figure>
      <section className="vc-cust-logos" aria-labelledby="cust-logos">
        <div className="vc-cust-logos__head">
          <h2 className="vc-h56" id="cust-logos">
            Trusted by leading teams
          </h2>
          <label className="vc-cust-select">
            <span className="vc-sr">Industry</span>
            <select defaultValue="all">
              <option value="all">All industries</option>
              <option>Software</option>
              <option>Commerce</option>
              <option>Finance</option>
            </select>
            <Icon name="chevron-down" />
          </label>
        </div>
        <ul className="vc-cust-logos__grid">
          {Array.from({ length: 60 }, (_, i) => {
            const [w, h] = logoSizes[i % logoSizes.length] ?? [96, 24];
            return (
              <li key={i}>
                <LogoBar width={w} height={h} />
              </li>
            );
          })}
        </ul>
        <button type="button" className="vc-btn vc-btn--32 vc-btn--pill vc-btn--secondary vc-cust-more">
          <span className="vc-btn__label">Show More</span>
          <Icon name="chevron-down" size={12} />
        </button>
      </section>
    </Page>
  );
}
