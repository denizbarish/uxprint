"use client";

import { useId, useRef, useState } from "react";
import { Flag, LegacyFooter, Logo, StoreBadges, useBrand, useDismiss, useFocusFirst } from "../chrome";
import { LANGUAGES } from "../filler";
import { Media, TrustSlot } from "../parts";
import "./home.css";

const MENU = ["Log in", "For Educators", "For Businesses"];

/**
 * Kebab menu of the legacy home bar: opens on hover, click or keyboard; Escape and outside press close it.
 * Hover only shows the panel; focus moves into it only when it was opened by click or keyboard.
 */
function KebabMenu() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const shown = open || hovered;
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLUListElement>(null);
  const id = useId();
  useDismiss(open, () => setOpen(false), root, trigger);
  useFocusFirst(open, panel);
  return (
    <div className="bu-hm__more" ref={root} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <button
        ref={trigger}
        type="button"
        className="bu-hm__kebab"
        aria-label="More"
        aria-expanded={shown}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>
      <div className="bu-hm__panel" data-open={shown}>
        <ul id={id} ref={panel}>
          {MENU.map((label) => (
            <li key={label}>
              <a href="#" tabIndex={shown ? 0 : -1}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function HomeHeader() {
  return (
    <header className="bu-hm">
      <nav className="bu-hm__nav" aria-label="Main">
        <Logo className="bu-logo--home" />
        <div className="bu-hm__actions">
          <a href="#" className="bu-pill bu-pill--white">
            Start for free
          </a>
          <a href="#" className="bu-pill bu-pill--line">
            Log in
          </a>
          <KebabMenu />
        </div>
      </nav>
    </header>
  );
}

function LanguageStrip() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (direction: number) => track.current?.scrollBy({ left: direction * 480, behavior: "smooth" });
  return (
    <section className="bu-strip" aria-labelledby="bu-strip-title">
      <h2 id="bu-strip-title">I want to study</h2>
      <div className="bu-strip__row">
        <button type="button" className="bu-strip__arrow" aria-label="Previous languages" onClick={() => scroll(-1)} />
        <div className="bu-strip__track" ref={track}>
          {LANGUAGES.map((name, index) => (
            <a href="#" className="bu-strip__item" key={name}>
              <Flag index={index} size={56} />
              <span>{name}</span>
            </a>
          ))}
        </div>
        <button type="button" className="bu-strip__arrow bu-strip__arrow--next" aria-label="Next languages" onClick={() => scroll(1)} />
      </div>
    </section>
  );
}

const ARTICLES: { eyebrow: string; title: string; text: string; media: [number, number]; badges?: boolean }[] = [
  {
    eyebrow: "A helpful learning circle",
    title: "Study side by side",
    text: "Step past the workbook. Rehearse how words sound, pick up local habits and swap everyday tips with a warm crowd of people who speak the language.",
    media: [378, 255],
  },
  {
    eyebrow: "Lessons shaped by specialists",
    title: "Study with assurance",
    text: "See steady gains you can measure. Get ready for daily situations by laying firm groundwork with plenty of talking, hearing, reading and writing tasks.",
    media: [384, 259],
  },
  {
    eyebrow: "Speaking practice up close",
    title: "Study for daily life",
    text: "Get quick notes that grow your confidence. Spoken drills ease the nerves with tailored sound checks and short clips of people from the region.",
    media: [548, 368],
  },
  {
    eyebrow: "Study at your own pace",
    title: "Study your way",
    text: "Whatever brings you here, there is a route for you. Study toward any aim with clear, simple courses and brief but focused lessons. You set the rhythm.",
    media: [405, 273],
    badges: true,
  },
];

export function HomeScreen() {
  const brand = useBrand();
  return (
    <div className="busuu-ref bu-legacy bu-home">
      <HomeHeader />
      <main>
        <section className="bu-hh">
          <div className="bu-hh__inner">
            <div className="bu-hh__text">
              <h1>Language skills for the everyday talks that truly matter to you</h1>
              <p>{brand} tracks your level, your weak spots and your goals, so that you feel sure of each word in a new language.</p>
              <a href="#" className="bu-lbtn bu-lbtn--mint bu-hh__cta">
                Start for free
              </a>
              <div className="bu-hh__trust" aria-hidden="true" />
            </div>
            <Media className="bu-hh__art" onBlue />
          </div>
        </section>
        <LanguageStrip />
        <section className="bu-how" aria-labelledby="bu-how-title">
          <h2 id="bu-how-title">Why study a language with {brand}?</h2>
          {ARTICLES.map((article, index) => (
            <article className={index % 2 ? "bu-how__row bu-how__row--flip" : "bu-how__row"} key={article.title}>
              <Media className="bu-how__media" style={{ ["--media-h" as string]: `${article.media[0]}px`, ["--media-h-sm" as string]: `${article.media[1]}px` }} />
              <div className="bu-how__info">
                <p className="bu-how__eyebrow">{article.eyebrow}</p>
                <h3>{article.title}</h3>
                <p>{article.text}</p>
                {article.badges ? <StoreBadges className="bu-how__badges" /> : null}
              </div>
            </article>
          ))}
        </section>
        <section className="bu-htrust">
          <h2>Chosen by people in every time zone who study a little each day</h2>
          <TrustSlot className="bu-htrust__slot" />
        </section>
        <section className="bu-awards">
          <div className="bu-awards__badges">
            <Media className="bu-awards__badge" onBlue />
            <Media className="bu-awards__badge" onBlue />
          </div>
          <h2>Start your first lesson on {brand} today</h2>
          <p>A prize-winning language study platform for new and seasoned learners.</p>
          <a href="#" className="bu-lbtn bu-lbtn--mint bu-awards__cta">
            Get started
          </a>
        </section>
        <section className="bu-b2b">
          <h2>Considering language training for your company?</h2>
          <a href="#" className="bu-b2b__link">
            See how we support these well known teams today
          </a>
          <ul className="bu-b2b__logos" aria-label="Customer logos">
            {[0, 1, 2, 3, 4].map((index) => (
              <li key={index}>
                <Media className="bu-b2b__logo" />
              </li>
            ))}
          </ul>
        </section>
      </main>
      <LegacyFooter variant="home" />
    </div>
  );
}
