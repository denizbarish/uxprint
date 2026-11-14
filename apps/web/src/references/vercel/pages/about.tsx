"use client";

import { Page } from "../chrome";
import { Btn, Icon, LogoBar, Media } from "../ui";
import "./about.css";

const pillars = [
  { label: "For build agents", text: "Agents do their best work on a platform shaped around how they work" },
  { label: "To run agents", text: "Releasing an agent should be as easy as releasing a site" },
  { label: "Tuned by agents", text: "A platform should get better by itself, learning from all it runs" },
];

const funds: [number, number][] = [
  [85, 27], [138, 18], [39, 39], [102, 24], [55, 35], [46, 37], [74, 30], [39, 39],
  [148, 17], [126, 20], [39, 40], [51, 36], [120, 22], [90, 24], [70, 30], [110, 20],
];

const people = [
  ["Ada Moreno", "Former CEO of a code host"],
  ["Ben Ortiz", "Creator of a UI library"],
  ["Cleo Park", "Founder of a funding site"],
  ["Dev Rana", "Founder and product lead"],
  ["Eli Novak", "Former partner at a fund"],
  ["Faye Lund", "Error tracker co-founder"],
  ["Gus Reyes", "CEO of a site builder"],
  ["Hana Ito", "Early design at two startups"],
  ["Ivo Brandt", "Founder and CTO of a login tool"],
  ["Jon Vale", "Former SVP at a reviews site"],
  ["Kai Moss", "Former founder, early engineer at two social apps"],
  ["Lena Roth", "CEO of a browser company, author of a language"],
  ["Milo Grant", "Founder and CEO of a creator shop"],
  ["Nia Holt", "Early design at two music and design apps"],
  ["Oto Silva", "Early design at a payments company"],
  ["Pia Chen", "Founder and chair of a data company"],
  ["Rui Sato", "Founder and CEO of a tracker, early design at two marketplaces"],
];

/** About template, built from /about. */
export function AboutScreen() {
  return (
    <Page>
      <section className="vc-about-hero" aria-labelledby="about-title">
        <h1 className="vc-display" id="about-title">
          Acme lets the world{" "}
          <br />
          release what comes next
        </h1>
        <div className="vc-about-hero__side">
          <p className="vc-lead">Acme is agent ready infrastructure for every app and agent. We are the platform where people and agents build software side by side.</p>
          <Btn size={40} pill variant="primary" icon={<Icon name="arrow-right" />}>
            See open roles
          </Btn>
        </div>
      </section>
      <div className="vc-about-pillars">
        {pillars.map((pillar) => (
          <div key={pillar.label}>
            <p className="vc-about-pillars__label">
              <Icon name="chevron-right" />
              {pillar.label}
            </p>
            <p className="vc-about-pillars__text">{pillar.text}</p>
          </div>
        ))}
      </div>
      <section className="vc-about-block" aria-labelledby="funds-title">
        <h2 className="vc-h56" id="funds-title">
          Funded by great investors
        </h2>
        <ul className="vc-about-grid vc-about-grid--funds">
          {funds.map(([w, h], index) => (
            <li key={index}>
              <a href="#" className="vc-about-cell vc-focus" aria-label={`Investor ${index + 1}`}>
                <LogoBar width={w} height={h} />
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section className="vc-about-block vc-about-block--people" aria-labelledby="people-title">
        <h2 className="vc-h56" id="people-title">
          Angel investors
        </h2>
        <ul className="vc-about-grid vc-about-grid--people">
          {people.map(([name, role], index) => (
            <li key={name} className={index >= 9 ? "vc-about-tall" : undefined}>
              <a href="#" className="vc-about-cell vc-about-person vc-focus">
                <Media tone="avatar" className="vc-about-person__photo" />
                <span className="vc-about-person__name">{name}</span>
                <span className="vc-about-person__role">{role}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section className="vc-about-cta" aria-labelledby="about-cta">
        <h2 className="vc-h56" id="about-cta">
          Join us and build the next web
        </h2>
        <Btn size={36} pill variant="primary" icon={<Icon name="arrow-right" size={14} />}>
          See open roles
        </Btn>
      </section>
    </Page>
  );
}
