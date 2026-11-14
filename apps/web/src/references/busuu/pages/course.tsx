"use client";

import { useId, useState } from "react";
import { Chevron, Flag, MarketingShell } from "../chrome";
import { LANGUAGES } from "../filler";
import { Carousel, ContentCard, DownloadBanner, Hero, Media, ReviewCard, StatCards, Steps } from "../parts";
import "./course.css";

const COUNTS = ["2M", "4M", "26M", "2M", "5M", "1M", "100K", "16K", "2M", "2M", "1M", "4M", "2M", "2M"];

const COURSES: [string, string][] = [
  ["Complete Swedish", "Starter, middle and upper levels in one path."],
  ["Swedish for Holidays", "Useful words and phrases for trips, hotels and food."],
  ["Swedish Certificate Exam Practice", "Prepare for an official language exam with mock tests."],
  ["Complete Swedish for the Workplace", "Starter, middle and upper levels for office life."],
  ["Read Swedish with Short News", "Practise reading with short articles every week."],
  ["Swedish Culture Tour", "Discover traditions, food and music from the region."],
];

const CHIPS: [string, string][] = [
  ["Move forward each day", "Reach your goals with a plan made just for you."],
  ["Listen to real voices", "Hear people from the region speak at a natural pace."],
  ["Get helpful notes", "Gain confidence with tips from fluent speakers."],
  ["Focused practice sessions", "Improve grammar and words with short exercises."],
];

const REVIEWS = [
  { name: "Lena P.", course: "Greek", purpose: "For school", quote: "I open the app every morning on the bus and the short lessons keep me going even on busy days at work." },
  { name: "Omar T.", course: "Swedish", purpose: "For work", quote: "Practising with real speakers helped me talk at meetings without freezing up halfway through." },
  { name: "Ines R.", course: "Hindi", purpose: "For work", quote: "I just finished a full year of daily lessons and I can follow films without subtitles for the first time ever." },
  { name: "Theo M.", course: "Czech", purpose: "For work", quote: "I could never have guessed how quickly the review sessions would make new words stick for good." },
  { name: "Mara K.", course: "Danish", purpose: "For work", quote: "The lessons are short, the feedback is kind and clear, and the progress chart makes me want to keep my streak alive." },
  { name: "Nadia S.", course: "Finnish", purpose: "For school", quote: "I needed a dependable app to keep studying between classes and this one fits right in." },
];

const GUIDES: [string, string][] = [
  ["Counting in Swedish: From One to One Hundred", ""],
  ["How to Get Comfortable Speaking Swedish", ""],
  ["Using the Verb for Having in Everyday Swedish", ""],
];

const LINK_LISTS: { title: string; links: string[] }[] = [
  { title: "Swedish for Starters", links: ["The alphabet, a short guide", "Colours in Swedish: a quick tour", "Telling the time: a simple guide", "Greetings for every day", "Months of the year"] },
  { title: "Swedish Grammar Subjects", links: ["Thirty handy adjectives for richer daily speech", "Pronouns explained: the types and where each one fits", "A clear look at prepositions", "A clear look at adverbs", "Word order made simple"] },
  { title: "Latest Guides", links: ["Ordering coffee like a local in town", "Twenty words every traveller should know", "How long does it take to learn Swedish", "The best way to practise listening", "Small talk phrases for meeting new people"] },
];

function LanguagePills() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="bu-pills">
      <h2 className="bu-pills__title">Which course would you like?</h2>
      <div className={expanded ? "bu-pills__wrap is-open" : "bu-pills__wrap"}>
        <ul className="bu-pills__list" id="bu-pills-list">
          {LANGUAGES.map((name, index) => (
            <li key={name}>
              <a href="#" className="bu-pill-lang">
                <Flag index={index} size={39} />
                <span>
                  <span className="bu-pill-lang__name">{name}</span>
                  <span className="bu-pill-lang__count">{COUNTS[index]} Learners</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="bu-pills__more"
          aria-expanded={expanded}
          aria-controls="bu-pills-list"
          aria-label={expanded ? "Show fewer courses" : "Show all courses"}
          onClick={() => setExpanded((value) => !value)}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}

function Award({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="bu-award">
      <span className="bu-award__leaf" aria-hidden="true" />
      <div>
        <span className="bu-award__icon" aria-hidden="true" />
        <p className="bu-award__title">{title}</p>
        <p className="bu-award__sub">{sub}</p>
      </div>
      <span className="bu-award__leaf bu-award__leaf--right" aria-hidden="true" />
    </div>
  );
}

function FeatureBand() {
  const [active, setActive] = useState(0);
  return (
    <section className="bu-band">
      <div className="bu-band__inner">
        <div className="bu-band__left">
          <h2>Find a Swedish learning method that really works well for you</h2>
          <div className="bu-band__chips" role="group" aria-label="Method highlights">
            {CHIPS.map(([title, text], index) => (
              <button
                type="button"
                aria-pressed={active === index}
                key={title}
                className={active === index ? "bu-chip is-active" : "bu-chip"}
                onClick={() => setActive(index)}
              >
                <span className="bu-chip__title">{title}</span>
                <span className="bu-chip__text">{text}</span>
              </button>
            ))}
          </div>
          <div className="bu-band__cta">
            <span className="bu-band__laurel" aria-hidden="true" />
            <a href="#" className="bu-btn bu-btn--lg bu-band__btn">
              Begin for free
            </a>
            <span className="bu-band__laurel" aria-hidden="true" />
          </div>
        </div>
        <div className="bu-band__right">
          <div className="bu-band__awards">
            <Award title="Top app pick" sub="App shop" />
            <Award title="Editors' pick" sub="Play shop" />
          </div>
          <div className="bu-band__stage">
            <span className="bu-band__sun" aria-hidden="true" />
            <Media className="bu-band__phone" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Plain list on desktop; a collapsible card on phones (first one open), as on the original. */
function LinkList({ title, links, defaultOpen }: { title: string; links: string[]; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="bu-linklist" data-open={open}>
      <h3>
        <button type="button" className="bu-linklist__head" aria-expanded={open} aria-controls={id} onClick={() => setOpen((value) => !value)}>
          {title}
          <Chevron up={open} />
        </button>
      </h3>
      <ul id={id}>
        {links.map((link) => (
          <li key={link}>
            <a href="#">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CourseScreen() {
  return (
    <MarketingShell className="bu-course" simple>
      <Hero
        className="bu-hero--course"
        title="Study Swedish online at no cost"
        subtitle="Our online Swedish lessons prepare you for everyday talks with the many people who speak the language every day."
        action={
          <a href="#" className="bu-btn bu-btn--mint bu-btn--lg bu-course__cta">
            Begin for free
          </a>
        }
        trust
      />
      <LanguagePills />
      <Carousel title="Courses for every level and goal" className="bu-course__courses">
        {COURSES.map(([title, text]) => (
          <ContentCard key={title} title={title} text={text} />
        ))}
      </Carousel>
      <div className="bu-course__all">
        <a href="#" className="bu-btn bu-btn--blue">
          See all courses
        </a>
      </div>
      <StatCards
        className="bu-course__stats"
        stats={[
          ["480+", "lessons in the full Swedish course alone"],
          ["110m+", "people signed up"],
          ["4million", "people began their Swedish journey with us"],
        ]}
      />
      <FeatureBand />
      <Steps
        className="bu-steps--strong"
        title="How the method works"
        steps={[
          { text: "Short lessons that fit neatly around your day and your busy plans" },
          { text: "Practise speaking Swedish with expert tips and quick reviews" },
          { text: "Get support from fluent Swedish speakers" },
        ]}
      />
      <Carousel title="Why people pick it" className="bu-course__reviews">
        {REVIEWS.map((review, index) => (
          <ReviewCard key={review.name} index={index} {...review} />
        ))}
      </Carousel>
      <DownloadBanner
        before="Get the free app and start to learn"
        word="Swedish"
        after="any day."
        note="Take every Swedish lesson with you on your phone and keep your progress in sync with the web whenever you sign in."
      />
      <Carousel title="Swedish study guides" className="bu-course__guides">
        {GUIDES.map(([title]) => (
          <ContentCard key={title} title={title} action="Read more" />
        ))}
      </Carousel>
      <section className="bu-linklists" aria-label="More guides">
        {LINK_LISTS.map((list, index) => (
          <LinkList key={list.title} title={list.title} links={list.links} defaultOpen={index === 0} />
        ))}
      </section>
    </MarketingShell>
  );
}
