"use client";

import { useRef, useState, type ReactNode } from "react";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { Dialog } from "@base-ui/react/dialog";
import { Accordion } from "@base-ui/react/accordion";
import { menus, navLinks, footerColumns, type Menu } from "./data";
import { Btn, Icon, Mark } from "./ui";

type HeaderActions = "demo" | "contact" | "docs";

const actionLabels: Record<HeaderActions, string> = { demo: "Get a Demo", contact: "Contact", docs: "Ask AI" };

function Logo() {
  return (
    <a href="#" className="vc-logo vc-focus" aria-label="Acme home" data-compare-mask="">
      <Mark />
    </a>
  );
}

function MegaPanel({ menu }: { menu: Menu }) {
  return (
    <div className="vc-mega">
      {menu.groups.map((group) => (
        <div className="vc-mega__col" key={group.label}>
          <p className="vc-mega__label">{group.label}</p>
          <ul className="vc-mega__list">
            {group.links.map((link) => (
              <li key={link.label}>
                <NavigationMenu.Link href="#" className="vc-mega__link vc-focus" closeOnClick>
                  <span>{link.label}</span>
                  {link.external ? <span aria-hidden="true">↗</span> : null}
                </NavigationMenu.Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Desktop mega menu: full-width panel under the 64px bar, page behind washed out. */
function DesktopNav({ items, links, anchor }: { items: Menu[]; links: string[]; anchor: React.RefObject<HTMLElement | null> }) {
  return (
    <NavigationMenu.Root className="vc-nav" delay={50} closeDelay={100}>
      <NavigationMenu.List className="vc-nav__list">
        {items.map((menu) => (
          <NavigationMenu.Item key={menu.label} value={menu.label}>
            <NavigationMenu.Trigger className="vc-nav__link vc-focus">
              {menu.label}
              <NavigationMenu.Icon className="vc-nav__chevron">
                <Icon name="chevron-down" size={12} />
              </NavigationMenu.Icon>
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="vc-mega-content">
              <MegaPanel menu={menu} />
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        ))}
        {links.map((label) => (
          <NavigationMenu.Item key={label}>
            <NavigationMenu.Link href="#" className="vc-nav__link vc-focus">
              {label}
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
      <NavigationMenu.Portal>
        <NavigationMenu.Backdrop className="vercel-ref vc-mega-backdrop" />
        <NavigationMenu.Positioner
          className="vc-mega-positioner"
          anchor={anchor}
          side="bottom"
          align="start"
          sideOffset={0}
          collisionAvoidance={{ side: "none", align: "none" }}
        >
          <NavigationMenu.Popup className="vercel-ref vc-mega-popup">
            <NavigationMenu.Viewport />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
}

/** Below 961px: a two-line icon opens a full-screen sheet with accordion groups and stacked buttons. */
function MobileNav({ items, links, actions }: { items: Menu[]; links: string[]; actions: HeaderActions }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="vc-burger vc-focus" aria-label="Open menu">
        <Icon name="menu" size={20} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Popup className="vercel-ref vc-sheet" aria-label="Menu">
          <div className="vc-sheet__bar">
            <Logo />
            <Dialog.Close className="vc-burger vc-focus" aria-label="Close menu">
              <Icon name="close" size={20} />
            </Dialog.Close>
          </div>
          <nav className="vc-sheet__body" aria-label="Main">
            <Accordion.Root className="vc-sheet__acc" multiple={false}>
              {items.map((menu) => (
                <Accordion.Item key={menu.label} value={menu.label}>
                  <Accordion.Header className="vc-sheet__h">
                    <Accordion.Trigger className="vc-sheet__row vc-focus">
                      {menu.label}
                      <Icon name="chevron-down" size={20} className="vc-sheet__chev" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel className="vc-sheet__panel">
                    {menu.groups.map((group) => (
                      <div key={group.label} className="vc-sheet__group">
                        <p className="vc-sheet__label">{group.label}</p>
                        {group.links.map((link) => (
                          <a key={link.label} href="#" className="vc-sheet__sub vc-focus" onClick={() => setOpen(false)}>
                            {link.label}
                            {link.external ? <span aria-hidden="true"> ↗</span> : null}
                          </a>
                        ))}
                      </div>
                    ))}
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion.Root>
            {links.map((label) => (
              <a key={label} href="#" className="vc-sheet__row vc-focus" onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
            <div className="vc-sheet__actions">
              <Btn size={40}>{actionLabels[actions]}</Btn>
              <Btn size={40}>Log In</Btn>
              <Btn size={40} variant="primary">
                Sign Up
              </Btn>
            </div>
          </nav>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const docsMenus: Menu[] = [
  {
    label: "Build",
    groups: [
      { label: "Ship", links: [{ label: "Releases" }, { label: "Domains" }, { label: "Settings" }, { label: "Runtimes" }] },
      { label: "Run", links: [{ label: "Compute" }, { label: "Storage" }, { label: "Jobs" }, { label: "Monitoring" }] },
      { label: "Secure", links: [{ label: "Firewall" }, { label: "Access" }, { label: "Audit" }] },
    ],
  },
  {
    label: "Learn",
    groups: [
      { label: "Start", links: [{ label: "Quickstart" }, { label: "Concepts" }, { label: "Glossary" }] },
      { label: "Reference", links: [{ label: "APIs and SDKs" }, { label: "CLI" }, { label: "Limits" }] },
      { label: "Help", links: [{ label: "Answers" }, { label: "Support" }, { label: "Status" }] },
    ],
  },
];

export function Header({ actions = "demo" }: { actions?: HeaderActions }) {
  const bar = useRef<HTMLElement>(null);
  const docs = actions === "docs";
  const items = docs ? docsMenus : menus;
  const links = docs ? ["Getting Started"] : navLinks;
  return (
    <header className={`vc-header${docs ? " vc-header--docs" : ""}`} ref={bar}>
      <a href="#content" className="vc-skip">
        Skip to content
      </a>
      <div className="vc-header__left">
        <Logo />
        {docs ? (
          <>
            <span className="vc-header__slash" aria-hidden="true">
              /
            </span>
            <a href="#" className="vc-header__section vc-focus">
              Docs
            </a>
          </>
        ) : null}
        <DesktopNav items={items} links={links} anchor={bar} />
      </div>
      <div className="vc-header__right">
        {docs ? (
          <button type="button" className="vc-btn vc-btn--32 vc-btn--secondary">
            <span className="vc-btn__label">Ask AI</span>
          </button>
        ) : (
          <Btn>{actionLabels[actions]}</Btn>
        )}
        <Btn>Log In</Btn>
        <Btn variant="primary">Sign Up</Btn>
      </div>
      <MobileNav items={items} links={links} actions={actions} />
    </header>
  );
}

export function Footer() {
  return (
    <footer className="vc-footer">
      <div className="vc-footer__grid">
        {footerColumns.map((column) => (
          <div key={column.label} className="vc-footer__col">
            <h2 className="vc-footer__h">{column.label}</h2>
            <ul className="vc-footer__list">
              {column.links.map((link) => (
                <li key={link.label}>
                  {link.button ? (
                    <button type="button" className="vc-footer__link vc-focus">
                      {link.label}
                    </button>
                  ) : (
                    <a href="#" className="vc-footer__link vc-focus">
                      {link.label}
                      {link.badge ? <span className="vc-badge">New</span> : null}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <a href="#" className="vc-footer__logo vc-focus" aria-label="Acme home" data-compare-mask="">
        <Mark size={16} />
      </a>
      <div className="vc-footer__bottom">
        <a href="#" className="vc-status vc-focus">
          <span className="vc-status__dot" aria-hidden="true" />
          <span>All systems normal.</span>
        </a>
        <ThemeSwitch />
      </div>
    </footer>
  );
}

/** Display theme radios as a pill group; only light is built, the choice is kept but not applied. */
function ThemeSwitch() {
  const [value, setValue] = useState("light");
  const options: { id: string; glyph: ReactNode }[] = [
    { id: "system", glyph: <rect x="3" y="3.5" width="10" height="7.5" rx="1" /> },
    { id: "light", glyph: <circle cx="8" cy="8" r="2.75" /> },
    { id: "dark", glyph: <path d="M11.5 10A4.5 4.5 0 0 1 6 4.5a4.5 4.5 0 1 0 5.5 5.5Z" /> },
  ];
  return (
    <div className="vc-theme">
      <fieldset className="vc-theme__group">
        <legend className="vc-sr">Select a display theme:</legend>
        {options.map((option) => (
          <label key={option.id} className="vc-theme__opt">
            <input
              type="radio"
              name="vc-theme"
              value={option.id}
              checked={value === option.id}
              onChange={() => setValue(option.id)}
              className="vc-sr"
            />
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              {option.glyph}
            </svg>
            <span className="vc-sr">{option.id}</span>
          </label>
        ))}
      </fieldset>
      <button type="button" className="vc-theme__extra vc-focus" aria-label="Keyboard shortcuts">
        <Icon name="copy" size={14} />
      </button>
    </div>
  );
}

export function Page({ children, actions, footer = true, className }: { children: ReactNode; actions?: HeaderActions; footer?: boolean; className?: string }) {
  return (
    <div className={`vercel-ref${className ? ` ${className}` : ""}`}>
      <Header actions={actions} />
      <main id="content" className="vc-main">
        {children}
      </main>
      {footer ? <Footer /> : null}
    </div>
  );
}
