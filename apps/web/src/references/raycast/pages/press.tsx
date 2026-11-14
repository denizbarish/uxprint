"use client";

import { useState } from "react";
import { ArrowRight, DownloadGlyph, Shell, useBrand } from "../chrome";
import { filler } from "../filler";
import "./press.css";

const COLORS: [string, string, string][] = [
  ["Brand Red", "Primary brand color", "#FF6363"],
  ["Background", "Preferred dark background", "#151515"],
  ["Background Alt", "Alternate dark background", "#202123"],
];

/** Screenshot groups: card count, columns and image aspect ratio follow the original. */
const GROUPS: { title: string; count: number; columns: 2 | 4; ratio: string }[] = [
  { title: "Desktop (Dark Mode, Preferred)", count: 6, columns: 2, ratio: "592 / 444" },
  { title: "Desktop (Light Mode)", count: 6, columns: 2, ratio: "592 / 444" },
  { title: "Windows (Dark Mode, Preferred)", count: 6, columns: 2, ratio: "592 / 444" },
  { title: "Windows (Light Mode)", count: 6, columns: 2, ratio: "592 / 444" },
  { title: "Phone (Stylized)", count: 2, columns: 2, ratio: "592 / 333" },
  { title: "Phone (Product Shots)", count: 4, columns: 2, ratio: "592 / 395" },
  { title: "Phone (App Screenshots)", count: 8, columns: 4, ratio: "287 / 664" },
];

const COVERAGE = [
  ["Daily Tech", "A powerful desktop launcher comes to phones, sort of"],
  ["Mac Weekly", "The launcher ships a phone app, its first expansion beyond the desktop"],
  ["Gadget Post", "The phone app is here"],
  ["The Morning Ledger", "The productivity tools we are using"],
  ["Platform Notes", "Three apps that made me more productive this year"],
  ["Platform Notes", "How to use future AI interfaces today"],
  ["Daily Tech", "A new Pro subscription adds AI and syncing features"],
  ["App Stories", "A Pro subscription with new AI, sync and themes"],
  ["Wired Up", "The launcher app every desktop wishes it shipped with"],
  ["App Stories", "Selects of the year: recognizing the best apps"],
  ["Daily Tech", "How to use the launcher and how it compares to the built-in search"],
];

function SectionHead({ title, sub }: { title: string; sub: string }) {
  return (
    <header className="rc-press__head">
      <h2>{title}</h2>
      <p>{sub}</p>
    </header>
  );
}

function ColorSwatch({ name, note, hex }: { name: string; note: string; hex: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="rc-press__color"
      onClick={() => {
        void navigator.clipboard?.writeText(hex);
        setCopied(true);
      }}
      onBlur={() => setCopied(false)}
    >
      <span className="rc-press__swatch" style={{ background: hex }} />
      <span className="rc-press__color-text">
        <strong>{name}</strong>
        <span>{note}</span>
      </span>
      <span className="rc-press__hex" aria-live="polite">
        {copied ? "Copied" : hex}
        <svg viewBox="0 0 13 13" aria-hidden="true">
          <rect x="4" y="4" width="7.5" height="7.5" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M9 2.5V2a1 1 0 0 0-1-1H2.5a1 1 0 0 0-1 1v5.5a1 1 0 0 0 1 1H3" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </span>
    </button>
  );
}

function AssetBlock({ title, text, items, icon }: { title: string; text: string; items: [string, boolean][]; icon?: boolean }) {
  return (
    <div className="rc-press__block">
      <h3>{title}</h3>
      <p>{text}</p>
      <div className="rc-press__assets">
        {items.map(([label, light]) => (
          <div key={label} className="rc-press__asset">
            <div className={`rc-press__preview${light ? " is-light" : ""}${icon ? " is-icon" : ""}`}>
              <span className="rc-press__mark" data-compare-mask="" />
            </div>
            <div className="rc-press__asset-foot">
              <span>{label}</span>
              <a href="#" download>
                <DownloadGlyph /> SVG
              </a>
              <a href="#" download>
                <DownloadGlyph /> PNG
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Media kit template (measured on /press; /wallpapers uses the same download grid). */
export function PressScreen() {
  const brand = useBrand();
  return (
    <Shell className="rc-press">
      <div className="rc-press__art rc-media rc-media--glow" data-compare-mask="" aria-hidden="true" />
      <section className="rc-press__hero">
        <h1>Press &amp; Media Kit</h1>
        <p>Everything you need to write about {brand}: brand assets, product screenshots, founder photos and recent coverage.</p>
        <div className="rc-press__actions">
          <a href="#" className="rc-btn rc-btn--light" download>
            <DownloadGlyph />
            Download Brand Assets
          </a>
          <a href="#" className="rc-press__link">
            Visit the website <ArrowRight />
          </a>
        </div>
      </section>

      <section className="rc-press__section rc-press__section--narrow">
        <SectionHead title={`About ${brand}`} sub="The company in a paragraph." />
        <p className="rc-press__about">{filler(480, 2)}</p>
      </section>

      <section className="rc-press__section">
        <SectionHead title="Brand Assets" sub="Logos, app icons, and colors. Dark backgrounds are preferred." />
        <div className="rc-press__colors">
          {COLORS.map(([name, note, hex]) => (
            <ColorSwatch key={name} name={name} note={note} hex={hex} />
          ))}
        </div>
        <AssetBlock title="Logo" text={filler(235, 4)} items={[["Logo (dark)", false], ["Logo (light)", true]]} />
        <AssetBlock title="Wordmark" text={filler(235, 5)} items={[["Wordmark (dark)", false], ["Wordmark (light)", true]]} />
        <AssetBlock title="App Icon" text={filler(120, 6)} items={[["App Icon (dark)", false], ["App Icon (light)", false]]} icon />
      </section>

      <section className="rc-press__section">
        <SectionHead title="Screenshots" sub="High-resolution product shots across desktop, Windows, and phones." />
        {GROUPS.map((group, groupIndex) => (
          <div key={group.title} className="rc-press__group">
            <h3>{group.title}</h3>
            <div className={`rc-press__shots rc-press__shots--${group.columns}`}>
              {Array.from({ length: group.count }, (_, index) => (
                <figure key={index} className="rc-press__shot">
                  <span className="rc-press__image rc-media" data-compare-mask="" style={{ aspectRatio: group.ratio }} />
                  <a href="#" className="rc-press__download" download>
                    <DownloadGlyph /> Download
                  </a>
                  {group.columns === 2 ? <figcaption>{filler(38, groupIndex * 10 + index)}</figcaption> : null}
                </figure>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="rc-press__section rc-press__section--narrow">
        <SectionHead title="Co-Founders" sub="Left: Chief Executive Officer, Right: Chief Technology Officer" />
        <figure className="rc-press__shot rc-press__founders">
          <span className="rc-press__image rc-media" data-compare-mask="" style={{ aspectRatio: "1017 / 678" }} />
          <a href="#" className="rc-press__download" download>
            <DownloadGlyph /> Download
          </a>
        </figure>
      </section>

      <section className="rc-press__section">
        <SectionHead title="Coverage" sub={`Selected press and media featuring ${brand}.`} />
        <ul className="rc-press__coverage">
          {COVERAGE.map(([outlet, title]) => (
            <li key={title}>
              <a href="#">
                <span className="rc-press__outlet">{outlet}</span>
                <span className="rc-press__headline">{title}</span>
                <ArrowRight />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="rc-press__cta">
        <div className="rc-press__card">
          <h2>Need something else?</h2>
          <p>Download the full brand-asset bundle, including logos, app icons, and screenshots, or get in touch with our team for anything else.</p>
          <div className="rc-press__actions">
            <a href="#" className="rc-btn rc-btn--light" download>
              <DownloadGlyph />
              Download Brand Assets
            </a>
            <a href="#" className="rc-press__link">
              Contact Us <ArrowRight />
            </a>
          </div>
        </div>
      </section>
    </Shell>
  );
}
