"use client";

import { useSyncExternalStore, type CSSProperties, type ReactNode } from "react";

const noopSubscribe = () => () => {};

/**
 * `?brand=` swaps the product name client-side for the local pixel comparison (tools/compare.mjs).
 * Ignored on any other host, so a published screen can never be made to show a real product's name.
 */
export function useBrand(): string {
  return useSyncExternalStore(
    noopSubscribe,
    () =>
      (["localhost", "127.0.0.1"].includes(window.location.hostname)
        ? (new URLSearchParams(window.location.search).get("brand") ?? "")
        : ""
      )
        .replace(/[^\p{L}\p{N} .-]/gu, "")
        .slice(0, 32) || "Acme",
    () => "Acme",
  );
}

/** Our own mark: a disc with a notch. Not the original logo. */
export function Mark({ className, size = 21 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 21 18" width={size} height={(size * 18) / 21} className={className} aria-hidden="true">
      <path fill="currentColor" d="M10.5 0a9 9 0 1 1 0 18a9 9 0 1 1 0-18Zm0 5a4 4 0 0 0-4 4h8a4 4 0 0 0-4-4Z" />
    </svg>
  );
}

type IconName =
  | "chevron-down"
  | "chevron-right"
  | "chevron-left"
  | "arrow-right"
  | "arrow-up-right"
  | "check"
  | "search"
  | "copy"
  | "menu"
  | "close"
  | "plus"
  | "info"
  | "filter"
  | "rss";

const paths: Record<IconName, ReactNode> = {
  "chevron-down": <path d="M4 6l4 4 4-4" />,
  "chevron-right": <path d="M6 4l4 4-4 4" />,
  "chevron-left": <path d="M10 4L6 8l4 4" />,
  "arrow-right": <path d="M3 8h10M9 4l4 4-4 4" />,
  "arrow-up-right": <path d="M5 11l6-6M6 5h5v5" />,
  check: <path d="M3.5 8.5l3 3 6-7" />,
  search: (
    <>
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5L14 14" />
    </>
  ),
  copy: (
    <>
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
      <path d="M10.5 3.5v-1h-8v8h1" />
    </>
  ),
  menu: <path d="M2 5.5h12M2 10.5h12" />,
  close: <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />,
  plus: <path d="M8 3v10M3 8h10" />,
  info: (
    <>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 7.5v3.5M8 5v.5" />
    </>
  ),
  filter: <path d="M2.5 3.5h11l-4.25 5v4l-2.5 1v-5z" />,
  rss: (
    <>
      <path d="M3 3a10 10 0 0 1 10 10M3 7a6 6 0 0 1 6 6" />
      <circle cx="3.75" cy="12.25" r="0.75" />
    </>
  ),
};

export function Icon({ name, size = 16, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

type BtnProps = {
  children: ReactNode;
  size?: 32 | 36 | 40;
  variant?: "primary" | "secondary" | "ghost";
  pill?: boolean;
  block?: boolean;
  className?: string;
  as?: "a" | "button";
  type?: "button" | "submit";
  icon?: ReactNode;
};

/** Buttons as measured: 32px (6px radius), 36px and 40px pills; label gets its own 6px side padding. */
export function Btn({ children, size = 32, variant = "secondary", pill, block, className, as = "a", type = "button", icon }: BtnProps) {
  const cls = [
    "vc-btn",
    `vc-btn--${size}`,
    `vc-btn--${variant}`,
    pill ? "vc-btn--pill" : "",
    block ? "vc-btn--block" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
  const inner = (
    <>
      {icon}
      <span className="vc-btn__label">{children}</span>
    </>
  );
  return as === "button" ? (
    <button type={type} className={cls}>
      {inner}
    </button>
  ) : (
    <a href="#" className={cls}>
      {inner}
    </a>
  );
}

/**
 * Neutral stand-in for product art, photos, logos and video, at the measured size.
 * Carries data-compare-mask so the pixel comparison leaves it out.
 */
export function Media({
  className,
  style,
  tone = "panel",
  children,
  label,
}: {
  className?: string;
  style?: CSSProperties;
  tone?: "panel" | "flat" | "dark" | "line" | "logo" | "avatar" | "photo";
  children?: ReactNode;
  label?: string;
}) {
  return (
    <div
      className={`vc-media vc-media--${tone}${className ? ` ${className}` : ""}`}
      style={style}
      data-compare-mask=""
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {children}
    </div>
  );
}

/** A row of logo stand-ins: each is a short grey bar sized like the original logo. */
export function LogoBar({ width = 96, height = 24, className }: { width?: number; height?: number; className?: string }) {
  return <Media tone="logo" className={className} style={{ width, height }} />;
}
