import { CopyButton } from "./copy-button";

type Dict = { title: string; steps: { title: string; value: string }[]; copy: string; copied: string };

/** The three steps from picking a print to an agent building with it, each with the text to copy. */
export function HowTo({ dict }: { dict: Dict }) {
  return (
    <section aria-labelledby="how-to-title" className="mb-10">
      <h2 id="how-to-title" className="mt-0 mb-3 text-[15px] font-semibold">
        {dict.title}
      </h2>
      <ol className="m-0 grid list-none grid-cols-1 gap-4 p-0 lg:grid-cols-3">
        {dict.steps.map((step, index) => (
          <li key={step.title} className="panel flex min-w-0 flex-col">
            <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
              <h3 className="m-0 flex min-w-0 items-center gap-2.5 text-[14px] font-semibold">
                <span aria-hidden="true" className="code flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-line-strong text-[11px] text-fg-2">
                  {index + 1}
                </span>
                {step.title}
              </h3>
              <CopyButton value={step.value} label={dict.copy} copiedLabel={dict.copied} srLabel={step.title} />
            </div>
            <pre className="code m-0 overflow-x-auto p-4 whitespace-pre-wrap break-words text-fg">{step.value}</pre>
          </li>
        ))}
      </ol>
    </section>
  );
}
