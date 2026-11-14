"use client";

import { useBrand } from "../brand";
import { Shell } from "../chrome";
import { albums, credit, pick, tracks } from "../data";
import { ActionBar, EntityHeader, TrackList, Wash, type TrackRow } from "../parts";
import "./pages.css";

/* Playlist (measured on /playlist/...): header with description, 5-column list of 50 rows with thumbnails. */

const tone = "#640e0e";
/* Measured header: bright at the top, darker at the bottom edge. */
const fill = "linear-gradient(rgb(233, 33, 48), rgb(101, 4, 6))";
const rows: TrackRow[] = Array.from({ length: 50 }, (_, index) => ({
  title: pick(tracks, index * 5 + 2),
  artist: credit(index + 1, index % 5 === 2 ? 2 : 1),
  plays: (648213 - index * 9137).toLocaleString("en-US"),
  album: pick(albums, index * 3 + 1),
  thumb: true,
}));

export function PlaylistScreen() {
  const brand = useBrand();
  return (
    <Shell tone={tone}>
      <section className="sp-entity-page sp-playlist-page">
        <EntityHeader
          tone={tone}
          fill={fill}
          kind="Open playlist"
          title="Daily 50: Region"
          description="The fifty tracks played most in the region, refreshed every morning."
          meta={[brand, "912,406 saves", "50 tracks, about 2 hr 40 min", "Nov 13, 2026", "2 new tracks"]}
          seed={2}
        />
        <Wash tone={tone} height={173} />
        <ActionBar tone={tone} />
        <TrackList rows={rows} layout="playlist" tone={tone} label="Daily 50: Region" />
      </section>
    </Shell>
  );
}
