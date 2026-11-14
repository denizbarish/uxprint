"use client";

import { Chevron, Shell } from "../chrome";
import { filler, phrase } from "../filler";
import "./index-list.css";

/** Heading on the left (396px track), underlined links on the right; one or two link columns. */
function LinkGroup({ title, links, split }: { title: string; links: string[]; split?: boolean }) {
  return (
    <section className="ub-idx-group">
      <h2 className="ub-idx-group__title">{title}</h2>
      <ul className="ub-idx-group__links" data-split={split ? "" : undefined}>
        {links.map((link) => (
          <li key={link}>
            <a href="#">{link}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Filter({ label, value, options }: { label: string; value?: string; options: string[] }) {
  return (
    <label className="ub-idx-filter">
      <span>{label}</span>
      <span className="ub-idx-filter__field">
        <select defaultValue={value ?? ""}>
          <option value="">Choose...</option>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <Chevron />
      </span>
    </label>
  );
}

const DOC_LENGTHS = [
  [22, 18, 30, 28, 13, 25, 26, 21, 25, 46, 24, 21, 44, 32, 25, 46, 24, 21, 14, 34, 38, 18, 26, 19, 23, 30],
  [21, 17, 19, 27, 21, 42, 19, 44, 52, 28, 20, 29],
  [36, 28, 38, 60],
];

function docs(group: number) {
  return (DOC_LENGTHS[group] ?? []).map((length, index) => phrase(length, group * 40 + index + 1));
}

export function DocumentsScreen() {
  return (
    <Shell variant="legacy">
      <section className="ub-idx-hero" data-kind="documents">
        <div className="ub-wrap">
          <h1 className="ub-h1">Policy library</h1>
          <p className="ub-body">
            {filler(150, 4)} <a href="#" className="ub-ulink">partners.example.com</a>.
          </p>
        </div>
      </section>
      <section className="ub-idx-list">
        <div className="ub-wrap">
          <div className="ub-idx-filters">
            <Filter label="Region:" value="Northland" options={["Northland", "Southland"]} />
            <Filter label="Product line:" options={["Trips", "Food", "Teams"]} />
            <Filter label="Topic:" options={["Privacy", "Safety", "Terms"]} />
          </div>
          <LinkGroup title="All" links={docs(0)} />
          <LinkGroup title="Riders and passengers" links={docs(1)} />
          <LinkGroup title="Couriers and food" links={docs(2)} />
        </div>
      </section>
    </Shell>
  );
}

const PLACES = [
  "Amberly", "Bayford", "Brightwater", "Calder", "Cedarvale", "Clearbrook", "Coldharbour", "Copperfield", "Crestmoor", "Dalton",
  "Eastmere", "Elmstead", "Fairhaven", "Fernwood", "Glenhollow", "Goldcrest", "Granite Bay", "Greywick", "Harbourline", "Hartfield",
  "Highmoor", "Hollowfield", "Ironvale", "Juniper Coast", "Kestrel Point", "Kingsbridge", "Lakemont", "Larkspur", "Lindenfall", "Longmere",
  "Maplewood", "Marbleton", "Meadowcroft", "Millbrook", "Northgate", "Oakhurst", "Oldcastle", "Pinecrest", "Port Ellery", "Quarry Hill",
  "Ravenscar", "Redfern", "Riverbend", "Rosewood", "Saltmarsh", "Sandown", "Silverlake", "Southport", "Stonebridge", "Summerfield",
  "Thornbury", "Tidewater", "Upper Vale", "Valemont", "Westbrook", "Whitecliff", "Willowmere", "Windmere", "Wolfden", "Yarrow",
  "Ashcombe", "Birchgrove", "Bramblewood", "Driftwood", "Emberly", "Foxley", "Glimmerdale", "Hazelwick", "Islington Vale", "Moorfield",
  "Newhaven", "Orchard Isle",
];

export function DirectoryScreen() {
  return (
    <Shell variant="legacy">
      <section className="ub-idx-hero" data-kind="directory">
        <div className="ub-wrap">
          <h1 className="ub-h1">Ride with Acme in places across the map</h1>
          <p className="ub-body">
            {filler(90, 7)} <a href="#" className="ub-ulink">terminals</a> {filler(20, 8)}
          </p>
          <a href="#" className="ub-idx-hero__more">
            Check fares
          </a>
        </div>
      </section>
      <section className="ub-idx-list">
        <div className="ub-wrap">
          <LinkGroup title="Global" links={PLACES} split />
        </div>
      </section>
    </Shell>
  );
}
