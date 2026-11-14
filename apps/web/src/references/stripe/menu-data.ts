/**
 * Header navigation content. Group, column and item counts follow the measured mega menus
 * (Products 4 + 1 tinted column with a promo card and a bottom row; Solutions 4 columns with the last tinted;
 * Developers 3 columns; Resources 4 columns with the last tinted). All copy is neutral.
 */

export type MenuItem = { title: string; detail?: string };
export type MenuGroup = { title: string; items: MenuItem[]; tinted?: boolean };
export type MegaMenu = {
  id: "products" | "solutions" | "developers" | "resources";
  label: string;
  groups: MenuGroup[];
  /** Products only: the bottom row under the four main columns. */
  footer?: { prompt: string; links: MenuItem[] };
  /** Products only: the event card at the foot of the tinted column. */
  promo?: { title: string; body: string; cta: string };
};

export const megaMenus: MegaMenu[] = [
  {
    id: "products",
    label: "Products",
    groups: [
      {
        title: "Collect",
        items: [
          { title: "Collections", detail: "Online acceptance" },
          { title: "Hosted Merchant", detail: "Seller of record service" },
          { title: "Pay pages", detail: "No-code collection" },
          { title: "Hosted pay", detail: "Prebuilt payment UIs" },
          { title: "Components", detail: "Flexible UI building" },
          { title: "Pay options", detail: "Access to 120+" },
          { title: "Counter", detail: "In-person collection" },
          { title: "Approval Lift", detail: "Acceptance improvements" },
          { title: "Quickpay", detail: "Faster repeat checkout" },
          { title: "Account Links", detail: "Linked bank account details" },
        ],
      },
      {
        title: "Revenue",
        items: [
          { title: "Plans", detail: "Recurring revenue" },
          { title: "Meters", detail: "Usage-based plans" },
          { title: "Renewals", detail: "Renewal management" },
          { title: "Invoices", detail: "One-off or recurring" },
          { title: "Levies", detail: "Sales levy & VAT handling" },
          { title: "Revenue Ledger", detail: "Accounting automation" },
          { title: "Queries", detail: "Custom reporting" },
          { title: "Data Sync", detail: "Warehouse sync" },
        ],
      },
      {
        title: "Money Movement",
        items: [
          { title: "Reserve", detail: "Business balances and banking" },
          { title: "Global Transfers", detail: "Transfers to third parties" },
          { title: "Funding", detail: "Business financing" },
          { title: "Digital Assets", detail: "Wallets, stable token issuing, and card tooling" },
          { title: "Asset Onramp", detail: "Embeddable token purchases" },
        ],
      },
      {
        title: "Embedded Finance",
        items: [
          { title: "Platform Kit", detail: "Collections for platforms" },
          { title: "Funding for platforms", detail: "Customer financing" },
          { title: "Reserve for platforms", detail: "Embedded financial accounts" },
          { title: "Cards", detail: "Physical and virtual cards" },
        ],
      },
      {
        title: "More",
        tinted: true,
        items: [
          { title: "Product roadmap", detail: "See what is next" },
          { title: "Shield", detail: "Fraud screening" },
          { title: "Launchpad", detail: "Company formation" },
          { title: "Offsets", detail: "Carbon programs" },
          { title: "Verify", detail: "Online identity checks" },
        ],
      },
    ],
    footer: {
      prompt: "Not sure where to begin?",
      links: [
        { title: "Get suggestions", detail: "Tell us about your team" },
        { title: "See every product", detail: "Browse the complete product list" },
      ],
    },
    promo: {
      title: "Acme Summit 2026",
      body: "See how Acme is shaping the next wave of online commerce.",
      cta: "Watch now",
    },
  },
  {
    id: "solutions",
    label: "Solutions",
    groups: [
      { title: "By stage", items: [{ title: "Large companies" }, { title: "New ventures" }] },
      {
        title: "By use case",
        items: [
          { title: "Agent commerce" },
          { title: "Tokens" },
          { title: "Online stores" },
          { title: "Embedded money" },
          { title: "Finance operations" },
          { title: "Global companies" },
          { title: "In-app purchases" },
          { title: "Marketplaces" },
          { title: "Money handling" },
          { title: "Platforms" },
          { title: "Software" },
        ],
      },
      {
        title: "By industry",
        items: [
          { title: "Model builders" },
          { title: "Creator business" },
          { title: "Finance apps" },
          { title: "Games" },
          { title: "Hotels, travel, and recreation" },
          { title: "Insurers" },
          { title: "Media and streaming" },
          { title: "Charities" },
          { title: "Service firms" },
          { title: "Government" },
          { title: "Shops" },
        ],
      },
      { title: "Ecosystem", tinted: true, items: [{ title: "Partners" }, { title: "Acme App Directory" }] },
    ],
  },
  {
    id: "developers",
    label: "Developers",
    groups: [
      {
        title: "Documentation",
        items: [{ title: "Acme docs" }, { title: "API reference" }, { title: "Client libraries" }, { title: "Acme Apps" }],
      },
      {
        title: "Guides",
        items: [
          { title: "Take online payments" },
          { title: "Add a prebuilt checkout" },
          { title: "Build a platform or marketplace" },
          { title: "Handle recurring plans" },
          { title: "Charge by usage" },
          { title: "Issue token-backed cards" },
          { title: "Set up and run services with agents" },
        ],
      },
      {
        title: "Resources",
        items: [{ title: "App connectors" }, { title: "Code examples" }, { title: "Engineering blog" }, { title: "API health" }],
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    groups: [
      { title: "Learn", items: [{ title: "Blog" }, { title: "Customer stories" }, { title: "Guides" }] },
      { title: "Support", items: [{ title: "Get help" }, { title: "Support plans" }, { title: "Expert services" }] },
      {
        title: "Company",
        items: [
          { title: "Product roadmap" },
          { title: "Annual conference" },
          { title: "Careers" },
          { title: "Press room" },
          { title: "Acme Books" },
          { title: "About" },
        ],
      },
      { title: "Contact", tinted: true, items: [{ title: "Contact sales" }, { title: "Join as a partner" }] },
    ],
  },
];
