"use client";

import { useState } from "react";
import { Media, SitePage } from "../chrome";
import "./integrations.css";

/* Integrations template (rebuilt from linear.app/integrations): title with search, sticky category list on the left,
   one section per category with six cards and a browse link, then a centered build-your-own block. */

type Card = [name: string, by: string, text: string];

const short = "Link issues and keep their status in step with your work";
const long = "Connect your code host to run review steps, read code in Acme, and sync";

const categories: { name: string; text: string; cards: Card[] }[] = [
  { name: "Essentials", text: "Key integrations to get more out of your Acme workspace", cards: [["Code host", "Acme", long], ["Origin", "Acme", "Sync issue status with your Origin pull requests"], ["Team chat", "Acme", "Create issues from chat messages and sync threads"], ["Repo box", "Acme", "Automate your merge request steps"], ["Canvas", "Acme", "Connect your canvas and Acme across design and build"], ["Help desk", "Acme", "Keep a tight loop with customers and speed up bug reports"]] },
  { name: "Helpers", text: "Bring helper teammates into Acme", cards: [["Writer", "Northwind", "Hand issues to Writer straight from Acme"], ["Editor", "Globex", "Turn issues into pull requests with Editor"], ["Pilot", "Initech", "Turn issues into code with Pilot in your editor"], ["Factory", "Umbrella", "Assign issues from your backlog to helpers"], ["Watch", "Hooli", "Fix issues with the help of your error tool"], ["Builder", "Vandelay", "Run work from issue to tested pull request"]] },
  { name: "Model clients", text: "Let outside model apps read and act on data", cards: [["Editor server", "Globex", "Connect Editor to the Acme connector server"], ["Chat app", "Initech", "Connect deep research to Acme"], ["Assistant", "Stark Labs", "Connect Assistant to the Acme connector server"], ["Sketch", "Wayne Works", "Connect Sketch and Acme to build from issues"], ["Wind", "Soylent", "Connect Wind to the Acme connector server"], ["Replay", "Cyberdyne", "Build apps and automations"]] },
  { name: "Engineering", text: "Bring your engineering work into one place", cards: [["Code host", "Acme", long], ["Origin", "Acme", "Sync issue status with your Origin pull requests"], ["Repo box", "Acme", "Automate your merge request steps"], ["Code editor", "Acme", "Easily build editor extensions with Acme"], ["Error watch", "Acme", "Create and link issues and resolve them on release"], ["Monitor", "Tyrell", "Create issues from monitor cases and alerts"]] },
  { name: "Acme crafted", text: "Integrations built by the Acme team", cards: [["Code host", "Acme", long], ["Origin", "Acme", "Sync issue status with your Origin pull requests"], ["Team chat", "Acme", "Create issues from chat messages and sync threads"], ["Repo box", "Acme", "Automate your merge request steps"], ["Wiki", "Acme", "Previews of issues, views and projects in your wiki pages"], ["Canvas", "Acme", "Connect your canvas and Acme across design and build"]] },
  { name: "Bug reports", text: "Create issues and bug reports from anywhere", cards: [["Asks for chat", "Acme", "Turn requests from chat or email into issues that you can track"], ["Error watch", "Acme", "Create and link issues and resolve them on release"], ["Incidents", "Oscorp", "Handle incidents and sort the follow-up work"], ["Bug bird", "Aperture", "Speed up your bug reports with screen recordings"], ["Badger", "Nakatomi", "Handle errors from Acme and keep them in sync"], ["Jar", "Wonka", "Create issues with all the details developers need"]] },
  { name: "Automations", text: "Connect Acme to the rest of your tools", cards: [["Flow", "Gringotts", short], ["Zap", "Pied Piper", short], ["Make", "Northwind", short], ["Relay", "Globex", short], ["Hooks", "Acme", short], ["Script", "Initech", short]] },
  { name: "Customer work", text: "Bring customer feedback into the product loop", cards: [["Help desk", "Acme", short], ["Inbox", "Acme", short], ["Front", "Umbrella", short], ["Plain", "Hooli", short], ["Desk", "Vandelay", short], ["Notes", "Stark Labs", short]] },
  { name: "Security and compliance", text: "Keep your workspace safe and audited", cards: [["Vault", "Wayne Works", short], ["Audit", "Soylent", short], ["Scan", "Cyberdyne", short], ["Guard", "Tyrell", short], ["Policy", "Wonka", short], ["Keys", "Oscorp", short]] },
  { name: "Analytics", text: "Build reports and dashboards based on your Acme data", cards: [["Sheets", "Aperture", short], ["Lake", "Nakatomi", short], ["Charts", "Gringotts", short], ["Board", "Pied Piper", short], ["Metrics", "Northwind", short], ["Report", "Globex", short]] },
  { name: "Collaboration", text: "Work together across docs, chat and calls", cards: [["Wiki", "Acme", short], ["Team chat", "Acme", short], ["Calls", "Initech", short], ["Board", "Umbrella", short], ["Docs", "Hooli", short], ["Calendar", "Vandelay", short]] },
  { name: "Media and design", text: "Preview and embed design files, videos, and more", cards: [["Canvas", "Acme", "Connect your canvas and Acme across design and build"], ["Script", "Acme", "Embed share links in issues and documents"], ["Video", "Acme", "Embed videos in issues and documents"], ["Board", "Stark Labs", "Import, create and handle issues on the board"], ["Clip", "Acme", "Embed recorded clips in issues and documents"], ["Story", "Wayne Works", "Embed story videos in Acme"]] },
];

const slug = (name: string) => `int-${name.toLowerCase().replace(/[^a-z]+/g, "-")}`;

function Verified() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-label="Verified">
      <path d="M7 1.5 8.4 2.6l1.8-.1.6 1.7 1.5 1-.6 1.8.6 1.7-1.5 1-.6 1.7-1.8-.1L7 12.5l-1.4-1.1-1.8.1-.6-1.7-1.5-1 .6-1.7-.6-1.8 1.5-1 .6-1.7 1.8.1z" fill="currentColor" opacity="0.5" />
      <path d="m5 7 1.4 1.4L9.2 5.6" fill="none" stroke="var(--lr-canvas)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IntegrationsScreen() {
  const [active, setActive] = useState("Essentials");
  return (
    <SitePage className="lr-int">
      <div className="lr-int-wrap">
        <div className="lr-int-head">
          <h1>Integrations</h1>
          <button type="button" className="lr-int-search">
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <circle cx="6" cy="6" r="4.25" fill="none" stroke="currentColor" strokeWidth="1.3" />
              <path d="M9.2 9.2 12 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span>Search&hellip;</span>
            <kbd>&#8984;K</kbd>
          </button>
        </div>
        <hr className="lr-int-rule" />
        <div className="lr-int-body">
          <nav className="lr-int-side" aria-label="Categories">
            <ul>
              {categories.map((category) => (
                <li key={category.name}>
                  <a
                    href={`#${slug(category.name)}`}
                    aria-current={active === category.name ? "true" : undefined}
                    onClick={() => setActive(category.name)}
                  >
                    <span className="lr-int-side__dot" aria-hidden="true" />
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lr-int-sections">
            {categories.map((category) => (
              <section className="lr-int-section" key={category.name} id={slug(category.name)} aria-labelledby={`${slug(category.name)}-h`}>
                <h3 id={`${slug(category.name)}-h`}>
                  <a href="#category">{category.name}</a>
                </h3>
                <p className="lr-int-section__text">{category.text}</p>
                <ul className="lr-int-cards">
                  {category.cards.map(([name, by, text]) => (
                    <li key={name}>
                      <a className="lr-int-card" href="#integration">
                        <span className="lr-int-card__top">
                          <Media className="lr-int-card__logo" />
                          <span className="lr-int-card__name">
                            <strong>{name}</strong>
                            <span>
                              By {by} <Verified />
                            </span>
                          </span>
                        </span>
                        <span className="lr-int-card__text">{text}</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <a className="lr-int-browse" href="#browse">
                  Browse all &rarr;
                </a>
              </section>
            ))}
          </div>
        </div>
        <section className="lr-int-build" aria-labelledby="h-build">
          <Media className="lr-media--bare lr-int-build__art" />
          <h2 id="h-build">Build your own integration</h2>
          <p>Create your own integration with the Acme API and send it in to the directory.</p>
          <a className="lr-btn lr-btn--40 lr-btn--primary" href="#build">
            Start building
          </a>
        </section>
      </div>
    </SitePage>
  );
}
