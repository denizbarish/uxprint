"use client";

import { useState } from "react";
import { DownloadGlyph, Shell, useBrand } from "../chrome";
import { Faq } from "../parts";
import "./core-feature.css";

type Tab = { title: string; text: string };

/** Large visual with three captions under it; the active caption is bright, the others dimmed. */
function Showcase({ heading, sub, tabs }: { heading: string; sub: string; tabs: Tab[] }) {
  const [active, setActive] = useState(0);
  return (
    <section className="rc-cf-section">
      <div className="rc-twotone rc-cf-center">
        <h2>{heading}</h2>
        <p>{sub}</p>
      </div>
      <div className="rc-cf-showcase">
        <div className="rc-cf-showcase__visual rc-media" data-compare-mask="" />
        <div className="rc-cf-showcase__tabs" role="tablist" aria-label={heading}>
          {tabs.map((tab, index) => (
            <button
              key={tab.title}
              type="button"
              role="tab"
              aria-selected={index === active}
              className="rc-cf-showcase__tab"
              onClick={() => setActive(index)}
            >
              <span className="rc-cf-showcase__progress" aria-hidden="true" />
              <strong>{tab.title}</strong> {tab.text}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function TwoCol({ heading, sub, inline, paragraphs, height }: { heading: string; sub: string; inline?: boolean; paragraphs: string[]; height: number }) {
  return (
    <section className="rc-cf-section">
      <div className="rc-cf-twocol" style={{ height }}>
        <div className="rc-cf-twocol__text">
          <div className={`rc-twotone${inline ? " rc-twotone--inline" : ""}`}>
            <h2>{heading}</h2>
            <p>{sub}</p>
          </div>
          {paragraphs.map((text) => (
            <p key={text} className="rc-cf-twocol__para">
              {text}
            </p>
          ))}
          <p className="rc-cf-quote">
            <span className="rc-cf-quote__avatar" data-compare-mask="" />
            <span>
              <q>Exactly what I needed.</q> <em>Riley, designer</em>
            </span>
          </p>
        </div>
        <div className="rc-cf-twocol__visual rc-media" data-compare-mask="" />
      </div>
    </section>
  );
}

export function CoreFeatureScreen() {
  const brand = useBrand();
  return (
    <Shell>
      <section className="rc-cf-hero">
        <div className="rc-cf-hero__window rc-media" data-compare-mask="" aria-hidden="true" />
        <span className="rc-cf-hero__chip">
          <span className="rc-cf-hero__chip-icon" aria-hidden="true" />
          {brand} Notes
        </span>
        <h1 className="rc-cf-hero__title">
          Quick, light and effortless
          <br /> note-taking
        </h1>
        <p className="rc-cf-hero__lead">
          Capture your thoughts from anywhere with a single hotkey. Track todos, draft ideas and keep notes in reach.
        </p>
        <div className="rc-cf-hero__actions">
          <a className="rc-btn rc-btn--light" href="#">
            <DownloadGlyph />
            Download
          </a>
          <button type="button" className="rc-btn rc-btn--dark">
            Watch Video
          </button>
        </div>
      </section>

      <TwoCol
        heading="Think it."
        sub="Note it."
        inline
        height={506}
        paragraphs={[
          "Never lose your flow. Capture thoughts instantly without switching context or opening another app.",
          `${brand} Notes lives a single hotkey away, ready to appear and vanish again as soon as you are done.`,
        ]}
      />

      <Showcase
        heading="Formatted thoughts."
        sub="Structure your notes with Markdown."
        tabs={[
          { title: "Meeting Notes.", text: "Write down ideas and action points while the meeting runs." },
          { title: "Daily Todos.", text: "Keep track of your daily tasks with lists and checkboxes that stay." },
          { title: "Idea scratchpad.", text: "Jot down your thoughts and ideas before they slip away for good." },
        ]}
      />

      <TwoCol
        heading="Multiple notes."
        sub="A note for every thought."
        height={538}
        paragraphs={["Create as many notes as you need. Unlimited notes on every plan, with no limits on length."]}
      />

      <Showcase
        heading="Frictionless integrations."
        sub={`Works with the ${brand} ecosystem.`}
        tabs={[
          { title: `${brand} AI.`, text: "Works with AI Commands like spelling fixes and summaries, right in place." },
          { title: "Snippets.", text: "Insert frequently used texts or dynamic data like dates." },
          { title: "Quicklinks.", text: "Open your favorite notes or quickly create new ones." },
        ]}
      />

      <section className="rc-cf-section rc-cf-export">
        <div className="rc-cf-export__content">
          <div className="rc-cf-export__formats" aria-hidden="true">
            <span>Plain Text</span>
            <span>HTML</span>
            <span>Markdown</span>
          </div>
          <div className="rc-twotone rc-cf-center">
            <h2>Bring your notes with you.</h2>
            <p>Export to anywhere.</p>
          </div>
          <p className="rc-cf-export__text">
            All your notes are stored securely in an encrypted database, and whenever you want to take them elsewhere,
            export them as plain text, HTML or Markdown.
          </p>
        </div>
      </section>

      <section className="rc-cf-section rc-cf-grid-section">
        <div className="rc-twotone rc-twotone--inline rc-cf-center">
          <h2>Everything you need</h2>
          <p>to find your flow.</p>
        </div>
        <div className="rc-cf-grid">
          {[
            ["Open from the menu bar", "See your notes with a single click, or hold a modifier to create a new one."],
            ["Grows with your thoughts", "Light and unobtrusive, the notes window resizes itself to fit what you write."],
            ["Sync notes across devices", "Reach your notes from any device with Cloud Sync."],
            ["Recover deleted notes", "Don't lose your thoughts. Restore deleted notes within 60 days of removing them."],
            ["Create Quicklinks", "Open your favorite notes instantly by assigning hotkeys."],
            ["Keyboard first", "Open, write and format your notes without touching your mouse."],
          ].map(([title, text]) => (
            <div key={title} className="rc-cf-grid__cell">
              <p className="rc-cf-grid__title">{title}</p>
              <p className="rc-cf-grid__text">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rc-cf-section">
        <Faq
          title="FAQs"
          subtitle="You've got questions. We've got answers"
          items={[
            ["How many notes can I create?", "As many as you like. Notes are unlimited on every plan."],
            [`Can I sync notes between ${brand} Notes and other apps?`, "Export to plain text, HTML or Markdown and import anywhere."],
            ["Can I recover deleted notes?", "Yes. Deleted notes stay recoverable for 60 days."],
            [`Can ${brand} Notes be used as a regular non-floating window?`, "Yes. Switch the window behavior in settings."],
            [`What's the difference between ${brand} Notes and Floating Notes?`, "Notes replaces Floating Notes and adds formatting, sync and multiple notes."],
          ]}
        />
      </section>

      <section className="rc-cf-section rc-cf-cta">
        <div className="rc-twotone rc-cf-center">
          <h2>Be more productive today and every day.</h2>
          <p>Download and use {brand} for free.</p>
        </div>
        <div className="rc-cf-cta__download">
          <a className="rc-btn rc-btn--light" href="#">
            <DownloadGlyph />
            Download for Desktop
          </a>
          <p className="rc-cf-cta__req">Desktop 15 and a recent chip required</p>
          <p className="rc-cf-cta__alt">
            <button type="button" className="rc-mono-btn">
              Install via Package Tool
            </button>
            <span aria-hidden="true">|</span>
            <button type="button" className="rc-mono-btn">
              Download V1
            </button>
          </p>
        </div>
      </section>
    </Shell>
  );
}
