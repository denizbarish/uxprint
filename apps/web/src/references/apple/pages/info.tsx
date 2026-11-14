"use client";

import { Shell } from "../chrome";
import { Media } from "../parts";
import { headline, label, text } from "../text";
import { LocalNav } from "./detail";
import "./info.css";

/** One contact entry: heading length, then paragraph lengths; a paragraph ending in a link gets a link length. */
type Entry = [heading: number, paragraphs: [length: number, link?: number][]];

function Entries({ entries, seed }: { entries: Entry[]; seed: number }) {
  return (
    <div className="ap-info__col">
      {entries.map(([heading, paragraphs], index) => (
        <div key={index} className="ap-info__entry">
          <h3>{headline(heading, seed + index)}</h3>
          {paragraphs.map(([length, link], p) => (
            <p key={p}>
              {text(length, seed + index * 7 + p)}
              {link ? (
                <>
                  {" "}
                  <a href="#">{label(link, seed + p + index)}</a>
                </>
              ) : null}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

const SALES: [Entry[], Entry[]] = [
  [
    [18, [[160, 9], [180, 12]]],
    [30, [[120, 25]]],
    [19, [[126, 19]]],
    [52, [[144, 24]]],
    [16, [[60, 25]]],
  ],
  [
    [23, [[78, 24], [31]]],
    [24, [[66, 25], [194, 38]]],
    [31, [[57, 16], [111, 26]]],
    [34, [[106, 14]]],
  ],
];

const SUPPORT: [Entry[], Entry[]] = [
  [[23, [[131, 11], [22], [0, 44], [0, 24], [0, 47]]]],
  [
    [29, [[160, 15]]],
    [5, [[263, 23]]],
  ],
];

const REGIONS = [
  [21, 59],
  [18, 102],
  [18, 75],
  [25, 67],
  [13, 64],
  [17, 70],
  [22, 60],
  [19, 70],
  [11, 50],
];

/** Contact directory (/contact): 40px section titles over two 408px columns, an address row and a grey regional card. */
export function ContactScreen() {
  return (
    <Shell notes={null} crumb="Reach Us">
      <div className="ap-info">
        <h1 className="ap-info__title">Reach Us</h1>

        <section className="ap-info__sec" aria-labelledby="info-sales">
          <h2 id="info-sales">Sales and order questions</h2>
          <div className="ap-info__cols">
            <Entries entries={SALES[0]} seed={1} />
            <Entries entries={SALES[1]} seed={30} />
          </div>
        </section>

        <section className="ap-info__sec ap-info__sec--offices" aria-labelledby="info-offices">
          <h2 id="info-offices">Head office and press contacts</h2>
          <div className="ap-info__cols">
            <div className="ap-info__col">
              <p className="ap-info__lead">Main Office</p>
              <address>
                1 Sample Way
                <br />
                Northland 00000
                <br />
                Main line 000 000 0000
              </address>
            </div>
            <div className="ap-info__col">
              <p className="ap-info__lead">Press</p>
              <address>
                press@example.com
                <br />
                000 000 0001
              </address>
              <p className="ap-info__lead ap-info__lead--gap">Media</p>
              <address>media@example.com</address>
            </div>
          </div>
        </section>

        <section className="ap-info__sec" aria-labelledby="info-support">
          <h2 id="info-support">Help with your products</h2>
          <div className="ap-info__cols">
            <Entries entries={SUPPORT[0]} seed={60} />
            <Entries entries={SUPPORT[1]} seed={70} />
          </div>
        </section>

        <section className="ap-info__card" aria-labelledby="info-regions">
          <h2 id="info-regions" className="ap-info__card-title">
            Regional offices
          </h2>
          <p className="ap-info__card-intro">{text(220, 90)}</p>
          {[0, 1].map((block) => (
            <div key={block} className="ap-info__card-block">
              <h3>{block ? "Partners" : "Regional sales and support"}</h3>
              <div className="ap-info__grid">
                {REGIONS.slice(block * 6, block * 6 + (block ? 3 : 6)).map(([heading, body], index) => (
                  <div key={index}>
                    <h4>{label(heading ?? 12, index + block * 10 + 91)}</h4>
                    <p>{text(body ?? 60, index + 92)}</p>
                    <p>
                      <a href="#">000 000 00</a>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </Shell>
  );
}

/** Notice block: icon width, title length, body length and link-paragraph lengths. */
type Block = [icon: number, title: number, body: number, links: number[]];

const PAIRS: [Block, Block][] = [
  [
    [169, 19, 175, [18, 19, 77, 36]],
    [128, 27, 142, [36, 83, 27]],
  ],
  [
    [52, 15, 114, [23]],
    [77, 17, 117, [25]],
  ],
  [
    [74, 21, 160, [24]],
    [74, 18, 150, [22]],
  ],
];

const WIDE: [number, number, number][] = [
  [74, 21, 81],
  [60, 14, 233],
];

function NoticeBlock({ block, seed }: { block: Block; seed: number }) {
  const [icon, title, body, links] = block;
  return (
    <div className="ap-legal__block">
      <Media className="ap-legal__icon" style={{ width: icon }} />
      <h2>{label(title, seed)}</h2>
      <p>{text(body, seed + 1)}</p>
      {links.map((length, index) =>
        length > 40 ? (
          <p key={index}>{text(length, seed + index + 2)}</p>
        ) : (
          <p key={index}>
            <a href="#" className="ap-legal__more">
              {label(length, seed + index + 3)}
            </a>
          </p>
        ),
      )}
    </div>
  );
}

/** Legal hub (/legal): sticky local nav, 500px masked band with the title, then pairs of 327px notice blocks and full-width rows. */
export function LegalScreen() {
  return (
    <Shell localNav={<LocalNav title="Notices" buy={false} />} notes={null} crumb="Notices">
      <section className="ap-legal__hero">
        <Media className="ap-legal__band" />
        <h1>Notices</h1>
        <p>{text(69, 4)}</p>
      </section>
      <div className="ap-legal">
        {PAIRS.map((pair, index) => (
          <div key={index}>
            <div className="ap-legal__pair">
              <NoticeBlock block={pair[0]} seed={index * 20 + 1} />
              <NoticeBlock block={pair[1]} seed={index * 20 + 11} />
            </div>
            {WIDE[index] ? (
              <div className="ap-legal__wide">
                <Media className="ap-legal__icon" style={{ width: WIDE[index][0] }} />
                <h2>{label(WIDE[index][1], index + 70)}</h2>
                <p>{text(WIDE[index][2], index + 71)}</p>
                <p>
                  <a href="#" className="ap-legal__more">
                    {label(27, index + 72)}
                  </a>
                </p>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </Shell>
  );
}
