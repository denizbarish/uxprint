"use client";

import { Pin, Shell } from "../chrome";
import { filler } from "../filler";
import { AppCards, Button, CityLine, Feature, LocationFields, Media, TextLink, Tiles, WhenPill, pad, useCarousel } from "../parts";
import "./home.css";

const TILES = [
  { title: "Trips", text: 54 },
  { title: "Book ahead", text: 70 },
  { title: "Black Cab", text: 50 },
  { title: "Terminal", text: 65 },
  { title: "Youth", text: 64 },
  { title: "Elders", text: 73 },
];

const STEPS = [
  { title: "Set a goal", text: 81 },
  { title: "Find someone close to you", text: 76 },
  { title: "Wait at the curb", text: 88 },
  { title: "Ride in comfort", text: 62 },
  { title: "Rate the trip", text: 82 },
];

function Steps() {
  const { index, controls } = useCarousel(STEPS.length);
  return (
    <section className="ub-sec ub-home-steps" style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40, hb: 36, "hb-s": 36 })}>
      <div className="ub-wrap">
        <h2 className="ub-h2 ub-sec__head">How a trip works</h2>
        <div className="ub-home-steps__viewport">
          <ol className="ub-home-steps__track" style={{ transform: `translateX(calc(${index} * -1 * var(--step-pitch)))` }}>
            {STEPS.map((step, i) => (
              <li key={step.title} className="ub-home-step" aria-hidden={i < index ? true : undefined}>
                <div className="ub-home-step__art">
                  <Media tone={(["warm", "cool", "green", "neutral", "warm"] as const)[i]} className="ub-home-step__photo" />
                  <span className="ub-home-step__icon" data-compare-mask="">
                    <Pin />
                  </span>
                </div>
                <h3 className="ub-label">{step.title}</h3>
                <p className="ub-body ub-home-step__text">{filler(step.text, i + 3)}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="ub-home-steps__nav">{controls}</div>
      </div>
    </section>
  );
}

export function HomeScreen() {
  return (
    <Shell theme="dark">
      <section className="ub-home-hero">
        <div className="ub-wrap ub-home-hero__grid">
          <div className="ub-home-hero__form">
            <CityLine />
            <h1 className="ub-h1 ub-home-hero__title">Move freely</h1>
            <WhenPill />
            <LocationFields />
            <div className="ub-home-hero__actions">
              <Button kind="white">See fares</Button>
              <TextLink>Sign in to view past activity</TextLink>
            </div>
          </div>
          <div className="ub-home-hero__art">
            <Media tone="warm" className="ub-home-hero__grid-art" />
            <div className="ub-home-hero__band">
              <span>All set to go?</span>
              <a href="#" className="ub-btn" data-kind="pill">
                Plan it ahead
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="ub-sec ub-home-explore" style={pad({ pt: 0, pb: 18, "pt-s": 20, "pb-s": 0, hb: 30, "hb-s": 23 })}>
        <div className="ub-wrap">
          <h2 className="ub-h2 ub-sec__head">See all you can do with Acme</h2>
          <Tiles items={TILES} />
        </div>
      </section>

      <section className="ub-sec" style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40 })}>
        <div className="ub-wrap">
          <div className="ub-home-divider" aria-hidden="true" data-compare-mask="" />
        </div>
      </section>

      <Steps />

      <Feature
        style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40, ar: "558 / 318", bt: 24, at: 32, "gap-s": 36 })}
        className="ub-home-feature"
        title="Thinking about a trip away?"
        body={<p className="ub-body">{filler(154, 1)}</p>}
        action={
          <button type="button" className="ub-btn ub-home-citypill" data-kind="pill">
            <Pin />
            Hometown
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M5 7l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        }
        media={<Media tone="night" />}
      />

      <Feature
        style={pad({ pt: 0, pb: 64, "pt-s": 0, "pb-s": 40, ar: "558 / 372", bt: 24, at: 32, "gap-s": 36 })}
        className="ub-home-feature"
        title="Save more on trips and food orders"
        body={<p className="ub-body">{filler(63, 2)}</p>}
        action={<Button kind="white">Join today</Button>}
        media={<Media tone="warm" />}
      />

      <section className="ub-sec ub-home-earn" style={pad({ pt: 32, pb: 64, "pt-s": 20, "pb-s": 40, hb: 36, "hb-s": 36 })}>
        <div className="ub-wrap">
          <h2 className="ub-h2 ub-sec__head">Earn with Acme</h2>
          <div className="ub-home-earn__card">
            <Media tone="cool" className="ub-home-earn__media" />
            <h3 className="ub-label">Drive on hours that suit you</h3>
            <p className="ub-body">{filler(48, 4)}</p>
            <TextLink className="ub-home-earn__link">Start driving now</TextLink>
          </div>
        </div>
      </section>

      <Feature
        side="right"
        mediaFirst
        style={pad({ pt: 0, pb: 0, "pt-s": 0, "pb-s": 0, ar: "1 / 1", bt: 24, at: 32, "gap-s": 36 })}
        className="ub-home-feature"
        title="Everything you like about Acme, built for teams"
        body={<p className="ub-body">{filler(189, 6)}</p>}
        action={<Button kind="white">Read more</Button>}
        media={<Media tone="night" circle={false} />}
      />

      <section className="ub-sec" style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40, hb: 36, "hb-s": 36 })}>
        <div className="ub-wrap">
          <h2 className="ub-h2 ub-sec__head">It works better in the app</h2>
          <AppCards
            cards={[
              { title: "Get the Acme app", caption: "Scan to install" },
              { title: "Get the partner app", caption: "Scan to install" },
            ]}
          />
        </div>
      </section>
    </Shell>
  );
}
