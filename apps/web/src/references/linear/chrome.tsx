"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { Mark, useBrand } from "./brand";
import "./site.css";
import "./closing.css";

/* Shared header and footer for the full-page template screens. Copy is neutral ("Acme"). */

type MenuEntry = { title: string; text: string };
type MenuSpec = { label: string; columns: MenuEntry[][]; links: string[]; news?: string };

const menus: MenuSpec[] = [
  {
    label: "Product",
    columns: [
      [
        { title: "Requests", text: "Gather asks and context in\nfrom every tool your team uses" },
        { title: "Plan and track", text: "Set the plan and follow it\nfrom first idea to release" },
      ],
      [
        { title: "Agents and rules", text: "Helpers that move the work\nfrom discussion to delivery" },
        { title: "Write, check and ship", text: "Draft changes and check\nthe pull requests in one place" },
      ],
    ],
    links: ["Integration catalogue", "Release notes", "Phone apps", "Trust center"],
    news: "Use your own model keys",
  },
  {
    label: "Resources",
    columns: [
      [
        { title: "About", text: "Meet the people and the\nstory behind the company" },
        { title: "Careers", text: "Come build the tools that\nour own teams use daily" },
      ],
      [
        { title: "Guides", text: "Learn how to use each\npart of the workspace" },
        { title: "Developers", text: "Build on the public API\nand the extension platform" },
      ],
    ],
    links: ["Move to Acme", "For larger teams", "For new teams", "Get the apps"],
  },
];

const plainLinks = ["Customers", "Pricing", "Now", "Contact"];

const mobileGroups: { label: string; links: string[] }[] = [
  { label: "System", links: ["Requests", "Plan and track", "Agents and rules", "Write, check and ship"] },
  { label: "Product", links: ["Integrations", "Pricing", "Release notes", "Guides"] },
  { label: "Resources", links: ["About", "Customers", "Careers", "Contact", "Now", "Method", "Switch"] },
];

export const footerColumns: { heading: string; links: string[] }[] = [
  { heading: "Product", links: ["Intake", "Plans", "Agents", "Build", "Pricing", "Security"] },
  { heading: "Features", links: ["Asks", "Helpers", "Remote code helper", "Request inbox", "Insights", "Mobile", "Reviews", "Integrations", "Changelog"] },
  { heading: "Company", links: ["About", "Customers", "Careers", "Now", "Method", "Quality", "Brand"] },
  { heading: "Resources", links: ["Switch", "Download", "Documentation", "Developers", "Enterprise", "Startups", "Status", "Legal"] },
  { heading: "Connect", links: ["Contact us", "Community", "X (Twitter)", "GitHub", "YouTube"] },
];

const legalLinks = ["Privacy", "Terms", "Other Policies"];

export function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2.5 7h9M8 3.5 11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Logo() {
  const brand = useBrand();
  return (
    <a className="lr-logo" href="#top" data-compare-mask="">
      <Mark />
      {brand}
    </a>
  );
}

function MegaMenu({ spec }: { spec: MenuSpec }) {
  return (
    <NavigationMenu.Item>
      <NavigationMenu.Trigger className="lr-nav-link">{spec.label}</NavigationMenu.Trigger>
      <NavigationMenu.Content className="lr-menu-content">
        <div className="lr-menu-inner">
          {spec.columns.map((column, index) => (
            <div className="lr-menu-column" key={index}>
              {column.map((item) => (
                <NavigationMenu.Link key={item.title} className="lr-menu-item" href="#menu">
                  <span className="lr-menu-item__title">{item.title}</span>
                  <span className="lr-menu-item__text">{item.text}</span>
                </NavigationMenu.Link>
              ))}
            </div>
          ))}
          <div className="lr-menu-column lr-menu-column--links">
            {spec.links.map((label) => (
              <NavigationMenu.Link key={label} className="lr-menu-item lr-menu-item__title" href="#menu">
                {label}
              </NavigationMenu.Link>
            ))}
          </div>
        </div>
        {spec.news ? (
          <div className="lr-menu-footer">
            <span>
              <strong>New</strong>
              {spec.news}
            </span>
            <a className="lr-menu-more" href="#menu">
              Learn more <Arrow />
            </a>
          </div>
        ) : null}
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen} modal={false}>
      <Dialog.Trigger className="lr-burger" aria-label={open ? "Close menu" : "Open menu"}>
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          {open ? (
            <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          ) : (
            <path d="M2 5.5h12M2 10.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          )}
        </svg>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Popup className="linear-ref lr-mobile-menu">
          <Dialog.Title className="lr-visually-hidden">Site navigation</Dialog.Title>
          {mobileGroups.map((group) => (
            <div className="lr-mobile-menu__group" key={group.label}>
              <span className="lr-mobile-menu__label">{group.label}</span>
              {group.links.map((label) => (
                <a key={label} className="lr-mobile-menu__link" href="#menu" onClick={() => setOpen(false)}>
                  {label}
                </a>
              ))}
            </div>
          ))}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function SiteHeader({ current }: { current?: string }) {
  return (
    <header className="lr-header">
      <nav className="lr-header__inner" aria-label="Main">
        <Logo />
        <div className="lr-header__right">
          <NavigationMenu.Root className="lr-nav-primary">
            <NavigationMenu.List className="lr-nav-list">
              {menus.map((spec) => (
                <MegaMenu key={spec.label} spec={spec} />
              ))}
              {plainLinks.map((label) => (
                <NavigationMenu.Item key={label}>
                  <NavigationMenu.Link className="lr-nav-link" href="#nav" aria-current={current === label ? "page" : undefined}>
                    {label}
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>
            <NavigationMenu.Portal>
              <NavigationMenu.Positioner className="lr-menu-positioner" sideOffset={12}>
                <NavigationMenu.Popup className="linear-ref lr-menu-popup">
                  <NavigationMenu.Viewport />
                </NavigationMenu.Popup>
              </NavigationMenu.Positioner>
            </NavigationMenu.Portal>
          </NavigationMenu.Root>
          <span className="lr-divider" aria-hidden="true" />
          <a className="lr-nav-link lr-nav-link--login" href="../login-method/">
            Log in
          </a>
          <a className="lr-btn lr-btn--32 lr-btn--primary lr-signup" href="../signup-method/">
            Sign up
          </a>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="lr-footer">
      <div className="lr-footer__inner">
        <a className="lr-footer__logo" href="#top" aria-label="Home" data-compare-mask="">
          <Mark />
        </a>
        {footerColumns.map((column) => (
          <div className="lr-footer__column" key={column.heading}>
            <h3 className="lr-footer__heading">{column.heading}</h3>
            <ul>
              {column.links.map((link) => (
                <li key={link}>
                  <a className="lr-footer__link" href="#footer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="lr-footer__column lr-footer__legal">
          <h3 className="lr-footer__heading">Legal</h3>
          <ul>
            {legalLinks.map((link) => (
              <li key={link}>
                <a className="lr-footer__link" href="#footer">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

/** Full page frame: header, the page, footer. */
export function SitePage({ children, current, className }: { children: ReactNode; current?: string; className?: string }) {
  return (
    <div className={`linear-ref lr-site ${className ?? ""}`} id="top">
      <SiteHeader current={current} />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

/** Neutral stand-in for product shots, photos and illustrations: same box, flat surface. */
export function Media({ className, style, label }: { className?: string; style?: CSSProperties; label?: string }) {
  return <div className={`lr-media ${className ?? ""}`} style={style} data-compare-mask="" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} />;
}

export type Quote = { text: string; name: string; role: string };

const defaultQuotes: Quote[] = [
  { text: "\u201cYou will likely ship a better product, simply because of how carefully this tool was put together.\u201d", name: "Sam Rivera", role: "Staff Engineer, Northwind" },
  { text: "\u201cWe move fast and this tool keeps us leaning toward action.\u201d", name: "Ada Brooks", role: "Head of Engineering, Globex" },
  { text: "\u201cIt is simply excellent, every day and for every team.\u201d", name: "Kai Moreno", role: "CTO, Initech" },
];

/** Customer quotes, the proof line and the closing call to action that end the marketing pages. */
export function Closing({ quotes = defaultQuotes }: { quotes?: Quote[] }) {
  return (
    <>
      <section className="lr-quotes" aria-label="Customer quotes">
        {quotes.map((quote, index) => (
          <a className={`lr-quote lr-quote--${index}`} href="#story" key={quote.name}>
            <p className="lr-quote__text">{quote.text}</p>
            <span className="lr-quote__by">
              <Media className="lr-quote__logo" />
              <span>
                <strong>{quote.name}</strong>
                {quote.role}
              </span>
            </span>
          </a>
        ))}
      </section>
      <div className="lr-container lr-proof">
        <p className="lr-body">
          Acme supports over <strong>50,000</strong> product teams. From young startups to large public companies.
        </p>
        <a className="lr-link" href="#customers">
          Customer stories <Arrow />
        </a>
      </div>
      <Cta />
    </>
  );
}

/** Centred closing call to action. */
export function Cta({ className }: { className?: string }) {
  return (
    <section className={`lr-cta ${className ?? ""}`} aria-labelledby="h-cta">
      <h2 className="lr-cta__title" id="h-cta">
        Ready for what is next.
        <br /> Open to all today.
      </h2>
      <div className="lr-cta__actions">
        <a className="lr-btn lr-btn--44 lr-btn--primary" href="../signup-method/">
          Get started
        </a>
        <a className="lr-btn lr-btn--44 lr-btn--secondary" href="#contact">
          Contact sales
        </a>
      </div>
    </section>
  );
}
