"use client";

import type { CSSProperties, ReactNode } from "react";
import { usePrompts } from "./chrome";
import { durations, pick, tones } from "./data";
import { AddCircleIcon, ClockIcon, ListIcon, MoreIcon, PlayIcon, ShuffleIcon } from "./icons";
import "./parts.css";

/* Building blocks of the main view: covers, cards, shelves, entity header, action bar, track list, tiles. */

type ToneStyle = CSSProperties & { "--tone"?: string };

/** Neutral stand-in for cover art: a flat tone with a soft light falloff. Excluded from pixel compare. */
export function Cover({ index, round, className }: { index: number; round?: boolean; className?: string }) {
  return (
    <div
      className={`sp-cover${round ? " sp-cover--round" : ""}${className ? ` ${className}` : ""}`}
      style={{ background: pick(tones, index) }}
      data-compare-mask=""
    />
  );
}

export type CardSpec = { title?: string; subtitle: string; round?: boolean };

export function Card({ card, index }: { card: CardSpec; index: number }) {
  const { askLogin } = usePrompts();
  return (
    <div className="sp-card">
      <div className="sp-card__art">
        <Cover index={index} round={card.round} />
        <div className="sp-card__play">
          <button type="button" className="sp-play" aria-label={`Play ${card.title ?? card.subtitle}`} onClick={() => askLogin(pick(tones, index))}>
            <PlayIcon />
          </button>
        </div>
      </div>
      <div className="sp-card__text">
        {card.title ? (
          <a className="sp-card__title" href="#">
            {card.title}
          </a>
        ) : null}
        <span className="sp-card__sub">{card.subtitle}</span>
      </div>
    </div>
  );
}

export function ShelfHeader({ title, more = "Show all", level = 2 }: { title: string; more?: string | null; level?: 1 | 2 }) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <div className={`sp-shelf__head${level === 1 ? " sp-shelf__head--page" : ""}`}>
      <Heading className="sp-shelf__title">
        <a href="#">{title}</a>
      </Heading>
      {more ? (
        <a className="sp-shelf__more" href="#">
          {more}
        </a>
      ) : null}
    </div>
  );
}

/** Home shelf: one row that scrolls sideways, cut by the main view's edge. */
export function CarouselShelf({ title, cards, seed, height }: { title: string; cards: CardSpec[]; seed: number; height: number }) {
  return (
    <section className="sp-shelf" aria-label={title} style={{ height }}>
      <ShelfHeader title={title} />
      <div className="sp-carousel">
        {cards.map((card, index) => (
          <Card key={index} card={card} index={seed + index} />
        ))}
      </div>
    </section>
  );
}

/** Wrapping five-column grid (two columns in a narrow main view). */
export function GridShelf({ title, cards, seed, more, children, className }: { title?: string; cards: CardSpec[]; seed: number; more?: string | null; children?: ReactNode; className?: string }) {
  return (
    <section className={`sp-shelf sp-shelf--grid${className ? ` ${className}` : ""}`} aria-label={title}>
      {title ? <ShelfHeader title={title} more={more} /> : null}
      {children}
      <div className="sp-grid">
        {cards.map((card, index) => (
          <Card key={index} card={card} index={seed + index} />
        ))}
      </div>
    </section>
  );
}

export function EntityHeader({ tone, fill, kind, title, description, meta, seed }: { tone: string; fill?: string; kind: string; title: string; description?: string; meta: string[]; seed: number }) {
  return (
    <header className="sp-entity" style={{ "--tone": tone, ...(fill ? { background: fill } : null) } as ToneStyle}>
      <button type="button" className="sp-entity__cover" aria-label="View cover art">
        <Cover index={seed} />
      </button>
      <div className="sp-entity__text">
        <span className="sp-entity__kind">{kind}</span>
        <h1 className="sp-entity__title">{title}</h1>
        {description ? <p className="sp-entity__desc">{description}</p> : null}
        <div className="sp-entity__meta">
          <span className="sp-entity__avatar" data-compare-mask="" />
          <a href="#">{meta[0]}</a>
          {meta.slice(1).map((item) => (
            <span key={item}>
              <span className="sp-entity__dot" aria-hidden="true">
                •
              </span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

/** Lighter wash behind the action bar, fading into the panel. */
export function Wash({ tone, height = 232 }: { tone: string; height?: number }) {
  return <div className="sp-wash" style={{ "--tone": tone, height } as ToneStyle} aria-hidden="true" />;
}

export function ActionBar({ tone, follow, list = true }: { tone: string; follow?: boolean; list?: boolean }) {
  const { askLogin, askSave } = usePrompts();
  return (
    <div className="sp-actions">
      <button type="button" className="sp-play sp-play--lg" aria-label="Play" onClick={() => askLogin(tone)}>
        <PlayIcon size={24} />
      </button>
      <button type="button" className="sp-iconbtn" aria-label="Shuffle" onClick={() => askLogin(tone)}>
        <ShuffleIcon size={32} />
      </button>
      {follow ? (
        <button type="button" className="sp-follow" onClick={askSave}>
          Follow
        </button>
      ) : (
        <button type="button" className="sp-iconbtn" aria-label="Save to your shelf" onClick={askSave}>
          <AddCircleIcon size={32} />
        </button>
      )}
      <button type="button" className="sp-iconbtn" aria-label="More options">
        <MoreIcon size={32} />
      </button>
      {list ? (
        <button type="button" className="sp-viewtoggle">
          List
          <ListIcon />
        </button>
      ) : null}
    </div>
  );
}

export type TrackRow = { title: string; artist?: string; plays?: string; album?: string; thumb?: boolean };
type Layout = "album" | "playlist" | "popular";

export function TrackList({ rows, layout, tone, label, head = true }: { rows: TrackRow[]; layout: Layout; tone: string; label: string; head?: boolean }) {
  const { askLogin } = usePrompts();
  return (
    <div className={`sp-tracks sp-tracks--${layout}`} role="grid" aria-label={label} aria-rowcount={rows.length + 1}>
      {head ? (
        <div className="sp-tracks__head" role="row">
          <span role="columnheader">#</span>
          <span role="columnheader">Title</span>
          {layout === "playlist" ? (
            <>
              <span role="columnheader" className="sp-tracks__var sp-tracks__num">Listens</span>
              <span role="columnheader" className="sp-tracks__var">Record</span>
            </>
          ) : null}
          <span role="columnheader" className="sp-tracks__last" aria-label="Duration">
            <ClockIcon />
          </span>
        </div>
      ) : null}
      <div className="sp-tracks__body">
        {rows.map((row, index) => (
          <div className="sp-row" role="row" key={index}>
            <span className="sp-row__index" role="gridcell">
              <span>{index + 1}</span>
              <button type="button" aria-label={`Play ${row.title}`} onClick={() => askLogin(tone)}>
                <PlayIcon size={16} />
              </button>
            </span>
            <span className="sp-row__main" role="gridcell">
              {row.thumb ? <Cover index={index + 3} className="sp-row__thumb" /> : null}
              <span className="sp-row__names">
                <a href="#" className="sp-row__title">
                  {row.title}
                </a>
                {row.artist ? (
                  <a href="#" className="sp-row__artist">
                    {row.artist}
                  </a>
                ) : null}
              </span>
            </span>
            {layout !== "album" ? (
              <span className="sp-row__var" role="gridcell">
                {row.plays}
              </span>
            ) : null}
            {layout === "playlist" ? (
              <a href="#" className="sp-row__var" role="gridcell">
                {row.album}
              </a>
            ) : null}
            <span className="sp-row__last" role="gridcell">
              <button type="button" className="sp-row__hidden" aria-label={`Like ${row.title}`} onClick={() => askLogin(tone)}>
                <AddCircleIcon size={16} />
              </button>
              <span className="sp-row__time">{pick(durations, index)}</span>
              <button type="button" className="sp-row__hidden" aria-label={`More options for ${row.title}`}>
                <MoreIcon size={16} />
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Tile({ label, color, index }: { label: string; color: string; index: number }) {
  return (
    <a className="sp-tile" href="#" style={{ background: color }}>
      <span className="sp-tile__label">{label}</span>
      <span className="sp-tile__art" style={{ background: pick(tones, index) }} data-compare-mask="" />
    </a>
  );
}
