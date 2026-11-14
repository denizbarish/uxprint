"use client";

import { useId, useState, type FormEvent } from "react";
import { AppShell } from "../chrome";
import "./auth.css";

const SOCIALS = [
  { label: "Continue with a search account", icon: "g" },
  { label: "Continue with a phone maker", icon: "a" },
  { label: "Continue with a social network", icon: "f" },
];

/** Neutral round mark in place of the provider logos. */
function SocialIcon({ kind }: { kind: string }) {
  return <span className={`bu-auth__icon bu-auth__icon--${kind}`} data-compare-mask="" aria-hidden="true" />;
}

export function AuthScreen() {
  const [usePhone, setUsePhone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const id = useId();
  const stop = (event: FormEvent) => event.preventDefault();
  return (
    <AppShell links={false}>
      <div className="bu-auth">
        <section className="bu-auth__card" aria-labelledby={`${id}-title`}>
          <div className="bu-auth__inner">
            <h1 id={`${id}-title`}>Log in</h1>
            <p className="bu-auth__switch">
              No account yet?{" "}
              <a href="#" className="bu-auth__link">
                Sign up
              </a>
            </p>
            <form className="bu-auth__form" onSubmit={stop} noValidate>
              <div className="bu-auth__socials">
                {SOCIALS.map((social) => (
                  <button type="button" className="bu-auth__social" key={social.icon}>
                    <SocialIcon kind={social.icon} />
                    <span>{social.label}</span>
                  </button>
                ))}
              </div>
              <p className="bu-auth__or">
                <span>Or</span>
              </p>
              <div className="bu-auth__field">
                {usePhone ? (
                  <>
                    <label htmlFor={`${id}-phone`}>Mobile number</label>
                    <input id={`${id}-phone`} type="tel" inputMode="tel" autoComplete="tel" />
                  </>
                ) : (
                  <>
                    <label htmlFor={`${id}-email`}>Email</label>
                    <input id={`${id}-email`} type="email" inputMode="email" autoComplete="email" />
                  </>
                )}
              </div>
              <button type="button" className="bu-auth__link bu-auth__swap" onClick={() => setUsePhone((value) => !value)}>
                {usePhone ? "Use your email instead" : "Use your mobile number"}
              </button>
              <div className="bu-auth__field bu-auth__field--password">
                <label htmlFor={`${id}-password`}>Password</label>
                <div className="bu-auth__pass">
                  <input id={`${id}-password`} type={showPassword ? "text" : "password"} autoComplete="current-password" />
                  <button
                    type="button"
                    className="bu-auth__eye"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword((value) => !value)}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12z" fill="none" stroke="currentColor" strokeWidth="1.6" />
                      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </button>
                </div>
              </div>
              <button type="button" className="bu-auth__link bu-auth__forgot">
                Forgot your password?
              </button>
              <button type="submit" className="bu-auth__submit">
                Log in
              </button>
            </form>
          </div>
          <div className="bu-auth__sso">
            <p>Sign in through your workplace instead?</p>
            <button type="button" className="bu-auth__link">
              Log in with SSO
            </button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
