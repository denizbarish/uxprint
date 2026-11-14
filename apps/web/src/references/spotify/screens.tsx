"use client";

import type { ReactNode } from "react";
import { AlbumScreen } from "./pages/album";
import { ArtistScreen } from "./pages/artist";
import { DownloadScreen } from "./pages/download";
import { GenreScreen } from "./pages/genre";
import { HomeScreen } from "./pages/home";
import { PlaylistScreen } from "./pages/playlist";
import { RegionScreen } from "./pages/region";
import { SearchScreen } from "./pages/search";
import { SectionScreen } from "./pages/section";

export const spotifyScreens: Record<string, () => ReactNode> = {
  home: () => <HomeScreen />,
  album: () => <AlbumScreen />,
  playlist: () => <PlaylistScreen />,
  artist: () => <ArtistScreen />,
  section: () => <SectionScreen />,
  genre: () => <GenreScreen />,
  region: () => <RegionScreen />,
  search: () => <SearchScreen />,
  download: () => <DownloadScreen />,
};
