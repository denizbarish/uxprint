"use client";

import { Shell } from "../chrome";
import { filler } from "../filler";
import { Feature, Media, TextLink, pad } from "../parts";
import "./feature.css";

export function FeatureScreen() {
  return (
    <Shell>
      <Feature
        className="ub-ft-hero"
        mediaFirst
        style={pad({ pt: 64, pb: 128, "pt-s": 40, "pb-s": 80, ar: "558 / 372", bt: 32, "gap-s": 36, ma: "start" })}
        level={1}
        title="Our promise on safety"
        body={<p className="ub-body">{filler(265, 1)}</p>}
        media={<Media tone="warm" />}
      />
      <Feature
        side="right"
        mediaFirst
        style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40, ar: "558 / 372", bt: 24, at: 32, "gap-s": 36 })}
        title="Working side by side to keep every street safe"
        body={<p className="ub-body">{filler(274, 2)}</p>}
        action={<TextLink>Read about our safety principles</TextLink>}
        media={<Media tone="cool" />}
      />
      <section className="ub-ft-quote">
        <div className="ub-wrap">
          <figure>
            <blockquote className="ub-label">{filler(178, 3)}</blockquote>
            <figcaption className="ub-body">Lead of rider care, Acme</figcaption>
          </figure>
        </div>
      </section>
      <Feature
        side="right"
        mediaFirst
        className="ub-ft-grey"
        style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40, ar: "558 / 372", bt: 24, at: 32, "gap-s": 36 })}
        title="Teaming up to change things"
        body={<p className="ub-body">{filler(191, 4)}</p>}
        action={<TextLink>Read more</TextLink>}
        media={<Media tone="green" />}
      />
      <section className="ub-sec ub-ft-cols" style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40 })}>
        <div className="ub-wrap">
          <ul>
            {[
              { title: "Rider safety", text: 46 },
              { title: "Driver care", text: 37 },
            ].map((col, index) => (
              <li key={col.title}>
                <span className="ub-ft-cols__icon" aria-hidden="true" data-compare-mask="" />
                <h3 className="ub-label">
                  <a href="#">{col.title}</a>
                </h3>
                <p className="ub-body">{filler(col.text, 6 + index)}</p>
                <TextLink className="ub-ft-cols__link">Read more</TextLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="ub-sec ub-ft-note" style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40 })}>
        <div className="ub-wrap">
          <p>{filler(73, 9)}</p>
        </div>
      </section>
    </Shell>
  );
}
