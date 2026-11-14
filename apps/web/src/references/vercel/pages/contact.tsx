"use client";

import { useId, useState, type FormEvent } from "react";
import { Switch } from "@base-ui/react/switch";
import { Page } from "../chrome";
import { LogoBar } from "../ui";
import "./contact.css";

const proof: [string, string, number][] = [
  ["Millions", " of parallel sandbox runner jobs", 64],
  ["80% faster", " from design to live", 28],
  ["20× lower", " retry rate for model calls", 34],
  ["4B tokens", " handled daily", 60],
  ["~60 days", " to two patent-pending products", 70],
];

function Field({ label, type = "text", placeholder, wide, autoComplete }: { label: string; type?: string; placeholder: string; wide?: boolean; autoComplete?: string }) {
  const id = useId();
  return (
    <div className={`vc-contact-field${wide ? " vc-contact-field--wide" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} placeholder={placeholder} autoComplete={autoComplete} required={type === "email"} />
    </div>
  );
}

/** Contact and support form template, built from /contact/sales. */
export function ContactScreen() {
  const [sent, setSent] = useState(false);
  const countryId = useId();
  const helpId = useId();

  function submit(event: FormEvent<HTMLFormElement>) {
    // Nothing is sent anywhere: the reference stops at the form.
    event.preventDefault();
    setSent(true);
  }

  return (
    <Page actions="contact">
      <div className="vc-contact">
        <section className="vc-contact__intro" aria-labelledby="contact-title">
          <h1 className="vc-display" id="contact-title">
            Talk to our sales team
          </h1>
          <p className="vc-lead vc-contact__lead">Get a tailored demo. See what Acme can do for your company and walk through our custom plans and pricing.</p>
          <ul className="vc-contact__proof">
            {proof.map(([strong, rest, w]) => (
              <li key={strong}>
                <span className="vc-contact__logo">
                  <LogoBar width={w} height={20} />
                </span>
                <p>
                  <span>{strong}</span>
                  {rest}
                </p>
              </li>
            ))}
          </ul>
        </section>
        <form className="vc-contact__form" onSubmit={submit} aria-label="Contact sales">
          <Field label="Full name" placeholder="Jamie Rivers" autoComplete="name" />
          <Field label="Work email" type="email" placeholder="jamie@company.example" autoComplete="email" />
          <div className="vc-contact-field">
            <label htmlFor={countryId}>Country</label>
            <div className="vc-contact-select">
              <select id={countryId} defaultValue="tr" autoComplete="country">
                <option value="tr">Türkiye</option>
                <option value="de">Germany</option>
                <option value="us">United States</option>
              </select>
            </div>
          </div>
          <span />
          <Field label="Company website" type="url" placeholder="https://www.example.com" wide autoComplete="url" />
          <div className="vc-contact-field vc-contact-field--wide">
            <label htmlFor={helpId}>How can we help?</label>
            <textarea id={helpId} placeholder="Tell us about your stack, your use case, and how you would like to use our products" />
          </div>
          <div className="vc-contact-consent">
            <div>
              <p className="vc-contact-consent__title">Privacy Notice</p>
              <p className="vc-contact-consent__text">
                Yes, I agree to receive product news from Acme as described in the <a href="#">Privacy Notice</a>. I can take back my consent at any time with the unsubscribe link found in each email we send.
              </p>
            </div>
            <Switch.Root className="vc-switch" aria-label="Agree to receive product news">
              <Switch.Thumb className="vc-switch__thumb" />
            </Switch.Root>
          </div>
          <div className="vc-contact-submit">
            <button type="submit" className="vc-btn vc-btn--36 vc-btn--pill vc-btn--primary">
              <span className="vc-btn__label">Talk to Acme</span>
            </button>
            {sent ? (
              <p role="status" className="vc-contact-sent">
                Thanks. This reference keeps the form here and sends nothing.
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </Page>
  );
}
