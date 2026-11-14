"use client";

import { useId, useState } from "react";
import { HdsPage, Media } from "../chrome";
import { useBrand, withBrand } from "../brand";
import { ChevronLeft, Chevron, Burger, Plus, Wordmark } from "../icons";

const faqs = [
  ["What does it take to do well here?", "The bar is high, and the people who do well here tend to care a great deal about the work and the people they serve. They take ownership, move quickly, and stay curious about how things could work better.", "People who do well tend to be driven by the mission. That shows up as a habit of writing things down, asking hard questions, and helping the people around them do their best work. We look for people who want to grow and who care about craft."],
  ["What does career growth look like?", "Fast, if you seek it out. You get ownership early, and growth follows the size of the problems you take on.", ""],
  ["What should I expect during the hiring process?", "Most processes include a recruiter screen, a skills interview, and conversations with the team you would join.", ""],
  ["How do I know a recruiter contacting me is real?", "Our recruiters reach out through official channels only and never ask for payment or banking details.", ""],
] as const;

function CareersHeader({ brand }: { brand: string }) {
  return (
    <header className="r2-header">
      <a href="#" className="r2-logo" aria-label={`${brand} careers`}>
        <Wordmark brand={brand} />
        <span>careers</span>
      </a>
      <nav aria-label="Careers" className="r2-nav">
        <a href="#" aria-current="page">
          Opportunity
        </a>
        <a href="#">Compatibility</a>
        <a href="#">Emerging talent</a>
      </nav>
      <a href="#" className="s-btn s-btn--primary s-btn--sm">
        Open roles
      </a>
      <button type="button" className="r2-menu" aria-label="Open navigation menu">
        <Burger />
      </button>
    </header>
  );
}

function FaqItem({ q, a, b, initiallyOpen }: { q: string; a: string; b: string; initiallyOpen: boolean }) {
  const [open, setOpen] = useState(initiallyOpen);
  const id = useId();
  return (
    <div className={`r2-faq__item${open ? " is-open" : ""}`}>
      <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((value) => !value)}>
        {q}
        <Plus />
      </button>
      <div id={id} hidden={!open} className="r2-faq__panel">
        <p>{a}</p>
        {b ? <p>{b}</p> : null}
      </div>
    </div>
  );
}

export function CareersScreen() {
  const brand = useBrand();
  const w = (text: string) => withBrand(text, brand);
  return (
    <HdsPage header={<CareersHeader brand={brand} />}>
      <section className="r2-band r2-hero">
        <div className="s-frame r2-frame">
        <h1 className="r2-display">Build the conditions for prosperity</h1>
        </div>
      </section>
      <section className="r2-band r2-image">
        <div className="s-frame r2-frame">
          <Media className="r2-wide" tone="warm" />
        </div>
      </section>

      <section className="r2-band r2-mission">
        <div className="s-frame r2-frame">
        <h2 className="r2-title">
          Our mission is to grow the economy. <span>{w("At Acme, you can make that happen.")}</span>
        </h2>
        <p className="r2-copy">
          We exist to increase economic growth, and we pursue it on every front: building tools for businesses, <a href="#">publishing</a> <a href="#">ideas</a>, and making long-term bets. Our people do the most important work of their careers here.
        </p>
        <Media className="r2-half" tone="soft" />
        <Media className="r2-half" tone="cool" />
        {([
          ["Speed and craft compound", "Our goal is to get faster as we grow. We also care about craft, and we think the two make each other stronger over time."],
          ["Better defaults exist", "We do not assume the best way to do something is the way it has always been done. We look for better ways, and then we make them the default for everyone."],
          ["Built for the best", "We serve some of the most ambitious companies in the world because we obsess over the details that matter to them."],
        ] as const).map(([title, body]) => (
          <div key={title} className="r2-value">
            <h3>{title}</h3>
            <p>{w(body)}</p>
          </div>
        ))}
        </div>
      </section>

      <section className="r2-band r2-ai">
        <div className="s-frame r2-frame">
        <h2 className="r2-title r2-title--narrow">Building the business infrastructure for AI</h2>
        <p className="r2-copy">{w("AI is reshaping the global economy. Acme is building tools for AI companies, and for the agents that will soon buy and sell on behalf of people and businesses everywhere.")}</p>
        <Media className="r2-wide" tone="dark" />
        </div>
      </section>

      <section className="r2-band r2-gdp">
        <div className="s-frame r2-frame">
        <p className="r2-title">
          {w("A large share of online commerce runs on Acme.")} <span>Behind every transaction is something someone here built.</span>
        </p>
        <div className="r2-logos" aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => (
            <Media key={index} className="r2-logos__item" tone="plain" />
          ))}
        </div>
        </div>
      </section>

      <section className="r2-band r2-scale">
        <div className="s-frame r2-frame">
        <h2 className="r2-title r2-title--narrow">Solve the problems that matter at scale</h2>
        <p className="r2-copy">{w("Acme is focused on improving how money moves for millions of businesses. The work is hard, the stakes are real, and the scale is large enough that small gains add up to a lot.")}</p>
        <Media className="r2-canvas" tone="plain" />
        <div className="r2-stats">
          {[
            ["100+", "industry leaders each process more than $1B a year"],
            ["$1.9T", "in payments volume processed last year"],
            ["78%", "of fast-growing AI companies run on the platform"],
            ["50+", "countries where businesses can sign up"],
          ].map(([value, label]) => (
            <div key={value}>
              <p className="r2-stat">{value}</p>
              <p>{label}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      <section className="r2-band r2-curious">
        <div className="s-frame r2-frame">
        <div className="r2-curious__head">
          <h2 className="r2-title">
            Stay curious <span>Explore the latest news and insights.</span>
          </h2>
          <div className="r2-arrows">
            <button type="button" aria-label="Previous slide">
              <ChevronLeft />
            </button>
            <button type="button" aria-label="Next slide">
              <Chevron />
            </button>
          </div>
        </div>
        <Media className="r2-video" tone="dark" />
        <div className="r2-caption">
          <p>
            <strong>{w("Acme's product roadmap.")}</strong> See a roadmap of the products and features in active development across the platform.
          </p>
          <a href="#" className="s-btn s-btn--secondary">
            View the roadmap
          </a>
        </div>
        </div>
      </section>

      <section className="r2-band r2-faq">
        <div className="s-frame r2-frame">
        <h2 className="r2-title r2-title--faq">Frequently asked questions</h2>
        <div className="r2-faq__list">
          {faqs.map(([q, a, b], index) => (
            <FaqItem key={q} q={w(q)} a={w(a)} b={w(b)} initiallyOpen={index === 0} />
          ))}
        </div>
        </div>
      </section>

      <section className="r2-band r2-more">
        <div className="s-frame r2-frame">
        <h2 className="r2-title">{w("More on careers at Acme")}</h2>
        <div className="r2-more__grid">
          {[
            "Learn how successful people here operate, and see if this is the right place for you.",
            "Start your career at the center of the global economy and see what our programs offer.",
            "We are hiring. Explore our open roles and send your application today.",
          ].map((text, index) => (
            <a key={text} href="#" className="r2-more__card">
              <Media className="r2-more__media" tone={index === 1 ? "warm" : "soft"} />
              <p>{text}</p>
            </a>
          ))}
        </div>
        </div>
      </section>
    </HdsPage>
  );
}
