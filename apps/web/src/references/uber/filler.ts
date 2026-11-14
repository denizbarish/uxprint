/**
 * Neutral copy of a given length, so screens keep the original's line count without carrying any of
 * its text. Deterministic: the same seed always gives the same words.
 */
const WORDS = (
  "plan your next trip in a few taps and pick the option that suits the day you can book now or later " +
  "share the route with someone you trust and follow every step on the map our partners earn on their own " +
  "schedule and get paid each week teams manage travel and meals from one place with clear reports for " +
  "every city we work with local groups to make streets cleaner and safer for everyone who moves through them"
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

/** Short title-like phrase of about `length` characters, no trailing full stop. */
export function phrase(length: number, seed = 0): string {
  const text = filler(length + 8, seed).replace(/\.$/, "");
  const cut = text.slice(0, length + 1).replace(/\s+\S*$/, "").replace(/\.$/, "");
  return cut.length > 2 ? cut.replace(/\./g, "") : text.slice(0, length);
}
