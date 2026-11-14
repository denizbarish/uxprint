"use client";

import { useId, useState, type ReactNode } from "react";
import { ArrowRight, DownloadGlyph, useBrand } from "./chrome";
import "./parts.css";

export function Check() {
  return (
    <svg viewBox="0 0 16 16" className="rc-icon" aria-hidden="true">
      <circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5.5 8.2l1.7 1.7 3.3-3.6" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Plus() {
  return (
    <svg viewBox="0 0 16 16" className="rc-icon" aria-hidden="true">
      <circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 5.2v5.6M5.2 8h5.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 16 16" className="rc-icon" aria-hidden="true">
      <path d="M4.5 6.5 8 10l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------------------------------------------------------------- FAQ */

/** FAQ rows: question button and an answer that expands with grid-template-rows (print.json motion). */
export function Faq({ items, title, subtitle }: { items: [string, string][]; title: string; subtitle?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();
  return (
    <section className="rc-faq">
      <div className="rc-twotone rc-faq__head">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      <div className="rc-faq__list">
        {items.map(([question, answer], index) => {
          const expanded = open === index;
          return (
            <div className="rc-faq__item" key={question} data-open={expanded ? "" : undefined}>
              <h3>
                <button
                  type="button"
                  className="rc-faq__question"
                  aria-expanded={expanded}
                  aria-controls={`${id}-${index}`}
                  onClick={() => setOpen(expanded ? null : index)}
                >
                  <span>{question}</span>
                  <Chevron />
                </button>
              </h3>
              <div className="rc-faq__answer" id={`${id}-${index}`} role="region">
                <div>
                  <p>{answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- plans */

type Feature = { label: string; note?: string; tag?: string; link?: string; muted?: boolean };

function Features({ items }: { items: Feature[] }) {
  return (
    <ul className="rc-plan__features">
      {items.map((item) => (
        <li key={item.label} className={item.muted ? "is-muted" : undefined}>
          {item.muted ? <Plus /> : <Check />}
          <span>
            <span className="rc-plan__feature">
              {item.label}
              {item.tag ? <span className="rc-tag">{item.tag}</span> : null}
            </span>
            {item.note ? <span className="rc-plan__note">{item.note}</span> : null}
            {item.link ? (
              <a href="#" className="rc-plan__more">
                {item.link} <ArrowRight />
              </a>
            ) : null}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Segmented({ options, initial, label }: { options: string[]; initial: string; label: string }) {
  const [value, setValue] = useState(initial);
  return (
    <div className="rc-segmented" role="radiogroup" aria-label={label} style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}>
      {options.map((option) => (
        <button key={option} type="button" role="radio" aria-checked={option === value} onClick={() => setValue(option)}>
          {option}
        </button>
      ))}
    </div>
  );
}

function Badge() {
  return <span className="rc-plan__badge" data-compare-mask="" aria-hidden="true" />;
}

export function PlanCards() {
  const brand = useBrand();
  const [yearly, setYearly] = useState(true);
  return (
    <div className="rc-plans">
      <div className="rc-billing" role="radiogroup" aria-label="Billing period">
        <span className="rc-billing__thumb" data-side={yearly ? "right" : "left"} aria-hidden="true" />
        <button type="button" role="radio" aria-checked={!yearly} onClick={() => setYearly(false)}>
          Monthly
        </button>
        <button type="button" role="radio" aria-checked={yearly} onClick={() => setYearly(true)}>
          Yearly <span className="rc-billing__chip">-20%</span>
        </button>
      </div>
      <div className="rc-plans__grid">
        <article className="rc-plan">
          <header>
            <h3 className="rc-plan__name">{brand} Free</h3>
            <p className="rc-plan__desc">Essential everyday tools, without AI.</p>
          </header>
          <p className="rc-plan__price">
            <span>$0</span> <small>/ month</small>
          </p>
          <a href="#" className="rc-btn rc-btn--dark rc-plan__cta">
            Download
          </a>
          <Features
            items={[
              { label: "Core features, including:", note: "Clipboard History, Quicklinks, Calculator, Snippets, Emoji Picker, Window Management + many more..." },
              { label: `${brand} Notes` },
              { label: `${brand} for Mobile` },
              { label: "Thousands of extensions" },
              { label: "Custom Extensions" },
              { label: "Developer Tooling" },
            ]}
          />
        </article>
        <article className="rc-plan rc-plan--featured">
          <Badge />
          <header>
            <h3 className="rc-plan__name">{brand} Pro</h3>
            <p className="rc-plan__desc">Access to all features, and AI.</p>
          </header>
          <Segmented options={["Pro", "Plus", "Max"]} initial="Pro" label="Pro tier" />
          <p className="rc-plan__price">
            <span>{yearly ? "$8" : "$10"}</span> <small>/ month</small>
          </p>
          <p className="rc-plan__billed">
            <s>$120</s> $96 billed annually
          </p>
          <button type="button" className="rc-btn rc-btn--light rc-plan__cta">
            <Check />
            Start Free Trial
          </button>
          <Features
            items={[
              { label: `Everything in ${brand} Free`, muted: true },
              { label: "500 credits of AI usage", note: "Included every month" },
              { label: `${brand} AI`, note: "Use AI anywhere. Work with files, create images, connect your tools and add context from your screen, memory and profile. Compare, choose and manage models with ease.", link: `Explore ${brand} AI` },
              { label: "Fast and capable AI models", tag: "New", note: "Use fast and capable AI models from the leading providers. Top-tier models are included in Pro+ and Pro Max.", link: "See all models" },
              { label: "Bring Your Own Key", note: "Connect your existing AI subscriptions and use them in the app." },
              { label: "Cloud Sync", note: "Sync Snippets, Notes, Chats between your desktop and mobile devices" },
              { label: "Dictation", tag: "New", note: "Type with your voice using built-in dictation." },
              { label: "Translator" },
              { label: "Unlimited Clipboard History" },
              { label: "Custom Window Management" },
              { label: "Custom Themes" },
            ]}
          />
          <p className="rc-plan__foot">The free trial includes 500 credits of AI usage.</p>
        </article>
        <article className="rc-plan">
          <Badge />
          <header>
            <h3 className="rc-plan__name">Teams Pro</h3>
            <p className="rc-plan__desc">Level up your team&apos;s productivity.</p>
          </header>
          <Segmented options={["Free", "Pro", "Plus", "Max"]} initial="Pro" label="Team tier" />
          <p className="rc-plan__price">
            <span>{yearly ? "$12" : "$15"}</span> <small>/ user / month</small>
          </p>
          <p className="rc-plan__billed">
            <s>$180</s> $144 billed annually
          </p>
          <a href="#" className="rc-btn rc-btn--dark rc-plan__cta">
            <DownloadGlyph />
            Choose Teams Pro
          </a>
          <Features
            items={[
              { label: "Everything in Pro", muted: true },
              { label: "500 credits per user", note: "Included every month" },
              { label: "Fast and capable AI models", tag: "New", note: "Use fast and capable AI models from the leading providers. Top-tier models are included in Pro+ and Pro Max.", link: "See all models" },
              { label: "Bring Your Own Key", note: "Connect your existing AI subscriptions and use them in the app." },
              { label: "Shared Commands, Snippets, and Quicklinks" },
              { label: "Private Store" },
            ]}
          />
        </article>
      </div>
      <a href="#compare" className="rc-plans__compare">
        Compare all features <span aria-hidden="true">↓</span>
      </a>
    </div>
  );
}

export function EnterpriseCard() {
  const brand = useBrand();
  const group = (title: string, items: string[]) => (
    <div className="rc-enterprise__group">
      <p className="rc-enterprise__title">{title}</p>
      <ul className="rc-plan__features">
        {items.map((item) => (
          <li key={item} className="is-muted">
            <Check />
            <span className="rc-plan__feature">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <div className="rc-enterprise-wrap">
      <article className="rc-enterprise">
        <div className="rc-enterprise__info">
          <header>
            <h3 className="rc-plan__name">{brand} for Enterprise</h3>
            <p className="rc-plan__desc">For advanced security and control</p>
          </header>
          <div className="rc-enterprise__cols">
            <div>
              <ul className="rc-plan__features">
                <li className="is-muted">
                  <Plus />
                  <span className="rc-plan__feature">Everything in Teams Pro</span>
                </li>
                <li>
                  <Check />
                  <a href="#" className="rc-plan__feature">
                    Security Audit Certified →
                  </a>
                </li>
                <li>
                  <Check />
                  <a href="#" className="rc-plan__feature">
                    Annual Penetration Testing →
                  </a>
                </li>
              </ul>
              {group("AI Control Center:", ["Organization-Wide Toggle", "Full AI Memory Control", "Bring Your Own Keys", "AI Provider Allow-List", "Custom AI Provider"])}
            </div>
            {group("Organization Admin Controls:", ["Single Sign-On and Sync", "Domain Capture", "Device sign-in enforcement", "Full Cloud Sync Control", "Full Dictation Control", "2FA Enforcement", "Extensions Allow-List", "IP Allow-List"])}
          </div>
        </div>
        <div className="rc-enterprise__pricing">
          <p className="rc-enterprise__price">Custom Pricing</p>
          <p className="rc-enterprise__billed">Only billed annually</p>
          <a href="#" className="rc-btn rc-btn--dark">
            Contact Us
          </a>
        </div>
      </article>
      <a href="#" className="rc-enterprise__more">
        Learn more about {brand} for Enterprise →
      </a>
    </div>
  );
}

/** Bento of three product mockups shared by the home and product templates. */
export function AiBento({ children }: { children?: ReactNode }) {
  const brand = useBrand();
  return (
    <section className="rc-ai">
      <p className="rc-ai__eyebrow">AI AGENT</p>
      <h2 className="rc-ai__title">Meet your new virtual assistant</h2>
      <p className="rc-ai__lead">{brand} AI uses the tools you already rely on to get work done.</p>
      <div className="rc-ai__bento">
        {[
          ["AI Chat", "A built-in assistant that works with your favorite tools and keeps your flow effortless.", "wide"],
          ["Quick AI", "Quick AI lives a single hotkey away, ready whenever you need an answer.", ""],
          ["AI Extensions", "Connect your everyday tools to AI so it can work in the places you already do.", ""],
        ].map(([title, text, size]) => (
          <article key={title} className={`rc-ai__card${size ? " rc-ai__card--wide" : ""}`}>
            <div className="rc-ai__visual rc-media" data-compare-mask="" />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <a className="rc-arrow-link rc-ai__link" href="#">
        Learn more about {brand} AI <ArrowRight />
      </a>
      {children}
    </section>
  );
}
