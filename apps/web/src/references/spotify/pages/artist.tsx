"use client";

import { useState } from "react";
import { Shell } from "../chrome";
import { albums, artists, pick, tracks } from "../data";
import { ActionBar, GridShelf, TrackList, Wash, type CardSpec, type TrackRow } from "../parts";
import "./pages.css";

/* Artist (measured on /artist/...): 360px image header, popular tracks, then shelves with 40px bottom padding. */

const tone = "#353535";
const name = "Mira Vale";
const range = (count: number) => Array.from({ length: count }, (_, index) => index);

const popular: TrackRow[] = range(5).map((index) => ({
  title: pick(tracks, index * 3 + 4),
  artist: name,
  plays: (114674559 - index * 21300417).toLocaleString("en-US"),
  thumb: true,
}));

const filters = ["Popular releases", "Albums", "Singles and EPs", "Compilations"];
const discography: CardSpec[] = range(5).map((index) => ({ title: pick(albums, index * 2 + 1), subtitle: `${2024 - index * 3} • ${index === 0 ? "Latest release" : "Album"}` }));
const featuring: CardSpec[] = range(5).map((index) => ({ title: `Best of ${pick(artists, index)}`, subtitle: "Their best known songs in a single list, refreshed quite often." }));
const videos: CardSpec[] = range(2).map((index) => ({ title: pick(tracks, index + 9), subtitle: `${name}, ${pick(artists, index + 6)}` }));
const discovered: CardSpec[] = range(5).map((index) => ({ title: `${pick(albums, index + 3)} Blend`, subtitle: "A changing blend of new and familiar sounds for long evenings." }));
const fans: CardSpec[] = range(5).map((index) => ({ title: pick(artists, index + 9), subtitle: "Artist", round: true }));
const appears: CardSpec[] = range(5).map((index) => ({ title: pick(albums, index + 11), subtitle: `${2018 - index} • Compilation` }));

const tour = [
  ["Nov", "21", "Harbour City", "Mira Vale", "Sat 9:00 PM", "Old Mill Hall"],
  ["Dec", "5", "Lakeview", "Mira Vale", "Sat 9:00 PM", "Glass Pavilion"],
  ["Dec", "18", "Harbour City", "Mira Vale and band", "Fri 9:00 PM", "Riverside Stage"],
  ["Dec", "26", "Harbour City", "Mira Vale", "Fri 2:00 PM", "North Park Open Air Theatre"],
  ["Jan", "9", "Lakeview", "Mira Vale", "Sat 9:00 PM", "Glass Pavilion"],
  ["Jan", "14", "Eastport", "Mira Vale", "Thu 9:00 PM", "Conservatory Hall"],
  ["Jan", "23", "Harbour City", "Mira Vale", "Sat 9:00 PM", "Old Mill Hall"],
  ["Jan", "30", "Harbour City", "Mira Vale", "Sat 9:00 PM", "Riverside Stage"],
];

function Discography() {
  const [active, setActive] = useState(0);
  return (
    <GridShelf title="Releases" cards={discography} seed={60}>
      <div className="sp-chips" role="group" aria-label="Filter releases">
        {filters.map((label, index) => (
          <button key={label} type="button" className="sp-chip" aria-pressed={active === index} onClick={() => setActive(index)}>
            {label}
          </button>
        ))}
      </div>
    </GridShelf>
  );
}

export function ArtistScreen() {
  return (
    <Shell tone={tone}>
      <section className="sp-entity-page sp-artist-page">
        <header className="sp-artist-hero">
          <div className="sp-artist-hero__image" data-compare-mask="" />
          <h1>{name}</h1>
          <p>2.4M monthly listeners</p>
        </header>
        <Wash tone={tone} height={173} />
        <ActionBar tone={tone} follow list={false} />
        <div className="sp-artist-body">
          <h2>Most played</h2>
          <TrackList rows={popular} layout="popular" tone={tone} label="Most played" head={false} />
          <button type="button" className="sp-seemore">
            Show more
          </button>
          <Discography />
          <GridShelf title={`Featuring ${name}`} cards={featuring} seed={65} />
          <GridShelf title="Videos" cards={videos} seed={70} more={null} />
          <section className="sp-shelf" aria-label="On stage">
            <div className="sp-shelf__head">
              <h2 className="sp-shelf__title">On stage</h2>
              <a className="sp-shelf__more" href="#">
                See every upcoming date (8)
              </a>
            </div>
            <ul className="sp-tour">
              {tour.map(([month, day, city, line, time, venue]) => (
                <li key={`${month}${day}${venue}`}>
                  <a href="#">
                    <time>
                      {month}
                      <strong>{day}</strong>
                    </time>
                    <div>
                      <h3>{city}</h3>
                      <p>{line}</p>
                      <p>{`${time} • ${venue}`}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </section>
          <section className="sp-shelf" aria-label="Profile">
            <h2 className="sp-shelf__title">Profile</h2>
            <button type="button" className="sp-about">
              <span className="sp-about__photo" data-compare-mask="" />
              <strong>2,418,903 monthly listeners</strong>
            </button>
          </section>
          <GridShelf title="Found in" cards={discovered} seed={75} />
          <GridShelf title="Listeners also enjoy" cards={fans} seed={80} />
          <GridShelf title="Guest spots" cards={appears} seed={85} />
        </div>
      </section>
    </Shell>
  );
}
