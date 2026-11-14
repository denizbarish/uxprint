"use client";

import type { CSSProperties, ReactNode } from "react";
import { Chevron } from "./chrome";
import "./parts.css";

/** Neutral stand-in for a product photo, video or illustration; left out of the pixel comparison. */
export function Media({ className = "", dark = false, style }: { className?: string; dark?: boolean; style?: CSSProperties }) {
  return <div className={`ap-media${dark ? " ap-media--dark" : ""} ${className}`} style={style} data-compare-mask="" aria-hidden="true" />;
}

export function Ctas({ primary = "Learn more", secondary, small = false }: { primary?: string; secondary?: string; small?: boolean }) {
  const size = small ? " ap-btn--sm" : "";
  return (
    <div className="ap-ctas">
      <a href="#" className={`ap-btn ap-btn--primary${size}`}>
        {primary}
      </a>
      {secondary ? (
        <a href="#" className={`ap-btn ap-btn--secondary${size}`}>
          {secondary}
        </a>
      ) : null}
    </div>
  );
}

export function More({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <a href="#" className={`ap-more ${className}`}>
      {children}
      <Chevron />
    </a>
  );
}

/** Centred headline + tagline + two pill buttons; the copy block of every promo tile. */
export function TileCopy({
  title,
  sub,
  primary,
  secondary,
  level = "h2",
}: {
  title: string;
  sub: string;
  primary?: string;
  secondary?: string;
  level?: "h2" | "h3";
}) {
  const Heading = level;
  return (
    <div className="ap-tile__copy">
      <Heading className="ap-tile__title">{title}</Heading>
      <p className="ap-tile__sub">{sub}</p>
      <Ctas primary={primary} secondary={secondary} small={level === "h3"} />
    </div>
  );
}

/** Section headline used across marketing pages: 48px/600 on desktop, 32px on phones. */
export function SectionHead({ children, more, className = "" }: { children: ReactNode; more?: string; className?: string }) {
  return (
    <div className={`ap-shead ${className}`}>
      <h2 className="ap-shead__title">{children}</h2>
      {more ? <More className="ap-shead__more">{more}</More> : null}
    </div>
  );
}

/** Gallery paddle buttons (previous / next) under horizontally scrolling rows. */
export function Paddles({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`ap-paddles${dark ? " ap-paddles--dark" : ""}`}>
      <button type="button" aria-label="Previous">
        <Chevron dir="left" />
      </button>
      <button type="button" aria-label="Next">
        <Chevron />
      </button>
    </div>
  );
}

/** Dot pagination with a play/pause button, as under autoplaying galleries. */
export function Dots({ count, active = 0 }: { count: number; active?: number }) {
  return (
    <div className="ap-dots">
      <ul>
        {Array.from({ length: count }, (_, index) => (
          <li key={index}>
            <a href="#" aria-label={`Item ${index + 1}`} aria-current={index === active ? "true" : undefined} />
          </li>
        ))}
      </ul>
    </div>
  );
}
