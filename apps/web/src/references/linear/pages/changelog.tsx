"use client";

import { useState, type CSSProperties } from "react";
import { Media, SitePage } from "../chrome";
import "./changelog.css";

/* Changelog template (rebuilt from linear.app/changelog): dated entries on a vertical rail, release notes with
   collapsible detail rows, and a link to older updates. */

const filters = ["All", "Changelog", "Product launches", "From the team", "From the community", "Press"];

type Sub = { title: string; paragraphs: string[] };
type Entry = {
  date: string;
  title: string;
  /** Media height at 1440 and at 390. */
  media: [number, number];
  paragraphs: string[];
  list?: string[];
  subs?: Sub[];
  rows: string[];
};

const p1 = "You can now connect your own model keys to the remote code helper and keep using the credits and rates you already have with your provider.";
const p2 = "Connect through any of the large model providers, a cloud platform of your choice, or any gateway that speaks one of the two common message formats used across the field today.";
const p3 = "Your provider bills model usage directly, while the sandbox runtime keeps using Acme credits. You will need an API key, not a chat plan.";
const p4 = "Workspace admins can turn this on in Settings. Available on every current plan. Read more in our documentation.";
const short = "Events in chat and in your code hosting can now start a loop on their own, without anyone having to press a button.";
const long = "Set up a loop to answer a new message, pick up a label change or react to a merged change. Each loop runs with the same rules and the same history as the rest of the workspace.";

const entries: Entry[] = [
  { date: "November 12, 2026", title: "Use your own model keys", media: [416, 228], paragraphs: [p1, p2, p3, p4], rows: ["Fixes", "Improvements", "Keyboard shortcuts", "API", "Connector server"] },
  {
    date: "November 5, 2026",
    title: "Diffs on the phone",
    media: [281, 154],
    paragraphs: ["Diffs, the quick and focused review view, is now available on the phone apps for both platforms.", "Here is what you can do from your phone:"],
    list: ["Read changes with guided reviews", "Start on the phone, carry on at your desk", "See what needs review in your inbox", "Open preview links", "Work with review and code helpers", "Merge approved changes", "Follow helper runs as they happen"],
    subs: [{ title: "", paragraphs: ["Try it from the Reviews tab in the phone app, or read more in our blog post.", "If you are not reviewing in Acme yet, get started here."] }],
    rows: ["Fixes", "Improvements", "API", "Connector server"],
  },
  {
    date: "October 22, 2026",
    title: "More ways to run and share loops",
    media: [351, 192],
    paragraphs: ["Loops take care of product work by reacting to changes in Acme, in chat and in your code hosting. They now come with more triggers, shared templates and a clearer history.", long, short],
    subs: [
      { title: "Chat and repo triggers", paragraphs: [short, long, "Learn how to get going in the docs."] },
      { title: "Shared loop templates", paragraphs: [long, short] },
      { title: "Run history", paragraphs: [short, long] },
      { title: "Pause and resume", paragraphs: [long, short] },
    ],
    rows: ["Fixes", "Improvements", "API", "Connector server"],
  },
  {
    date: "October 8, 2026",
    title: "Stacked pull requests",
    media: [364, 200],
    paragraphs: [long, short, long, short, long],
    subs: [
      { title: "Review each layer", paragraphs: [long, short] },
      { title: "Merge in order", paragraphs: [short, long, short] },
      { title: "Works with your tools", paragraphs: [long] },
      { title: "Rebase with one click", paragraphs: [long, short] },
    ],
    rows: ["Fixes", "Improvements", "Keyboard shortcuts", "API", "Connector server"],
  },
  {
    date: "September 24, 2026",
    title: "Goal health and weekly digests",
    media: [373, 205],
    paragraphs: [long, short, short],
    subs: [
      { title: "Health at a glance", paragraphs: [long, short, long] },
      { title: "Weekly digest", paragraphs: [short, long] },
      { title: "Shared views for goals", paragraphs: [long, short] },
      { title: "Better filters", paragraphs: [short, long, short] },
      { title: "Goal owners", paragraphs: [long, short, long] }, { title: "Status history", paragraphs: [long, short, long] },
    ],
    rows: ["Fixes", "Improvements", "Keyboard shortcuts", "API", "Connector server"],
  },
  {
    date: "September 10, 2026",
    title: "A faster sorting inbox",
    media: [374, 206],
    paragraphs: [long, short, long],
    subs: [
      { title: "Smarter suggestions", paragraphs: [long, short] },
      { title: "Bulk actions", paragraphs: [short, long, short] },
      { title: "Inbox rules", paragraphs: [long, short] },
      { title: "Snooze and remind", paragraphs: [long, short, long] }, { title: "Keyboard first", paragraphs: [long, short, long] },
    ],
    rows: ["Fixes", "Improvements", "API", "Connector server"],
  },
  {
    date: "August 27, 2026",
    title: "Request forms everywhere",
    media: [361, 199],
    paragraphs: [long, short, short],
    subs: [
      { title: "Form builder", paragraphs: [long, short, long] },
      { title: "Routing", paragraphs: [short, long] },
      { title: "Email intake", paragraphs: [long, short] },
      { title: "Request owners", paragraphs: [long, short, long] }, { title: "Customer links", paragraphs: [long, short, long] }, { title: "Reply from Acme", paragraphs: [long, short, long] },
    ],
    rows: ["Fixes", "Improvements", "Keyboard shortcuts", "API"],
  },
  {
    date: "August 13, 2026",
    title: "Timeline view, refreshed",
    media: [351, 192],
    paragraphs: [long, short, long],
    subs: [
      { title: "Drag to plan", paragraphs: [long, short] },
      { title: "Milestones on the timeline", paragraphs: [short, long, short] },
      { title: "Zoom levels", paragraphs: [long, short, long] }, { title: "Shared timelines", paragraphs: [long, short, long] }, { title: "Print and export", paragraphs: [long, short, long] },
    ],
    rows: ["Fixes", "Improvements", "API", "Connector server"],
  },
  { date: "July 30, 2026", title: "Documents with live charts", media: [347, 190], paragraphs: [long, short, long, short, long], subs: [{ title: "Chart blocks", paragraphs: [long, short] }], rows: ["Fixes", "Improvements", "API"] },
  {
    date: "July 16, 2026",
    title: "Code helpers in more places",
    media: [360, 198],
    paragraphs: [long, short, long],
    subs: [
      { title: "Signed commits for code sessions", paragraphs: [short, long] },
      { title: "A new helper for your repo", paragraphs: [long, short, long] },
      { title: "Helper settings", paragraphs: [long, short, long] }, { title: "Model choice", paragraphs: [long, short, long] }, { title: "Session logs", paragraphs: [long, short, long] }, { title: "Usage limits", paragraphs: [long, short, long] }, { title: "Repo rules", paragraphs: [long, short, long] },
    ],
    rows: ["Fixes", "Improvements", "Connector server", "Keyboard shortcuts"],
  },
];

export function Rows({ rows }: { rows: string[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="lr-log-rows">
      {rows.map((row) => {
        const expanded = open === row;
        return (
          <div className="lr-log-row" key={row}>
            <button type="button" aria-expanded={expanded} onClick={() => setOpen(expanded ? null : row)}>
              {row}
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M4.5 2.5 8 6l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {expanded ? (
              <ul>
                <li>Fixed a case where a view lost its filters after a reload</li>
                <li>Improved how long lists scroll on slower machines</li>
              </ul>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export function ChangelogScreen() {
  const [filter, setFilter] = useState("Changelog");
  return (
    <SitePage className="lr-log" current="Now">
      <div className="lr-container lr-log-head">
        <h1 className="lr-title-1">
          <a href="#now">Now</a>
        </h1>
        <div className="lr-log-toolbar">
          <nav className="lr-log-filters" aria-label="Filter posts">
            {filters.map((label) => (
              <a
                key={label}
                href="#filter"
                aria-current={filter === label ? "page" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  setFilter(label);
                }}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="lr-log-actions">
            <button type="button" className="lr-log-search">
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <circle cx="6" cy="6" r="4.25" fill="none" stroke="currentColor" strokeWidth="1.3" />
                <path d="M9.2 9.2 12 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <span>Search&hellip;</span>
            </button>
            <button type="button" className="lr-log-bell" aria-label="Subscribe to updates">
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M3.5 9.5V6.5a3.5 3.5 0 0 1 7 0v3l1 1.5h-9zM5.75 12.5h2.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="lr-container">
        <hr className="lr-log-rule" />
        <ol className="lr-log-entries">
          {entries.map((entry, index) => (
            <li className="lr-log-entry" key={entry.title}>
              <p className="lr-log-entry__date">
                <span className="lr-log-entry__dot" data-latest={index === 0 ? "" : undefined} aria-hidden="true" />
                <time>{entry.date}</time>
              </p>
              <article className="lr-log-entry__body">
                <h2>
                  <a href="#entry">{entry.title}</a>
                </h2>
                <Media className="lr-log-entry__media" style={{ "--h": `${entry.media[0]}px`, "--h-phone": `${entry.media[1]}px` } as CSSProperties} />
                <div className="lr-log-prose">
                  {entry.paragraphs.map((text, i) => (
                    <p key={i}>{text}</p>
                  ))}
                  {entry.list ? (
                    <ul>
                      {entry.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {entry.subs?.map((sub, i) => (
                    <div key={i} className="lr-log-sub">
                      {sub.title ? <h3>{sub.title}</h3> : null}
                      {sub.paragraphs.map((text, j) => (
                        <p key={j}>{text}</p>
                      ))}
                    </div>
                  ))}
                </div>
                <Rows rows={entry.rows} />
              </article>
            </li>
          ))}
        </ol>
        <div className="lr-log-more">
          <a className="lr-btn lr-btn--40 lr-btn--secondary" href="#older">
            Older updates
          </a>
        </div>
      </div>
    </SitePage>
  );
}
