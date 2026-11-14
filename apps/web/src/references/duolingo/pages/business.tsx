"use client";

import { Art, Btn, LinkRow, Shell, useBrand } from "../chrome";
import { filler, phrase } from "../filler";
import { Faq } from "../parts";
import "./business.css";

const CARDS = [
  { title: "Focused", color: "#1cb0f6", items: [[21, 57], [14, 52]] },
  { title: "Lively", color: "#ff9600", items: [[10, 58], [16, 60]] },
  { title: "Together", color: "#ce82ff", items: [[10, 66], [11, 64]] },
];

const STEPS = [
  { title: "Create a team", body: 74 },
  { title: "Pay online", body: 84 },
  { title: "Open your team dashboard", body: 49 },
  { title: "Share and start", body: 66 },
];

const FAQ = [57, 42, 62, 56, 52, 75, 93, 55, 30, 72, 55, 68, 163, 99, 115, 51, 50];

function Wordmark() {
  const brand = useBrand();
  return (
    <a href="#" className="dl-biz__logo" aria-label={`${brand} for teams home`} data-compare-mask="">
      <strong>{brand}</strong> for teams
    </a>
  );
}

function Split({ title, body, cta = "Begin today", note, flip = false, art = true, className = "" }: {
  title: string;
  body: number;
  cta?: string;
  note?: boolean;
  flip?: boolean;
  art?: boolean;
  className?: string;
}) {
  return (
    <section className={`dl-biz__band ${className}`}>
      <div className={`dl-biz__split ${flip ? "dl-biz__split--flip" : ""}`}>
        <div className="dl-biz__copy">
          <h2 className="dl-biz__h2">{title}</h2>
          <p className="dl-biz__p">{filler(body, title.length)}</p>
          <Btn href="#" className="dl-btn--r16 dl-biz__btn">
            {cta}
          </Btn>
          {note ? (
            <p className="dl-biz__note">
              {filler(40, 3)} <a href="#">this form</a>
            </p>
          ) : null}
        </div>
        {art ? <Art className="dl-biz__art" /> : null}
      </div>
    </section>
  );
}

/** Team sales landing (measured on /business): green hero, card trio, steps, calculator, FAQ. */
export function BusinessScreen() {
  return (
    <Shell className="dl-biz">
      <header className="dl-biz__bar">
        <Wordmark />
      </header>
      <section className="dl-biz__hero">
        <div className="dl-biz__heroin">
          <div className="dl-biz__herocopy">
            <h1 className="dl-biz__h1">fun and focused learning for crews</h1>
            <p className="dl-biz__lead">{filler(89, 12)}</p>
            <Btn href="#" variant="white" className="dl-btn--r16 dl-biz__btn dl-biz__btn--white">
              Begin today
            </Btn>
          </div>
          <Art className="dl-biz__heroart" />
        </div>
        <a href="#plans" className="dl-biz__more">
          Read more
          <svg viewBox="0 0 24 14" aria-hidden="true">
            <path d="M2 2l10 10L22 2" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <span className="dl-biz__wave" aria-hidden="true" />
      </section>

      <section className="dl-biz__band dl-biz__love" id="plans">
        <h2 className="dl-biz__h2 dl-biz__h2--center">practice your people will enjoy with acme plus</h2>
        <p className="dl-biz__p dl-biz__p--center">{filler(119, 4)}</p>
        <Btn href="#" className="dl-btn--r16 dl-biz__btn">
          Begin today
        </Btn>
        <div className="dl-biz__cards">
          {CARDS.map((card, index) => (
            <article key={card.title} className="dl-biz__card">
              <span className="dl-biz__badge" aria-hidden="true" data-compare-mask="" />
              <h3 style={{ color: card.color }}>{card.title}</h3>
              <ul>
                {card.items.map(([head, body], item) => (
                  <li key={item}>
                    <strong>
                      <svg viewBox="0 0 13 9" aria-hidden="true" style={{ color: card.color }}>
                        <path d="M1.5 4.5l3.5 3.5 6.5-6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      {phrase(head ?? 10, index * 4 + item)}
                    </strong>
                    <span>{filler(body ?? 50, index + item * 5)}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="dl-biz__band dl-biz__how">
        <div className="dl-biz__howin">
          <div className="dl-biz__copy">
            <h2 className="dl-biz__h2">how it runs</h2>
            <p className="dl-biz__p">{filler(104, 6)}</p>
            <Btn href="#" className="dl-btn--r16 dl-biz__btn">
              Begin today
            </Btn>
            <p className="dl-biz__note">
              {filler(40, 3)} <a href="#">this form</a>
            </p>
          </div>
          <ol className="dl-biz__steps">
            {STEPS.map((step, index) => (
              <li key={step.title}>
                <span className="dl-biz__num" aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{filler(step.body, index + 9)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="dl-biz__band dl-biz__team">
        <div className="dl-biz__split dl-biz__split--flip dl-biz__split--calc">
          <div className="dl-biz__copy">
            <h2 className="dl-biz__h2">how big is your crew?</h2>
            <p className="dl-biz__p">{filler(73, 2)}</p>
            <Btn href="#" className="dl-btn--r16 dl-biz__btn">
              Begin today
            </Btn>
          </div>
          <form className="dl-biz__calc" onSubmit={(event) => event.preventDefault()}>
            <label className="dl-biz__calcrow">
              <span>Seats</span>
              <input type="range" min={1} max={1000} defaultValue={500} className="dl-biz__range" />
              <output>500 seats</output>
            </label>
            <div className="dl-biz__calcrow">
              <span>Cost per seat</span>
              <output>$60.00 / year</output>
            </div>
            <div className="dl-biz__calcrow">
              <span>Total</span>
              <output>$30,000.00 / year</output>
            </div>
          </form>
        </div>
      </section>

      <Split title="more than 1,000 people?" body={79} cta="Send a request" className="dl-biz__large" />

      <section className="dl-biz__band dl-biz__faqband">
        <h2 className="dl-biz__h2 dl-biz__h2--center">questions teams often ask</h2>
        <Faq lengths={FAQ} className="dl-faq--box" seed={40} />
        <Btn href="#" className="dl-btn--r16 dl-biz__btn">
          Begin today
        </Btn>
      </section>

      <Split title="real progress, made fun for every team" body={112} className="dl-biz__last" />

      <footer className="dl-biz__foot">
        <span className="dl-biz__footwave" aria-hidden="true" />
        <div className="dl-biz__footin">
          <div className="dl-biz__footrow">
            <div className="dl-biz__footleft">
              <Wordmark />
              <LinkRow className="dl-biz__links" />
            </div>
            <div className="dl-biz__footright">
              <p>Get the app on your phone</p>
              <div className="dl-biz__stores">
                {["Phone Shop", "App Market"].map((name) => (
                  <a key={name} href="#" className="dl-btn dl-btn--r16 dl-btn--white dl-biz__store">
                    <span className="dl-biz__storeicon" aria-hidden="true" data-compare-mask="" />
                    <span>
                      <small>Get it from</small>
                      {name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <p className="dl-biz__copyright">Copyright 2026 Acme. All rights reserved.</p>
        </div>
      </footer>
    </Shell>
  );
}
