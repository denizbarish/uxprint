"use client";

import { useState } from "react";
import { Shell, useBrand } from "../chrome";
import { filler } from "../filler";
import "./blog.css";

const FILTERS = ["All Posts", "News", "Company", "Craft", "Resources"];

const DATES = ["JULY 1, 2026", "MAY 14, 2026", "APRIL 2, 2026", "MARCH 9, 2026", "JANUARY 20, 2026", "NOVEMBER 4, 2025"];

function usePosts(brand: string): string[] {
  return [
    "Meet Lumen",
    "A Technical Deep Dive Into Our New Release",
    "The New Release",
    "Introducing Lumen",
    `${brand} for Windows`,
    `${brand} for Phones`,
    `Meet the new ${brand} Notes`,
    "Our next funding round brings new platforms",
    "Introducing our Referral Program",
    "The Video Team",
    "One window, many models",
    "Top Extension Picks for Writers",
    "How the API and extensions work together",
    `Introducing ${brand} Pro`,
    "Launch Week Recap",
    "Making our extension API more capable",
    `Bringing ${brand} to Teams`,
    "A fresh look and feel",
    "We build every Friday",
    "Why all of us earn the same salary, wherever we work",
    "Our first round to make work feel lighter",
    "Making a Desktop Wallpaper",
    "Fewer reviews by default",
    "Getting started with custom commands",
    "Listen to feedback, not just the metrics",
    "Monthly focus notes instead of long roadmaps",
    "Inputs for Custom Commands",
    "Automate your desktop with code",
    "Hello World",
  ];
}

function Meta({ authors, date }: { authors: number; date: string }) {
  return (
    <div className="rc-blog__meta">
      <span className="rc-blog__authors">
        {Array.from({ length: authors }, (_, index) => (
          <span key={index} className="rc-blog__avatar" data-compare-mask="" />
        ))}
      </span>
      <time>{date}</time>
    </div>
  );
}

/** Blog index template (measured on /blog). */
export function BlogScreen() {
  const brand = useBrand();
  const posts = usePosts(brand);
  const [filter, setFilter] = useState(FILTERS[0]);
  return (
    <Shell>
      <div className="rc-blog">
        <h1 className="rc-blog__title">Blog</h1>
        <a href="#" className="rc-blog__featured">
          <span className="rc-blog__image rc-media rc-media--glow" data-compare-mask="" />
          <span className="rc-blog__details">
            <h2>Why We&apos;re Changing How {brand} AI Is Priced</h2>
            <p>{filler(110, 3)}</p>
            <Meta authors={1} date="SEPTEMBER 10, 2026" />
          </span>
        </a>
        <div className="rc-blog__bar">
          <ul className="rc-blog__filters" aria-label="Filter posts">
            {FILTERS.map((name) => (
              <li key={name}>
                <button type="button" aria-pressed={name === filter} onClick={() => setFilter(name)}>
                  {name}
                </button>
              </li>
            ))}
          </ul>
          <a href="#" className="rc-blog__rss" aria-label="RSS feed">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="3.5" cy="12.5" r="1.5" fill="currentColor" />
              <path d="M2 7a7 7 0 0 1 7 7M2 2.5A11.5 11.5 0 0 1 13.5 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </a>
        </div>
        <ul className="rc-blog__grid">
          {posts.map((title, index) => (
            <li key={title}>
              <a href="#" className="rc-blog__card">
                <h2>{title}</h2>
                <p>{filler(90, index + 7)}</p>
                <Meta authors={index % 3 === 0 ? 2 : 1} date={DATES[index % DATES.length] ?? ""} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}
