"use client";

import type { CSSProperties } from "react";
import { Shell } from "../chrome";
import { albums, artists, credit, pick, tracks } from "../data";
import { GridShelf, type CardSpec } from "../parts";
import { PinIcon } from "../icons";
import "./pages.css";

/* Region hub (measured on /popular-in/tr): 276px colour hero with a line, location chip, four grid shelves. */

const tone = "rgb(21, 156, 100)";
const range = (count: number) => Array.from({ length: count }, (_, index) => index);

const charts: CardSpec[] = range(4).map((index) => ({ subtitle: index % 2 ? "A daily roundup of the tracks played most right now." : "A weekly roundup of the tracks played most this week." }));
const regionAlbums: CardSpec[] = range(5).map((index) => ({ title: pick(albums, index + 4), subtitle: credit(index + 8) }));
const regionArtists: CardSpec[] = range(5).map((index) => ({ title: pick(artists, index + 2), subtitle: "Artist", round: true }));
const regionTracks: CardSpec[] = range(5).map((index) => ({ title: pick(tracks, index + 12), subtitle: credit(index + 3, index === 1 ? 2 : 1) }));

export function RegionScreen() {
  return (
    <Shell tone={tone}>
      <header className="sp-hub-hero sp-hub-hero--tall" style={{ "--tone": tone } as CSSProperties}>
        <h1>Loved in Eastland</h1>
        <p>See what the whole region is playing today.</p>
      </header>
      <div className="sp-hub-body sp-region-body" style={{ "--tone": tone } as CSSProperties}>
        <div className="sp-hub-wash" aria-hidden="true" />
        <a className="sp-location" href="#">
          <PinIcon />
          Eastland
        </a>
        <GridShelf title="Top lists in Eastland" cards={charts} seed={50} />
        <GridShelf title="Big records in Eastland" cards={regionAlbums} seed={30} />
        <GridShelf title="Artists loved in Eastland" cards={regionArtists} seed={20} />
        <GridShelf title="Rising tracks in Eastland" cards={regionTracks} seed={10} />
      </div>
    </Shell>
  );
}
