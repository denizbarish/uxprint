"use client";

import { MarketingShell } from "../chrome";
import { filler } from "../filler";
import { BlueCard, DownloadBanner, FeatureCards, Hero, Media, Prose, StatCards, Steps, TrustSlot } from "../parts";
import "./app-landing.css";

export function AppLandingScreen() {
  return (
    <MarketingShell className="bu-applanding">
      <Hero
        title="Choose a new language in the friendly Acme App"
        action={
          <>
            <span className="bu-laurel" aria-hidden="true" />
            <a href="#" className="bu-btn bu-btn--mint bu-btn--lg">
              Get the App
            </a>
            <span className="bu-laurel bu-laurel--right" aria-hidden="true" />
          </>
        }
        trust
      />
      <StatCards
        className="bu-applanding__stats"
        stats={[
          ["110+ million", "People signed up worldwide."],
          ["9 million", "Ratings across the two big phone app stores."],
          ["Rated 4.7 stars", "Across both app stores."],
        ]}
      />
      <Prose className="bu-applanding__media">
        <BlueCard>
          <Media className="bu-applanding__shot" onBlue />
          <p>{filler(162, 3)}</p>
          <p>{filler(72, 4)}</p>
          <a href="#" className="bu-btn bu-btn--mint">
            Begin studying today
          </a>
        </BlueCard>
      </Prose>
      <Prose className="bu-applanding__why">
        <h2>Why pick the Acme app?</h2>
        <p>{filler(86, 5)}</p>
        <p>
          {filler(40, 6)} <strong>Nine in ten of our learners</strong> {filler(120, 7)} <strong>97%</strong> {filler(50, 8)}
        </p>
      </Prose>
      <FeatureCards
        items={[
          ["Genuine study, honest conversations", filler(141, 9)],
          ["Expert lessons, dependable results", filler(143, 10)],
          ["A friendly, worldwide community", filler(146, 11)],
        ]}
      />
      <Steps
        title="How to begin with the Acme app"
        steps={[
          { text: "Pick one of our 14 language courses" },
          { text: "Begin at the very start, or take a short level test to jump to your stage" },
          { text: "And that is all, you are ready to start learning in your new language today" },
        ]}
      />
      <Prose className="bu-applanding__love">
        <h2>Why people enjoy Acme</h2>
      </Prose>
      <TrustSlot className="bu-applanding__trust" />
      <DownloadBanner
        before="Study"
        word="languages"
        after="at home or on the move! Get the app today."
        note="Study on the move wherever you are going next."
      />
    </MarketingShell>
  );
}
