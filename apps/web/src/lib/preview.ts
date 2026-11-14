import type { Print } from "@denizbarish/uxprint";
import { renderStack } from "./fonts";

export type CardPreview = {
  canvas: string;
  text: string;
  muted: string;
  border: string;
  fontFamily: string;
  heading: { weight: number; tracking: string };
  primary: { background: string; color: string; radius: string };
  secondary: { background: string; color: string; radius: string };
  strip: string[];
};

export type CardData = {
  slug: string;
  name: string;
  category: Print["category"];
  theme: Print["theme"];
  tags: string[];
  summary: string;
  preview: CardPreview;
};

const HEX = /#[0-9a-f]{6}(?:[0-9a-f]{2})?/i;

function specColor(value: string | undefined): string | undefined {
  return value?.match(HEX)?.[0];
}

function radiusOf(value: string | undefined, fallback: string): string {
  const px = value?.match(/\d+(\.\d+)?px/)?.[0];
  return px ?? fallback;
}

/** Everything a card needs, drawn from the print's own tokens. Works for any print that passes the schema. */
export function toCardData(print: Print): CardData {
  const { color, typography, components } = print;
  const canvas = color.background[0]!.value;
  const text = color.text[0]!.value;
  const muted = color.text[2]?.value ?? color.text[1]?.value ?? text;
  const accent = color.accent[0]!.value;
  const pill = print.radius.find((r) => /9999|rounded|full|pill/.test(`${r.name} ${r.value}`))?.value;
  const fallbackRadius = pill ?? print.radius[0]!.value;
  const find = (pattern: RegExp) => components.find((component) => pattern.test(component.name));
  const primary = find(/button.*primary|primary.*button/i);
  const secondary = find(/button.*secondary|secondary.*button/i);
  const sans = typography.families.find((family) => family.role === "sans" || family.role === "display") ?? typography.families[0]!;
  const largest = typography.scale.find((style) => style.family !== "mono") ?? typography.scale[0]!;
  const strip = [...color.background, ...color.text, ...color.accent, ...color.semantic]
    .map((token) => token.value)
    .filter((value, index, all) => value.length === 7 && all.indexOf(value) === index)
    .slice(0, 12);

  return {
    slug: print.slug,
    name: print.name,
    category: print.category,
    theme: print.theme,
    tags: print.tags,
    summary: print.summary,
    preview: {
      canvas,
      text,
      muted,
      border: color.border[0]?.value ?? muted,
      fontFamily: renderStack(sans),
      heading: { weight: largest.weight, tracking: relativeTracking(largest.tracking, largest.size) },
      primary: {
        background: specColor(primary?.spec.background) ?? accent,
        color: specColor(primary?.spec.color) ?? canvas,
        radius: radiusOf(primary?.spec.radius, fallbackRadius),
      },
      secondary: {
        background: specColor(secondary?.spec.background) ?? "transparent",
        color: specColor(secondary?.spec.color) ?? text,
        radius: radiusOf(secondary?.spec.radius, fallbackRadius),
      },
      strip,
    },
  };
}

/** The card draws the headline far smaller than its recorded size, so pixel tracking is converted to em. */
function relativeTracking(tracking: string | undefined, size: string): string {
  if (!tracking) return "normal";
  const pixels = tracking.match(/^(-?\d*\.?\d+)px$/);
  return pixels ? `${(Number(pixels[1]) / parseFloat(size)).toFixed(4)}em` : tracking;
}
