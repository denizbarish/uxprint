export type ReferenceScreenEntry = {
  id: string;
  title: string;
  theme: "light" | "dark";
  /** Flow name and step name in print.json that this screen reproduces. */
  flow?: string;
  step?: string;
  /** Page template id in print.json (`templates[].id`) that this screen reproduces. */
  template?: string;
  /** The page of the platform this screen was rebuilt from; shown as the "open original" link. */
  url?: string;
  /** Original viewport screenshot under captures/<slug>/, used by tools/compare.mjs. */
  capture?: string;
  /** Page name under captures/_survey/<slug>/ whose full-page screenshots (1440 and 390) are the original. */
  survey?: string;
};

export type ReferenceRegistry = {
  screens: ReferenceScreenEntry[];
  /** Component name in print.json, mapped to the screen (and optional isolated part) that shows it live. */
  components: Record<string, { screen: string; part?: string }>;
};

/** Written by tools/compare.mjs: share of matching pixels per screen, in percent. */
export type CompareScores = Record<string, { desktop?: number; phone?: number }>;
