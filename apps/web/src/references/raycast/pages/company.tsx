"use client";

import { useState, type CSSProperties } from "react";
import { ArrowRight, Shell, useBrand } from "../chrome";
import { filler } from "../filler";
import "./company.css";

const YEARS = ["2020", "2021", "2022", "2023", "2024", "2025"];

const MILESTONES = [
  ["Accelerator Batch", "The founders started the journey with an accelerator batch and a first prototype."],
  ["Seed Round", "We raised a seed round and announced the public beta of the app."],
  ["Public Launch", "We announced the public launch and said hello to the world."],
  ["Side Project", "We launched a hack day project that collected thousands of upvotes."],
  ["Store and API", "We launched the API and the extension store for developers and customers."],
  ["Series A", "We announced our Series A round."],
  ["Launch Week", "We did our first launch week and released something new every day."],
  ["Teams", "We launched the team plan out of beta for companies of every size."],
];

const VALUES = [
  ["Speed", "We get things done and have a bias towards action. We run a marathon and not a sprint. Though it's still a race."],
  ["Simplicity", "We keep things simple and prefer pragmatic solutions over complicated abstractions. We cut away cargo cult."],
  ["Transparency", "We communicate early and often. We don't have secrets but respect privacy and are honest if things went bad."],
  ["Trust", "All of us own a piece of the company and we trust each other to do what they think is best."],
  ["Quality", "We don't settle on mediocrity and choose quality over quantity. Even if the solutions are harder."],
  ["Inclusivity", "We come from different backgrounds and reflect our diverse community. We treat each other as we want to be treated."],
];

/** Gradient pairs for the initials avatars; initials are neutral placeholders. */
const GRADIENTS = [
  ["#c75d07", "#ff9217"],
  ["#7408ff", "#030013"],
  ["#5e8280", "#114985"],
  ["#0f3d34", "#86dcc2"],
  ["#6a3dec", "#a485ff"],
  ["#35c6fd", "#03b8fc"],
  ["#d72a2a", "#ff6363"],
  ["#3ca1ff", "#0047ff"],
  ["#e66250", "#e59f49"],
  ["#cf2f98", "#9a1b6e"],
  ["#003eb7", "#0085ff"],
  ["#303337", "#6a6d72"],
];

const LETTERS = "ABCDEFGHJKLMNPRSTVWZ";

/** Desktop masonry: three columns of cards; heights follow the original. */
const WORK_COLUMNS: [string, number, number][][] = [
  [
    ["Time for actual work", 293, 212],
    ["Weekly Demo Day", 423, 292],
    ["Fast moving", 293, 192],
    ["Modern tooling", 271, 192],
  ],
  [
    ["Team offsite Yearly", 513, 352],
    ["Work on something you use, and our users love", 391, 232],
    ["Fully distributed team", 489, 332],
  ],
  [
    ["Cut out the noise", 271, 192],
    ["We have fun", 293, 212],
    ["We care about design", 335, 232],
    ["Collaborate with a community", 320, 192],
  ],
];

const BENEFITS = [
  ["Competitive salary", "We pay you a location independent rate"],
  ["Stock options", "Everyone owns a piece of the company"],
  ["End of year bonus", "We value going the extra mile"],
  ["Parental leave", "We provide 3 months paid time off"],
  ["Flexible time off", "We recommend at least 25 days"],
  ["Build your workspace", "Order your own equipment to onboard"],
  ["Corporate card", "Use it on whatever makes you productive"],
  ["Health perks", "From insurance to gym. Stay healthy!"],
];

const STEPS = [
  "Send an engaging message",
  "Hiring manager intro",
  "Meet the team",
  "Take-home task",
  "Task assessment",
  "Get to know our Founders",
  "Offer Stage",
];

function SectionHead({ title, text }: { title: string; text: string }) {
  return (
    <header className="rc-co-head">
      <h2>{title}</h2>
      <p>{text}</p>
    </header>
  );
}

function Timeline() {
  const [active, setActive] = useState(1);
  const [title, text] = MILESTONES[active] ?? ["", ""];
  return (
    <div className="rc-co-timeline">
      <div className="rc-co-timeline__years" aria-hidden="true">
        {YEARS.map((year) => (
          <span key={year}>{year}</span>
        ))}
      </div>
      <div className="rc-co-timeline__ticks" aria-hidden="true" />
      <div className="rc-co-timeline__items" role="tablist" aria-label="Milestones">
        {MILESTONES.map(([name], index) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-label={name}
            className="rc-co-timeline__dot"
            onClick={() => setActive(index)}
          />
        ))}
      </div>
      <div className="rc-co-timeline__caption" role="tabpanel">
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
}

function Steps() {
  const [active, setActive] = useState(0);
  return (
    <div className="rc-co-steps">
      <ol className="rc-co-steps__list">
        {STEPS.map((step, index) => (
          <li key={step} className={index === STEPS.length - 1 ? "is-final" : undefined}>
            <button type="button" aria-pressed={index === active} onClick={() => setActive(index)}>
              <span className="rc-co-steps__label">{step}</span>
              <span className="rc-co-steps__num">{index + 1}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="rc-co-steps__tip" aria-live="polite">
        <p>{filler(150, active * 2 + 1)}</p>
        <p>{filler(150, active * 2 + 2)}</p>
      </div>
    </div>
  );
}

export function CompanyScreen() {
  const brand = useBrand();
  return (
    <Shell className="rc-co">
      <div className="rc-co-art rc-media rc-media--glow" data-compare-mask="" aria-hidden="true" />

      <section className="rc-co-hero">
        <h1>Help us make work frictionless</h1>
        <p>Join our growing and fully-remote team at {brand}, and empower people to supercharge their productivity.</p>
        <a href="#positions" className="rc-co-hero__cta">
          See open positions
        </a>
      </section>

      <Timeline />

      <section className="rc-co-section rc-co-values">
        <SectionHead title="Our values" text="Applying our values is what helps us thrive, enjoy what we do, and ship our best work." />
        <ul className="rc-co-values__grid">
          {VALUES.map(([title, text]) => (
            <li key={title} className="rc-co-card">
              <h4>{title}</h4>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rc-co-section rc-co-team">
        <SectionHead
          title="Team"
          text="We're a team who previously helped build products for millions of people across the internet at well-known software companies, and more."
        />
        <ul className="rc-co-team__members" aria-label="Team members">
          {Array.from({ length: 39 }, (_, index) => {
            const [from, to] = GRADIENTS[(index * 5) % GRADIENTS.length] ?? ["#303337", "#6a6d72"];
            const initials = LETTERS.charAt(index % LETTERS.length) + LETTERS.charAt((index * 7 + 3) % LETTERS.length);
            return (
              <li key={index} style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}>
                {initials}
              </li>
            );
          })}
        </ul>
        <div className="rc-co-team__details">
          <div className="rc-co-team__photo rc-media" data-compare-mask="" />
          <div>
            <dl className="rc-co-team__stats">
              {[
                ["39", "Folks so far"],
                ["17", "Countries"],
                ["33", "Pets"],
                ["100%", "Remote"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dd>{value}</dd>
                  <dt>{label}</dt>
                </div>
              ))}
            </dl>
            <p className="rc-co-team__text">{filler(190, 4)}</p>
            <p className="rc-co-team__text">{filler(170, 5)}</p>
          </div>
        </div>
      </section>

      <section className="rc-co-section rc-co-work">
        <SectionHead title="How we work" text="It's important that you enjoy your job, and love your life outside of work." />
        <div className="rc-co-work__grid">
          {WORK_COLUMNS.map((column, columnIndex) => (
            <div key={columnIndex} className="rc-co-work__column">
              {column.map(([title, height, mobile], index) => (
                <article
                  key={title}
                  className="rc-co-card rc-co-work__card"
                  style={{ "--h": `${height}px`, "--mh": `${mobile}px` } as CSSProperties}
                >
                  <h3>{title}</h3>
                  <p>{filler(Math.round((height - 140) * 0.9), columnIndex * 5 + index)}</p>
                </article>
              ))}
            </div>
          ))}
        </div>
      </section>

      <div className="rc-co-photos" aria-hidden="true">
        {[534, 340, 534, 534].map((width, index) => (
          <span key={index} className="rc-media" data-compare-mask="" style={{ width }} />
        ))}
      </div>

      <section className="rc-co-section rc-co-benefits">
        <SectionHead title="Our benefits" text="We put people first and want to empower everybody to do your best work." />
        <ul className="rc-co-benefits__grid">
          {BENEFITS.map(([title, text]) => (
            <li key={title} className="rc-co-card">
              <span className="rc-co-benefits__icon" data-compare-mask="" aria-hidden="true" />
              <strong>{title}</strong>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rc-co-section rc-co-positions" id="positions">
        <SectionHead title="Open positions" text="Currently we don't have any open positions. But we're always on the lookout for exceptional people." />
        <a href="#" className="rc-co-positions__apply">
          Want to apply anyway? <strong>Get in touch</strong> <ArrowRight />
        </a>
      </section>

      <section className="rc-co-section rc-co-hiring">
        <SectionHead title="Hiring process" text="Take a look at some of our interview steps, and a few tips to make your hiring experience great." />
        <Steps />
      </section>

      <section className="rc-co-section rc-co-investors">
        <SectionHead title="Investors" text={`Meet the great investors and people helping to make ${brand} grow.`} />
        <div className="rc-co-investors__logos rc-media" data-compare-mask="" aria-hidden="true" />
        <div className="rc-co-investors__people rc-media" data-compare-mask="" aria-hidden="true" />
      </section>

      <section className="rc-co-section rc-co-social">
        <div className="rc-twotone rc-co-social__head">
          <h2>Stay in the loop.</h2>
          <p>Join the community and learn how other people get the most out of {brand}.</p>
        </div>
        {[
          ["Forum", "37k members", "Get the inside track on new features and learn how other people use the app.", "Join"],
          ["Microblog", "90k followers", "Keep up to date with the latest releases, features and improvements.", "Follow"],
        ].map(([name, count, text, action]) => (
          <a key={name} href="#" className="rc-co-social__card">
            <span className="rc-co-social__row">
              <span className="rc-co-social__icon" data-compare-mask="" />
              <span className="rc-co-social__name">{name}</span>
              <span className="rc-co-social__count">{count}</span>
            </span>
            <span className="rc-co-social__text">{text}</span>
            <span className="rc-co-social__action">
              {action} <ArrowRight />
            </span>
          </a>
        ))}
      </section>
    </Shell>
  );
}
