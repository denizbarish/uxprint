"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import "@fontsource-variable/inter";
import "./uber.css";

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

export function Wordmark({ className, suffix }: { className?: string; suffix?: string }) {
  const brand = useBrand();
  return (
    <a href="#" className={`ub-wordmark${className ? ` ${className}` : ""}`} aria-label={`${brand} home`} data-compare-mask="">
      {brand}
      {suffix ? ` ${suffix}` : null}
    </a>
  );
}

/* ---------- icons (our own simple geometry) ---------- */

export function Chevron({ dir = "down" }: { dir?: "down" | "right" | "left" | "up" }) {
  const rotate = { down: 0, right: -90, left: 90, up: 180 }[dir];
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}>
      <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function Pin() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 1.5a5 5 0 0 0-5 5c0 3.5 5 8 5 8s5-4.5 5-8a5 5 0 0 0-5-5zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="currentColor" />
    </svg>
  );
}

function Globe() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 5.5l10 5M3 10.5l10-5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Burger() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2 5.5h12M2 10.5h12" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function Cross() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

/* ---------- header ---------- */

type NavItem = { label: string; items?: string[]; chevronAt?: number };

const MAIN_NAV: NavItem[] = [
  { label: "Trips" },
  { label: "Earn" },
  { label: "Places" },
  { label: "Partners" },
  { label: "Acme Food" },
  { label: "Story", chevronAt: 4, items: ["Who we are", "What we offer", "How it all runs", "Our footprint", "Discover", "Press room", "For shareholders", "Self-driving", "Journal", "Jobs"] },
];

/** Shorter nav still served on the index pages (documents, city list). */
const LEGACY_NAV: NavItem[] = [
  { label: "Trips" },
  { label: "Earn" },
  { label: "Teams" },
  { label: "Acme Food" },
  { label: "Story", items: ["Who we are", "What we offer", "Press room", "Journal", "Jobs"] },
];

const BLOG_NAV: NavItem[] = [{ label: "Browse", items: ["Riders", "Drivers", "Couriers", "Engineering", "Teams", "Cities"] }];

const TEAMS_NAV: NavItem[] = [
  { label: "Summary", items: ["How it works", "Pricing plans", "Integrations", "Security"] },
  { label: "Offerings", items: ["Work travel", "Meal plans", "Hosted rides", "Parcel drops", "Commute plans"] },
  { label: "Plans" },
  { label: "Client assistance", items: ["Help centre", "Contact sales", "Status"] },
  { label: "Materials", items: ["Guides", "Webinars", "Case notes", "Blog"] },
];

/** Closes on Escape and on a click outside `ref`: a document listener, so it lives in an effect. */
function useDismiss(open: boolean, ref: React.RefObject<HTMLElement | null>, close: (refocus: boolean) => void) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    const onPointer = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) close(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, ref, close]);
}

function Dropdown({ label, items, chevronAt = -1 }: { label: string; items: string[]; chevronAt?: number }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const id = useId();
  useDismiss(open, root, (refocus) => {
    setOpen(false);
    if (refocus) button.current?.focus();
  });
  return (
    <div className="ub-menu" ref={root} data-open={open ? "" : undefined}>
      <button
        ref={button}
        type="button"
        className="ub-chip"
        data-kind="menu"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
            requestAnimationFrame(() => root.current?.querySelector<HTMLAnchorElement>(".ub-menu__item")?.focus());
          }
        }}
      >
        {label}
        <Chevron />
      </button>
      <ul className="ub-menu__panel" id={id}>
        {items.map((item, index) => (
          <li key={item}>
            <a className="ub-menu__item" href="#" tabIndex={open ? 0 : -1}>
              {item}
              {index === chevronAt ? <Chevron dir="right" /> : null}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobilePanel({ id, onClose, nav }: { id: string; onClose: () => void; nav: NavItem[] }) {
  const [openIndex, setOpenIndex] = useState(-1);
  const panel = useRef<HTMLDivElement>(null);
  const subId = useId();
  useEffect(() => {
    // Move focus into the panel when it opens (DOM focus is an external system).
    panel.current?.querySelector<HTMLElement>("a, button")?.focus();
  }, []);
  return (
    <div
      className="ub-mpanel"
      id={id}
      ref={panel}
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
    >
      <ul>
        {nav.map((item, index) =>
          item.items ? (
            <li key={item.label}>
              <button type="button" className="ub-mpanel__link" aria-expanded={openIndex === index} aria-controls={`${subId}-${index}`} onClick={() => setOpenIndex((v) => (v === index ? -1 : index))}>
                {item.label}
                <Chevron />
              </button>
              <ul className="ub-mpanel__sub" id={`${subId}-${index}`} hidden={openIndex !== index}>
                {item.items.map((sub) => (
                  <li key={sub}>
                    <a href="#">{sub}</a>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li key={item.label}>
              <a className="ub-mpanel__link" href="#">
                {item.label}
              </a>
            </li>
          ),
        )}
        <li>
          <a className="ub-mpanel__link" href="#">
            Care
          </a>
        </li>
      </ul>
      <button type="button" className="ub-chip ub-mpanel__lang">
        <Globe />
        EN
      </button>
    </div>
  );
}

export type Variant = "main" | "teams" | "blog" | "legacy";

export function Header({ variant = "main" }: { variant?: Variant }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const id = useId();
  const nav = variant === "teams" ? TEAMS_NAV : variant === "blog" ? BLOG_NAV : variant === "legacy" ? LEGACY_NAV : MAIN_NAV;
  const close = () => {
    setOpen(false);
    toggle.current?.focus();
  };
  return (
    <header className="ub-header" data-variant={variant}>
      <nav className="ub-header__bar" aria-label="Main">
        {variant === "teams" ? <TeamsMark /> : <Wordmark suffix={variant === "blog" ? "Journal" : undefined} />}
        <ul className="ub-header__nav">
          {nav.map((item) => (
            <li key={item.label}>
              {item.items ? (
                <Dropdown label={item.label} items={item.items} chevronAt={item.chevronAt} />
              ) : (
                <a className="ub-chip" href="#">
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
        <div className="ub-header__end">
          <button type="button" className="ub-chip ub-header__lang">
            <Globe />
            EN
          </button>
          <a className="ub-chip ub-header__help" href="#">
            {variant === "teams" ? "Talk to us" : "Care"}
          </a>
          <a className="ub-chip" href="#">
            Log in
          </a>
          <a className="ub-chip" data-kind="white" href="#">
            {variant === "teams" ? "Get going" : "Sign up"}
          </a>
          <button
            ref={toggle}
            type="button"
            className="ub-chip ub-header__toggle"
            data-kind="round"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={id}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <Cross /> : <Burger />}
          </button>
        </div>
      </nav>
      {open ? <MobilePanel id={id} onClose={close} nav={nav} /> : null}
    </header>
  );
}

/** Two-line sub-brand mark used by the teams header and footer. */
export function TeamsMark() {
  const brand = useBrand();
  return (
    <a href="#" className="ub-teamsmark" aria-label={`${brand} for Teams home`} data-compare-mask="">
      <span>{brand}</span>
      <span>for Teams</span>
    </a>
  );
}

export function SubNav({ title, links }: { title: string; links: string[] }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const id = useId();
  useDismiss(open, root, () => setOpen(false));
  return (
    <div className="ub-subnav" ref={root}>
      <nav className="ub-subnav__bar" aria-label={title}>
        <button type="button" className="ub-subnav__title" aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)}>
          {title}
          <Chevron />
        </button>
        <ul className="ub-subnav__links">
          {links.map((link) => (
            <li key={link}>
              <a href="#">{link}</a>
            </li>
          ))}
        </ul>
      </nav>
      <ul className="ub-subnav__drop" id={id} hidden={!open}>
        {links.map((link) => (
          <li key={link}>
            <a href="#">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- footer ---------- */

const MAIN_FOOTER: FooterColumn[] = [
  { title: "Company", links: ["Our story", "What we do", "Press room", "Shareholders", "Journal", "Open roles", "Acme Plus"] },
  { title: "Services", links: ["Trips", "Driving", "Couriers", "Food", "Acme for Teams", "Acme Cargo", "Gift codes", "Acme Clinics"] },
  { title: "Shared responsibility", links: ["Safety", "Footprint"] },
  { title: "Getting around", links: ["Book ahead", "Terminals", "Stays", "Places"] },
];

function Social({ shape }: { shape: number }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      {shape === 0 ? <rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor" /> : null}
      {shape === 1 ? <path d="M2 4h12v8H2z M6.5 6v4l3.5-2z" fill="currentColor" fillRule="evenodd" /> : null}
      {shape === 2 ? <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.75" /> : null}
      {shape === 3 ? <path d="M3 8h10M8 3v10" stroke="currentColor" strokeWidth="1.75" /> : null}
    </svg>
  );
}

type FooterColumn = { title: string; links: string[] };

const TEAMS_FOOTER: FooterColumn[] = [
  { title: "See more", links: ["Our story", "Press room", "Journal", "Open roles"] },
  { title: "Services", links: ["Teams for food", "Acme for Teams", "Acme Cargo", "Acme Clinics"] },
  { title: "Getting around", links: ["Book ahead", "Terminals", "Places"] },
];

export function Footer({ variant = "main" }: { variant?: Variant }) {
  const columns = variant === "teams" ? TEAMS_FOOTER : MAIN_FOOTER;
  return (
    <footer className="ub-footer">
      <div className="ub-wrap">
        <div className="ub-footer__mark">{variant === "teams" ? <span className="ub-wordmark">Acme for Teams</span> : <Wordmark />}</div>
        <a className="ub-footer__help" href="#">
          Visit the care desk
        </a>
        <div className="ub-footer__cols" data-count={columns.length}>
          {columns.map((column) => (
            <div className="ub-footer__col" key={column.title}>
              <h2>{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="ub-footer__row">
          <ul className="ub-footer__social" aria-label="Social">
            {["Network", "Video", "Photos", "Posts"].map((label, index) => (
              <li key={label}>
                <a href="#" aria-label={label}>
                  <Social shape={index} />
                </a>
              </li>
            ))}
          </ul>
          <div className="ub-footer__prefs">
            <button type="button" className="ub-chip">
              <Globe />
              English
            </button>
            <button type="button" className="ub-chip">
              <Pin />
              Hometown
            </button>
          </div>
        </div>
        <div className="ub-footer__stores">
          <a className="ub-store" href="#" aria-label="Get the app for tablets" data-compare-mask="">
            <i />
            <span>
              GET IT FOR<b>Tablets</b>
            </span>
          </a>
          <a className="ub-store" href="#" aria-label="Get the app for phones" data-compare-mask="">
            <i />
            <span>
              Get it for your<b>Phone</b>
            </span>
          </a>
        </div>
        <div className="ub-footer__legal">
          <p>© 2026 Acme Mobility Inc.</p>
          <ul>
            <li>
              <a href="#">Privacy</a>
            </li>
            <li>
              <a href="#">Access needs</a>
            </li>
            <li>
              <a href="#">Rules</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export function Shell({ children, theme = "light", subnav, variant = "main" }: { children: ReactNode; theme?: "light" | "dark"; subnav?: ReactNode; variant?: Variant }) {
  return (
    <div className="uber-ref" data-theme={theme}>
      <Header variant={variant} />
      {subnav}
      <main>{children}</main>
      <Footer variant={variant} />
    </div>
  );
}
