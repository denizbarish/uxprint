/**
 * Neutral copy of a given length, so screens keep the original's line count without carrying any of its text.
 * Deterministic: the same length and seed always give the same words.
 */
const BODY = (
  "every part of the design was shaped around the way people really use it at home at work and on the go " +
  "the frame is light and strong the display is bright in sunlight and the battery lasts through a long day " +
  "setup takes a minute and your settings move over on their own so you can start right where you left off " +
  "we test each model for years before it ships and we keep updating it long after you bring it home " +
  "materials are chosen to last and to be recovered at the end of their life with as little waste as possible"
).split(" ");

const LABEL = (
  "Explore Overview Lineup Compare Models Guide Setup Trade Offers Finance Service Care Plans Apps Studio Work " +
  "Learning Business Gift Cards Account Orders Delivery Pickup Stores Sessions Repair Manuals Community Updates " +
  "Display Battery Camera Audio Charger Cases Bands Covers Cables Stands Travel Kids Family Health Fitness Music " +
  "Shows Games Reading News Photos Storage Security Privacy Values Careers Investors Events Contact Policies Terms"
).split(" ");

/** Body sentences of about `length` characters. */
export function text(length: number, seed = 0): string {
  const out: string[] = [];
  let size = 0;
  let index = (seed * 13) % BODY.length;
  let sentence = 0;
  while (size < length - 1) {
    let word = BODY[index % BODY.length] ?? "";
    if (sentence === 0) word = word.charAt(0).toUpperCase() + word.slice(1);
    sentence += 1;
    const last = size + word.length + 2 >= length;
    if (last || sentence > 11 + ((index + seed) % 6)) {
      word += ".";
      sentence = 0;
    }
    out.push(word);
    size += word.length + 1;
    index += 1;
  }
  return out.join(" ");
}

/** A short Title Case label of about `length` characters (menus, links, column headings). */
export function label(length: number, seed = 0): string {
  const words: string[] = [];
  let size = 0;
  let index = (seed * 7 + length * 3) % LABEL.length;
  while (size < length - 2 || words.length === 0) {
    const word = LABEL[index % LABEL.length] ?? "";
    if (words.length > 0 && size + word.length + 1 > length + 3) break;
    words.push(word);
    size += word.length + (words.length > 1 ? 1 : 0);
    index += 5;
  }
  return words.join(" ");
}

/** A short sentence-case headline of about `length` characters, no final full stop. */
export function headline(length: number, seed = 0): string {
  const t = text(length + 2, seed + 101).replace(/\.$/, "");
  return t.length > length + 4 ? t.slice(0, t.lastIndexOf(" ", length + 2)).replace(/\.$/, "") : t.replace(/\./g, "");
}
