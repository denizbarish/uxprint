"use client";

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { FOOTER_COLUMNS, LEGAL_LINKS, NAV, type NavItem } from "./nav-data";
import { label, text } from "./text";
import "./apple.css";

/** Our own mark: a rounded hexagon. Not the original logo. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 16" className={className} aria-hidden="true">
      <path fill="currentColor" d="M7 .8 13.2 4.4v7.2L7 15.2.8 11.6V4.4z" />
    </svg>
  );
}

export function SearchGlyph() {
  return (
    <svg viewBox="0 0 15 16" aria-hidden="true">
      <circle cx="6.2" cy="6.7" r="5.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="m10 10.6 4.2 4.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function BagGlyph() {
  return (
    <svg viewBox="0 0 14 16" aria-hidden="true">
      <path d="M1.6 5h10.8v8.4a1.8 1.8 0 0 1-1.8 1.8H3.4a1.8 1.8 0 0 1-1.8-1.8z" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M4.4 5V3.8a2.6 2.6 0 0 1 5.2 0V5" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export function Chevron({ dir = "right" }: { dir?: "right" | "down" | "left" }) {
  const d = { right: "M3 1.5 7 5.5 3 9.5", down: "M1.5 3 5.5 7 9.5 3", left: "M7 1.5 3 5.5 7 9.5" }[dir];
  return (
    <svg viewBox="0 0 11 11" className="ap-chev" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseGlyph() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M4 4l10 10M14 4 4 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/** Region suggestion strip that sits above the navigation on every page. */
function RegionBanner() {
  const [shown, setShown] = useState(true);
  if (!shown) return null;
  return (
    <div className="ap-region" role="region" aria-label="Choose region">
      <div className="ap-region__inner">
        <p className="ap-region__copy">Pick another country or region to see local content and buy online from the store near you.</p>
        <div className="ap-region__actions">
          <label className="ap-region__select">
            <span className="ap-region__check" aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <path d="M2.5 8.5 6 12l7.5-8" fill="none" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </span>
            <select aria-label="Country or region" defaultValue="home">
              <option value="home">Northland</option>
              <option value="other">Other region</option>
            </select>
            <Chevron dir="down" />
          </label>
          <a className="ap-region__go" href="#">
            Continue
          </a>
          <button type="button" className="ap-region__close" aria-label="Close" onClick={() => setShown(false)}>
            <CloseGlyph />
          </button>
        </div>
      </div>
    </div>
  );
}

const SEARCH_FLYOUT: NavItem = {
  id: "search",
  label: "Search",
  groups: [{ header: "Quick Links", links: ["Find a Store", "Laptop Lineup", "Gift Ideas", "Media & Games", "Track an Order"] }],
};
const BAG_FLYOUT: NavItem = {
  id: "bag",
  label: "Bag",
  groups: [{ header: "My Profile", links: ["Orders", "Your Saves", "Account", "Sign in"] }],
};

function FlyoutContent({ item }: { item: NavItem }) {
  if (item.id === "search") {
    return (
      <div className="ap-gn-flyout__inner ap-gn-search">
        <form className="ap-gn-search__form" role="search" onSubmit={(event) => event.preventDefault()}>
          <SearchGlyph />
          <input type="search" placeholder="Search the site" aria-label="Search the site" autoComplete="off" />
        </form>
        <Group group={item.groups[0]!} index={0} />
      </div>
    );
  }
  if (item.id === "bag") {
    return (
      <div className="ap-gn-flyout__inner ap-gn-bag">
        <p className="ap-gn-bag__title">Your Bag holds nothing yet.</p>
        <p className="ap-gn-bag__note">
          <a href="#">Sign in</a> to check whether you saved something earlier
        </p>
        <Group group={item.groups[0]!} index={1} />
      </div>
    );
  }
  return (
    <div className="ap-gn-flyout__inner">
      {item.groups.map((group, index) => (
        <Group key={index} group={group} index={index} />
      ))}
    </div>
  );
}

function Group({ group, index }: { group: NavItem["groups"][number]; index: number }) {
  return (
    <div className={`ap-gn-group${group.elevated ? " ap-gn-group--elevated" : ""}`} style={{ "--g": index } as CSSProperties}>
      {group.header ? <h2 className="ap-gn-group__header">{group.header}</h2> : null}
      <ul>
        {group.links.map((link, i) => (
          <li key={i} style={{ "--i": i } as CSSProperties}>
            <a href="#">{link}</a>
          </li>
        ))}
      </ul>
      {group.extra?.length ? (
        <ul className="ap-gn-group__extra">
          {group.extra.map((link, i) => (
            <li key={i} style={{ "--i": group.links.length + i } as CSSProperties}>
              <a href="#">{link}</a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/**
 * Global navigation. Desktop: 44px bar; hovering an item opens a full-width flyout whose height grows
 * (0.24s), with a blurred curtain over the page and links fading in with a stagger. Phones and tablets
 * (833px and below): 48px bar, a full-screen menu with sub-levels and a back button.
 */
function GlobalNav() {
  const [open, setOpen] = useState<string | null>(null);
  const [shown, setShown] = useState<string>("desk");
  const [mobile, setMobile] = useState(false);
  const [sub, setSub] = useState<string | null>(null);
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const all = [...NAV, SEARCH_FLYOUT, BAG_FLYOUT];
  const current = all.find((item) => item.id === shown) ?? NAV[1]!;
  const subItem = NAV.find((item) => item.id === sub);

  const openFlyout = (id: string) => {
    setShown(id);
    setOpen(id);
  };
  const onKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setOpen(null);
      if (mobile) {
        setMobile(false);
        setSub(null);
        triggerRef.current?.focus();
      }
    }
  };
  const toggleMobile = () => {
    setMobile((value) => !value);
    setSub(null);
  };

  return (
    <>
      <nav
        className="ap-gn"
        aria-label="Global"
        data-flyout={open ? "" : undefined}
        data-menu={mobile ? "" : undefined}
        data-sub={sub ? "" : undefined}
        onMouseLeave={() => setOpen(null)}
        onKeyDown={onKey}
      >
        <div className="ap-gn__content">
          <ul className="ap-gn__list">
            <li className="ap-gn__item ap-gn__item--logo">
              <a href="#" className="ap-gn__link ap-gn__logo" aria-label="Acme home" data-compare-mask="" onMouseEnter={() => setOpen(null)}>
                <Mark />
              </a>
            </li>
            {NAV.map((item) => (
              <li key={item.id} className="ap-gn__item ap-gn__item--menu" data-open={open === item.id ? "" : undefined}>
                <a href="#" className="ap-gn__link" onMouseEnter={() => openFlyout(item.id)} onFocus={() => open && open !== item.id && setOpen(null)}>
                  {item.label}
                </a>
                <button
                  type="button"
                  className="ap-gn__reveal"
                  aria-label={`${item.label} menu`}
                  aria-expanded={open === item.id}
                  onClick={() => (open === item.id ? setOpen(null) : openFlyout(item.id))}
                >
                  <Chevron dir="down" />
                </button>
              </li>
            ))}
            <li className="ap-gn__item ap-gn__item--icon">
              <button
                type="button"
                className="ap-gn__link ap-gn__icon"
                aria-label="Search"
                aria-expanded={open === "search"}
                onMouseEnter={() => openFlyout("search")}
                onClick={() => (open === "search" ? setOpen(null) : openFlyout("search"))}
              >
                <SearchGlyph />
              </button>
            </li>
            <li className="ap-gn__item ap-gn__item--icon ap-gn__item--bag">
              <button
                type="button"
                className="ap-gn__link ap-gn__icon"
                aria-label="Shopping bag"
                aria-expanded={open === "bag"}
                onMouseEnter={() => openFlyout("bag")}
                onClick={() => (open === "bag" ? setOpen(null) : openFlyout("bag"))}
              >
                <BagGlyph />
              </button>
            </li>
            <li className="ap-gn__item ap-gn__item--trigger">
              <button
                ref={triggerRef}
                type="button"
                className="ap-gn__trigger"
                aria-label={mobile ? "Close menu" : "Menu"}
                aria-expanded={mobile}
                aria-controls={menuId}
                onClick={toggleMobile}
              >
                <span />
                <span />
              </button>
            </li>
          </ul>
        </div>
        <div className="ap-gn-flyout" data-open={open ? "" : undefined} aria-hidden={open ? undefined : true}>
          <FlyoutContent key={current.id} item={current} />
        </div>
        {mobile ? (
          <div className="ap-gn-menu" id={menuId} role="dialog" aria-modal="true" aria-label="Menu">
            {subItem ? (
              <div className="ap-gn-menu__sub" key={subItem.id}>
                <button type="button" className="ap-gn-menu__back" aria-label="Back" autoFocus onClick={() => setSub(null)}>
                  <Chevron dir="left" />
                </button>
                {subItem.groups.map((group, index) => (
                  <Group key={index} group={group} index={index} />
                ))}
              </div>
            ) : (
              <ul className="ap-gn-menu__list">
                {NAV.map((item, index) => (
                  <li key={item.id} style={{ "--i": index } as CSSProperties}>
                    <button type="button" autoFocus={index === 0} onClick={() => setSub(item.id)}>
                      <span>{item.label}</span>
                      <Chevron />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : null}
      </nav>
      <div className="ap-gn-curtain" data-open={open ? "" : undefined} aria-hidden="true" />
    </>
  );
}

export type Footnotes = { list?: number[]; paragraphs?: number[] };

const HOME_NOTES: Footnotes = { list: [229, 1000], paragraphs: [370, 203, 498, 92, 87, 127] };

/** Footnotes, then the five-column directory (an accordion on phones), then the legal row. */
/** Four help columns some pages show above the footnotes (icon, title, two-line note, link). */
const BUYSTRIP = [
  { title: "Get in Touch", note: "Reach our support team for help with setup or settings." },
  { title: "Signed Help", note: "Meet a specialist on a video call in sign language at no cost." },
  { title: "Policy Notes", note: "Read how our services meet the rules in each region we serve." },
  { title: "Media Access", note: "Captions and described audio across a wide range of shows." },
];

export function Footer({
  notes = HOME_NOTES,
  crumb,
  dark = false,
  buystrip = false,
}: {
  notes?: Footnotes | null;
  crumb?: string;
  dark?: boolean;
  buystrip?: boolean;
}) {
  return (
    <footer className={`ap-gf${dark ? " ap-gf--dark" : ""}`}>
      <div className="ap-gf__content">
        {buystrip ? (
          <section className="ap-gf__buystrip" aria-label="Help options">
            {BUYSTRIP.map((item) => (
              <div key={item.title} className="ap-gf__buy">
                <span className="ap-gf__buy-icon" aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.note}</p>
                <a href="#">
                  Learn more <Chevron />
                </a>
              </div>
            ))}
          </section>
        ) : null}
        {notes ? (
          <section className="ap-gf__notes" aria-label="Footnotes">
            {notes.list?.length ? (
              <ol>
                {notes.list.map((length, index) => (
                  <li key={index}>{text(length, index + 40)}</li>
                ))}
              </ol>
            ) : null}
            {notes.paragraphs?.map((length, index) => (
              <p key={index}>{text(length, index + 60)}</p>
            ))}
          </section>
        ) : null}
        {crumb ? (
          <nav className="ap-gf__crumbs" aria-label="Breadcrumbs">
            <Mark />
            <Chevron />
            <span>{crumb}</span>
          </nav>
        ) : null}
        <nav className="ap-gf__dir" aria-label="Site directory">
          {FOOTER_COLUMNS.map((column, c) => (
            <div className="ap-gf__col" key={c}>
              {column.map((section, s) => (
                <details className="ap-gf__section" key={s} name="ap-footer">
                  <summary>
                    <h3>{section.title}</h3>
                    <Chevron dir="down" />
                  </summary>
                  <ul>
                    {section.links.map((link, index) => (
                      <li key={index}>
                        <a href="#">{link}</a>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          ))}
        </nav>
        <div className="ap-gf__bottom">
          <p className="ap-gf__shop">
            Other ways to buy: <a href="#">Visit a nearby store</a> or <a href="#">a partner shop</a> close to you. Or call 0-800-000-0000.
          </p>
          <div className="ap-gf__legal">
            <p className="ap-gf__copy">Copyright © 2026 Acme Inc. Some rights reserved.</p>
            <ul className="ap-gf__links">
              {LEGAL_LINKS.map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
            <a href="#" className="ap-gf__locale">
              Northland
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/** Generated neutral label, re-exported for pages. */
export { label };

export function Shell({
  children,
  localNav,
  notes,
  crumb,
  dark = false,
  darkFooter = false,
  region = true,
  buystrip = false,
}: {
  region?: boolean;
  buystrip?: boolean;
  darkFooter?: boolean;
  children: ReactNode;
  localNav?: ReactNode;
  notes?: Footnotes | null;
  crumb?: string;
  dark?: boolean;
}) {
  return (
    <div className="apple-ref" data-theme={dark ? "dark" : undefined}>
      {region ? <RegionBanner /> : null}
      <GlobalNav />
      {localNav}
      <main className="ap-main">{children}</main>
      <Footer notes={notes} crumb={crumb} dark={darkFooter} buystrip={buystrip} />
    </div>
  );
}
