"use client";

import { MarketingShell } from "../chrome";
import { filler } from "../filler";
import { Prose } from "../parts";
import "./legal.css";

/**
 * Block outline of the measured policy page: kind and character count per block, no original text.
 * p = paragraph, b = bold lead line, i = italic paragraph, a = paragraph with an inline link, ul = list item lengths.
 */
type Block = ["p", number] | ["b", number] | ["i", number] | ["a", number, number] | ["ul", number[]];

const BLOCKS: Block[] = [
  ["p", 31],
  ["p", 309],
  ["p", 520],
  ["p", 342],
  ["p", 55],
  ["ul", [71, 58]],
  ["b", 51],
  ["a", 125, 4],
  ["b", 52],
  ["b", 13],
  ["p", 187],
  ["p", 105],
  ["a", 24, 17],
  ["b", 38],
  ["a", 207, 39],
  ["p", 610],
  ["p", 215],
  ["b", 68],
  ["a", 205, 39],
  ["b", 74],
  ["i", 133],
  ["p", 572],
  ["b", 60],
  ["i", 305],
  ["p", 358],
  ["b", 59],
  ["i", 154],
  ["p", 516],
  ["b", 41],
  ["i", 266],
  ["p", 615],
  ["a", 300, 31],
  ["ul", [410, 400, 140]],
  ["p", 227],
  ["p", 144],
  ["a", 389, 20],
  ["p", 99],
  ["b", 85],
  ["a", 265, 103],
  ["b", 23],
  ["p", 159],
  ["a", 169, 17],
  ["b", 30],
  ["p", 365],
  ["b", 19],
  ["p", 197],
  ["b", 13],
  ["a", 224, 17],
];

function LinkedParagraph({ length, link, seed }: { length: number; link: number; seed: number }) {
  const before = Math.max(0, Math.floor((length - link) / 2));
  return (
    <p>
      {filler(before, seed)} <a href="#">{filler(link, seed + 50)}</a> {filler(Math.max(0, length - link - before - 2), seed + 90)}
    </p>
  );
}

function renderBlock(block: Block, index: number) {
  switch (block[0]) {
    case "p":
      return <p key={index}>{filler(block[1], index)}</p>;
    case "b":
      return (
        <p key={index}>
          <strong>{filler(block[1], index)}</strong>
        </p>
      );
    case "i":
      return (
        <p key={index}>
          <em>{filler(block[1], index)}</em>
        </p>
      );
    case "a":
      return <LinkedParagraph key={index} length={block[1]} link={block[2]} seed={index} />;
    case "ul":
      return (
        <ul key={index} className="bu-legal__list">
          {block[1].map((length, item) => (
            <li key={item}>{filler(length, index * 10 + item)}</li>
          ))}
        </ul>
      );
  }
  return block satisfies never;
}

export function LegalScreen() {
  return (
    <MarketingShell tone="clear" className="bu-legal">
      <Prose>
        <h1>Privacy and cookie notice</h1>
        {BLOCKS.map(renderBlock)}
      </Prose>
    </MarketingShell>
  );
}
