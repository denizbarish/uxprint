"use client";

import { Shell } from "../chrome";
import { filler } from "../filler";
import { Button, Media, TextLink, pad, useCarousel } from "../parts";
import "./business.css";

type Block = { title: string; cols: { title: string; text: number }[]; link: string; grey?: boolean };

const BLOCKS: Block[] = [
  {
    title: "Work travel",
    link: "Read more about work travel tools",
    cols: [
      { title: "You set the rules", text: 98 },
      { title: "Control spend and use", text: 83 },
      { title: "Unlock perks for your staff", text: 131 },
    ],
  },
  {
    title: "Team meals",
    grey: true,
    link: "Read more about meal plans",
    cols: [
      { title: "Order for one person or the whole team", text: 88 },
      { title: "Make payments and expense claims simple", text: 95 },
      { title: "Worry less with reliable round-the-clock help", text: 74 },
    ],
  },
  {
    title: "Commute plans",
    link: "Read more about commute plans",
    cols: [
      { title: "Build a custom plan", text: 132 },
      { title: "Control your budget with ease", text: 138 },
      { title: "Improve the daily trip for staff", text: 147 },
    ],
  },
  {
    title: "Hosted rides",
    grey: true,
    link: "Read more about hosted rides",
    cols: [
      { title: "Handle every trip with flexibility and control", text: 112 },
      { title: "Keep riders informed through every trip", text: 118 },
    ],
  },
];

function Solution({ block, index }: { block: Block; index: number }) {
  return (
    <section className={`ub-biz-block${block.grey ? " ub-greyband" : ""}`}>
      <div className="ub-wrap">
        <Media tone="light" className="ub-biz-diagram" />
        <h2 className="ub-h2 ub-biz-block__title">{block.title}</h2>
        <ul className="ub-biz-cols" data-count={block.cols.length}>
          {block.cols.map((col, i) => (
            <li key={col.title}>
              <span className="ub-biz-cols__icon" aria-hidden="true" />
              <h3 className="ub-label">{col.title}</h3>
              <p className="ub-body">{filler(col.text, index * 3 + i)}</p>
            </li>
          ))}
        </ul>
        <a href="#" className="ub-biz-block__link">
          {block.link}
        </a>
      </div>
    </section>
  );
}

function Industries() {
  const { index, controls } = useCarousel(5);
  return (
    <section className="ub-sec ub-biz-carousel" style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40, hb: 53, "hb-s": 36 })}>
      <div className="ub-wrap">
        <h2 className="ub-h2 ub-sec__head">Tools shaped for your field of work</h2>
        <div className="ub-biz-track" style={{ transform: `translateX(calc(${index} * -1 * var(--biz-pitch)))` }}>
          {["Clinics", "Car makers", "Transit", "Hospitality", "Education"].map((name, i) => (
            <a key={name} href="#" className="ub-biz-ind">
              <Media tone={(["cool", "warm", "night", "green", "neutral"] as const)[i]} circle className="ub-biz-ind__media" />
              <span className="ub-h3">{name}</span>
            </a>
          ))}
        </div>
        <div className="ub-biz-nav">{controls}</div>
      </div>
    </section>
  );
}

function Dashboard() {
  const { index, controls } = useCarousel(5);
  return (
    <section className="ub-sec ub-dark ub-biz-dash" style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40 })}>
      <div className="ub-wrap">
        <h2 className="ub-h2 ub-biz-center">
          One console, <span className="ub-biz-blue">full clarity</span>
        </h2>
        <p className="ub-body ub-biz-center ub-biz-dash__lead">{filler(117, 2)}</p>
        <div className="ub-biz-track" style={{ transform: `translateX(calc(${index} * -1 * var(--biz-pitch)))` }}>
          {[
            { title: "Link your expense tools", text: 69 },
            { title: "Set the rules", text: 81 },
            { title: "Track activity", text: 109 },
            { title: "Pay one bill", text: 108 },
            { title: "Report it all", text: 93 },
          ].map((card, i) => (
            <article key={card.title} className="ub-biz-dash__card">
              <Media tone="light" className="ub-biz-dash__media" />
              <h3 className="ub-label">{card.title}</h3>
              <p className="ub-body">{filler(card.text, 4 + i)}</p>
            </article>
          ))}
        </div>
        <div className="ub-biz-nav">{controls}</div>
      </div>
    </section>
  );
}

export function BusinessScreen() {
  return (
    <Shell variant="teams" theme="light">
      <section className="ub-dark ub-biz-hero">
        <div className="ub-wrap ub-biz-hero__grid">
          <div className="ub-biz-hero__text">
            <h1 className="ub-h2">
              The Acme you know, <span className="ub-biz-blue">now shaped around the needs of your firm</span>
            </h1>
            <p className="ub-body">{filler(124, 1)}</p>
            <div className="ub-biz-hero__actions">
              <Button kind="white">Get going</Button>
              <TextLink>Browse our tools</TextLink>
            </div>
          </div>
          <Media tone="night" className="ub-biz-hero__art" />
        </div>
      </section>

      <section className="ub-sec ub-dark" style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40, hb: 33, "hb-s": 32 })}>
        <div className="ub-wrap">
          <h2 className="ub-h2 ub-sec__head ub-biz-center ub-biz-narrow">One place for travel and meals, in every office</h2>
          <ul className="ub-biz-boxes" data-tone="dark">
            {[
              { title: "Set clear travel rules", text: 130 },
              { title: "Get dedicated help", text: 130 },
              { title: "Put safer, smarter travel first", text: 123 },
              { title: "Offer exclusive perks", text: 117 },
            ].map((box, i) => (
              <li key={box.title}>
                <h3 className="ub-h3 ub-biz-blue">{box.title}</h3>
                <p className="ub-body">{filler(box.text, 8 + i)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ub-dark ub-biz-logos">
        <div className="ub-wrap">
          <p className="ub-body ub-biz-center">Chosen by more than 200,000 companies, among them many of the largest</p>
          <div className="ub-biz-logos__strip" aria-hidden="true" data-compare-mask="" />
        </div>
      </section>

      <section className="ub-sec" style={pad({ pt: 64, pb: 0, "pt-s": 40, "pb-s": 0 })}>
        <div className="ub-wrap">
          <h2 className="ub-h1 ub-biz-center">Company tools that move with you</h2>
        </div>
      </section>

      {BLOCKS.map((block, i) => (
        <Solution key={block.title} block={block} index={i} />
      ))}

      <Industries />

      <section className="ub-biz-band">
        <div className="ub-wrap">
          <Media tone="neutral" className="ub-biz-band__media" />
        </div>
      </section>

      <Dashboard />

      <section className="ub-sec ub-dark ub-biz-split" style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40 })}>
        <div className="ub-wrap ub-biz-split__grid">
          <Media tone="night" className="ub-biz-split__media" />
          <div>
            <h2 className="ub-h2">
              Plug in your <span className="ub-biz-blue">favourite expense tool</span>
            </h2>
            <p className="ub-body">{filler(116, 12)}</p>
            <Button kind="white">Read more</Button>
          </div>
        </div>
      </section>

      <section className="ub-sec" style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40, hb: 85, "hb-s": 36 })}>
        <div className="ub-wrap">
          <h2 className="ub-h2 ub-sec__head ub-biz-center">Useful for every team behind each trip or meal</h2>
          <ul className="ub-biz-boxes" data-tone="light">
            {[
              { title: "Travel leads", text: 150 },
              { title: "Finance and buying", text: 120 },
              { title: "Office assistants", text: 141 },
              { title: "Staff", text: 160 },
            ].map((box, i) => (
              <li key={box.title}>
                <Media tone={(["warm", "cool", "neutral", "green"] as const)[i]} circle className="ub-biz-boxes__media" />
                <h3 className="ub-h3 ub-biz-blue">{box.title}</h3>
                <p className="ub-body">{filler(box.text, 14 + i)}</p>
                <a href="#" className="ub-biz-block__link">
                  Read more
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ub-sec ub-dark ub-biz-split" style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40 })}>
        <div className="ub-wrap ub-biz-split__grid" data-flip="">
          <div>
            <h2 className="ub-h2">“It feels smooth, the way it all works. You do not expect it to be that easy, but it is.”</h2>
            <p className="ub-body">{filler(183, 16)}</p>
          </div>
          <Media tone="cool" className="ub-biz-split__media" />
        </div>
      </section>

      <section className="ub-sec ub-dark" style={pad({ pt: 64, pb: 32, "pt-s": 40, "pb-s": 24 })}>
        <div className="ub-wrap ub-biz-center">
          <h2 className="ub-h2">
            Joining Acme for Teams is <span className="ub-biz-blue">free</span>
          </h2>
          <Button kind="soft" className="ub-biz-signup">
            Get going
          </Button>
        </div>
      </section>

      <section className="ub-sec ub-dark ub-biz-notes" style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40 })}>
        <div className="ub-wrap">
          {[194, 420, 610, 520, 700, 380, 450, 300, 520, 250, 600].map((length, i) => (
            <p key={length + i}>{filler(length, 30 + i)}</p>
          ))}
        </div>
      </section>
    </Shell>
  );
}
