"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { megaMenus, type MegaMenu, type MenuGroup } from "./menu-data";
import { withBrand } from "./brand";
import { Chevron, ChevronDown, ChevronLeft, Close, Burger, Spark } from "./icons";

type MenuId = MegaMenu["id"];

const startHelp = megaMenus.find((menu) => menu.id === "products")?.footer;

/**
 * Disclosure navigation: each trigger is a button with aria-expanded that controls its panel.
 * Opens on hover (with a short close delay so the pointer can travel into the panel), on click and
 * with Enter or Space. Escape closes and returns focus to the trigger; focus leaving the bar closes it.
 */
export function MegaMenuBar({ brand, variant }: { brand: string; variant: "hds" | "legacy" }) {
  const [open, setOpen] = useState<MenuId | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const triggers = useRef<Partial<Record<MenuId, HTMLButtonElement | null>>>({});
  const baseId = useId();

  const cancelClose = () => window.clearTimeout(closeTimer.current);
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(null), 160);
  };
  // Clears a pending close timer if the bar unmounts mid-hover (a real external timer).
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && open) {
      event.stopPropagation();
      const trigger = triggers.current[open];
      setOpen(null);
      trigger?.focus();
    }
  }

  return (
    <div
      className="s-megabar"
      data-open={open ?? undefined}
      onKeyDown={onKeyDown}
      onPointerLeave={scheduleClose}
      onPointerEnter={cancelClose}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(null);
      }}
    >
      <ul className="s-megabar__list">
        {megaMenus.map((menu) => (
          <li key={menu.id}>
            <button
              type="button"
              ref={(node) => {
                triggers.current[menu.id] = node;
              }}
              className="s-nav-trigger"
              aria-expanded={open === menu.id}
              aria-controls={`${baseId}-${menu.id}`}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setOpen(menu.id);
              }}
              onClick={() => setOpen((current) => (current === menu.id ? null : menu.id))}
            >
              {menu.label}
              <ChevronDown className="s-nav-trigger__chevron" />
            </button>
          </li>
        ))}
        <li>
          <a className="s-nav-trigger s-nav-trigger--link" href="#">
            Pricing
          </a>
        </li>
        <li className="s-megabar__divider" aria-hidden="true" />
        <li>
          <a className="s-nav-trigger s-nav-trigger--link s-nav-trigger--guide" href="#">
            <Spark />
            Help me
          </a>
        </li>
      </ul>
      {open ? <div className="s-scrim" aria-hidden="true" /> : null}
      {megaMenus.map((menu) => (
        <div
          key={menu.id}
          id={`${baseId}-${menu.id}`}
          className={`s-megapanel s-megapanel--${menu.id} s-megapanel--${variant}`}
          hidden={open !== menu.id}
        >
          <MegaPanel menu={menu} brand={brand} />
        </div>
      ))}
    </div>
  );
}

function GroupColumn({ group, brand, detailed }: { group: MenuGroup; brand: string; detailed: boolean }) {
  return (
    <div className={`s-megacol${group.tinted ? " s-megacol--tinted" : ""}`}>
      <p className="s-megacol__title">{group.title}</p>
      <ul className="s-megacol__list">
        {group.items.map((item) => (
          <li key={item.title}>
            <a className={`s-megalink${detailed ? " s-megalink--detailed" : ""}`} href="#">
              <span className="s-megalink__title">
                {withBrand(item.title, brand)}
                <Chevron className="s-megalink__arrow" />
              </span>
              {item.detail ? <span className="s-megalink__detail">{withBrand(item.detail, brand)}</span> : null}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MegaPanel({ menu, brand }: { menu: MegaMenu; brand: string }) {
  if (menu.id !== "products") {
    return (
      <div className="s-megapanel__grid" style={{ gridTemplateColumns: `repeat(${menu.groups.length}, 1fr)` }}>
        {menu.groups.map((group) => (
          <GroupColumn key={group.title} group={group} brand={brand} detailed={false} />
        ))}
      </div>
    );
  }
  const main = menu.groups.filter((group) => !group.tinted);
  const more = menu.groups.find((group) => group.tinted);
  return (
    <div className="s-megapanel__products">
      <div className="s-megapanel__main">
        <div className="s-megapanel__cols">
          {main.map((group) => (
            <GroupColumn key={group.title} group={group} brand={brand} detailed />
          ))}
        </div>
        {menu.footer ? (
          <div className="s-megapanel__foot">
            <p>{menu.footer.prompt}</p>
            {menu.footer.links.map((link) => (
              <a key={link.title} className="s-megalink s-megalink--detailed" href="#">
                <span className="s-megalink__title">
                  {link.title}
                  <Chevron className="s-megalink__arrow" />
                </span>
                <span className="s-megalink__detail">{link.detail}</span>
              </a>
            ))}
          </div>
        ) : null}
      </div>
      {more ? (
        <div className="s-megapanel__aside">
          <GroupColumn group={more} brand={brand} detailed />
          {menu.promo ? (
            <a className="s-megapromo" href="#">
              <span className="s-megapromo__media" data-compare-mask="" />
              <span className="s-megapromo__title">{withBrand(menu.promo.title, brand)}</span>
              <span className="s-megapromo__body">{withBrand(menu.promo.body, brand)}</span>
              <span className="s-megapromo__cta">
                {menu.promo.cta}
                <Chevron />
              </span>
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Phone menu: a full-height sheet with one row per section. A section row drills into a second
 * panel with a Back button, as on the original. Two actions stay pinned to the bottom.
 */
export function MobileMenu({ brand, logo }: { brand: string; logo: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<MenuId | null>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const current = megaMenus.find((menu) => menu.id === section);

  function close() {
    setOpen(false);
    setSection(null);
    toggle.current?.focus();
  }

  return (
    <>
      <button
        ref={toggle}
        type="button"
        className="s-burger"
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(true)}
      >
        <Burger />
      </button>
      <div
        id={panelId}
        className="s-sheet"
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        onKeyDown={(event) => {
          if (event.key === "Escape") close();
        }}
      >
        <div className="s-sheet__bar">
          {section ? (
            <button type="button" className="s-sheet__back" onClick={() => setSection(null)}>
              <ChevronLeft />
              Back
            </button>
          ) : (
            logo
          )}
          <button type="button" className="s-burger s-burger--close" aria-label="Close navigation menu" onClick={close}>
            <Close />
          </button>
        </div>
        <div className="s-sheet__body">
          {current ? (
            current.groups.map((group) => (
              <GroupColumn key={group.title} group={group} brand={brand} detailed={current.id === "products"} />
            ))
          ) : (
            <>
              <ul className="s-sheet__list">
                {megaMenus.map((menu) => (
                  <li key={menu.id}>
                    <button type="button" className="s-sheet__row" onClick={() => setSection(menu.id)}>
                      {menu.label}
                      <Chevron />
                    </button>
                  </li>
                ))}
                <li>
                  <a className="s-sheet__row" href="#">
                    Pricing
                  </a>
                </li>
                <li>
                  <a className="s-sheet__row" href="#">
                    Sign in
                  </a>
                </li>
              </ul>
              <div className="s-sheet__card">
                <p>{startHelp?.prompt}</p>
                {startHelp?.links.map((link) => (
                  <a key={link.title} className="s-megalink s-megalink--detailed" href="#">
                    <span className="s-megalink__title">{link.title}</span>
                    <span className="s-megalink__detail">{link.detail}</span>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="s-sheet__actions">
          <a className="s-btn s-btn--primary" href="#">
            Start now
            <Chevron />
          </a>
          <a className="s-btn s-btn--secondary" href="#">
            Contact sales
          </a>
        </div>
      </div>
    </>
  );
}
