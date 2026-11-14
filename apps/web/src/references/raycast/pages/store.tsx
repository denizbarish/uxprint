"use client";

import { useState } from "react";
import { Shell } from "../chrome";
import { ExtensionCard, FeaturedCard, Pagination, StoreSearch, type Extension } from "../store-parts";
import "./store.css";

export const FEATURED: [Extension, string][] = [
  [{ name: "Face Search", text: "Search and copy different text faces and symbols to the clipboard.", author: "Mira Holt", installs: "" }, "#00b3ff"],
  [{ name: "Can It Run", text: "Up-to-date support tables for front-end web technologies in every browser.", author: "Theo Lamb", installs: "" }, "#59d499"],
  [{ name: "Tidy", text: "Deep clean and optimize your desktop", author: "Jun Park", installs: "" }, "#ffc531"],
];

export const EXTENSIONS: Extension[] = [
  { name: "Stop Process", text: "Terminate processes sorted by CPU or memory usage", author: "Rory Lane", installs: "806,706" },
  { name: "Color Picker", text: "Pick and organize colors, everywhere on your desktop", author: "Tess Moran", installs: "641,866", commands: 9 },
  { name: "Browser Tabs", text: "Search open tabs, bookmarks and history in your browser.", author: "Cody Fern", installs: "591,096", commands: 11, platform: true },
  { name: "Translate", text: "Simple translation between dozens of languages", author: "Slava Nik", installs: "516,838", commands: 7 },
  { name: "Music Player", text: "The most common player features, now at your fingertips. Search for music and podcasts, browse your library, and control the playback.", author: "Artem Kon", installs: "509,846", commands: 35 },
  { name: "Code Editor", text: "Control your code editor and compatible editors directly from the launcher", author: "Tess Moran", installs: "428,549", commands: 7 },
  { name: "Issues", text: "Bring your issue tracker to every corner of your desktop. Create, search, and modify your issues.", author: "Lin Ear", installs: "416,214", commands: 14 },
  { name: "Team Chat", text: "Search for chats, see unread messages, snooze notifications, and set your presence status.", author: "Momo Lee", installs: "346,366", commands: 9 },
  { name: "Packages", text: "Search, install and manage package formulae and casks", author: "John Buck", installs: "306,300", commands: 12, platform: true },
  { name: "Notes Pages", text: "The fastest way to search, create and update your pages.", author: "Nola Tan", installs: "291,126", commands: 6 },
];

const SORTS = ["All Extensions", "Recently Added", "Most Popular"];

function Sorting() {
  const [sort, setSort] = useState(SORTS[0]);
  return (
    <div className="rc-store__sorting" role="radiogroup" aria-label="Sort extensions">
      {SORTS.map((name) => (
        <button key={name} type="button" role="radio" aria-checked={name === sort} onClick={() => setSort(name)}>
          {name}
        </button>
      ))}
    </div>
  );
}

function Platforms() {
  const [platform, setPlatform] = useState("All");
  return (
    <div className="rc-store__platforms" role="radiogroup" aria-label="Platform">
      {["All", "Desktop", "Windows"].map((name) => (
        <button key={name} type="button" role="radio" aria-checked={name === platform} aria-label={name} onClick={() => setPlatform(name)}>
          {name === "All" ? "All" : <span className="rc-store__platform-icon" aria-hidden="true" />}
        </button>
      ))}
    </div>
  );
}

/** Store landing template (measured on /store). */
export function StoreScreen() {
  return (
    <Shell className="rc-store-page">
      <div className="rc-store__art rc-media" data-compare-mask="" aria-hidden="true" />
      <section className="rc-store__hero">
        <h1>Store</h1>
        <p>Sprinkle a little magic on your day. Connect your tools, and take your daily workflow to the next level.</p>
        <StoreSearch className="rc-store__hero-search" />
      </section>
      <div className="rc-store">
        <header className="rc-store__explore">
          <h2>Explore</h2>
          <p>Browse and install extensions built by the community</p>
        </header>
        <div className="rc-store__head">
          <h3>Featured</h3>
          <p>Our top picks to get you started</p>
        </div>
        <div className="rc-store__featured">
          {FEATURED.map(([item, tint]) => (
            <FeaturedCard key={item.name} item={item} tint={tint} />
          ))}
        </div>
        <div className="rc-store__controls">
          <Sorting />
          <div className="rc-store__filters">
            <Platforms />
            <StoreSearch className="rc-store__search" />
          </div>
        </div>
        <div className="rc-store__head">
          <h3>Extensions</h3>
          <p>Explore the library and discover the incredible work of our community</p>
        </div>
        <div className="rc-store__grid">
          {EXTENSIONS.map((item) => (
            <ExtensionCard key={item.name} item={item} />
          ))}
        </div>
        <div className="rc-store__pages">
          <Pagination last={357} />
        </div>
      </div>
    </Shell>
  );
}
