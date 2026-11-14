"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
import "@fontsource-variable/geist-mono";
import "./raycast.css";

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

/** Our own mark: a square with a cut corner. Not the original logo. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M4 4h11l5 5v11H4z M9 9v6h6V9z" fillRule="evenodd" />
    </svg>
  );
}

export function Logo() {
  const brand = useBrand();
  return (
    <a href="#" className="rc-logo" aria-label={`${brand} home`} data-compare-mask="">
      <Mark />
      <span>{brand}</span>
    </a>
  );
}

export function ArrowRight() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 8 8" aria-hidden="true">
      <path d="M1.5 6.5l5-5M2.5 1.5h4v4" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function DownloadGlyph() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 2.5v7M5 6.8 8 9.8l3-3M3 12.5h10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const NAV = ["Store", "Pro", "AI", "Web", "Desktop", "Teams", "Business", "Blog", "Pricing"];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rc-header" data-open={open ? "" : undefined}>
      <nav className="rc-header__bar" aria-label="Main">
        <Logo />
        <ul className="rc-header__links">
          {NAV.map((item) => (
            <li key={item}>
              <a className="rc-navlink" href="#">
                {item}
              </a>
            </li>
          ))}
        </ul>
        <div className="rc-header__end">
          <a className="rc-navlink" href="#">
            Log in
          </a>
          <a className="rc-btn rc-btn--light" href="#">
            <DownloadGlyph />
            <span>Download</span>
          </a>
        </div>
        <button
          type="button"
          className="rc-header__toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="rc-mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className="rc-header__panel" id="rc-mobile-nav" hidden={!open}>
          <ul>
            {NAV.map((item) => (
              <li key={item}>
                <a className="rc-navlink" href="#">
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <div className="rc-header__panel-end">
            <a className="rc-navlink" href="#">
              Log in
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

type FooterLink = { label: string; external?: boolean };

function useFooterColumns(brand: string): { title: string; links: FooterLink[] }[] {
  return [
    {
      title: "Product",
      links: [
        { label: "Store" },
        { label: "Pro" },
        { label: "Teams" },
        { label: "Pricing" },
        { label: "Changelog" },
        { label: "Browser Add-on" },
        { label: "Developers" },
        { label: "Web" },
        { label: "Desktop" },
        { label: `${brand} 2.0` },
        { label: "API Docs", external: true },
        { label: "Manual", external: true },
        { label: "Help Center", external: true },
        { label: `${brand} vs Others` },
        { label: "FAQ" },
      ],
    },
    {
      title: "Core Features",
      links: [
        { label: `${brand} AI` },
        { label: `${brand} Notes` },
        { label: `${brand} Focus` },
        { label: "Clipboard History" },
        { label: "Window Management" },
        { label: "Snippets" },
        { label: "File Search" },
        { label: "Quicklinks" },
        { label: "Calculator" },
        { label: "Calendar" },
        { label: "System" },
        { label: "Emoji Picker" },
      ],
    },
    {
      title: "Top Extensions",
      links: [
        { label: "Design Tools" },
        { label: "Developer Tools" },
        { label: "Pomodoro Timer" },
        { label: "Productivity" },
        { label: "Project Management" },
        { label: "Time Management" },
        { label: "Transcript" },
        { label: "Translation" },
        { label: "Work From Home" },
        { label: "AI" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Manifesto" },
        { label: "Customers" },
        { label: "Careers" },
        { label: "Terms of Service" },
        { label: "Privacy Policy" },
        { label: "Acceptable Use Policy" },
        { label: "DPA" },
        { label: "Trust Center", external: true },
        { label: "Press Kit" },
        { label: "Contact" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "Community Stories" },
        { label: "Ambassadors" },
        { label: "Forum" },
        { label: "Microblog", external: true },
        { label: "Source", external: true },
        { label: "Gallery", external: true },
      ],
    },
    {
      title: `By ${brand}`,
      links: [
        { label: "Keyboard" },
        { label: "Frame", external: true },
        { label: "Explore Snippets", external: true },
        { label: "Explore Quicklinks", external: true },
        { label: "Prompts", external: true },
        { label: "Chat Presets", external: true },
        { label: "shots.io", external: true },
        { label: "Icon Maker", external: true },
        { label: "Merch", external: true },
        { label: "Wallpapers" },
      ],
    },
  ];
}

export function Footer() {
  const brand = useBrand();
  const columns = useFooterColumns(brand);
  return (
    <div className="rc-footer">
      <div className="rc-footer__art" data-compare-mask="" aria-hidden="true" />
      <div className="rc-footer__content">
        <div className="rc-footer__links">
          {columns.map((column) => (
            <div className="rc-footer__group" key={column.title}>
              <h2 className="rc-footer__title">{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a className="rc-footer__link" href="#">
                      {link.label}
                      {link.external ? <ArrowUpRight /> : null}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="rc-footer__newsletter">
          <div className="rc-footer__newsletter-text">
            <h2>Subscribe to our newsletter.</h2>
            <p>Get product updates and news in your inbox. No spam.</p>
          </div>
          <form className="rc-footer__form" onSubmit={(event) => event.preventDefault()}>
            <input className="rc-field" type="text" name="email" placeholder="ada@example.com" aria-label="Email address" autoComplete="email" />
            <button type="submit" className="rc-btn rc-btn--soft">
              Subscribe
            </button>
            <p className="rc-footer__legal">
              By submitting your email address, you agree to receive {brand}&apos;s monthly newsletter. For more
              information, please read our <a href="#">privacy policy</a>. You can always withdraw your consent.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

/** Page shell: fixed floating header, page body, footer. */
export function Shell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={className ? `rc ${className}` : "rc"}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
