import { Arrow, Closing, Media, SitePage } from "../chrome";
import "./home.css";

const pillars = [
  { fig: "Fig 0.1", title: "Made with care", text: "Acme is shaped by the habits and working rules of strong product teams." },
  { fig: "Fig 0.2", title: "Shared with helpers", text: "Built for work that people and helpers share. From first drafts to merged changes." },
  { fig: "Fig 0.3", title: "Tuned for pace", text: "Cuts the noise and keeps the momentum, so teams ship quickly and stay focused." },
];

const sections = [
  {
    id: "intake",
    title: ["Requests", "and connections"],
    intro: "Turn conversations and customer notes into tracked issues that are routed, labelled and ranked for the right team without a manual step.",
    features: [["Acme helper", "Sorting"], ["Request inbox", "Acme asks"]],
  },
  {
    id: "planning",
    title: ["Planning", "and tracking"],
    intro: "Go from first idea to release with one plan. Keep the team aligned with shared goals, clear roadmaps and specs that stay up to date.",
    features: [["Projects", "Pulse", "Timeline view"], ["Documents", "Goals", "Insights"]],
  },
  {
    id: "agents",
    title: ["Helpers", "and rules"],
    intro: "Set up helpers that work next to you as teammates. Pair with them on hard tasks or hand over whole issues from start to finish.",
    features: [["Acme helper", "Sorting"], ["Remote code helper", "Acme connector"]],
  },
  {
    id: "build",
    title: ["Write, check,", "and ship"],
    intro: "Move through code review with clear diffs, more context and fewer rounds of comments. Keep changes flowing without giving up on quality.",
    features: [["Issues", "Guided reviews", "Diffs"], ["Git rules", "Cycles", "Releases"]],
  },
];

const updates = [
  { title: "Use your own model keys", text: "You can now connect your own model keys to the remote code helper and its runs.", date: "Nov 12, 2026" },
  { title: "Diffs on the phone", text: "Diffs, the quick and focused review view, now works on the phone apps as well.", date: "Nov 4, 2026" },
  { title: "Chat and repo loop triggers", text: "Loops now react to changes in Acme, in chat threads and in your code hosting.", date: "Oct 22, 2026" },
  { title: "Stacked pull requests", text: "Stacked pull requests now show in Diffs with each layer of the stack in order.", date: "Oct 8, 2026" },
];

export function HomeScreen() {
  return (
    <SitePage className="lr-home">
      <section className="lr-container lr-home-hero">
        <h1 className="lr-display lr-home-hero__title">
          The planning and delivery
          <br /> system for teams and helpers
        </h1>
        <div className="lr-home-hero__row">
          <p className="lr-body">Made for planning and building products. Shaped for how teams work now.</p>
          <a className="lr-link lr-home-hero__news" href="#news">
            <span>New</span> Loops <Arrow />
          </a>
        </div>
      </section>
      <Media className="lr-home-shot" label="Product window" />
      <div className="lr-container">
        <a className="lr-home-logos" href="#customers" aria-label="Customer stories">
          {Array.from({ length: 7 }, (_, index) => (
            <Media key={index} className="lr-media--bare lr-home-logos__item" />
          ))}
        </a>
        <p className="lr-mono-label lr-home-logos__caption">Trusted by teams that ship every day</p>
        <h2 className="lr-title-1 lr-home-statement">
          A new kind of product tool. <span>Made for modern teams with helpers built into the core, Acme sets a new bar for planning and building products.</span>
        </h2>
        <div className="lr-home-pillars">
          {pillars.map((pillar) => (
            <div className="lr-home-pillar" key={pillar.fig}>
              <span className="lr-mono-label">{pillar.fig}</span>
              <Media className="lr-media--bare lr-home-pillar__art" />
              <h3 className="lr-home-pillar__title">{pillar.title}</h3>
              <p className="lr-body">{pillar.text}</p>
            </div>
          ))}
        </div>
      </div>
      {sections.map((section) => (
        <section className={`lr-home-section lr-home-section--${section.id}`} key={section.id} aria-labelledby={`h-${section.id}`}>
          <div className="lr-container lr-split">
            <h2 className="lr-title-1" id={`h-${section.id}`}>
              {section.title[0]}
              <br />
              {section.title[1]}
            </h2>
            <div>
              <p className="lr-intro">{section.intro}</p>
              <a className="lr-link lr-split__more" href="#more">
                Learn more <Arrow />
              </a>
            </div>
          </div>
          <Media className="lr-home-section__shot" label="Product window" />
          <div className="lr-container lr-features">
            <span className="lr-features__label">Features</span>
            {section.features.map((column, index) => (
              <ul className="lr-features__column" key={index}>
                {column.map((feature) => (
                  <li key={feature}>
                    <button type="button" className="lr-features__item">
                      {feature} <span aria-hidden="true">+</span>
                    </button>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>
      ))}
      <section className="lr-home-changelog" aria-labelledby="h-changelog">
        <div className="lr-container">
          <h2 className="lr-title-1" id="h-changelog">
            Changelog
          </h2>
          <ol className="lr-timeline">
            {updates.map((update, index) => (
              <li key={update.title}>
                <a className="lr-timeline__item" href="#changelog">
                  <span className="lr-timeline__dot" data-current={index === 0 ? "" : undefined} aria-hidden="true" />
                  <span className="lr-timeline__title">{update.title}</span>
                  <span className="lr-timeline__text">{update.text}</span>
                  <span className="lr-mono-label">{update.date}</span>
                </a>
              </li>
            ))}
          </ol>
          <a className="lr-link lr-home-changelog__all" href="#changelog">
            View all <Arrow />
          </a>
        </div>
      </section>
      <Closing />
    </SitePage>
  );
}
