"use client";

import { useState } from "react";
import { Arrow, Shell, SubNav } from "../chrome";
import { filler } from "../filler";
import { AppCards, Button, Faq, IconCols, Media, Tabs, TextLink, pad, useCarousel } from "../parts";
import "./drive.css";

function GetStarted() {
  const [tab, setTab] = useState(0);
  const { index, controls } = useCarousel(3);
  return (
    <section className="ub-sec ub-earn-start" style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40, hb: 36, "hb-s": 36 })}>
      <div className="ub-wrap">
        <h2 className="ub-h2 ub-sec__head">First steps</h2>
        <Tabs label="Ways to start" labels={["Take the wheel"]} active={tab} onChange={setTab} />
        <div className="ub-earn-start__track" style={{ transform: `translateX(calc(${index} * -1 * var(--earn-pitch)))` }}>
          <IconCols
            seed={20}
            cols={[
              { title: "Apply on the web", text: 129, link: "Apply on the web" },
              { title: "Send the papers we need to check", text: 152, link: "What we need" },
              { title: "Find a car", text: 101, link: "Car requirements" },
            ]}
          />
        </div>
        <div className="ub-earn-start__nav">{controls}</div>
      </div>
    </section>
  );
}

export function DriveScreen() {
  return (
    <Shell
      subnav={
        <SubNav
          title="Drive"
          links={["Apply", "What you need", "Car options for you", "Your first trip", "Using the app", "Earnings", "Acme Pro", "Safety", "Contact us"]}
        />
      }
    >
      <section className="ub-earn-hero ub-dark">
        <div className="ub-wrap ub-earn-hero__grid">
          <div className="ub-earn-hero__text">
            <h1 className="ub-h1">Work is waiting everywhere</h1>
            <p className="ub-body">{filler(97, 2)}</p>
            <div className="ub-earn-hero__actions">
              <Button kind="white">Apply to drive now</Button>
              <TextLink>Log in</TextLink>
            </div>
          </div>
          <Media tone="cool" className="ub-earn-hero__art" />
        </div>
      </section>

      <section className="ub-sec ub-earn-sec" style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40, hb: 36, "hb-s": 36 })}>
        <div className="ub-wrap">
          <h2 className="ub-h2 ub-sec__head">Earn money whenever you want</h2>
          <Media tone="cool" className="ub-earn-wide" />
          <IconCols
            seed={4}
            cols={[
              { title: "Choose your own hours", text: 118 },
              { title: "Set the pace of earnings", text: 107 },
              { title: "Follow the route on screen", text: 103 },
            ]}
          />
        </div>
      </section>

      <GetStarted />

      <section className="ub-sec ub-earn-sec" style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40, hb: 36, "hb-s": 36 })}>
        <div className="ub-wrap">
          <h2 className="ub-h2">Partner perks</h2>
          <p className="ub-body ub-earn-lead">What we offer you in your region</p>
          <IconCols
            big
            seed={12}
            cols={[
              { title: "Find help", text: 146, link: "Get help" },
              { title: "Reach us", text: 117, link: "Reach us" },
              { title: "Drive safe", text: 154, link: "Read about our safety" },
            ]}
          />
        </div>
      </section>

      <section className="ub-sec ub-faqsec" style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40, hb: 36, "hb-s": 36 })}>
        <div className="ub-wrap">
          <h2 className="ub-h2 ub-sec__head">Questions people often ask</h2>
          <Faq
            seed={40}
            items={[
              { q: "Can I drive with Acme in my area?", a: 60 },
              { q: "What do I need before I can drive with Acme?", a: 120 },
              { q: "Is the Acme platform safe?", a: 120 },
              { q: "Do I need a car of my own?", a: 60 },
            ]}
          />
        </div>
      </section>

      <section className="ub-earn-app">
        <Media tone="night" className="ub-earn-app__art" />
        <div className="ub-wrap ub-earn-app__text">
          <h2 className="ub-h2">The partner app</h2>
          <p className="ub-body">{filler(141, 30)}</p>
          <TextLink>Watch how it works</TextLink>
        </div>
      </section>

      <section className="ub-sec ub-greyband" style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40, hb: 36, "hb-s": 36 })}>
        <div className="ub-wrap">
          <h2 className="ub-h2 ub-sec__head">Drive on your terms in the app</h2>
          <div className="ub-earn-onecard">
            <AppCards cards={[{ title: "Get the partner app", caption: "Scan to install" }]} />
          </div>
        </div>
      </section>

      <section className="ub-sec" style={pad({ pt: 64, pb: 40, "pt-s": 40, "pb-s": 40 })}>
        <div className="ub-wrap">
          <a href="#" className="ub-earn-signup">
            <span className="ub-h2">Apply to drive</span>
            <Arrow />
          </a>
        </div>
      </section>

      <section className="ub-sec ub-earn-notes" style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40 })}>
        <div className="ub-wrap">
          <p>{filler(739, 50)}</p>
          <p>{filler(420, 51)}</p>
          <p>{filler(560, 52)}</p>
        </div>
      </section>
    </Shell>
  );
}
