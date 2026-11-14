"use client";

import { LegacyPage, SubNav, Media } from "../chrome";
import { useBrand, withBrand } from "../brand";
import { Chevron } from "../icons";

const features = [
  {
    title: "Apply in a few clicks",
    body: "Get the financing you need without the paperwork. Apply for business loans and cash advances in minutes, with no effect on your personal credit score.",
  },
  {
    title: "Get funds fast",
    body: "Money usually lands the next business day, straight into your Acme account.",
  },
  {
    title: "One flat fee",
    body: "Pay one flat fee that never changes. There is no compounding interest, and there are no late fees.",
  },
  {
    title: "Repay as you earn",
    body: "Repayment is fully automatic and adjusts to your daily sales. Acme deducts a fixed share of your sales until the full balance is paid.",
  },
];

const steps = [
  {
    title: "Check your eligibility",
    body: "Log in to your Dashboard to see if you are eligible for an offer based on factors that include your sales volume and history on Acme.",
  },
  {
    title: "Choose your offer",
    body: "Pick the funding amount that suits your business. The fee and repayment rate are set by the amount you choose.",
  },
  {
    title: "Receive your funds",
    body: "Once our team reviews your choice, the funds go into your Acme account, usually the next business day.",
  },
  {
    title: "Repay as you earn*",
    body: "You repay your loan or cash advance with a fixed share of your daily sales until the total is paid.",
  },
];

function Pill({
  children,
  ghost = false,
}: {
  children: string;
  ghost?: boolean;
}) {
  return (
    <a href="#" className={`s-pill${ghost ? " s-pill--ghost" : ""}`}>
      {children}
      <Chevron />
    </a>
  );
}

export function ProductScreen() {
  const brand = useBrand();
  const b = (text: string) => withBrand(text, brand);

  return (
    <LegacyPage accent="#15be53">
      <SubNav name="Funding" links={["Overview", "Platforms"]} />

      <section className="p-hero">
        <div className="p-hero__bg" aria-hidden="true" />
        <div className="p-container p-hero__copy">
          <h1 className="p-display">Business funding that fuels your growth</h1>
          <p className="p-lead">
            {b(
              "Get fast, flexible financing through Acme Funding. Manage cash flow, take a business loan or a cash advance, and invest in what matters most to your business: growth.",
            )}
          </p>
          <div className="p-actions">
            <Pill>Check eligibility</Pill>
            <Pill ghost>Read the docs</Pill>
          </div>
        </div>
        <Media className="p-ribbon" tone="cool" />
      </section>

      <section className="p-features">
        <div className="p-container">
          <div className="p-grid4">
            {features.map((item) => (
              <div key={item.title} className="p-feature">
                <span className="p-feature__icon" data-compare-mask="" />
                <h2 className="p-feature__title">{item.title}</h2>
                <p className="p-body">{b(item.body)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="p-how">
        <div className="p-how__bg" aria-hidden="true" />
        <div className="p-container">
          <p className="p-eyebrow">How it works</p>
          <h2 className="p-h2">Quick funding and flexible repayment</h2>
          <ol className="p-grid4 p-steps">
            {steps.map((step, index) => (
              <li key={step.title} className="p-feature">
                <span className="p-step__num">{index + 1}</span>
                <h3 className="p-feature__title">{step.title}</h3>
                <p className="p-body">{b(step.body)}</p>
              </li>
            ))}
          </ol>
          <Media className="p-demo" tone="plain" />
          <h2 className="p-h2 p-how__more">
            {b("See where Funding goes further")}
          </h2>
          <p className="p-lead p-how__lead">
            {b(
              "Funding puts money into your Acme account, and Acme money tools take it from there. See where you can store, move, and spend those funds in markets worldwide, and what is coming next so you can plan ahead.",
            )}
          </p>
          <Pill>Explore by country</Pill>
        </div>
        <Media className="p-shard" tone="cool" />
      </section>

      <section className="p-quote">
        <div className="p-container">
          <figure className="p-quote__card">
            <blockquote>
              {b(
                "“Acme Funding helped us grow our global footprint. We used the advance to open servers in three new regions, reaching customers around the world. Since then, our yearly revenue has more than doubled.”",
              )}
            </blockquote>
            <figcaption>
              <strong>Sam Ortega,</strong> Cofounder &amp; CEO
            </figcaption>
            <span className="p-quote__logo" data-compare-mask="" />
            <span className="p-quote__dots" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
          </figure>
          <div className="p-logos">
            {Array.from({ length: 4 }, (_, index) => (
              <button
                key={index}
                type="button"
                className="p-logos__item"
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <Media className="p-logos__mark" tone="plain" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="p-cta">
        <div className="p-container">
          <div className="p-cta__grid">
            <div>
              <h2 className="p-h3">Ready to get started?</h2>
              <p className="p-lead">
                Log in to your Dashboard to see your eligibility and any current
                offers through Acme Funding. Eligibility updates daily, so check
                back often for new loans or cash advance offers.
              </p>
              <div className="p-actions">
                <Pill>Log in</Pill>
                <Pill ghost>Learn more</Pill>
              </div>
            </div>
            <div className="p-feature">
              <span className="p-feature__icon" data-compare-mask="" />
              <h3 className="p-feature__title">Questions</h3>
              <p className="p-body">
                {b(
                  "Read more about Acme Funding in our frequently asked questions.",
                )}
              </p>
              <Pill ghost>Learn more</Pill>
            </div>
            <div className="p-feature">
              <span className="p-feature__icon" data-compare-mask="" />
              <h3 className="p-feature__title">Funding for platforms</h3>
              <p className="p-body">
                Help your customers get the capital they need to speed up
                growth.
              </p>
              <Pill ghost>Learn more</Pill>
            </div>
          </div>
        </div>
        <div className="p-container p-legal">
          <p>
            {b(
              "Acme Funding offers financing types that include loans and cash advances. All financing requests are subject to review before approval. In the US, Acme Funding loans are issued by partner banks, and other partners provide cash advances. In the UK, Acme Funding loans and cash advances are provided by a lending partner. See your Dashboard for the terms of your offer.",
            )}
          </p>
          <p>
            <strong>
              {b(
                "*Acme Funding loans have a minimum amount due each payment period. If the amount you pay through sales does not meet the minimum, your bank account will be debited for the rest at the end of the period.",
              )}
            </strong>
          </p>
        </div>
      </section>
    </LegacyPage>
  );
}
