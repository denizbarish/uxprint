"use client";

import type { ReactNode } from "react";
import { Page } from "../chrome";
import { Btn, Icon, LogoBar, Mark, Media, useBrand } from "../ui";
import "./frame.css";
import "./solution.css";

const stats: [string, string, number][] = [
  ["6× faster", " to build + deploy.", 68],
  ["1 year", " of developer time saved.", 104],
  ["20 days", " saved on daily builds.", 86],
  ["33× more", " production deploys.", 101],
];

function Plus({ at }: { at: "tl" | "br" }) {
  return <span className={`vc-frame__plus vc-frame__plus--${at}`} aria-hidden="true" />;
}

function Label({ children, as: As = "h2" }: { children: ReactNode; as?: "h2" | "h3" }) {
  return (
    <As className="vc-sol-label">
      <Icon name="info" size={16} />
      {children}
    </As>
  );
}

function Arrow({ dark }: { dark?: boolean }) {
  return (
    <span className={`vc-sol-arrow${dark ? " vc-sol-arrow--dark" : ""}`} aria-hidden="true">
      <Icon name="arrow-right" size={16} />
    </span>
  );
}

/** Solution template (framed grid of proof, features and toolkit cells), built from /solutions/platform-engineering. */
export function SolutionScreen() {
  const brand = useBrand();
  const features: [string, string, string, string][] = [
    [
      "Automate away repetition",
      "Cut manual errors",
      " by automating infrastructure setup, release steps and monitoring. Free your teams to focus on building and shipping.",
      "tall",
    ],
    [
      "Shared workflows",
      "Stop building custom staging.",
      " Preview code on live, production-grade environments so your team can deliver expert work faster.",
      "card",
    ],
    [
      "Build speed",
      "Shorten build times,",
      ` and speed up iteration and testing. ${brand}'s build layer makes rapid releases and updates easy.`,
      "table",
    ],
    [
      "Operations support",
      "Remove the weight of a complex setup.",
      " Leave the infrastructure to us. You can trust your app is always up, resilient, and secure.",
      "graph",
    ],
  ];
  const toolkit: [string, string][] = [
    ["Automated scaling", `No more sleepless nights over large traffic spikes. ${brand} lets apps take on changing workloads with ease.`],
    ["Global network", "Serve fast web experiences to users around the world, raising both speed and user engagement."],
    ["Advanced security", "Extend your backend with Private Compute. Keep connections between your services secure and private."],
    ["Global support", `You can rely on ${brand} to be your partner anywhere in the world. We will be with you in minutes if needed.`],
    ["Faster builds", "With a shared build cache, roll a single change out across many apps safely, without breaking older versions."],
    ["Zero downtime", "Stay in sync and say goodbye to broken links. With version locking you can release with full confidence."],
  ];
  const dark: [string, string][] = [
    ["Automated code review.", "With full-context review, anomaly checks, and high quality suggestions, improve output and catch more issues."],
    ["Highly available by default.", `${brand} keeps 99.99% uptime with built in high availability features that need no extra setup or upkeep.`],
    ["Leading traffic attack defense.", "Automatic protection at the network layer, on-call teams that respond to large, spread out attacks, and custom IP block rules to limit access."],
  ];

  return (
    <Page actions="demo">
      <div className="vc-frame vc-sol">
        <Plus at="tl" />
        <section className="vc-frame__row vc-sol-hero" aria-labelledby="sol-title">
          <h1 className="vc-sol-hero__title" id="sol-title">
            Accelerate developer velocity.
          </h1>
          <p className="vc-sol-hero__lead">Give your dev teams room to do their best work, faster, with an automated platform that drives performance and spreads out iteration.</p>
          <div className="vc-sol-hero__actions">
            <Btn size={36} pill variant="primary" icon={<Mark size={14} />}>
              Start Deploying
            </Btn>
            <Btn size={36} pill>
              Get a Demo
            </Btn>
          </div>
        </section>

        <section className="vc-frame__row vc-sol-stats" aria-labelledby="sol-stats">
          <h2 className="vc-sol-stats__title" id="sol-stats">
            Enabling fast teams.
          </h2>
          <ul className="vc-sol-stats__grid">
            {stats.map(([strong, rest, w]) => (
              <li key={strong} className="vc-sol-stat">
                <p>
                  <b>{strong}</b>
                  {rest}
                </p>
                <LogoBar width={w} height={24} />
              </li>
            ))}
          </ul>
        </section>

        {[0, 2].map((start) => (
          <div key={start} className={`vc-frame__row vc-sol-features vc-sol-features--${start === 0 ? "a" : "b"}`}>
            {features.slice(start, start + 2).map(([label, strong, rest, visual]) => (
              <section key={label} className="vc-sol-feature">
                <Label>{label}</Label>
                <p className="vc-sol-feature__text">
                  <strong>{strong}</strong>
                  {rest}
                </p>
                <Media tone={visual === "card" || visual === "table" ? "panel" : "line"} className={`vc-sol-feature__visual vc-sol-feature__visual--${visual}`} />
              </section>
            ))}
          </div>
        ))}

        <div className="vc-frame__row vc-sol-toolkit">
          <a href="#" className="vc-sol-quote vc-focus">
            <span className="vc-sol-quote__mark" aria-hidden="true">
              &ldquo;
            </span>
            <p>
              Northwind <b>serves 6M+ monthly views</b> and <b>80% faster docs</b> with {brand}.
            </p>
            <span className="vc-sol-quote__mark" aria-hidden="true">
              &rdquo;
            </span>
            <LogoBar width={93} height={25} className="vc-sol-quote__logo" />
            <Arrow />
          </a>
          <h2 className="vc-sol-toolkit__title">Your platform engineering toolkit.</h2>
          <ul className="vc-sol-toolkit__grid">
            {toolkit.map(([label, text]) => (
              <li key={label} className="vc-sol-tool">
                <Label as="h3">{label}</Label>
                <p>{text}</p>
                <a href="#" className="vc-sol-tool__link vc-focus" aria-label={`Learn more: ${label}`}>
                  <Arrow />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <section className="vc-sol-dark" aria-labelledby="sol-dark">
          <h2 className="vc-sol-dark__title" id="sol-dark">
            Leave downtime at the door.
          </h2>
          <ul className="vc-sol-dark__grid">
            {dark.map(([title, text]) => (
              <li key={title}>
                <a href="#" className="vc-sol-dark__cell vc-focus">
                  <p className="vc-sol-dark__head">{title}</p>
                  <p className="vc-sol-dark__text">{text}</p>
                  <Arrow dark />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="vc-sol-proof" aria-labelledby="sol-proof">
          <h2 className="vc-sol-proof__title" id="sol-proof">
            Empowering developer velocity.
          </h2>
          <ul className="vc-sol-proof__grid">
            {[86, 86, 68, 143, 101, 86].map((w, i) => (
              <li key={i} className="vc-frame__row">
                <a href="#" className="vc-sol-proof__cell vc-focus" aria-label={`Customer story ${i + 1}`}>
                  <LogoBar width={w} height={23} />
                </a>
              </li>
            ))}
          </ul>
          <div className="vc-frame__row vc-sol-proof__gap" />
        </section>

        <section className="vc-sol-cta" aria-label="Get started">
          <div className="vc-sol-cta__main">
            <p className="vc-sol-cta__text">
              <b>Ready to deploy?</b> Start building with a free account. Speak to an expert for your <i>Pro</i> or <u>Enterprise</u> needs.
            </p>
            <div className="vc-sol-hero__actions vc-sol-cta__actions">
              <Btn size={36} pill variant="primary">
                Start Deploying
              </Btn>
              <Btn size={36} pill>
                Talk to an Expert
              </Btn>
            </div>
          </div>
          <div className="vc-sol-cta__side">
            <p className="vc-small">
              <b>Explore {brand} Enterprise</b> with an interactive product tour, trial, or a personalized demo.
            </p>
            <Btn size={36} pill>
              Explore Enterprise
            </Btn>
          </div>
        </section>
        <Plus at="br" />
      </div>
    </Page>
  );
}
