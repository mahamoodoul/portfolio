import Link from "next/link";
import type { Project } from "@/lib/types";
import { ArchitecturePreview } from "./ArchitectureDiagram";
import { ArrowRight, ArrowUpRight, GitHub, Lock } from "./icons";
import { StatusDot, TechBadge } from "./ui";

/*
  Project card. The title link is stretched over the whole card (after:absolute inset-0),
  so the card is one click target; secondary links sit above it with `relative z-10`.
*/

function CardLinks({ project }: { project: Project }) {
  return (
    <div className="relative z-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
      <span className="inline-flex items-center gap-1.5 font-medium text-fg">
        Case study <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
      </span>
      {project.repo ? (
        <a
          href={project.repo.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg"
        >
          <GitHub width={14} height={14} /> Code
        </a>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-faint">
          <Lock width={13} height={13} /> Private repo
        </span>
      )}
      {project.live && (
        <a
          href={project.live.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg"
        >
          <ArrowUpRight width={14} height={14} /> Live site
        </a>
      )}
    </div>
  );
}

export function ProjectCard({ project, size = "default" }: { project: Project; size?: "hero" | "default" | "compact" }) {
  const hero = size === "hero";
  const compact = size === "compact";
  const stack = project.stack.slice(0, hero ? 8 : compact ? 4 : 6);

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface-hover motion-reduce:hover:translate-y-0 ${
        hero ? "lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]" : ""
      }`}
    >
      <div className={`flex flex-1 flex-col gap-5 ${compact ? "p-5" : "p-6 sm:p-7"}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-accent">{project.domain}</p>
          {project.live && (
            <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] text-ok">
              <StatusDot /> live
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <h3 className={`font-semibold tracking-tight text-fg ${hero ? "text-2xl sm:text-[1.75rem]" : "text-xl"}`}>
            <Link
              href={`/projects/${project.slug}/`}
              className="outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
            >
              {project.title}
            </Link>
          </h3>
          <p className={`leading-relaxed text-muted ${compact ? "text-sm" : "text-[15px]"}`}>{project.problem}</p>
        </div>

        {!compact && (
          <ul aria-label="Evidence" className="flex flex-wrap gap-x-4 gap-y-1.5">
            {project.evidence.map((e) => (
              <li key={e} className="inline-flex items-center gap-1.5 text-[13px] text-fg">
                <span aria-hidden className="size-1 rounded-full bg-accent" />
                {e}
              </li>
            ))}
          </ul>
        )}

        {!hero && !compact && (
          <div className="rounded-lg border border-line bg-bg/50 p-3">
            <ArchitecturePreview steps={project.preview} />
          </div>
        )}

        <ul aria-label="Technologies" className="flex flex-wrap gap-1.5">
          {stack.map((t) => (
            <li key={t}>
              <TechBadge>{t}</TechBadge>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-1">
          <CardLinks project={project} />
        </div>
      </div>

      {hero && (
        <div className="flex flex-col justify-center gap-4 border-t border-line bg-bg/40 p-6 sm:p-7 lg:border-t-0 lg:border-l">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint">data path</p>
          <ArchitecturePreview steps={project.preview} />
          <dl className="mt-2 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line font-mono text-[11px]">
            {(project.specs ?? []).map(([k, v]) => (
              <div key={k} className="flex flex-col gap-0.5 bg-surface px-3 py-2.5">
                <dt className="text-faint">{k}</dt>
                <dd className="text-fg">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </article>
  );
}
