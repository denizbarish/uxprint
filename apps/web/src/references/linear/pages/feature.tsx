import { Media, SitePage } from "../chrome";
import "./feature.css";

/* Feature template (rebuilt from the insights page): narrow centred column, paired figures, use cases, specs. */

const pairsA = [
  { title: "Open any number in detail", text: "Use quick filters to see the issues behind a number and act on them right away." },
  { title: "Step back to focus", text: "Get a wide view of everything that is going on in the workspace, find where to look and make a better call." },
];

const pairsB = [
  { title: "Built from blocks", text: "Shape every dashboard with flexible layouts. From quick numbers to detailed charts and tables." },
  { title: "Made to share. Private by default.", text: "Share dashboards to align the whole team, or keep them private until you are ready." },
];

const useCases = [
  { label: "Where effort goes", question: "“Where do we spend our time and people?”" },
  { label: "Bug backlog", question: "“Are we getting faster at fixing bugs?”" },
  { label: "Clean data", question: "“Do we rank our issues the same way?”" },
];

const specs = ["Controls", "Measure", "Group by", "Split", "Time grouping", "Chart kinds", "Dashboard layout options", "Deeper analysis", "Data export"];

function Pair({ items }: { items: { title: string; text: string }[] }) {
  return (
    <div className="lr-feature-pair">
      {items.map((item) => (
        <div className="lr-feature-pair__cell" key={item.title}>
          <Media className="lr-media--bare lr-feature-pair__media" />
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
}

export function FeatureScreen() {
  return (
    <SitePage className="lr-feature">
      <Media className="lr-media--flat lr-feature-art" label="Hero animation" />
      <header className="lr-feature-hero">
        <p className="lr-feature-hero__label">Acme Insights</p>
        <h1 className="lr-feature-hero__title">
          Quick answers.
          <br /> Lasting dashboards.
        </h1>
        <p className="lr-feature-hero__text">
          Take the guessing out of product planning with
          <br /> built-in reports and dashboards for product teams.
        </p>
      </header>
      <section className="lr-feature-block" aria-labelledby="h-a">
        <h2 className="lr-title-1" id="h-a">
          Quick reports for
          <br /> any stream of work
        </h2>
        <p className="lr-feature-lead">
          <strong>Live reports, made for product teams.</strong> Group, split and chart the data from across your Acme workspace. Spot the trends, clear blockers and keep moving faster.
        </p>
        <Pair items={pairsA} />
      </section>
      <a className="lr-feature-quote" href="#story">
        <span>&ldquo;Insights is a core part of how we see the effort and output of our team&rdquo;</span>
        <Media className="lr-feature-quote__logo" />
      </a>
      <section className="lr-feature-block lr-feature-block--b" aria-labelledby="h-b">
        <h2 className="lr-title-1" id="h-b">
          Collect reports
          <br /> into dashboards
        </h2>
        <p className="lr-feature-lead">
          <strong>Build your own dashboards for every team.</strong> From weekly product reviews to one-off research reports, dashboards give a single page to watch and study key numbers.
        </p>
        <Media className="lr-feature-wide" label="Dashboard" />
        <hr className="lr-feature-rule" />
        <Pair items={pairsB} />
      </section>
      <section className="lr-feature-cases" aria-labelledby="h-cases">
        <h2 className="lr-feature-cases__label" id="h-cases">
          Use cases
        </h2>
        <p className="lr-feature-cases__title">How teams use Acme Insights</p>
        <div className="lr-feature-cases__grid">
          {useCases.map((item) => (
            <button type="button" className="lr-feature-case" key={item.label}>
              <span className="lr-feature-case__label">
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <rect x="2" y="7" width="2" height="5" rx="1" fill="currentColor" />
                  <rect x="6" y="4" width="2" height="8" rx="1" fill="currentColor" />
                  <rect x="10" y="2" width="2" height="10" rx="1" fill="currentColor" />
                </svg>
                {item.label}
              </span>
              <span className="lr-feature-case__question">{item.question}</span>
              <span className="lr-feature-case__plus" aria-hidden="true">
                +
              </span>
            </button>
          ))}
        </div>
      </section>
      <section className="lr-feature-logos" aria-label="Customers">
        <p>Trusted by strong product and engineering teams</p>
        <a href="#customers" className="lr-feature-logos__track" aria-label="Meet our customers">
          {Array.from({ length: 12 }, (_, index) => (
            <Media key={index} className="lr-media--bare lr-feature-logos__item" />
          ))}
        </a>
      </section>
      <section className="lr-feature-specs" aria-labelledby="h-specs">
        <div>
          <h2 className="lr-title-2" id="h-specs">
            Tech specs
          </h2>
          <p className="lr-body">Everything that comes with it.</p>
        </div>
        <ul>
          {specs.map((spec) => (
            <li key={spec}>
              <button type="button" className="lr-feature-spec">
                <span>{spec}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M4.5 2.5 8 6l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section className="lr-feature-cta" aria-labelledby="h-feature-cta">
        <div>
          <h3 id="h-feature-cta">Turn on Insights for your team</h3>
          <p className="lr-body">Insights comes with the Business plan. Dashboards come with Enterprise.</p>
        </div>
        <div className="lr-feature-cta__actions">
          <a className="lr-btn lr-btn--40 lr-btn--primary" href="../signup-method/">
            Get started
          </a>
          <a className="lr-btn lr-btn--40 lr-btn--secondary" href="#contact">
            Contact sales
          </a>
        </div>
      </section>
    </SitePage>
  );
}
