"use client";

import { useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { Switch } from "@base-ui/react/switch";
import { Mark, noopSubscribe, readParam, useBrand } from "./brand";
import { HomeScreen } from "./pages/home";
import { ProductScreen } from "./pages/product";
import { FeatureScreen } from "./pages/feature";
import { PricingScreen } from "./pages/pricing";
import { CompanyScreen } from "./pages/company";
import { IndexGridScreen } from "./pages/index-grid";
import { ChangelogScreen } from "./pages/changelog";
import { PostScreen } from "./pages/post";
import { LegalScreen } from "./pages/legal";
import { HubScreen } from "./pages/hub";
import { DocsScreen } from "./pages/docs";
import { CenteredScreen } from "./pages/centered";
import { IntegrationsScreen } from "./pages/integrations";
import "./linear.css";

/** `?part=` isolates one block of the controls screen for embedding next to a component spec. */
function usePart(): string | null {
  return useSyncExternalStore(noopSubscribe, () => readParam("part"), () => null);
}

/** Focus on arrival, as measured; skipped inside a gallery iframe so the host page keeps focus and scroll. */
function focusWhenTopLevel(element: HTMLInputElement | null) {
  if (element && window.self === window.top) element.focus();
}

/* ---------------------------------------------------------------- auth flows */

type AuthKind = "login" | "signup";
type AuthStep = "method" | "email";

function AuthFlow({ kind, initialStep }: { kind: AuthKind; initialStep: AuthStep }) {
  const brand = useBrand();
  const [step, setStep] = useState<AuthStep>(initialStep);
  const [email, setEmail] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    // The flow ends here on purpose: nothing is sent anywhere.
    event.preventDefault();
  }

  return (
    <main className="acme acme-auth">
      <div className="acme-auth__column" data-enter="">
        <div className="acme-auth__mark" data-compare-mask="">
          <Mark />
        </div>
        {step === "method" ? (
          <>
            <h1 className="acme-auth__title">{kind === "login" ? `Log in to ${brand}` : "Set up your workspace"}</h1>
            <div className="acme-auth__controls">
              <button type="button" className="acme-auth-button acme-auth-button--primary">
                Continue with OpenID
              </button>
              <button type="button" className="acme-auth-button acme-auth-button--secondary" onClick={() => setStep("email")}>
                Continue with email
              </button>
              <button type="button" className="acme-auth-button acme-auth-button--secondary">
                Continue with SAML SSO
              </button>
              {kind === "login" ? (
                <button type="button" className="acme-auth-button acme-auth-button--secondary">
                  Sign in with passkey
                </button>
              ) : null}
            </div>
            {kind === "login" ? (
              <p className="acme-auth__note">
                No account here yet?{" "}
                <a className="acme-auth-link" href="../signup-method/">
                  Create one
                </a>{" "}
                or{" "}
                <a className="acme-auth-link" href="#read-more">
                  read more
                </a>
              </p>
            ) : (
              <>
                <p className="acme-auth__note acme-auth__note--terms">
                  By continuing, you accept the terms of
                  <br />
                  <a className="acme-auth-link" href="#terms">
                    Terms of Use
                  </a>
                  ,{" "}
                  <a className="acme-auth-link" href="#privacy">
                    Privacy Notice
                  </a>
                  ,
                  <br />
                  and{" "}
                  <a className="acme-auth-link" href="#processing">
                    Data Handling Addendum
                  </a>
                  .
                </p>
                <p className="acme-auth__note acme-auth__note--switch">
                  Have an account already?{" "}
                  <a className="acme-auth-link" href="../login-method/">
                    Log in
                  </a>
                </p>
              </>
            )}
          </>
        ) : (
          <>
            <h1 className="acme-auth__title">Which email should we use?</h1>
            <form className="acme-auth__controls" onSubmit={submit} noValidate={false}>
              <input
                className="acme-auth-field"
                type="email"
                name="email"
                autoComplete="off"
                ref={focusWhenTopLevel}
                aria-label="Email address"
                placeholder="Your work email address…"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <button
                type="submit"
                className="acme-auth-button acme-auth-button--secondary"
                data-empty={email === "" ? "" : undefined}
              >
                Continue with email
              </button>
            </form>
            <button type="button" className="acme-auth-link acme-auth__back" onClick={() => setStep("method")}>
              {kind === "login" ? "Back to login" : "Back to signup"}
            </button>
          </>
        )}
      </div>
    </main>
  );
}

/* ---------------------------------------------------------------- dark surfaces */

function Wordmark() {
  const brand = useBrand();
  return (
    <a className="acme-logo" href="#top" data-compare-mask="">
      <Mark />
      {brand}
    </a>
  );
}

const menuColumns = [
  [
    { title: "Requests", text: "Collect asks and context\nfrom every place they start" },
    { title: "Plans and goals", text: "Shape the plan and track it\nfrom first idea to release" },
  ],
  [
    { title: "Automations", text: "Rules that move the work\nfrom one stage to the next" },
    { title: "Review and release", text: "Draft changes and check\nthem without leaving Acme" },
  ],
];

const menuLinks = ["Integration catalogue", "Release notes", "Phone apps", "Trust center"];

function Header({ current }: { current?: string }) {
  return (
    <header className="acme-header">
      <nav className="acme-header__inner" aria-label="Main">
        <Wordmark />
        <div className="acme-header__right">
          <NavigationMenu.Root className="acme-nav-list--primary">
            <NavigationMenu.List className="acme-nav-list">
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className="acme-nav-link">Product</NavigationMenu.Trigger>
                <NavigationMenu.Content className="acme-menu-content">
                  <div className="acme-menu-inner">
                    {menuColumns.map((column, index) => (
                      <div className="acme-menu-column" key={index}>
                        {column.map((item) => (
                          <NavigationMenu.Link key={item.title} className="acme-menu-item acme-focus" href="#menu">
                            <span className="acme-menu-item__title">{item.title}</span>
                            <span className="acme-menu-item__text" style={{ whiteSpace: "pre-line" }}>
                              {item.text}
                            </span>
                          </NavigationMenu.Link>
                        ))}
                      </div>
                    ))}
                    <div className="acme-menu-column" style={{ gap: 20 }}>
                      {menuLinks.map((label) => (
                        <NavigationMenu.Link key={label} className="acme-menu-item acme-menu-item__title acme-focus" href="#menu">
                          {label}
                        </NavigationMenu.Link>
                      ))}
                    </div>
                  </div>
                  <div className="acme-menu-footer">
                    <span>
                      <strong>New</strong>Bring your own model keys
                    </span>
                    <a className="acme-arrow-link acme-arrow-link--quiet" href="#menu" style={{ fontSize: 13 }}>
                      Read more <Arrow />
                    </a>
                  </div>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
              {["Resources", "Customers", "Pricing", "Now", "Contact"].map((label) => (
                <NavigationMenu.Item key={label}>
                  <NavigationMenu.Link
                    className="acme-nav-link"
                    href={label === "Pricing" ? "../pricing/" : "#nav"}
                    aria-current={current === label ? "page" : undefined}
                  >
                    {label}
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>
            <NavigationMenu.Portal>
              <NavigationMenu.Positioner className="acme-menu-positioner" sideOffset={12} align="end" alignOffset={-547}>
                <NavigationMenu.Popup className="acme acme-menu-popup">
                  <NavigationMenu.Viewport />
                </NavigationMenu.Popup>
              </NavigationMenu.Positioner>
            </NavigationMenu.Portal>
          </NavigationMenu.Root>
          <span className="acme-divider" aria-hidden="true" />
          <ul className="acme-nav-list">
            <li>
              <a className="acme-nav-link" href="../login-method/">
                Log in
              </a>
            </li>
            <li style={{ marginLeft: 8 }}>
              <a className="acme-btn acme-btn--32 acme-btn--primary" href="../signup-method/">
                Sign up
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2.5 7h9M8 3.5 11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Glyph({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const glyphs = {
  inbox: "M2.5 9.5h3l1 2h3l1-2h3M3.5 3.5h9l1 6v3h-11v-3z",
  target: "M8 2.5a5.5 5.5 0 1 0 0 11a5.5 5.5 0 1 0 0-11ZM8 6a2 2 0 1 0 0 4a2 2 0 1 0 0-4Z",
  stack: "M8 2.5 13.5 5 8 7.5 2.5 5zM2.5 8 8 10.5 13.5 8M2.5 11 8 13.5 13.5 11",
  link: "M7 9a2.5 2.5 0 0 0 3.5 0l2-2A2.5 2.5 0 0 0 9 3.5l-.5.5M9 7a2.5 2.5 0 0 0-3.5 0l-2 2A2.5 2.5 0 0 0 7 12.5l.5-.5",
  copy: "M5.5 5.5v-2h7v7h-2M3.5 5.5h7v7h-7z",
  more: "M4 8h.01M8 8h.01M12 8h.01",
  chevron: "M4.5 6.5 8 10l3.5-3.5",
};

function Section({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <section className="acme-section" id={id} aria-labelledby={`${id}-label`}>
      <h2 className="acme-section__label" id={`${id}-label`}>
        {label}
      </h2>
      <div>{children}</div>
    </section>
  );
}

function ButtonsPart() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <div className="acme-row">
        <a className="acme-btn acme-btn--32 acme-btn--primary" href="#buttons">
          Sign up
        </a>
        <button type="button" className="acme-btn acme-btn--40 acme-btn--primary">
          Get started
        </button>
        <button type="button" className="acme-btn acme-btn--44 acme-btn--primary">
          Start building
        </button>
      </div>
      <div className="acme-row">
        <button type="button" className="acme-btn acme-btn--32 acme-btn--secondary">
          Log in
        </button>
        <button type="button" className="acme-btn acme-btn--40 acme-btn--secondary">
          Talk to us
        </button>
        <button type="button" className="acme-btn acme-btn--44 acme-btn--secondary">
          Contact sales
        </button>
      </div>
    </div>
  );
}

function LinksPart() {
  return (
    <div className="acme-row" style={{ gap: 32 }}>
      <a className="acme-arrow-link" href="#links">
        Read the story <Arrow />
      </a>
      <a className="acme-arrow-link acme-arrow-link--quiet" href="#links">
        All customers <Arrow />
      </a>
      <div className="acme-row" style={{ gap: 8 }}>
        <button type="button" className="acme-icon-button" aria-label="Copy link">
          <Glyph d={glyphs.link} />
        </button>
        <button type="button" className="acme-icon-button" aria-label="Duplicate">
          <Glyph d={glyphs.copy} />
        </button>
        <button type="button" className="acme-icon-button" aria-label="More actions">
          <Glyph d={glyphs.more} />
        </button>
      </div>
    </div>
  );
}

function SidebarPart() {
  const [current, setCurrent] = useState("Inbox");
  const [open, setOpen] = useState(true);
  const items = [
    { label: "Inbox", glyph: glyphs.inbox },
    { label: "My work", glyph: glyphs.target },
  ];
  const groupItems = [
    { label: "Goals", glyph: glyphs.target },
    { label: "Projects", glyph: glyphs.stack },
  ];
  const item = (entry: { label: string; glyph: string }) => (
    <button
      type="button"
      key={entry.label}
      className="acme-sidebar-item"
      aria-current={current === entry.label ? "page" : undefined}
      onClick={() => setCurrent(entry.label)}
    >
      <Glyph d={entry.glyph} />
      {entry.label}
    </button>
  );
  return (
    <nav className="acme-sidebar" aria-label="Workspace">
      {items.map(item)}
      <button type="button" className="acme-sidebar__group" aria-expanded={open} onClick={() => setOpen(!open)}>
        Workspace
        <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true" style={{ transform: open ? "none" : "rotate(-90deg)" }}>
          <path d="M1 2.5h6L4 6z" fill="currentColor" />
        </svg>
      </button>
      {open ? groupItems.map(item) : null}
    </nav>
  );
}

function SwitchPart() {
  return <BillingSwitch defaultChecked label="Billed yearly" />;
}

function BillingSwitch({ defaultChecked, label }: { defaultChecked: boolean; label: string }) {
  return (
    <label className="acme-switch">
      <Switch.Root className="acme-switch__track" defaultChecked={defaultChecked}>
        <Switch.Thumb className="acme-switch__thumb" />
      </Switch.Root>
      {label}
    </label>
  );
}

const disclosures = [
  { title: "How are seats counted?", body: "Every member with access to the workspace counts as one seat, billed per month." },
  { title: "Can I move between plans?", body: "Yes. Changes apply right away and the next invoice is prorated." },
];

function DisclosurePart() {
  const [open, setOpen] = useState<string | null>(disclosures[0]?.title ?? null);
  return (
    <div className="acme-disclosure">
      {disclosures.map((entry) => {
        const expanded = open === entry.title;
        const panelId = `panel-${entry.title.length}`;
        return (
          <div className="acme-disclosure__row" key={entry.title}>
            <button
              type="button"
              className="acme-disclosure__button"
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setOpen(expanded ? null : entry.title)}
            >
              {entry.title}
              <span className="acme-disclosure__chevron">
                <Glyph d={glyphs.chevron} />
              </span>
            </button>
            {expanded ? (
              <div className="acme-disclosure__panel" id={panelId}>
                {entry.body}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function FooterPart() {
  const columns = [
    ["Product", "Planning", "Requests", "Pricing"],
    ["Company", "About", "Careers", "Brand"],
    ["Legal", "Privacy", "Terms", "Security"],
  ];
  return (
    <div className="acme-row" style={{ alignItems: "flex-start", gap: 64 }}>
      {columns.map(([heading, ...links]) => (
        <div key={heading} style={{ display: "grid", gap: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 510, color: "#f7f8f8" }}>{heading}</span>
          {links.map((link) => (
            <a className="acme-footer-link" href="#footer" key={link}>
              {link}
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}

const controlParts: { id: string; label: string; render: () => ReactNode }[] = [
  { id: "buttons", label: "Buttons 32, 40, 44", render: () => <ButtonsPart /> },
  { id: "links", label: "Text links, icon buttons", render: () => <LinksPart /> },
  { id: "sidebar", label: "Sidebar items", render: () => <SidebarPart /> },
  { id: "switch", label: "Switch", render: () => <SwitchPart /> },
  { id: "disclosure", label: "Disclosure rows", render: () => <DisclosurePart /> },
  { id: "footer", label: "Footer links", render: () => <FooterPart /> },
];

function Controls() {
  const part = usePart();
  if (part === "header") {
    return (
      <div className="acme acme-dark" style={{ minHeight: 420 }}>
        <Header />
      </div>
    );
  }
  const isolated = controlParts.find((entry) => entry.id === part);
  if (isolated) {
    return (
      <div className="acme acme-dark" style={{ display: "grid", placeItems: "center", padding: 32 }}>
        {isolated.render()}
      </div>
    );
  }
  return (
    <div className="acme acme-dark" id="top">
      <Header />
      <main className="acme-page">
        {controlParts.map((entry) => (
          <Section key={entry.id} id={entry.id} label={entry.label}>
            {entry.render()}
          </Section>
        ))}
      </main>
    </div>
  );
}

export const linearScreens: Record<string, () => ReactNode> = {
  "login-method": () => <AuthFlow kind="login" initialStep="method" />,
  "login-email": () => <AuthFlow kind="login" initialStep="email" />,
  "signup-method": () => <AuthFlow kind="signup" initialStep="method" />,
  "signup-email": () => <AuthFlow kind="signup" initialStep="email" />,
  controls: () => <Controls />,
  home: () => <HomeScreen />,
  product: () => <ProductScreen />,
  feature: () => <FeatureScreen />,
  pricing: () => <PricingScreen />,
  company: () => <CompanyScreen />,
  "index-grid": () => <IndexGridScreen />,
  changelog: () => <ChangelogScreen />,
  post: () => <PostScreen />,
  legal: () => <LegalScreen />,
  hub: () => <HubScreen />,
  docs: () => <DocsScreen />,
  centered: () => <CenteredScreen />,
  integrations: () => <IntegrationsScreen />,
};
