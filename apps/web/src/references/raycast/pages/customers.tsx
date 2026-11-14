"use client";

import { ArrowRight, Shell, useBrand } from "../chrome";
import "./customers.css";

/** Card grid template (measured on /customers; /community-stories uses the same card grid). */
export function CustomersScreen() {
  const brand = useBrand();
  const stories = [
    `How Northwind Uses ${brand} to Scale Developer Productivity`,
    `How Globex responds to incidents faster with ${brand}`,
    `How Initech Keeps Marketing and Support On-Brand with ${brand}`,
  ];
  return (
    <Shell>
      <div className="rc-cu">
        <h1 className="rc-cu__title">Customers</h1>
        <p className="rc-cu__lead">
          Discover how teams and companies around the world use {brand} to streamline their workflows and get more done.
        </p>
        <ul className="rc-cu__grid">
          {stories.map((title) => (
            <li key={title}>
              <a href="#" className="rc-cu__card">
                <span className="rc-cu__logo" data-compare-mask="" aria-hidden="true" />
                <h3>{title}</h3>
                <span className="rc-cu__more">
                  Read story <ArrowRight />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <a href="#" className="rc-cu__contact">
          Want to onboard your team? <strong>Contact us</strong> <ArrowRight />
        </a>
      </div>
    </Shell>
  );
}
