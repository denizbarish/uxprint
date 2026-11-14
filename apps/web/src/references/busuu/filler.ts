/**
 * Neutral copy of a given length, so text blocks keep the original's line count without carrying
 * any of its words. Deterministic: the same seed always gives the same text.
 */
const WORDS = (
  "short daily lessons help you build a habit that lasts and every unit ends with a quick review so you " +
  "always know what to practise next our team writes each lesson with care and tests it with real people " +
  "before it goes live you can learn at home on the train or during a break and pick up exactly where " +
  "you stopped the app keeps your progress in sync across devices and reminds you when it is time to " +
  "practise again we read every message we receive and use it to make the next release a little better"
).split(" ");

export function filler(length: number, seed = 0): string {
  const out: string[] = [];
  let size = 0;
  let index = (seed * 7) % WORDS.length;
  let sentence = 0;
  while (size < length) {
    let word = WORDS[index % WORDS.length] ?? "";
    if (sentence === 0) word = word.charAt(0).toUpperCase() + word.slice(1);
    sentence += 1;
    const end = sentence > 9 + ((index + seed) % 7) || size + word.length + 2 >= length;
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

/** Short title-like phrase of about `length` characters, without a closing full stop. */
export function phrase(length: number, seed = 0): string {
  const text = filler(length + 8, seed).replace(/\.$/, "");
  const cut = text.slice(0, length).replace(/\s+\S*$/, "").replace(/\.$/, "");
  return cut.length > 2 ? cut.replace(/\./g, "") : text.slice(0, length);
}

/** Fourteen course names used in menus, footers and pickers. Not the original list. */
export const LANGUAGES = [
  "Swedish", "Romanian", "Finnish", "Catalan", "Danish", "Hebrew", "Slovak",
  "Greek", "Serbian", "Latvian", "Persian", "Basque", "Indonesian", "Kazakh",
];

/** Flag stand-ins: two flat colours per course, drawn as a split disc. */
export const FLAG_COLORS: [string, string][] = [
  ["#2f6fd6", "#f5c542"], ["#3a7bd5", "#f4f4f4"], ["#f08a24", "#2e9d4f"], ["#d93a3a", "#2f5fb3"],
  ["#c8102e", "#f4f4f4"], ["#f4f4f4", "#2c5fb4"], ["#f4f4f4", "#3263c9"], ["#c8333a", "#3f8f4a"],
  ["#d6303a", "#f4f4f4"], ["#c8333a", "#2a4f9c"], ["#2b56a8", "#f2c230"], ["#d6303a", "#2b3f8f"],
  ["#2f6fd6", "#f5d742"], ["#d6303a", "#f5d742"],
];
