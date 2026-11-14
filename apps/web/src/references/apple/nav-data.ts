import { label } from "./text";

/**
 * Global navigation and footer directory. Only the shape is measured from the original (item count,
 * group count, link count and label length per group); every label is generated neutral text.
 */
export type FlyoutGroup = { header: string; links: string[]; elevated?: boolean; extra?: string[] };
export type NavItem = { id: string; label: string; groups: FlyoutGroup[] };

const group = (headerLength: number, linkLengths: number[], seed: number, elevated = false): FlyoutGroup => ({
  header: label(headerLength, seed),
  links: linkLengths.map((length, index) => label(length, seed * 31 + index)),
  elevated,
});

/** Model names in elevated groups read as a lineup, not as labels. */
const lineup = (count: number, extra: string[]): string[] => [
  "View All",
  ...Array.from({ length: count }, (_, index) => `Model ${["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"][index]}`),
  ...extra,
];

const flyout = (seed: number, elevated: { header: number; links: string[]; small?: number[] }, rest: [number, number[]][]): FlyoutGroup[] => [
  {
    header: label(elevated.header, seed),
    links: elevated.links,
    elevated: true,
    extra: elevated.small?.map((length, index) => label(length, seed + 40 + index)),
  },
  ...rest.map(([header, links], index) => group(header, links, seed + 7 * (index + 1))),
];

export const NAV: NavItem[] = [
  { id: "shop", label: "Shop", groups: flyout(1, { header: 9, links: ["See What Is New", "Laptop", "Tablet", "Phone", "Wrist", "Optic", "Earbuds", "Add-on Gear"], small: [] }, [[11, [12, 12, 13, 14, 9, 14]], [19, [21, 9, 8, 21, 10]]]) },
  { id: "desk", label: "Desk", groups: flyout(2, { header: 11, links: lineup(7, []), small: [12, 18] }, [[8, [8, 14, 15, 13, 14, 9, 14]], [13, [11, 9, 8, 27, 13, 20, 18, 7, 16, 9, 13]]]) },
  { id: "slate", label: "Slate", groups: flyout(3, { header: 12, links: lineup(5, []), small: [11, 12] }, [[9, [9, 16, 13, 14, 9, 14]], [14, [12, 9, 9, 27, 13, 20, 7, 9, 13]]]) },
  { id: "phone", label: "Phone", groups: flyout(4, { header: 14, links: lineup(5, []), small: [14, 19] }, [[11, [11, 18, 13, 14, 22, 9, 14]], [16, [14, 9, 6, 27, 13, 14, 15, 7, 17, 13]]]) },
  { id: "wrist", label: "Wrist", groups: flyout(5, { header: 13, links: lineup(5, []), small: [13, 15] }, [[10, [16, 17, 23, 13, 14, 9, 14]], [15, [19, 9, 10, 25, 13, 14, 9]]]) },
  { id: "optic", label: "Optic", groups: flyout(6, { header: 14, links: lineup(1, []) }, [[11, [21, 28, 11, 9, 14]], [16, [24, 9, 11, 31]]]) },
  { id: "earbuds", label: "Earbuds", groups: flyout(7, { header: 15, links: lineup(3, []), small: [15] }, [[12, [14, 18, 18, 19]], [17, [15, 9, 14, 11, 14]]]) },
  { id: "house", label: "House", groups: flyout(8, { header: 12, links: lineup(3, []), small: [14] }, [[9, [9, 26, 21, 14]], [14, [12, 22, 21, 12, 8, 8, 11, 7]]]) },
  { id: "media", label: "Media & Games", groups: flyout(9, { header: 21, links: ["View All", "Bundle", "Stream", "Listen", "Play", "Train", "Read", "Podcasts", "Cloud Space", "Pay"] }, [[7, [16, 19]]]) },
  { id: "gear", label: "Add-on Gear", groups: flyout(10, { header: 15, links: ["Shop All Add-ons", "Laptop", "Tablet", "Phone", "Wrist", "Optic", "Earbuds", "Home", "Media", "Cases"] }, [[16, [21, 19, 21, 18, 16, 6, 21, 16, 16, 18, 8]], [15, [12, 13, 13, 22]]]) },
  { id: "help", label: "Helpdesk", groups: flyout(11, { header: 15, links: ["Overview", "Laptop", "Tablet", "Phone", "Wrist", "Optic", "Earbuds", "Home", "Media"] }, [[8, [9, 14, 10, 6]], [14, [13, 26, 23, 13]]]) },
];

/** Footer directory: five columns, each a stack of sections (heading length, link lengths). */
const COLUMNS: [number, number[]][][] = [
  [[14, [5, 3, 4, 6, 5, 6, 7, 4, 6, 11, 10]], [12, [6, 10, 9, 10]]],
  [[7, [25, 19, 10]], [13, [9, 8, 11, 12, 14, 11, 14, 11, 9]]],
  [[11, [12, 10, 14, 18, 10, 15, 21, 13, 14, 9, 22, 12, 13]]],
  [[12, [18, 17]], [13, [19, 13, 16]], [14, [20]], [14, [20, 30, 34, 26]]],
  [[12, [13, 9, 11, 23, 7, 25, 23]], [11, [8, 16, 20, 9, 19, 6, 13]]],
];

export type FooterSection = { title: string; links: string[] };
export const FOOTER_COLUMNS: FooterSection[][] = COLUMNS.map((column, c) =>
  column.map(([title, links], s) => ({
    title: label(title, 200 + c * 10 + s),
    links: links.map((length, index) => label(length, 300 + c * 40 + s * 13 + index)),
  })),
);

/** Lengths of the five legal links in the bottom row. */
export const LEGAL_LINKS = ["Privacy Notice", "Usage Terms", "Sales and Returns", "Notices", "Site Index"];
