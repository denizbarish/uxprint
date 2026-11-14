"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { StoreBadges } from "./chrome";
import "./parts.css";

/** Neutral stand-in for an illustration, photo or video, at the original's size. */
export function Media({ className = "", style, onBlue = false }: { className?: string; style?: CSSProperties; onBlue?: boolean }) {
  return <span className={`bu-media ${onBlue ? "bu-media--on-blue" : ""} ${className}`} style={style} data-compare-mask="" aria-hidden="true" />;
}

/** Blue hero band of the marketing pages: centred text column beside an illustration. */
export function Hero({
  title,
  subtitle,
  action,
  trust = false,
  className = "",
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  trust?: boolean;
  className?: string;
}) {
  return (
    <section className={`bu-hero ${className}`}>
      <div className="bu-hero__inner">
        <div className="bu-hero__text">
          <h1 className="bu-hero__title">{title}</h1>
          {subtitle ? <p className="bu-hero__sub">{subtitle}</p> : null}
          {action ? <div className="bu-hero__action">{action}</div> : null}
          {trust ? <div className="bu-hero__trust" aria-hidden="true" /> : null}
        </div>
        <Media className="bu-hero__art" onBlue />
      </div>
    </section>
  );
}

/** The 870px prose column inside a 994px section. */
export function Prose({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`bu-prose ${className}`}>
      <div className="bu-prose__col">{children}</div>
    </section>
  );
}

export function BlueCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`bu-bluecard ${className}`}>{children}</div>;
}

export function StatCards({ stats, className = "" }: { stats: [string, string][]; className?: string }) {
  return (
    <section className={`bu-row bu-stats ${className}`}>
      {stats.map(([value, caption]) => (
        <div className="bu-stat" key={value}>
          <h2>{value}</h2>
          <p>{caption}</p>
        </div>
      ))}
    </section>
  );
}

export function FeatureCards({ items, tone = "surface", className = "" }: { items: [string, string][]; tone?: "surface" | "white"; className?: string }) {
  return (
    <section className={`bu-row bu-features bu-features--${tone} ${className}`}>
      {items.map(([title, text]) => (
        <div className="bu-feature" key={title}>
          <Media className="bu-feature__art" />
          <div className="bu-feature__body">
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

/** Numbered cards in a stair layout over a lightning shape. `heading` adds a title inside each card. */
export function Steps({ title, steps, className = "" }: { title: string; steps: { text: string; heading?: string }[]; className?: string }) {
  return (
    <section className={`bu-steps ${className}`}>
      <span className="bu-steps__bolt" aria-hidden="true" />
      <h2 className="bu-steps__title">{title}</h2>
      <ol className="bu-steps__list">
        {steps.map((step, index) => (
          <li className="bu-step" key={step.text}>
            <p className="bu-step__badge">{String(index + 1).padStart(2, "0")}</p>
            <Media className="bu-step__art" />
            <div className="bu-step__text">
              {step.heading ? <h3>{step.heading}</h3> : null}
              {step.text}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Arrow({ direction }: { direction: "prev" | "next" }) {
  return <span aria-hidden="true">{direction === "prev" ? "‹" : "›"}</span>;
}

/** Title row with round arrow buttons and a track that runs off the right edge. */
export function Carousel({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (direction: 1 | -1) => {
    const node = track.current;
    if (!node) return;
    const card = node.firstElementChild as HTMLElement | null;
    node.scrollBy({ left: direction * ((card?.offsetWidth ?? 480) + 32), behavior: "smooth" });
  };
  return (
    <section className={`bu-carousel ${className}`}>
      <div className="bu-carousel__head">
        <h2>{title}</h2>
        <div className="bu-carousel__arrows">
          <button type="button" aria-label="Previous" onClick={() => scroll(-1)} className="is-first">
            <Arrow direction="prev" />
          </button>
          <button type="button" aria-label="Next" onClick={() => scroll(1)}>
            <Arrow direction="next" />
          </button>
        </div>
      </div>
      <div className="bu-carousel__track" ref={track}>
        {children}
      </div>
    </section>
  );
}

export function ContentCard({ title, text, action }: { title: string; text?: string; action?: string }) {
  return (
    <article className={action ? "bu-card bu-card--resource" : "bu-card"}>
      {action ? <h3>{title}</h3> : null}
      <Media className="bu-card__art" />
      {action ? null : <h3>{title}</h3>}
      {text ? <p>{text}</p> : null}
      {action ? (
        <a href="#" className="bu-card__more">
          {action}
        </a>
      ) : null}
    </article>
  );
}

const REVIEW_TINTS = ["#fff4d8", "#f4e9fe", "#cffce9"];

export function ReviewCard({ index, name, course, purpose, quote }: { index: number; name: string; course: string; purpose: string; quote: string }) {
  return (
    <article className="bu-review" style={{ background: REVIEW_TINTS[index % 3] }}>
      <div className="bu-review__who">
        <Media className="bu-review__avatar" />
        <div>
          <h3>{name}</h3>
          <p className="bu-review__line">
            Studied <span className="bu-review__chip">{course}</span>
          </p>
          <p className="bu-review__purpose">{purpose}</p>
        </div>
      </div>
      <svg className="bu-review__mark" viewBox="0 0 60 60" aria-hidden="true">
        <path d="M14 34c0-9 5-16 13-19l2 4c-5 2-8 6-8 11h7v14H14zm22 0c0-9 5-16 13-19l2 4c-5 2-8 6-8 11h7v14H36z" fill="currentColor" />
      </svg>
      <p className="bu-review__quote">{quote}</p>
    </article>
  );
}

/** App download banner: two big lines around a mint box whose letters drop in, store badges, phone video. */
export function DownloadBanner({ before, word, after, note }: { before: string; word: string; after: string; note: string }) {
  return (
    <section className="bu-download">
      <div className="bu-download__card">
        <div className="bu-download__text">
          <h2>
            <span className="bu-download__line">{before}</span>
            <span className="bu-download__box">
              <span className="bu-download__word" aria-label={word}>
                {word.split("").map((letter, index) => (
                  <span key={index} style={{ animationDelay: `${index * 40}ms` }} aria-hidden="true">
                    {letter}
                  </span>
                ))}
              </span>
              <Media className="bu-download__spark" />
            </span>
            <span className="bu-download__line">{after}</span>
          </h2>
          <StoreBadges className="bu-download__badges" />
          <p className="bu-download__note">{note}</p>
        </div>
        <div className="bu-download__phone">
          <Media className="bu-download__video" onBlue />
        </div>
      </div>
    </section>
  );
}

/** Space the review widget takes on the original; the widget itself is third-party and left empty. */
export function TrustSlot({ className = "" }: { className?: string }) {
  return <div className={`bu-trustslot ${className}`} aria-hidden="true" />;
}
