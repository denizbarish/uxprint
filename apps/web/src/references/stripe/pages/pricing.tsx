"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type RefObject } from "react";
import { LegacyPage, Media } from "../chrome";
import { useBrand, withBrand } from "../brand";
import { Chevron, ChevronDown, Plus } from "../icons";
import { priceGroups, type PriceCard, type PriceLine, type PriceRow } from "./pricing-data";

function Pill({ children, ghost = false, className }: { children: string; ghost?: boolean; className?: string }) {
  return (
    <a href="#" className={`s-pill${ghost ? " s-pill--ghost" : ""} ${className ?? ""}`}>
      {children}
      <Chevron />
    </a>
  );
}

function Check() {
  return (
    <svg className="r-check" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="#e3e8ee" />
      <path d="m4.8 8.2 2.1 2.1 4.3-4.6" fill="none" stroke="#8898aa" strokeWidth="1.5" />
    </svg>
  );
}

const features = [
  { title: "Global access", items: ["190 regions", "130+ currencies", "100+ ways to pay", "1 integration"] },
  { title: "Built-in fraud defense", items: ["Adaptive risk models", "Learns new fraud patterns", "No setup required", "Fraud reports"] },
  { title: "Tools to tune your checkout", items: ["Flexible UI parts", "Ready-made pay forms", "Faster checkout", "No-code payments"] },
  { title: "Payment tuning to lift revenue", items: ["Smart retries", "Card auto-updates", "Customer verification"] },
  { title: "Embedded payments for platforms & markets", items: ["Simple onboarding", "Platform controls", "Embedded components", "Risk tools"] },
  { title: "Fast, predictable payouts to your bank accounts", items: ["Flexible payout options", "Same-currency settlement", "Payout visibility"] },
  { title: "Phone, chat, and email support", items: ["Round-the-clock support", "Detailed documentation for every product", "Developer chat support"] },
  { title: "Security, uptime, and compliance", items: ["99.99% average uptime across all regions", "PCI compliant", "Licensed in many markets"] },
];

const custom = ["Rate-plus pricing", "Volume discounts", "Multi-product discounts", "Regional rates"];

const faqs = [
  { q: "How are payment fees worked out?", a: "Fees depend on the payment method, the country of the card, and any currency conversion. Your Dashboard shows the fee for every charge, so you can always see what you paid and why." },
  { q: "Will I be charged sales tax?", a: "Some regions add sales tax or VAT to processing fees. If it applies to your account, it appears as a separate line on your monthly statement." },
  { q: "Are there extra fees for refunds?", a: "Refunds have no extra fee on standard pricing, but the original fee is not returned. Some local methods charge a small fee for returns when bank transfers are used. Custom plans can set their own terms." },
  { q: "Do you have setup or monthly fees?", a: "There are no setup fees, monthly fees, or closing fees on standard pricing. You only pay when you get paid." },
  { q: "Do you offer any discounts?", a: "Businesses with large volume or a unique model can ask for a custom package." },
];

/* ---------------- Pricing cards ---------------- */

/** Lines keep their measured box height and the gap above them, so the price column matches the original rhythm. */
function lineStyle(line: PriceLine): CSSProperties {
  const style: CSSProperties = { marginTop: line.mt ?? 0 };
  if (line.k === "link" || line.k === "a") return style;
  const count = Math.max(1, Math.round(line.h / 19));
  return { ...style, minHeight: line.h, lineHeight: `${line.h / count}px` };
}

function PriceBox({ lines }: { lines: PriceLine[] }) {
  return (
    <div className="r-price">
      {lines.map((line, index) =>
        line.k === "link" || line.k === "a" ? (
          <span key={index} className="r-price__link" style={lineStyle(line)}>
            <Pill ghost>{line.t}</Pill>
          </span>
        ) : (
          <p key={index} className={`r-price__${line.k}`} style={lineStyle(line)}>
            {line.t}
          </p>
        ),
      )}
    </div>
  );
}

function Row({ row, brand }: { row: PriceRow; brand: string }) {
  return (
    <div className="r-row" style={{ "--h": `${row.h}px` } as CSSProperties}>
      <div className="r-row__copy">
        <h4 className="r-row__title">{row.title}</h4>
        <p className="r-row__body">{withBrand(row.body, brand)}</p>
      </div>
      <PriceBox lines={row.price} />
    </div>
  );
}

function AccordionRow({ title, summary, rows, brand }: { title: string; summary: string | null; rows: PriceRow[]; brand: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return (
    <div className={`r-acc${open ? " is-open" : ""}`}>
      <button type="button" className="r-acc__head" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((value) => !value)}>
        <span className="r-acc__title">{title}</span>
        {summary ? <span className="r-acc__summary">{summary}</span> : null}
        <span className="r-acc__icon" aria-hidden="true">
          <Plus />
        </span>
      </button>
      <div id={panelId} className="r-acc__panel" hidden={!open}>
        {rows.map((row) => (
          <Row key={row.title} row={row} brand={brand} />
        ))}
      </div>
    </div>
  );
}

function Card({ card, brand }: { card: PriceCard; brand: string }) {
  return (
    <article className="r-card" id={`price-${card.title.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="r-card__head" style={{ "--h": `${card.head}px` } as CSSProperties}>
        <h3 className="r-card__title">{card.title}</h3>
        <p className="r-card__lead">{withBrand(card.lead, brand)}</p>
        {card.bullets.length > 0 ? (
          <ul className="r-card__bullets">
            {card.bullets.map((bullet) => (
              <li key={bullet}>
                <Check />
                {withBrand(bullet, brand)}
              </li>
            ))}
          </ul>
        ) : null}
        {card.cta ? <Pill className="r-card__cta">{card.cta}</Pill> : null}
      </div>
      {card.rows.map((row) => (
        <Row key={row.title} row={row} brand={brand} />
      ))}
      {card.acc.map((acc) => (
        <AccordionRow key={acc.title} title={acc.title} summary={acc.summary} rows={acc.rows} brand={brand} />
      ))}
      {card.foot ? (
        <div className="r-card__foot">
          <Pill ghost>{card.foot}</Pill>
        </div>
      ) : null}
    </article>
  );
}

/* ---------------- Sticky pricing bar ---------------- */

const tabs = ["Standard pricing", "Custom pricing", "FAQs"];

function useScrollState(tabsRef: RefObject<HTMLElement | null>) {
  const [stuck, setStuck] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    // Syncs with the window scroll position (external system): shows the bar once the in-page tabs leave the viewport.
    const target = tabsRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry) setStuck(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(target);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [tabsRef]);
  return { stuck, progress };
}

export function PricingScreen() {
  const brand = useBrand();
  const b = (text: string) => withBrand(text, brand);
  const tabsRef = useRef<HTMLElement>(null);
  const { stuck, progress } = useScrollState(tabsRef);

  return (
    <LegacyPage accent="#635bff" footerTone="tint">
      <div className={`r-stuck${stuck ? " is-visible" : ""}`} aria-hidden={!stuck}>
        <span className="r-stuck__progress" style={{ transform: `scaleX(${progress})` }} />
        <div className="p-container r-stuck__inner">
          <nav aria-label="Pricing sections" className="r-stuck__tabs">
            {tabs.map((tab, index) => (
              <a key={tab} href="#" tabIndex={stuck ? 0 : -1} className={index === 0 ? "is-active" : undefined}>
                {tab}
              </a>
            ))}
          </nav>
          <a href="#" tabIndex={stuck ? 0 : -1} className="s-pill">
            Contact sales
            <Chevron />
          </a>
        </div>
      </div>

      <section className="r-hero">
        <div className="r-ribbon" aria-hidden="true" />
        <div className="p-container">
          <h1 className="p-display r-hero__title">
            Pricing built for <br className="r-br" />
            businesses of all sizes
          </h1>
          <div className="r-plans">
            <div className="r-plan">
              <div className="r-plan__copy">
                <h2 className="p-h3">Standard</h2>
                <p className="p-body">Get a complete payments platform with simple, pay-as-you-go pricing. No setup costs, monthly fees, or hidden fees.</p>
                <Pill>Get started</Pill>
              </div>
              <div className="r-plan__rate">
                <p className="p-h3">3.0% + 41¢</p>
                <p>per settled charge for local cards</p>
              </div>
            </div>
            <div className="r-plan r-plan--custom">
              <div className="r-plan__copy">
                <h2 className="p-h3">Custom</h2>
                <p className="p-body">Design a custom package, open to businesses with large payment volume or unique business models.</p>
                <a href="#" className="s-pill r-plan__cyan">
                  Contact sales
                  <Chevron />
                </a>
              </div>
              <ul className="r-plan__list">
                {custom.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <nav ref={tabsRef} aria-label="Pricing sections" className="r-tabs">
            {tabs.map((tab) => (
              <a key={tab} href="#">
                {tab}
              </a>
            ))}
          </nav>
          <h2 className="p-h3 r-features__title">Features available out of the box:</h2>
          <div className="p-grid4 r-features">
            {features.map((feature) => (
              <div key={feature.title} className="p-feature">
                <span className="p-feature__icon" data-compare-mask="" />
                <h3 className="p-feature__title">{feature.title}</h3>
                <ul className="r-ticks">
                  {feature.items.map((item) => (
                    <li key={item}>
                      <button type="button" className="r-tick">
                        <Check />
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="r-explore">
        <div className="p-container">
          <p className="p-eyebrow">Standard pricing for all products</p>
          <h2 className="p-h2">{b("Explore pricing for the full Acme platform")}</h2>
          <p className="p-lead r-explore__lead">Online and in-person payments, recurring plans, embedded finance, and more.</p>
          <div className="r-explore__layout">
            <aside className="r-side">
              <nav aria-label="Products" className="r-side__nav">
                {priceGroups.map((group, index) => (
                  <div key={group.title} className="r-side__group">
                    <a href="#" className={`r-side__label${index === 0 ? " is-active" : ""}`}>
                      {group.title}
                    </a>
                    {group.cards.map((card) => (
                      <a key={card.title} href="#" className="r-side__link">
                        {card.title}
                      </a>
                    ))}
                  </div>
                ))}
              </nav>
              <div className="r-side__foot">
                <Pill ghost>Custom pricing</Pill>
              </div>
            </aside>
            <div className="r-groups">
              {priceGroups.map((group) => (
                <div key={group.title} className="r-group">
                  <h2 className="r-group__title">{group.title}</h2>
                  {group.lead ? <p className="p-body r-group__lead">{b(group.lead)}</p> : null}
                  {group.cards.map((card) => (
                    <Card key={card.title} card={card} brand={brand} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="r-custom">
        <div className="p-container">
          <div className="r-custom__top">
            <div>
              <p className="p-eyebrow">Custom pricing</p>
              <h2 className="p-h2">{b("Join leading enterprises on Acme")}</h2>
              <p className="p-lead">
                Build tailored solutions to help you grow into new markets, tune payment performance, automate revenue and finance work, and earn from financial services, and <a href="#">more</a>.
              </p>
              <Pill>Contact sales</Pill>
            </div>
            <div className="r-package">
              <h3 className="r-package__title">Build your custom package</h3>
              <p className="p-body">Work with our sales team to design a package that fits your needs:</p>
              <ul className="r-package__grid">
                {["Payments", "Shield", "Platforms", "Invoices", "Plans"].map((item) => (
                  <li key={item}>{item}</li>
                ))}
                <li className="r-package__more">and more</li>
              </ul>
              <div className="r-package__support">
                <h4 className="p-feature__title">Get the support you need</h4>
                <ul>
                  {["Technical account team", "Expert services", "Certified build partners"].map((item) => (
                    <li key={item}>
                      <Check />
                      <a href="#">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="p-grid4 r-custom__grid">
            {[
              ["Flexible structures", "Rate-plus pricing, flat discounted rates, plans, and buy-rates for platforms."],
              ["Volume-based discounts", "Discounts based on volume tiers, commitments, and product usage."],
              ["Global single rates", "Optional blended pricing for all markets, so you can go global with ease."],
              ["Cost transparency", "Dashboards, tools, and APIs that give you a clear view into your costs."],
            ].map(([title, body]) => (
              <div key={title} className="p-feature">
                <span className="p-feature__icon" data-compare-mask="" />
                <h3 className="p-feature__title">{title}</h3>
                <p className="p-body">{body}</p>
              </div>
            ))}
          </div>
          <div className="r-roi">
            <div>
              <h2 className="p-h3">{b("Building on Acme returns more than three times its cost")}</h2>
              <p className="p-lead">An independent study found a strong return on investment among businesses that moved to the platform.</p>
              <Pill ghost>Read the report</Pill>
            </div>
            <Media className="r-roi__art" tone="cool" />
          </div>
          <h2 className="p-h3 r-stories__title">{b("100+ category leaders each process over $1 billion per year on Acme.")}</h2>
          <div className="r-stories">
            <div className="r-stats">
              <div className="r-stat">
                <p className="r-stat__value">Millions</p>
                <p className="p-body">Drivers using the in-car store</p>
              </div>
              <div className="r-stat">
                <p className="r-stat__value">350+</p>
                <p className="p-body">Regional dealers</p>
              </div>
              <h3 className="p-feature__title r-stat__label">Products used</h3>
              <ul className="r-stat__list">
                <li>Payments</li>
                <li>Platforms</li>
              </ul>
            </div>
            <a href="#" className="r-story">
              <Media className="r-story__media" tone="dark" />
              <span className="r-story__title">Learn why a carmaker chose this stack for online sales and payments</span>
            </a>
          </div>
          <div className="r-logos">
            {Array.from({ length: 4 }, (_, index) => (
              <button key={index} type="button" className="r-logos__item" aria-label={`Show story ${index + 1}`} aria-pressed={index === 0}>
                <Media className="r-logos__mark" tone="plain" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="r-faq">
        <div className="p-container">
          <h2 className="p-h2">FAQs</h2>
          <div className="r-faq__list">
            {faqs.map((faq) => (
              <Faq key={faq.q} question={faq.q} answer={b(faq.a)} />
            ))}
          </div>
        </div>
      </section>

      <section className="r-cta">
        <div className="p-container">
          <div className="p-grid4 r-cta__grid">
            <div className="r-cta__copy">
              <h2 className="p-h3">Ready to get started? Get in touch or create an account.</h2>
              <p className="p-lead">Get a complete payments platform with simple, pay-as-you-go pricing, or contact us to design a custom package for your business.</p>
              <div className="p-actions">
                <Pill>Start now</Pill>
                <Pill ghost>Contact sales</Pill>
              </div>
            </div>
            <div className="p-feature">
              <span className="p-feature__icon" data-compare-mask="" />
              <h3 className="p-feature__title">See our customers</h3>
              <p className="p-body">From startups to large companies, explore how many businesses run on the platform every day.</p>
              <Pill ghost>Learn more</Pill>
            </div>
            <div className="p-feature">
              <span className="p-feature__icon" data-compare-mask="" />
              <h3 className="p-feature__title">Explore the docs</h3>
              <p className="p-body">Start building your integration and accept your first payment in minutes with guides and sample code.</p>
              <Pill ghost>Learn more</Pill>
            </div>
          </div>
        </div>
      </section>
    </LegacyPage>
  );
}

function Faq({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return (
    <div className={`r-faq__item${open ? " is-open" : ""}`}>
      <h3>
        <button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((value) => !value)}>
          {question}
          <span className="r-faq__icon" aria-hidden="true">
            <ChevronDown />
          </span>
        </button>
      </h3>
      <div id={panelId} className="r-faq__panel" hidden={!open}>
        <p className="p-body">{answer}</p>
      </div>
    </div>
  );
}
