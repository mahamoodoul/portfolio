import Link from "next/link";
import type { Project } from "@/lib/types";
import { Blocks } from "./Blocks";
import { ArrowLeft, ArrowRight, ArrowUpRight, GitHub, Lock } from "./icons";
import { Container, StatusDot, TechBadge } from "./ui";

export function ProjectCaseStudy({ project, prev, next }: { project: Project; prev?: Project; next?: Project }) {
  return (
    <article>
      {/* Header */}
      <header className="border-b border-line">
        <Container className="flex flex-col gap-8 py-12 sm:py-16">
          <Link href="/#projects" className="inline-flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
            <ArrowLeft /> All projects
          </Link>

          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">{project.domain}</p>
              {project.live && (
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-ok">
                  <StatusDot /> live
                </span>
              )}
            </div>
            <h1 className="text-4xl font-semibold tracking-[-0.02em] text-fg sm:text-5xl">{project.title}</h1>
            <p className="max-w-[70ch] text-lg leading-relaxed text-muted">{project.summary}</p>
          </div>

          <ul aria-label="Highlights" className="flex flex-wrap gap-2">
            {project.evidence.map((e) => (
              <li key={e}>
                <TechBadge tone="accent">{e}</TechBadge>
              </li>
            ))}
          </ul>

          <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line text-sm sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-1 bg-surface p-4">
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint">Context</dt>
              <dd className="text-fg">{project.context}</dd>
            </div>
            <div className="flex flex-col gap-1 bg-surface p-4">
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint">Period</dt>
              <dd className="text-fg tabular-nums">{project.period}</dd>
            </div>
            <div className="flex flex-col gap-1 bg-surface p-4 sm:col-span-2">
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint">Links</dt>
              <dd className="flex flex-wrap gap-x-5 gap-y-1.5">
                {project.repo && (
                  <a href={project.repo.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-fg hover:text-accent-strong">
                    <GitHub width={14} height={14} /> {project.repo.label}
                  </a>
                )}
                {project.live && (
                  <a href={project.live.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-fg hover:text-accent-strong">
                    <ArrowUpRight width={14} height={14} /> {project.live.label}
                  </a>
                )}
                {project.related?.map((r) => (
                  <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-fg hover:text-accent-strong">
                    <GitHub width={14} height={14} /> {r.label}
                  </a>
                ))}
                {!project.repo && (
                  <span className="inline-flex items-center gap-1.5 text-faint">
                    <Lock width={13} height={13} /> Private repository
                  </span>
                )}
              </dd>
            </div>
          </dl>

          {project.privateNote && <p className="max-w-[70ch] text-sm text-faint">{project.privateNote}</p>}

          <div>
            <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint">Stack</p>
            <ul aria-label="Technologies" className="flex flex-wrap gap-1.5">
              {project.stack.map((t) => (
                <li key={t}>
                  <TechBadge>{t}</TechBadge>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </header>

      {/* Body */}
      <Container className="grid grid-cols-[minmax(0,1fr)] gap-10 py-12 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-14 lg:py-16">
        <nav aria-label="On this page" className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint">On this page</p>
          <ol className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-l lg:border-line lg:px-0">
            {project.sections.map((s) => (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  className="block rounded-md border border-line px-3 py-1.5 text-[13px] whitespace-nowrap text-muted transition-colors hover:text-fg lg:-ml-px lg:rounded-none lg:border-0 lg:border-l lg:border-transparent lg:py-1.5 lg:pl-4 lg:hover:border-faint"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex min-w-0 flex-col">
          {project.sections.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              aria-labelledby={`${s.id}-title`}
              className={`scroll-mt-24 ${i === 0 ? "" : "mt-14 border-t border-line pt-14"}`}
            >
              <h2 id={`${s.id}-title`} className="mb-6 text-2xl font-semibold tracking-tight text-fg">
                {s.title}
              </h2>
              <Blocks blocks={s.blocks} />
            </section>
          ))}

          {(project.repo || project.live) && (
            <section aria-labelledby="source-title" className="mt-14 border-t border-line pt-14">
              <h2 id="source-title" className="mb-6 text-2xl font-semibold tracking-tight text-fg">
                Source
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.repo && (
                  <a
                    href={project.repo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-fg px-4 text-sm font-medium text-bg hover:opacity-90"
                  >
                    <GitHub /> View on GitHub
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-lg border border-line-strong bg-surface px-4 text-sm font-medium text-fg hover:border-faint"
                  >
                    <ArrowUpRight /> Open {project.live.label}
                  </a>
                )}
              </div>
            </section>
          )}
        </div>
      </Container>

      {/* Prev / next */}
      <Container>
        <nav aria-label="More projects" className="grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
          {prev ? (
            <Link href={`/projects/${prev.slug}/`} className="group flex flex-col gap-1 rounded-xl border border-line bg-surface p-5 transition-colors hover:border-line-strong">
              <span className="inline-flex items-center gap-1.5 text-xs text-faint">
                <ArrowLeft width={13} height={13} /> Previous
              </span>
              <span className="font-medium text-fg">{prev.title}</span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {next && (
            <Link
              href={`/projects/${next.slug}/`}
              className="group flex flex-col gap-1 rounded-xl border border-line bg-surface p-5 text-right transition-colors hover:border-line-strong sm:items-end"
            >
              <span className="inline-flex items-center gap-1.5 text-xs text-faint">
                Next <ArrowRight width={13} height={13} />
              </span>
              <span className="font-medium text-fg">{next.title}</span>
            </Link>
          )}
        </nav>
      </Container>
    </article>
  );
}
