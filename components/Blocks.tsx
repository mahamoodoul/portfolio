import type { Block } from "@/lib/types";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

/* Renders the typed content blocks of a case-study section. */

function SequenceDiagram({ caption, steps }: { caption: string; steps: { from: string; to: string; label: string }[] }) {
  return (
    <figure className="rounded-xl border border-line bg-surface">
      <figcaption className="border-b border-line px-4 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
        {caption}
      </figcaption>
      <ol className="divide-y divide-line">
        {steps.map((s, i) => (
          <li
            key={i}
            className="grid grid-cols-[2rem_1fr] gap-x-3 gap-y-1 px-4 py-3 sm:grid-cols-[2rem_minmax(0,15rem)_1fr] sm:items-baseline"
          >
            <span className="font-mono text-[11px] text-faint tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <span className="flex flex-wrap items-center gap-1.5 font-mono text-[12px] text-fg">
              <span>{s.from}</span>
              <span aria-label="to" className="text-accent">
                →
              </span>
              <span>{s.to}</span>
            </span>
            <span className="col-start-2 text-sm text-muted sm:col-start-3">{s.label}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

function Metrics({ items, source }: { items: { value: string; label: string; note?: string }[]; source?: string }) {
  return (
    <div>
      <dl className="grid grid-cols-2 overflow-hidden rounded-xl border border-line bg-line [gap:1px] md:grid-cols-4">
        {items.map((m) => (
          <div key={m.label} className="flex flex-col gap-1 bg-surface p-4">
            <dt className="order-2 text-sm text-muted">{m.label}</dt>
            <dd className="order-1 text-2xl font-semibold tracking-tight text-fg tabular-nums">{m.value}</dd>
            {m.note && <dd className="order-3 text-xs leading-snug text-faint">{m.note}</dd>}
          </div>
        ))}
      </dl>
      {source && <p className="mt-2 text-xs text-faint">{source}</p>}
    </div>
  );
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i} className="max-w-[68ch] text-[15.5px] leading-relaxed text-muted">
                {b.text}
              </p>
            );
          case "list":
            return (
              <ul key={i} className="flex max-w-[68ch] flex-col gap-2.5">
                {b.items.map((item) => (
                  <li key={item} className="relative pl-5 text-[15.5px] leading-relaxed text-muted">
                    <span aria-hidden className="absolute top-[0.7em] left-0 h-px w-2.5 bg-faint" />
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "diagram":
            return <ArchitectureDiagram key={i} diagram={b.diagram} />;
          case "sequence":
            return <SequenceDiagram key={i} caption={b.caption} steps={b.steps} />;
          case "metrics":
            return <Metrics key={i} items={b.items} source={b.source} />;
          case "decisions":
            return (
              <dl key={i} className="flex flex-col divide-y divide-line border-y border-line">
                {b.items.map((d) => (
                  <div key={d.title} className="grid gap-1.5 py-4 md:grid-cols-[minmax(0,17rem)_1fr] md:gap-8">
                    <dt className="font-medium text-fg">{d.title}</dt>
                    <dd className="text-[15px] leading-relaxed text-muted">{d.body}</dd>
                  </div>
                ))}
              </dl>
            );
          case "code":
            return (
              <figure key={i} className="overflow-hidden rounded-xl border border-line bg-surface">
                <figcaption className="flex items-center justify-between gap-4 border-b border-line px-4 py-2.5">
                  <span className="text-xs text-muted">{b.caption}</span>
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-faint">{b.lang}</span>
                </figcaption>
                <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-fg">
                  <code>{b.code}</code>
                </pre>
              </figure>
            );
          case "table":
            return (
              <figure key={i}>
                {b.caption && <figcaption className="mb-3 text-sm text-faint">{b.caption}</figcaption>}
                <div className="overflow-x-auto rounded-xl border border-line">
                  <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
                    <thead className="bg-surface">
                      <tr>
                        {b.head.map((h) => (
                          <th key={h} scope="col" className="border-b border-line px-4 py-2.5 font-mono text-[11px] font-medium uppercase tracking-wider text-muted">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {b.rows.map((row) => (
                        <tr key={row.join("|")} className="border-b border-line last:border-0">
                          {row.map((cell, j) => (
                            <td key={j} className={`px-4 py-3 align-top ${j === 0 ? "font-medium text-fg" : "text-muted"} ${j === row.length - 1 ? "tabular-nums" : ""}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </figure>
            );
        }
      })}
    </div>
  );
}
