"use client";

import type { CSSProperties } from "react";
import { Page } from "../chrome";
import { Btn, Icon, LogoBar, Media } from "../ui";
import "./home.css";

const heroLines = [
  { title: "For build agents", detail: "to release in their own words, with one command and no setup to learn first." },
  { title: "To run apps and agents", detail: "in isolated machines, with lasting jobs, backed by elastic compute." },
  { title: "Tuned by agents", detail: "that look into errors on their own, plan a fix, and open it for review." },
];

const heroLogos: [number, number][] = [
  [88, 22],
  [148, 18],
  [80, 20],
  [126, 14],
  [58, 38],
  [130, 28],
];

type Showcase = {
  id: string;
  title: [string, string];
  lead: string;
  rest: string;
  features: string[];
  side: "left" | "right";
  mediaHeight: number;
  quoteTop: number;
  after: number;
  split?: boolean;
};

const showcases: Showcase[] = [
  {
    id: "a",
    title: ["Run your agents on a platform", "that keeps up with them"],
    lead: "Northwind serves millions",
    rest: " of agent chats every day on Acme.",
    features: ["Lasting Jobs", "Isolated Machines", "Model Routing", "Elastic Compute"],
    side: "left",
    mediaHeight: 437,
    quoteTop: 116,
    after: 280,
    split: true,
  },
  {
    id: "b",
    title: ["Ship apps that grow from", "one to millions instantly"],
    lead: "Bluebird serves over 100 million",
    rest: " monthly page views on Acme.",
    features: ["Global Edge", "Release Environments", "On-demand Functions", "Request Firewall"],
    side: "right",
    mediaHeight: 427,
    quoteTop: 116,
    after: 289,
  },
  {
    id: "c",
    title: ["Run networks that", "serve every tenant"],
    lead: "Lumen runs help centers and docs for over 20,000",
    rest: " companies on Acme.",
    features: ["Tenant Separation", "Domain Control", "Custom Certificates", "Preview Links"],
    side: "left",
    mediaHeight: 516,
    quoteTop: 101,
    after: 153,
  },
];

function ShowcaseSection({ item }: { item: Showcase }) {
  return (
    <section className={`vc-home-show vc-home-show--${item.side}`} style={{ "--after": `${item.after}px` } as CSSProperties} aria-labelledby={`show-${item.id}`}>
      <h2 className="vc-h56 vc-home-show__title" id={`show-${item.id}`}>
        {item.title[0]}{" "}
        <br />
        {item.title[1]}
      </h2>
      <div className="vc-home-show__row">
        <div className="vc-home-show__media" style={{ height: item.mediaHeight }}>
          {item.split ? (
            <>
              <Media className="vc-home-show__back" />
              <Media className="vc-home-show__front" />
            </>
          ) : (
            <Media className="vc-home-show__single" />
          )}
        </div>
        <div className="vc-home-show__aside" style={{ "--quote-top": `${item.quoteTop}px` } as CSSProperties}>
          <p className="vc-h24 vc-home-show__quote">
            <span>{item.lead}</span>
            {item.rest}
          </p>
          <ul className="vc-home-show__features">
            <li>Features</li>
            {item.features.map((feature) => (
              <li key={feature}>
                <a href="#" className="vc-focus">
                  {feature}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const shipped = [
  { title: "Services", text: "Run long tasks, queues, and workers on Acme, next to your app." },
  { title: "Agents", text: "Build agents and run them on the Acme agent kit." },
  { title: "Runner", text: "The safe place to run code you did not write." },
];

export function HomeScreen() {
  return (
    <Page>
      <section className="vc-home-hero" aria-labelledby="home-title">
        <div className="vc-home-hero__main">
          <h1 className="vc-home-hero__title" id="home-title">
            Agent Ready
            <br />
            Infrastructure
          </h1>
          <p className="vc-home-hero__mono vc-mono">For build agents</p>
          <div className="vc-home-hero__actions">
            <Btn size={40} pill variant="primary">
              Start building
            </Btn>
            <Btn size={40} pill>
              Talk to us
            </Btn>
          </div>
        </div>
        <Media tone="flat" className="vc-home-hero__visual" label="Product mark" />
        <ul className="vc-home-hero__lines">
          {heroLines.map((line) => (
            <li key={line.title} tabIndex={0} className="vc-home-hero__line">
              <span className="vc-home-hero__line-title">{line.title}</span>
              <span className="vc-home-hero__line-detail">{line.detail}</span>
            </li>
          ))}
        </ul>
      </section>
      <div className="vc-home-logos" aria-label="Customers">
        {heroLogos.map(([w, h], index) => (
          <LogoBar key={index} width={w} height={h} />
        ))}
      </div>
      {showcases.map((item) => (
        <ShowcaseSection key={item.id} item={item} />
      ))}
      <section className="vc-home-shipped" aria-labelledby="shipped-title">
        <h2 className="vc-h56" id="shipped-title">
          Lately released
        </h2>
        <div className="vc-home-shipped__grid">
          {shipped.map((card, index) => (
            <a href="#" key={card.title} className={`vc-home-card vc-focus${index === 0 ? " vc-home-card--tall" : ""}`}>
              <Media tone="flat" className="vc-home-card__art" />
              <span className="vc-home-card__text">
                <span className="vc-home-card__title">{card.title}</span>
                <span className="vc-home-card__desc">{card.text}</span>
              </span>
            </a>
          ))}
        </div>
      </section>
      <section className="vc-home-cta" aria-labelledby="cta-title">
        <h2 className="vc-h56" id="cta-title">
          Made by you, or your agents
        </h2>
        <div className="vc-home-cta__actions">
          <Btn size={40} pill variant="primary">
            Start building
          </Btn>
          <button type="button" className="vc-btn vc-btn--40 vc-btn--pill vc-btn--secondary vc-home-cta__copy">
            <span className="vc-home-cta__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="vc-btn__label">Set up your agent</span>
            <Icon name="copy" size={14} />
          </button>
        </div>
      </section>
    </Page>
  );
}
