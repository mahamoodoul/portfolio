import type { Diagram, DiagramNode } from "@/lib/types";
import { Database, Globe, Lock } from "./icons";

/*
  Data-driven architecture diagram.
  ≥ 56rem of container width: layers are columns with labelled connectors between them.
  Narrower: layers are rows (title left, nodes right) with downward connectors.
  Container queries keep it correct inside narrow case-study columns as well as full-width cards.
*/

function NodeIcon({ tone }: { tone: DiagramNode["tone"] }) {
  if (tone === "data") return <Database width={13} height={13} className="shrink-0 text-faint" />;
  if (tone === "security") return <Lock width={13} height={13} className="shrink-0 text-warn" />;
  if (tone === "external") return <Globe width={13} height={13} className="shrink-0 text-faint" />;
  return <span aria-hidden className={`size-1.5 shrink-0 rounded-full ${tone === "accent" ? "bg-accent" : "bg-line-strong"}`} />;
}

function Node({ node }: { node: DiagramNode }) {
  const tone = node.tone ?? "default";
  const border =
    tone === "accent"
      ? "border-accent/45 bg-accent-soft"
      : tone === "security"
        ? "border-warn/35 bg-warn/5"
        : tone === "external"
          ? "border-dashed border-line-strong bg-transparent"
          : "border-line-strong bg-surface-2";
  return (
    <li className={`flex min-w-0 items-start gap-2 rounded-md border px-2.5 py-2 ${border}`}>
      <span className="mt-[5px] flex">
        <NodeIcon tone={tone} />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-[13px] leading-tight font-medium text-fg">{node.label}</span>
        {node.detail && <span className="mt-0.5 font-mono text-[10.5px] leading-tight text-faint">{node.detail}</span>}
      </span>
    </li>
  );
}

function Connector({ label }: { label?: string }) {
  return (
    <div aria-hidden className="flex shrink-0 items-center justify-center">
      {/* horizontal (wide) */}
      <div className="hidden flex-col items-center gap-1 px-1 @4xl:flex">
        <svg width="44" height="10" viewBox="0 0 44 10" className="text-faint">
          <line x1="0" y1="5" x2="38" y2="5" stroke="currentColor" strokeWidth="1.2" className="flow-line" />
          <path d="M37 1.5 42 5l-5 3.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        {label && <span className="max-w-[64px] text-center font-mono text-[9.5px] leading-tight text-faint">{label}</span>}
      </div>
      {/* vertical (narrow) */}
      <div className="flex items-center gap-2 py-1 pl-[7.75rem] @4xl:hidden @max-md:pl-3">
        <svg width="10" height="22" viewBox="0 0 10 22" className="text-faint">
          <line x1="5" y1="0" x2="5" y2="16" stroke="currentColor" strokeWidth="1.2" className="flow-line" />
          <path d="M1.5 15 5 20l3.5-5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        {label && <span className="font-mono text-[10.5px] text-faint">{label}</span>}
      </div>
    </div>
  );
}

export function ArchitectureDiagram({ diagram, compact = false }: { diagram: Diagram; compact?: boolean }) {
  const { layers, edges = [], planes = [] } = diagram;
  return (
    <figure className="@container my-2">
      <div
        role="img"
        aria-label={`Architecture diagram. ${layers.map((l) => `${l.title}: ${l.nodes.map((n) => n.label).join(", ")}`).join(". Then ")}.${
          planes.length ? ` Shared: ${planes.map((p) => p.nodes.map((n) => n.label).join(", ")).join("; ")}.` : ""
        }`}
        className={`rounded-xl border border-line bg-surface ${compact ? "p-3" : "p-4 sm:p-5"} [background-image:radial-gradient(var(--color-line)_1px,transparent_1px)] [background-size:18px_18px]`}
      >
        <div className="flex flex-col @4xl:flex-row @4xl:items-stretch">
          {layers.map((layer, i) => (
            <div key={layer.title} className="contents">
              <div className="grid min-w-0 grid-cols-[7rem_1fr] items-start gap-3 @max-md:grid-cols-1 @max-md:gap-2 @4xl:flex @4xl:flex-1 @4xl:flex-col @4xl:gap-2">
                <p className="pt-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] text-muted @4xl:pt-0">
                  {layer.title}
                </p>
                <ul className="flex flex-wrap gap-2 @4xl:flex-col">
                  {layer.nodes.map((n) => (
                    <Node key={n.label} node={n} />
                  ))}
                </ul>
              </div>
              {i < layers.length - 1 && <Connector label={edges[i]} />}
            </div>
          ))}
        </div>

        {planes.map((plane) => (
          <div key={plane.title} className="mt-4 rounded-lg border border-dashed border-line-strong bg-bg/60 p-3">
            <p className="mb-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] text-muted">{plane.title}</p>
            <ul className="flex flex-wrap gap-2">
              {plane.nodes.map((n) => (
                <Node key={n.label} node={n} />
              ))}
            </ul>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 flex flex-col gap-2 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
        <span>{diagram.caption}</span>
        <span aria-hidden className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10.5px]">
          <span className="inline-flex items-center gap-1"><Database width={11} height={11} /> data</span>
          <span className="inline-flex items-center gap-1"><Lock width={11} height={11} className="text-warn" /> identity / security</span>
          <span className="inline-flex items-center gap-1"><Globe width={11} height={11} /> external</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Small left-to-right chain used on project cards. */
export function ArchitecturePreview({ steps }: { steps: string[] }) {
  return (
    <ol aria-label={`Architecture: ${steps.join(" to ")}`} className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-1.5">
          {i > 0 && (
            <svg aria-hidden width="14" height="8" viewBox="0 0 14 8" className="text-faint">
              <line x1="0" y1="4" x2="10" y2="4" stroke="currentColor" strokeWidth="1.2" />
              <path d="M9 1l3.5 3L9 7" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          )}
          <span className="rounded-md border border-line-strong bg-surface-2 px-2 py-1 font-mono text-[11px] leading-none text-fg">{s}</span>
        </li>
      ))}
    </ol>
  );
}
