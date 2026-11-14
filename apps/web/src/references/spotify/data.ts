/*
 * Neutral catalogue for the reference screens. Every name below is invented; lengths roughly follow
 * the measured pages so lines wrap the same way. Colours are muted placeholder tones for the covers.
 */

export const artists = [
  "Mira Vale", "Odd Harbor", "Lune Kaya", "Tamsin Rowe", "Northbound", "Elio Brandt", "Sefa Doru", "Juno Park",
  "Ardent Coast", "Ilka Moor", "The Lowlands", "Rae Okafor", "Penn & Wilde", "Cato Ferris", "Ida Lumen", "Halden",
  "Selin Ay", "Velvet Arcade", "Nico Sarre", "Bram Okoro",
];

export const tracks = [
  "Paper Lanterns", "Slow Tide", "Glasshouse", "Orbit Line", "Halfway Home", "Saltwater", "Copper Sky", "Night Ferry",
  "Little Fires", "Weather Vane", "Low Light", "Second Spring", "Northern Road", "Quiet Hours", "Blue Hour Drive",
  "Lemon Grove", "Faded Map", "Afterglow", "Window Seat", "Tin Roof Rain", "Long Way Round", "Harbour Lights",
  "Folded Letters", "Echo Valley",
];

export const albums = [
  "Field Notes", "Lumen", "Coastline", "After Hours", "Kite Season", "Small Rooms", "Open Water", "Ninefold",
  "Paper Moon", "Driftwood", "Signal", "Glass Garden", "Low Tide", "Palisade", "Wildflower", "Overpass",
  "Atlas", "Moth Light", "Daybreak", "Hollow Hills",
];

/** Cover placeholder tones (dark, muted), cycled through by index. */
export const tones = [
  "#4a2a2a", "#3d3a2b", "#2b3a40", "#3a2b40", "#2e3d2f", "#40342a", "#2a2f45", "#45302f", "#33402c", "#2f2f2f",
];

export const pick = <T,>(list: readonly T[], index: number): T => list[index % list.length] as T;

/** "Name, Name" credit line for a card or row. */
export const credit = (index: number, count = 1) =>
  Array.from({ length: count }, (_, step) => pick(artists, index * 3 + step * 7)).join(", ");

export const durations = ["3:42", "3:18", "4:05", "2:57", "3:31", "4:22", "3:09", "5:01", "3:47", "2:49", "4:13"];
