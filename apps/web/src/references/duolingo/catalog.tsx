"use client";

import { Flag } from "./chrome";
import { SUBJECTS } from "./filler";
import "./catalog.css";

const NO_COUNT = new Set([2, 6]);

function learners(index: number): string {
  const value = Math.max(0.4, 38.6 - index * 0.93).toFixed(1);
  return `${value}M learners`;
}

/**
 * Grid of 42 course tiles shared by the catalogue and the sign-up picker. Tiles are links on the
 * catalogue and buttons on the picker, as on the original.
 */
export function CourseGrid({ as = "link", className = "" }: { as?: "link" | "button"; className?: string }) {
  return (
    <ul className={`dl-cgrid ${className}`}>
      {SUBJECTS.map((name, index) => {
        const body = (
          <>
            <span className="dl-ccard__top" aria-hidden="true" />
            <span className="dl-ccard__media">
              <Flag index={index} className="dl-ccard__flag" />
            </span>
            <span className="dl-ccard__name">{name}</span>
            {NO_COUNT.has(index) ? null : (
              <span className="dl-ccard__count">{index === SUBJECTS.length - 1 ? "Phone app only" : learners(index)}</span>
            )}
          </>
        );
        return (
          <li key={name}>
            {as === "link" ? (
              <a href="#" className="dl-ccard">
                {body}
              </a>
            ) : (
              <button type="button" className="dl-ccard">
                {body}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
