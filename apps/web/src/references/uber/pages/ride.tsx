"use client";

import { Shell, SubNav } from "../chrome";
import { filler } from "../filler";
import { AppCards, Button, CardRow, CityLine, Faq, Feature, LocationFields, Media, TextLink, Tiles, WhenPill, pad } from "../parts";
import "./ride.css";

/** Booking hero shared by the ride and city screens: form on the left, a 576x384 illustration on the right. */
export function BookingHero({ title, city }: { title: string; city?: string }) {
  return (
    <section className="ub-bhero">
      <div className="ub-wrap ub-bhero__grid">
        <div className="ub-bhero__form">
          <CityLine city={city} />
          <h1 className="ub-h1 ub-bhero__title">{title}</h1>
          <WhenPill />
          <LocationFields />
          <Button className="ub-bhero__go">See fares</Button>
        </div>
        <Media tone="warm" className="ub-bhero__art" />
      </div>
    </section>
  );
}

export function AppBand({ title, second = "Join to ride", secondCode }: { title: string; second?: string; secondCode?: boolean }) {
  return (
    <section className="ub-sec ub-greyband ub-appband" style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40, hb: 36, "hb-s": 36 })}>
      <div className="ub-wrap">
        <h2 className="ub-h2 ub-sec__head">{title}</h2>
        <AppCards
          cards={[
            { title: "Get the Acme app", caption: "Scan to install" },
            secondCode ? { title: second, caption: "Scan to install" } : { title: second, tile: true },
          ]}
        />
      </div>
    </section>
  );
}

function Reserve() {
  return (
    <div className="ub-reserve">
      <div className="ub-reserve__panel">
        <div className="ub-reserve__form">
          <h3 className="ub-h2 ub-reserve__title">Lock in your trip with Acme Ahead</h3>
          <h4 className="ub-label ub-reserve__step">Pick a day and hour</h4>
          <div className="ub-reserve__fields">
            <label className="ub-reserve__field">
              <span>Day</span>
              <span className="ub-reserve__input">
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M2 4h12v10H2zM2 7h12M5 2v3M11 2v3" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <input type="date" aria-label="Day" />
              </span>
            </label>
            <label className="ub-reserve__field">
              <span>Hour</span>
              <span className="ub-reserve__input">
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 5v3l2 1" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <select aria-label="Hour" defaultValue="">
                  <option value="" disabled>
                    Hour
                  </option>
                  <option>08:00</option>
                  <option>12:00</option>
                  <option>18:00</option>
                </select>
              </span>
            </label>
          </div>
          <button type="button" className="ub-btn ub-reserve__next">
            Continue
          </button>
        </div>
        <Media tone="cool" className="ub-reserve__art" />
      </div>
      <aside className="ub-perks">
        <h3 className="ub-perks__title">Perks</h3>
        <ul>
          {[55, 43, 48].map((length, index) => (
            <li key={length}>
              <span className="ub-perks__icon" aria-hidden="true" />
              <p>{filler(length, index + 9)}</p>
            </li>
          ))}
        </ul>
        <a href="#" className="ub-perks__terms">
          Read rules
        </a>
      </aside>
    </div>
  );
}

const FAQ = [
  { q: "Can a lost bag be sent back to me?", a: 180 },
  { q: "Can I hire a car through Acme?", a: 120 },
  { q: "Can one trip collect friends from different streets?", a: 210 },
  { q: "Can I book a street cab with Acme?", a: 140 },
  { q: "Is there a trip option for five riders?", a: 160 },
];

export function RideScreen() {
  return (
    <Shell subnav={<SubNav title="Trips" links={["Book a trip", "Plan a trip", "See fares", "Browse trip types", "Terminal trips"]} />}>
      <BookingHero title="Book a trip now" />

      <section className="ub-sec ub-ride-explore" style={pad({ pt: 0, pb: 18, hb: 30 })}>
        <div className="ub-wrap">
          <h2 className="ub-h2 ub-sec__head">See all you can do with Acme</h2>
          <Tiles
            items={[
              { title: "Trips", text: 54 },
              { title: "Book ahead", text: 70 },
            ]}
          />
        </div>
      </section>

      <section className="ub-sec ub-ride-appmobile" style={pad({ "pt-s": 0, "pb-s": 60, "hb-s": 36 })}>
        <div className="ub-wrap">
          <h2 className="ub-h2 ub-sec__head">Get more from the app</h2>
          <AppCards cards={[{ title: "Get the Acme app", tile: true }]} />
        </div>
      </section>

      <section className="ub-sec" style={pad({ pt: 30, pb: 32, "pt-s": 23, "pb-s": 20, hb: 30, "hb-s": 36 })}>
        <div className="ub-wrap">
          <h2 className="ub-h2 ub-sec__head">Book for later</h2>
          <Reserve />
        </div>
      </section>

      <Feature
        className="ub-dark"
        style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40, ar: "558 / 372", bt: 24, at: 32, "gap-s": 36 })}
        title="Acme Plus"
        body={<p className="ub-body">{filler(81, 11)}</p>}
        action={<Button kind="white">Start trial</Button>}
        media={<Media tone="warm" />}
      />

      <section className="ub-sec" style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40, hb: 36, "hb-s": 36 })}>
        <div className="ub-wrap">
          <h2 className="ub-h2 ub-sec__head">Let the Acme app help you get anywhere</h2>
          <CardRow
            square
            cards={[
              { title: "Trip types", text: 97, action: "Browse trip types" },
              { title: "700+ terminals", text: 121, action: "Find terminals" },
              { title: "15,000+ places", text: 112, action: "Find places" },
            ]}
          />
        </div>
      </section>

      <Feature
        className="ub-dark ub-ride-biz"
        style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40, ar: "558 / 314", bt: 24, at: 32, "gap-s": 36 })}
        title="Need travel tools for your company?"
        body={
          <>
            <p className="ub-body">
              {filler(40, 12)} <a href="#" className="ub-ulink">Acme for Teams</a>:
            </p>
            <ul className="ub-ride-biz__list">
              {["Work travel", "Hosted rides", "Meal plans", "Parcel drops"].map((item) => (
                <li key={item}>
                  <a href="#" className="ub-ulink">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </>
        }
        action={
          <>
            <Button kind="white">Get going</Button>
            <TextLink>See our team tools</TextLink>
          </>
        }
        media={<Media tone="warm" />}
      />

      <section className="ub-sec ub-faqsec" style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40, hb: 36, "hb-s": 36 })}>
        <div className="ub-wrap">
          <h2 className="ub-h2 ub-sec__head">Questions people often ask</h2>
          <Faq items={FAQ} />
        </div>
      </section>

      <AppBand title="Get more from the app" />
    </Shell>
  );
}
