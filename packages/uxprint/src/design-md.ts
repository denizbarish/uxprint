import type { Print } from "./schema.js";

type Row = Record<string, string | number | undefined>;

function table(headers: string[], rows: Row[]): string {
  const keys = headers.map((header) => header.toLowerCase().replace(/ /g, ""));
  const cell = (value: string | number | undefined) => String(value ?? "").replace(/\s*\n\s*/g, " ").replace(/\|/g, "\\|");
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${keys.map((key) => cell(row[key])).join(" | ")} |`),
  ].join("\n");
}

function tokens(rows: { name: string; value: string; use: string }[]): string {
  return table(["Name", "Value", "Use"], rows);
}

function motionSections(print: Print): string[] {
  const { durations, easings, transitions, keyframes, unmeasured } = print.motion;
  if (!durations.length && !easings.length && !transitions.length && !keyframes.length && !unmeasured.length) return [];
  return [
    "## Motion",
    "Durations, easings and keyframes are measured values. Use them as written; honour `prefers-reduced-motion`.",
    ...(durations.length ? ["### Durations", tokens(durations)] : []),
    ...(easings.length ? ["### Easings", tokens(easings)] : []),
    ...(transitions.length ? ["### Transitions", table(["Target", "Properties", "Duration", "Easing"], transitions)] : []),
    ...(keyframes.length
      ? [
          "### Keyframes",
          ...keyframes.map((item) => `**${item.name}:** ${item.use}${item.timing ? ` Timing: ${item.timing}.` : ""}\n\n\`\`\`css\n${item.css}\n\`\`\``),
        ]
      : []),
    ...(unmeasured.length ? ["### Not measured", unmeasured.map((line) => `- ${line}`).join("\n")] : []),
  ];
}

/** Renders a print as the DESIGN.md an agent reads before building UI. */
export function renderDesignMd(print: Print): string {
  const sections: string[] = [
    `# DESIGN.md: ${print.name} style`,
    [
      `Build every screen in this project to this specification. It records the interface of ${print.name} (${print.url}),`,
      `captured ${print.source.capturedAt} at ${print.source.widths.join(", ")} px. Reproduce the system, not the brand:`,
      `do not copy ${print.name}'s logo, name, copy, illustrations or photos.`,
    ].join("\n"),
    `${print.summary}\n\nTheme: ${print.theme}. Category: ${print.category}.`,

    "## Principles",
    print.principles.map((line) => `- ${line}`).join("\n"),

    "## Avoid",
    print.avoid.map((line) => `- ${line}`).join("\n"),

    "## Color",
    "### Background",
    tokens(print.color.background),
    "### Text",
    tokens(print.color.text),
    ...(print.color.border.length ? ["### Border", tokens(print.color.border)] : []),
    "### Accent",
    tokens(print.color.accent),
    ...(print.color.semantic.length ? ["### Semantic", tokens(print.color.semantic)] : []),
    ...(print.color.alternate
      ? [`### ${print.color.alternate.name}`, `Applies to: ${print.color.alternate.appliesTo}`, tokens(print.color.alternate.tokens)]
      : []),

    "## Typography",
    table(
      ["Role", "Stack", "Substitute", "Source"],
      print.typography.families.map((family) => ({
        role: family.role,
        stack: family.features ? `${family.stack}; font-feature-settings: ${family.features}` : family.stack,
        substitute: family.substitute.note ? `${family.substitute.name} (${family.substitute.note})` : family.substitute.name,
        source: family.substitute.source,
      })),
    ),
    table(
      ["Name", "Size", "Weight", "Line height", "Tracking", "Family", "Use"],
      print.typography.scale.map((style) => ({ ...style, lineheight: style.lineHeight })),
    ),

    "## Spacing",
    [
      `- Unit: ${print.spacing.unit}`,
      `- Scale: ${print.spacing.scale.join(", ")}`,
      `- Container max width: ${print.spacing.containerMaxWidth}`,
      `- Page gutter: ${print.spacing.pageGutter.desktop} desktop, ${print.spacing.pageGutter.mobile} mobile`,
      `- Gap between sections: ${print.spacing.sectionGap}`,
    ].join("\n"),

    "## Radius",
    tokens(print.radius),
    ...(print.shadow.length ? ["## Shadow", tokens(print.shadow)] : []),

    "## Layout",
    ...(print.layout.breakpoints.length ? [`Breakpoints: ${print.layout.breakpoints.join(", ")}`] : []),
    print.layout.patterns.map((pattern) => `- **${pattern.name}:** ${pattern.description}`).join("\n"),
    `Responsive: ${print.layout.responsive}`,

    "## Components",
    ...print.components.flatMap((component) => [
      `### ${component.name}`,
      [
        component.anatomy,
        "",
        ...Object.entries(component.spec).map(([property, value]) => `- ${property}: ${value}`),
        ...component.states.map((state) => `- State ${state.name}: ${state.change}`),
        ...(component.notes ? ["", component.notes] : []),
      ].join("\n"),
    ]),

    ...(print.templates.length
      ? [
          "## Page templates",
          "Every page of the site is built on one of these layouts. Pick the one that fits the page you are building.",
          ...print.templates.flatMap((item) => [
            `### ${item.name}`,
            [item.use, "", ...item.structure.map((line, index) => `${index + 1}. ${line}`), "", `Pages on this layout: ${item.pages.join(", ")}`].join("\n"),
          ]),
        ]
      : []),

    ...motionSections(print),

    ...print.flows.flatMap((flow) => [
      `## Flow: ${flow.name}`,
      `Starts at \`${flow.entry}\`. ${flow.layout}`,
      ...flow.steps.flatMap((step, index) => [
        `### ${index + 1}. ${step.name}`,
        [
          ...step.screen.map((line) => `- ${line}`),
          ...step.actions.map((line) => `- Action: ${line}`),
          ...(step.validation ? [`- Validation: ${step.validation}`] : []),
        ].join("\n"),
      ]),
      ...(flow.notRecorded ? [`Not recorded: ${flow.notRecorded}`] : []),
    ]),

    ...(print.libraries.detected.length || print.libraries.recommended.length ? ["## Libraries"] : []),
    ...(print.libraries.detected.length
      ? [
          `Detected in the pages ${print.name} serves. Use these before reaching for an alternative.`,
          table(
            ["Name", "npm", "Purpose", "Evidence"],
            print.libraries.detected.map((item) => ({ ...item, npm: item.npm ?? "(not on npm)" })),
          ),
        ]
      : []),
    ...(print.libraries.recommended.length
      ? ["Recommended for the parts that could not be identified:", table(["Name", "npm", "Purpose"], print.libraries.recommended)]
      : []),
  ];
  return sections.join("\n\n") + "\n";
}
