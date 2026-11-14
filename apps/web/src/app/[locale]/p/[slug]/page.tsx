import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Print } from "@denizbarish/uxprint";
import { CopyButton } from "@/components/copy-button";
import { LibraryPicker } from "@/components/library-picker";
import { EasingDemo, KeyframeDemo } from "@/components/motion-demos";
import { PrintPreview } from "@/components/print-card";
import { ReferenceViewer } from "@/components/reference-viewer";
import { ScaledFrame } from "@/components/scaled-frame";
import { getDictionary, isLocale, locales, type Dictionary } from "@/i18n/dictionaries";
import { getAllPrints, getDesignMd, getPrint } from "@/lib/prints";
import { toCardData } from "@/lib/preview";
import { getCompareScores, getReferences } from "@/references";
import type { ReferenceRegistry } from "@/references/types";
import { renderStack } from "@/lib/fonts";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => getAllPrints().map((print) => ({ locale, slug: print.slug })));
}

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const print = getPrint(slug);
  return { title: print.name, description: print.summary };
}

const sectionIds = ["overview", "color", "typography", "space", "components", "motion", "pages", "flows", "libraries", "agent"] as const;

function familyFor(print: Print, role: Print["typography"]["scale"][number]["family"]): string {
  const family = print.typography.families.find((entry) => entry.role === role) ?? print.typography.families[0]!;
  return renderStack(family);
}

export default async function PrintPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return null;
  const dict = getDictionary(locale);
  const print = getPrint(slug);
  const references = getReferences(slug);
  const scores = getCompareScores(slug);
  // A print recorded before page templates existed has no Pages section.
  const sections = sectionIds.filter((id) => id !== "pages" || print.templates.length > 0);
  const designMd = getDesignMd(print);
  const card = toCardData(print);

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12">
        <aside className="lg:sticky lg:top-14 lg:h-[calc(100vh-56px)] lg:py-8">
          <nav aria-label={dict.onThisPage} className="flex flex-col gap-4 pt-6 lg:pt-0">
            <Link href={`/${locale}/`} className="text-[13px] text-fg-3 hover:text-fg">
              <span aria-hidden="true">← </span>
              {dict.backToGallery}
            </Link>
            <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0 lg:flex-col lg:gap-0.5">
              {sections.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="chip lg:flex lg:h-8 lg:rounded-md lg:border-transparent lg:bg-transparent lg:px-2 lg:hover:bg-sunken"
                  >
                    {dict.sections[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main id="main" className="min-w-0 pt-2 pb-24 lg:pt-8">
          <header className="flex flex-col gap-6 border-b border-line pb-8 md:flex-row md:items-start md:justify-between">
            <div className="flex min-w-0 flex-col gap-3">
              <h1 className="m-0 text-[32px] leading-tight font-semibold tracking-[-0.02em]">{print.name}</h1>
              <p className="m-0 max-w-[62ch] text-[15px] text-fg-2">{print.summary}</p>
              <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
                <li className="chip cursor-default">{dict.categories[print.category]}</li>
                <li className="chip cursor-default">{dict.themes[print.theme]}</li>
                {print.tags.map((tag) => (
                  <li key={tag} className="chip cursor-default font-mono text-[12px]">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full flex-none overflow-hidden rounded-[10px] border border-line md:w-[320px]">
              <PrintPreview preview={card.preview} name={print.name} />
            </div>
          </header>

          {references ? (
            <div className="border-b border-line py-8">
              <h2 className="mt-0 mb-4 text-[18px] font-semibold">{dict.preview.title}</h2>
              <ReferenceViewer
                slug={slug}
                locale={locale}
                screens={references.screens.map(({ id, title, url, survey }) => ({ id, title, url, fullPage: Boolean(survey), scores: scores[id] }))}
                labels={dict.preview}
              />
            </div>
          ) : null}

          <Section id="overview" title={dict.sections.overview}>
            <Overview print={print} dict={dict} />
          </Section>
          <Section id="color" title={dict.sections.color}>
            <Colors print={print} dict={dict} />
          </Section>
          <Section id="typography" title={dict.sections.typography}>
            <Typography print={print} dict={dict} />
          </Section>
          <Section id="space" title={dict.sections.space}>
            <Space print={print} dict={dict} />
          </Section>
          <Section id="components" title={dict.sections.components}>
            <Components print={print} dict={dict} references={references} />
          </Section>
          <Section id="motion" title={dict.sections.motion}>
            <Motion print={print} dict={dict} />
          </Section>
          {print.templates.length ? (
            <Section id="pages" title={dict.sections.pages}>
              <Pages print={print} dict={dict} references={references} />
            </Section>
          ) : null}
          <Section id="flows" title={dict.sections.flows}>
            <Flows print={print} dict={dict} references={references} />
          </Section>
          <Section id="libraries" title={dict.sections.libraries}>
            <LibraryPicker
              detected={print.libraries.detected}
              recommended={print.libraries.recommended}
              labels={{ ...dict.libraries, copy: dict.agent.copy, copied: dict.agent.copied }}
            />
          </Section>
          <Section id="agent" title={dict.sections.agent}>
            <SendToAgent print={print} dict={dict} designMd={designMd} />
          </Section>
        </main>
      </div>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 border-b border-line py-10 last:border-b-0">
      <h2 id={`${id}-title`} className="mt-0 mb-6 text-[22px] font-semibold tracking-[-0.015em]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="mt-0 mb-3 text-[15px] font-semibold">{children}</h3>;
}

/* ------------------------------------------------------------------ overview */

function Overview({ print, dict }: { print: Print; dict: Dictionary }) {
  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
      <div>
        <SubHeading>{dict.overview.principles}</SubHeading>
        <ol className="m-0 flex flex-col gap-2.5 pl-5 text-[14px] text-fg-2 marker:text-fg-3">
          {print.principles.map((principle) => (
            <li key={principle} className="pl-1">
              {principle}
            </li>
          ))}
        </ol>
      </div>
      <div className="flex flex-col gap-8">
        <div>
          <SubHeading>{dict.overview.avoid}</SubHeading>
          <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[14px] text-fg-2">
            {print.avoid.map((item) => (
              <li key={item} className="flex gap-2.5">
                <svg className="mt-[3px] flex-none text-fg-3" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SubHeading>{dict.overview.source}</SubHeading>
          <table className="data-table">
            <tbody>
              <tr>
                <td>{dict.overview.pages}</td>
                <td>
                  <ul className="m-0 flex list-none flex-col gap-1 p-0">
                    {print.source.pages.map((page) => (
                      <li key={page.url}>
                        <span className="text-fg">{page.name}</span>{" "}
                        <span className="code break-all text-fg-3">{page.url}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td>{dict.overview.captured}</td>
                <td className="code">{print.source.capturedAt}</td>
              </tr>
              <tr>
                <td>{dict.overview.widths}</td>
                <td className="code">{print.source.widths.join(", ")}</td>
              </tr>
              <tr>
                <td>{dict.overview.mode}</td>
                <td className="code">{print.source.mode}</td>
              </tr>
              <tr>
                <td>{dict.overview.tool}</td>
                <td className="code">{print.source.tool}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="xl:col-span-2">
        <SubHeading>{dict.overview.layout}</SubHeading>
        <dl className="m-0 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
          {print.layout.patterns.map((pattern) => (
            <div key={pattern.name} className="border-t border-line pt-3">
              <dt className="text-[14px] font-medium">{pattern.name}</dt>
              <dd className="m-0 mt-1 text-[13px] text-fg-2">{pattern.description}</dd>
            </div>
          ))}
          <div className="border-t border-line pt-3 md:col-span-2">
            <dt className="text-[14px] font-medium">{dict.overview.responsive}</dt>
            <dd className="m-0 mt-1 text-[13px] text-fg-2">{print.layout.responsive}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ color */

type ColorToken = { name: string; value: string; use: string };

function Swatches({ tokens, dict }: { tokens: ColorToken[]; dict: Dictionary }) {
  return (
    <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 xl:grid-cols-4">
      {tokens.map((token) => (
        <li key={`${token.name}-${token.value}`} className="panel flex flex-col overflow-hidden">
          <div
            className="h-16 border-b border-line"
            style={{
              background: `linear-gradient(${token.value}, ${token.value}), repeating-conic-gradient(#d9d9d9 0 25%, #ffffff 0 50%) 0 0 / 12px 12px`,
            }}
          />
          <div className="flex flex-1 flex-col gap-1 p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-[13px] font-medium">{token.name}</span>
              <CopyButton
                value={token.value}
                label={token.value}
                copiedLabel={dict.color.copied}
                srLabel={`${dict.color.copy} ${token.name}`}
                className="code -mr-1 rounded px-1 py-0.5 text-fg-2 hover:bg-sunken hover:text-fg"
              />
            </div>
            <p className="m-0 text-[12px] leading-snug text-fg-3">{token.use}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Colors({ print, dict }: { print: Print; dict: Dictionary }) {
  const groups = (["background", "text", "border", "accent", "semantic"] as const).filter((key) => print.color[key].length > 0);
  const alternate = print.color.alternate;
  return (
    <div className="flex flex-col gap-8">
      {groups.map((key) => (
        <div key={key}>
          <SubHeading>{dict.groups[key]}</SubHeading>
          <Swatches tokens={print.color[key]} dict={dict} />
        </div>
      ))}
      {alternate ? (
        <div className="border-t border-line pt-6">
          <SubHeading>
            {dict.color.alternate}: {alternate.name}
          </SubHeading>
          <p className="mt-0 mb-4 text-[13px] text-fg-2">{alternate.appliesTo}</p>
          <Swatches tokens={alternate.tokens} dict={dict} />
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ typography */

function Typography({ print, dict }: { print: Print; dict: Dictionary }) {
  const canvas = print.color.background[0]!.value;
  const text = print.color.text[0]!.value;
  const muted = print.color.text[2]?.value ?? text;
  const features = print.typography.families.find((family) => family.role === "sans")?.features;
  return (
    <div className="flex flex-col gap-8">
      <div>
        <SubHeading>{dict.type.families}</SubHeading>
        <table className="data-table">
          <thead>
            <tr>
              <th scope="col">{dict.motion.name}</th>
              <th scope="col">Stack</th>
              <th scope="col">{dict.type.substitute}</th>
            </tr>
          </thead>
          <tbody>
            {print.typography.families.map((family) => (
              <tr key={family.role}>
                <td className="code">{family.role}</td>
                <td className="code break-all">
                  {family.stack}
                  {family.features ? (
                    <span className="mt-1 block text-fg-3">
                      {dict.type.features}: {family.features}
                    </span>
                  ) : null}
                </td>
                <td>
                  {family.substitute.name}
                  <span className="block text-[12px] text-fg-3">
                    {family.substitute.source}
                    {family.substitute.note ? ` · ${family.substitute.note}` : ""}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <SubHeading>{dict.type.scale}</SubHeading>
        <ol className="m-0 flex list-none flex-col overflow-hidden rounded-[10px] border border-line p-0" style={{ background: canvas, color: text }}>
          {print.typography.scale.map((style) => (
            <li key={style.name} className="flex flex-col gap-2 border-b px-5 py-5 last:border-b-0" style={{ borderColor: print.color.border[0]?.value ?? muted }}>
              <p
                className="m-0 overflow-hidden text-ellipsis whitespace-nowrap"
                style={{
                  fontFamily: familyFor(print, style.family),
                  fontSize: style.size,
                  fontWeight: style.weight,
                  lineHeight: style.lineHeight ?? "normal",
                  letterSpacing: style.tracking ?? "normal",
                  fontFeatureSettings: style.family === "mono" ? undefined : features,
                }}
              >
                {dict.type.sample}
              </p>
              <p className="m-0 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11.5px]" style={{ color: muted }}>
                <span style={{ color: text }}>{style.name}</span>
                <span>{style.size}</span>
                <span>{style.weight}</span>
                <span>lh {style.lineHeight ?? "normal"}</span>
                <span>ls {style.tracking ?? "normal"}</span>
                <span className="font-sans">{style.use}</span>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ space */

function Space({ print, dict }: { print: Print; dict: Dictionary }) {
  const canvas = print.color.background[0]!.value;
  const panel = print.color.background[1]?.value ?? canvas;
  return (
    <div className="flex flex-col gap-10">
      <div>
        <SubHeading>{dict.space.spacing}</SubHeading>
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          {print.spacing.scale.map((step) => (
            <li key={step} className="flex items-center gap-4">
              <span className="code w-14 flex-none text-fg-2">{step}</span>
              <span className="h-3 rounded-sm bg-fg" style={{ width: step }} />
            </li>
          ))}
        </ul>
        <table className="data-table mt-5">
          <tbody>
            <tr>
              <td>{dict.space.unit}</td>
              <td className="code">{print.spacing.unit}</td>
            </tr>
            <tr>
              <td>{dict.space.container}</td>
              <td>{print.spacing.containerMaxWidth}</td>
            </tr>
            <tr>
              <td>{dict.space.gutter}</td>
              <td>
                {dict.space.desktop}: {print.spacing.pageGutter.desktop} · {dict.space.mobile}: {print.spacing.pageGutter.mobile}
              </td>
            </tr>
            <tr>
              <td>{dict.space.sectionGap}</td>
              <td>{print.spacing.sectionGap}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <SubHeading>{dict.space.radius}</SubHeading>
        <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-4">
          {print.radius.map((token) => (
            <li key={token.name} className="panel flex flex-col gap-3 p-4">
              <span className="h-14 w-24 border-[1.5px] border-fg bg-sunken" style={{ borderRadius: token.value }} />
              <span className="flex items-baseline justify-between gap-2">
                <span className="text-[13px] font-medium">{token.name}</span>
                <span className="code text-fg-2">{token.value}</span>
              </span>
              <span className="text-[12px] text-fg-3">{token.use}</span>
            </li>
          ))}
        </ul>
      </div>
      {print.shadow.length ? (
        <div>
          <SubHeading>{dict.space.shadow}</SubHeading>
          <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 xl:grid-cols-3">
            {print.shadow.map((token) => (
              <li key={token.name} className="panel overflow-hidden">
                <div className="grid h-32 place-items-center" style={{ background: canvas }}>
                  <span className="h-14 w-28 rounded-[10px]" style={{ background: panel, boxShadow: token.value }} />
                </div>
                <div className="flex flex-col gap-1 border-t border-line p-3">
                  <span className="text-[13px] font-medium">{token.name}</span>
                  <span className="code break-all text-[11.5px] text-fg-2">{token.value}</span>
                  <span className="text-[12px] text-fg-3">
                    {token.use}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ components */

function Components({ print, dict, references }: { print: Print; dict: Dictionary; references?: ReferenceRegistry }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-6 p-0">
      {print.components.map((component) => {
        const live = references?.components[component.name];
        const frame = live ? frameFor(print.slug, live, references) : null;
        return (
          <li key={component.name} className="panel overflow-hidden">
            <div className="flex flex-col gap-1 border-b border-line px-5 py-4">
              <h3 className="m-0 text-[16px] font-semibold">{component.name}</h3>
              <p className="m-0 text-[13px] text-fg-2">
                <span className="sr-only">{dict.components.anatomy}: </span>
                {component.anatomy}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 p-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div className="min-w-0">
                <h4 className="mt-0 mb-2 text-[13px] font-medium text-fg-3">{dict.components.spec}</h4>
                <table className="data-table">
                  <tbody>
                    {Object.entries(component.spec).map(([key, value]) => (
                      <tr key={key}>
                        <td className="w-[34%]">{key}</td>
                        <td className="code break-words">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="min-w-0">
                <h4 className="mt-0 mb-2 text-[13px] font-medium text-fg-3">{dict.components.states}</h4>
                {component.states.length ? (
                  <table className="data-table">
                    <tbody>
                      {component.states.map((state) => (
                        <tr key={state.name}>
                          <td className="w-[34%]">{state.name}</td>
                          <td className="code break-words">{state.change}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="m-0 text-[13px] text-fg-3">{dict.components.noStates}</p>
                )}
                {component.notes ? <p className="mt-3 mb-0 text-[13px] text-fg-2">{component.notes}</p> : null}
              </div>
            </div>
            {frame ? (
              <div className="border-t border-line p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h4 className="m-0 text-[13px] font-medium text-fg-3">{dict.components.live}</h4>
                  <a className="btn" href={frame.src} target="_blank" rel="noreferrer">
                    {dict.components.openScreen}
                  </a>
                </div>
                <ScaledFrame src={frame.src} width={frame.width} height={frame.height} title={`${component.name}: ${dict.components.live}`} />
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

function frameFor(slug: string, live: { screen: string; part?: string }, references?: ReferenceRegistry) {
  if (!references?.screens.some((screen) => screen.id === live.screen)) return null;
  const base = `/ref/${slug}/${live.screen}/`;
  if (!live.part) return { src: base, width: 1440, height: 900 };
  if (live.part === "header") return { src: `${base}?part=header`, width: 1440, height: 420 };
  return { src: `${base}?part=${live.part}`, width: 960, height: 260 };
}

/* ------------------------------------------------------------------ motion */

function Motion({ print, dict }: { print: Print; dict: Dictionary }) {
  const { durations, easings, transitions, keyframes, unmeasured } = print.motion;
  const labels = { play: dict.motion.play, copyCss: dict.motion.copyCss, copied: dict.agent.copied };
  return (
    <div className="flex flex-col gap-10">
      {durations.length ? (
        <div>
          <SubHeading>{dict.motion.durations}</SubHeading>
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">{dict.motion.name}</th>
                <th scope="col">{dict.motion.value}</th>
                <th scope="col">{dict.motion.use}</th>
              </tr>
            </thead>
            <tbody>
              {durations.map((token) => (
                <tr key={token.name}>
                  <td>{token.name}</td>
                  <td className="code">{token.value}</td>
                  <td>{token.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {easings.length ? (
        <div>
          <SubHeading>{dict.motion.easings}</SubHeading>
          <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 lg:grid-cols-2">
            {easings.map((token) => (
              <li key={token.name} className="panel flex flex-col gap-3 p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-[14px] font-medium">{token.name}</span>
                  <span className="code text-fg-2">{token.value}</span>
                </div>
                <EasingDemo name={token.name} value={token.value} playLabel={dict.motion.play} />
                <p className="m-0 text-[12px] text-fg-3">{token.use}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {transitions.length ? (
        <div className="overflow-x-auto">
          <SubHeading>{dict.motion.transitions}</SubHeading>
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">{dict.motion.target}</th>
                <th scope="col">{dict.motion.properties}</th>
                <th scope="col">{dict.motion.duration}</th>
                <th scope="col">{dict.motion.easing}</th>
              </tr>
            </thead>
            <tbody>
              {transitions.map((transition) => (
                <tr key={`${transition.target}-${transition.properties}`}>
                  <td>{transition.target}</td>
                  <td>{transition.properties}</td>
                  <td className="code">{transition.duration}</td>
                  <td className="code break-all">{transition.easing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {keyframes.length ? (
        <div>
          <SubHeading>{dict.motion.keyframes}</SubHeading>
          <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 lg:grid-cols-2">
            {keyframes.map((keyframe) => (
              <li key={keyframe.name} className="panel flex flex-col gap-3 p-4">
                <div className="flex flex-col gap-1">
                  <span className="code text-[13px] font-medium text-fg">{keyframe.name}</span>
                  <span className="text-[12px] text-fg-3">{keyframe.use}</span>
                </div>
                <KeyframeDemo scope={print.slug} name={keyframe.name} css={keyframe.css} timing={keyframe.timing} labels={labels} />
                <pre className="code m-0 overflow-x-auto rounded-md bg-sunken p-3 text-[12px] whitespace-pre-wrap text-fg-2">{keyframe.css}</pre>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {unmeasured.length ? (
        <div>
          <SubHeading>{dict.motion.unmeasured}</SubHeading>
          <ul className="m-0 flex flex-col gap-2 pl-5 text-[13px] text-fg-2">
            {unmeasured.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ flows */

/** Every page of the platform, grouped by the layout it is built on. */
function Pages({ print, dict, references }: { print: Print; dict: Dictionary; references?: ReferenceRegistry }) {
  const origin = new URL(print.url).origin;
  return (
    <div className="flex flex-col gap-10">
      {print.templates.map((template) => {
        const screen = references?.screens.find((entry) => entry.template === template.id);
        return (
          <article key={template.id} className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h3 className="m-0 text-[17px] font-semibold">{template.name}</h3>
              <span className="font-mono text-[12px] text-fg-3">
                {template.pages.length} {template.pages.length === 1 ? dict.pages.one : dict.pages.many}
              </span>
              {screen ? (
                <a className="btn ml-auto" href={`/ref/${print.slug}/${screen.id}/`} target="_blank" rel="noreferrer">
                  {dict.pages.openLive}
                </a>
              ) : null}
            </div>
            <p className="m-0 max-w-[72ch] text-[14px] text-fg-2">{template.use}</p>
            <ol className="m-0 flex max-w-[80ch] list-decimal flex-col gap-1.5 pl-5 text-[13px] text-fg-2">
              {template.structure.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
            <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
              {template.pages.map((path) => (
                <li key={path}>
                  <a className="chip font-mono text-[12px]" href={origin + path} target="_blank" rel="noreferrer noopener">
                    {path}
                  </a>
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
}

function Flows({ print, dict, references }: { print: Print; dict: Dictionary; references?: ReferenceRegistry }) {
  if (!print.flows.length) return <p className="m-0 text-[14px] text-fg-3">{dict.flows.notRecorded}</p>;
  return (
    <div className="flex flex-col gap-10">
      {print.flows.map((flow) => (
        <article key={flow.name} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="m-0 text-[17px] font-semibold">{flow.name}</h3>
            <p className="m-0 text-[13px] text-fg-2">
              <span className="text-fg-3">{dict.flows.entry}: </span>
              <span className="code">{flow.entry}</span>
            </p>
            <p className="m-0 text-[13px] text-fg-2">
              <span className="text-fg-3">{dict.flows.layout}: </span>
              {flow.layout}
            </p>
          </div>
          <ol className="m-0 flex list-none flex-col gap-4 p-0">
            {flow.steps.map((step, index) => {
              const screen = references?.screens.find((entry) => entry.flow === flow.name && entry.step === step.name);
              return (
                <li key={step.name} className="panel grid grid-cols-1 gap-5 p-5 xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
                  <div className="flex min-w-0 flex-col gap-3">
                    <h4 className="m-0 flex items-baseline gap-2 text-[15px] font-semibold">
                      <span className="code text-fg-3">
                        {dict.flows.step} {index + 1}
                      </span>
                      {step.name}
                    </h4>
                    <div>
                      <p className="mt-0 mb-1 text-[12px] font-medium text-fg-3">{dict.flows.screen}</p>
                      <ol className="m-0 flex flex-col gap-1 pl-5 text-[13px] text-fg-2">
                        {step.screen.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ol>
                    </div>
                    {step.actions.length ? (
                      <div>
                        <p className="mt-0 mb-1 text-[12px] font-medium text-fg-3">{dict.flows.actions}</p>
                        <ul className="m-0 flex flex-col gap-1 pl-5 text-[13px] text-fg-2">
                          {step.actions.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {step.validation ? (
                      <div>
                        <p className="mt-0 mb-1 text-[12px] font-medium text-fg-3">{dict.flows.validation}</p>
                        <p className="m-0 text-[13px] text-fg-2">{step.validation}</p>
                      </div>
                    ) : null}
                  </div>
                  {screen ? (
                    <ScaledFrame src={`/ref/${print.slug}/${screen.id}/`} width={1440} height={900} title={`${flow.name}: ${step.name}`} />
                  ) : null}
                </li>
              );
            })}
          </ol>
          {flow.notRecorded ? (
            <div className="flex gap-3 rounded-[10px] border border-dashed border-line-strong p-4">
              <svg className="mt-0.5 flex-none text-fg-3" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 2.5a5.5 5.5 0 1 0 0 11a5.5 5.5 0 1 0 0-11ZM4.2 11.8l7.6-7.6" stroke="currentColor" strokeWidth="1.4" />
              </svg>
              <div>
                <p className="m-0 text-[13px] font-medium">{dict.flows.notRecorded}</p>
                <p className="m-0 text-[13px] text-fg-2">{flow.notRecorded}</p>
              </div>
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ send to agent */

function CopyBlock({ title, value, dict, children }: { title: string; value: string; dict: Dictionary; children?: ReactNode }) {
  return (
    <div className="panel flex min-w-0 flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <h3 className="m-0 text-[14px] font-semibold">{title}</h3>
        <CopyButton value={value} label={dict.agent.copy} copiedLabel={dict.agent.copied} srLabel={title} />
      </div>
      {children ?? <pre className="code m-0 overflow-x-auto p-4 whitespace-pre-wrap break-words text-fg">{value}</pre>}
    </div>
  );
}

function SendToAgent({ print, dict, designMd }: { print: Print; dict: Dictionary; designMd: string }) {
  const cli = `npx @denizbarish/uxprint add ${print.slug}`;
  const mcp = JSON.stringify({ mcpServers: { uxprint: { command: "npx", args: ["-y", "@denizbarish/uxprint", "mcp"] } } }, null, 2);
  const prompt = dict.agent.promptText(print.name, print.slug);
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <CopyBlock title={dict.agent.cli} value={cli} dict={dict} />
        <CopyBlock title={dict.agent.prompt} value={prompt} dict={dict} />
        <CopyBlock title={dict.agent.mcp} value={mcp} dict={dict} />
        <div className="panel flex flex-col">
          <div className="border-b border-line px-4 py-2.5">
            <h3 className="m-0 text-[14px] font-semibold">{dict.agent.files}</h3>
          </div>
          <ul className="m-0 flex list-none flex-col gap-2 p-4">
            {["DESIGN.md", "print.json"].map((file) => (
              <li key={file}>
                <a className="code text-fg underline decoration-line-strong underline-offset-2 hover:decoration-fg" href={`/p/${print.slug}/${file}`}>
                  /p/{print.slug}/{file}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <CopyBlock title={dict.agent.designMd} value={designMd} dict={dict}>
        <pre className="code m-0 max-h-[420px] overflow-auto p-4 text-[12px] whitespace-pre-wrap break-words text-fg-2" tabIndex={0}>
          {designMd}
        </pre>
      </CopyBlock>
    </div>
  );
}

