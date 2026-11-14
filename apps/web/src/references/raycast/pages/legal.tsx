"use client";

import { Shell } from "../chrome";
import { filler, phrase } from "../filler";
import "./legal.css";

/**
 * Block outline of the representative page (/privacy): tag, character count, and whether a paragraph
 * opens with a bold lead-in. Lists carry one count per item. Read with scratch doc.mjs; text is ours.
 */
type Block = ["p" | "h2" | "h3", number, number?] | ["ul", number[]];

const BLOCKS: Block[] = [
  ["p", 527, 0], ["p", 460, 0], ["p", 269, 0], ["p", 542, 0], ["h2", 27], ["h3", 31],
  ["p", 169, 1], ["p", 181, 1], ["p", 616, 1], ["p", 328, 1], ["p", 234, 1], ["p", 150, 1], ["p", 605, 1],
  ["p", 375, 1], ["p", 929, 1], ["h3", 43], ["p", 449, 1], ["p", 248, 1], ["h3", 23], ["p", 337], ["p", 389],
  ["p", 214], ["p", 306], ["h3", 38], ["p", 74], ["p", 58], ["h2", 27], ["p", 48],
  ["ul", [315, 209, 235, 590, 246, 529, 640, 346, 235]], ["h2", 42], ["p", 95], ["ul", [1048, 214, 566, 244, 572]],
  ["p", 119], ["h2", 38], ["p", 808], ["h2", 31], ["p", 358], ["p", 570], ["h2", 43], ["p", 331], ["p", 92],
  ["h2", 26], ["p", 470, 1], ["p", 236, 1], ["ul", [178, 177, 62, 416, 94]], ["p", 487], ["p", 448, 1],
  ["p", 231, 1], ["h2", 10], ["p", 427], ["p", 347], ["p", 341], ["h2", 11], ["p", 361], ["h2", 27],
  ["p", 513, 1], ["h2", 12], ["p", 582], ["p", 487], ["h2", 29], ["p", 488], ["h2", 14], ["p", 169], ["p", 250],
];

function Paragraph({ length, lead, seed }: { length: number; lead: boolean; seed: number }) {
  if (!lead) return <p>{filler(Math.round(length * 1.03), seed)}</p>;
  const title = `${phrase(14, seed + 3)}:`;
  return (
    <p>
      <strong>{title}</strong> {filler(Math.max(Math.round(length * 1.03) - title.length - 1, 10), seed)}
    </p>
  );
}

export function LegalScreen() {
  let section = 0;
  return (
    <Shell>
      <article className="rc-legal">
        <h1 className="rc-legal__title">Privacy Policy</h1>
        <p className="rc-legal__date">Last Updated: March 4, 2026</p>
        <div className="rc-legal__body">
          {BLOCKS.map((block, index) => {
            switch (block[0]) {
              case "p":
                return <Paragraph key={index} length={block[1]} lead={block[2] === 1} seed={index} />;
              case "h2":
                section += 1;
                return <h2 key={index}>{`${section}. ${phrase(Math.max(block[1] - 3, 6), index)}`}</h2>;
              case "h3":
                return <h3 key={index}>{phrase(block[1], index)}</h3>;
              case "ul":
                return (
                  <ul key={index}>
                    {block[1].map((length, item) => (
                      <li key={item}>
                        <strong>{`${phrase(14, index + item)}.`}</strong> {filler(Math.round(length * 1.03) - 16, index + item)}
                      </li>
                    ))}
                  </ul>
                );
              default:
                return block satisfies never;
            }
          })}
        </div>
      </article>
    </Shell>
  );
}
