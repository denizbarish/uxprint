/**
 * Navigation and footer structure of the Vercel print, with neutral labels.
 * Counts, grouping and order match the original (measured at 1440 on /home, 2026-11-14).
 */

export type MenuLink = { label: string; external?: boolean };
export type MenuGroup = { label: string; links: MenuLink[] };
export type Menu = { label: string; groups: MenuGroup[] };

export const menus: Menu[] = [
  {
    label: "Platform",
    groups: [
      {
        label: "Agent Kit",
        links: [
          { label: "Model SDK" },
          { label: "Model Router" },
          { label: "Runner" },
          { label: "Identity" },
          { label: "Bridge" },
          { label: "Relay" },
        ],
      },
      {
        label: "Core Services",
        links: [
          { label: "Build and release" },
          { label: "Pipelines" },
          { label: "Elastic Compute" },
          { label: "Edge Delivery" },
          { label: "Monitoring" },
          { label: "Jobs" },
          { label: "Protection" },
        ],
      },
      {
        label: "Utilities",
        links: [
          { label: "Starter" },
          { label: "Assistant" },
          { label: "Extension" },
          { label: "Community Code" },
          { label: "Names", external: true },
          { label: "Studio", external: true },
        ],
      },
    ],
  },
  {
    label: "Learn",
    groups: [
      {
        label: "Read",
        links: [
          { label: "Guides" },
          { label: "Company" },
          { label: "Journal" },
          { label: "Updates" },
          { label: "Answers" },
        ],
      },
      {
        label: "Make",
        links: [
          { label: "Agent Apps" },
          { label: "Products" },
          { label: "Campaign Sites" },
          { label: "Networks" },
          { label: "Storefronts" },
        ],
      },
      {
        label: "Browse",
        links: [
          { label: "Stories" },
          { label: "Add-ons" },
          { label: "Find a Partner" },
          { label: "Cloud" },
          { label: "Forum", external: true },
        ],
      },
    ],
  },
];

export const navLinks = ["Teams", "Plans"];

export type FooterLink = { label: string; badge?: boolean; button?: boolean };
export type FooterColumn = { label: string; links: FooterLink[] };

const l = (label: string, badge?: boolean): FooterLink => ({ label, badge });

/** Twelve columns in two rows of six; link counts per column as measured. */
export const footerColumns: FooterColumn[] = [
  { label: "Agent Kit", links: [l("Model SDK"), l("Model Router"), l("Runner"), l("Jobs"), l("Bridge", true), l("Identity", true), l("Relay", true)] },
  { label: "Core Services", links: [l("Build and release"), l("Pipelines", true), l("Elastic Compute"), l("Edge Delivery"), l("Monitoring")] },
  { label: "Protection", links: [l("Platform Safety"), l("Firewall"), l("Traffic Rules"), l("Checks")] },
  { label: "Utilities", links: [l("Quick Upload"), l("Assistant"), l("Extension"), l("Skills"), l("Names"), l("Studio")] },
  { label: "Runtimes", links: [l("Relay", true), l("Runtime A"), l("Runtime B"), l("Runtime C"), l("Runtime D"), l("Monorepo"), l("Runtime E"), l("Runtime F"), l("All runtimes")] },
  { label: "Libraries", links: [l("Core SDK"), l("Jobs SDK"), l("Toggles SDK"), l("Chat SDK"), l("Queue SDK"), l("Markdown")] },
  { label: "Make", links: [l("Agent Apps"), l("Products"), l("Campaign Sites"), l("Networks"), l("Storefronts"), l("Platform Teams"), l("Design Teams")] },
  { label: "Read", links: [l("Guides"), l("Journal"), l("Updates"), l("Answers"), l("School"), l("Articles"), l("Forum"), l("Field Notes")] },
  { label: "Browse", links: [l("Stories"), l("Add-ons"), l("Starters"), l("Find a Partner"), l("Acme + Cloud")] },
  { label: "Company", links: [l("About"), l("Careers"), l("Newsroom"), l("Events"), l("Founders"), l("Showcase"), l("Open Source Fund"), l("Teams"), l("Plans"), l("Support")] },
  {
    label: "Legal",
    links: [
      l("Privacy"),
      l("Terms"),
      l("Cookies"),
      l("Data Terms"),
      l("Fair Use"),
      l("All documents"),
      l("Trust"),
      l("Status"),
      { label: "Cookie Settings", button: true },
    ],
  },
  { label: "Social", links: [l("Code Host"), l("Microblog"), l("Network"), l("Video"), l("Photos")] },
];
