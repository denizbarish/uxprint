"use client";

import { Fragment, useState } from "react";
import { Switch } from "@base-ui/react/switch";
import { Arrow, Cta, Media, SitePage } from "../chrome";
import "./pricing.css";

/* Pricing template: four ruled plan columns, logo strip, full comparison table, closing call to action. */

type Plan = {
  name: string;
  price: string;
  period?: string;
  billing?: string;
  items: string[];
  actions: { label: string; primary?: boolean }[];
};

const plans: Plan[] = [
  { name: "Free", price: "$0", billing: "Free for everyone", items: ["Unlimited members", "2 teams", "250 issues", "Helper platform", "Acme helper", "Loops"], actions: [{ label: "Get started" }] },
  { name: "Basic", price: "$10", period: "per user/month", items: ["All Free features +", "5 teams", "Unlimited issues", "Unlimited file uploads", "Admin roles"], actions: [{ label: "Get started" }] },
  {
    name: "Business",
    price: "$16",
    period: "per user/month",
    items: ["All Basic features +", "Unlimited teams", "Private teams and guests", "Smart sorting", "Code context", "Acme Insights", "Acme Asks", "Help desk connections"],
    actions: [{ label: "Get started", primary: true }, { label: "Contact sales" }],
  },
  {
    name: "Enterprise",
    price: "Custom",
    billing: "Annual billing only",
    items: ["All Business features +", "Invoice billing", "SAML and SCIM", "Detailed admin controls", "Stronger security", "Advanced org setup", "Move and setup help", "Priority support", "Account management"],
    actions: [{ label: "Contact sales" }],
  },
];

/** Cell value: true included, false not included, text included with a note. */
type Value = boolean | string;
type Row = [label: string, ...values: [Value, Value, Value, Value]];

const overview: Row[] = [
  ["Members", "Unlimited", "Unlimited", "Unlimited", "Unlimited"],
  ["File upload", "10MB", "Unlimited", "Unlimited", "Unlimited"],
  ["Issues", "250 issues", "Unlimited", "Unlimited", "Unlimited"],
  ["Teams", "2 teams", "5 teams", "Unlimited", "Unlimited"],
];

const groups: { title: string; rows: Row[] }[] = [
  {
    title: "Core",
    rows: [
      ["Issues, projects, cycles, goals", true, true, true, true],
      ["Customer requests", true, true, true, true],
      ["API and webhook access", true, true, true, true],
      ["API rate limits", "Standard limits", "Standard limits", "2x standard limits", "5x standard limits"],
      ["Import and export", true, true, true, true],
      ["Sorting inbox", true, true, true, true],
      ["Pulse", true, true, true, true],
      ["Issue sync", true, true, true, true],
      ["Diffs", true, true, true, true],
      ["Guided reviews", false, true, true, true],
      ["Issue SLAs", false, false, true, true],
      ["Sorting owners", false, false, true, true],
      ["Sorting rules", false, false, true, true],
      ["Releases", false, false, "15 pipelines", "Unlimited"],
      ["Sub-goals", false, false, false, true],
    ],
  },
  {
    title: "Helpers and automation",
    rows: [
      ["Helper platform", true, true, true, true],
      ["Connector access", true, true, true, true],
      ["Acme helper", true, true, true, true],
      ["Remote code helper**", true, true, true, true],
      ["Loops**", true, true, true, true],
      ["Code context", false, false, true, true],
      ["Smart sorting", false, false, true, true],
    ],
  },
  {
    title: "Integrations",
    rows: [
      ["Integrations", true, true, true, true],
      ["Team chat integration", true, true, true, "Multiple tenants"],
      ["Help desk integrations", false, false, true, true],
      ["CRM integration", false, false, false, true],
    ],
  },
  {
    title: "Team management",
    rows: [
      ["Sub-teams", false, false, "1 level", "5 levels"],
      ["Private teams", false, false, true, true],
      ["Guest accounts", false, false, true, true],
    ],
  },
  {
    title: "Analytics & Reporting",
    rows: [
      ["Progress reports", true, true, true, true],
      ["Insights", false, false, true, true],
      ["Dashboards", false, false, false, true],
    ],
  },
  {
    title: "Acme Asks",
    rows: [
      ["Chat intake", false, false, true, true],
      ["Email intake", false, false, true, true],
      ["Web forms", false, false, true, true],
      ["Multiple chat workspaces", false, false, false, true],
      ["Private chat channels", false, false, false, true],
      ["Per-channel settings", false, false, false, true],
    ],
  },
  {
    title: "Security",
    rows: [
      ["SSO", "Basic", "Basic", "Basic", "Basic + SAML"],
      ["Admin roles", false, true, true, true],
      ["Third-party app control", false, false, true, true],
      ["Team owners", false, false, true, true],
      ["Advanced sign-in", false, false, false, true],
      ["SCIM provisioning", false, false, false, true],
      ["IP restrictions", false, false, false, true],
      ["Domain claiming", false, false, false, true],
      ["Audit log", false, false, false, true],
      ["HIPAA compliance", false, false, false, true],
    ],
  },
  {
    title: "Support",
    rows: [
      ["Priority support", false, false, false, true],
      ["Account manager", false, false, false, true],
      ["Custom terms", false, false, false, true],
      ["Uptime SLA", false, false, false, true],
    ],
  },
];

function Check() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="#d0d6e0" />
      <path d="M5 8.2 7 10.2 11 6" fill="none" stroke="#08090a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Cross() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path d="M5 5l6 6M11 5l-6 6" stroke="#62666d" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function Cell({ value }: { value: Value }) {
  if (value === false) {
    return (
      <>
        <Cross />
        <span className="lr-visually-hidden">Not included</span>
      </>
    );
  }
  return (
    <>
      <Check />
      {value === true ? <span className="lr-visually-hidden">Included</span> : <span>{value}</span>}
    </>
  );
}

function BillingSwitch() {
  return (
    <label className="lr-pricing-switch">
      <Switch.Root className="lr-pricing-switch__track" defaultChecked>
        <Switch.Thumb className="lr-pricing-switch__thumb" />
      </Switch.Root>
      Billed yearly
    </label>
  );
}

export function PricingScreen() {
  // On phones the table shows one plan at a time, picked here.
  const [phonePlan, setPhonePlan] = useState(2);
  return (
    <SitePage className="lr-pricing" current="Pricing">
      <div className="lr-container lr-pricing-head">
        <h1 className="lr-title-1">Pricing</h1>
      </div>
      <div className="lr-pricing-plans">
        {plans.map((plan) => (
          <section className="lr-pricing-plan" key={plan.name} aria-labelledby={`plan-${plan.name}`}>
            <h3 className="lr-pricing-plan__name" id={`plan-${plan.name}`}>
              {plan.name}
            </h3>
            <p className="lr-pricing-plan__price">
              {plan.price} {plan.period ? <span>{plan.period}</span> : null}
            </p>
            <div className="lr-pricing-plan__billing">{plan.billing ?? <BillingSwitch />}</div>
            <ul className="lr-pricing-plan__list">
              {plan.items.map((item) => (
                <li key={item}>
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
            <div className="lr-pricing-plan__actions">
              {plan.actions.map((action) => (
                <a
                  key={action.label}
                  href="#plans"
                  className={`lr-btn lr-btn--40 ${action.primary ? "lr-btn--primary" : "lr-btn--secondary"}`}
                >
                  {action.label}
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
      <section className="lr-pricing-logos" aria-label="Customers">
        <p className="lr-body">
          Trusted by more than <strong>50,000</strong> companies
        </p>
        <a className="lr-pricing-logos__row" href="#customers" aria-label="Customer stories">
          {Array.from({ length: 7 }, (_, index) => (
            <Media key={index} className="lr-media--bare lr-pricing-logos__item" />
          ))}
        </a>
        <a className="lr-link lr-link--quiet" href="#customers">
          Customer stories <Arrow />
        </a>
      </section>
      <section className="lr-pricing-compare" aria-label="Compare plans">
        <div className="lr-pricing-compare__pick">
          <label htmlFor="phone-plan">Plan</label>
          <select id="phone-plan" value={phonePlan} onChange={(event) => setPhonePlan(Number(event.target.value))}>
            {plans.map((plan, index) => (
              <option key={plan.name} value={index}>
                {plan.name}
              </option>
            ))}
          </select>
        </div>
        <table className="lr-pricing-table" data-plan={phonePlan}>
          <thead>
            <tr>
              <th scope="col">Features</th>
              {plans.map((plan) => (
                <th scope="col" key={plan.name}>
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="lr-pricing-table__spacer" aria-hidden="true">
              <td colSpan={5} />
            </tr>
            {overview.map(([label, ...values]) => (
              <tr key={label}>
                <th scope="row">{label}</th>
                {values.map((value, index) => (
                  <td key={index}>
                    <Cell value={value} />
                  </td>
                ))}
              </tr>
            ))}
            {groups.map((group) => (
              <Fragment key={group.title}>
                <tr className="lr-pricing-table__group">
                  <th scope="colgroup" colSpan={5}>
                    {group.title}
                  </th>
                </tr>
                {group.rows.map(([label, ...values]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {values.map((value, index) => (
                      <td key={index}>
                        <Cell value={value} />
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
            <tr className="lr-pricing-table__actions">
              <td />
              {plans.map((plan, index) => (
                <td key={plan.name}>
                  <a className={`lr-btn lr-btn--40 ${index === 2 ? "lr-btn--primary" : "lr-btn--secondary"}`} href="#plans">
                    {plan.name === "Enterprise" ? "Contact sales" : "Get started"}
                  </a>
                  {index === 2 ? (
                    <span className="lr-pricing-table__or">
                      or <a href="#contact">contact sales</a>
                    </span>
                  ) : null}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <p className="lr-pricing-note">
          ** Uses helper credits. <a href="#docs">View docs</a>
        </p>
      </section>
      <Cta className="lr-pricing-cta" />
    </SitePage>
  );
}
