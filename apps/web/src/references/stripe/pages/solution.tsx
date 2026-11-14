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

/** A fixed-height band: the older pages stack bands of measured heights, alternating tint. */
/** height = measured band height at 1440, mobile = at 390 (falls back to content height). */
export function Band({ height, mobile, tint = false, children, className }: { height: number; mobile?: number; tint?: boolean; children: ReactNode; className?: string }) {
  return (
    <section className={`u-band${tint ? " u-band--tint" : ""} ${className ?? ""}`} style={{ height, "--mh": mobile ? `${mobile}px` : undefined } as CSSProperties}>
      <div className="p-container u-band__inner">{children}</div>
    </section>
  );
}

function Feature({ title, body, wide = false }: { title: string; body: ReactNode; wide?: boolean }) {
  return (
    <div className={`p-feature u-feature${wide ? " u-feature--wide" : ""}`}>
      <span className="u-feature__icon" data-compare-mask="" />
      <h3 className="p-feature__title">{title}</h3>
      <p className="p-body">{body}</p>
    </div>
  );
}

export function SolutionScreen() {
  const brand = useBrand();
  const b = (text: string) => withBrand(text, brand);

  return (
    <LegacyPage accent="#635bff" footerTone="tint">
      <section className="u-hero">
        <Media className="u-hero__art" tone="soft" />
        <div className="p-container">
          <p className="u-hero__kicker">Software solution</p>
          <h1 className="p-display u-hero__title">Unify payments, plans, and revenue operations</h1>
          <p className="p-lead u-hero__lead">{b("Improve customer experience, grow recurring revenue, and cut costs with one unified platform for payments, plans, invoicing, levies, and more. Companies like yours use Acme to scale globally.")}</p>
          <div className="p-actions">
            <Pill>Contact sales</Pill>
            <Pill ghost>Start now</Pill>
          </div>
        </div>
      </section>

      <Band height={663} mobile={593} className="u-logos">
        <div className="u-logos__grid">
          {Array.from({ length: 8 }, (_, index) => (
            <Media key={index} className="u-logos__item" tone="plain" />
          ))}
        </div>
      </Band>

      <Band height={1145} mobile={1274} tint>
        <p className="p-eyebrow">Capture more revenue</p>
        <h2 className="p-h2">Support any pricing model</h2>
        <p className="u-link-lead">
          Learn why pricing flexibility is key to steady revenue growth in our <a href="#">is your billing system slowing you down? report</a>.
        </p>
        <div className="u-stack">
          <Feature wide title="Launch new plans and start taking payments in minutes" body="Create and test new pricing models without writing code. Easily send invoices, offer discounts and free trials, and set up checkout in a few clicks." />
          <Feature wide title="Support any pricing model" body="Use per-seat pricing, metered billing, tiered or flat fees, and add-ons. Keep books clean with revenue reports and automatic tax rates." />
          <Feature wide title="Support custom pricing for complex deals" body="Close complex deals faster. Send quotes, set custom terms, and sync with your ERP and accounting systems automatically." />
        </div>
        <Media className="u-side-media u-side-media--tall" />
      </Band>

      <Band height={1688} mobile={2637}>
        <p className="p-eyebrow u-eyebrow--cyan">Cut engineering effort</p>
        <h2 className="p-h2">Save time and resources spent on billing</h2>
        <p className="p-lead u-lead-wide">Skip complex billing logic and maintenance. With hosted pages and a ready-made customer portal, your teams spend less time building and more time growing your business.</p>
        <div className="u-two">
          <div>
            <h3 className="p-h3">Get paid sooner with prebuilt invoices</h3>
            <p className="p-lead">{b("Acme-hosted invoices get paid faster than traditional invoices. Our conversion-tuned invoices make it easy for customers to pay from anywhere.")}</p>
            <Pill>Try it out</Pill>
          </div>
          <div>
            <h3 className="p-h3">Launch a customer portal in minutes</h3>
            <p className="p-lead">Let customers manage their own plan details, payment methods, and invoices through a hosted customer portal. Add your logo and brand colors.</p>
            <Pill>Try it out</Pill>
          </div>
        </div>
        <div className="u-two u-two--media">
          <Media />
          <Media />
        </div>
        <h3 className="p-h3 u-auto-title">Move faster with built-in automation</h3>
        <div className="p-grid4 u-grid">
          <Feature title="Automate with webhooks" body="Use webhooks to trigger actions in other systems when plans change, payments fail, or invoices are paid." />
          <Feature title="Plan proration" body="Automatically prorate plan changes, so customers pay the right amount when they upgrade mid-cycle." />
          <Feature title="Schedule plans" body="Configure rules to start, change, and end plans on a schedule, without manual work." />
          <Feature title="Automatic reminders" body="Send email reminders before renewals and when cards are about to expire to reduce failed payments." />
        </div>
      </Band>

      <Band height={496} mobile={402} tint>
        <h3 className="p-h3 u-narrow">Reliably sync data across all your systems</h3>
        <p className="p-lead u-narrow">{b("If your data lives in many places, connect Acme to other tools with the App Directory, or build a custom connection using our APIs. Popular apps include CRM, e-signature, ERP, and accounting tools.")}</p>
        <Media className="u-side-media" />
      </Band>

      <Band height={948} mobile={1434}>
        <p className="p-eyebrow u-eyebrow--cyan">{b("Why Acme")}</p>
        <h2 className="p-h2">{b("Grow revenue with the power of the Acme platform")}</h2>
        <div className="u-grid2">
          <Feature wide title="Offer a local experience in every market" body="Increase conversion by offering local payment methods and currencies in every country you sell in." />
          <Feature wide title="Reduce churn with revenue recovery tools" body={b("Recover failed payments automatically with smart retries and Acme recovery tools.")} />
          <Feature wide title="Simplify accrual accounting with automated revenue reports" body={b("Close the books faster with Acme Revenue Ledger, built for recurring businesses.")} />
          <Feature wide title="Streamline and improve your business" body="Get one view of revenue and finance automation across products, regions, and teams." />
        </div>
      </Band>

      <Band height={429} mobile={431} tint>
        <h3 className="p-h3 u-narrow">Provision your stack from the command line</h3>
        <p className="p-lead u-narrow">Set up products, prices, and webhooks with a single command, and keep environments in sync.</p>
        <Pill>{b("Explore Acme Projects")}</Pill>
        <Media className="u-side-media" />
      </Band>

      <Band height={1166} mobile={1635} className="u-cases">
        <p className="p-eyebrow">Case studies</p>
        <div className="u-case">
          <div>
            <h2 className="p-h2 u-case__title">{b("A team chat app uses Acme to automate payments and plans")}</h2>
            <h3 className="p-feature__title">Challenge</h3>
            <p className="p-body">The team needed a billing system that could handle a fast-growing customer base, many currencies, and changing pricing models without slowing product work.</p>
            <h3 className="p-feature__title u-case__gap">Solution</h3>
            <p className="p-body">{b("Using Acme, the team automated invoicing and collections for hundreds of thousands of customers, and launched new plans in weeks.")}</p>
            <a href="#" className="u-inline">
              Read the full story.
            </a>
            <h3 className="p-feature__title u-case__gap">Products</h3>
            <ul className="u-case__products">
              <li>Collections</li>
              <li>Plans</li>
              <li>Shield</li>
              <li>Queries</li>
            </ul>
          </div>
          <Media className="u-case__logo" tone="plain" />
        </div>
      </Band>

      <Band height={629} mobile={938} tint>
        <p className="p-eyebrow">Expert services</p>
        <h3 className="p-h3 u-narrow">{b("Build a unified software solution with help from Acme")}</h3>
        <p className="p-lead u-narrow">Work with our expert services team to design, build, and launch your revenue stack faster, with guidance from people who have done it hundreds of times.</p>
        <Pill>Learn more</Pill>
        <Media className="u-side-media" />
      </Band>

      <Band height={481} mobile={853}>
        <div className="u-cta">
          <div>
            <h3 className="p-h3">Ready to get started?</h3>
            <p className="p-lead">{b("Learn how Acme Plans can grow your recurring revenue, or create an account to start today.")}</p>
            <div className="p-actions">
              <Pill>Contact sales</Pill>
              <Pill ghost>Start now</Pill>
            </div>
          </div>
          <Feature title="Accept global payments" body="Take payments in over 120 currencies with one integration." />
          <Feature title="Move your back office forward" body="Automate finance tasks and reconcile with confidence." />
        </div>
      </Band>
    </LegacyPage>
  );
}
