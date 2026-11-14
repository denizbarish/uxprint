"use client";

import { useState, type CSSProperties } from "react";
import "./store-parts.css";

export type Extension = { name: string; text: string; author: string; installs: string; commands?: number; platform?: boolean };

/** Search trigger with its keyboard hint, as on the store pages. */
export function StoreSearch({ className }: { className?: string }) {
  return (
    <button type="button" className={`rc-store-search${className ? ` ${className}` : ""}`} aria-keyshortcuts="Meta+K">
      Search...
      <span className="rc-store-search__keys" aria-hidden="true">
        <kbd>⌘</kbd>
        <kbd>K</kbd>
      </span>
    </button>
  );
}

function Author({ name }: { name: string }) {
  return (
    <span className="rc-ext__author">
      <span className="rc-ext__avatar" data-compare-mask="" />
      {name}
    </span>
  );
}

export function FeaturedCard({ item, tint }: { item: Extension; tint: string }) {
  return (
    <a href="#" className="rc-featured">
      <span className="rc-featured__frame" style={{ "--tint": tint } as CSSProperties}>
        <span className="rc-featured__icon" data-compare-mask="" />
      </span>
      <h2>{item.name}</h2>
      <p>{item.text}</p>
      <Author name={item.author} />
      <span className="rc-store-btn">Install Extension</span>
    </a>
  );
}

export function ExtensionCard({ item }: { item: Extension }) {
  return (
    <a href="#" className="rc-ext">
      <span className="rc-ext__head">
        <span className="rc-ext__icon" data-compare-mask="" />
        <span className="rc-ext__name">{item.name}</span>
        <span className="rc-store-btn">Install</span>
      </span>
      <p className="rc-ext__text">{item.text}</p>
      <span className="rc-ext__meta">
        <Author name={item.author} />
        {item.commands ? (
          <span className="rc-ext__stat">
            <span className="rc-ext__glyph" aria-hidden="true" />
            {item.commands} Commands
          </span>
        ) : null}
        <span className="rc-ext__stat">
          <span className="rc-ext__glyph rc-ext__glyph--down" aria-hidden="true" />
          {item.installs}
        </span>
        {item.platform ? (
          <span className="rc-ext__stat">
            <span className="rc-ext__glyph" aria-hidden="true" />
            Desktop only
          </span>
        ) : null}
      </span>
    </a>
  );
}

/** Numbered pagination shared by the store and changelog templates. */
export function Pagination({ last }: { last: number }) {
  const [page, setPage] = useState(1);
  const pages = Array.from({ length: Math.min(last, 5) }, (_, index) => index + 1);
  return (
    <nav className="rc-pages" aria-label="Pagination">
      {pages.map((value) => (
        <a
          key={value}
          href="#"
          aria-current={value === page ? "page" : undefined}
          onClick={(event) => {
            event.preventDefault();
            setPage(value);
          }}
        >
          {value}
        </a>
      ))}
      {last > 5 ? (
        <>
          <span className="rc-pages__gap" aria-hidden="true" />
          <a href="#">{last}</a>
        </>
      ) : null}
      <a href="#" aria-label="Next page" className="rc-pages__next">
        <svg viewBox="0 0 8 12" aria-hidden="true">
          <path d="M2 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </nav>
  );
}
