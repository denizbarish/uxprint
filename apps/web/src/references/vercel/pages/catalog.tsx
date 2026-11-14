"use client";

import { useId, useState } from "react";
import { Collapsible } from "@base-ui/react/collapsible";
import { Page } from "../chrome";
import { Icon, Media, useBrand } from "../ui";
import "./catalog.css";

type Use = "AI" | "Starter" | "Commerce" | "Content";

const items: [string, string, Use, "dark" | "flat"][] = [
  ["Form Router with Model SDK", "Three forms use the Model SDK to route each submission to the right team by its context.", "AI", "dark"],
  ["Coding Agent", "A coding agent for chat and code review that looks into, reviews, and fixes code in a sandbox and opens pull requests.", "AI", "dark"],
  ["Company Brain", "A chat company brain that answers from your sources, keeps context, runs scheduled tasks, and grows with use.", "AI", "dark"],
  ["Web Chat", "A web chat starter with streaming replies, saved threads, and file uploads, ready to deploy in minutes.", "AI", "dark"],
  ["Voice Interface Starter", "Talk to a voice assistant in the browser with live transcripts and turn-taking, built on a hosted voice model.", "AI", "flat"],
  ["Server on Fast Runtime", "A minimal HTTP server running on a fast JavaScript runtime with routing, middleware, and zero config deploys.", "Starter", "dark"],
  ["Commerce Storefront", "A high-performance storefront with product pages, cart, and checkout wired to a headless commerce backend.", "Commerce", "flat"],
  ["Docs Starter", "A documentation site with search, versioned pages, and MDX components, styled and ready for your content.", "Content", "flat"],
  ["Blog Starter Kit", "A statically generated blog using Markdown files, with tags, an RSS feed, and dynamic social images.", "Content", "dark"],
  ["Image Gallery", "An image gallery with blur placeholders, keyboard navigation, and shareable links for every photo.", "Starter", "flat"],
  ["Admin Dashboard", "A dashboard template with auth, a data table, charts, and settings pages built from shared components.", "Starter", "dark"],
  ["Chatbot with Tools", "A full-featured chatbot that can call tools, render rich results, and keep history across sessions.", "AI", "dark"],
  ["Portfolio Site", "A personal portfolio with a project grid, case study pages, and a contact form that sends nowhere.", "Content", "flat"],
  ["Waitlist Page", "A launch waitlist page with email capture, referral counts, and a simple admin view of sign-ups.", "Starter", "flat"],
  ["Multi-tenant Platform", "Serve many customer sites from one codebase with custom domains, per-tenant data, and edge routing.", "Starter", "dark"],
  ["Search Assistant", "An answer engine that searches the web, cites sources, and writes a short summary for each question.", "AI", "dark"],
  ["Subscription Starter", "Sign-up, plans, and billing portal flows for a subscription product, with webhooks already set up.", "Commerce", "flat"],
  ["Marketing Site", "A fast marketing site with a hero, feature grid, pricing table, and a CMS for page content.", "Content", "flat"],
  ["Realtime Whiteboard", "A shared whiteboard with live cursors, presence, and undo history synced across every viewer.", "Starter", "dark"],
  ["Image Generator", "Create images from a text prompt, save favorites, and share a public gallery of your results.", "AI", "dark"],
  ["Link in Bio", "A single page of links with themes, click counts, and a short custom handle for each profile.", "Content", "flat"],
  ["Personal Website", "A personal website with a visual editor, live preview, and structured content from a headless CMS.", "Content", "flat"],
  ["Answer Engine", "An answer engine that pairs a language model with search to return sourced, readable answers.", "AI", "dark"],
  ["Code Generator", "Turn a short prompt into a working code snippet, preview it, and copy it straight into your project.", "AI", "dark"],
];

const uses: Use[] = ["AI", "Starter", "Commerce", "Content"];

/** Catalog template (searchable card grid), built from /templates. */
export function CatalogScreen() {
  const brand = useBrand();
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<Use[]>([]);
  const [expanded, setExpanded] = useState(false);

  const q = query.trim().toLowerCase();
  const shown = items.filter(([title, text, use]) => (picked.length === 0 || picked.includes(use)) && (!q || `${title} ${text}`.toLowerCase().includes(q)));

  return (
    <Page actions="contact">
      <div className="vc-cat">
        <Collapsible.Root>
          <div className="vc-cat__head">
            <div className="vc-cat__intro">
              <h1 className="vc-cat__title">Templates</h1>
              <p className="vc-body">Jumpstart your app development process with pre-built solutions from {brand} and our community.</p>
            </div>
            <div className="vc-cat__tools">
              <div className="vc-cat__search">
                <Icon name="search" size={16} />
                <label htmlFor={searchId} className="vc-sr-only">
                  Search templates
                </label>
                <input id={searchId} type="search" placeholder="Search templates..." value={query} onChange={(e) => setQuery(e.target.value)} autoComplete="off" />
              </div>
              <Collapsible.Trigger className="vc-btn vc-btn--36 vc-btn--pill vc-btn--secondary vc-cat__filters">
                <Icon name="filter" size={16} />
                <span className="vc-btn__label">Filters</span>
              </Collapsible.Trigger>
            </div>
          </div>
          <Collapsible.Panel className="vc-cat__panel">
            <fieldset className="vc-cat__chips">
              <legend className="vc-sr-only">Use case</legend>
              {uses.map((use) => (
                <label key={use} className="vc-cat__chip">
                  <input type="checkbox" checked={picked.includes(use)} onChange={() => setPicked(picked.includes(use) ? picked.filter((u) => u !== use) : [...picked, use])} />
                  {use}
                </label>
              ))}
            </fieldset>
          </Collapsible.Panel>
        </Collapsible.Root>
        <h2 className="vc-sr-only">Templates Gallery</h2>
        <ul className={`vc-cat__grid${expanded ? " vc-cat__grid--all" : ""}`} aria-live="polite">
          {shown.map(([title, text, , tone]) => (
            <li key={title}>
              <a href="#" className="vc-cat-card vc-focus">
                <Media tone={tone} className="vc-cat-card__media" />
                <h3 className="vc-cat-card__title">{title}</h3>
                <p className="vc-cat-card__text">{text}</p>
              </a>
            </li>
          ))}
        </ul>
        {shown.length === 0 ? <p className="vc-cat__empty">No templates match this search.</p> : null}
        <div className="vc-cat__more">
          <button type="button" className="vc-btn vc-btn--36 vc-btn--pill vc-btn--secondary" onClick={() => setExpanded(true)} disabled={expanded}>
            <span className="vc-btn__label">View All</span>
          </button>
        </div>
      </div>
    </Page>
  );
}
