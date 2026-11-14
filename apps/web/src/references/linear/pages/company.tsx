import { Arrow, Cta, Media, SitePage } from "../chrome";
import "./company.css";

/* Company template (rebuilt from the about page): statement hero, film, story, team, investors. */

const first = ["Ana", "Ben", "Cleo", "Dan", "Eli", "Fay", "Gus", "Hana", "Ivo", "Jun", "Kim", "Lior", "Mira", "Nils", "Oto", "Pia", "Quin", "Rosa", "Sven", "Tara", "Uma", "Vik", "Wren", "Yara", "Zeno"];
const last = ["Arden", "Brook", "Castell", "Dorsey", "Ellery", "Fenwick", "Garrow", "Holt", "Ingram", "Jessop", "Kestrel", "Lowell", "Marlow", "Norland", "Orwin", "Prescott"];

/** Deterministic placeholder names, so the list keeps its length and rhythm without real people. */
function name(index: number): string {
  return `${first[(index * 7) % first.length]} ${last[(index * 5 + Math.floor(index / 3)) % last.length]}`;
}

const leads = [
  "Co-founder, CEO",
  "Co-founder, CPO",
  "Co-founder, CTO",
  "COO",
  "Head of Engineering",
  "Head of Sales",
  "Head of Security",
  "Head of Product Design",
];

const angels = [
  "CEO, Northwind",
  "CEO, Globex",
  "Former CEO, Initech",
  "CEO, Umbrella",
  "Former CEO, Hooli",
  "CEO, Vandelay",
  "CEO, Stark Labs",
  "CTO, Wayne Works",
  "CEO, Acme Studio",
  "Founder, Pied Piper",
  "CEO, Soylent",
  "Former CEO, Cyberdyne",
  "CEO, Tyrell",
  "CTO, Wonka",
  "CEO, Oscorp",
  "Former COO, Aperture",
  "Partner, First Fund",
  "Designer, Investor",
  "Founder, Nakatomi",
  "Investor",
];

export function CompanyScreen() {
  return (
    <SitePage className="lr-company">
      <section className="lr-container lr-company-hero">
        <h1 className="lr-display">
          Building the tools for the next
          <br /> chapter of product development
        </h1>
        <p className="lr-body">Software is changing how products get built. We are shaping the way that comes next.</p>
      </section>
      <Media className="lr-company-film" label="Company film" />
      <section className="lr-container lr-split lr-company-story" aria-labelledby="h-story">
        <h2 className="lr-title-1" id="h-story">
          A new kind of
          <br /> product tool
        </h2>
        <div>
          <p className="lr-intro">Software making is at a turning point. New tools are quickly changing the way that products are made.</p>
          <p className="lr-body">
            New tools raise what teams can make, but they also raise the bar for clarity and teamwork. At Acme, we are building the
            system for this new chapter of product work: one shared place where teams and helpers work together.
          </p>
          <p className="lr-body">
            Started in 2019, Acme has become the choice of more than 50,000 companies, from young teams to the largest software firms,
            to plan, build and ship.
          </p>
          <p className="lr-body">
            Our team works across North America and Europe, and we keep growing around the world. What holds us together is a tight
            focus, quick shipping and deep care for good software.
          </p>
        </div>
      </section>
      <section className="lr-container lr-split lr-company-team-head" aria-labelledby="h-team">
        <h2 className="lr-title-1" id="h-team">
          Meet the people
          <br /> behind Acme
        </h2>
        <div>
          <p className="lr-intro">We are designers and engineers. Problem solvers and story tellers. We are a varied group of people, all makers at heart.</p>
          <a className="lr-link lr-link--quiet lr-company-hiring" href="#careers">
            We are hiring <Arrow />
          </a>
        </div>
      </section>
      <ul className="lr-company-leads">
        {leads.map((role, index) => (
          <li key={role}>
            <a className="lr-company-lead" href="#person">
              <Media className="lr-media--bare lr-company-lead__photo" />
              <strong>{name(index)}</strong>
              <span>{role}</span>
            </a>
          </li>
        ))}
      </ul>
      <ul className="lr-company-names" aria-label="Team">
        {Array.from({ length: 196 }, (_, index) => (
          <li key={index}>{name(index + 8)}</li>
        ))}
      </ul>
      <section className="lr-container lr-company-backers" aria-labelledby="h-backers">
        <h2 className="lr-title-1" id="h-backers">
          Backed by
          <br /> the best
        </h2>
        <div>
          <div className="lr-company-funds">
            {["Partner, First Fund", "Partner, Second Fund"].map((role, index) => (
              <a className="lr-company-fund" href="#fund" key={role}>
                <Media className="lr-company-fund__logo" />
                <strong>
                  {name(index + 40)} <span aria-hidden="true">&#8599;</span>
                </strong>
                <span>{role}</span>
              </a>
            ))}
          </div>
          <ul className="lr-company-angels">
            {angels.map((role, index) => (
              <li key={role}>
                <strong>{name(index + 60)}</strong>
                <span>{role}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Cta />
    </SitePage>
  );
}
