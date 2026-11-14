"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Mark, Shell, useBrand } from "../chrome";
import "./auth.css";

type Mode = "sign-in" | "sign-up";

/** Provider buttons carry neutral glyphs; the original provider marks are not reproduced. */
function Providers() {
  return (
    <div className="rc-auth__providers">
      {["Provider A", "Provider B", "Provider C"].map((label, index) => (
        <button key={label} type="button" className="rc-auth__provider" aria-label={`Continue with ${label}`}>
          <span className={`rc-auth__glyph rc-auth__glyph--${index}`} aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}

function Field({ label, type, autoComplete }: { label: string; type: string; autoComplete: string }) {
  const id = useId();
  return (
    <>
      <label htmlFor={id} className="rc-visually-hidden">
        {label}
      </label>
      <input id={id} className="rc-auth__input" type={type} autoComplete={autoComplete} placeholder={label} />
    </>
  );
}

function Panel({ title, children, footer }: { title: string; children: ReactNode; footer: ReactNode }) {
  return (
    <div className="rc-auth__panel">
      <span className="rc-auth__mark" data-compare-mask="">
        <Mark />
      </span>
      <h1>{title}</h1>
      <Providers />
      <p className="rc-auth__or">or</p>
      <form className="rc-auth__form" onSubmit={(event: FormEvent) => event.preventDefault()}>
        {children}
      </form>
      {footer}
    </div>
  );
}

function SignIn({ onSwitch }: { onSwitch: () => void }) {
  const brand = useBrand();
  return (
    <div className="rc-auth rc-auth--single">
      <Panel
        title={`Log in to ${brand}`}
        footer={
          <button type="button" className="rc-auth__switch" onClick={onSwitch}>
            Don&apos;t have an account? <strong>Sign up</strong> <ArrowRight />
          </button>
        }
      >
        <Field label="Email address" type="email" autoComplete="email" />
        <Field label="Password (optional)" type="password" autoComplete="current-password" />
        <button type="submit" className="rc-auth__submit">
          Send Magic Link
        </button>
      </Panel>
    </div>
  );
}

const SLIDES = [
  ["Develop and publish extensions", "Build extensions for your tools and create your perfect work environment. Publish them to the store for everyone."],
  ["Join and create organizations", "Set up your team and invite members to a shared space with private extensions."],
  ["Share extensions, links and snippets", "Save time on everyday tasks with shared commands, links and snippets."],
];

function SignUp({ onSwitch }: { onSwitch: () => void }) {
  const brand = useBrand();
  const [slide, setSlide] = useState(0);
  const [title, text] = SLIDES[slide] ?? ["", ""];
  return (
    <div className="rc-auth rc-auth--split">
      <section className="rc-auth__intro" aria-label="Highlights">
        <h2>Start building and collaborating</h2>
        <div className="rc-auth__slide">
          <span className="rc-auth__slide-art rc-media" data-compare-mask="" />
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
        <div className="rc-auth__dots" role="tablist" aria-label="Highlights">
          {SLIDES.map(([name], index) => (
            <button key={name} type="button" role="tab" aria-selected={index === slide} aria-label={name} onClick={() => setSlide(index)} />
          ))}
        </div>
      </section>
      <Panel
        title="Create your account"
        footer={
          <button type="button" className="rc-auth__switch" onClick={onSwitch}>
            I already have an account <ArrowRight />
          </button>
        }
      >
        <Field label="Name" type="text" autoComplete="name" />
        <Field label="Username" type="text" autoComplete="username" />
        <Field label="Email address" type="email" autoComplete="email" />
        <Field label="Password (optional)" type="password" autoComplete="new-password" />
        <span className="rc-auth__challenge" data-compare-mask="" aria-hidden="true" />
        <button type="submit" className="rc-auth__submit" disabled>
          Create account
        </button>
        <p className="rc-auth__terms">
          By continuing you agree to {brand}&apos;s <a href="#">Terms of Service</a>
        </p>
      </Panel>
    </div>
  );
}

/** Auth template: /users/sign_in, and /users/sign_up through the switch link. */
export function AuthScreen() {
  const [mode, setMode] = useState<Mode>("sign-in");
  return <Shell>{renderMode(mode, setMode)}</Shell>;
}

function renderMode(mode: Mode, setMode: (mode: Mode) => void): ReactNode {
  switch (mode) {
    case "sign-in":
      return <SignIn onSwitch={() => setMode("sign-up")} />;
    case "sign-up":
      return <SignUp onSwitch={() => setMode("sign-in")} />;
    default:
      return mode satisfies never;
  }
}
