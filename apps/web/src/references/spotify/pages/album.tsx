"use client";

import { Shell } from "../chrome";
import { albums, pick, tracks } from "../data";
import { ActionBar, EntityHeader, GridShelf, TrackList, Wash, type TrackRow } from "../parts";
import "./pages.css";

/* Album (measured on /album/...): 276px colour header, action bar, 11 rows, release lines, 5 more releases. */

const tone = "#5d1d1e";
const artist = "Ada Lind";
const rows: TrackRow[] = Array.from({ length: 11 }, (_, index) => ({ title: pick(tracks, index * 2 + 1), artist }));
const more = Array.from({ length: 5 }, (_, index) => ({ title: pick(albums, index + 6), subtitle: String(1997 + index * 4) }));

export function AlbumScreen() {
  return (
    <Shell tone={tone}>
      <section className="sp-entity-page">
        <EntityHeader tone={tone} kind="Album" title="Lumen" meta={[artist, "1998", "11 tracks, 48 min 30 sec"]} seed={7} />
        <Wash tone={tone} height={173} />
        <ActionBar tone={tone} />
        <TrackList rows={rows} layout="album" tone={tone} label="Lumen" />
        <div className="sp-release">
          <p>1998</p>
          <p>© 1998 Northwind Records</p>
          <p>℗ 1998 Northwind Records</p>
        </div>
        <GridShelf title={`More from ${artist}`} more="Full catalogue" cards={more} seed={11} />
      </section>
    </Shell>
  );
}
