"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { Collapsible } from "@base-ui/react/collapsible";
import { LogoBar, Mark, Media, useBrand } from "../ui";
import "./auth.css";

/** Neutral provider names; the real third-party providers are not shown. */
const loginProviders = ["Continue with Orbit", "Continue with Forge", "Continue with Relay", "Continue with SAML SSO", "Continue with Passkey"];
const signupProviders = ["Continue with Orbit", "Continue with Forge", "Continue with Relay", "Continue with Pine"];
const moreProviders = ["Continue with Harbor", "Continue with Lumen"];

function Provider({ label }: { label: string }) {
  return (
    <a href="#" className="vc-auth-btn vc-auth-btn--secondary vc-focus">
      <Media tone="logo" className="vc-auth-btn__icon" style={{ width: 20, height: 20 }} />
      <span>{label}</span>
    </a>
  );
}

function MoreOptions() {
  return (
    <Collapsible.Root className="vc-auth-more">
      <Collapsible.Panel className="vc-auth-more__panel">
        {moreProviders.map((label) => (
          <Provider key={label} label={label} />
        ))}
      </Collapsible.Panel>
      <Collapsible.Trigger className="vc-auth-btn vc-auth-btn--ghost vc-focus">
        <span className="vc-auth-more__show">Show other options</span>
        <span className="vc-auth-more__hide">Show fewer options</span>
      </Collapsible.Trigger>
    </Collapsible.Root>
  );
}

function Shell({ children, header, footer, className }: { children: ReactNode; header: ReactNode; footer?: ReactNode; className: string }) {
  return (
    <div className={`vercel-ref vc-auth ${className}`}>
      <header className="vc-auth__header">{header}</header>
      <main id="content" className="vc-auth__main">
        {children}
      </main>
      {footer}
    </div>
  );
}

/** Auth template, log-in variant, built from /login. */
export function LoginScreen() {
  const brand = useBrand();
  const emailId = useId();
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    // Nothing is sent anywhere: the reference stops at the form.
    event.preventDefault();
    setSent(true);
  }

  return (
    <Shell
      className="vc-auth--login"
      header={
        <>
          <a href="#" className="vc-logo vc-focus" aria-label={`${brand} home`} data-compare-mask="">
            <Mark />
          </a>
          <a href="#" className="vc-btn vc-btn--32 vc-btn--secondary vc-auth__switch">
            <span className="vc-btn__label">Sign Up</span>
          </a>
        </>
      }
      footer={
        <footer className="vc-auth__footer">
          <a href="#" className="vc-focus">
            Terms
          </a>
          <a href="#" className="vc-focus">
            Privacy Policy
          </a>
        </footer>
      }
    >
      <div className="vc-auth__column">
        <h1 className="vc-auth__title">Log in to {brand}</h1>
        <form className="vc-auth__form" onSubmit={submit} aria-label="Log in with email">
          <label htmlFor={emailId} className="vc-sr-only">
            Email Address
          </label>
          <input id={emailId} type="email" className="vc-auth-input" placeholder="Email Address" autoComplete="email" inputMode="email" required />
          <button type="submit" className="vc-auth-btn vc-auth-btn--primary">
            Continue with Email
          </button>
        </form>
        {sent ? (
          <p role="status" className="vc-auth__status">
            This reference keeps the form here and sends nothing.
          </p>
        ) : null}
        <hr className="vc-auth__rule" />
        <div className="vc-auth__stack">
          {loginProviders.map((label) => (
            <Provider key={label} label={label} />
          ))}
          <MoreOptions />
        </div>
        <p className="vc-auth__alt">
          Don&apos;t have an account? <a href="#">Sign Up</a>
        </p>
      </div>
    </Shell>
  );
}

type SignupStep = "methods" | "email";

function Terms() {
  return (
    <p className="vc-auth-card__terms">
      By joining, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
    </p>
  );
}

function SignupMethods({ onEmail }: { onEmail: () => void }) {
  return (
    <>
      <div className="vc-auth__stack">
        {signupProviders.map((label) => (
          <Provider key={label} label={label} />
        ))}
        <MoreOptions />
      </div>
      <button type="button" className="vc-auth-card__link vc-focus" onClick={onEmail}>
        Continue with Email →
      </button>
    </>
  );
}

function SignupEmail({ onBack }: { onBack: () => void }) {
  const emailId = useId();
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    // Nothing is sent anywhere: the reference stops at the form.
    event.preventDefault();
    setSent(true);
  }

  return (
    <>
      <form className="vc-auth__form" onSubmit={submit} aria-label="Sign up with email">
        <label htmlFor={emailId} className="vc-sr-only">
          Email Address
        </label>
        {/* The live flow focuses the field when this step opens. */}
        <input id={emailId} type="email" className="vc-auth-input" placeholder="jamie@company.example" autoComplete="email" inputMode="email" required autoFocus />
        <button type="submit" className="vc-auth-btn vc-auth-btn--primary">
          Continue with Email
        </button>
      </form>
      {sent ? (
        <p role="status" className="vc-auth__status">
          This reference keeps the form here and sends nothing.
        </p>
      ) : null}
      <hr className="vc-auth__rule" />
      <button type="button" className="vc-auth-card__link vc-focus" onClick={onBack}>
        ← Other Sign Up options
      </button>
    </>
  );
}

function SignupBody({ step, setStep }: { step: SignupStep; setStep: (step: SignupStep) => void }) {
  switch (step) {
    case "methods":
      return <SignupMethods onEmail={() => setStep("email")} />;
    case "email":
      return <SignupEmail onBack={() => setStep("methods")} />;
  }
  return step satisfies never;
}

/** Auth template, sign-up variant (card with two in-place steps), built from /signup. */
export function SignupScreen() {
  const brand = useBrand();
  const [step, setStep] = useState<SignupStep>("methods");

  return (
    <Shell
      className="vc-auth--signup"
      header={
        <>
          <a href="#" className="vc-auth__wordmark vc-focus" aria-label={`${brand} home`} data-compare-mask="">
            <Mark size={24} />
            <span>{brand}</span>
          </a>
          <a href="#" className="vc-btn vc-btn--32 vc-btn--secondary vc-auth__switch vc-auth__switch--muted">
            <span className="vc-btn__label">Log In</span>
          </a>
        </>
      }
    >
      <section className="vc-auth-card" aria-labelledby="signup-title">
        <h1 className="vc-auth__title vc-auth-card__title" id="signup-title">
          Your first launch is just a sign-up away.
        </h1>
        <SignupBody step={step} setStep={setStep} />
        <Terms />
      </section>
      <div className="vc-auth__proof">
        <LogoBar width={37} height={29} />
        <span>
          <strong>~60 days</strong> to two patent-pending products
        </span>
      </div>
    </Shell>
  );
}
