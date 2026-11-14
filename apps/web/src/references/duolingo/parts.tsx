"use client";

import { useId, useState } from "react";
import { filler, question } from "./filler";
import "./parts.css";

function Chevron() {
  return (
    <svg viewBox="0 0 16 10" className="dl-faq__chev" aria-hidden="true">
      <path d="M2 2l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Question list where each row toggles its answer. `lengths` are the question lengths of the
 * original rows (character counts only); the text is ours.
 */
export function Faq({ lengths, className = "", seed = 0 }: { lengths: number[]; className?: string; seed?: number }) {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();
  return (
    <div className={`dl-faq ${className}`}>
      {lengths.map((length, index) => {
        const expanded = open === index;
        return (
          <div key={index} className="dl-faq__item" data-open={expanded || undefined}>
            <h3 className="dl-faq__q">
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={`${id}-${index}`}
                onClick={() => setOpen(expanded ? null : index)}
              >
                <span>{question(length, seed + index * 3)}</span>
                <Chevron />
              </button>
            </h3>
            <div id={`${id}-${index}`} className="dl-faq__a" hidden={!expanded}>
              <p>{filler(180, seed + index)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
