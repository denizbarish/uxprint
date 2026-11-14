"use client";

import { useId, useState } from "react";
import { ArrowRight, Shell, useBrand } from "../chrome";
import { filler } from "../filler";
import { ExtensionCard, FeaturedCard, Pagination, StoreSearch, type Extension } from "../store-parts";
import { EXTENSIONS, FEATURED } from "./store";
import "./store.css";
import "./store-category.css";

const MORE_NAMES = ["Home Links", "Dock Side", "Snippet Kit", "Hosts", "Habits", "Chat Helper", "Chapters", "Tab Finder", "Recent Projects", "Mail", "Open Folders", "Audio Writer", "Repo Tools", "Browser History", "Local Models"];

/** Category pages list 25 extensions: the store ten plus fifteen more. */
function useCategoryExtensions(): Extension[] {
  return [
    ...MORE_NAMES.map((name, index) => ({
      name,
      text: filler(index % 3 === 0 ? 70 : 45, index + 20),
      author: EXTENSIONS[index % EXTENSIONS.length]?.author ?? "",
      installs: `${(90 - index * 4) * 1000 + 412}`.replace(/(\d)(?=(\d{3})+$)/g, "$1,"),
      commands: (index % 5) + 1,
    })),
    ...EXTENSIONS,
  ];
}

function Accordion({ items }: { items: string[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();
  return (
    <div className="rc-sc__accordion">
      {items.map((title, index) => {
        const expanded = open === index;
        return (
          <div key={title} className="rc-sc__item" data-open={expanded ? "" : undefined}>
            <h2>
              <button type="button" aria-expanded={expanded} aria-controls={`${id}-${index}`} onClick={() => setOpen(expanded ? null : index)}>
                <span>{title}</span>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M4.5 6.5 8 10l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </h2>
            <div className="rc-sc__panel" id={`${id}-${index}`} role="region">
              <div>
                <p>{filler(260, index + 3)}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Store category template (measured on /store/category/productivity; the 10 category pages share it). */
export function StoreCategoryScreen() {
  const brand = useBrand();
  const extensions = useCategoryExtensions();
  return (
    <Shell>
      <div className="rc-store rc-sc">
        <header className="rc-sc__hero">
          <h1>Productivity Extensions</h1>
          <p>Maximize your productivity on the desktop with a full suite of tools built by the community</p>
        </header>
        <div className="rc-store__head rc-sc__featured-head">
          <h2>{brand}&apos;s Featured Productivity Tools</h2>
          <p>Explore essential extensions designed to streamline your workflow and boost efficiency</p>
        </div>
        <div className="rc-store__featured rc-sc__featured">
          {FEATURED.map(([item, tint]) => (
            <FeaturedCard key={item.name} item={item} tint={tint} />
          ))}
        </div>
        <div className="rc-sc__all">
          <div className="rc-store__head">
            <h2>All Productivity Extensions</h2>
            <p>Supercharge your workflow with a wide range of productivity tools</p>
          </div>
          <StoreSearch className="rc-sc__search" />
        </div>
        <div className="rc-store__grid rc-sc__grid">
          {extensions.map((item) => (
            <ExtensionCard key={item.name} item={item} />
          ))}
        </div>
        <div className="rc-store__pages rc-sc__pages">
          <Pagination last={15} />
        </div>
        <Accordion
          items={[
            `Why Should You Use Productivity Tools on ${brand}?`,
            `How to Use Productivity Tools on ${brand}`,
            "The 10 Best Productivity Tools",
            "Frequently Asked Questions",
          ]}
        />
        <div className="rc-sc__related">
          <h2>You might also be interested in...</h2>
          <a href="#">
            Project Management Extensions <ArrowRight />
          </a>
          <a href="#">
            Time management tools <ArrowRight />
          </a>
        </div>
      </div>
    </Shell>
  );
}
