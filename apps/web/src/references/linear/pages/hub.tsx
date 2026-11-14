import { Arrow, SitePage } from "../chrome";
import "./hub.css";

/* Hub template (rebuilt from the contact page): title, three panel cards, a ruled list of resource links. */

const cards = [
  { title: "Sales", text: "Talk to our sales team about plans, pricing, larger contracts, or ask for a demo.", action: "Talk to sales" },
  { title: "Support", text: "We are here to help. Ask product questions, report a problem, or share your feedback.", action: "Contact support" },
  { title: "Other questions", text: "Get in touch with our team for press, partnerships, or anything else.", action: "hello@acme.test", phoneInList: true },
];

const resources = [
  { title: "Community", text: "Meet other people who use Acme", action: "Join the chat", external: true },
  { title: "Guides", text: "Learn how to use every part of Acme", action: "Acme guides" },
  { title: "Developers", text: "Build apps and integrations", action: "Developer guides" },
  { title: "Status", text: "All systems running", action: "Check status", external: true, live: true },
];

function Go({ external }: { external?: boolean }) {
  return external ? (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M4 8l4-4M5 3.5h3.5V7" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <Arrow />
  );
}

export function HubScreen() {
  return (
    <SitePage className="lr-hub" current="Contact">
      <div className="lr-container lr-hub-head">
        <h1 className="lr-title-1">How can we help?</h1>
      </div>
      <ul className="lr-hub-cards">
        {cards.map((card) => (
          <li key={card.title} className={card.phoneInList ? "lr-hub-card--wide-only" : undefined}>
            <a className="lr-hub-card" href="#contact">
              <h2>{card.title}</h2>
              <p>{card.text}</p>
              <span>
                {card.action} <Go />
              </span>
            </a>
          </li>
        ))}
      </ul>
      <section className="lr-container lr-hub-list" aria-labelledby="h-resources">
        <h3 id="h-resources">Resources</h3>
        <div className="lr-hub-items">
          <div className="lr-hub-item lr-hub-item--phone-only">
            <h4>Other</h4>
            <p>Get in touch with our team for press, partnerships, or anything else.</p>
            <a href="#mail">hello@acme.test</a>
          </div>
          {resources.map((item) => (
            <div className="lr-hub-item" key={item.title}>
              <h4>
                {item.title}
                {item.live ? <span className="lr-hub-live" aria-label="Running" /> : null}
              </h4>
              <p>{item.text}</p>
              <a href="#resource">
                {item.action} <Go external={item.external} />
              </a>
            </div>
          ))}
        </div>
      </section>
    </SitePage>
  );
}
