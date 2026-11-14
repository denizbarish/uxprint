"use client";

import { useState } from "react";
import { HdsPage, Media, Arrow } from "../chrome";
import { useBrand, withBrand } from "../brand";
import { Chevron, ChevronLeft, Plus } from "../icons";

const bento = [
  { title: "Accept and grow revenue worldwide, online and at the counter", size: "wide" },
  { title: "Support any pricing model", size: "narrow" },
  { title: "Earn through agent-led shopping", size: "third" },
  { title: "Launch a branded card program", size: "third" },
  { title: "Move money across borders with stable tokens", size: "third" },
  { title: "Embed collections in your platform", size: "full" },
] as const;

const stats = [
  { figure: "140+", label: "currencies and payment options supported" },
  { figure: "$2.1T", label: "in payment volume handled in 2025" },
  { figure: "99.995%", label: "historical uptime for core services" },
  { figure: "180M+", label: "active plans run on Acme Plans" },
];

const stories = [
  "A home goods group moves $4 billion in store and web revenue onto Acme.",
  "A grocery app runs same-day delivery payments on Acme.",
  "A national daily upgrades local and global collections with Acme.",
];

const experts = [
  { title: "Expert services.", body: "Get hands-on help from Acme with rollouts, complex integrations, or large migrations.", link: "View services" },
  { title: "Certified partners.", body: "Work with an Acme consulting partner that can integrate and launch Acme products for you.", link: "View partners" },
  { title: "Support plans.", body: "Get ongoing help and around-the-clock support for technical questions with tiered plans.", link: "View plans" },
];

const startupCards = [
  "A design tool grows into a fast-moving favourite with Acme.",
  "A slides app reaches $90M ARR and 60 million users with Acme.",
  "A video lab saves engineering time with no-code tools from Acme.",
  "A database host brings its backend service to 140 countries with Acme.",
];

const platformCols = [
  { title: "Launch sooner.", body: "Start and scale collections with less overhead using embedded components and no-code tools." },
  { title: "Add new revenue lines.", body: "Earn on platform activity, including collections, card interchange, and financing fees." },
  { title: "Control platform risk.", body: "Stay ahead of global rules with tools for compliance, credit risk, fraud and account safety." },
];

const devCards = [
  { title: "No code?", body: "Set up plans, take in-person payments, or share a pay link, all from the Acme Dashboard, no code required.", link: "Explore no-code" },
  { title: "Use a connected platform.", body: "Browse our list of platforms that connect Acme with site-building and commerce tools.", link: "See the list" },
  { title: "Build your own setup.", body: "Use our SDKs, APIs, agent tools, and debugging tools to build and maintain your own Acme integration.", link: "Get started" },
];

export function HomeScreen() {
  const brand = useBrand();
  const b = (text: string) => withBrand(text, brand);
  const [stat, setStat] = useState(0);

  return (
    <HdsPage announcement>
      <section className="h-hero">
        <Media className="h-hero__ribbon" tone="warm" />
        <div className="s-frame h-hero__frame">
          <div className="h-hero__copy">
            <p className="h-hero__label">
              <strong>Global trade running on {brand}:</strong> <span>1.76318264%</span>
            </p>
            <h1 className="h-hero__title">
              Financial tools that grow your revenue.
              <br className="h-br" />
              <span>
                Take payments, run business accounts,<sup>1</sup> and
                <br className="h-br" />
                launch custom revenue models, from your
                <br className="h-br" />
                first sale to your ten-millionth.
              </span>
            </h1>
            <div className="h-hero__actions">
              <a href="#" className="s-btn s-btn--primary">
                Get started
                <Chevron />
              </a>
              <a href="#" className="s-btn s-btn--secondary h-hero__google">
                <span className="h-hero__gmark" data-compare-mask="" />
                Sign up with Google
              </a>
            </div>
          </div>
          <div className="h-logos" aria-label="Customer logos">
            {Array.from({ length: 9 }, (_, index) => (
              <Media key={index} className="h-logos__item" tone="plain" />
            ))}
          </div>
        </div>
      </section>

      <section className="h-solutions">
        <div className="s-frame h-solutions__frame">
          <h2 className="s-title h-intro">
            Flexible tools for every business model. <span>Grow with a full set of payment and financial products, designed to work on their own or together.</span>
          </h2>
          <div className="h-bento">
            {bento.map((card) => (
              <button key={card.title} type="button" className={`h-bento__card h-bento__card--${card.size}`}>
                <span className="s-card-title h-bento__title">{card.title}</span>
                <span className="s-icon-btn h-bento__expand" aria-hidden="true">
                  <Plus />
                </span>
                <Media className="h-bento__media" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="h-event">
        <div className="s-frame h-event__frame">
          <div className="h-event__card">
            <Media className="h-event__media" tone="dark" />
            <h2 className="h-event__title">Building the economic tools for agents</h2>
            <a href="#" className="s-btn s-btn--onmedia h-event__cta">
              Watch now
              <Chevron />
            </a>
          </div>
        </div>
      </section>

      <section className="h-stats">
        <div className="s-frame h-stats__frame">
          <h2 className="h-stats__title">
            The backbone
            <br />
            of online trade
          </h2>
          <div className="h-stats__row" role="tablist" aria-label="Figures">
            {stats.map((item, index) => (
              <button
                key={item.figure}
                type="button"
                role="tab"
                aria-selected={stat === index}
                className="h-stats__item"
                onClick={() => setStat(index)}
              >
                <span className="h-stats__figure">{item.figure}</span>
                <span className="h-stats__label">{b(item.label)}</span>
              </button>
            ))}
          </div>
          <Media className="h-stats__burst" tone="cool" />
        </div>
      </section>

      <section className="h-scale">
        <div className="s-frame h-scale__frame">
          <h2 className="s-title h-intro h-intro--narrow">
            Serving companies of every size. <span>Run your business on a dependable platform that adapts to your needs.</span>
          </h2>
          <div className="h-rule" />
          <div className="h-split">
            <div>
              <h3 className="s-card-title h-split__title">Modernize your enterprise with flexible financial tools</h3>
              <a href="#" className="s-btn s-btn--primary">
                {b("Acme for enterprises")}
                <Chevron />
              </a>
            </div>
            <p className="s-lead">{b("Half of the largest public companies have used Acme to grow, from opening new markets to rethinking the customer experience across every channel.")}</p>
          </div>
          <div className="h-story">
            <div className="h-story__head">
              <span className="h-story__logo" data-compare-mask="" />
              <h3 className="s-row-title">{b("Rental group unifies commerce.")}</h3>
              <a href="#" className="s-btn s-btn--secondary s-btn--sm h-story__read">
                Read the story
                <Chevron />
              </a>
            </div>
            <Media className="h-story__media" tone="cool" />
            <p className="h-story__facts">
              <span>
                <strong>150 countries</strong>
              </span>
              <span>
                <strong>10K+</strong> sites worldwide
              </span>
              <span>
                <strong>Products used</strong> Collections, Counter, Platform Kit, Shield, and Queries
              </span>
            </p>
            {stories.map((story) => (
              <div key={story} className="h-story__row">
                <span className="h-story__logo" data-compare-mask="" />
                <h3 className="s-row-title">{b(story)}</h3>
                <a href="#" className="s-icon-btn h-story__plus" aria-label="Read the story">
                  <Plus />
                </a>
                {/* At 390 every story is shown expanded, as on the original. */}
                <div className="h-story__more">
                  <Media className="h-story__media" tone="cool" />
                  <p className="h-story__facts">
                    <span>
                      <strong>40+</strong> markets
                    </span>
                    <span>
                      <strong>2K+</strong> locations
                    </span>
                    <span>
                      <strong>Products used</strong> Collections, Counter, and Platform Kit
                    </span>
                  </p>
                  <a href="#" className="s-btn s-btn--secondary s-btn--sm h-story__read">
                    Read the story
                    <Chevron />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <h3 className="s-card-title h-experts__title">Reach value sooner with dedicated experts</h3>
          <div className="h-cols h-experts">
            {experts.map((item) => (
              <div key={item.title} className="h-cols__item">
                <span className="h-cols__icon" aria-hidden="true" />
                <p className="s-lead">
                  <strong>{item.title}</strong> {b(item.body)}
                </p>
                <Arrow>{item.link}</Arrow>
              </div>
            ))}
          </div>
          <Media className="h-divider" tone="cool" />
          <div className="h-split h-split--startups">
            <div>
              <h3 className="s-card-title h-split__title">Build a base for your startup that supports faster growth</h3>
              <a href="#" className="s-btn s-btn--primary">
                {b("Acme for startups")}
                <Chevron />
              </a>
            </div>
            <p className="s-lead">{b("From token pioneers to most of the fastest-growing AI companies, Acme helps startups build what comes next on easy-to-adopt financial tools.")}</p>
          </div>
          <div className="h-carousel__nav">
            <button type="button" className="s-icon-btn" aria-label="Previous customer story" disabled>
              <ChevronLeft />
            </button>
            <button type="button" className="s-icon-btn" aria-label="Next customer story">
              <Chevron />
            </button>
          </div>
          <div className="h-cards">
            {startupCards.map((card) => (
              <a key={card} href="#" className="h-cards__item">
                <Media className="h-cards__media" tone="dark" />
                <span className="h-cards__title">{b(card)}</span>
                <span className="s-link">
                  Read the story
                  <Chevron />
                </span>
              </a>
            ))}
          </div>
          <div className="h-promos">
            <a href="#" className="h-promo">
              <p className="s-lead">
                <strong>{b("Acme Ventures program.")}</strong> Get financial perks, a focused community, and expert resources to help your business grow.
              </p>
              <span className="s-link">
                Apply now
                <Chevron />
              </span>
              <Media className="h-promo__media" tone="warm" />
            </a>
            <a href="#" className="h-promo">
              <p className="s-lead">
                <strong>{b("Acme Launchpad.")}</strong> Form a company and get everything you need to raise, bank, and take payments in two days.
              </p>
              <span className="s-link">
                Start your company
                <Chevron />
              </span>
              <Media className="h-promo__media" tone="warm" />
            </a>
          </div>
          <Media className="h-divider h-divider--second" tone="cool" />
          <div className="h-split h-split--platforms">
            <div>
              <h3 className="s-card-title h-split__title">Make your software platform a complete financial operating system</h3>
              <a href="#" className="s-btn s-btn--primary">
                {b("Acme for platforms")}
                <Chevron />
              </a>
            </div>
            <p className="s-lead">From the largest public companies to leading cloud vendors, vertical software platforms use Acme to grow their offering with embedded payments and finance.</p>
          </div>
          <Media className="h-wide-media" tone="warm" />
          <div className="h-cols h-platform-cols">
            {platformCols.map((item) => (
              <div key={item.title} className="h-cols__item">
                <span className="h-cols__icon" aria-hidden="true" />
                <p className="s-lead">
                  <strong>{item.title}</strong> {item.body}
                </p>
                <Arrow>Read the guide</Arrow>
              </div>
            ))}
          </div>
          <figure className="h-quote">
            <span className="h-quote__avatar" data-compare-mask="" />
            <blockquote className="h-quote__text">
              {b("“With Acme, we have a global technology partner that helps our customers, from local dance studios to regional fitness chains, keep growing and change with the times.”")}
            </blockquote>
            <figcaption className="h-quote__name">
              <strong>Jordan Reyes,</strong> Lead Product Manager, Payments
            </figcaption>
            <Arrow className="h-quote__link">Read the story</Arrow>
          </figure>
          <div className="h-quote__logos">
            {Array.from({ length: 4 }, (_, index) => (
              <button key={index} type="button" className="h-quote__logo" aria-label={`Show testimonial ${index + 1}`}>
                <Media className="h-quote__logo-media" tone="plain" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="h-dev s-dark">
        <div className="s-frame h-dev__frame">
          <h2 className="s-title h-dev__title">
            Dependable, extensible tools for every stack. <span>Adapt Acme to your needs with flexible integration options.</span>
          </h2>
          <div className="h-dev__actions">
            <a href="#" className="s-btn s-btn--primary">
              View developer docs
              <Chevron />
            </a>
            <a href="#" className="s-btn s-btn--ghost-dark">
              {b("View Acme on GitHub")}
            </a>
          </div>
          <div className="h-dev__rule" />
          <h3 className="s-card-title h-dev__h3">
            Connect to current systems. <span>Route payments across several processors, build custom workflows, and connect to third parties through APIs, partner apps, or prebuilt integrations.</span>
          </h3>
          <Media className="h-dev__diagram" tone="dark" />
          <Media className="h-divider h-divider--dark" tone="cool" />
          <h3 className="s-card-title h-dev__h3 h-dev__h3--scale">
            Scale with confidence. <span>Handle thousands of transactions per second with steady speed and reliability, even at peak traffic.</span>
          </h3>
          <Media className="h-dev__globe" tone="dark" />
          <div className="h-dev__stats">
            <p>
              <strong>400M+</strong>
              <span>API requests per day</span>
            </p>
            <p>
              <strong>12K+</strong>
              <span>API requests per second</span>
            </p>
            <p>
              <strong>130K+</strong>
              <span>transactions per minute</span>
            </p>
          </div>
          <Media className="h-divider h-divider--dark h-divider--third" tone="cool" />
          <h3 className="s-card-title h-dev__h3 h-dev__h3--paths">
            Pick an integration path. <span>With agent-assisted help, deep documentation, and built-in debugging tools, you can start quickly with the best option for your business.</span>
          </h3>
          <div className="h-cols h-dev__cards">
            {devCards.map((card) => (
              <div key={card.title} className="h-cols__item">
                <Media className="h-dev__card-media" tone="dark" />
                <p className="s-lead">
                  <strong>{card.title}</strong> {b(card.body)}
                </p>
                <Arrow>{card.link}</Arrow>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="h-news">
        <div className="s-frame h-news__frame">
          <div className="h-news__head">
            <h2 className="s-title">
              What is new
              <br />
              <span>{b("See the latest from Acme.")}</span>
            </h2>
            <div className="h-carousel__nav h-carousel__nav--static">
              <button type="button" className="s-icon-btn" aria-label="Previous slide">
                <ChevronLeft />
              </button>
              <button type="button" className="s-icon-btn" aria-label="Next slide">
                <Chevron />
              </button>
            </div>
          </div>
          <div className="h-news__track">
            <Media className="h-news__lead" tone="cool" />
            <Media className="h-news__side" tone="dark" />
            <Media className="h-news__side" tone="dark" />
            <Media className="h-news__side" tone="dark" />
          </div>
          <div className="h-letter">
            <h3 className="s-row-title">{b("Businesses on Acme generated $2.1T in 2025.")}</h3>
            <a href="#" className="s-btn s-btn--secondary">
              Read the letter
              <Chevron />
            </a>
          </div>
          <Media className="h-divider h-divider--news" tone="cool" />
          <h3 className="s-title h-book__title">
            Book of the week
            <br />
            <span>New companies begin with ideas.</span>
          </h3>
          <div className="h-book">
            <div className="h-book__cover">
              <Media className="h-book__media" tone="warm" />
            </div>
            <div className="h-book__copy">
              <h4 className="s-card-title">
                On Craft and Being Useful
                <br />
                <span>A. Writer</span>
              </h4>
              <p className="s-lead">A short essay on why careful work matters, and how the things we make shape the people who use them.</p>
              <Arrow>Read the book</Arrow>
            </div>
          </div>
        </div>
      </section>

      <section className="h-cta">
        <div className="s-frame h-cta__frame">
          <h2 className="s-title h-intro">
            Ready to get started? <span>Create an account and start taking payments today, or contact us to design a custom package.</span>
          </h2>
          <div className="h-hero__actions">
            <a href="#" className="s-btn s-btn--primary">
              Get started
              <Chevron />
            </a>
            <a href="#" className="s-btn s-btn--secondary">
              Contact sales
              <Chevron />
            </a>
          </div>
        </div>
      </section>
    </HdsPage>
  );
}
