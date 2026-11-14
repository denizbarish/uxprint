"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type ReactNode, type RefObject } from "react";
import { FLAG_COLORS, LANGUAGES } from "./filler";
import "./busuu.css";
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
        .slice(0, 32) || "Acme",
    () => "Acme",
  );
}

/** Our own mark: a rounded square with a bite out of one corner. Not the original logo. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path fill="currentColor" d="M8 3h16a5 5 0 015 5v9a12 12 0 01-12 12H8a5 5 0 01-5-5V8a5 5 0 015-5z" />
      <circle cx="21" cy="11" r="4" fill="var(--bu-logo-cut, #116eee)" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  const brand = useBrand();
  return (
    <a href="#" className={`bu-logo ${className}`} aria-label={`${brand} home`} data-compare-mask="">
      <Mark />
      <span>{brand}</span>
    </a>
  );
}

export function Flag({ index, size = 20 }: { index: number; size?: number }) {
  const [a, b] = FLAG_COLORS[index % FLAG_COLORS.length] ?? ["#ccc", "#eee"];
  return (
    <span
      className="bu-flag"
      data-compare-mask=""
      style={{ width: size, height: size, ["--flag-a" as string]: a, ["--flag-b" as string]: b }}
    />
  );
}

export function Chevron({ up = false }: { up?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className={up ? "bu-chev bu-chev--up" : "bu-chev"} aria-hidden="true">
      <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Closes a disclosure on Escape or on a pointer press outside `root`, and returns focus to the trigger.
 * Document listeners are an external subscription, so they live in an effect while the panel is open.
 */
export function useDismiss(open: boolean, close: () => void, root: RefObject<HTMLElement | null>, trigger: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      close();
      trigger.current?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (root.current && !root.current.contains(event.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close, root, trigger]);
}

/** Moves focus to the first control of a panel when it opens (DOM focus is outside React's model). */
export function useFocusFirst(open: boolean, panel: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (open) panel.current?.querySelector<HTMLElement>("a, button, select")?.focus();
  }, [open, panel]);
}

function CourseList() {
  return (
    <ul className="bu-menu__courses">
      {LANGUAGES.map((name, index) => (
        <li key={name}>
          <a href="#">
            <Flag index={index} size={16} />
            {name}
          </a>
        </li>
      ))}
    </ul>
  );
}

const SITE_LANGUAGES = [
  "English", "Dansk", "Deutsch", "Español", "Français", "Suomi", "Italiano", "Magyar",
  "Nederlands", "Norsk", "Polski", "Português", "Română", "Svenska", "Türkçe", "Čeština",
];

function SiteLanguageMenu() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const id = useId();
  useDismiss(open, () => setOpen(false), root, trigger);
  useFocusFirst(open, panel);
  return (
    <div className="bu-mh__lang" ref={root}>
      <button
        ref={trigger}
        type="button"
        className="bu-mh__round bu-mh__langbtn"
        aria-expanded={open}
        aria-controls={id}
        aria-label="Site language"
        onClick={() => setOpen((value) => !value)}
      >
        <Flag index={0} size={20} />
        <span>EN</span>
        <Chevron up={open} />
      </button>
      {open ? (
        <div className="bu-langmenu" id={id} ref={panel}>
          <p className="bu-langmenu__caption">Site language</p>
          <ul>
            {SITE_LANGUAGES.map((name, index) => (
              <li key={name}>
                <a href="#" aria-current={index === 0 ? "true" : undefined}>
                  <Flag index={index + 3} size={16} />
                  {name}
                  {index === 0 ? <span className="bu-langmenu__check" aria-hidden="true" /> : null}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function MainMenu() {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const id = useId();
  useDismiss(open, () => setOpen(false), root, trigger);
  useFocusFirst(open, panel);
  return (
    <div className="bu-mh__menu" ref={root}>
      <button
        ref={trigger}
        type="button"
        className={open ? "bu-mh__round bu-mh__burger is-open" : "bu-mh__round bu-mh__burger"}
        aria-expanded={open}
        aria-controls={id}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>
      {open ? (
        <div
          className="bu-menu"
          id={id}
          ref={panel}
          role="dialog"
          aria-label="Menu"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
              trigger.current?.focus();
            }
          }}
        >
          <div className="bu-menu__phone">
            <p className="bu-menu__caption">Site language</p>
            <button type="button" className="bu-menu__site">
              <Flag index={0} size={20} />
              English
              <Chevron />
            </button>
            <a href="#" className="bu-menu__row">
              Our method
            </a>
          </div>
          <button
            type="button"
            className="bu-menu__row bu-menu__toggle"
            aria-expanded={courses}
            onClick={() => setCourses((value) => !value)}
          >
            Courses
            <Chevron up={courses} />
          </button>
          {courses ? <CourseList /> : null}
          <a href="#" className="bu-menu__row">
            For schools
          </a>
          <a href="#" className="bu-menu__row">
            For companies
          </a>
          <div className="bu-menu__phone bu-menu__actions">
            <a href="#" className="bu-btn bu-menu__signin">
              Sign in
            </a>
            <a href="#" className="bu-btn bu-btn--mint">
              Start for free
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** Header of the marketing pages: blue bar over hero pages, transparent over the wash on legal pages. */
export function MarketingHeader({ tone, simple = false }: { tone: "blue" | "clear"; simple?: boolean }) {
  return (
    <header className={`bu-mh bu-mh--${tone}`}>
      <nav className="bu-mh__nav" aria-label="Main">
        <Logo className="bu-logo--mh" />
        <div className="bu-mh__actions">
          {simple ? null : (
            <a href="#" className="bu-btn bu-btn--navy bu-mh__desk">
            Sign in
          </a>
          )}
          <a href="#" className="bu-btn bu-btn--mint bu-mh__desk">
            Start for free
          </a>
          {simple ? null : (
            <div className="bu-mh__desk">
            <SiteLanguageMenu />
          </div>
          )}
          <MainMenu />
        </div>
      </nav>
    </header>
  );
}

/** Our phrases for the scrolling band: same word counts and lengths as the original, our own words. */
const MARQUEE: [string, string][] = [
  ["Bold", "languages"],
  ["Bold", "possibilities"],
  ["Bold", "you"],
];

export function Marquee() {
  const items = [0, 1, 2, 3].flatMap((round) => MARQUEE.map((item, index) => ({ key: `${round}-${index}`, item })));
  return (
    <section className="bu-marquee" aria-label="Tagline">
      <div className="bu-marquee__track">
        {items.map(({ key, item }) => (
          <p className="bu-marquee__item" key={key} aria-hidden={key !== "0-0" ? "true" : undefined}>
            <span className="bu-marquee__first">{item[0]}</span>
            <span>{item[1]}</span>
            <span className="bu-marquee__art bu-media" data-compare-mask="" />
          </p>
        ))}
      </div>
    </section>
  );
}

const FOOTER_COLUMNS: { title: string; links: string[]; className?: string }[] = [
  { title: "Courses online", links: LANGUAGES.map((name) => `${name} lessons`), className: "bu-mf__col--grid" },
  { title: "Explore the app", links: ["How the method works", "Membership plans", "Accounts for teams", "Redeem a gift code", "Journal"] },
  { title: "Company", links: ["Our team", "Jobs", "Media", "Work with us today"] },
  { title: "Get it", links: ["For phones", "For tablets"] },
  { title: "Help centre", links: ["Questions", "Write to us"] },
];

function Social({ index }: { index: number }) {
  const shapes = [
    <circle key="c" cx="9" cy="9" r="6" />,
    <rect key="r" x="3" y="3" width="12" height="12" rx="3" />,
    <path key="t" d="M9 3l7 12H2z" />,
    <path key="d" d="M9 2l7 7-7 7-7-7z" />,
    <path key="p" d="M3 4h12v10H3z M6 7h6v4H6z" fillRule="evenodd" />,
    <path key="h" d="M4 3h3v5h4V3h3v12h-3v-4H7v4H4z" />,
  ];
  return (
    <a href="#" className="bu-mf__social" aria-label={`Social profile ${index + 1}`}>
      <svg viewBox="0 0 18 18" aria-hidden="true" fill="currentColor">
        {shapes[index % shapes.length]}
      </svg>
    </a>
  );
}

export function StoreBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`bu-badges ${className}`}>
      <a href="#" className="bu-badge" aria-label="Get the phone app" data-compare-mask="" />
      <a href="#" className="bu-badge" aria-label="Get the tablet app" data-compare-mask="" />
    </div>
  );
}

function FooterAccordion({ title, links }: { title: string; links: string[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="bu-mf__acc">
      <button type="button" className="bu-mf__acc-head" aria-expanded={open} aria-controls={id} onClick={() => setOpen((value) => !value)}>
        <span>{title}</span>
        <Chevron up={open} />
      </button>
      {open ? (
        <ul id={id} className="bu-mf__acc-list">
          {links.map((link) => (
            <li key={link}>
              <a href="#">{link}</a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function MarketingFooter({ simple = false }: { simple?: boolean }) {
  return (
    <footer className={simple ? "bu-mf bu-mf--simple" : "bu-mf"}>
      <div className="bu-mf__main">
        <div className="bu-mf__cols">
          {FOOTER_COLUMNS.map((column) => (
            <div className={`bu-mf__col ${column.className ?? ""}`} key={column.title}>
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
        <div className="bu-mf__accs">
          {FOOTER_COLUMNS.map((column) => (
            <FooterAccordion key={column.title} title={column.title} links={column.links} />
          ))}
        </div>
        <div className="bu-mf__bottom">
          <div className="bu-mf__site">
            <p>Site language</p>
            <button type="button">
              <span>
                <Flag index={0} size={20} />
                English
              </span>
              <Chevron />
            </button>
          </div>
          <div className="bu-mf__credits">
            <span>© 2026 Acme Ltd</span>
            <span className="bu-mf__legal">
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
            </span>
          </div>
          <StoreBadges />
          <span className="bu-mf__art bu-media" data-compare-mask="" />
        </div>
      </div>
      <div className="bu-mf__socials">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <Social key={index} index={index} />
        ))}
      </div>
    </footer>
  );
}

/** Marketing page frame: header, page body, scrolling band and footer. */
export function MarketingShell({
  children,
  tone = "blue",
  simple = false,
  className = "",
}: {
  children: ReactNode;
  tone?: "blue" | "clear";
  simple?: boolean;
  className?: string;
}) {
  return (
    <div className={`busuu-ref bu-mk ${className}`}>
      <div className="bu-mk__wash" aria-hidden="true" />
      <MarketingHeader tone={tone} simple={simple} />
      <main>{children}</main>
      <Marquee />
      <MarketingFooter simple={simple} />
    </div>
  );
}

/** Older CMS frame: header with text links and small pills, light blue footer. */
const LEGACY_COLUMNS: Record<"home" | "statement", { title: string; links: string[] }[][]> = {
  home: [
    [{ title: "Courses online", links: LANGUAGES.map((name) => `${name} lessons`) }],
    [
      { title: "Explore the app", links: ["Our learning method", "Membership plans", "For companies", "Get the app", "Redeem a gift code", "Journal"] },
      { title: "Need help", links: ["Write to us", "Questions"] },
    ],
    [{ title: "Who we are", links: ["Our team", "Jobs", "Media", "Work with us", "Health update", "Supply statement"] }],
  ],
  statement: [
    [{ title: "Courses online", links: LANGUAGES.slice(0, 12).map((name) => `${name} lessons`) }],
    [
      { title: "Explore the app", links: ["Membership for everyone", "Apps for phones and tablets", "Redeem a gift code"] },
      { title: "Who we are", links: ["About the team", "Our story so far", "The journal", "Jobs", "Method explained", "Media kit", "Health", "Supply chain statement"] },
    ],
    [
      { title: "Need help", links: ["Questions", "Write to us"] },
      { title: "Partners", links: ["Work with us"] },
      { title: "Organisations", links: ["For schools", "For companies"] },
    ],
  ],
};

export function LegacyFooter({ variant }: { variant: "home" | "statement" }) {
  return (
    <footer className={`bu-lf bu-lf--${variant}`}>
      <div className="bu-lf__wrap">
        <div className="bu-lf__section bu-lf__display">
          <h2>Display language</h2>
          <select className="bu-lf__select" aria-label="Display language" defaultValue="en">
            <option value="en">English (UK)</option>
            <option value="us">English (US)</option>
            <option value="es">Español</option>
          </select>
        </div>
        <div className="bu-lf__cols">
          {LEGACY_COLUMNS[variant].map((column, index) => (
            <div className="bu-lf__col" key={index}>
              {column.map((section) => (
                <div className="bu-lf__section" key={section.title}>
                  <h2>{section.title}</h2>
                  <ul>
                    {section.links.map((link) => (
                      <li key={link}>
                        <a href="#">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="bu-lf__credits">
          <p>
            ©2026 Acme Ltd
            <span>
              <a href="#">Terms</a> <a href="#">Privacy</a>
            </span>
          </p>
          <div className="bu-lf__socials">
            {[0, 1, 2, 3, 4].map((index) => (
              <a href="#" key={index} aria-label={`Social profile ${index + 1}`}>
                <span />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export function LegacyHeader() {
  return (
    <header className="bu-lh">
      <nav className="bu-lh__nav" aria-label="Main">
        <Logo className="bu-logo--legacy" />
        <div className="bu-lh__actions">
          <a href="#" className="bu-lh__text">
            For schools
          </a>
          <a href="#" className="bu-lh__text">
            For companies
          </a>
          <a href="#" className="bu-pill bu-pill--blue">
            Sign up
          </a>
          <a href="#" className="bu-pill bu-pill--outline">
            Log in
          </a>
        </div>
      </nav>
    </header>
  );
}

/** App frame (log in, voucher, picker): 59px white bar, no footer. */
export function AppShell({ children, links = true }: { children: ReactNode; links?: boolean }) {
  return (
    <div className="busuu-ref bu-app">
      <nav className="bu-app__bar" aria-label="Main">
        <div className="bu-app__inner">
          <Logo className="bu-logo--app" />
          {links ? (
            <div className="bu-app__links">
              <a href="#" className="bu-app__text">
                For schools
              </a>
              <a href="#" className="bu-app__text">
                For companies
              </a>
              <a href="#" className="bu-app__btn bu-app__btn--solid">
                Sign up
              </a>
              <a href="#" className="bu-app__btn">
                Log in
              </a>
            </div>
          ) : null}
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
