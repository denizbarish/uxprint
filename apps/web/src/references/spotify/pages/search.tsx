"use client";

import { Shell } from "../chrome";
import { pick } from "../data";
import { ShelfHeader, Tile } from "../parts";
import "./pages.css";

/* Search with an empty query (measured on /search): "browse all" heading and 70 colour tiles, 4 per row. */

const colors = [
  "rgb(220, 20, 140)", "rgb(0, 100, 80)", "rgb(40, 62, 163)", "rgb(132, 0, 231)", "rgb(30, 50, 100)", "rgb(30, 50, 100)",
  "rgb(230, 30, 50)", "rgb(230, 30, 50)", "rgb(140, 25, 50)", "rgb(176, 40, 151)", "rgb(141, 103, 171)", "rgb(71, 125, 149)",
  "rgb(80, 55, 80)", "rgb(175, 40, 150)", "rgb(225, 17, 140)", "rgb(0, 100, 80)", "rgb(0, 100, 80)", "rgb(45, 70, 185)",
  "rgb(141, 103, 171)", "rgb(220, 20, 140)", "rgb(233, 20, 41)", "rgb(216, 64, 0)", "rgb(119, 119, 119)", "rgb(186, 93, 7)",
  "rgb(230, 30, 50)", "rgb(176, 98, 57)", "rgb(30, 50, 100)", "rgb(141, 103, 171)", "rgb(81, 121, 161)", "rgb(20, 138, 8)",
  "rgb(165, 103, 82)", "rgb(220, 20, 140)", "rgb(80, 55, 80)", "rgb(233, 20, 41)", "rgb(141, 103, 171)", "rgb(13, 115, 236)",
  "rgb(13, 115, 236)", "rgb(125, 75, 50)", "rgb(140, 25, 50)", "rgb(13, 115, 236)", "rgb(220, 20, 140)", "rgb(13, 115, 236)",
  "rgb(232, 17, 91)", "rgb(175, 40, 150)", "rgb(83, 122, 161)", "rgb(230, 30, 50)", "rgb(20, 138, 8)", "rgb(13, 115, 236)",
  "rgb(39, 133, 106)", "rgb(71, 125, 149)", "rgb(13, 114, 237)", "rgb(13, 115, 236)", "rgb(20, 138, 8)", "rgb(140, 25, 50)",
  "rgb(140, 25, 50)", "rgb(175, 40, 150)", "rgb(71, 125, 149)", "rgb(119, 119, 119)", "rgb(220, 20, 140)", "rgb(233, 20, 41)",
  "rgb(30, 50, 100)", "rgb(13, 115, 236)", "rgb(230, 30, 50)", "rgb(0, 100, 80)", "rgb(225, 51, 0)", "rgb(96, 129, 8)",
  "rgb(165, 103, 82)", "rgb(232, 17, 91)", "rgb(141, 103, 171)", "rgb(20, 138, 8)",
];

const labels = [
  "Songs", "Shows", "Audiobooks", "Live Nights", "Picked For You", "Fresh Releases", "Regional", "Local Icons",
  "Pop", "Climbing", "Charts", "Learning", "Stories", "Laughs", "Mood", "Dance / Club", "Hip-Hop", "Indie",
  "Rock", "Love", "Workout", "Chill", "Focus", "Sleep", "Party", "Classical", "Jazz", "Soul", "Folk & Acoustic",
  "Gaming", "Travel", "Cooking", "Kids & Family", "Metal", "Country", "Latin", "Afro", "Blues", "Punk",
  "Funk", "Reggae", "Ambient", "Wellness", "Equal", "Summer", "Winter", "At Home", "Throwback", "Discover",
  "Radio", "Spoken Word", "Comedy Clips", "Instrumental", "Anime", "Film Scores", "Musicals", "World",
  "Electronic", "Lo-Fi", "Retro", "Gospel", "Celebration", "Romance", "Calm", "Driving", "Commute",
  "Late Night", "Coffee", "Rainy Days", "Weekend",
];

export function SearchScreen() {
  return (
    <Shell active="search">
      <section className="sp-search-page sp-shelf" aria-label="Browse everything">
        <ShelfHeader title="Browse everything" more={null} />
        <ul className="sp-tiles">
          {labels.map((label, index) => (
            <li key={label}>
              <Tile label={label} color={pick(colors, index)} index={index} />
            </li>
          ))}
        </ul>
      </section>
    </Shell>
  );
}
