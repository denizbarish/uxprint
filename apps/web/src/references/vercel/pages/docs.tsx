"use client";

import { useState, type ReactNode } from "react";
import { Collapsible } from "@base-ui/react/collapsible";
import { Page } from "../chrome";
import { Icon } from "../ui";
import "./docs.css";

const navItems = [
  "Access Groups", "Model Router", "Aliases", "Artifacts", "Sign-in", "Billing", "Bulk Redirects", "Certificates", "Checks", "Bridge",
  "Workers", "Releases", "DNS", "Domains", "Registrar", "Drains", "Drives", "Edge Cache", "Environment", "Toggles", "Global Config",
  "Integrations", "Keys", "Logs", "Add-ons", "Split Apps", "Networking", "Monitoring", "Organizations", "Project Routes", "Members",
  "Projects", "Rollouts", "Runners", "Security", "Fixed IPs", "Storage", "Teams", "User", "Registry", "Pipelines", "Visits", "Hooks",
];

const endpointCounts = [11, 25, 6, 7, 5, 3, 7, 5, 10, 15, 3, 10, 4, 9, 19, 6, 5, 4, 11, 27, 18, 10, 13, 1, 25, 5, 11, 2, 7, 8, 3, 33, 8, 28, 18, 1, 3, 16, 4, 27, 23, 4, 4];

const toc = ["Install the SDK", "Sign-in", "Troubleshooting", "Endpoints"];

function Code({ title, icon, lines }: { title: string; icon: ReactNode; lines: ReactNode[] }) {
  const [copied, setCopied] = useState(false);
  return (
    <figure className="vc-code">
      <figcaption className="vc-code__head">
        {icon}
        <span>{title}</span>
        <button
          type="button"
          className="vc-code__copy vc-focus"
          aria-label={copied ? "Copied" : "Copy code"}
          onClick={() => {
            setCopied(true);
          }}
          onBlur={() => setCopied(false)}
        >
          <Icon name={copied ? "check" : "copy"} />
        </button>
      </figcaption>
      <pre className="vc-code__body">
        {lines.map((line, i) => (
          <span key={i} className="vc-code__line">
            <span className="vc-code__num" aria-hidden="true">
              {i + 1}
            </span>
            <code>{line}</code>
          </span>
        ))}
      </pre>
    </figure>
  );
}

function Sidebar() {
  return (
    <aside className="vc-docs-side" aria-label="Section navigation">
      <a href="#" className="vc-docs-side__back vc-focus">
        <Icon name="chevron-left" />
        <span>Core SDK</span>
      </a>
      <nav className="vc-docs-side__list">
        <a href="#" className="vc-docs-side__item vc-docs-side__item--active vc-focus" aria-current="page">
          Overview
        </a>
        <Collapsible.Root>
          <Collapsible.Trigger className="vc-docs-side__item vc-focus">
            Examples
            <Icon name="chevron-down" className="vc-docs-side__chev" />
          </Collapsible.Trigger>
          <Collapsible.Panel className="vc-docs-side__panel">
            {["Release Automation", "Domain Management", "Environment Variables"].map((label) => (
              <a key={label} href="#" className="vc-docs-side__sub vc-focus">
                {label}
              </a>
            ))}
          </Collapsible.Panel>
        </Collapsible.Root>
        {navItems.map((label) => (
          <Collapsible.Root key={label}>
            <Collapsible.Trigger className="vc-docs-side__item vc-focus">
              {label}
              <Icon name="chevron-right" className="vc-docs-side__chev" />
            </Collapsible.Trigger>
            <Collapsible.Panel className="vc-docs-side__panel">
              <a href="#" className="vc-docs-side__sub vc-focus">
                Overview
              </a>
            </Collapsible.Panel>
          </Collapsible.Root>
        ))}
      </nav>
    </aside>
  );
}

/** Docs article template (sidebar, article, on-this-page), built from /docs/rest-api/sdk. */
export function DocsScreen() {
  return (
    <Page actions="docs" className="vc-docs-page">
      <div className="vc-docs">
        <Sidebar />
        <article className="vc-docs-main">
          <div className="vc-docs-crumbs">
            <button type="button" className="vc-docs-crumbs__toggle vc-focus" aria-label="Toggle sidebar">
              <Icon name="menu" />
            </button>
            <a href="#">APIs and SDKs</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Core SDK</span>
          </div>
          <h1 className="vc-docs-h1">Using the Acme Core SDK</h1>
          <p className="vc-docs-p">
            The <code>@acme/sdk</code> package is a typed TypeScript SDK that lets you reach the resources and methods of the Acme REST API from your own code.
          </p>
          <h2 className="vc-docs-h2" id="install">
            Install the Acme Core SDK
          </h2>
          <p className="vc-docs-p">To download and install the SDK, run this command:</p>
          <Code title="Terminal" icon={<Icon name="chevron-right" size={14} />} lines={[<><span className="vc-tok-a">pnpm</span> i @acme/sdk</>]} />
          <h2 className="vc-docs-h2" id="sign-in">
            Sign-in
          </h2>
          <p className="vc-docs-p">
            Access tokens are needed to sign in and use the SDK. Once you have <a href="#">created a token</a>, you can pass it to the client as shown below:
          </p>
          <Code
            title="run.ts"
            icon={<Icon name="copy" size={14} />}
            lines={[
              <><span className="vc-tok-k">import</span> {"{ Acme }"} <span className="vc-tok-k">from</span> <span className="vc-tok-s">{"'@acme/sdk'"}</span>;</>,
              "",
              <><span className="vc-tok-k">const</span> acme = <span className="vc-tok-k">new</span> <span className="vc-tok-a">Acme</span>({"{"}</>,
              <>  token: <span className="vc-tok-s">{"'<YOUR_TOKEN>'"}</span>,</>,
              "});",
            ]}
          />
          <h2 className="vc-docs-h2" id="troubleshooting">
            Troubleshooting
          </h2>
          <p className="vc-docs-p">
            Make sure you create the token with the right <a href="#">team</a> and scope. If you see permission (403) errors when you already send a valid token, it may be one of these problems:
          </p>
          <ul className="vc-docs-ul">
            <li>The token has expired. Check the end date of the token in the account settings dashboard.</li>
            <li>The token cannot reach the right scope, either because it is not tied to the right team or because it lacks the account level access it needs.</li>
            <li>The resource you are trying to use is not open to that team. For example, access groups are a Scale only feature and you are using a token for a team that is on another plan with fewer features turned on for it.</li>
          </ul>
          <h2 className="vc-docs-h2" id="endpoints">
            Endpoints
          </h2>
          <p className="vc-docs-p">Browse every SDK method grouped by area.</p>
          <ul className="vc-docs-cards">
            {navItems.map((label, i) => (
              <li key={label}>
                <a href="#" className="vc-docs-card vc-focus">
                  <span>{label}</span>
                  <span className="vc-docs-card__count">
                    {endpointCounts[i]} endpoint{endpointCounts[i] === 1 ? "" : "s"}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </article>
        <nav className="vc-docs-toc" aria-label="On this page">
          <p className="vc-docs-toc__title">On this page</p>
          <ul>
            {toc.map((item, i) => (
              <li key={item}>
                <a href="#" className={`vc-focus${i === toc.length - 1 ? " vc-docs-toc__active" : ""}`}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Page>
  );
}
