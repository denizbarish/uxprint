"use client";

import { useState } from "react";
import { useBrand } from "../chrome";
import "./paywall.css";

type Period = "year" | "month";

type Plan = {
  name: string;
  lead: string;
  text: string;
  cta: string;
  banner?: string;
  prices: Record<Period, { save?: string; was?: string; now: string; note: string }>;
  features: string[];
  extra?: string[];
};

const BASE_FEATURES = ["Grammar check-ins", "Word list check-ins", "Spoken level checks*", "Ad-free study", "Course certificates"];

function plans(brand: string): Plan[] {
  return [
    {
      name: "Plus",
      lead: "For steady growth.",
      text: "Stay focused with fewer distractions. Keep on course with grammar and word list tools.",
      cta: "Choose Plus",
      prices: {
        year: { save: "Save 51%", was: "EUR 95.88", now: "EUR 46.99", note: "EUR 3.92/month" },
        month: { now: "EUR 7.99", note: "Billed every month" },
      },
      features: BASE_FEATURES,
    },
    {
      name: `${brand} Max`,
      lead: "For spoken fluency.",
      text: "Open speaking tools any time and members-only lessons to lift your confidence.",
      cta: `Choose ${brand} Max`,
      banner: "Top pick",
      prices: {
        year: { save: "Save 50%", was: "EUR 115.88", now: "EUR 57.00", note: "EUR 4.75/month" },
        month: { now: "EUR 9.99", note: "Billed every month" },
      },
      features: ["Chat practice*", "Sound practice*", "Members-only lessons", "Keep your run going", "Skill paths (talking courses)*"],
      extra: BASE_FEATURES,
    },
  ];
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="bu-pw__check" aria-hidden="true">
      <path d="M4 12.5l5 5L20 6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlanCard({ plan, period }: { plan: Plan; period: Period }) {
  const price = plan.prices[period];
  return (
    <article className="bu-pw__card" aria-label={plan.name}>
      <div className={plan.banner ? "bu-pw__banner" : "bu-pw__banner bu-pw__banner--empty"}>{plan.banner ?? null}</div>
      <h2 className="bu-pw__name">{plan.name}</h2>
      <p className="bu-pw__text">
        <strong>{plan.lead}</strong> {plan.text}
      </p>
      <div className="bu-pw__price">
        {price.save ? <p className="bu-pw__save">{price.save}</p> : null}
        <div className="bu-pw__row">
          {price.was ? <s>{price.was}</s> : null}
          <p className="bu-pw__now">{price.now}</p>
        </div>
        <p className="bu-pw__note">{price.note}</p>
      </div>
      <a href="#" className="bu-pw__cta">
        {plan.cta}
      </a>
      <ul className="bu-pw__list">
        {plan.features.map((feature) => (
          <li key={feature}>
            <Check />
            {feature}
          </li>
        ))}
        {plan.extra ? (
          <>
            <li className="bu-pw__rule" aria-hidden="true">
              <span>And every Plus feature</span>
            </li>
            {plan.extra.map((feature) => (
              <li key={`extra-${feature}`}>
                <Check />
                {feature}
              </li>
            ))}
          </>
        ) : null}
      </ul>
      <p className="bu-pw__foot">*Offered in some languages and on some platforms.</p>
    </article>
  );
}

export function PaywallScreen() {
  const brand = useBrand();
  const [period, setPeriod] = useState<Period>("year");
  return (
    <div className="busuu-ref bu-pw">
      <div className="bu-pw__wash" aria-hidden="true" />
      <nav className="bu-pw__bar" aria-label="Plans">
        <a href="#" className="bu-pw__close" aria-label="Close">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </a>
      </nav>
      <main className="bu-pw__main">
        <p className="bu-pw__eyebrow">Picked for you</p>
        <h1 className="bu-pw__title">
          Hit your targets with <span>{brand} Max</span>
        </h1>
        <div className="bu-pw__toggle" role="group" aria-label="Billing period" data-period={period}>
          <span className="bu-pw__thumb" aria-hidden="true" />
          <button type="button" aria-pressed={period === "year"} onClick={() => setPeriod("year")}>
            12 months
          </button>
          <button type="button" aria-pressed={period === "month"} onClick={() => setPeriod("month")}>
            1 month
          </button>
        </div>
        <div className="bu-pw__cards">
          {plans(brand).map((plan) => (
            <PlanCard key={plan.name} plan={plan} period={period} />
          ))}
        </div>
      </main>
    </div>
  );
}
