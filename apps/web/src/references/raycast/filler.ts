/**
 * Neutral body copy of a given length, so long-form screens keep the original's line count
 * without carrying any of its text. Deterministic: the same seed always gives the same words.
 */
const WORDS = (
  "we use the data you share with us only to run and improve the service and we keep it for as long as " +
  "your account is open or as the law requires you can ask for a copy of it at any time and we will answer " +
  "within a reasonable period our team reviews every request by hand and keeps a record of what was changed " +
  "when you contact support we store the message so that we can follow up later some features run on your " +
  "device and never leave it others need a server and are covered by the terms below please read them " +
  "carefully before you start and reach out if anything is unclear we may update this page from time to time"
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

/** Short title-like phrase of about `length` characters. */
export function phrase(length: number, seed = 0): string {
  const text = filler(length + 6, seed).replace(/\.$/, "");
  const cut = text.slice(0, length).replace(/\s+\S*$/, "");
  return cut.length > 2 ? cut.replace(/\.$/, "") : text.slice(0, length);
}
