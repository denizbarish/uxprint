"use client";

import { Chevron, SearchGlyph, Shell } from "../chrome";
import { Media } from "../parts";
import { headline, text } from "../text";
import { LocalNav } from "./detail";
import "./news.css";

const DATE = "Month 00, 2026";

type FeedTile = {
  size: "hero" | "half" | "third";
  eyebrow: string;
  title: number;
  seed: number;
  quick?: boolean;
};

/** Feed order and headline lengths follow the original's line counts at 1440 and 390. */
const FEED: FeedTile[] = [
  { size: "hero", eyebrow: "UPDATE", title: 28, seed: 600 },
  { size: "half", eyebrow: "UPDATE", title: 58, seed: 601 },
  { size: "half", eyebrow: "UPDATE", title: 70, seed: 602 },
  { size: "third", eyebrow: "UPDATE", title: 54, seed: 603 },
  { size: "third", eyebrow: "QUICK READ", title: 46, seed: 604, quick: true },
  { size: "third", eyebrow: "PRESS RELEASE", title: 36, seed: 605 },
];

type LoopCard = {
  kind: "split" | "full";
  dark: boolean;
  author: string;
  quote: number;
};

const LOOP: LoopCard[] = [
  { kind: "split", dark: true, author: "Sam Rivera", quote: 44 },
  { kind: "full", dark: true, author: "Sam Rivera", quote: 0 },
  { kind: "split", dark: false, author: "Sam Rivera", quote: 58 },
  { kind: "split", dark: false, author: "Ada Okafor", quote: 170 },
  { kind: "full", dark: true, author: "Sam Rivera", quote: 0 },
  { kind: "full", dark: true, author: "Lee Hart", quote: 0 },
  { kind: "split", dark: false, author: "Ada Okafor", quote: 90 },
];

const STORIES = [
  { tag: "MAKERS", title: 58 },
  { tag: "BUILDERS", title: 70 },
  { tag: "LEARNING", title: 66 },
  { tag: "MAKERS", title: 68 },
];

const MORE = [
  { tag: "PRESS RELEASE", title: 74 },
  { tag: "PRESS RELEASE", title: 50 },
  { tag: "PRESS RELEASE", title: 38 },
  { tag: "PRESS RELEASE", title: 74 },
  { tag: "QUICK READ", title: 50 },
  { tag: "PRESS RELEASE", title: 38 },
  { tag: "PHOTOS", title: 50 },
  { tag: "UPDATE", title: 74 },
];

function Controls({ count, view }: { count: number; view?: string }) {
  return (
    <>
      <div className="ap-nr-controls">
        <ul className="ap-nr-dots">
          {Array.from({ length: count }, (_, index) => (
            <li key={index}>
              <a
                href="#"
                aria-label={`Page ${index + 1}`}
                aria-current={index === 0 ? "true" : undefined}
              />
            </li>
          ))}
        </ul>
        <div className="ap-nr-paddles">
          <button type="button" aria-label="Previous" disabled>
            <Chevron dir="left" />
          </button>
          <button type="button" aria-label="Next">
            <Chevron />
          </button>
        </div>
      </div>
      {view ? (
        <div className="ap-nr-center ap-nr-center--phone">
          <a href="#" className="ap-nr-pill">
            {view}
          </a>
        </div>
      ) : null}
    </>
  );
}

/** Press room index (newsroom survey page): grey feed, story gallery, white stories module, two-column archive list. */
export function NewsScreen() {
  return (
    <Shell
      dark
      localNav={
        <LocalNav
          title="Press Room"
          links={["Services Desk", "Our Stories"]}
          buy={false}
          solid
          extra={
            <a href="#" className="ap-nr-search">
              <SearchGlyph />
              <span className="ap-nr-search__long">Search Press Room</span>
              <span className="ap-nr-search__short">Search</span>
            </a>
          }
        />
      }
      notes={null}
      crumb="Press Room"
    >
      <h1 className="ap-visually-hidden">Press Room</h1>
      <section className="ap-nr ap-nr--feed" aria-labelledby="nr-latest">
        <div className="ap-nr__wrap">
          <h2 id="nr-latest" className="ap-nr__head">
            Latest News
          </h2>
          <ul className="ap-nr-feed">
            {FEED.map((tile, index) => (
              <li
                key={index}
                className={`ap-nr-tile ap-nr-tile--${tile.size}${tile.quick ? " ap-nr-tile--quick" : ""}`}
              >
                <a href="#" className="ap-nr-tile__link">
                  <Media className="ap-nr-tile__media" />
                  <div className="ap-nr-tile__copy">
                    <p className="ap-nr-tile__eyebrow">{tile.eyebrow}</p>
                    <h3 className="ap-nr-tile__title">
                      {headline(tile.title, tile.seed)}
                    </h3>
                    <p className="ap-nr-tile__date">
                      {index === 0
                        ? "00 h 00 min ago"
                        : index < 3
                          ? "0 days ago"
                          : DATE}
                    </p>
                  </div>
                </a>
                {tile.quick ? (
                  <button
                    type="button"
                    className="ap-nr-tile__open"
                    aria-label="Open quick read"
                  >
                    <span aria-hidden="true">+</span>
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ap-nr ap-nr--loop" aria-labelledby="nr-loop">
        <div className="ap-nr__wrap">
          <div className="ap-nr-loop__head">
            <h2 id="nr-loop" className="ap-nr__head">
              In the Loop
            </h2>
            <a href="#" className="ap-nr-pill ap-nr-pill--desk">
              View All
            </a>
          </div>
        </div>
        <ul className="ap-nr-loop">
          {LOOP.map((card, index) => (
            <li
              key={index}
              className={`ap-nr-loop__card ap-nr-loop__card--${card.kind}${card.dark ? " ap-nr-loop__card--dark" : ""}`}
            >
              <Media className="ap-nr-loop__media" dark={card.dark} />
              <div className="ap-nr-loop__content">
                <div className="ap-nr-loop__author">
                  <Media className="ap-nr-loop__avatar" />
                  {card.author}
                </div>
                {card.quote ? (
                  <p className="ap-nr-loop__quote">
                    {text(card.quote, index + 640)}
                  </p>
                ) : null}
                <p className="ap-nr-loop__date">{DATE}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="ap-nr__wrap">
          <Controls count={3} view="View All" />
        </div>
      </section>

      <section className="ap-nr ap-nr--stories" aria-labelledby="nr-stories">
        <div className="ap-nr__wrap">
          <div className="ap-nr-lockup">
            <h2 id="nr-stories" className="ap-visually-hidden">
              Our Stories
            </h2>
            <Media className="ap-nr-lockup__mark" />
            <p className="ap-nr-lockup__sub">
              The people building, teaching and making things that leave their
              towns a little better.
            </p>
          </div>
          <ul className="ap-nr-stories">
            {STORIES.map((story, index) => (
              <li
                key={index}
                className={`ap-nr-story${index === 0 ? " ap-nr-story--lead" : ""}`}
              >
                <a href="#" className="ap-nr-story__link">
                  <Media className="ap-nr-story__media" dark />
                  <div className="ap-nr-story__copy">
                    <p className="ap-nr-story__tag">{story.tag}</p>
                    <h3 className="ap-nr-story__title">
                      {headline(story.title, index + 660)}
                    </h3>
                    <p className="ap-nr-story__date">{DATE}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
          <div className="ap-nr-stories__phone">
            <Controls count={4} />
          </div>
          <div className="ap-nr-center">
            <a href="#" className="ap-nr-pill ap-nr-pill--light">
              View All
            </a>
          </div>
        </div>
      </section>

      <section className="ap-nr ap-nr--more" aria-labelledby="nr-more">
        <div className="ap-nr__wrap">
          <h2 id="nr-more" className="ap-nr__head">
            More from the Press Room
          </h2>
          <ul className="ap-nr-list">
            {MORE.map((item, index) => (
              <li key={index}>
                <a href="#" className="ap-nr-list__link">
                  <Media className="ap-nr-list__media" />
                  <div className="ap-nr-list__copy">
                    <p className="ap-nr-tile__eyebrow">{item.tag}</p>
                    <h3 className="ap-nr-list__title">
                      {headline(item.title, index + 680)}
                    </h3>
                    <p className="ap-nr-list__date">{DATE}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
          <div className="ap-nr-center ap-nr-center--archive">
            <a href="#" className="ap-nr-pill">
              View Archive
            </a>
          </div>
        </div>
      </section>
    </Shell>
  );
}
