"use client";

import { useId } from "react";
import { Shell } from "../chrome";
import "./login.css";

/**
 * Public first state of sign-in (measured on /log-in): a full-screen white sheet over the home page
 * with a close button, a sign-up switch, two fields, the primary button and three provider buttons.
 * The form never submits.
 */
export function LoginScreen() {
  const id = useId();
  return (
    <Shell className="dl-login">
      <div className="dl-login__sheet" role="group" aria-labelledby={`${id}-title`}>
        <button type="button" className="dl-login__close" aria-label="Close">
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M2 2l12 12M14 2L2 14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </button>
        <button type="button" className="dl-btn dl-btn--outline dl-btn--r16 dl-login__switch">
          Join
        </button>
        <form className="dl-login__form" onSubmit={(event) => event.preventDefault()}>
          <h1 id={`${id}-title`} className="dl-login__title">
            Sign in
          </h1>
          <div className="dl-login__fields">
            <label className="dl-login__field">
              <span className="dl-sr">Email</span>
              <input type="email" name="email" autoComplete="email" inputMode="email" placeholder="Email" required />
            </label>
            <label className="dl-login__field">
              <span className="dl-sr">Password</span>
              <input type="password" name="password" autoComplete="current-password" placeholder="Password" required />
              <a href="#" className="dl-login__forgot">
                Reset?
              </a>
            </label>
          </div>
          <button type="submit" className="dl-btn dl-btn--blue dl-btn--r16 dl-login__submit">
            Sign in
          </button>
          <div className="dl-login__or">
            <span>or</span>
          </div>
          <div className="dl-login__providers">
            {[
              ["Continue with Provider A", "#4285f4"],
              ["Continue with Provider B", "#3b5998"],
              ["Continue with Provider C", "#4b4b4b"],
            ].map(([label, color]) => (
              <button key={label} type="button" className="dl-btn dl-btn--outline dl-btn--r16 dl-login__provider" style={{ color }}>
                <span className="dl-login__picon" aria-hidden="true" data-compare-mask="" style={{ background: color }} />
                {label}
              </button>
            ))}
          </div>
          <div className="dl-login__legal">
            <p>
              By signing in you accept our <a href="#">Terms</a> and our <a href="#">Privacy Notice</a>.
            </p>
            <p>
              This page uses a bot check, and its own <a href="#">Privacy Notice</a> and <a href="#">Terms of Use</a> apply.
            </p>
          </div>
        </form>
      </div>
    </Shell>
  );
}
