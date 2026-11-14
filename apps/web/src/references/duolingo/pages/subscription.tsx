"use client";

import { useState } from "react";
import { Art, Btn, CourseStrip, LinkRow, Shell, useBrand } from "../chrome";
import { filler } from "../filler";
import "./subscription.css";

const TIERS = [
  { name: "Free", tone: "free", rows: [16, 16, 15, 15, 20, 6], on: 1 },
  { name: "Plus", tone: "plus", rows: [16, 16, 15, 15, 20, 6], on: 6 },
  { name: "Plus Family", tone: "family", rows: [16, 16, 15, 20, 6, 47], on: 6 },
] as const;

const PERKS = [
  { tab: "Unlimited tries", title: "Push yourself", body: 66 },
  { tab: "No ads", title: "Stay in the flow", body: 58 },
  { tab: "Custom practice", title: "Practice what you miss", body: 72 },
  { tab: "Unlimited levels", title: "Climb every week", body: 62 },
];

const STEPS = [
  { title: "Day 1", body: 49 },
  { title: "Day 5", body: 44 },
  { title: "Day 7", body: 55 },
];

function Check({ on }: { on: boolean }) {
  return on ? (
    <svg viewBox="0 0 12 10" className="dl-tier__mark dl-tier__mark--on" aria-hidden="true">
      <path d="M1.5 5.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 10 10" className="dl-tier__mark" aria-hidden="true">
      <path d="M2 2l6 6M8 2l-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/** Feature tabs: a vertical tab list beside a device shot and a caption panel (super page). */
function PerkTabs() {
  const [active, setActive] = useState(0);
  const perk = PERKS[active] ?? PERKS[0]!;
  return (
    <div className="dl-perks">
      <div className="dl-perks__tabs" role="tablist" aria-label="Plus features">
        {PERKS.map((item, index) => (
          <button
            key={item.tab}
            type="button"
            role="tab"
            id={`dl-perk-${index}`}
            aria-selected={index === active}
            aria-controls="dl-perk-panel"
            tabIndex={index === active ? 0 : -1}
            className="dl-perks__tab"
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" || event.key === "ArrowRight") setActive((active + 1) % PERKS.length);
              if (event.key === "ArrowUp" || event.key === "ArrowLeft") setActive((active + PERKS.length - 1) % PERKS.length);
            }}
          >
            <span className="dl-perks__icon" aria-hidden="true" />
            {item.tab}
          </button>
        ))}
      </div>
      <div className="dl-perks__stage" role="tabpanel" id="dl-perk-panel" aria-labelledby={`dl-perk-${active}`}>
        <Art className="dl-perks__phone" dark />
        <section className="dl-perks__panel">
          <h3>{perk.title}</h3>
          <p>{filler(perk.body, active + 4)}</p>
        </section>
      </div>
      <div className="dl-perks__dots" aria-hidden="true">
        {PERKS.map((item, index) => (
          <span key={item.tab} data-on={index === active || undefined} />
        ))}
      </div>
    </div>
  );
}

export function SubscriptionScreen() {
  const brand = useBrand();
  return (
    <Shell className="dl-sub">
      <header className="dl-sub__bar">
        <div className="dl-sub__barin">
          <a href="#" className="dl-sub__logo" aria-label={`${brand} plus home`} data-compare-mask="">
            <small>plus</small>
            {brand}
          </a>
          <button type="button" className="dl-btn dl-btn--outline dl-btn--r16 dl-btn--sm dl-sub__login">
            Sign in
          </button>
        </div>
      </header>

      <section className="dl-sub__hero">
        <Art className="dl-sub__heroart" dark />
        <div className="dl-sub__herocopy">
          <h1 className="dl-sub__h1">build a brand new skill the easy way</h1>
          <p className="dl-sub__lead">Reach your goals faster with the friendliest learning app around</p>
          <button type="button" className="dl-btn dl-btn--r16 dl-sub__cta">
            <span>Start my free week</span>
          </button>
        </div>
      </section>

      <CourseStrip dark />

      <section className="dl-sub__plans">
        <h2 className="dl-sub__h2">no long contracts. stop any time.</h2>
        <p className="dl-sub__note">Try a week free</p>
        <div className="dl-tiers">
          {TIERS.map((tier) => (
            <div key={tier.name} className={`dl-tier dl-tier--${tier.tone}`}>
              <div className="dl-tier__head">
                <h3>{tier.name}</h3>
                {tier.tone === "plus" ? <span className="dl-tier__badge" aria-label="Recommended" /> : null}
              </div>
              <ul className="dl-tier__body">
                {tier.rows.map((length, index) => (
                  <li key={index} data-off={index >= tier.on || undefined}>
                    <Check on={index < tier.on} />
                    {filler(length, index * 2 + 3).replace(/\.$/, "")}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <button type="button" className="dl-btn dl-btn--r16 dl-sub__cta dl-sub__cta--wide">
          <span>Start my free week</span>
        </button>
      </section>

      <section className="dl-sub__stats">
        <span className="dl-sub__bubble dl-sub__bubble--a" aria-hidden="true" />
        <span className="dl-sub__bubble dl-sub__bubble--b" aria-hidden="true" />
        <span className="dl-sub__bubble dl-sub__bubble--c" aria-hidden="true" />
        <dl className="dl-sub__statgrid">
          {[
            ["120+", "subject courses"],
            ["#1", "most loved learning app"],
            ["400m+", "learners around the world"],
          ].map(([value, label]) => (
            <div key={label} className="dl-sub__stat">
              <dt>{value}</dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="dl-sub__perks">
        <h2 className="dl-sub__h2 dl-sub__h2--tight">go further with plus</h2>
        <p className="dl-sub__perklead">{filler(99, 6)}</p>
        <PerkTabs />
        <button type="button" className="dl-btn dl-btn--r16 dl-sub__cta">
          <span>Start my free week</span>
        </button>
      </section>

      <section className="dl-sub__give">
        <div className="dl-sub__givein">
          <Art className="dl-sub__giveart" dark />
          <div className="dl-sub__givecopy">
            <h2>Help keep lessons free</h2>
            <p>{filler(154, 8)}</p>
            <button type="button" className="dl-btn dl-btn--r16 dl-sub__cta">
              <span>Start my free week</span>
            </button>
          </div>
        </div>
      </section>

      <section className="dl-sub__trial">
        <div className="dl-sub__trialcopy">
          <h2 className="dl-sub__h2 dl-sub__h2--left">how the free week works</h2>
          <p>{filler(68, 2)}</p>
        </div>
        <ol className="dl-sub__steps">
          {STEPS.map((step, index) => (
            <li key={step.title}>
              <span className="dl-sub__dot" aria-hidden="true" data-last={index === STEPS.length - 1 || undefined} />
              <strong>{step.title}</strong>
              <span>{filler(step.body, index + 11)}</span>
            </li>
          ))}
        </ol>
      </section>

      <footer className="dl-sub__foot">
        <div className="dl-sub__footgrid">
          <div>
            <h2>Take lessons on the go</h2>
            <p>{filler(79, 3)}</p>
          </div>
          <div className="dl-sub__stores">
            <a href="#" className="dl-btn dl-btn--r16 dl-btn--white dl-sub__store">
              <span className="dl-sub__storeicon" aria-hidden="true" data-compare-mask="" />
              <span>
                <small>Get it from the</small>
                Phone Shop
              </span>
            </a>
            <a href="#" className="dl-btn dl-btn--r16 dl-btn--white dl-sub__store">
              <span className="dl-sub__storeicon" aria-hidden="true" data-compare-mask="" />
              <span>
                <small>Find it on</small>
                App Market
              </span>
            </a>
          </div>
        </div>
        <LinkRow className="dl-sub__links" />
      </footer>
    </Shell>
  );
}
