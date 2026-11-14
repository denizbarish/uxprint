"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { Arrow, Chevron, Pin } from "./chrome";
import { filler } from "./filler";
import "./parts.css";

export type Tone = "neutral" | "warm" | "cool" | "night" | "green" | "light";

/** Custom properties for per-section spacing: `pad({ pt: 64 })` gives `{ "--pt": "64px" }`. */
export function pad(values: Record<string, number | string>): CSSProperties {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(values)) out[`--${key}`] = typeof value === "number" ? `${value}px` : value;
  return out as CSSProperties;
}

/** Neutral stand-in for a photo, video or illustration; left out of the pixel comparison. */
export function Media({ tone = "neutral", circle, className, style, label }: { tone?: Tone; circle?: boolean; className?: string; style?: CSSProperties; label?: string }) {
  return (
    <div
      className={`ub-media${className ? ` ${className}` : ""}`}
      data-tone={tone === "neutral" ? undefined : tone}
      data-shape={circle ? "circle" : undefined}
      style={style}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      data-compare-mask=""
    />
  );
}

export function Button({ children, kind, size, className }: { children: ReactNode; kind?: "white" | "soft" | "pill"; size?: "small"; className?: string }) {
  return (
    <a href="#" className={`ub-btn${className ? ` ${className}` : ""}`} data-kind={kind} data-size={size}>
      {children}
    </a>
  );
}

export function TextLink({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <a href="#" className={`ub-link${className ? ` ${className}` : ""}`}>
      {children}
    </a>
  );
}

/** Two-column section: a 459px text block beside a 558px media column; stacks below 1136px. */
export function Feature({
  side = "left",
  media,
  title,
  body,
  action,
  mediaFirst,
  style,
  className,
  children,
  level = 2,
}: {
  level?: 1 | 2;
  side?: "left" | "right";
  media: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  action?: ReactNode;
  mediaFirst?: boolean;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <section className={`ub-feature${className ? ` ${className}` : ""}`} data-side={side} data-media-first={mediaFirst ? "" : undefined} style={style}>
      <div className="ub-wrap ub-feature__grid">
        <div className="ub-feature__text">
          {level === 1 ? <h1 className="ub-h1">{title}</h1> : <h2 className="ub-h2">{title}</h2>}
          {body ? <div className="ub-feature__body">{body}</div> : null}
          {children}
          {action ? <div className="ub-feature__action">{action}</div> : null}
        </div>
        <div className="ub-feature__media">{media}</div>
      </div>
    </section>
  );
}

/** Pickup and dropoff fields with the connector line and the locate arrow. */
export function LocationFields() {
  return (
    <div className="ub-loc">
      <label className="ub-loc__field">
        <span className="ub-loc__dot" aria-hidden="true" />
        <input type="text" placeholder="Start point" aria-label="Start point" autoComplete="street-address" />
        <svg viewBox="0 0 24 24" aria-hidden="true" className="ub-loc__locate">
          <path d="M21 3L3 10.5l7.5 3 3 7.5z" fill="currentColor" />
        </svg>
      </label>
      <span className="ub-loc__line" aria-hidden="true" />
      <label className="ub-loc__field">
        <span className="ub-loc__square" aria-hidden="true" />
        <input type="text" placeholder="End point" aria-label="End point" autoComplete="off" />
      </label>
    </div>
  );
}

export function CityLine({ city = "Hometown, AC" }: { city?: string }) {
  return (
    <p className="ub-cityline">
      <Pin />
      <b>{city}</b>
      <button type="button" className="ub-cityline__change">
        Switch city
      </button>
    </p>
  );
}

export function WhenPill({ label = "Leave now" }: { label?: string }) {
  return (
    <button type="button" className="ub-btn ub-when" data-kind="pill">
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="7" fill="currentColor" />
        <path d="M8 4.5V8l2.5 1.5" stroke="#f6f6f6" strokeWidth="1.5" fill="none" />
      </svg>
      {label}
      <Chevron />
    </button>
  );
}

export type Tile = { title: string; text: number; tone?: Tone };

/** Service tiles: 372x160 cards three per row; 106x96 squares on phones. */
export function Tiles({ items }: { items: Tile[] }) {
  return (
    <ul className="ub-tiles">
      {items.map((item, index) => (
        <li key={item.title}>
          <a href="#" className="ub-tile">
            <span className="ub-tile__text">
              <span className="ub-tile__title">{item.title}</span>
              <span className="ub-tile__desc">{filler(item.text, index + 2)}</span>
              <span className="ub-tile__more">Open</span>
            </span>
            <Media tone={item.tone ?? "light"} className="ub-tile__art" />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** FAQ rows: native details/summary with a 1px rule. */
export function Faq({ items, seed = 0 }: { items: { q: string; a: number }[]; seed?: number }) {
  return (
    <div className="ub-faq">
      {items.map((item, index) => (
        <details key={item.q} className="ub-faq__row">
          <summary>
            <span>{item.q}</span>
            <Chevron />
          </summary>
          <p>{filler(item.a, seed + index)}</p>
        </details>
      ))}
    </div>
  );
}

/** App download cards: 150px code or app tile, 24px title, caption, arrow. */
export function AppCards({ cards }: { cards: { title: string; caption?: string; tile?: boolean }[] }) {
  return (
    <div className="ub-apps">
      {cards.map((card) => (
        <a key={card.title} href="#" className="ub-appcard">
          <span className={card.tile ? "ub-appcard__tile" : "ub-appcard__code"} aria-hidden="true" data-compare-mask="" />
          <span className="ub-appcard__text">
            <span className="ub-appcard__title">{card.title}</span>
            {card.caption ? <span className="ub-appcard__caption">{card.caption}</span> : null}
          </span>
          <Arrow />
        </a>
      ))}
    </div>
  );
}

/** Counter plus round previous/next buttons; moves a track by one card per step. */
export function useCarousel(count: number) {
  const [index, setIndex] = useState(0);
  const controls = (
    <div className="ub-carousel-nav">
      <span aria-live="polite">
        {index + 1}/{count}
      </span>
      <button type="button" aria-label="Previous" disabled={index === 0} onClick={() => setIndex((i) => Math.max(0, i - 1))}>
        <Chevron dir="left" />
      </button>
      <button type="button" aria-label="Next" disabled={index === count - 1} onClick={() => setIndex((i) => Math.min(count - 1, i + 1))}>
        <Chevron dir="right" />
      </button>
    </div>
  );
  return { index, controls };
}

/** Three-up cards: media, 18px title, body, optional button. */
export function CardRow({ cards, square, media = 360 }: { cards: { title: string; text: number; action?: string; tone?: Tone }[]; square?: boolean; media?: number }) {
  return (
    <ul className="ub-cards" style={pad({ mh: String(square ? media : Math.round(media * 0.5625)) })}>
      {cards.map((card, index) => (
        <li key={card.title} className="ub-card">
          <Media tone={card.tone ?? (["warm", "cool", "green"] as const)[index % 3]} className="ub-card__media" />
          <h3 className="ub-label ub-card__title">{card.title}</h3>
          <p className="ub-body ub-card__text">{filler(card.text, index + 5)}</p>
          {card.action ? (
            <Button className="ub-card__btn">{card.action}</Button>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

/** Underlined tab row; arrow keys move between tabs. Content switching is left to the caller. */
export function Tabs({ labels, active, onChange, label }: { labels: string[]; active: number; onChange: (index: number) => void; label: string }) {
  return (
    <div className="ub-tabs" role="tablist" aria-label={label}>
      {labels.map((text, index) => (
        <button
          key={text}
          type="button"
          role="tab"
          aria-selected={index === active}
          tabIndex={index === active ? 0 : -1}
          onClick={() => onChange(index)}
          onKeyDown={(event) => {
            if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
            const next = (index + (event.key === "ArrowRight" ? 1 : labels.length - 1)) % labels.length;
            onChange(next);
            (event.currentTarget.parentElement?.children[next] as HTMLElement | undefined)?.focus();
          }}
        >
          {text}
        </button>
      ))}
    </div>
  );
}

export type Col = { title: string; text: number; link?: string };

/** Icon, 18px title, body and optional link, three per row from 1136px. */
export function IconCols({ cols, big, seed }: { cols: Col[]; big?: boolean; seed: number }) {
  return (
    <ul className="ub-icols" data-big={big ? "" : undefined}>
      {cols.map((col, index) => (
        <li key={col.title}>
          <span className="ub-icols__icon" aria-hidden="true" data-compare-mask="" />
          <h3 className="ub-label">{col.title}</h3>
          <p className="ub-body">{filler(col.text, seed + index)}</p>
          {col.link ? <TextLink className="ub-icols__link">{col.link}</TextLink> : null}
        </li>
      ))}
    </ul>
  );
}
