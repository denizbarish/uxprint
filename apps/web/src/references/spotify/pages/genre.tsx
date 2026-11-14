"use client";

import type { CSSProperties } from "react";
import { Shell } from "../chrome";
import { ShelfHeader, Tile } from "../parts";
import "./pages.css";

/* Genre (measured on /genre/podcasts-web): 270px colour hero, wash, a 4-column grid of 9 category tiles. */

const tone = "rgb(39, 133, 106)";
const tiles: [string, string][] = [
  ["Learning", "rgb(71, 125, 149)"],
  ["True stories", "rgb(80, 55, 80)"],
  ["Laughs", "rgb(175, 40, 150)"],
  ["Culture talk", "rgb(220, 20, 140)"],
  ["Health & Movement", "rgb(39, 133, 106)"],
  ["Famous faces", "rgb(119, 119, 119)"],
  ["Games", "rgb(13, 115, 236)"],
  ["Cinema", "rgb(30, 50, 100)"],
  ["Reading", "rgb(80, 55, 80)"],
];

export function GenreScreen() {
  return (
    <Shell tone={tone}>
      <header className="sp-hub-hero" style={{ "--tone": tone } as CSSProperties}>
        <h1>Talk shows</h1>
      </header>
      <div className="sp-hub-body sp-hub-body--genre" style={{ "--tone": tone } as CSSProperties}>
        <div className="sp-hub-wash" aria-hidden="true" />
        <section className="sp-shelf" aria-label="Topics">
          <ShelfHeader title="Topics" more={null} />
          <ul className="sp-tiles">
            {tiles.map(([label, color], index) => (
              <li key={label}>
                <Tile label={label} color={color} index={index} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Shell>
  );
}
