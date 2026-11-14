"use client";

import { useState } from "react";
import { Page } from "../chrome";
import { Btn, Icon, Media } from "../ui";
import "./listing.css";

const filters = ["All", "Engineering", "Community", "Company News", "Customers", "Studio", "Security", "Updates", "Newsroom"];

const featured = [
  { date: "12 November", tag: "Engineering", title: "Jobs SDK 5: made for production", text: "Jobs SDK 5 is quicker, safe by default, and runs across regions with failover.", by: "Rita Ames, Paul Weiss", faces: 2 },
  { date: "9 November", tag: "General", title: "Small models now take a quarter of all calls; one lab wins new teams 2 to 1", text: "Model Router index for November. Each month the router handles more than 100 trillion tokens for apps and labs. That traffic gives us a view of what teams pick.", by: "Ana Clark, Hari Arun", faces: 2 },
  { date: "28 October", tag: "General", title: "Meet Acme Pipelines", text: "Pipelines run only the checks your change touches, on compute sized to the push.", by: "Tony Shaw, Jeff Ames, and 1 other", faces: 3 },
];

const posts = [
  ["4 November", "Engineering", "Meet Acme Schedules", "Elliot Dale, Casey Gore, and 4 others", 3],
  ["3 November", "Customers", "How Bluebird turns ideas into working software in hours with Acme", "Susan Aziz", 1],
  ["3 November", "Customers", "How Lumen ships internal apps and billions of tokens on one platform", "Susan Aziz", 1],
  ["3 November", "Customers", "How Northwind scales search for 650K readers", "Susan Aziz", 1],
  ["2 November", "Security", "Meet Acme Security Review", "Nate Grady, Karim Rahal", 2],
  ["30 October", "General", "Simpler runtime caching on Acme", "Yvonne Zhou, Kelly Davis, and 1 other", 3],
  ["30 October", "General", "Meet our new serif typeface", "Eva Rabe, Mark Davis", 2],
  ["28 October", "General", "Meet virtual models on Model Router", "Rohan Tan, Walter Korn, and 3 others", 3],
  ["27 October", "General", "A voice lab on Model Router", "Kevin Dawes, Zach Chen, and 2 others", 3],
  ["23 October", "General", "How the Acme Assistant reaches production safely", "Tom Dale", 1],
  ["23 October", "Customers", "How Harbor serves 50 million requests a month on Acme", "Susan Aziz, Kevin Sund", 2],
  ["22 October", "General", "The end of long-lived static secrets", "Malte Ubl", 1],
] as const;

function Faces({ count }: { count: number }) {
  return (
    <span className="vc-list-faces" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <Media key={i} tone="avatar" className="vc-list-faces__one" />
      ))}
    </span>
  );
}

/** Blog and update list template, built from /blog. */
export function ListingScreen() {
  const [active, setActive] = useState("All");
  return (
    <Page>
      <div className="vc-list-head">
        <h1 className="vc-h48">Journal</h1>
        <div className="vc-list-bar">
          <nav aria-label="Categories" className="vc-list-filters">
            {filters.map((filter) => (
              <a
                key={filter}
                href="#"
                aria-current={active === filter ? "page" : undefined}
                className="vc-list-filter vc-focus"
                onClick={(event) => {
                  event.preventDefault();
                  setActive(filter);
                }}
              >
                {filter}
              </a>
            ))}
          </nav>
          <label className="vc-list-search">
            <Icon name="search" size={14} />
            <span className="vc-sr">Search posts</span>
            <input type="search" placeholder="Search..." />
          </label>
          <a href="#" className="vc-list-rss vc-focus" aria-label="Feed">
            <Icon name="rss" />
          </a>
        </div>
      </div>
      <section className="vc-list-featured" aria-label="Featured articles">
        {featured.map((post) => (
          <a key={post.title} href="#" className="vc-list-feature vc-focus">
            <span className="vc-list-meta">
              <time>{post.date}</time>
              <span>{post.tag}</span>
            </span>
            <h2 className="vc-h32 vc-list-feature__title">{post.title}</h2>
            <span className="vc-list-feature__text">{post.text}</span>
            <span className="vc-list-by">
              <Faces count={post.faces} />
              {post.by}
            </span>
          </a>
        ))}
      </section>
      <section className="vc-list-grid" aria-label="Posts">
        {posts.map(([date, tag, title, by, faces]) => (
          <a key={title} href="#" className="vc-list-post vc-focus">
            <span className="vc-list-meta">
              <time>{date}</time>
              <span>{tag}</span>
            </span>
            <h3 className="vc-h24 vc-list-post__title">{title}</h3>
            <span className="vc-list-by">
              <Faces count={faces} />
              {by}
            </span>
          </a>
        ))}
      </section>
      <div className="vc-list-more">
        <Btn size={36} pill as="button">
          Show more posts
        </Btn>
      </div>
      <section className="vc-list-split" aria-labelledby="list-stacks">
        <div>
          <h2 className="vc-h32" id="list-stacks">
            Reference Stacks
          </h2>
          <p className="vc-lead">Pick a stack and work through the choices behind it, with picked guides, docs, starters, and courses to help you build.</p>
        </div>
        <div className="vc-list-links">
          <ul>
            <li>
              <a href="#">Agent kit</a>: Build and run agents with models, tools, and lasting jobs.
            </li>
            <li>
              <a href="#">Web apps</a>: Choose rendering, data, sign-in, and caching paths.
            </li>
            <li>
              <a href="#">Services</a>: Pick a runtime, link services, and run background work.
            </li>
          </ul>
          <a href="#" className="vc-list-links__all">
            See all stacks
          </a>
        </div>
      </section>
      <section className="vc-list-split vc-list-split--last" aria-labelledby="list-prompts">
        <div>
          <h2 className="vc-h32" id="list-prompts">
            Build with prompts
          </h2>
          <p className="vc-lead">Make an app, extend an agent, or improve your project with ready to use prompts for your build agent.</p>
        </div>
        <p className="vc-list-links vc-list-links--inline">
          <a href="#">Browse the prompt library</a> · <a href="#">Read the plain text index</a>
        </p>
      </section>
    </Page>
  );
}
