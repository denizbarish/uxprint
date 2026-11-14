"use client";

import { useState, type FormEvent } from "react";
import { useBrand } from "../brand";
import { Chevron, Wordmark } from "../icons";

const steps = ["Your email", "Your info", "Let's talk"];

/** Contact sales: standalone page with its own bare header, a gradient backdrop and a stepped lead form that never submits. */
export function ContactScreen() {
  const brand = useBrand();
  const [step, setStep] = useState(0);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStep((value) => Math.min(value + 1, 1));
  };

  return (
    <div className="stripe-ref s-hds k-page">
      <header className="k-header">
        <a href="#" aria-label={`${brand} homepage`}>
          <Wordmark brand={brand} />
        </a>
        <a href="#" className="k-signup">
          Sign up
          <Chevron />
        </a>
      </header>
      <main className="k-main">
        <div className="k-art" aria-hidden="true" />
        {/* The backdrop is a canvas on the original: only the parts outside the card are marked as media for comparison. */}
        <span className="k-mask k-mask--top" data-compare-mask="" aria-hidden="true" />
        <span className="k-mask k-mask--side" data-compare-mask="" aria-hidden="true" />
        <section className="k-card" aria-labelledby="k-title">
          <ol className="k-steps">
            {steps.map((label, index) => (
              <li key={label} className={index === step ? "is-current" : index < step ? "is-done" : undefined} aria-current={index === step ? "step" : undefined}>
                <span className="k-steps__dot" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ol>
          <h1 id="k-title" className="k-title">
            {step === 0 ? "Let's get you to the right place" : "Tell us about yourself"}
          </h1>
          <p className="k-lead">We just need a few quick details.</p>
          <form className="k-form" onSubmit={onSubmit} noValidate>
            {step === 0 ? (
              <>
                <label className="k-row">
                  <span>Work email</span>
                  <input type="email" name="email" autoComplete="email" inputMode="email" placeholder="jane@example.com" required />
                </label>
                <label className="k-row">
                  <span>Country/Region</span>
                  <select name="country" defaultValue="US" autoComplete="country">
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="DE">Germany</option>
                    <option value="TR">Türkiye</option>
                  </select>
                </label>
              </>
            ) : (
              <>
                <label className="k-row">
                  <span>Full name</span>
                  <input type="text" name="name" autoComplete="name" required />
                </label>
                <label className="k-row">
                  <span>Company</span>
                  <input type="text" name="company" autoComplete="organization" required />
                </label>
              </>
            )}
            <div className="k-actions">
              <button type="submit" className="k-continue">
                Continue
                <Chevron />
              </button>
            </div>
          </form>
        </section>
      </main>
      <footer className="k-footer">
        <span className="k-footer__mark" data-compare-mask="" />
        <a href="#">
          Visit our full website <Chevron />
        </a>
        <a href="#">Privacy &amp; terms</a>
        <p>© 2026 {brand}, Inc.</p>
      </footer>
    </div>
  );
}
