"use client";

import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Mark, useBrand } from "../brand";
import "../site.css";
import "./docs.css";

/* Docs template (rebuilt from linear.app/docs and /developers): app shell with a fixed sidebar, a thin top bar
   with breadcrumb, search and sign up, and a grid of guide cards. No marketing header or footer. */

type Icon = "book" | "inbox" | "grid" | "chart" | "bolt" | "link" | "gear" | "box";

const groups: { label: string; items: [string, Icon][] }[] = [
  { label: "Getting started", items: [["Start guide", "book"]] },
  { label: "Intake", items: [["Sorting", "inbox"], ["Asks", "inbox"], ["Requests", "inbox"]] },
  { label: "Planning", items: [["Projects", "grid"], ["Goals", "grid"], ["Updates", "grid"]] },
  { label: "Issues and cycles", items: [["Issues", "box"], ["Cycles", "box"], ["Releases", "box"]] },
  { label: "Reviews", items: [["Reviews", "link"], ["Code settings", "gear"]] },
  {
    label: "Helpers and automation",
    items: [["Workspace helper", "bolt"], ["Remote code helper", "bolt"], ["Loops", "bolt"], ["Helper platform", "bolt"], ["Smart sorting", "bolt"], ["Connector server", "link"], ["Connectors", "link"]],
  },
  { label: "Insights and outcomes", items: [["Dashboards", "chart"], ["Insights", "chart"]] },
  {
    label: "Working in Acme",
    items: [["Inbox", "inbox"], ["Documents", "book"], ["Pulse", "chart"], ["My issues", "box"], ["Custom views", "grid"], ["Editor", "book"], ["Search", "gear"], ["Preferences", "gear"]],
  },
  { label: "Integrations", items: [["Code hosting", "link"], ["Trackers", "link"], ["Team chat", "link"], ["Error alerts", "link"], ["Messaging", "link"], ["Directory", "link"]] },
  {
    label: "Workspace management",
    items: [["Workspaces", "gear"], ["Teams", "gear"], ["Members and roles", "gear"], ["API and webhooks", "link"], ["Security", "gear"], ["Billing and plans", "gear"], ["Exporting data", "box"]],
  },
  { label: "Importers", items: [["Import guide", "box"]] },
];

const bottomLinks: [string, Icon][] = [["Docs", "book"], ["Developers", "box"], ["Learn", "chart"], ["Contact support", "inbox"]];

const sections: { title: string; cards: [string, string, Icon][] }[] = [
  {
    title: "Popular",
    cards: [
      ["Start guide", "Learn the basics and start working in Acme", "book"],
      ["Import", "Quickly bring in data from your current tools", "box"],
      ["Workspace helper", "Work across Acme, from first idea to finished project", "bolt"],
      ["Connectors", "Connect to your model tools and workflows", "link"],
    ],
  },
  {
    title: "Explore Acme",
    cards: [
      ["Acme Code", "Turn ideas and issues into code with helpers", "bolt"],
      ["Acme Reviews", "Review code changes and move work forward", "link"],
      ["Loops", "Run repeat work with helpers in Acme", "bolt"],
      ["Code hosting", "Link issues and run pull request steps", "link"],
      ["Projects", "Shape your product ideas and plan what to build next", "grid"],
      ["Goals", "Line up projects around company-level goals", "chart"],
      ["Team chat", "Bring conversations and work together in Acme", "inbox"],
      ["Sorting", "Handle unplanned work from integrations and other teams", "inbox"],
    ],
  },
];

const paths: Record<Icon, string> = {
  book: "M3 3.5h4a1.5 1.5 0 0 1 1.5 1.5v7.5A1.5 1.5 0 0 0 7 11H3zM13 3.5H9.5A1.5 1.5 0 0 0 8 5",
  inbox: "M2.5 8.5 4 3.5h8l1.5 5v4h-11zM2.5 8.5h3.5l.75 1.5h2.5L10 8.5h3.5",
  grid: "M3 3h4v4H3zM9 3h4v4H9zM3 9h4v4H3zM9 9h4v4H9z",
  chart: "M3 13V8M6.5 13V5M10 13V9M13.5 13V3",
  bolt: "M9 2.5 4 9h4l-1 4.5L12 7H8z",
  link: "M6.5 9.5l3-3M7 4.5l1-1a2.5 2.5 0 0 1 3.5 3.5l-1 1M9 11.5l-1 1A2.5 2.5 0 0 1 4.5 9l1-1",
  gear: "M8 5.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM8 2v2M8 12v2M2 8h2M12 8h2",
  box: "M3 4.5 8 2.5l5 2v7l-5 2-5-2zM3 4.5l5 2 5-2M8 6.5v7",
};

function Glyph({ name }: { name: Icon }) {
  return (
    <svg className="lr-docs-glyph" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d={paths[name]} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Brand() {
  const brand = useBrand();
  return (
    <div className="lr-docs-brand">
      <a href="#top" aria-label={`${brand} home`} data-compare-mask="">
        <Mark />
      </a>
      <span className="lr-docs-brand__rule" aria-hidden="true" />
      <a href="#docs">Docs</a>
    </div>
  );
}

function Search() {
  return (
    <button type="button" className="lr-docs-icon-btn" aria-label="Search docs">
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <circle cx="6" cy="6" r="4.25" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <path d="M9.2 9.2 12 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    </button>
  );
}

function Nav({ onPick }: { onPick?: () => void }) {
  const [current, setCurrent] = useState("Docs");
  return (
    <>
      <nav className="lr-docs-nav" aria-label="Docs sections">
        {groups.map((group) => (
          <div className="lr-docs-group" key={group.label}>
            <span className="lr-docs-group__label">{group.label}</span>
            <ul>
              {group.items.map(([label, icon]) => (
                <li key={label}>
                  <a className="lr-docs-item" href="#doc" onClick={onPick}>
                    <Glyph name={icon} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <ul className="lr-docs-bottom">
        {bottomLinks.map(([label, icon]) => (
          <li key={label}>
            <a
              className="lr-docs-item lr-docs-item--bottom"
              href="#area"
              aria-current={current === label ? "page" : undefined}
              onClick={(event) => {
                event.preventDefault();
                setCurrent(label);
                onPick?.();
              }}
            >
              <Glyph name={icon} />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen} modal={false}>
      <Dialog.Trigger className="lr-docs-burger" aria-label={open ? "Close menu" : "Open menu"}>
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          {open ? (
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          ) : (
            <path d="M2.5 5.5h11M2.5 10.5h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          )}
        </svg>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Popup className="linear-ref lr-docs-drawer">
          <Dialog.Title className="lr-visually-hidden">Docs navigation</Dialog.Title>
          <Nav onPick={() => setOpen(false)} />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function DocsScreen() {
  return (
    <div className="linear-ref lr-docs" id="top">
      <aside className="lr-docs-side">
        <div className="lr-docs-side__top">
          <Brand />
          <Search />
        </div>
        <Nav />
      </aside>
      <header className="lr-docs-phonebar">
        <Brand />
        <a className="lr-btn lr-btn--32 lr-btn--primary" href="../signup-method/">
          Sign up
        </a>
        <MobileNav />
      </header>
      <div className="lr-docs-main">
        <div className="lr-docs-bar">
          <nav aria-label="Breadcrumb">
            <ol>
              <li>
                <span aria-current="page">Home</span>
              </li>
            </ol>
          </nav>
          <div className="lr-docs-bar__right">
            <button type="button" className="lr-docs-icon-btn" aria-label="Switch theme">
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <circle cx="7" cy="7" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.8 2.8l1 1M10.2 10.2l1 1M2.8 11.2l1-1M10.2 3.8l1-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
            <a className="lr-btn lr-btn--32 lr-btn--primary" href="../signup-method/">
              Sign up
            </a>
          </div>
        </div>
        <main className="lr-docs-content">
          <h1>Acme Docs</h1>
          <p className="lr-docs-lead">Get an overview of the features, integrations, and how to use them.</p>
          {sections.map((section) => (
            <section key={section.title} aria-label={section.title}>
              <h2>{section.title}</h2>
              <ul className="lr-docs-cards">
                {section.cards.map(([title, text, icon]) => (
                  <li key={title}>
                    <a className="lr-docs-card" href="#guide">
                      <span className="lr-docs-card__art">
                        <Glyph name={icon} />
                      </span>
                      <span className="lr-docs-card__text">
                        <h3>{title}</h3>
                        <p>{text}</p>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
