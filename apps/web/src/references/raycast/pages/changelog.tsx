"use client";

import { useState, type ReactNode } from "react";
import { Shell } from "../chrome";
import { filler, phrase } from "../filler";
import { Pagination } from "../store-parts";
import "./changelog.css";

/**
 * Release bodies, measured block by block on /changelog (desktop):
 * m<h> media of h px at 760 wide, p<n> paragraph of n lines, h0/h1 section heading (h1 = with top spacing),
 * 3<h> sub heading, u<digits> list where every digit is the line count of one item.
 */
const RELEASES = [
  "m278 p4 h0 u312233241321 h1 u231113212113321312 h1 u122111222112111111212122111112221",
  "m279 p3 p1 h0 p2 m607 h1 m267 h1 u111111121 h1 u12121211111",
  "m278 p2 p5 p2 h0 m158 h1 u11111211121 h1 u11211211212",
  "m278 p4 h0 m145 h1 u12121211222112111 h1 u212112211111112",
  "m278 p3 h0 m134 h1 u1121211221211111 h1 u1111111111221221112122211221111111111111122",
  "m279 p5 h0 p3 p1 h1 m132 h1 u411122321223214121222 h1 u111221121221211123212111111221111121",
  "m278 p5 h0 p6 h1 m195 h1 u212121221112111111111 h1 u121111222211111122212211112211122",
  "m278 p3 p2 h0 u2321221 h1 u1231112222222",
  "m279 p3 h0 m24 h1 u21112212 h1 u12222212122212211222221",
  "m278 p4 p4 p1 369 p5 369 p5 369 p4 h0 m158 h1 u112212111221211222111 h1 u2222112212122112121",
];

const VERSIONS = ["v2.12", "v2.11", "v2.10", "v2.9", "v2.8", "v2.7", "v2.6", "v2.5", "v2.4", "v2.3"];
const DATES = ["November 13, 2026", "November 4, 2026", "October 22, 2026", "October 9, 2026", "September 24, 2026", "September 10, 2026", "August 27, 2026", "August 13, 2026", "July 30, 2026", "July 16, 2026"];
const SECTIONS = ["New", "Improvements", "Fixes"];
const PLATFORMS = ["Desktop", "Windows", "Phone", "Desktop V1"];

/** Characters per line at the 728 px list width (Inter 16px). */
const PER_LINE = 92;

function Block({ token, seed, section }: { token: string; seed: number; section: number }): ReactNode {
  const kind = token[0];
  const value = token.slice(1);
  switch (kind) {
    case "m":
      return Number(value) < 270 ? (
        <ul className="rc-cl__list">
          {Array.from({ length: Math.round((Number(value) + 13) / 37) }, (_, index) => (
            <li key={index}>{phrase(60, seed + index)}</li>
          ))}
        </ul>
      ) : (
        <div className="rc-cl__media rc-media" data-compare-mask="" style={{ aspectRatio: `760 / ${value}` }} />
      );
    case "p":
      return <p>{filler(Number(value) * PER_LINE - 30, seed)}</p>;
    case "h":
      return (
        <h2 className={value === "1" ? "rc-cl__spaced" : undefined}>
          <span className={`rc-cl__icon rc-cl__icon--${section % 3}`} aria-hidden="true" />
          {SECTIONS[section % 3]}
        </h2>
      );
    case "3":
      return <h3>{phrase(28, seed)}</h3>;
    case "u":
      return (
        <ul className="rc-cl__list">
          {value.split("").map((lines, index) => (
            <li key={index}>
              <strong>{phrase(18, seed + index)}:</strong> {filler(Number(lines) * PER_LINE - 40, seed + index * 3)}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

function Release({ spec, index }: { spec: string; index: number }) {
  let section = -1;
  return (
    <article className="rc-cl__release">
      <header className="rc-cl__meta">
        <a href="#" className="rc-cl__version">
          {VERSIONS[index]}
        </a>
        <time>{DATES[index]}</time>
      </header>
      <div className="rc-cl__body">
        {spec.split(" ").map((token, position) => {
          if (token[0] === "h") section += 1;
          return <Block key={position} token={token} seed={index * 40 + position} section={Math.max(section, 0)} />;
        })}
      </div>
    </article>
  );
}

/** Changelog template (measured on /changelog). */
export function ChangelogScreen() {
  const [platform, setPlatform] = useState(PLATFORMS[0]);
  return (
    <Shell>
      <div className="rc-cl">
        <div className="rc-cl__top">
          <h1>Changelog</h1>
          <nav className="rc-cl__platforms" aria-label="Platform">
            {PLATFORMS.map((name) => (
              <a
                key={name}
                href="#"
                aria-current={name === platform ? "page" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  setPlatform(name);
                }}
              >
                <span className="rc-cl__platform-icon" aria-hidden="true" />
                <span className="rc-cl__platform-label">{name}</span>
              </a>
            ))}
          </nav>
        </div>
        {RELEASES.map((spec, index) => (
          <Release key={VERSIONS[index]} spec={spec} index={index} />
        ))}
        <div className="rc-cl__pages">
          <Pagination last={4} />
        </div>
      </div>
    </Shell>
  );
}
