"use client";

import { MarketingShell, useBrand } from "../chrome";
import { filler } from "../filler";
import { BlueCard, Carousel, FeatureCards, Hero, Media, Prose, Steps } from "../parts";
import "./careers.css";

const PERKS: [string, number][] = [
  ["Fair pay", 50],
  ["Flexible hours", 62],
  ["Learning budget", 58],
  ["Free membership", 46],
  ["Health cover", 64],
  ["Time to recharge", 55],
  ["Team events", 49],
  ["Parental leave", 60],
  ["Home office kit", 52],
];

const VALUES: [string, number][] = [
  ["Learners come first", 195],
  ["Own the outcome", 220],
  ["Stay curious", 170],
  ["Speak up kindly", 195],
  ["Win as one team", 185],
];

export function CareersScreen() {
  const brand = useBrand();
  return (
    <MarketingShell tone="clear" className="bu-careers">
      <Hero
        className="bu-hero--careers"
        title={`Jobs at ${brand}`}
        subtitle={filler(196, 41)}
        action={
          <a href="#" className="bu-btn bu-btn--blue">
            See open roles
          </a>
        }
      />
      <Prose>
        <h2>Who we are</h2>
        <p>{filler(177, 42)}</p>
        <p>{filler(207, 43)}</p>
      </Prose>
      <FeatureCards
        tone="white"
        className="bu-careers__beliefs"
        items={[
          ["Our core idea", filler(150, 44)],
          ["Our purpose", filler(140, 45)],
          ["Our promise", filler(145, 46)],
        ]}
      />
      <Carousel title="A few of the perks">
        {PERKS.map(([title, length], index) => (
          <article className="bu-perk" key={title}>
            <Media className="bu-perk__art" />
            <h3>{title}</h3>
            <p>{filler(length, 50 + index)}</p>
          </article>
        ))}
      </Carousel>
      <BlueCard className="bu-careers__story">
        <h2>More about our story</h2>
        <p>{filler(323, 60)}</p>
        <p>{filler(292, 61)}</p>
      </BlueCard>
      <Steps title="Our company values" steps={VALUES.map(([heading, length], index) => ({ heading, text: filler(length, 70 + index) }))} />
      <section className="bu-careers__banner">
        <Media className="bu-careers__bannerart" />
        <h2>Not seeing the right role?</h2>
        <p>Write to us anyway! We are always glad to meet great people.</p>
        <a href="#" className="bu-btn bu-btn--navy">
          Send your CV
        </a>
        <a href="#" className="bu-btn bu-btn--ghost bu-careers__more">
          Follow us for news
        </a>
      </section>
      <Prose className="bu-careers__data">
        <h2>What happens to your details?</h2>
        <p>
          Read our applicant privacy notice for <a href="#">region one</a> and <a href="#">region two</a>.
        </p>
      </Prose>
    </MarketingShell>
  );
}
