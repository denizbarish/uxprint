"use client";

import { useState } from "react";
import { Chevron, Shell } from "../chrome";
import { Media } from "../parts";
import { label, text } from "../text";
import { Ribbon } from "./family";
import "./compare.css";

/**
 * Comparison table (/mac/compare). Section and row geometry is measured: each row keeps the original's height
 * and the line count of its three cells. Every value and label is neutral.
 */
type Row = [height: number, lines: [number, number, number]];

const SECTIONS: { title: string; rows: Row[]; quick?: boolean }[] = [
  {
    title: "At a Glance",
    quick: true,
    rows: [
      [238, [2, 2, 2]],
      [148, [1, 1, 1]],
      [148, [1, 1, 1]],
      [152, [2, 2, 2]],
      [152, [2, 3, 2]],
      [148, [1, 1, 1]],
      [152, [2, 3, 3]],
      [152, [3, 3, 3]],
      [152, [3, 3, 3]],
      [121, [2, 1, 1]],
    ],
  },
  { title: "Processing", rows: [[361, [7, 8, 8]], [175, [6, 6, 6]]] },
  { title: "Built-in Assistant Features", rows: [[311, [1, 1, 1]], [25, [1, 1, 1]]] },
  { title: "Memory", rows: [[186, [1, 3, 3]]] },
  { title: "Capacity", rows: [[211, [2, 4, 3]]] },
  {
    title: "Screen",
    rows: [
      [161, [1, 1, 1]],
      [25, [1, 1, 1]],
      [25, [1, 1, 1]],
      [75, [1, 1, 1]],
      [50, [2, 2, 1]],
      [25, [1, 1, 1]],
      [25, [2, 1, 1]],
      [50, [2, 2, 1]],
    ],
  },
  { title: "Size and Weight", rows: [[161, [2, 2, 2]], [50, [2, 2, 2]], [50, [2, 2, 2]], [50, [2, 2, 2]]] },
  { title: "Camera", rows: [[236, [3, 3, 3]]] },
  {
    title: "Sound",
    rows: [
      [186, [1, 1, 2]],
      [175, [1, 2, 2]],
      [150, [2, 2, 2]],
      [75, [1, 1, 1]],
      [50, [2, 2, 1]],
    ],
  },
  { title: "Keys and Touch Surface", rows: [[161, [1, 1, 1]], [50, [1, 1, 1]], [25, [1, 1, 1]], [25, [2, 1, 1]], [125, [1, 1, 1]]] },
  { title: "Wireless", rows: [[136, [1, 1, 1]], [25, [1, 1, 1]]] },
  { title: "Ports", rows: [[161, [1, 1, 1]], [25, [2, 2, 1]], [25, [2, 2, 1]]] },
  { title: "Secure Sign-in Method", rows: [[136, [1, 1, 1]]] },
  { title: "Payments", rows: [[161, [1, 1, 1]]] },
  { title: "Video Calls", rows: [[136, [1, 1, 1]], [50, [1, 1, 1]]] },
  { title: "Voice Calls", rows: [[136, [1, 1, 1]], [50, [1, 1, 1]], [25, [1, 1, 1]]] },
  { title: "Voice Helper", rows: [[161, [1, 1, 1]], [50, [1, 1, 1]]] },
  { title: "Power and Battery Life", rows: [[136, [1, 1, 1]], [25, [1, 1, 1]], [50, [1, 1, 1]], [50, [1, 1, 1]], [50, [2, 1, 1]]] },
];

const MODELS = ["Model Lite (C7)", "Model Air 13 in. (C9)", "Model Pro 14 in. (C10)"];
const BIG = ["13.0 in", "13.6 in", "14.2 in", "6-core", "10-core", "12-core", "8 GB", "16 GB", "24 GB"];

const QUICK_ICON_ROWS = new Set([1, 2, 5, 9]);

function Cell({ lines, seed, iconRow, quick, glyph }: { lines: number; seed: number; iconRow: boolean; quick: boolean; glyph: boolean }) {
  if (quick) {
    return (
      <div className="ap-cmp__cell ap-cmp__cell--quick">
        {lines > 2 && !glyph ? <span className="ap-cmp__from">From</span> : null}
        {glyph ? <span className="ap-cmp__glyph" aria-hidden="true" /> : <span className="ap-cmp__big">{BIG[seed % BIG.length]}</span>}
        <span className="ap-cmp__cap">{label(lines > 1 ? 18 : 10, seed)}</span>
      </div>
    );
  }
  return (
    <div className="ap-cmp__cell">
      {iconRow ? <span className="ap-cmp__icon" aria-hidden="true" /> : null}
      {Array.from({ length: lines }, (_, index) => (
        <p key={index}>{text(20 + ((seed + index * 7) % 14), seed + index).replace(/\.$/, "")}</p>
      ))}
    </div>
  );
}

export function CompareScreen() {
  const [picked, setPicked] = useState(MODELS);
  return (
    <Shell
      notes={{ list: [35, 43, 49, 64, 91, 34, 38, 144, 204, 32, 204, 63, 1216, 241, 56], paragraphs: [997, 886, 223, 1075, 210] }}
      crumb="Desk"
    >
      <Ribbon length={112} />
      <section className="ap-cmp-hero">
        <h1>Compare desk models</h1>
        <p>
          <a href="#">Shop Desk</a> <a href="#">Talk with an expert</a>
        </p>
        <button type="button" className="ap-cmp-hero__help">
          Help me decide <Chevron />
        </button>
      </section>

      <div className="ap-cmp" role="table" aria-label="Model comparison">
        <div className="ap-cmp__pickers" role="row">
          {picked.map((model, index) => (
            <label key={index} className="ap-cmp__picker" role="columnheader">
              <span className="ap-visually-hidden">Model {index + 1}</span>
              <select
                value={model}
                onChange={(event) => setPicked((list) => list.map((item, i) => (i === index ? event.target.value : item)))}
              >
                {MODELS.map((name) => (
                  <option key={name}>{name}</option>
                ))}
              </select>
              <Chevron dir="down" />
            </label>
          ))}
        </div>

        <div className="ap-cmp__row ap-cmp__row--gallery" role="row">
          {[4, 4, 2].map((swatches, index) => (
            <div key={index} className="ap-cmp__cell" role="cell">
              <Media className="ap-cmp__product" />
              <div className="ap-cmp__swatches">
                {Array.from({ length: swatches }, (_, s) => (
                  <button key={s} type="button" aria-label={`Finish ${s + 1}`} aria-pressed={s === 0} style={{ background: `hsl(${s * 60 + index * 20} 10% ${82 - s * 12}%)` }} />
                ))}
              </div>
              <span className="ap-cmp__finish">{["Silver", "Sky", "Graphite"][index]}</span>
            </div>
          ))}
        </div>

        <div className="ap-cmp__row ap-cmp__row--price" role="row">
          {[1, 2, 2].map((lines, index) => (
            <div key={index} className="ap-cmp__cell" role="cell">
              {index === 2 ? <span className="ap-cmp__new">New</span> : null}
              <p>{text(lines === 1 ? 38 : 104, index + 30)}</p>
            </div>
          ))}
        </div>

        <div className="ap-cmp__row ap-cmp__row--buy" role="row">
          {[0, 1, 2].map((index) => (
            <div key={index} className="ap-cmp__cell" role="cell">
              <a href="#" className="ap-btn ap-btn--primary ap-btn--sm">
                Buy
              </a>
              <a href="#" className="ap-more">
                Learn more <Chevron />
              </a>
            </div>
          ))}
        </div>

        {SECTIONS.map((section, s) => (
          <section key={section.title} className="ap-cmp__section" aria-label={section.title}>
            <h2 className="ap-cmp__head">{section.title}</h2>
            {section.rows.map(([height, lines], r) => (
              <div key={r} className="ap-cmp__row" role="row" style={{ minHeight: height }}>
                {lines.map((count, c) => (
                  <Cell key={c} lines={count} seed={s * 31 + r * 7 + c} iconRow={height >= 120} quick={!!section.quick} glyph={QUICK_ICON_ROWS.has(r)} />
                ))}
              </div>
            ))}
          </section>
        ))}
      </div>
    </Shell>
  );
}
