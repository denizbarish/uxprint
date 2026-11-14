"use client";

import { Shell, useBrand } from "../chrome";
import { AiBento, EnterpriseCard, Faq, PlanCards } from "../parts";
import "./product.css";

function PlanCta() {
  return (
    <div className="rc-product-cta">
      <a className="rc-btn rc-btn--light" href="#">
        Compare Plans
      </a>
      <span className="rc-product-cta__note">Starting at $8/month</span>
    </div>
  );
}

export function ProductScreen() {
  const brand = useBrand();
  return (
    <Shell>
      <section className="rc-product-hero">
        <div className="rc-product-hero__art rc-media rc-media--glow" data-compare-mask="" aria-hidden="true" />
        <span className="rc-pill">{brand} Pro</span>
        <h1 className="rc-product-hero__title">New Level Unlocked</h1>
        <p className="rc-product-hero__lead">
          Go Pro to bring AI to every task, make {brand} your own with custom
          <br /> themes, keep your devices in sync and more.
        </p>
        <PlanCta />
      </section>

      <AiBento />

      <section className="rc-product-section rc-product-section--first">
        <div className="rc-product-models">
          <div className="rc-product-models__head">
            <h2>One Interface.</h2>
            <p className="rc-product-models__sub">Dozens of models.</p>
            <p className="rc-product-models__text">
              Pick a faster model when speed matters and a smarter one for more complex tasks.
            </p>
          </div>
          <div className="rc-product-models__chart rc-media" data-compare-mask="" />
        </div>
      </section>

      <section className="rc-product-section rc-product-features">
        <span className="rc-product-features__icon" data-compare-mask="" aria-hidden="true" />
        <div className="rc-product-models__head">
          <h2>Put the Pro in Productivity.</h2>
          <p className="rc-product-models__sub">{brand} Pro is about more than just AI.</p>
        </div>
        <PlanCta />
        <div className="rc-product-translate">
          <div className="rc-product-translate__art rc-media" data-compare-mask="" />
          <div className="rc-product-translate__text">
            <div className="rc-twotone">
              <h2>Don&apos;t get lost in translation.</h2>
              <p>Translate text on the fly, check pronunciation or dictate your own words.</p>
            </div>
            <span className="rc-chip">Translator</span>
          </div>
        </div>
        <div className="rc-product-cards">
          {[
            ["Stay in sync.", "Cloud Sync keeps your workflow the same across all your devices.", "Cloud Sync"],
            ["Never forget.", "With unlimited Clipboard History you can find that image you copied last year.", "Clipboard History"],
            ["Keep organized.", "Position and resize your windows with your own layout commands.", "Custom Window Management"],
          ].map(([title, text, chip]) => (
            <article key={title} className="rc-product-card">
              <div className="rc-product-card__visual rc-media" data-compare-mask="" />
              <div className="rc-twotone rc-product-card__text">
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              <span className="rc-chip">{chip}</span>
            </article>
          ))}
        </div>
        <div className="rc-product-themes">
          <div className="rc-product-themes__text">
            <div className="rc-twotone">
              <h2>Express yourself.</h2>
              <p>Craft your own custom theme or choose one of hundreds from the community.</p>
            </div>
            <span className="rc-chip">Custom Themes</span>
          </div>
          <div className="rc-product-themes__grid rc-media" data-compare-mask="" />
        </div>
      </section>

      <section className="rc-product-section rc-product-plans">
        <PlanCards />
        <EnterpriseCard />
      </section>

      <section className="rc-product-section rc-product-faq">
        <Faq
          title="FAQs"
          subtitle="You've got questions. We've got answers"
          items={[
            ["How do you handle my data?", "Your data stays yours. We only process what is needed to run the features you use."],
            ["What's the difference between the Pro and Team plan?", "Pro is for individuals. Team adds shared commands, snippets and admin controls."],
            ["Can I use my own model provider key?", "Yes. Bring your own key and use it in every AI feature."],
            [`Which model do you use for ${brand} AI?`, "You choose. Pick from a list of models for each chat or command."],
            ["Can I upgrade my Team plan to use Advanced AI?", "Yes. Upgrade from the billing page at any time."],
            [`Does ${brand} have a Student Program?`, "Yes. Students get a discount on the Pro plan with a valid school email."],
          ]}
        />
      </section>
    </Shell>
  );
}
