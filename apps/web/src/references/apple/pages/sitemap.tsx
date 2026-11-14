"use client";

import { Shell } from "../chrome";
import { label } from "../text";
import { LocalNav } from "./detail";
import "./sitemap.css";

/**
 * Site index (/sitemap). Geometry from the original: per category the title length and, per column (0-2),
 * the vertical offset of each group, its heading length and the length of every link. Labels are neutral.
 */
type Group = [column: number, top: number, heading: number, links: number[]];

const CATEGORIES: [number, Group[]][] = [
  [0, [[0, 0, 11, [16, 20, 9, 13, 5, 19, 29, 16]], [0, 314, 12, [11, 23, 13, 7, 25, 23]], [0, 564, 15, [8, 14, 9, 12, 11]], [1, 0, 12, [19, 11, 15, 25, 20, 24, 7, 21]], [1, 314, 14, [14, 18, 10, 10, 12, 13, 14, 9, 22, 10, 18, 14, 15, 13]], [2, 0, 7, [25, 19, 10]], [2, 154, 13, [19, 13, 16]], [2, 308, 12, [18, 17]]]],
  [4, [[0, 0, 14, [7, 11, 11, 11, 4, 8, 10, 18, 13, 14]], [0, 378, 17, [14, 18]], [1, 0, 15, [19, 13, 18, 10, 17, 21, 14, 21, 16, 11, 14, 19, 8, 7]], [1, 506, 12, [13, 20, 4, 13, 14, 9, 11, 10, 20, 6, 9, 14]], [2, 0, 8, [21, 5, 27, 18, 20, 15, 16, 12, 27, 7, 13]], [2, 410, 7, [22, 9, 11, 7, 10]]]],
  [5, [[0, 0, 14, [8, 8, 8, 4, 9, 19, 13]], [0, 282, 17, [12, 14]], [1, 0, 16, [20, 13, 18, 10, 17, 13, 21, 16, 7, 9, 16, 11, 13, 14]], [1, 506, 12, [13, 20, 13, 14, 9, 11, 4, 4, 10, 14]], [2, 0, 9, [6, 27, 17, 6, 9, 12, 16, 17, 21, 12, 27, 13, 9, 7, 14]], [2, 538, 7, [9, 12, 7, 16]]]],
  [5, [[0, 0, 14, [10, 10, 13, 10, 9, 10, 9, 21, 25, 13, 14, 22]], [1, 0, 18, [22, 13, 18, 10, 13, 21, 16, 7, 7, 11, 13, 14, 17]], [1, 474, 12, [13, 11, 4, 4, 10, 14]], [2, 0, 11, [3, 27, 15, 17, 6, 23, 9, 10, 13, 12, 19, 18, 18, 12, 27, 13, 9, 7, 12]], [2, 666, 7, [9, 14, 7, 18]]]],
  [5, [[0, 0, 14, [15, 21, 19, 16, 16, 18, 26, 13]], [0, 314, 23, [27, 17, 21, 16, 19]], [1, 0, 16, [15, 7, 25, 13, 11, 14, 12, 9, 16, 22, 13, 7]], [2, 0, 7, [9, 19, 7, 23, 19, 18]]]],
  [6, [[0, 0, 14, [16, 11]], [0, 122, 28, [32]], [1, 0, 11, [8, 31]], [2, 0, 7, [9, 24]]]],
  [7, [[0, 0, 14, [11, 9, 13, 13, 15]], [0, 218, 19, [21, 17]], [1, 0, 12, [14, 11, 14, 12, 13, 14]], [2, 0, 7, [9, 15, 7]]]],
  [4, [[0, 0, 14, [8, 14, 11, 12, 8, 24, 14, 8]], [1, 0, 16, [20, 21, 15, 6, 21, 7, 21, 14, 21]], [2, 0, 9, [7, 19, 13, 12, 27, 13]], [2, 250, 7, [22, 16, 16, 21, 15, 15]]]],
  [13, [[0, 0, 7, [9, 8, 11, 12, 14, 11, 14, 11, 9]], [1, 0, 12, [6, 10, 9, 10]], [1, 186, 13, [6, 27]], [2, 0, 7, [13, 14, 18, 17, 18, 25]]]],
  [11, [[0, 0, 20, [6, 7, 12, 14]], [0, 186, 15, [15, 15, 16, 18, 17, 27]], [1, 0, 16, [13, 17, 18, 10, 17, 13, 21, 16, 7, 13, 7, 16, 10, 11, 13, 14, 19, 8, 7, 10]]]],
  [14, [[1, 0, 23, [21, 11, 5, 5, 13, 12, 8]]]],
];

const TITLES = ["", "Desk", "Slate", "Phone", "Wrist", "Optic", "Earbuds", "Home", "Media & Games", "Accounts", "Shop Help"];

export function SitemapScreen() {
  return (
    <Shell localNav={<LocalNav title="Site Index" />} notes={null} crumb="Site Index">
      <h1 className="ap-visually-hidden">Acme Site Index</h1>
      <div className="ap-sm">
        {CATEGORIES.map(([titleLength, groups], c) => {
          const columns = [0, 1, 2].map((column) => groups.filter((group) => group[0] === column));
          return (
            <section key={c} className={`ap-sm__cat${c === 0 ? " ap-sm__cat--first" : ""}`} aria-label={TITLES[c] || "Featured"}>
              {titleLength ? <h2>{TITLES[c] ?? label(titleLength, c)}</h2> : null}
              <div className="ap-sm__cols">
                {columns.map((list, column) => (
                  <div key={column} className="ap-sm__col">
                    {list.map(([, top, heading, links], g) => (
                      <div key={g} className="ap-sm__group" style={{ marginTop: g === 0 ? top : undefined }}>
                        <h3>{label(heading, c * 17 + column * 5 + g)}</h3>
                        <ul>
                          {links.map((length, index) => (
                            <li key={index}>
                              <a href="#">{label(length, c * 41 + column * 13 + g * 7 + index)}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </Shell>
  );
}
