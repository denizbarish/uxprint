"use client";

import { Shell, useBrand } from "../chrome";
import { Check, EnterpriseCard, Faq, PlanCards } from "../parts";
import "./pricing.css";

/** y = included, n = not included, any other string is shown as text. Row height follows the original. */
type Row = { label: string; note?: string; values: string[]; height: number } | { divider: true };

const COLUMNS = ["Free", "Pro", "Teams Free", "Teams Pro", "Enterprise"];

function useRows(brand: string): Row[] {
  return [
    { label: "Core features, including:", note: "Clipboard History, Quicklinks, Calculator, Snippets, Window Management + many more...", values: ["y", "y", "y", "y", "y"], height: 160 },
    { label: "Thousands of extensions", values: ["y", "y", "y", "y", "y"], height: 70 },
    { label: "Custom Extensions", values: ["y", "y", "y", "y", "y"], height: 70 },
    { label: "Developer Tooling", values: ["y", "y", "y", "y", "y"], height: 70 },
    { label: "Clipboard History Size", values: ["3 months", "Unlimited", "3 months", "Unlimited", "Unlimited"], height: 70 },
    { divider: true },
    { label: `${brand} AI, including:`, note: "Quick AI, AI Chat, Agents, AI Commands, AI Extensions, Screen Awareness, Memory, Profile, Presets and more", values: ["y", "y", "y", "y", "y"], height: 227 },
    { label: "AI credits included every month", values: ["n", "Pro 500 / Plus 3,000 / Max 7,500", "n", "Pro 500 / user, Plus 3,000 / user", "Custom"], height: 123 },
    { label: "Fast and capable AI models", values: ["n", "y", "n", "y", "y"], height: 70 },
    { label: "Top-tier AI models", values: ["n", "Pro no / Plus yes / Max yes", "n", "Pro no / Plus yes / Max yes", "y"], height: 123 },
    { label: "Bring Your Own Key", values: ["n", "y", "n", "y", "y"], height: 70 },
    { label: "Cloud Sync", values: ["n", "y", "n", "y", "y"], height: 70 },
    { label: "Dictation", values: ["n", "y", "n", "y", "y"], height: 70 },
    { label: "Custom Themes", values: ["n", "y", "n", "y", "y"], height: 70 },
    { label: "Translator", values: ["n", "y", "n", "y", "y"], height: 70 },
    { label: `${brand} Notes`, values: ["y", "y", "y", "y", "y"], height: 70 },
    { label: "Custom Window Management Commands", values: ["n", "y", "n", "y", "y"], height: 93 },
    { divider: true },
    { label: "Team Members", values: ["n", "n", "Unlimited", "Unlimited", "Unlimited"], height: 70 },
    { label: "Shared Commands", values: ["n", "n", "Up to 5", "Unlimited", "Unlimited"], height: 70 },
    { label: "Shared Quicklinks", values: ["n", "n", "Up to 30", "Unlimited", "Unlimited"], height: 70 },
    { label: "Shared Snippets", values: ["n", "n", "Up to 30", "Unlimited", "Unlimited"], height: 70 },
    { label: "Private Store", values: ["n", "n", "y", "y", "y"], height: 70 },
    { divider: true },
    { label: "AI Control Center, including:", note: "Organization-Wide Toggle, Bring Your Own Keys, Provider Allow-List and more", values: ["n", "n", "n", "n", "y"], height: 160 },
    { label: "Organization Admin Controls, including:", note: "Single Sign-On and Sync, Domain Capture, Full Cloud Sync Control, 2FA Enforcement and more", values: ["n", "n", "n", "n", "y"], height: 205 },
    { divider: true },
    { label: "Monthly Subscription", values: ["Free", "Pro $10 / Plus $20 / Max $50", "$0 / user / month", "Pro $15 / Plus $25 / Max $55", "y"], height: 123 },
    { label: "Annual Subscription", values: ["Free", "Pro $96 / Plus $192 / Max $480", "$0 / user / year", "Pro $144 / Plus $240 / Max $528", "Custom"], height: 123 },
  ];
}

function Value({ value }: { value: string }) {
  switch (value) {
    case "y":
      return (
        <span className="rc-table__yes">
          <Check />
          <span className="rc-visually-hidden">Included</span>
        </span>
      );
    case "n":
      return <span className="rc-table__no">Not included</span>;
    default:
      return (
        <span className="rc-table__text">
          {value.split(" / ").map((part) => (
            <span key={part}>{part}</span>
          ))}
        </span>
      );
  }
}

function CompareTable() {
  const brand = useBrand();
  const rows = useRows(brand);
  return (
    <div className="rc-table-scroll" id="compare">
      <table className="rc-table">
        <thead>
          <tr>
            <th scope="col">
              <span className="rc-visually-hidden">Feature</span>
            </th>
            {COLUMNS.map((column) => (
              <th scope="col" key={column}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) =>
            "divider" in row ? (
              <tr key={index} className="rc-table__divider" aria-hidden="true">
                <td colSpan={6} />
              </tr>
            ) : (
              <tr key={row.label} style={{ height: row.height }}>
                <th scope="row">
                  {row.note ? (
                    <>
                      {row.label} <span className="rc-table__note">{row.note}</span>
                    </>
                  ) : (
                    row.label
                  )}
                </th>
                {row.values.map((value, column) => (
                  <td key={column}>
                    <Value value={value} />
                  </td>
                ))}
              </tr>
            ),
          )}
          <tr className="rc-table__actions">
            <td />
            {["Download", "Select Plan", "Create Organization", "Select Plan", "Select Plan"].map((label, index) => (
              <td key={index}>
                <a href="#" className="rc-btn rc-btn--light">
                  {label}
                </a>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function PricingScreen() {
  const brand = useBrand();
  return (
    <Shell>
      <div className="rc-pricing">
        <div className="rc-pricing__art rc-media rc-media--glow" data-compare-mask="" aria-hidden="true" />
        <h1 className="rc-visually-hidden">Pricing</h1>
        <PlanCards />
        <EnterpriseCard />
        <CompareTable />
        <div className="rc-pricing__faq">
          <Faq
            title="FAQs"
            subtitle="You've got questions. We've got answers"
            items={[
              [`Why is ${brand} free for personal use?`, "Our core tools stay free for individuals. Paid plans add AI, sync and team features on top."],
              ["Are the Free and Team plans available for organizational use?", "Yes. Teams can start for free and upgrade once they need shared AI and admin controls."],
              ["Is it possible to get the Pro plan without AI?", "Pro includes AI by default. Contact us if your organization needs it switched off."],
              [`What is free and paid in ${brand} AI?`, "A small number of AI messages are free. Paid plans include monthly credits."],
              ["What are AI credits?", "Credits measure AI usage across models. Larger models use more credits per request."],
              ["Is the free Team plan a trial?", "No. The free Team plan has no time limit."],
              ["How many seats do I get in a Team plan?", "You pay per member, and you can add or remove members at any time."],
              ["Can I have personal Extensions and Team Extensions?", "Yes. Personal and shared extensions live side by side."],
              ["Can I be part of multiple organizations?", "Yes. Switch between organizations from the settings window."],
              [`Does ${brand} have a Student Program?`, "Yes. Students get a discount on the Pro plan with a valid school email."],
            ]}
          />
        </div>
      </div>
    </Shell>
  );
}
