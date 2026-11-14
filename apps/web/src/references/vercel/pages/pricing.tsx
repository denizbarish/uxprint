"use client";

import { useState } from "react";
import { Accordion } from "@base-ui/react/accordion";
import { Page } from "../chrome";
import { Btn, Icon, Media } from "../ui";
import { planRows } from "./pricing-data";
import "./pricing.css";

const plans = [
  {
    name: "Starter",
    price: "$0",
    text: "The right first stop for your web app.",
    intro: null,
    items: ["Link your repo, release in seconds", "Automatic pipelines", "Request firewall", "Global edge cache", "Elastic compute", "Attack mitigation", "Traffic and speed reports"],
    action: "Start building",
    primary: false,
  },
  {
    name: "Team",
    badge: "Popular",
    price: "$20",
    text: "Everything you need to build, run, and grow your app.",
    intro: "All Starter features, plus:",
    items: ["$20 of usage credit included", "Flat edge plan with spike cover", "Advanced spend controls", "Team seats and free viewers", "No cold starts", "Free custom domain"],
    action: "Start a free trial",
    primary: true,
  },
  {
    name: "Scale",
    price: "Custom",
    text: "Strict security, speed, insight, platform SLAs, and support.",
    intro: "All Team features, plus:",
    items: ["Guest and team access rules", "Directory sync", "Managed firewall rules", "Multi-region compute", "99.99% uptime terms", "Priority support"],
    action: "Book a demo",
    primary: false,
  },
];

const faqs = [
  { q: "Which currency are prices shown in, and do they include tax?", a: "All prices are shown in USD and leave out sales tax, goods and services tax, and other local taxes. Tax is worked out from your billing address and added to your invoice where needed." },
  { q: "Which plan is right for me?", a: "" },
  { q: "Do you offer custom invoices?", a: "" },
  { q: "What are the limits on each plan?", a: "" },
  { q: "I went over my included credit. What can I do?", a: "" },
  { q: "Can I buy more usage?", a: "" },
  { q: "I am on Starter, how do I move to a paid plan?", a: "" },
  { q: "Is there a cap on how many people I can add?", a: "" },
  { q: "How is usage counted?", a: "" },
  { q: "I want to move a domain to Acme. Is there a fee?", a: "" },
  { q: "Do cached answers count toward usage?", a: "" },
  { q: "How can I manage my spend?", a: "" },
  { q: "What can I spend my credit on?", a: "" },
  { q: "What is the flat edge plan?", a: "" },
];

function Cell({ value }: { value: string | undefined }) {
  if (value === "c") return <Icon name="check" className="vc-plan-table__check" />;
  if (value === "-") return <span className="vc-plan-table__dash" aria-label="Not included" />;
  return value ? <span>{value}</span> : null;
}

function PlanTable() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  return (
    <section className="vc-plan-table" aria-label="Compare plans">
      <div className="vc-plan-table__head">
        <label className="vc-plan-search">
          <Icon name="search" size={16} />
          <span className="vc-sr">Search features</span>
          <input type="search" placeholder="Search features..." value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
        {plans.map((plan) => (
          <span key={plan.name} className="vc-plan-table__name">
            {plan.name}
          </span>
        ))}
      </div>
      <div role="table" aria-label="Plan features">
        {planRows.map((row, index) => {
          switch (row[0]) {
            case "G":
              return (
                <div key={index} className="vc-plan-table__group" role="rowgroup">
                  <h3 className="vc-h24">
                    <Icon name="arrow-up-right" />
                    {row[1]}
                  </h3>
                </div>
              );
            case "D":
              return (
                <p key={index} className="vc-plan-table__desc">
                  {row[1]}
                </p>
              );
            case "X":
              return (
                <div key={index} className="vc-plan-table__more">
                  <a href="#" className="vc-focus">
                    Regional prices ↗
                  </a>
                </div>
              );
            case "B":
            case "R": {
              const [kind, label, a, b, c, height] = row;
              const hidden = q && !label.toLowerCase().includes(q);
              return (
                <div
                  key={index}
                  role="row"
                  hidden={Boolean(hidden)}
                  style={{ height: Number(height) }}
                  className={`vc-plan-table__row${kind === "B" ? " vc-plan-table__row--bold" : ""}`}
                >
                  <span role="rowheader" className="vc-plan-table__label">
                    {label}
                    {kind === "B" && a ? <Icon name="info" size={14} className="vc-plan-table__info" /> : null}
                  </span>
                  <span role="cell">
                    <Cell value={a} />
                  </span>
                  <span role="cell">
                    <Cell value={b} />
                  </span>
                  <span role="cell">
                    <Cell value={c} />
                  </span>
                </div>
              );
            }
          }
          return row satisfies never;
        })}
      </div>
      <div className="vc-plan-table__cta">
        <span />
        <Btn size={36} pill>
          Sign up free
        </Btn>
        <Btn size={36} pill variant="primary">
          Start a free trial
        </Btn>
        <Btn size={36} pill>
          Contact Sales
        </Btn>
      </div>
    </section>
  );
}

/** Pricing template, built from /pricing. */
export function PricingScreen() {
  return (
    <Page>
      <section className="vc-pricing-hero" aria-labelledby="pricing-title">
        <h1 className="vc-display" id="pricing-title">
          Grow your app,{" "}
          <br />
          keep costs in check
        </h1>
        <div className="vc-plans">
          {plans.map((plan) => (
            <article key={plan.name} className={`vc-plan${plan.primary ? " vc-plan--primary" : ""}`} aria-labelledby={`plan-${plan.name}`}>
              <p className="vc-plan__name" id={`plan-${plan.name}`}>
                {plan.name}
                {plan.badge ? <span className="vc-badge">{plan.badge}</span> : null}
              </p>
              <p className="vc-plan__price">
                {plan.price}
                {plan.price.startsWith("$") ? <span className="vc-mono">/mo.</span> : null}
              </p>
              <p className="vc-plan__text">{plan.text}</p>
              {plan.intro ? <p className="vc-plan__intro">{plan.intro}</p> : null}
              <ul className="vc-plan__items">
                {plan.items.map((item) => (
                  <li key={item}>
                    <Icon name="check" />
                    {item}
                  </li>
                ))}
              </ul>
              <Btn size={36} pill variant={plan.primary ? "primary" : "secondary"} className="vc-plan__action">
                {plan.action}
              </Btn>
            </article>
          ))}
        </div>
        <p className="vc-pricing-fine">
          All prices are in USD and leave out sales tax and other local taxes. Taxes are worked out from your billing address and shown on your invoice where they apply.{" "}
          <a href="#">More about taxes</a>
        </p>
      </section>
      <div className="vc-pricing-cards">
        {[
          { link: "About elastic compute", title: "Nothing idle, nothing wasted", text: "Pay only for real work done, not for servers that sit and wait." },
          { link: "About spend controls", title: "Stay on budget", text: "Set a cap, get alerts, and we pause usage before you go past it." },
        ].map((card) => (
          <a key={card.title} href="#" className="vc-pricing-card vc-focus">
            <span className="vc-pricing-card__link">{card.link} ›</span>
            <Media tone="line" className="vc-pricing-card__art" />
            <span className="vc-h24 vc-pricing-card__title">{card.title}</span>
            <span className="vc-pricing-card__text">{card.text}</span>
          </a>
        ))}
      </div>
      <PlanTable />
      <section className="vc-faq" aria-labelledby="faq-title">
        <h2 className="vc-h56" id="faq-title">
          Common
          <br />
          questions
        </h2>
        <Accordion.Root className="vc-faq__list" defaultValue={[0]}>
          {faqs.map((item, index) => (
            <Accordion.Item key={item.q} value={index} className="vc-faq__item">
              <Accordion.Header className="vc-faq__h">
                <Accordion.Trigger className="vc-faq__trigger vc-focus">
                  <span className="vc-faq__num">{String(index + 1).padStart(2, "0")}</span>
                  <span className="vc-faq__q">{item.q}</span>
                  <Icon name="chevron-down" className="vc-faq__chev" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="vc-faq__panel">
                <p className="vc-faq__a">
                  {item.a || "Each answer explains the rule in plain words and links to the full guide for the details that change by plan."}{" "}
                  <a href="#">Read more</a>
                </p>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </section>
      <section className="vc-cta-row vc-pricing-cta" aria-labelledby="pricing-cta">
        <h2 className="vc-h48" id="pricing-cta">
          Still not sure?
        </h2>
        <div className="vc-cta-row__actions">
          <Btn size={36} pill>
            Talk to sales
          </Btn>
          <Btn size={36} pill variant="primary">
            Start for free
          </Btn>
        </div>
      </section>
    </Page>
  );
}
