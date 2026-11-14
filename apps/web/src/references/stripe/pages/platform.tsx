"use client";

import { useId, useState, type ReactNode } from "react";
import { HdsPage, Media, Arrow } from "../chrome";
import { useBrand, withBrand } from "../brand";
import { Chevron, ChevronDown, ChevronLeft, Plus } from "../icons";

/** One-open accordion row with a 74px header, as on the newer product pages. */
function Disclosure({ title, open, onToggle, children, icon = true }: { title: string; open: boolean; onToggle: () => void; children: ReactNode; icon?: boolean }) {
  const id = useId();
  return (
    <div className={`f-acc${open ? " f-acc--open" : ""}`}>
      <h3>
        <button type="button" className="f-acc__head" aria-expanded={open} aria-controls={id} onClick={onToggle}>
          {icon ? <span className="f-acc__icon" aria-hidden="true" /> : null}
          <span className="f-acc__title">{title}</span>
          <span className="s-icon-btn f-acc__toggle" aria-hidden="true">
            <Plus />
          </span>
        </button>
      </h3>
      <div id={id} className="f-acc__panel" hidden={!open}>
        {children}
      </div>
    </div>
  );
}

const rows = [
  { title: "Plans", body: "Run recurring revenue, cut churn, and automate billing logic with a flexible renewals engine built for any model." },
  { title: "Usage-based plans", body: "Launch usage-based pricing in minutes, and meter usage accurately at high volume with flexible rating built for scale." },
  { title: "Invoices", body: "Get paid sooner and simplify receivables with hosted invoices, automatic reminders, and support for local payment options." },
];

const features = [
  { title: "Launch new pricing and business models sooner" },
  { title: "Recover more revenue with smart tools" },
  { title: "Monetize with a smaller team" },
  { title: "Grow into new markets quickly" },
];

const capabilities = [
  { title: "Sell", items: ["Hosted checkout", "Pay components", "Pay links", "Counter sales", "Approval Lift", "Customer portal", "Quote to cash", "Price tables", "Free trials", "Paid trials"] },
  { title: "Bill", items: ["Invoices and receipts", "Self-serve portal", "Prorations, credits, and bundles", "Plan changes", "Billing automations", "Levy and tax handling", "Renewal settings", "Usage meters", "Rate cards", "Alerts and limits"] },
  { title: "Collect", items: ["Cards", "Wallets", "Bank debits and transfers", "Local payment options", "Buy now, pay later", "Smart retries", "Expired card updates", "Recovery emails", "Cancellation flows"] },
  { title: "Report", items: ["Revenue analytics", "Churn insights", "Exports to warehouses", "Audit-ready ledgers", "Revenue recognition", "Accounting integrations", "Compliance controls"] },
];

export function PlatformScreen() {
  const brand = useBrand();
  const b = (text: string) => withBrand(text, brand);
  const [feature, setFeature] = useState(0);
  const [faq, setFaq] = useState(0);

  return (
    <HdsPage>
      <nav className="f-subnav" aria-label="Product">
        <div className="s-frame f-subnav__frame">
          <a href="#" className="f-subnav__name">
            Plans
          </a>
          <ul className="f-subnav__links">
            {["Overview", "Usage-based plans", "Renewals", "Invoices"].map((link, index) => (
              <li key={link}>
                <a href="#" aria-current={index === 0 ? "page" : undefined}>
                  {link}
                </a>
              </li>
            ))}
            <li>
              <button type="button" className="f-subnav__menu" aria-expanded="false">
                Pricing
                <ChevronDown />
              </button>
            </li>
            <li>
              <a href="#">Docs</a>
            </li>
          </ul>
        </div>
      </nav>

      <section className="f-hero">
        <Media className="f-hero__art" tone="warm" />
        <div className="s-frame f-hero__frame">
          <h1 className="s-title f-hero__title">
            {b("Monetize sooner with Acme Plans.")} <span>Manage pricing, cut churn, and grow revenue, all on one platform.</span>
          </h1>
          <div className="f-hero__actions">
            <a href="#" className="s-btn s-btn--primary">
              Start now
              <Chevron />
            </a>
            <a href="#" className="s-btn s-btn--secondary">
              Contact sales
              <Chevron />
            </a>
          </div>
        </div>
      </section>

      <div className="f-logos">
        <div className="s-frame f-logos__frame">
          {Array.from({ length: 7 }, (_, index) => (
            <Media key={index} className="f-logos__item" tone="plain" />
          ))}
        </div>
      </div>

      <section className="f-band f-band--tint f-opportunity">
        <div className="s-frame f-opportunity__frame">
          <p className="f-eyebrow">
            <span aria-hidden="true" />
            The opportunity
          </p>
          <p className="s-card-title f-opportunity__lead">Agents are changing how software is sold. You need the flexibility to handle new business models, new markets, and the complexity that comes with them.</p>
          <div className="f-opportunity__cols">
            <p>Usage-based, hybrid, and outcome-based pricing models are now common, and every product team is under pressure to test new pricing and packaging faster while keeping finance teams in control.</p>
            <p>{b("Acme Plans lets you price, meter, bill, and collect on one platform, so you can launch new models in days and keep revenue data clean from the first invoice to the last.")}</p>
          </div>
        </div>
      </section>

      <section className="f-band f-rows">
        <div className="s-frame f-rows__frame">
          <h2 className="s-title f-h2">
            One platform to price, meter, bill, invoice, and grow. <span>Connect supported payment processors and unify your entire revenue stack.</span>
          </h2>
          <div className="f-rows__list">
            {rows.map((row) => (
              <div key={row.title} className="f-row">
                <div className="f-row__copy">
                  <h3 className="s-row-title">{row.title}</h3>
                  <p className="s-lead">{row.body}</p>
                  <a href="#" className="s-btn s-btn--primary s-btn--sm">
                    Explore {row.title}
                    <Chevron />
                  </a>
                </div>
                <Media className="f-row__media" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="f-band f-band--tint f-features">
        <div className="s-frame f-features__frame">
          <div className="f-split">
            <h2 className="s-title f-split__title">An integrated billing platform for your full quote-to-cash cycle</h2>
            <p className="s-lead">{b("Acme Plans runs over 250,000 companies to raise revenue, simplify operations, and grow globally at scale.")}</p>
          </div>
          <div className="f-accordion">
            {features.map((item, index) => (
              <Disclosure key={item.title} title={item.title} open={feature === index} onToggle={() => setFeature(feature === index ? -1 : index)}>
                <Media className="f-acc__media" />
                <div className="f-acc__cols">
                  <p className="s-lead">
                    <strong>Set up fast, with or without code.</strong> Launch quickly with no-code tools, or build custom billing logic with flexible APIs used by every leading team.
                  </p>
                  <p className="s-lead">
                    <strong>Support any pricing model, including hybrid.</strong> Mix flat fees, seats, and usage in a single plan, and change models without new code.
                  </p>
                  <p className="s-lead">
                    <strong>Define plans, bundles, and rate cards.</strong> Package products the way you sell them, and roll out price changes to new and current customers.
                  </p>
                </div>
              </Disclosure>
            ))}
          </div>
        </div>
      </section>

      <section className="f-band f-scale">
        <div className="s-frame f-scale__frame">
          <h2 className="s-title f-h2 f-h2--short">
            {b("Acme Plans grows with you.")} <span>Grow your revenue on a tested platform.</span>
          </h2>
          <div className="f-stats">
            {[
              ["$7.6B", "in failed payments recovered in 2025"],
              ["$12", "recovered for every $1 spent in 2025"],
              ["300,000+", "companies use Acme Plans to scale globally"],
              ["99.995%", "uptime in 2025"],
            ].map(([figure, label]) => (
              <p key={figure}>
                <strong>{figure}</strong>
                <span>{label}</span>
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="f-band f-band--tint f-stories">
        <div className="s-frame f-stories__frame">
          <h2 className="s-title f-h2 f-h2--short">
            Trusted by leading teams. <span>See how companies grow revenue with Acme Plans.</span>
          </h2>
          <div className="f-cards">
            {[
              "A work software group picks Acme to build a single platform for global billing and payments.",
              "A support software company needs only 3 months to roll out usage-based billing with Acme.",
              "A sports network raises subscription revenue by 20% and cuts payment errors by 50%.",
            ].map((text) => (
              <a key={text} href="#" className="f-card">
                <Media className="f-card__media" tone="cool" />
                <span className="f-card__title">{text}</span>
                <span className="s-link">
                  Read the story
                  <Chevron />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="f-band f-analysts">
        <div className="s-frame f-analysts__frame">
          <h2 className="s-title">Named by leading analysts as a leader in billing</h2>
          <div className="f-analysts__grid">
            {[
              "Acme Plans is named a Leader in an independent 2026 report on recurring billing applications.",
              "Acme Plans is named a Leader in a 2025 market review of billing and revenue applications.",
            ].map((text) => (
              <div key={text} className="f-analyst">
                <span className="f-analyst__logo" data-compare-mask="" />
                <p className="s-lead">{text}</p>
                <Arrow>Read more</Arrow>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="f-band f-band--tint f-caps">
        <div className="s-frame f-caps__frame">
          <h2 className="s-title">{b("Key Acme Plans features and platform tools")}</h2>
          <div className="f-caps__grid">
            {capabilities.map((group) => (
              <div key={group.title} className="f-caps__cell">
                <h3 className="s-row-title">{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="f-caps__note">*Available as an add-on product</p>
        </div>
      </section>

      <section className="f-band f-optimize">
        <div className="s-frame f-optimize__frame">
          <div className="f-optimize__head">
            <h2 className="s-title f-optimize__title">{b("Improve every step of your revenue cycle with Acme")}</h2>
            <div className="f-optimize__nav">
              <button type="button" className="s-icon-btn" aria-label="Previous slide" disabled>
                <ChevronLeft />
              </button>
              <button type="button" className="s-icon-btn" aria-label="Next slide">
                <Chevron />
              </button>
            </div>
          </div>
          <div className="f-optimize__track">
            {[
              ["Give customers a faster, simpler checkout.", "Improve your checkout"],
              ["Spot and stop fraud as it happens.", "Explore Shield"],
              ["Handle sales tax, VAT, and GST in 80+ countries.", "Explore Levies"],
              ["Automate revenue accounting.", "Explore Revenue Ledger"],
            ].map(([title, link]) => (
              <div key={title} className="f-optimize__card">
                <Media className="f-optimize__media" />
                <h3>{title}</h3>
                <Arrow>{link}</Arrow>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="f-band f-band--tint f-faq">
        <div className="s-frame f-faq__frame">
          <div className="f-faq__grid">
            <h2 className="s-card-title">
              Common questions
              <br />
              <span>{b("Learn more about Acme Plans.")}</span>
            </h2>
            <div>
              {[
                [b("What is Acme Plans and how does it compare to other billing tools?"), true],
                ["How can I set up recurring payments with Acme?", false],
                [b("How does pricing work for Acme Plans?"), false],
              ].map(([question], index) => (
                <Disclosure key={String(question)} title={String(question)} icon={false} open={faq === index} onToggle={() => setFaq(faq === index ? -1 : index)}>
                  <div className="f-faq__answer">
                    <p className="s-lead">{b("Acme Plans is a modern billing platform that helps businesses of every size manage subscriptions, usage-based pricing, invoicing, and revenue operations. It connects to collections, levies, revenue ledger, and analytics, so finance and product teams work from one source of truth.")}</p>
                    <p className="s-lead">{b("You can get started with no-code tools in the Dashboard or build custom flows through the API. Most teams launch within weeks, and can change prices and packaging without code.")}</p>
                    <p className="s-lead">Pricing is pay-as-you-go with no setup fees, and volume discounts are available for larger teams.</p>
                  </div>
                </Disclosure>
              ))}
            </div>
          </div>
          <Media className="h-divider f-faq__divider" tone="cool" />
          <h3 className="s-card-title f-faq__more">More resources</h3>
          <div className="f-resources">
            {["What is recurring billing?", "Is your billing system slowing you down?", "How to compare billing software: criteria and questions to ask"].map((title) => (
              <a key={title} href="#" className="f-resource">
                <span className="f-resource__kind">Guide</span>
                <h3>{title}</h3>
                <span className="f-resource__body">A short guide on what it is, how it works, and what to look for when choosing a solution.</span>
                <span className="s-link">
                  Read more
                  <Chevron />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="f-band f-cta">
        <div className="s-frame f-cta__frame">
          <div>
            <h2 className="s-title">Ready to get started?</h2>
            <p className="f-cta__lead">Get a complete billing solution with pay-as-you-go or monthly pricing, or contact us to build a custom package for your business.</p>
            <div className="f-hero__actions f-cta__actions">
              <a href="#" className="s-btn s-btn--primary">
                Start now
                <Chevron />
              </a>
              <a href="#" className="s-btn s-btn--secondary">
                Contact sales
                <Chevron />
              </a>
            </div>
          </div>
          <div className="f-cta__side">
            <span className="h-cols__icon" aria-hidden="true" />
            <h3>Always know what you pay</h3>
            <p className="s-lead">Clear pricing and no hidden fees.</p>
            <Arrow>See pricing</Arrow>
          </div>
        </div>
      </section>

      <section className="f-notes">
        <div className="s-frame f-notes__frame">
          <Media className="h-divider f-notes__divider" tone="cool" />
          <ol>
            <li>{b("1 Meters, an Acme product, is not included in the standard rates shown on the pricing page.")}</li>
            <li>{b("2 Figures are based on Acme data for the 2025 calendar year, and include all customers using Acme Plans features at the time.")}</li>
            <li>Market and analyst reports are referenced for information only and do not imply endorsement of any product or service.</li>
          </ol>
        </div>
      </section>
    </HdsPage>
  );
}
