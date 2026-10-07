import type { TimelineItem } from "@/lib/types";
import { TechBadge } from "./ui";

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative flex flex-col">
      {items.map((item, i) => (
        <li key={`${item.title}-${item.org}`} className="grid grid-cols-[1.25rem_1fr] gap-x-4 md:grid-cols-[10rem_1.25rem_1fr] md:gap-x-6">
          {/* period (desktop) */}
          <p className="hidden pt-0.5 text-right font-mono text-xs text-faint tabular-nums md:block">{item.period}</p>

          {/* rail */}
          <div aria-hidden className="relative flex justify-center">
            <span
              className={`relative z-10 mt-1.5 size-2.5 rounded-full border-2 ${
                item.kind === "work" ? "border-accent bg-bg" : "border-faint bg-bg"
              }`}
            />
            {i < items.length - 1 && <span className="absolute top-4 bottom-0 w-px bg-line-strong" />}
          </div>

          <div className={`flex flex-col gap-2 ${i < items.length - 1 ? "pb-10" : ""}`}>
            <p className="font-mono text-xs text-faint tabular-nums md:hidden">{item.period}</p>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-[17px] font-semibold tracking-tight text-fg">{item.title}</h3>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint">
                {item.kind === "work" ? "work" : "education"}
              </span>
            </div>
            <p className="text-sm text-muted">
              {item.org} · {item.place}
            </p>
            {item.points && (
              <ul className="mt-1 flex max-w-[64ch] flex-col gap-1.5">
                {item.points.map((p) => (
                  <li key={p} className="relative pl-4 text-[15px] leading-relaxed text-muted">
                    <span aria-hidden className="absolute top-[0.7em] left-0 h-px w-2 bg-faint" />
                    {p}
                  </li>
                ))}
              </ul>
            )}
            {item.tags && (
              <ul aria-label="Skills" className="mt-1 flex flex-wrap gap-1.5">
                {item.tags.map((t) => (
                  <li key={t}>
                    <TechBadge>{t}</TechBadge>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
