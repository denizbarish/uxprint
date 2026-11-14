"use client";

import { useId, useRef, useState } from "react";
import { Art, LinkRow, Logo, Shell } from "../chrome";
import { filler } from "../filler";
import "./efficacy.css";

const TABS = ["Results", "Method", "Papers", "Toolkit", "Science"];

const STORIES = [70, 64, 79, 77, 86];

function Bar() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const id = useId();
  return (
    <header
      className="dl-eff__bar"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          button.current?.focus();
        }
      }}
    >
      <nav className="dl-eff__nav" aria-label="Research">
        <Logo className="dl-eff__logo" />
        <div className="dl-eff__tabs">
          {TABS.map((tab, index) => (
            <a key={tab} href="#" className="dl-eff__tab" aria-current={index === 0 ? "page" : undefined}>
              {tab}
            </a>
          ))}
        </div>
        <button
          ref={button}
          type="button"
          className="dl-eff__burger"
          aria-label="Sections"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => {
            setOpen((value) => !value);
            requestAnimationFrame(() => document.getElementById(id)?.querySelector("a")?.focus());
          }}
        >
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M6 9h20M6 16h20M6 23h20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </button>
      </nav>
      <div id={id} className="dl-eff__drawer" hidden={!open}>
        {TABS.map((tab, index) => (
          <a key={tab} href="#" aria-current={index === 0 ? "page" : undefined}>
            {tab}
          </a>
        ))}
      </div>
    </header>
  );
}

/** Research hub (measured on /efficacy): tabbed top bar, two-column intro, chart, story list. */
export function EfficacyScreen() {
  return (
    <Shell>
      <Bar />
      <main className="dl-eff__main">
        <section className="dl-eff__intro">
          <div>
            <h1 className="dl-eff__h1">acme gets results</h1>
            <p className="dl-eff__lead">
              See how our <a href="#">way of teaching</a> leads to steady progress. Look through the <a href="#">study results</a>, <a href="#">expert notes</a>, and{" "}
              <a href="#">open research calls</a>.
            </p>
          </div>
          <Art className="dl-eff__introart" />
          <div className="dl-eff__results">
            <p>
              <strong>key findings:</strong>
            </p>
            <ul>
              <li>
                {filler(30, 1)} <a href="#">four terms of classes</a> {filler(14, 2)}
              </li>
              <li>
                {filler(36, 3)} <a href="#">spoke with more ease after</a> {filler(10, 4)}
              </li>
              <li>
                <a href="#">kept older learners sharp and focused</a>
              </li>
            </ul>
          </div>
        </section>

        <section className="dl-eff__chart">
          <h2 className="dl-eff__h2">acme keeps getting better</h2>
          <p className="dl-eff__lead dl-eff__lead--center">{filler(122, 6)}</p>
          <figure className="dl-eff__figure" aria-label="Bar chart placeholder" data-compare-mask="">
            {[46, 58, 70, 64, 78, 88].map((height, index) => (
              <span key={index} style={{ height: `${height}%` }} data-alt={index % 2 || undefined} />
            ))}
          </figure>
        </section>

        <section className="dl-eff__stories">
          <h2 className="dl-eff__h2">meet people learning with acme</h2>
          <p className="dl-eff__lead dl-eff__lead--center">{filler(68, 9)}</p>
          <div className="dl-eff__list">
            {STORIES.map((length, index) => (
              <div key={index} className={`dl-eff__story ${index === 0 ? "dl-eff__story--lead" : ""}`}>
                <Art className="dl-eff__video" />
                <p>{filler(length, index + 13)}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="dl-eff__foot">
        <LinkRow className="dl-linkrow--light" />
      </footer>
    </Shell>
  );
}
