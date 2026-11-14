"use client";

import type { CSSProperties, ReactNode } from "react";
import { LegacyPage, Media } from "../chrome";
import { useBrand, withBrand } from "../brand";
import { Chevron } from "../icons";

function Pill({ children, ghost = false }: { children: string; ghost?: boolean }) {
  return (
    <a href="#" className={`s-pill${ghost ? " s-pill--ghost" : ""}`}>
      {children}
      <Chevron />
    </a>
  );
}

/** Fixed-height band with the measured height; tone matches the original band colour. */
/** h = measured band height at 1440, m = at 390. */
function Band({ h, m, tone = "white", children, className }: { h: number; m?: number; tone?: "white" | "tint" | "warm"; children: ReactNode; className?: string }) {
  return (
    <section className={`e-band e-band--${tone} ${className ?? ""}`} style={{ height: h, "--mh": m ? `${m}px` : undefined } as CSSProperties}>
      <div className="e-inner">{children}</div>
    </section>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="e-chips">
      {items.map((item) => (
        <a key={item} href="#">
          {item}
        </a>
      ))}
    </div>
  );
}

const types = [
  ["AI", "Monetize AI products with flexible pricing options: usage-based, seat-based, or a mix of both, all from one place."],
  ["Platform", "Embed payments, financial accounts, cards, and financing to create new revenue streams for your platform."],
  ["Software", "Quickly launch and grow recurring revenue with one platform for plans, invoices, and payments."],
];

const perks = [
  ["Credits and perks", "Launch faster with credits to offset your fees, plus discounts on tools that help you grow from day one."],
  ["Education", "Tap into expert insights and how-to sessions that help you get the most out of the platform."],
  ["Advice", "Tailored advice and suggestions on integrations, pricing, and growth from a team that works with startups every day."],
  ["Community", "Build a network of founders and platform leaders."],
] as const;

const rows = [
  { title: "Incorporate and fundraise", body: "Form a company, open a business bank account, and get ready to raise money in a few clicks.", chips: ["Incorporate"] },
  { title: "Manage your finances", body: "Store money, pay bills, and manage cash flow in one place with accounts built for startups.", chips: ["Accounts"] },
  { title: "Provision your stack with agents", body: "Use agents to set up products, prices, and webhooks from the command line in minutes.", chips: ["Projects"] },
];

const grow = [
  { title: "Capture global demand faster", body: "Offer local prices and payment methods in every market you sell in, and stay compliant as you grow.", chips: ["Local Pricing", "Shield", "Merchant Services", "Levies"] },
  { title: "Add new revenue streams", body: "Embed payments and financial services into your product to earn more from every customer.", chips: ["Platforms", "Cards", "Payouts"] },
  { title: "Close your books quickly and get real-time insights", body: "Automate revenue reports and pull live data into your own tools for faster decisions.", chips: ["Revenue Ledger", "Data Sync", "Queries"] },
];

const help = [
  ["Startup sales", "Get a custom quote and a plan for your launch from our startup sales team."],
  ["Growth support", "Work with our growth team to tune checkout, pricing, and retention as you scale."],
  ["Consulting partners", "Find a certified partner to plan and build your integration with you."],
  ["Technology partners", "Connect the tools you already use with apps built by our partners."],
  ["Professional services", "Get hands-on help from our experts for complex launches and migrations."],
];

export function SegmentScreen() {
  const brand = useBrand();
  const b = (text: string) => withBrand(text, brand);
  return (
    <LegacyPage accent="#635bff" footerTone="tint">
      <Band h={813} m={922} className="e-hero">
        <Media className="e-hero__art" tone="warm" />
        <h1 className="e-display">
          Start. Scale. <span>Grow.</span>
        </h1>
        <p className="e-lead e-hero__lead">{b("Ambitious startups have grown into large businesses on Acme, scaling from their first sale to going public. Incorporate your company, test and take payments with no-code tools, and automate financial operations to move faster.")}</p>
        <div className="p-actions">
          <Pill>Start now</Pill>
          <Pill ghost>Contact sales</Pill>
        </div>
        <div className="e-promo">
          <span className="e-promo__mark" data-compare-mask="" />
          <h2 className="e-small-title">Apply to the program</h2>
          <p className="p-body">Built to support venture-backed businesses that are just getting started.</p>
          <Pill ghost>Explore</Pill>
        </div>
      </Band>

      <Band h={855} m={815} tone="tint">
        <h2 className="e-h2">Build for any business type</h2>
        <p className="e-lead e-narrow">{b("Many successful startups run on Acme. Let us build the right foundation for your business.")}</p>
        <div className="e-types">
          {types.map(([title, body]) => (
            <a key={title} href="#" className="e-type">
              <h3 className="e-h3">{title}</h3>
              <p className="e-lead">{body}</p>
              <span className="e-more">Learn more</span>
              <Media className="e-type__logos" tone="plain" />
            </a>
          ))}
        </div>
      </Band>

      <Band h={1361} m={2362} className="e-program-band">
        <div className="e-program">
          <h2 className="e-h2b">{b("The Acme startup program helps venture-backed startups build, monetize, and scale faster")}</h2>
          <p className="e-lead">Get credits to offset your fees, product support from experts, and access to a community of founders and investors.</p>
          <div className="p-actions">
            <Pill>Apply now</Pill>
            <Pill ghost>FAQs</Pill>
          </div>
          <div className="e-perks">
            {perks.map(([title, body]) => (
              <div key={title}>
                <h3 className="e-small-title">{title}</h3>
                <p className="p-body">{b(body)}</p>
              </div>
            ))}
          </div>
          <Media className="e-quote" tone="cool" />
        </div>
      </Band>

      <Band h={1812} m={2800} tone="tint">
        <h2 className="e-h2 e-h2--wide">Go from idea to revenue-ready in days</h2>
        <p className="e-lead e-narrow">Form your company, set up your finances, and launch your product from one place.</p>
        <div className="e-rows">
          {rows.map((row) => (
            <div key={row.title} className="e-row">
              <div className="e-row__copy">
                <h3 className="e-h3">{row.title}</h3>
                <p className="p-body">{b(row.body)}</p>
                <Chips items={row.chips} />
              </div>
              <Media className="e-row__media" tone="soft" />
            </div>
          ))}
        </div>
      </Band>

      <Band h={1236} m={1093}>
        <h2 className="e-h2">Turn demand into revenue</h2>
        <p className="e-lead e-narrow">Accept payments with no-code tools, send invoices, and run plans as you find your first customers.</p>
        <div className="e-tabs" role="tablist" aria-label="Stage">
          {["No code", "Low code", "Some code", "API"].map((label, index) => (
            <button key={label} type="button" role="tab" aria-selected={index === 0}>
              {label}
            </button>
          ))}
        </div>
        <div className="e-cards">
          {["Payment links", "Invoicing", "Plans"].map((title) => (
            <div key={title} className="e-card">
              <h3 className="e-h3">{title}</h3>
              <p className="p-body">Get paid without writing code, and share a link anywhere your customers are.</p>
              <Media className="e-card__media" tone="soft" />
            </div>
          ))}
        </div>
      </Band>

      <Band h={1808} m={2801} tone="tint">
        <h2 className="e-h2 e-h2--wide">Grow without the growing pains</h2>
        <p className="e-lead e-narrow">{b("Reach customers around the world, add new ways to earn revenue, and keep your books in order as you scale.")}</p>
        <div className="e-rows">
          {grow.map((row) => (
            <div key={row.title} className="e-row">
              <div className="e-row__copy">
                <h3 className="e-h3">{row.title}</h3>
                <p className="p-body">{b(row.body)}</p>
                <Chips items={row.chips} />
              </div>
              <Media className="e-row__media" tone="soft" />
            </div>
          ))}
        </div>
      </Band>

      <Band h={891} m={988} tone="warm" className="e-stat">
        <p className="e-stat__value">125+</p>
        <p className="e-stat__label">Payment methods supported through a single integration</p>
      </Band>

      <Band h={441} m={494}>
        <h2 className="e-h3">{b("Acme's partner network for investors")}</h2>
        <p className="p-body e-narrow e-gap">Venture firms and accelerators can unlock perks and credits for their portfolio companies by joining the partner network.</p>
        <Pill>Partner with us</Pill>
        <Media className="e-orbs" tone="soft" />
      </Band>

      <Band h={906} m={1177} tone="tint">
        <h2 className="e-h2">Need help?</h2>
        <p className="e-lead e-narrow">Our team and partners can help you plan, build, and grow.</p>
        <div className="e-help">
          {help.map(([title, body]) => (
            <div key={title}>
              <span className="p-feature__icon" data-compare-mask="" />
              <h3 className="e-help__title">{title}</h3>
              <p className="p-body">{body}</p>
              <span className="e-more">Learn more</span>
            </div>
          ))}
        </div>
      </Band>

      <Band h={385} m={349}>
        <h2 className="e-h3">Ready to start?</h2>
        <p className="p-body e-gap">{b("Quickly create a free account and start building with Acme.")}</p>
        <Pill>Start now</Pill>
      </Band>
    </LegacyPage>
  );
}
