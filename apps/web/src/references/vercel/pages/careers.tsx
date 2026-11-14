"use client";

import { useId, useState } from "react";
import { Collapsible } from "@base-ui/react/collapsible";
import { Page } from "../chrome";
import { Btn, Icon, useBrand } from "../ui";
import { jobs } from "./careers-data";
import "./frame.css";
import "./careers.css";

const departments: [string, RegExp][] = [
  ["Engineering", /Engineer|Architect|Operator|Researcher/],
  ["Design", /Design/],
  ["Go to Market", /Partner|Advocate|Consultant|Strategist|Recruiter/],
  ["Operations", /Manager|Lead|Planner|Coordinator|Director|Analyst/],
  ["Content and Legal", /Writer|Editor|Counsel|Specialist/],
];

const locations = [...new Set(jobs.flatMap(([, place]) => (place ? place.split(", ") : [])))].sort();

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function Filter({ title, options, selected, onChange }: { title: string; options: string[]; selected: string[]; onChange: (next: string[]) => void }) {
  const id = useId();
  return (
    <Collapsible.Root className="vc-jobs-filter">
      <Collapsible.Trigger className="vc-jobs-filter__trigger vc-focus">
        {title}
        {selected.length ? <span className="vc-jobs-filter__count">{selected.length}</span> : null}
        <Icon name="chevron-down" className="vc-jobs-filter__chev" />
      </Collapsible.Trigger>
      <Collapsible.Panel className="vc-jobs-filter__panel">
        <fieldset className="vc-jobs-filter__list">
          <legend className="vc-sr-only">{title}</legend>
          {options.map((option, i) => (
            <label key={option} htmlFor={`${id}-${i}`} className="vc-jobs-filter__option">
              <input id={`${id}-${i}`} type="checkbox" checked={selected.includes(option)} onChange={() => onChange(toggle(selected, option))} />
              {option}
            </label>
          ))}
        </fieldset>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}

/** Careers template (framed hero and a filterable job list), built from /careers. */
export function CareersScreen() {
  const brand = useBrand();
  const [places, setPlaces] = useState<string[]>([]);
  const [teams, setTeams] = useState<string[]>([]);

  const shown = jobs.filter(([title, place]) => {
    const placeOk = places.length === 0 || (place !== null && places.some((p) => place.split(", ").includes(p)));
    const teamOk = teams.length === 0 || departments.some(([name, match]) => teams.includes(name) && match.test(title));
    return placeOk && teamOk;
  });

  return (
    <Page actions="demo">
      <div className="vc-frame vc-jobs">
        <span className="vc-frame__plus vc-frame__plus--tl" aria-hidden="true" />
        <section className="vc-frame__row vc-jobs-hero" aria-labelledby="jobs-title">
          <h1 className="vc-jobs-hero__title" id="jobs-title">
            <span>Join us</span> <span>to build what&apos;s next.</span>
          </h1>
          <Btn size={36} pill variant="primary">
            Open Positions
          </Btn>
        </section>
        <div className="vc-frame__row vc-jobs-head">
          <span aria-hidden="true" />
          <h2 className="vc-jobs-head__title">Open Positions at {brand}</h2>
        </div>
        <div className="vc-jobs-body">
          <aside className="vc-jobs-filters" aria-label="Filter positions">
            <Filter title="Location" options={locations} selected={places} onChange={setPlaces} />
            <Filter title="Department" options={departments.map(([name]) => name)} selected={teams} onChange={setTeams} />
          </aside>
          <ul className="vc-jobs-list" aria-live="polite">
            {shown.map(([title, place]) => (
              <li key={title}>
                <a href="#" className="vc-job vc-focus">
                  <span className="vc-job__text">
                    <span className="vc-job__title">{title}</span>
                    <span className="vc-job__place">{place}</span>
                  </span>
                  <span className="vc-job__more" aria-hidden="true">
                    Read more
                  </span>
                </a>
              </li>
            ))}
            {shown.length === 0 ? <li className="vc-jobs-empty">No open positions match these filters.</li> : null}
          </ul>
        </div>
        <span className="vc-frame__plus vc-frame__plus--br" aria-hidden="true" />
      </div>
    </Page>
  );
}
