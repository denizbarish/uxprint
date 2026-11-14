import { z } from "zod";

const slug = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/);
const hex = z.string().regex(/^#[0-9a-f]{6}([0-9a-f]{2})?$/);

/** A named value plus where the platform uses it. `value` is copied from the capture, never rounded. */
const token = z.strictObject({
  name: z.string().min(1),
  value: z.string().min(1),
  use: z.string().min(1),
});

const colorToken = token.extend({ value: hex });

const fontFamily = z.strictObject({
  role: z.enum(["sans", "display", "serif", "mono"]),
  /** The font-family stack exactly as the platform declares it. */
  stack: z.string().min(1),
  /** OpenType features the platform switches on, e.g. `"cv01", "ss03"`. */
  features: z.string().optional(),
  /** A freely licensed face that reproduces the look when the original is proprietary. */
  substitute: z.strictObject({
    name: z.string().min(1),
    source: z.enum(["google-fonts", "fontsource", "system", "same"]),
    note: z.string().optional(),
  }),
});

const typeStyle = z.strictObject({
  name: z.string().min(1),
  size: z.string().regex(/^\d+(\.\d+)?px$/),
  weight: z.number().int().min(100).max(900),
  lineHeight: z.string().optional(),
  tracking: z.string().optional(),
  family: z.enum(["sans", "display", "serif", "mono"]),
  use: z.string().min(1),
});

const component = z.strictObject({
  name: z.string().min(1),
  /** What the component is made of, outside in. */
  anatomy: z.string().min(1),
  /** CSS-like measurements: height, padding, radius, border, background, font. */
  spec: z.record(z.string(), z.string()),
  states: z.array(z.strictObject({ name: z.string().min(1), change: z.string().min(1) })).default([]),
  notes: z.string().optional(),
});

const library = z.strictObject({
  name: z.string().min(1),
  npm: z.string().min(1),
  purpose: z.string().min(1),
});

const detectedLibrary = z.strictObject({
  name: z.string().min(1),
  npm: z.string().optional(),
  purpose: z.string().min(1),
  /** What in the served page shows it: an attribute, a keyframe name, a script fingerprint. */
  evidence: z.string().min(1),
});

const flow = z.strictObject({
  name: z.string().min(1),
  /** Where the flow starts, as a path. */
  entry: z.string().min(1),
  /** The screen's fixed layout, shared by every step. */
  layout: z.string().min(1),
  steps: z
    .array(
      z.strictObject({
        name: z.string().min(1),
        /** What is on screen, top to bottom. */
        screen: z.array(z.string().min(1)).min(1),
        /** What the user does to move on, and where each choice leads. */
        actions: z.array(z.string().min(1)).default([]),
        /** How the step rejects bad input, as observed. */
        validation: z.string().optional(),
      }),
    )
    .min(1),
  /** Steps that exist but could not be recorded (behind an account), so an agent does not invent them. */
  notRecorded: z.string().optional(),
});

/** A page layout shared by several pages of the platform, so one description covers all of them. */
const template = z.strictObject({
  id: slug,
  name: z.string().min(1),
  /** When to use this layout. */
  use: z.string().min(1),
  /** The sections of the page, top to bottom, with their measurements. */
  structure: z.array(z.string().min(1)).min(1),
  /** Paths of the platform's pages built on this layout. */
  pages: z.array(z.string().startsWith("/")).min(1),
});

const motion = z.strictObject({
  durations: z.array(token).default([]),
  easings: z.array(token).default([]),
  /** What changes on interaction, with measured timing. */
  transitions: z
    .array(
      z.strictObject({
        target: z.string().min(1),
        properties: z.string().min(1),
        duration: z.string().min(1),
        easing: z.string().min(1),
      }),
    )
    .default([]),
  /** Named animations with their keyframes as CSS, ready to paste. */
  keyframes: z
    .array(
      z.strictObject({
        name: z.string().regex(/^[a-z][a-z0-9-]*$/),
        use: z.string().min(1),
        css: z
          .string()
          .startsWith("@keyframes")
          .refine((css) => css.split("@keyframes").length === 2 && !/url\(|@import|<\//i.test(css), "one @keyframes block, no url(), @import or markup"),
        timing: z.string().optional(),
      }),
    )
    .default([]),
  /** Motion the measurement could not pin down (script-driven, canvas), described rather than specified. */
  unmeasured: z.array(z.string().min(1)).default([]),
});

export const printSchema = z.strictObject({
  slug,
  name: z.string().min(1),
  url: z.url(),
  category: z.enum(["product-app", "marketing-site", "docs", "ecommerce", "dashboard"]),
  tags: z.array(z.string().min(1)).min(1),
  /** One sentence: what makes this interface recognisable. */
  summary: z.string().min(1).max(240),
  theme: z.enum(["dark", "light", "both"]),

  source: z.strictObject({
    tool: z.string().min(1),
    mode: z.enum(["clean-room", "deep"]),
    capturedAt: z.iso.date(),
    widths: z.array(z.number().int()).min(1),
    pages: z.array(z.strictObject({ name: z.string().min(1), url: z.url() })).min(1),
  }),

  color: z.strictObject({
    background: z.array(colorToken).min(1),
    text: z.array(colorToken).min(1),
    border: z.array(colorToken).default([]),
    accent: z.array(colorToken).min(1),
    semantic: z.array(colorToken).default([]),
    /** A second palette used by part of the product, e.g. light sign-in screens on a dark site. */
    alternate: z
      .strictObject({ name: z.string().min(1), appliesTo: z.string().min(1), tokens: z.array(colorToken).min(1) })
      .optional(),
  }),

  typography: z.strictObject({
    families: z.array(fontFamily).min(1),
    scale: z.array(typeStyle).min(3),
  }),

  spacing: z.strictObject({
    /** The step the layout is built on, e.g. "4px". */
    unit: z.string().min(1),
    scale: z.array(z.string().min(1)).min(3),
    containerMaxWidth: z.string().min(1),
    pageGutter: z.strictObject({ desktop: z.string().min(1), mobile: z.string().min(1) }),
    sectionGap: z.string().min(1),
  }),

  radius: z.array(token).min(1),
  shadow: z.array(token).default([]),

  layout: z.strictObject({
    breakpoints: z.array(z.string().min(1)).default([]),
    patterns: z.array(z.strictObject({ name: z.string().min(1), description: z.string().min(1) })).min(1),
    responsive: z.string().min(1),
  }),

  components: z.array(component).min(4),

  /** Measured in the browser: durations, easings and keyframes are the platform's own values. */
  motion,

  /** Multi-step journeys (sign up, log in), screen by screen. */
  flows: z.array(flow).default([]),

  /** Every page reachable from the navigation and footer, grouped by the layout it is built on. */
  templates: z.array(template).default([]),

  /** The rules an agent must follow to make a new screen feel like this platform. */
  principles: z.array(z.string().min(1)).min(3),
  avoid: z.array(z.string().min(1)).min(2),

  libraries: z.strictObject({
    /** Found in the page the platform serves. */
    detected: z.array(detectedLibrary).default([]),
    /** Our pick for rebuilding the look where nothing was detected or the original is not public. */
    recommended: z.array(library).default([]),
  }),
});

export type Print = z.infer<typeof printSchema>;
