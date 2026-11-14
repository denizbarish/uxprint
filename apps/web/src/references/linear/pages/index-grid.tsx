"use client";

import { useState } from "react";
import { Arrow, Cta, Media, SitePage } from "../chrome";
import "./index-grid.css";

/* Index template (rebuilt from the customers page): title, filter tabs, ruled card grid, stats band, directory. */

const filters = ["Featured", "SaaS", "AI", "Fintech", "Consumer", "Hardware", "Health", "Enterprise"];

const stories = [
  { title: "The coding helper behind 75% of Northwind’s merged changes", action: "Watch video" },
  { title: "Why Globex picked Acme and grew to 3,000 users", action: "Read story" },
  { title: "Initech’s bet on helper-first development", action: "Watch video" },
  { title: "How teams at Umbrella left one of the largest legacy trackers", action: "Read story" },
  { title: "Hooli Aero builds as fast as it flies", action: "Watch video" },
  { title: "How Vandelay builds with Acme", action: "Watch video" },
  { title: "How Stark Labs moved to Acme and joined up its product teams", action: "Read story" },
  { title: "Inside Wayne Works’ rebuild around helpers", action: "Watch video" },
  { title: "Soylent proved the impact of Acme with a data-led trial", action: "Read story" },
  { title: "How Cyberdyne is rebuilding its product culture with Acme", action: "Read story" },
  { title: "Tyrell’s push to become helper-first with Acme", action: "Read story" },
  { title: "How Wonka Chocolate scales its craft", action: "Watch video" },
];

const stats = [
  { value: "2.0x", label: "More issues filed" },
  { value: "3.3x", label: "Faster issue fixes" },
  { value: "50%", label: "Issues written by helpers" },
];

const directory: [name: string, note: string, tags: string, action: string][] = [
  ["Northwind", "", "SaaS, Enterprise", "Visit site"],
  ["Globex", "How Globex cut bug fixing time by 52%", "AI, Enterprise", "Read story"],
  ["Initech", "Initech removed scattered feedback with Acme Asks", "Fintech, Enterprise", "Read story"],
  ["Umbrella", "Umbrella improves pace and clarity with Acme", "SaaS, Enterprise", "Read story"],
  ["Hooli", "", "SaaS, Enterprise", "Visit site"],
  ["Vandelay", "Acme helps Vandelay run demanding roadmaps", "Fintech, Consumer, Enterprise", "Read story"],
  ["Stark Labs", "", "SaaS, AI", "Visit site"],
  ["Wayne Works", "From project updates to ownership, Wayne Works moves as one company", "AI", "Read story"],
  ["Soylent", "", "Consumer, Enterprise", "Visit site"],
  ["Cyberdyne", "How Cyberdyne handles bugs with Acme", "SaaS", "Read story"],
  ["Tyrell", "", "AI, Consumer", "Visit site"],
  ["Wonka", "", "SaaS", "Visit site"],
  ["Oscorp", "", "AI", "Visit site"],
  ["Aperture", "", "Consumer", "Visit site"],
  ["Nakatomi", "", "Fintech, Consumer", "Visit site"],
  ["Pied Piper", "Pied Piper moved their 1,000 person team to Acme to move faster", "SaaS, Enterprise", "Read story"],
  ["Gringotts", "", "Consumer", "Visit site"],
];

function Story({ story }: { story: (typeof stories)[number] }) {
  return (
    <a className="lr-index-card" href="#story">
      <Media className="lr-index-card__image" />
      <strong>{story.title}</strong>
      <span>
        {story.action} <Arrow />
      </span>
    </a>
  );
}

export function IndexGridScreen() {
  const [filter, setFilter] = useState("Featured");
  return (
    <SitePage className="lr-index" current="Customers">
      <div className="lr-container lr-index-head">
        <h1 className="lr-title-1">Customers</h1>
        <nav className="lr-index-filters" aria-label="Filter stories">
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
      </div>
      <div className="lr-container lr-index-grid">
        {stories.slice(0, 6).map((story) => (
          <Story story={story} key={story.title} />
        ))}
      </div>
      <section className="lr-container lr-index-stats" aria-label="Results">
        <div>
          <p>Why teams move to Acme</p>
          <a className="lr-link lr-link--quiet" href="#switch">
            Learn more <Arrow />
          </a>
        </div>
        {stats.map((stat) => (
          <div className="lr-index-stat" key={stat.label}>
            <p>{stat.value}</p>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>
      <div className="lr-container lr-index-grid lr-index-grid--second">
        {stories.slice(6).map((story) => (
          <Story story={story} key={story.title} />
        ))}
      </div>
      <div className="lr-container">
        <p className="lr-index-statement">
          Supporting more than 50,000 companies. <span>From young startups to large enterprises and public companies.</span>
        </p>
        <ul className="lr-index-directory">
          {directory.map(([name, note, tags, action]) => (
            <li key={name}>
              <a href="#company">
                <span className="lr-index-directory__name">
                  <Media className="lr-index-directory__logo" />
                  {name}
                </span>
                <span className="lr-index-directory__note">{note}</span>
                <span className="lr-index-directory__tags">{tags}</span>
                <span className={`lr-index-directory__action${action === "Read story" ? " lr-index-directory__action--strong" : ""}`}>
                  {action} <Arrow />
                </span>
              </a>
            </li>
          ))}
          <li>
            <a href="#switch" className="lr-index-directory__you">
              <span className="lr-index-directory__name">Your company</span>
              <span className="lr-index-directory__note" />
              <span className="lr-index-directory__tags" />
              <span className="lr-index-directory__action">
                Make the move <Arrow />
              </span>
            </a>
          </li>
        </ul>
      </div>
      <Cta />
    </SitePage>
  );
}
