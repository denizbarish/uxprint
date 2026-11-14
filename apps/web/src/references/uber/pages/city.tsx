"use client";

import { useState } from "react";
import { Arrow, Pin, Shell } from "../chrome";
import { filler } from "../filler";
import { Button, Faq, Feature, LocationFields, Media, Tabs, TextLink, pad, useCarousel } from "../parts";
import { AppBand } from "./ride";
import "./city.css";

function Hero() {
  return (
    <section className="ub-city-hero">
      <div className="ub-wrap ub-city-hero__grid">
        <div>
          <h1 className="ub-h1 ub-city-hero__title">Moving around Hometown</h1>
          <p className="ub-body ub-city-hero__lead">{filler(205, 3)}</p>
          <LocationFields />
          <div className="ub-city-when">
            <label>
              <span>Day</span>
              <span className="ub-city-when__input">
                <input type="date" aria-label="Day" />
              </span>
            </label>
            <label>
              <span>Hour</span>
              <span className="ub-city-when__input">
                <select aria-label="Hour" defaultValue="now">
                  <option value="now">Now</option>
                  <option>Later</option>
                </select>
              </span>
            </label>
          </div>
          <Button className="ub-city-hero__go">See fares</Button>
        </div>
        <Media tone="cool" className="ub-city-hero__art" />
      </div>
    </section>
  );
}

function Groups() {
  const [tab, setTab] = useState(0);
  const { index, controls } = useCarousel(2);
  return (
    <section className="ub-sec ub-city-groups" style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40 })}>
      <div className="ub-wrap">
        <h2 className="ub-h2 ub-city-wide">Travelling as a big group or with family through Acme</h2>
        <p className="ub-body ub-city-lead">{filler(140, 4)}</p>
        <Tabs label="Group options" labels={["Big groups", "Families", "Car hire"]} active={tab} onChange={setTab} />
        <div className="ub-city-track" style={{ transform: `translateX(calc(${index} * -1 * var(--city-pitch)))` }}>
          {[
            { title: "Group trips", link: "Read more about group trips" },
            { title: "Booking several cars", link: "" },
          ].map((card, i) => (
            <article key={card.title} className="ub-city-gcard">
              <Media tone={i ? "cool" : "warm"} className="ub-city-gcard__media" />
              <h3 className="ub-h3">{card.title}</h3>
              <p className="ub-body">{filler(i ? 140 : 120, 6 + i)}</p>
              {card.link ? <TextLink>{card.link}</TextLink> : null}
            </article>
          ))}
        </div>
        <div className="ub-city-mobilenav">{controls}</div>
      </div>
    </section>
  );
}

function Fleet() {
  const [tab, setTab] = useState(0);
  const { index, controls } = useCarousel(3);
  return (
    <section className="ub-sec ub-city-fleet" style={pad({ pt: 64, pb: 80, "pt-s": 40, "pb-s": 40 })}>
      <div className="ub-wrap">
        <h2 className="ub-h2 ub-city-wide">Shared trips and other services around Hometown</h2>
        <div className="ub-body ub-city-lead">
          <p>{filler(300, 8)}</p>
          <p>{filler(55, 9)}</p>
        </div>
        <Tabs label="Trip types" labels={["Common", "Other"]} active={tab} onChange={setTab} />
        <div className="ub-city-track" style={{ transform: `translateX(calc(${index} * -1 * var(--city-pitch)))` }}>
          {["Dark Cab", "Street Cab", "Value Cab"].map((name, i) => (
            <article key={name} className="ub-city-vcard">
              <Media tone="light" className="ub-city-vcard__media" />
              <h3 className="ub-label">
                {name} <span className="ub-city-badge">1-4</span>
              </h3>
              <p className="ub-body">{filler([76, 87, 75][i] ?? 76, 10 + i)}</p>
            </article>
          ))}
        </div>
        <div className="ub-city-mobilenav">{controls}</div>
      </div>
    </section>
  );
}

const SPOTS = ["Old Market", "North Square", "Harbour Tower", "Spice Hall", "Clock Tower", "River Park", "Hill Mosque", "Main Station", "Ferry Pier", "Art Museum"];

function Explore() {
  const [tab, setTab] = useState(0);
  return (
    <section className="ub-sec ub-greyband ub-city-explore" style={pad({ pt: 64, pb: 64, "pt-s": 16, "pb-s": 40 })}>
      <div className="ub-wrap">
        <h2 className="ub-h2 ub-sec__head ub-city-explore__title">Discover Hometown and nearby areas</h2>
        <Tabs label="Places" labels={["Sightseeing", "Transit", "Stays", "Entertainment", "Dining out"]} active={tab} onChange={setTab} />
        <div className="ub-city-explore__grid">
          <ul className="ub-city-spots">
            {SPOTS.map((spot) => (
              <li key={spot}>
                <Pin />
                <span>{spot}</span>
                <a href="#" className="ub-btn" data-size="small">
                  Go
                </a>
              </li>
            ))}
          </ul>
          <Media tone="light" className="ub-city-map" label="Map" />
          <a href="#" className="ub-city-article">
            <Media tone="night" className="ub-city-article__media" />
            <span className="ub-city-article__title">Terminal drop-off: a guide to getting there</span>
            <span className="ub-city-article__more">Read more</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function CityScreen() {
  return (
    <Shell>
      <nav className="ub-crumbs" aria-label="Breadcrumb">
        <div className="ub-wrap">
          <a href="#" className="ub-ulink">
            Region
          </a>
          <span aria-hidden="true">&gt;</span>
          <span aria-current="page">Hometown</span>
        </div>
      </nav>
      <Hero />
      <Feature
        side="right"
        mediaFirst
        style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40, ar: "1 / 1", bt: 24, at: 32, "gap-s": 36 })}
        title="Book ahead for a trip around Hometown"
        body={<p className="ub-body">{filler(218, 5)}</p>}
        action={<Button>Book a trip</Button>}
        media={<Media tone="warm" />}
      />
      <Groups />
      <Fleet />
      <Explore />
      <section className="ub-sec" style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40 })}>
        <div className="ub-wrap">
          <h2 className="ub-h2 ub-city-wide">Hometown cabs and other trip types</h2>
          <p className="ub-body ub-city-lead">{filler(308, 12)}</p>
          <ul className="ub-city-links">
            {["Hometown cabs", "Riverside cabs", "Northside cabs", "Old Town cabs", "Harbour cabs"].map((item) => (
              <li key={item}>
                <a href="#">
                  <span className="ub-h3">{item}</span>
                  <Arrow />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="ub-sec" style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40, hb: 36, "hb-s": 36 })}>
        <div className="ub-wrap">
          <h2 className="ub-h2 ub-sec__head">Questions people often ask</h2>
          <Faq
            seed={20}
            items={[
              { q: "Does Acme run in Hometown today?", a: 30 },
              { q: "What is the cheapest way to move around Hometown now?", a: 200 },
              { q: "Can I get around Hometown with no car of my own?", a: 140 },
              { q: "How does Acme in Hometown keep its riders safe each day?", a: 130 },
            ]}
          />
        </div>
      </section>
      <section className="ub-sec ub-city-notes" style={pad({ pt: 79, pb: 79, "pt-s": 40, "pb-s": 40 })}>
        <div className="ub-wrap">
          <p>{filler(205, 30)}</p>
          <p>{filler(112, 31)}</p>
          <p>{filler(237, 32)}</p>
        </div>
      </section>
      <AppBand title="It works better in the app" second="Get the partner app" secondCode />
    </Shell>
  );
}
