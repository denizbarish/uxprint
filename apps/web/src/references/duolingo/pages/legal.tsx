"use client";

import type { ReactNode } from "react";
import { BlueBar, Shell } from "../chrome";
import { filler, phrase } from "../filler";
import "./legal.css";

type Block = number | ["h4" | "li", number];

/**
 * Block outline of the representative page (/terms): heading length, then each block's length.
 * A bare number is a paragraph, ["h4", n] a sub-heading, ["li", n] a bullet. Text is ours.
 */
const SECTIONS: [number, Block[]][] = [
  [7, [1133, 276]],
  [34, [292]],
  [30, [352]],
  [16, [258]],
  [12, [571]],
  [35, [758, 448]],
  [21, [1079, 588]],
  [27, [625]],
  [15, [3237]],
  [16, [["h4", 17], 633, ["h4", 12], 412, 360, 304, ["h4", 14], 795]],
  [18, [465]],
  [13, [559]],
  [38, [683, 471]],
  [44, [1058]],
  [54, [1278, 276]],
  [11, [368]],
  [60, [1379]],
  [10, [509]],
  [7, [184]],
  [20, [301, ["h4", 14], 143, 511, 244, ["h4", 24], ["li", 131], ["li", 309], ["li", 164], ["h4", 53], 188, 478, ["h4", 39], 128, 45, 99, 87, 141, 404]],
  [62, [310, ["li", 140], ["li", 72], ["li", 146], ["li", 50], ["li", 143], ["li", 199], 173, 79, 200, 338, ["li", 38], ["li", 170], ["li", 152], ["li", 411], 424, 402]],
  [13, [252]],
  [15, [428]],
  [32, [193, 864, 709, 183, 605, 232, 200]],
  [8, [175]],
  [19, [349]],
  [43, [432]],
  [13, [876]],
];

function Blocks({ blocks, seed }: { blocks: Block[]; seed: number }) {
  const out: ReactNode[] = [];
  let bullets: number[] = [];
  const flush = (key: number) => {
    if (!bullets.length) return;
    out.push(
      <ul key={`u${key}`} className="dl-legal__ul">
        {bullets.map((length, index) => (
          <li key={index}>{filler(length, seed + index)}</li>
        ))}
      </ul>,
    );
    bullets = [];
  };
  blocks.forEach((block, index) => {
    if (Array.isArray(block) && block[0] === "li") {
      bullets.push(block[1]);
      return;
    }
    flush(index);
    if (Array.isArray(block)) out.push(<h4 key={index}>{phrase(block[1], seed + index)}</h4>);
    else out.push(<p key={index}>{filler(block, seed + index * 3)}</p>);
  });
  flush(blocks.length);
  return <>{out}</>;
}

/** Long legal document on the blue catalogue bar (measured on /terms; /privacy and /guidelines share it). */
export function LegalScreen() {
  return (
    <Shell>
      <BlueBar />
      <main className="dl-legal">
        <article className="dl-legal__card">
          <h1 className="dl-legal__title">Terms of Use for the Acme Service</h1>
          <p className="dl-legal__intro">
            <strong>{filler(95, 2)}</strong>
          </p>
          <ol className="dl-legal__list">
            {SECTIONS.map(([heading, blocks], index) => (
              <li key={index}>
                <h3>{phrase(heading, index * 5 + 1)}</h3>
                <Blocks blocks={blocks} seed={index * 7} />
              </li>
            ))}
          </ol>
        </article>
      </main>
    </Shell>
  );
}
