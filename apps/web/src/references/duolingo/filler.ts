/**
 * Neutral copy of a given length, so long-form screens keep the original's line count without
 * carrying any of its text. Deterministic: the same seed always gives the same words.
 */
const WORDS = (
  "short daily practice keeps a new skill fresh and every lesson builds on the one before it so progress " +
  "stays steady you can pause at any point and pick up again later we store only what the service needs " +
  "to work and you can ask us to remove it whenever you like rules may change over time and we will tell " +
  "you before they do please read each part with care and write to our team if a point is not clear to you " +
  "your account belongs to you and the choices you make in the settings apply across every device you use"
).split(" ");

export function filler(length: number, seed = 0): string {
  const out: string[] = [];
  let size = 0;
  let index = (seed * 11) % WORDS.length;
  let sentence = 0;
  while (size < length) {
    let word = WORDS[index % WORDS.length] ?? "";
    if (sentence === 0) word = word.charAt(0).toUpperCase() + word.slice(1);
    sentence += 1;
    const end = sentence > 8 + ((index + seed) % 6) || size + word.length + 2 >= length;
    if (end) {
      word += ".";
      sentence = 0;
    }
    out.push(word);
    size += word.length + 1;
    index += 1;
  }
  return out.join(" ");
}

/** Short phrase of about `length` characters, capitalised, without a closing period. */
export function phrase(length: number, seed = 0): string {
  const words = filler(length + 24, seed).replace(/\./g, "").split(" ");
  let out = words[0] ?? "";
  for (const word of words.slice(1)) {
    const next = `${out} ${word}`;
    if (Math.abs(next.length - length) > Math.abs(out.length - length)) break;
    out = next;
  }
  return out;
}

/** A question of about `length` characters. */
export function question(length: number, seed = 0): string {
  return `${phrase(Math.max(length - 1, 4), seed)}?`;
}

/** Neutral one-word labels for course tiles, flags and language lists. */
export const SUBJECTS = [
  "Botany", "Pottery", "Sailing", "Baking", "Drawing", "Guitar", "Knitting", "Rowing", "Hiking", "Origami",
  "Weaving", "Cycling", "Painting", "Chemistry", "Astronomy", "Birding", "Carving", "Climbing", "Diving",
  "Fencing", "Gardening", "Glasswork", "Juggling", "Kayaking", "Calligraphy", "Mapping", "Mosaic", "Orienteering",
  "Piano", "Printing", "Robotics", "Sculpture", "Sewing", "Skating", "Sketching", "Surfing", "Tailoring",
  "Typing", "Violin", "Woodwork", "Yoga", "Zoology",
];

/** Six-colour stripes used by the flag placeholders; flat surfaces, no real flags. */
export const SWATCHES = [
  ["#ff4b4b", "#ffc800"], ["#1cb0f6", "#ffffff"], ["#58cc02", "#ffffff"], ["#ce82ff", "#ffc800"],
  ["#ff9600", "#ffffff"], ["#2b70c9", "#ff4b4b"], ["#00cd9c", "#ffffff"], ["#4b4b4b", "#ffc800"],
];
