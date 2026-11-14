"use client";

import { Shell } from "../chrome";
import { filler } from "../filler";
import { Button, Feature, IconCols, Media, TextLink, pad } from "../parts";
import "./about.css";

export function AboutScreen() {
  return (
    <Shell>
      <section className="ub-about-hero ub-dark">
        <Media tone="warm" className="ub-about-bg" />
        <div className="ub-wrap ub-about-hero__text">
          <h1 className="ub-h1">Our story</h1>
        </div>
      </section>

      <section className="ub-sec ub-about-intro" style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40 })}>
        <div className="ub-wrap">
          <h2 className="ub-h2">We keep looking for better ways to get around</h2>
          <p className="ub-body">{filler(363, 1)}</p>
        </div>
      </section>

      <section className="ub-about-letter ub-dark">
        <Media tone="night" className="ub-about-bg" />
        <div className="ub-wrap ub-about-letter__text">
          <h2 className="ub-h1">A note from our chief executive</h2>
          <p className="ub-body">{filler(126, 2)}</p>
          <Button>Read the full note</Button>
        </div>
      </section>

      <Feature
        side="right"
        mediaFirst
        className="ub-about-grey"
        style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40, ar: "558 / 372", bt: 24, at: 32, "gap-s": 36, ta: "start" })}
        title="Our footprint"
        body={<p className="ub-body">{filler(534, 3)}</p>}
        action={<TextLink>Read more</TextLink>}
        media={<Media tone="green" />}
      />
      <Feature
        side="right"
        mediaFirst
        className="ub-about-grey"
        style={pad({ pt: 128, pb: 64, "pt-s": 80, "pb-s": 40, ar: "558 / 372", bt: 24, at: 32, "gap-s": 36 })}
        title="Trips and much more"
        body={<p className="ub-body">{filler(315, 4)}</p>}
        action={
          <>
            <TextLink>How the app works for you</TextLink>
            <TextLink>Our services</TextLink>
          </>
        }
        media={<Media tone="cool" />}
      />
      <Feature
        className="ub-about-grey"
        style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40, ar: "558 / 372", bt: 24, at: 32, "gap-s": 36 })}
        title="Your safety guides our work"
        body={<p className="ub-body">{filler(311, 5)}</p>}
        action={<TextLink>Read more</TextLink>}
        media={<Media tone="light" />}
      />

      <section className="ub-sec ub-about-grey" style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40, hb: 36, "hb-s": 36 })}>
        <div className="ub-wrap">
          <h2 className="ub-h2 ub-sec__head">Company facts</h2>
          <ul className="ub-about-cards">
            {[
              { title: "Who runs the company", text: 172, link: "Meet the leadership" },
              { title: "Acting with honesty every day", text: 276, link: "Read more" },
            ].map((card, index) => (
              <li key={card.title}>
                <Media tone={index ? "night" : "neutral"} className="ub-about-cards__media" />
                <h3 className="ub-label">
                  <a href="#">{card.title}</a>
                </h3>
                <p className="ub-body">{filler(card.text, 6 + index)}</p>
                <TextLink className="ub-about-cards__link">{card.link}</TextLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ub-sec ub-about-grey" style={pad({ pt: 64, pb: 128, "pt-s": 40, "pb-s": 80 })}>
        <div className="ub-wrap">
          <h2 className="ub-h2">Stay up to date</h2>
          <IconCols
            seed={14}
            cols={[
              { title: "Pressroom", text: 103, link: "See announcements" },
              { title: "Blog", text: 81, link: "Read our posts" },
              { title: "Shareholder notes", text: 108, link: "Read more" },
            ]}
          />
        </div>
      </section>

      <Feature
        level={1}
        className="ub-about-grey ub-about-join"
        style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40, ar: "558 / 372", at: 44, "gap-s": 36 })}
        title="Come build the future with us"
        action={<Button>See open positions</Button>}
        media={<Media tone="cool" circle />}
      />

      <section className="ub-sec ub-about-note" style={pad({ pt: 64, pb: 64, "pt-s": 40, "pb-s": 40 })}>
        <div className="ub-wrap">
          <p>
            Images taken from{" "}
            <a href="#" className="ub-ulink">
              our community photo library and archive
            </a>{" "}
            unless noted.
          </p>
        </div>
      </section>
    </Shell>
  );
}
