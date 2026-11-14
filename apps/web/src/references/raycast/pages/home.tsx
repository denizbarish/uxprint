"use client";

import { useState, type CSSProperties } from "react";
import { ArrowRight, DownloadGlyph, Shell, useBrand } from "../chrome";
import { AiBento } from "../parts";
import "./home.css";

const TABS = ["Productivity", "Engineering", "Design", "Writing"];

const REEL = [
  ["Tracker", "Create, search and update your issues without leaving your keyboard."],
  ["Translate", "Translate any selected text into several languages at the same time."],
  ["Music", "Search for songs and podcasts, browse your library and control playback."],
  ["Browser", "Move between your open tabs or search through your browsing history."],
  ["Compress", "Shrink the selected images in your file manager in one step."],
  ["Vault", "Grab any password or credential from your team vaults in seconds."],
];

const VIDEOS = [
  "Nine hidden tricks to level up",
  "Our extension picks for UI developers",
  "Introducing focus sessions",
  "Mastering quicklinks in a week",
  "Notes is finally out",
  "We tested window layouts head to head",
];

/** Developer grid, 5 columns x 10 rows; the cells that are not listed are empty ruled spacers. */
/** `order` is the position in the single-column 390 layout; 0 hides the cell there, as on the original. */
const DEV_CELLS: { area: string; order: number; mh?: number; kind: "title" | "text" | "figure" | "link"; title?: string; body?: string; label?: string }[] = [
  { area: "1 / 2 / 2 / 3", order: 1, kind: "title", title: "Build the perfect tools." },
  { area: "1 / 3 / 3 / 5", order: 0, kind: "figure", label: "FIG_01" },
  { area: "2 / 2 / 3 / 3", order: 2, kind: "text", body: "Our extension API lets anyone with web development skills build the tools they always wanted.", label: "Read the docs" },
  { area: "4 / 2 / 5 / 4", order: 3, mh: 375, kind: "figure", label: "FIG_02" },
  { area: "4 / 4 / 5 / 5", order: 4, kind: "text", title: "Cross-platform", body: "Build your extension once and ship it to people on every desktop platform we support." },
  { area: "5 / 2 / 6 / 3", order: 5, kind: "figure", label: "FIG_03" },
  { area: "5 / 3 / 6 / 4", order: 6, kind: "text", title: "Built-in UI", body: "Our component library lets you focus on the logic while we take care of the pixels." },
  { area: "5 / 4 / 6 / 5", order: 0, kind: "figure", label: "FIG_04" },
  { area: "7 / 2 / 8 / 3", order: 0, kind: "text", title: "Batteries included", body: "A typed API, hot reloading and modern tooling make building an extension a joy." },
  { area: "7 / 3 / 8 / 5", order: 7, mh: 326, kind: "figure", label: "FIG_05" },
  { area: "8 / 2 / 9 / 4", order: 0, kind: "figure", label: "FIG_06" },
  { area: "8 / 4 / 9 / 5", order: 8, kind: "text", title: "Publish to the Store", body: "Submit your extension to the store and share it with thousands of people right away." },
  { area: "9 / 3 / 10 / 4", order: 9, kind: "link", label: "Get started" },
];

function DownloadBlock() {
  return (
    <div className="rc-home-download">
      <a className="rc-btn rc-btn--light" href="#">
        <DownloadGlyph />
        <span>Download for Desktop</span>
      </a>
      <p className="rc-home-download__req">Desktop 15 and a recent chip required</p>
      <p className="rc-home-download__alt">
        <button type="button" className="rc-mono-btn">
          Install via Package Tool
        </button>
        <span aria-hidden="true">|</span>
        <button type="button" className="rc-mono-btn">
          Download V1
        </button>
      </p>
    </div>
  );
}

function ExtensionReel() {
  const [tab, setTab] = useState(TABS[0]);
  const [offset, setOffset] = useState(0);
  const last = REEL.length - 2;
  return (
    <section className="rc-home-ext">
      <div className="rc-home-ext__head">
        <div className="rc-twotone">
          <h2>There&apos;s an extension for that.</h2>
          <p>Use your favorite tools without even opening them.</p>
        </div>
        <div className="rc-home-tabs" role="tablist" aria-label="Extension categories">
          {TABS.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={item === tab}
              className="rc-home-tabs__tab"
              onClick={() => setTab(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="rc-home-reel">
        <ul className="rc-home-reel__track" style={{ transform: `translateX(${-offset * 416}px)` }}>
          {REEL.map(([name, text]) => (
            <li key={name}>
              <a href="#" className="rc-home-card">
                <span className="rc-home-card__head">
                  <span className="rc-home-card__icon" data-compare-mask="" />
                  <span className="rc-home-card__name">{name}</span>
                  <span className="rc-home-card__go" aria-hidden="true">
                    <ArrowRight />
                  </span>
                </span>
                <span className="rc-home-card__text">{text}</span>
                <span className="rc-home-card__visual rc-media" data-compare-mask="" />
              </a>
            </li>
          ))}
          <li>
            <a href="#" className="rc-home-card rc-home-card--more">
              <span className="rc-home-card__more">Plus thousands more...</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="rc-home-ext__foot">
        <a className="rc-arrow-link" href="#">
          Browse thousands more <ArrowRight />
        </a>
        <div className="rc-home-ext__arrows">
          <button type="button" className="rc-round-btn" aria-label="Previous" disabled={offset === 0} onClick={() => setOffset((value) => Math.max(0, value - 1))}>
            <ArrowRight />
          </button>
          <button type="button" className="rc-round-btn" aria-label="Next" disabled={offset === last} onClick={() => setOffset((value) => Math.min(last, value + 1))}>
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export function HomeScreen() {
  const brand = useBrand();
  return (
    <Shell className="rc-home">
      <section className="rc-home-hero">
        <div className="rc-home-hero__art rc-media rc-media--glow" data-compare-mask="" aria-hidden="true" />
        <div className="rc-home-hero__text">
          <h1>Your shortcut to everything.</h1>
          <p>
            A set of fast everyday tools all within
            <br /> one extendable launcher. Quick, focused and dependable.
          </p>
        </div>
        <DownloadBlock />
      </section>

      <section className="rc-home-section rc-home-window">
        <div className="rc-twotone rc-home-center" style={{ width: 350 }}>
          <h2>Take shortcuts, not detours.</h2>
          <p>One interface, everything you need.</p>
        </div>
        <div className="rc-home-window__frame rc-media" data-compare-mask="" />
        <p className="rc-home-window__caption">
          <strong>Remember Everything.</strong> Stop copying the same thing twice. With the clipboard history you will
          never lose anything.
        </p>
      </section>

      <section className="rc-home-time">
        <div className="rc-home-time__text">
          <div className="rc-twotone">
            <h2>It&apos;s not about saving time.</h2>
            <p>It&apos;s about feeling like you&apos;re never wasting it.</p>
          </div>
          <a className="rc-btn rc-btn--light" href="#">
            <DownloadGlyph />
            <span>Download</span>
          </a>
        </div>
        <div className="rc-home-time__keys rc-media" data-compare-mask="" />
      </section>

      <ExtensionReel />

      <AiBento />

      <section className="rc-home-section rc-home-proof">
        <div className="rc-twotone rc-home-center" style={{ width: 400 }}>
          <h2>Built for professionals like you.</h2>
          <p>Used by seriously productive people.</p>
        </div>
        <ul className="rc-home-people">
          {[
            ["Jordan Hale", "@jordanhale", "Designer, Founder"],
            ["Morgan Reyes", "@mreyes", "CEO, Northwind"],
            ["Casey Lin", "@caseylin", "Creator, Studio"],
          ].map(([name, handle, role], index) => (
            <li key={name} className={index === 1 ? "is-active" : undefined}>
              <span className="rc-home-people__avatar" data-compare-mask="" />
              <span>
                <strong>{name}</strong> <em>{handle}</em>
                <small>{role}</small>
              </span>
            </li>
          ))}
        </ul>
        <div className="rc-home-quote">
          <dl>
            <div>
              <dt>Favorite Feature:</dt>
              <dd>
                <span className="rc-chip">AI Chat</span>
                <span>Realtime knowledge, anywhere in your system.</span>
              </dd>
            </div>
            <div>
              <dt>Top Extension:</dt>
              <dd>
                <span className="rc-chip">Docs Search</span>
                <span>I forked the docs search extension so I can paste tidy doc links into chat.</span>
              </dd>
            </div>
          </dl>
          <span className="rc-home-quote__rule" aria-hidden="true" />
          <blockquote>
            {brand} is steadily <b>turning my desktop into an AI-native operating system</b> and I&apos;m here for it.
          </blockquote>
        </div>
      </section>

      <section className="rc-home-section rc-home-dry">
        <div className="rc-twotone rc-home-center" style={{ width: 387 }}>
          <h2>Don&apos;t repeat yourself.</h2>
          <p>Automate the things you do all the time.</p>
        </div>
        <div className="rc-home-dry__grid">
          {[
            ["Snippets", "Tired of typing the same thing? Create a snippet and insert it by simply typing its keyword."],
            ["", ""],
            ["Quicklinks", "Say goodbye to open tabs. Create quicklinks to launch anything from anywhere."],
            ["Hotkeys and Aliases", "Speed up your workflow by assigning hotkeys or aliases to common commands or apps."],
          ].map(([title, text], index) => (
            <article key={index} className="rc-home-dry__cell">
              <div className="rc-home-dry__visual rc-media" data-compare-mask="" />
              {title ? (
                <>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="rc-home-section rc-home-more">
        <div className="rc-home-more__left">
          <p className="rc-home-more__sentence">
            <span className="is-head">What else can {brand} do?</span> <span className="is-on">It can take notes.</span>{" "}
            Track your flights. Convert anything. Search files. Run scripts. Manage your windows. Plan your day. Translate
            into any language. Block distractions. Find text in screenshots. Insert emoji. <a href="#">And much, much more.</a>
          </p>
          <div className="rc-home-more__card">
            <span className="rc-chip">{brand} Notes</span>
            <p>
              A quick way to capture a thought while working on something else. <a href="#">Learn more</a>
            </p>
          </div>
        </div>
        <div className="rc-home-more__right rc-media" data-compare-mask="" />
      </section>

      <section className="rc-home-social">
        <div className="rc-twotone rc-home-center" style={{ width: 486 }}>
          <h2>Stay in the loop.</h2>
          <p>Join the community and learn how other people get the most out of {brand}.</p>
        </div>
        <div className="rc-home-social__cards">
          {[
            ["Forum", "37k members", "Get the inside track on new features and learn how other people use the app.", "Join"],
            ["Microblog", "98k followers", "Keep up to date with the latest releases, features and improvements.", "Follow"],
          ].map(([name, count, text, action]) => (
            <a key={name} href="#" className="rc-home-social__card">
              <span className="rc-home-social__row">
                <span className="rc-home-social__name">
                  <span className="rc-home-social__icon" data-compare-mask="" />
                  {name}
                </span>
                <span className="rc-home-social__count">{count}</span>
              </span>
              <span className="rc-home-social__text">{text}</span>
              <span className="rc-home-social__action">
                {action} <ArrowRight />
              </span>
            </a>
          ))}
        </div>
        <ul className="rc-home-videos">
          {VIDEOS.map((title) => (
            <li key={title}>
              <a href="#">
                <span className="rc-home-videos__thumb rc-media" data-compare-mask="" />
                <span className="rc-home-videos__title">{title}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="rc-home-social__caption">
          Check out our video channel to learn about features you didn&apos;t even know existed.
        </p>
        <a className="rc-arrow-link rc-home-social__watch" href="#">
          Videos <ArrowRight />
        </a>
      </section>

      <section className="rc-home-section rc-home-dev">
        <div className="rc-home-dev__grid">
          {Array.from({ length: 50 }, (_, index) => (
            <span key={`s${index}`} className="rc-home-dev__spacer" style={{ gridArea: `${Math.floor(index / 5) + 1} / ${(index % 5) + 1}` }} />
          ))}
          {DEV_CELLS.map((cell) => {
            const style = { gridArea: cell.area, "--m-order": cell.order, "--m-h": cell.mh ? `${cell.mh}px` : undefined } as CSSProperties;
            switch (cell.kind) {
              case "title":
                return (
                  <div key={cell.area} className="rc-home-dev__cell rc-home-dev__cell--title" style={style} data-mobile={cell.order ? undefined : "hidden"}>
                    <h2>{cell.title}</h2>
                  </div>
                );
              case "figure":
                return (
                  <div key={cell.area} className="rc-home-dev__cell rc-home-dev__cell--figure" style={style} data-mobile={cell.order ? undefined : "hidden"}>
                    <span className="rc-home-dev__fig">{cell.label}</span>
                    <span className="rc-home-dev__art rc-media" data-compare-mask="" />
                  </div>
                );
              case "text":
                return (
                  <a key={cell.area} href="#" className={`rc-home-dev__cell rc-home-dev__cell--text${cell.title ? "" : " rc-home-dev__cell--lead"}`} style={style} data-mobile={cell.order ? undefined : "hidden"}>
                    {cell.title ? <h3>{cell.title}</h3> : null}
                    <p>{cell.body}</p>
                    {cell.label ? <span className="rc-home-dev__more">{cell.label} ↗</span> : null}
                  </a>
                );
              case "link":
                return (
                  <a key={cell.area} href="#" className="rc-home-dev__cell rc-home-dev__cell--link" style={style} data-mobile={cell.order ? undefined : "hidden"}>
                    <span className="rc-home-dev__more">{cell.label} ↗</span>
                  </a>
                );
              default:
                return cell.kind satisfies never;
            }
          })}
          <span className="rc-home-dev__fade" aria-hidden="true" />
        </div>
      </section>

      <section className="rc-home-cta">
        <div className="rc-home-cta__art rc-media rc-media--glow" data-compare-mask="" aria-hidden="true" />
        <div className="rc-twotone rc-home-center" style={{ width: 347 }}>
          <h2>Take the short way.</h2>
          <p>Download and use {brand} for free.</p>
        </div>
        <DownloadBlock />
      </section>
    </Shell>
  );
}
