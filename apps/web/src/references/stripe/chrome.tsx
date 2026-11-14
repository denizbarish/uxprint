"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { MegaMenuBar, MobileMenu } from "./nav";
import { useBrand, withBrand } from "./brand";
import { Chevron, Close, Globe, Wordmark } from "./icons";

/* ------------------------------------------------------------------ page roots */

/** Root for pages on the newer system: white page, 1266px framed column, 76px header. */
export function HdsPage({
  children,
  announcement = false,
  footer = "full",
  header,
}: {
  children: ReactNode;
  announcement?: boolean;
  footer?: "full" | "mini";
  /** Sub-sites (careers) bring their own header in place of the main one. */
  header?: ReactNode;
}) {
  const brand = useBrand();
  return (
    <div className="stripe-ref s-hds">
      {announcement ? <AnnouncementBar brand={brand} /> : null}
      {header ?? <HdsHeader brand={brand} />}
      <main>{children}</main>
      {footer === "full" ? <HdsFooter brand={brand} /> : <MiniFooter brand={brand} />}
    </div>
  );
}

/**
 * Root for pages on the older system: tinted page, 1080px column with dashed guide lines,
 * pill buttons and one accent colour per product (green on the measured page).
 */
export function LegacyPage({
  children,
  accent,
  tone = "light",
  footerTone = "white",
  header = "full",
}: {
  children: ReactNode;
  accent: string;
  tone?: "light" | "white";
  footerTone?: "white" | "tint";
  /** Legal pages use a bare header with the wordmark only. */
  header?: "full" | "logo";
}) {
  const brand = useBrand();
  return (
    <div className={`stripe-ref s-legacy s-legacy--${tone}`} style={{ "--accent": accent } as CSSProperties}>
      <div className="s-guides" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      {header === "full" ? (
        <LegacyHeader brand={brand} />
      ) : (
        <header className="s-lheader s-lheader--logo">
          <nav className="s-lheader__nav" aria-label="Main">
            <a href="#" className="s-lheader__logo" aria-label={`${brand} homepage`}>
              <Wordmark brand={brand} />
            </a>
          </nav>
        </header>
      )}
      <main>{children}</main>
      <LegacyFooter brand={brand} tone={footerTone} />
    </div>
  );
}

/* ------------------------------------------------------------------ headers */

function AnnouncementBar({ brand }: { brand: string }) {
  const [shown, setShown] = useState(true);
  if (!shown) return null;
  return (
    <aside className="s-announce">
      <p className="s-announce__copy">
        {withBrand("Northwind is now part of Acme. Route, secure, and govern your model traffic across every major provider and region.", brand)}{" "}
        <a href="#" className="s-announce__link">
          Learn more
          <Chevron />
        </a>
      </p>
      <button type="button" className="s-announce__close" aria-label="Dismiss announcement" onClick={() => setShown(false)}>
        <Close />
      </button>
    </aside>
  );
}

function HdsHeader({ brand }: { brand: string }) {
  return (
    <header className="s-header">
      <nav className="s-header__nav" aria-label="Main">
        <a href="#" className="s-header__logo" aria-label={`${brand} homepage`}>
          <Wordmark brand={brand} />
        </a>
        <div className="s-header__desktop">
          <MegaMenuBar brand={brand} variant="hds" />
        </div>
        <div className="s-header__actions">
          <a href="#" className="s-btn s-btn--secondary s-btn--sm">
            Sign in
          </a>
          <a href="#" className="s-btn s-btn--primary s-btn--sm">
            Contact sales
            <Chevron />
          </a>
        </div>
        <div className="s-header__mobile">
          <MobileMenu brand={brand} logo={<Wordmark brand={brand} />} />
        </div>
      </nav>
    </header>
  );
}

function LegacyHeader({ brand }: { brand: string }) {
  return (
    <header className="s-lheader">
      <nav className="s-lheader__nav" aria-label="Main">
        <a href="#" className="s-lheader__logo" aria-label={`${brand} homepage`}>
          <Wordmark brand={brand} />
        </a>
        <div className="s-header__desktop">
          <MegaMenuBar brand={brand} variant="legacy" />
        </div>
        <div className="s-lheader__actions">
          <a href="#" className="s-pill s-pill--ghost">
            Sign in
            <Chevron />
          </a>
          <a href="#" className="s-pill">
            Contact sales
            <Chevron />
          </a>
        </div>
        <div className="s-header__mobile">
          <MobileMenu brand={brand} logo={<Wordmark brand={brand} />} />
        </div>
      </nav>
    </header>
  );
}

/** The product sub-navigation under the older header: product name left, anchors right. */
export function SubNav({ name, links, active = 0 }: { name: string; links: string[]; active?: number }) {
  return (
    <nav className="s-subnav" aria-label="Product">
      <a href="#" className="s-subnav__name">
        {name}
      </a>
      <ul className="s-subnav__links">
        {links.map((link, index) => (
          <li key={link}>
            <a href="#" className="s-subnav__link" aria-current={index === active ? "page" : undefined}>
              {link}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ------------------------------------------------------------------ footers */

type FooterColumn = { groups: { title: string; links: string[]; tail?: ReactNode }[] };

const productLinks = [
  "Pricing", "Launchpad", "Approval Lift", "Plans", "Funding", "Funding for platforms", "Hosted pay", "Offsets",
  "Platform Kit", "Digital Assets", "Asset Onramp", "Data Sync", "Components", "Account Links", "Global Transfers",
  "Verify", "Invoices", "Cards", "Quickpay", "Hosted Merchant", "Pay pages", "Pay options", "Collections", "Shield",
  "Revenue Ledger", "Queries", "Renewals", "Levies", "Counter", "Reserve", "Reserve for platforms", "Usage plans",
];
const solutionLinks = [
  "Large companies", "New ventures", "Agent commerce", "Tokens", "Online stores", "Embedded money", "Finance operations",
  "Global companies", "In-app purchases", "Marketplaces", "Money handling", "Platforms", "Software", "Model builders",
  "Creator business", "Finance apps", "Games", "Hotels, travel, and recreation", "Insurers", "Media and streaming",
  "Charities", "Service firms", "Government", "Shops",
];
const developerLinks = ["Documentation", "API reference", "API health", "API changes", "Client libraries", "Acme Projects", "Engineering blog"];
const integrationLinks = ["Acme App Directory", "Acme Partner network", "Expert services"];
const resourceLinks = [
  "Product roadmap", "Guides", "Customer stories", "Blog", "Forum", "Annual conference", "Privacy and terms",
  "Restricted businesses", "Licenses", "Site index", "Cookie settings", "Your privacy options", "More resources",
];

function hdsColumns(): FooterColumn[] {
  return [
    { groups: [{ title: "Products and pricing", links: productLinks }] },
    { groups: [{ title: "Solutions", links: solutionLinks }, { title: "Developers", links: developerLinks }] },
    { groups: [{ title: "Integrations and custom solutions", links: integrationLinks }, { title: "Resources", links: resourceLinks }] },
    {
      groups: [
        { title: "Company", links: ["About", "Careers", "Press room", "Acme Books", "Contact sales"] },
        { title: "Support", links: ["Get help", "Support plans", "Callers: +1 800 555 0100"] },
      ],
    },
  ];
}

function Newsletter({ brand, pill }: { brand: string; pill: boolean }) {
  return (
    <form className={`s-news${pill ? " s-news--pill" : ""}`} onSubmit={(event) => event.preventDefault()}>
      <p className="s-news__title">{withBrand("Get product news and updates from Acme", brand)}</p>
      <div className="s-news__row">
        <label className="s-visually-hidden" htmlFor={pill ? "s-news-legacy" : "s-news-hds"}>
          Work email
        </label>
        <input id={pill ? "s-news-legacy" : "s-news-hds"} className="s-news__input" type="email" inputMode="email" autoComplete="email" placeholder="Enter work email" />
        <button type="submit" className={pill ? "s-pill s-pill--dark" : "s-btn s-btn--primary"}>
          Continue
          <Chevron />
        </button>
      </div>
      <p className="s-news__legal">
        {withBrand(
          "Receive marketing email from Acme (including through automated systems) about product updates, industry news, and event invites. You can ",
          brand,
        )}
        <a href="#">unsubscribe</a> at any time. <a href="#">Privacy Policy</a>.
      </p>
    </form>
  );
}

function HdsFooter({ brand }: { brand: string }) {
  return (
    <footer className="s-footer">
      <div className="s-frame s-footer__frame">
        <div className="s-footer__cols">
          {hdsColumns().map((column, index) => (
            <div key={index} className="s-footer__col">
              {column.groups.map((group) => (
                <div key={group.title} className="s-footer__group">
                  <h2 className="s-footer__title">{group.title}</h2>
                  <ul>
                    {group.links.map((link) => (
                      <li key={link}>
                        <a href="#">{withBrand(link, brand)}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {index === 3 ? (
                <a href="#" className="s-link s-footer__signin">
                  Sign in
                  <Chevron />
                </a>
              ) : null}
            </div>
          ))}
        </div>
        <Newsletter brand={brand} pill={false} />
        <div className="s-footer__base">
          <button type="button" className="s-footer__locale">
            <Globe />
            United States (English)
          </button>
          <p>© 2026 {brand}, Inc.</p>
          <span className="s-footer__mark" data-compare-mask="" />
        </div>
      </div>
    </footer>
  );
}

function MiniFooter({ brand }: { brand: string }) {
  return (
    <footer className="s-minifooter">
      <div className="s-frame s-minifooter__inner">
        <div>
          <button type="button" className="s-footer__locale">
            <Globe />
            United States (English)
          </button>
          <p>© 2026 {brand}, Inc.</p>
        </div>
        <span className="s-footer__mark" data-compare-mask="" />
      </div>
    </footer>
  );
}

const legacyColumns = [
  {
    groups: [
      {
        title: "Products & pricing",
        links: [
          "Pricing", "Launchpad", "Approval Lift", "Plans", "Funding", "Hosted pay", "Offsets", "Platform Kit", "Digital Assets",
          "Data Sync", "Components", "Account Links", "Verify", "Invoices", "Cards", "Quickpay", "Hosted Merchant", "Pay pages",
          "Collections", "Global Transfers", "Shield", "Revenue Ledger", "Queries", "Levies", "Counter", "Reserve",
        ],
      },
    ],
  },
  { groups: [{ title: "Solutions", links: solutionLinks }, { title: "Integrations & custom solutions", links: integrationLinks }, { title: "Developers", links: developerLinks }] },
  {
    groups: [
      { title: "Resources", links: resourceLinks.filter((link) => link !== "Product roadmap") },
      { title: "Company", links: ["About", "Product roadmap", "Careers", "Press room", "Acme Books", "Contact sales"] },
      { title: "Support", links: ["Get help", "Support plans"] },
    ],
  },
];

function LegacyFooter({ brand, tone }: { brand: string; tone: "white" | "tint" }) {
  return (
    <footer className={`s-lfooter s-lfooter--${tone}`}>
      <div className="s-lcontainer s-lfooter__grid">
        <div className="s-lfooter__brand">
          <Wordmark brand={brand} />
          <button type="button" className="s-lfooter__locale">
            United States (English)
          </button>
        </div>
        {legacyColumns.map((column, index) => (
          <div key={index} className="s-lfooter__col">
            {column.groups.map((group) => (
              <div key={group.title} className="s-lfooter__group">
                <h2 className="s-lfooter__title">{group.title}</h2>
                <ul>
                  {group.links.map((link) => (
                    <li key={link}>
                      <a href="#">{withBrand(link, brand)}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {index === 2 ? (
              <>
                <p className="s-lfooter__phone">Callers: +1 800 555 0100</p>
                <a href="#" className="s-pill s-pill--ghost s-pill--ink">
                  Sign in
                  <Chevron />
                </a>
              </>
            ) : null}
          </div>
        ))}
      </div>
      <div className="s-lcontainer s-lfooter__news">
        <Newsletter brand={brand} pill />
      </div>
      <div className="s-lcontainer s-lfooter__base">
        <p>© 2026 {brand}, Inc.</p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ shared bits */

/** Neutral stand-in for a photo, video, illustration, product mock-up or logo, at the measured size. */
export function Media({ className, style, tone = "soft" }: { className?: string; style?: CSSProperties; tone?: "soft" | "dark" | "warm" | "cool" | "plain" }) {
  return <div className={`s-media s-media--${tone} ${className ?? ""}`} style={style} data-compare-mask="" aria-hidden="true" />;
}

export function Arrow({ children, href = "#", className }: { children: ReactNode; href?: string; className?: string }) {
  return (
    <a href={href} className={`s-link ${className ?? ""}`}>
      {children}
      <Chevron />
    </a>
  );
}
