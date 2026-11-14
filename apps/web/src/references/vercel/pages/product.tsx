"use client";

import { Page } from "../chrome";
import { Btn, Media } from "../ui";
import "./product.css";

const chips = ["Notes", "Content Drafts", "Contrast", "Share", "Toggles", "People", "Layout Jumps"];

const features = [
  { title: "Write.", text: "Connect any code host or push straight from the command line." },
  { title: "Push to review.", text: "Each change gets its own working copy of the app, ready to share the moment it builds." },
  { title: "Keep moving.", text: "When builds are quick and undo is instant, teams can release smaller changes with confidence." },
  { title: "Collect notes.", text: "Gather input and polish your work with comments placed right on each release." },
  { title: "Flip toggles.", text: "Change overrides right from the toolbar." },
  { title: "Edit live.", text: "Open your content editor from the release preview." },
  { title: "Check contrast.", text: "Find ways to make the app easier for more people to use." },
  { title: "Stop layout jumps.", text: "See what moves things around on your page, read a summary of the cause, and replay it." },
  { title: "Every environment.", text: "Use the toolbar locally, in staging, or in production." },
];

/** Feature page template (product and platform pages), built from /products/previews. */
export function ProductScreen() {
  return (
    <Page>
      <section className="vc-prod-hero" aria-labelledby="prod-title">
        <div className="vc-prod-hero__copy">
          <h1 className="vc-display" id="prod-title">
            A preview for
            <br />
            every change
          </h1>
          <p className="vc-prod-hero__lead">Write, review, and release great web work with the whole team looking at the same live link.</p>
          <div className="vc-prod-hero__actions">
            <Btn size={40} pill variant="primary" icon={<span className="vc-prod-tri" aria-hidden="true" />}>
              Start now
            </Btn>
            <Btn size={40} pill>
              Book a demo
            </Btn>
          </div>
        </div>
        <div className="vc-prod-hero__art" aria-hidden="true">
          {chips.map((chip, index) => (
            <span key={chip} className={`vc-prod-chip vc-prod-chip--${index}`}>
              {chip}
            </span>
          ))}
          <Media tone="dark" className="vc-prod-bar" />
        </div>
      </section>

      <section className="vc-prod-features" aria-labelledby="prod-features">
        <h2 className="vc-h48 vc-prod-features__title" id="prod-features">
          Nothing to set up.{" "}
          <br />
          Share your work at once
        </h2>
        <div className="vc-prod-grid">
          {features.map((feature) => (
            <article key={feature.title} className="vc-prod-card">
              <div className="vc-prod-card__frame">
                <Media className="vc-prod-card__art" />
              </div>
              <p className="vc-prod-card__text">
                <strong>{feature.title}</strong> {feature.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="vc-cta-row" aria-labelledby="prod-cta">
        <h2 className="vc-h48" id="prod-cta">
          Ready to start?
        </h2>
        <div className="vc-cta-row__actions">
          <Btn size={36} pill variant="primary">
            Start building
          </Btn>
          <Btn size={36} pill>
            Talk to an expert
          </Btn>
        </div>
      </section>
    </Page>
  );
}
