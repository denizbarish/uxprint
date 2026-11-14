"use client";

import { useState, type CSSProperties } from "react";
import { Arrow, Closing, Media, SitePage } from "../chrome";
import "./product.css";

/* Product area template (rebuilt from the planning page): hero, six chapters, links to sibling areas. */

type Cell = { title: string; text: string; phone: number };

type Chapter = {
  id: string;
  title: [string, string];
  intro: string;
  more: string;
  /** Large figure with a caption under it. */
  wide?: Cell;
  /** Bordered two-column grid of figures. */
  cells?: Cell[];
  /** Media beside a list of short notes. */
  notes?: string[];
  /** Row of view tabs under the media. */
  tabs?: { title: string; text: string }[];
};

const chapters: Chapter[] = [
  {
    id: "projects",
    title: ["Run projects", "from start to end"],
    intro: "Organise larger pieces of work across many people and teams. Move smoothly between the idea and the work itself.",
    more: "Projects",
    wide: { title: "Close the distance between the plan and the work", text: "Keep specs, documents, timelines and updates in one shared place, so every project has a single home that stays current.", phone: 641 },
    cells: [
      { title: "Milestones and dependencies", text: "Mark the key dates and lay out what depends on what, so the team sees which work gates the next step.", phone: 486 },
      { title: "Forecast how it lands", text: "See how the project is moving and when it is likely to finish, based on the pace of the team so far.", phone: 486 },
      { title: "Keep everyone informed…", text: "Share health and progress with short written updates that anyone in the company can follow.", phone: 462 },
      { title: "…even outside of Acme", text: "Send project updates to chat channels on a schedule, so other teams stay current without logging in.", phone: 462 },
    ],
  },
  {
    id: "ideas",
    title: ["Shape your", "product ideas"],
    intro: "Work on ideas together and write out product needs in live documents that several people can edit at the same time.",
    more: "Documents",
    notes: ["Shared editing", "Inline comments", "Quick commands", "Lists and checks"],
  },
  {
    id: "goals",
    title: ["Line up the larger", "product goals"],
    intro: "Group projects into larger goals. Show the most important lines of work across the company and how well they are going.",
    more: "Goals",
    wide: { title: "Make larger product work easy to follow at every level", text: "Goals act as the single place to describe the larger aims of the company and to track the projects that serve them.", phone: 665 },
    cells: [
      { title: "Agree on the direction", text: "Write a clear summary for each goal, so every team knows why it matters and what success means.", phone: 462 },
      { title: "Watch progress at scale", text: "See at a glance which goals are on track and which ones need attention this week.", phone: 462 },
    ],
  },
  {
    id: "roadmap",
    title: ["Lay out your", "product roadmap"],
    intro: "Bring the team together around one shared timeline. Plan with clear visual views made for the way product teams work.",
    more: "Timeline",
    tabs: [
      { title: "Quarter plans", text: "Agree on what ships next" },
      { title: "Delivery stages", text: "Watch work move through stages" },
      { title: "Timeline", text: "Draw roadmaps to plan visually" },
      { title: "Staffing", text: "Spread people across projects" },
    ],
  },
  {
    id: "pulse",
    title: ["Follow the pace", "of product work"],
    intro: "Stay current with what is happening across the product team through a personal feed of short updates and discussions.",
    more: "Pulse",
    wide: { title: "A personal feed for the work that matters to you", text: "Pulse brings the relevant updates from projects and goals into one feed, ranked for you and easy to scan.", phone: 689 },
    cells: [
      { title: "Focus on what matters most", text: "Build custom feeds to follow a chosen set of projects and goals.", phone: 462 },
      { title: "Summaries in your inbox", text: "Get a personal summary of the latest updates, as text or as a short audio clip.", phone: 486 },
    ],
  },
  {
    id: "insights",
    title: ["Numbers to back", "your judgement"],
    intro: "Take the guessing out of product planning with built-in reports, charts and dashboards made for product teams.",
    more: "Insights",
    wide: { title: "Quick reports for any stream of work", text: "Great products need both taste and evidence. For the evidence, Acme gives you a set of flexible reporting tools.", phone: 665 },
    cells: [
      { title: "Collect reports into dashboards", text: "Build modular dashboards that bring your most useful charts together.", phone: 462 },
      { title: "Build your own reports", text: "Send workspace data to spreadsheets or a data warehouse of your choice.", phone: 462 },
    ],
  },
];

const siblings = [
  { title: "Make your request handling run on its own", area: "Requests and connections" },
  { title: "Plan the work and follow it from idea to release", area: "Planning and tracking" },
  { title: "Helpers that take the work from talk to code", area: "Helpers and rules" },
  { title: "Move the work forward across people and helpers", area: "Write, check and ship" },
];

function Figure({ cell, wide }: { cell: Cell; wide?: boolean }) {
  return (
    <figure className={wide ? "lr-product-wide" : "lr-product-cell"} style={{ "--phone-h": `${cell.phone}px` } as CSSProperties}>
      <Media className="lr-media--bare lr-product-figure__media" />
      <figcaption>
        <strong>{cell.title}</strong>
        <span>{cell.text}</span>
      </figcaption>
    </figure>
  );
}

function Tabs({ tabs }: { tabs: NonNullable<Chapter["tabs"]> }) {
  const [current, setCurrent] = useState(0);
  return (
    <div className="lr-product-tabs" role="tablist" aria-label="Views">
      {tabs.map((tab, index) => (
        <button
          type="button"
          role="tab"
          key={tab.title}
          aria-selected={current === index}
          className="lr-product-tab"
          onClick={() => setCurrent(index)}
        >
          <strong>{tab.title}</strong>
          <span>{tab.text}</span>
        </button>
      ))}
    </div>
  );
}

export function ProductScreen() {
  return (
    <SitePage className="lr-product">
      <header className="lr-product-hero">
        <Media className="lr-media--flat lr-product-hero__art" />
        <div className="lr-container">
          <p className="lr-product-hero__label">Planning and tracking</p>
          <h1 className="lr-product-hero__title">
            Plan the work from
            <br /> idea to release
          </h1>
        </div>
      </header>
      {chapters.map((chapter) => (
        <section className={`lr-product-chapter lr-product-chapter--${chapter.id}`} key={chapter.id} aria-labelledby={`h-${chapter.id}`}>
          <div className="lr-container lr-split">
            <h2 className="lr-title-1" id={`h-${chapter.id}`}>
              {chapter.title[0]}
              <br />
              {chapter.title[1]}
            </h2>
            <div>
              <p className="lr-intro">{chapter.intro}</p>
              <a className="lr-link lr-link--quiet lr-split__more lr-product-more" href="#more">
                {chapter.more} <Arrow />
              </a>
            </div>
          </div>
          {chapter.wide ? (
            <div className="lr-container lr-product-body">
              <Figure cell={chapter.wide} wide />
            </div>
          ) : null}
          {chapter.cells ? (
            <div className="lr-product-grid">
              {chapter.cells.map((cell) => (
                <Figure cell={cell} key={cell.title} />
              ))}
            </div>
          ) : null}
          {chapter.notes ? (
            <div className="lr-container lr-product-notes">
              <ul>
                {chapter.notes.map((note) => (
                  <li key={note}>
                    <span className="lr-mono-label">{note}</span>
                    <span>Edit the same page at once and see each change as it lands.</span>
                  </li>
                ))}
              </ul>
              <Media className="lr-product-notes__media" label="Document editor" />
            </div>
          ) : null}
          {chapter.tabs ? (
            <>
              <Media className="lr-product-roadmap" label="Roadmap view" />
              <Tabs tabs={chapter.tabs} />
            </>
          ) : null}
        </section>
      ))}
      <nav className="lr-product-siblings" aria-label="Other product areas">
        {siblings.map((sibling) => (
          <a className="lr-product-sibling" href="#area" key={sibling.area}>
            <strong>{sibling.title}</strong>
            <span>
              {sibling.area} <Arrow />
            </span>
          </a>
        ))}
      </nav>
      <Closing />
    </SitePage>
  );
}
