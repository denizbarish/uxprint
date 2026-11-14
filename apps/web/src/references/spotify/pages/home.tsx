"use client";

import { Shell } from "../chrome";
import { albums, artists, credit, pick, tracks } from "../data";
import { CarouselShelf, type CardSpec } from "../parts";
import "./pages.css";

/* Home (measured on /): grey wash, then five carousel shelves 24px apart. Shelf heights are measured. */

const range = (count: number) => Array.from({ length: count }, (_, index) => index);

const trackCards: CardSpec[] = range(20).map((index) => ({ title: pick(tracks, index), subtitle: credit(index, index % 3 === 1 ? 2 : 1) }));
const artistCards: CardSpec[] = range(10).map((index) => ({ title: pick(artists, index + 4), subtitle: "Artist", round: true }));
const albumCards: CardSpec[] = range(10).map((index) => ({ title: pick(albums, index), subtitle: credit(index + 2, index % 4 === 3 ? 2 : 1) }));
const stationCards: CardSpec[] = range(10).map((index) => ({ subtitle: `Featuring ${credit(index + 5, 3)} and others` }));
const listCards: CardSpec[] = range(4).map((index) => ({ subtitle: index < 2 ? "A weekly roundup of the tracks played most this week." : "A daily roundup of the tracks played most right now." }));

export function HomeScreen() {
  return (
    <Shell active="home">
      <div className="sp-home-wash" aria-hidden="true" />
      <section className="sp-home-page">
        <h1 className="sp-sr">Home</h1>
        <div className="sp-home-shelves">
          <CarouselShelf title="Rising tracks" cards={trackCards} seed={0} height={329} />
          <CarouselShelf title="Artists people love" cards={artistCards} seed={20} height={306} />
          <CarouselShelf title="Big records this week" cards={albumCards} seed={30} height={326} />
          <CarouselShelf title="Station picks" cards={stationCards} seed={40} height={304} />
          <CarouselShelf title="Top lists" cards={listCards} seed={50} height={304} />
        </div>
      </section>
    </Shell>
  );
}
