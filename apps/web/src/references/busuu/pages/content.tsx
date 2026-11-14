"use client";

import { MarketingShell } from "../chrome";
import { filler } from "../filler";
import { BlueCard, Hero, Media, Prose } from "../parts";
import "./content.css";

/** Paragraph of neutral copy at the original's character count (line count follows). */
function P({ n, seed }: { n: number; seed: number }) {
  return <p>{filler(n, seed)}</p>;
}

const POINTS: [string, number][] = [
  ["Grow as a person:", 172],
  ["Meet people worldwide:", 172],
  ["Open new doors:", 150],
  ["Study on your terms:", 120],
];

export function ContentScreen() {
  return (
    <MarketingShell className="bu-content">
      <Hero title="About Acme" subtitle="Helping people connect through words" />
      <Prose>
        <P n={197} seed={1} />
        <P n={150} seed={2} />
        <P n={84} seed={3} />
        <h2>How the method works</h2>
        <h3>Language study that fits neatly into your week</h3>
        <P n={342} seed={4} />
        <Media className="bu-prose__img" />
        <h3>Build confidence for conversations that matter</h3>
        <P n={275} seed={5} />
        <Media className="bu-prose__img" />
        <h3>Earn official certificates</h3>
        <P n={381} seed={6} />
        <Media className="bu-prose__img" />
        <h3>Acme for companies</h3>
        <P n={350} seed={7} />
        <BlueCard className="bu-content__story">
          <h2>Our journey</h2>
          <P n={285} seed={8} />
          <P n={352} seed={9} />
          <P n={161} seed={10} />
          <P n={202} seed={11} />
          <P n={72} seed={12} />
        </BlueCard>
      </Prose>
      <Prose>
        <h2>Start studying with Acme today.</h2>
        <ul className="bu-content__points">
          {POINTS.map(([lead, length], index) => (
            <li key={lead}>
              <strong>{lead}</strong> {filler(length, index + 20)}
            </li>
          ))}
        </ul>
        <div className="bu-prose__cta">
          <a href="#" className="bu-btn bu-btn--mint bu-btn--lg">
            Join us now
          </a>
        </div>
        <BlueCard className="bu-content__cta">
          <h2>Searching for language training for your team that shows clear results?</h2>
          <Media className="bu-content__ctaimg" onBlue />
          <P n={152} seed={13} />
          <a href="#" className="bu-btn bu-btn--mint">
            Explore Acme for companies
          </a>
        </BlueCard>
      </Prose>
    </MarketingShell>
  );
}
