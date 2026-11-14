"use client";

import { LegacyPage } from "../chrome";
import { useBrand, withBrand } from "../brand";

const groups: [string, string[]][] = [
  ["About", ["Jobs at Acme", "Customers", "Blog", "Documentation", "Docs API", "Global availability", "Press", "Acme Logos", "Environment"]],
  ["Products", ["Acme Payments", "Components", "Acme Checkout", "Acme Plans & Renewals", "Acme Platforms", "Platforms Pricing", "Acme Queries", "Acme Shield", "Acme Incorporate", "Pricing", "Partners"]],
  ["Use cases", ["Acme for software businesses", "Acme for marketplaces", "Acme for platforms"]],
  ["Acme Guides", ["Acme Guides", "More resources"]],
  ["Legal", ["Privacy", "Code of Conduct", "Marks Legal", "Acme Checkout Legal", "Legal", "Restricted Business", "Services Agreement", "Platforms Legal", "Payment Method Terms", "Privacy Framework Policy", "Platform Account Legal", "Levies Strategy Legal"]],
  ["Contact", ["Contact Acme", "Contact support", "Contact sales"]],
];

/** Directory template (sitemap): tinted title band, then groups of links in three columns beside a group label. */
export function DirectoryScreen() {
  const brand = useBrand();
  return (
    <LegacyPage accent="#635bff" footerTone="tint">
      <section className="d-hero">
        <div className="p-container">
          <h1 className="p-h2">Sitemap</h1>
        </div>
        <span className="d-bar d-bar--a" aria-hidden="true" />
        <span className="d-bar d-bar--b" aria-hidden="true" />
        <span className="d-bar d-bar--c" aria-hidden="true" />
        <span className="d-bar d-bar--d" aria-hidden="true" />
        <span className="d-bar d-bar--e" aria-hidden="true" />
      </section>
      <section className="d-body">
        <div className="p-container">
          {groups.map(([title, links]) => (
            <div key={title} className="d-group">
              <h2 className="p-feature__title">{withBrand(title, brand)}</h2>
              <ul>
                {links.map((link) => (
                  <li key={link}>
                    <a href="#">{withBrand(link, brand)}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </LegacyPage>
  );
}
