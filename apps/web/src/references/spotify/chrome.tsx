"use client";

import { createContext, useContext, useRef, useState, type ReactNode, type RefObject } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Popover } from "@base-ui/react/popover";
import { Mark, useBrand } from "./brand";
import { BrowseIcon, ChevronLeft, CloseIcon, DownloadIcon, GlobeIcon, HomeIcon, PlusIcon, SearchIcon } from "./icons";
import "./spotify.css";
import "./overlays.css";

/* App frame shared by every screen: top bar, library rail, inner-scrolling main view, collapsed right
   rail and the bottom sign-up strip. Login-gated actions open the prompts below; nothing is sent. */

type Prompts = { askLogin: (tone?: string) => void; askSave: () => void };

const PromptContext = createContext<Prompts>({ askLogin: () => {}, askSave: () => {} });

export const usePrompts = () => useContext(PromptContext);

const legalLinks = ["Terms", "Trust & Safety Hub", "Privacy Notice", "Cookie Choices", "Ad Info", "Accessibility"];

const footerColumns = [
  { title: "Company", links: ["About", "Careers", "Newsroom"] },
  { title: "Community", links: ["For Musicians", "For Hosts", "For Writers", "Builders", "Brand Partners", "Shareholders", "Suppliers"] },
  { title: "Resources", links: ["Help Desk", "Phone App", "Charts by Region", "Lyrics Library", "Bring your library"] },
  { title: "Plans", links: ["Solo Plan", "Pair Plan", "Household Plan", "Campus Plan", "Free Tier"] },
];

const languages = [
  ["English", "English"], ["Türkçe", "Turkish"], ["Deutsch", "German"], ["Español", "Spanish"],
  ["Français", "French"], ["Italiano", "Italian"], ["Nederlands", "Dutch"], ["Polski", "Polish"],
  ["Português", "Portuguese"], ["Svenska", "Swedish"], ["Norsk", "Norwegian"], ["Dansk", "Danish"],
  ["Suomi", "Finnish"], ["Čeština", "Czech"], ["Magyar", "Hungarian"], ["Română", "Romanian"],
  ["Ελληνικά", "Greek"], ["Українська", "Ukrainian"], ["日本語", "Japanese"], ["한국어", "Korean"],
];

function TopBar({ active, loginRef }: { active: "home" | "search" | "none"; loginRef: RefObject<HTMLButtonElement | null> }) {
  return (
    <header className="sp-top">
      <a className="sp-top__mark" href="#" aria-label="Home">
        <Mark />
      </a>
      <a className="sp-home" href="#" aria-label="Home" aria-current={active === "home" ? "page" : undefined}>
        <HomeIcon filled={active === "home"} />
      </a>
      <form className="sp-search" role="search" onSubmit={(event) => event.preventDefault()}>
        <span className="sp-search__icon" aria-hidden="true">
          <SearchIcon />
        </span>
        <input className="sp-search__input" type="search" name="q" placeholder="What should we play?" aria-label="What should we play?" autoComplete="off" />
        <span className="sp-search__browse">
          <button type="button" aria-label="Browse" aria-current={active === "search" ? "page" : undefined}>
            <BrowseIcon filled={active === "search"} />
          </button>
        </span>
      </form>
      <div className="sp-top__right">
        <nav className="sp-top__nav" aria-label="Product">
          <button type="button" className="sp-textbtn">Upgrade</button>
          <button type="button" className="sp-textbtn">Help hub</button>
          <button type="button" className="sp-textbtn">Get the app</button>
        </nav>
        <span className="sp-top__divider" aria-hidden="true" />
        <a className="sp-install" href="#">
          <DownloadIcon />
          Install app
        </a>
        <button type="button" className="sp-signup">
          Sign up
        </button>
        <button type="button" ref={loginRef} className="sp-pill sp-pill--lg sp-login">
          Log in
        </button>
      </div>
    </header>
  );
}

function CreateCallout({ anchor }: { anchor: RefObject<HTMLElement | null> }) {
  const [open, setOpen] = useState(false);
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger className="sp-pill sp-pill--sm">Create a list</Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner className="spotify-ref sp-callout-pos" anchor={anchor} side="right" align="start" sideOffset={14} alignOffset={-8}>
          <Popover.Popup className="sp-callout">
            <Popover.Arrow className="sp-callout__arrow" />
            <Popover.Title className="sp-callout__title">Make a list</Popover.Title>
            <Popover.Description className="sp-callout__text">Log in to build and share lists.</Popover.Description>
            <div className="sp-callout__actions">
              <Popover.Close className="sp-callout__later">Later</Popover.Close>
              <button type="button" className="sp-pill sp-pill--sm">
                Log in
              </button>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

function LanguageDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="sp-lang">
        <GlobeIcon />
        English
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="spotify-ref sp-backdrop sp-backdrop--soft" />
        <Dialog.Popup className="spotify-ref sp-langdlg">
          <div className="sp-langdlg__head">
            <Dialog.Title className="sp-langdlg__title">Pick a language</Dialog.Title>
            <Dialog.Close className="sp-langdlg__close" aria-label="Close">
              <CloseIcon />
            </Dialog.Close>
          </div>
          <ul className="sp-langdlg__grid">
            {languages.map(([native, english], index) => (
              <li key={english}>
                <Dialog.Close className="sp-langdlg__item" aria-current={index === 0 ? "true" : undefined}>
                  <span>{native}</span>
                  <span>{english}</span>
                </Dialog.Close>
              </li>
            ))}
          </ul>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Library() {
  const firstCard = useRef<HTMLElement>(null);
  return (
    <nav className="sp-lib" aria-label="Library">
      <header className="sp-lib__head">
        <h2 className="sp-lib__title">Your Shelf</h2>
        <button type="button" className="sp-lib__create" aria-label="Create">
          <PlusIcon />
        </button>
      </header>
      <div className="sp-lib__list">
        <section className="sp-lib__card" ref={firstCard}>
          <div className="sp-lib__card-text">
            <strong>Start your first list</strong>
            <span>We&apos;ll walk you through it</span>
          </div>
          <CreateCallout anchor={firstCard} />
        </section>
        <section className="sp-lib__card">
          <div className="sp-lib__card-text">
            <strong>Pick a few shows worth following</strong>
            <span>New episodes will land right here</span>
          </div>
          <a className="sp-pill sp-pill--sm" href="#">
            Explore shows
          </a>
        </section>
      </div>
      <div className="sp-lib__foot">
        <ul className="sp-legal">
          {legalLinks.map((label) => (
            <li key={label}>
              {label === "Cookie Choices" ? <button type="button">{label}</button> : <a href="#">{label}</a>}
            </li>
          ))}
        </ul>
        <a className="sp-legal__cookies" href="#">
          Cookie use
        </a>
        <LanguageDialog />
      </div>
    </nav>
  );
}

const socialGlyphs = [
  <rect key="a" x="6" y="6" width="12" height="12" rx="4" stroke="currentColor" strokeWidth="1.8" fill="none" />,
  <path key="b" d="M7 7l10 10M17 7 7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
  <circle key="c" cx="12" cy="12" r="6" fill="currentColor" />,
];

function Footer() {
  const brand = useBrand();
  return (
    <footer className="sp-footer">
      <hr />
      <div className="sp-footer__top">
        <div className="sp-footer__cols">
          {footerColumns.map((column) => (
            <div className="sp-footer__col" key={column.title}>
              <h4>{column.title}</h4>
              <ul>
                {column.links.map((label) => (
                  <li key={label}>
                    <a href="#">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="sp-footer__social">
          {["Photo channel", "Short posts", "Community page"].map((label, index) => (
            <a key={label} href="#" aria-label={label}>
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                {socialGlyphs[index]}
              </svg>
            </a>
          ))}
        </div>
      </div>
      <hr />
      <div className="sp-footer__bottom">
        <span>{`© 2026 ${brand} Group`}</span>
      </div>
    </footer>
  );
}

function SaveCallout({ open, onOpenChange, anchor }: { open: boolean; onOpenChange: (open: boolean) => void; anchor: RefObject<HTMLButtonElement | null> }) {
  return (
    <Popover.Root open={open} onOpenChange={onOpenChange}>
      <Popover.Portal>
        <Popover.Positioner className="spotify-ref sp-callout-pos" anchor={anchor} side="bottom" align="end" sideOffset={14}>
          <Popover.Popup className="sp-callout sp-callout--save">
            <div className="sp-callout__row">
              <Popover.Title className="sp-callout__title">Not signed in</Popover.Title>
              <Popover.Close className="sp-callout__x" aria-label="Close">
                <CloseIcon />
              </Popover.Close>
            </div>
            <Popover.Description className="sp-callout__text">Log in to keep this album on your shelf.</Popover.Description>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

function LoginPrompt({ tone, open, onOpenChange }: { tone: string; open: boolean; onOpenChange: (open: boolean) => void }) {
  const brand = useBrand();
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="spotify-ref sp-backdrop" />
        <Dialog.Popup className="spotify-ref sp-prompt">
          <div className="sp-prompt__panel" style={{ background: tone }}>
            <div className="sp-prompt__cover" data-compare-mask="" />
            <div className="sp-prompt__side">
              <Dialog.Title className="sp-prompt__title">{`Play it all free with a ${brand} account`}</Dialog.Title>
              <a className="sp-pill sp-pill--lg sp-pill--green" href="#">
                Join for free
              </a>
              <a className="sp-prompt__outline" href="#">
                Get the app
              </a>
              <p className="sp-prompt__login">
                Got an account already? <a href="#">Log in</a>
              </p>
            </div>
          </div>
          <Dialog.Close className="sp-prompt__close">Close</Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Strip() {
  const brand = useBrand();
  return (
    <div className="sp-strip-row">
      <aside className="sp-strip" aria-label="Sign up">
        <div className="sp-strip__text">
          <strong>{`${brand} free preview`}</strong>
          <p>Create a profile at no cost and keep listening as long as you like, with a short break now and then.</p>
        </div>
        <a className="sp-pill sp-pill--lg" href="#">
          Join for free
        </a>
      </aside>
    </div>
  );
}

/**
 * The app frame. `active` marks the home or browse button; `tone` colours the login prompt panel.
 * The main view is the only scroller; the footer sits at the end of its content.
 */
export function Shell({ children, active = "none", tone = "#535353" }: { children: ReactNode; active?: "home" | "search" | "none"; tone?: string }) {
  const [login, setLogin] = useState<string | null>(null);
  const [saveOpen, setSaveOpen] = useState(false);
  const loginRef = useRef<HTMLButtonElement>(null);
  const prompts: Prompts = { askLogin: (next) => setLogin(next ?? tone), askSave: () => setSaveOpen(true) };
  return (
    <PromptContext value={prompts}>
      <div className="spotify-ref sp-frame">
        <TopBar active={active} loginRef={loginRef} />
        <div className="sp-body">
          <Library />
          <main className="sp-main">
            <div className="sp-scroll" tabIndex={0} aria-label="Main view">
              {children}
              <Footer />
            </div>
          </main>
          <aside className="sp-rail" aria-label="Now playing">
            <button type="button" aria-label="Open the now playing view">
              <ChevronLeft />
            </button>
          </aside>
        </div>
        <Strip />
        <LoginPrompt tone={login ?? tone} open={login !== null} onOpenChange={(open) => !open && setLogin(null)} />
        <SaveCallout open={saveOpen} onOpenChange={setSaveOpen} anchor={loginRef} />
      </div>
    </PromptContext>
  );
}
