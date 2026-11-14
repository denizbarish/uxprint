"use client";

import { Art, Btn, CourseStrip, GreenFooter, Shell, TopBar } from "../chrome";
import { filler } from "../filler";
import "./home.css";

/** Hero: illustration left, centred headline and two stacked 330px buttons right (measured on /). */
export function Hero({ title }: { title: string }) {
  return (
    <div className="dl-hero">
      <Art className="dl-hero__art" />
      <div className="dl-hero__copy">
        <h1 className="dl-hero__title">{title}</h1>
        <div className="dl-hero__actions">
          <Btn href="#">Begin today</Btn>
          <Btn variant="outline">Sign in to my profile</Btn>
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  { title: "short. light. lasting.", body: 156, link: true },
  { title: "rooted in research", body: 176 },
  { title: "keep the habit", body: 150 },
  { title: "lessons that adapt to you", body: 124, wide: true },
];

/** Four alternating rows: 473px copy column, 101px gap, 530px illustration. */
export function FeatureRows() {
  return (
    <section className="dl-rows">
      {FEATURES.map((feature, index) => (
        <section key={feature.title} className={`dl-row ${index % 2 ? "dl-row--flip" : ""} ${feature.wide ? "dl-row--wide" : ""}`}>
          <div className="dl-row__copy">
            <h2 className="dl-row__title">{feature.title}</h2>
            <p className="dl-row__body">
              {feature.link ? (
                <>
                  {filler(50, index + 2)} <a href="#">our studies show it pays off</a> {filler(86, index + 5)}
                </>
              ) : (
                filler(feature.body, index * 3 + 1)
              )}
            </p>
          </div>
          <Art className="dl-row__art" />
        </section>
      ))}
    </section>
  );
}

/** Closing call to action over the illustrated hill that runs into the green footer. */
export function FinalCta({ title }: { title: string }) {
  return (
    <section className="dl-final">
      <div className="dl-final__copy">
        <h2 className="dl-final__title">{title}</h2>
        <Btn href="#" className="dl-final__btn">
          Begin today
        </Btn>
      </div>
      <div className="dl-final__scene">
        <Art className="dl-final__art" />
        <span className="dl-final__ground" aria-hidden="true" />
      </div>
    </section>
  );
}

function StoreButtons() {
  return (
    <div className="dl-stores">
      <Btn href="#" variant="outline" className="dl-store">
        <span className="dl-store__icon" aria-hidden="true" data-compare-mask="" />
        <span className="dl-store__text">
          <small>Get it from the</small>
          Phone Shop
        </span>
      </Btn>
      <Btn href="#" variant="outline" className="dl-store dl-store--b">
        <span className="dl-store__icon" aria-hidden="true" data-compare-mask="" />
        <span className="dl-store__text">
          <small>Find it on</small>
          App Market
        </span>
      </Btn>
    </div>
  );
}

export function HomeScreen() {
  return (
    <Shell>
      <header className="dl-head">
        <TopBar cta />
        <Hero title="The friendliest way to learn crafts, music, and more!" />
        <CourseStrip />
      </header>
      <main>
        <FeatureRows />
        <section className="dl-apps">
          <div className="dl-apps__copy">
            <h2 className="dl-apps__title">study on any device you own</h2>
            <StoreButtons />
          </div>
          <Art className="dl-apps__art" />
        </section>
        <section className="dl-plus">
          <Art className="dl-plus__art" dark />
          <div className="dl-plus__copy">
            <span className="dl-plus__wordmark" aria-hidden="true" data-compare-mask="" />
            <Btn variant="white">Try a week free</Btn>
          </div>
        </section>
        <section className="dl-rows dl-rows--single">
          <section className="dl-row">
            <div className="dl-row__copy">
              <h2 className="dl-row__title">the skills certificate</h2>
              <p className="dl-row__body">{filler(188, 9)}</p>
              <Btn href="#" variant="outline" className="dl-row__btn">
                Earn a certificate
              </Btn>
            </div>
            <Art className="dl-row__art" />
          </section>
        </section>
        <FinalCta title="pick up a new skill with us" />
      </main>
      <GreenFooter />
    </Shell>
  );
}
