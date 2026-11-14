"use client";

import { useId, useRef, useState, useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";
import { SUBJECTS, SWATCHES, phrase } from "./filler";
import "./duolingo.css";
import "./chrome.css";

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
        .slice(0, 32)
        .toLowerCase() || "acme",
    () => "acme",
  );
}

function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

/** True once the page has scrolled past `offset` pixels. */
export function useScrolledPast(offset: number): boolean {
  return useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > offset,
    () => false,
  );
}

/** Our own mark: a rounded leaf. Not the original mascot or logo. */
export function Mark() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <path fill="currentColor" d="M20 4c9 0 16 6 16 15 0 10-7 17-16 17S4 29 4 19C4 10 11 4 20 4Z" />
      <circle cx="14" cy="18" r="4" fill="#fff" />
      <circle cx="26" cy="18" r="4" fill="#fff" />
    </svg>
  );
}

export function Logo({ className = "", mark = true }: { className?: string; mark?: boolean }) {
  const brand = useBrand();
  return (
    <a href="#" className={`dl-logo ${className}`} aria-label={`${brand} home`} data-compare-mask="">
      {mark ? <Mark /> : null}
      <span>{brand}</span>
    </a>
  );
}

type ButtonProps = {
  children: ReactNode;
  variant?: "green" | "blue" | "outline" | "white" | "thin";
  className?: string;
  href?: string;
};

/** The pressable button. Links render as `<a>`, actions as `<button type="button">`. */
export function Btn({ children, variant = "green", className = "", href }: ButtonProps) {
  const cls = `dl-btn ${variant === "green" ? "" : `dl-btn--${variant}`} ${className}`;
  return href ? (
    <a href={href} className={cls}>
      {children}
    </a>
  ) : (
    <button type="button" className={cls}>
      {children}
    </button>
  );
}

/** Neutral stand-in for an illustration or product shot, same box as the original. */
export function Art({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return <span className={`dl-art ${dark ? "dl-art--dark" : ""} ${className}`} aria-hidden="true" data-compare-mask="" />;
}

/** Two-tone stripe in place of a flag or course icon. */
export function Flag({ index, className = "" }: { index: number; className?: string }) {
  const [a, b] = SWATCHES[index % SWATCHES.length] ?? ["#e5e5e5", "#fff"];
  return (
    <span
      className={`dl-flag ${className}`}
      style={{ background: `linear-gradient(180deg, ${a} 0 34%, ${b} 34% 66%, ${a} 66%)` }}
      aria-hidden="true"
      data-compare-mask=""
    />
  );
}

/** Invented locale names, so the language lists keep their rhythm without real labels. */
export const LOCALES = [
  "Aurelan", "Bresko", "Calindi", "Dovrani", "Elskar", "Fennor", "Galdic", "Hollish", "Istrai", "Jorvan",
  "Kelani", "Lumiro", "Marrac", "Nevren", "Orlesk", "Pavani", "Quendi", "Rosvar", "Selkin", "Tarvi",
  "Ulmar", "Valdic", "Wenlo", "Xanti", "Yselt", "Zorvan", "Amberic", "Borlish", "Cendari", "Dumaric",
  "Estvan", "Folkin", "Grenvar", "Haldic", "Irvani", "Jasko", "Kirvan",
];

/**
 * "Site language" trigger with a two-column popover. Opens on hover for a pointer, on click, and from
 * the keyboard (Enter, Space, ArrowDown); Escape closes and returns focus to the trigger.
 */
export function LangMenu({ tone = "grey", className = "" }: { tone?: "grey" | "white" | "muted"; className?: string }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const id = useId();

  const focusItem = (index: number) => {
    const items = list.current?.querySelectorAll<HTMLAnchorElement>("a");
    if (!items?.length) return;
    items[(index + items.length) % items.length]?.focus();
  };

  const onTriggerKey = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => focusItem(0));
    }
  };

  const onListKey = (event: KeyboardEvent) => {
    const items = [...(list.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [])];
    const current = items.indexOf(document.activeElement as HTMLAnchorElement);
    if (event.key === "Escape") {
      setOpen(false);
      trigger.current?.focus();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      focusItem(current + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      focusItem(current - 1);
    }
  };

  return (
    <div
      className={`dl-lang dl-lang--${tone} ${className}`}
      data-open={open || undefined}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="dl-lang__trigger"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(true)}
        onKeyDown={onTriggerKey}
      >
        <span>Site language: {LOCALES[5]}</span>
        <svg viewBox="0 0 12 8" aria-hidden="true">
          <path d="M1 1.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="dl-lang__pop" id={id} hidden={!open}>
        <ul ref={list} className="dl-lang__list" onKeyDown={onListKey}>
          {LOCALES.slice(0, 34).map((name, index) => (
            <li key={name}>
              <a href="#" onClick={() => setOpen(false)}>
                <Flag index={index} className="dl-lang__flag" />
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * White top bar of the home and course pages: fixed, 70px plus a 2px rule that fades in once the page
 * scrolls. Past the hero the language picker gives way to a compact primary button.
 */
export function TopBar({ cta = false }: { cta?: boolean }) {
  const scrolled = useScrolledPast(4);
  const pastHero = useScrolledPast(560);
  return (
    <div className="dl-topbar" data-scrolled={scrolled || undefined}>
      <nav className="dl-topbar__nav" aria-label="Main">
        <Logo className="dl-topbar__logo" />
        <div className="dl-topbar__end">
          {cta && pastHero ? (
            <Btn href="#" className="dl-topbar__cta dl-btn--sm">
              Start now
            </Btn>
          ) : (
            <LangMenu />
          )}
        </div>
      </nav>
    </div>
  );
}

/** Horizontal course strip with paging arrows (transform 0.5s ease-in-out, measured). */
export function CourseStrip({ dark = false, count = 41 }: { dark?: boolean; count?: number }) {
  const [page, setPage] = useState(0);
  const pages = Math.ceil(count / 8);
  return (
    <div className={`dl-strip ${dark ? "dl-strip--dark" : ""}`}>
      <nav className="dl-strip__nav" aria-label="Courses">
        <button type="button" className="dl-strip__arrow" aria-label="Previous courses" disabled={page === 0} onClick={() => setPage((value) => Math.max(0, value - 1))}>
          <svg viewBox="0 0 10 16" aria-hidden="true">
            <path d="M8 2L2 8l6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="dl-strip__viewport">
          <ul className="dl-strip__list" style={{ transform: `translateX(${-page * 100}%)` }}>
            {SUBJECTS.slice(0, count).map((name, index) => (
              <li key={name}>
                <a href="#" className="dl-strip__item" tabIndex={Math.floor(index / 8) === page ? 0 : -1}>
                  <Flag index={index} />
                  <span>{name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <button type="button" className="dl-strip__arrow" aria-label="Next courses" disabled={page >= pages - 1} onClick={() => setPage((value) => Math.min(pages - 1, value + 1))}>
          <svg viewBox="0 0 10 16" aria-hidden="true">
            <path d="M2 2l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </nav>
    </div>
  );
}

const FOOTER_COLUMNS: { title: number; links: number[] }[][] = [
  [{ title: 8, links: [7, 7, 8, 8, 17, 8, 7, 5, 5, 9, 10] }],
  [{ title: 8, links: [8, 20, 21, 7, 21, 14, 19, 12] }],
  [{ title: 4, links: [20, 16] }],
  [{ title: 16, links: [13, 12, 26, 6] }],
  [
    { title: 17, links: [20, 5, 7, 44] },
    { title: 6, links: [4, 9, 6, 7, 7, 8] },
  ],
];

/** Green site footer: five link columns (35 links) and a 37-entry site-language list. */
export function GreenFooter() {
  let seed = 0;
  return (
    <footer className="dl-gfoot">
      <div className="dl-gfoot__cols">
        {FOOTER_COLUMNS.map((groups, column) => (
          <div key={column} className="dl-gfoot__col">
            {groups.map((group) => {
              seed += 1;
              return (
                <div key={seed}>
                  <h2 className="dl-gfoot__head">{phrase(group.title, seed * 3)}</h2>
                  <ul className="dl-gfoot__links">
                    {group.links.map((length, index) => (
                      <li key={index}>
                        <a href="#">{phrase(length, seed * 5 + index)}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="dl-gfoot__langwrap">
        <div className="dl-gfoot__langs">
          <h2 className="dl-gfoot__lhead">Site language:</h2>
          <ul>
            {LOCALES.map((name) => (
              <li key={name}>
                <a href="#">{name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

const ROW_LINKS = [8, 5, 7, 4, 9, 4, 5, 7];

/** One row of eight uppercase links, used under the product, subscription and research pages. */
export function LinkRow({ className = "" }: { className?: string }) {
  return (
    <nav className={`dl-linkrow ${className}`} aria-label="Footer">
      {ROW_LINKS.map((length, index) => (
        <a key={index} href="#">
          {phrase(length, index * 4 + 1)}
        </a>
      ))}
    </nav>
  );
}

/**
 * Blue top bar of the catalogue and document pages. On phones the actions collapse into a menu button
 * that opens a small popover; Escape or a click outside closes it.
 */
export function BlueBar() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const id = useId();
  return (
    <header className="dl-bluebar">
      <div className="dl-bluebar__inner">
        <Logo className="dl-bluebar__logo" mark={false} />
        <div className="dl-bluebar__end">
          <LangMenu tone="white" />
          <Btn variant="white" className="dl-btn--sm dl-btn--r16 dl-bluebar__login">
            Sign in
          </Btn>
          <Btn href="#" className="dl-btn--sm dl-btn--r16">
            Start now
          </Btn>
        </div>
        <div
          className="dl-bluebar__mobile"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
              button.current?.focus();
            }
          }}
        >
          <button
            ref={button}
            type="button"
            className="dl-bluebar__burger"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls={id}
            onClick={() => {
              setOpen((value) => !value);
              requestAnimationFrame(() => panel.current?.querySelector("a")?.focus());
            }}
          >
            <span />
            <span />
            <span />
          </button>
          <div ref={panel} id={id} className="dl-bluebar__panel" hidden={!open}>
            <a href="#">Sign in</a>
            <a href="#">Start now</a>
            <a href="#">Site language: {LOCALES[5]}</a>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Shell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`duolingo-ref ${className}`}>{children}</div>;
}
