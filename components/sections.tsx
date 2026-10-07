import { certifications, publications, stack, timeline } from "@/data/experience";
import { profile } from "@/data/profile";
import { moreWork, projects } from "@/data/projects";
import { CopyEmail } from "./CopyEmail";
import { ArrowRight, ArrowUpRight, Download, GitHub, LinkedIn, Mail } from "./icons";
import { ProjectCard } from "./ProjectCard";
import { Timeline } from "./Timeline";
import { ButtonLink, Container, Eyebrow, SectionHeading, StatusDot, TechBadge } from "./ui";

/* ---------------------------------- Hero ---------------------------------- */

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="border-b border-line">
      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:py-24">
        <div className="flex flex-col gap-6">
          <p className="inline-flex w-fit flex-wrap items-center gap-x-2 gap-y-1 rounded-2xl border border-line bg-surface px-3 py-1.5 text-[13px] text-muted sm:rounded-full">
            <StatusDot />
            <span className="text-fg">{profile.location}</span>
            <span aria-hidden className="hidden text-faint sm:inline">·</span>
            <span className="basis-full sm:basis-auto">Open to software, cloud and data engineering roles</span>
          </p>

          <h1 id="hero-title" className="text-[2.35rem] leading-[1.08] font-semibold tracking-[-0.025em] text-fg sm:text-5xl lg:text-[3.5rem]">
            I build secure, scalable software and cloud systems.
          </h1>

          <p className="max-w-[56ch] text-lg leading-relaxed text-muted">
            Software engineer based in Oslo, working across{" "}
            <span className="text-fg">backend engineering</span>, <span className="text-fg">cloud</span>,{" "}
            <span className="text-fg">data platforms</span> and <span className="text-fg">application security</span>.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <ButtonLink href="/#projects" variant="primary">
              Explore my work <ArrowRight />
            </ButtonLink>
            <ButtonLink href={profile.github} external>
              <GitHub /> View GitHub
            </ButtonLink>
            <ButtonLink href={profile.resume} download>
              <Download /> Download resume
            </ButtonLink>
          </div>
        </div>

        <ProfilePanel />
      </Container>
    </section>
  );
}

function ProfilePanel() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-panel">
      <div className="flex items-center gap-4 border-b border-line p-5 sm:p-6">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, image is pre-sized */}
        <img
          src="/mahamodul.jpg"
          alt={`Portrait of ${profile.name}`}
          width={240}
          height={240}
          fetchPriority="high"
          className="size-16 shrink-0 rounded-xl border border-line-strong object-cover sm:size-20"
        />
        <div className="flex min-w-0 flex-col gap-1">
          <p className="font-semibold tracking-tight text-fg">{profile.name}</p>
          <p className="text-sm text-muted">{profile.role} · {profile.location}</p>
          <p className="font-mono text-[11px] text-faint">~/profile.yaml</p>
        </div>
      </div>
      <dl className="flex flex-col gap-3 p-5 font-mono text-[12.5px] leading-relaxed sm:p-6">
        {profile.facts.map((f) => (
          <div key={f.key} className="grid grid-cols-[4.5rem_1fr] gap-3">
            <dt className="text-accent">{f.key}:</dt>
            <dd className="text-fg">{f.value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-line bg-bg/40 px-5 py-3 font-mono text-[11px] text-faint sm:px-6">
        <span>
          <span className="text-ok">●</span> travel.mahamodul.no
        </span>
        <span>OIDC</span>
        <span>TLS</span>
        <span>eu-north-1</span>
        <span>.NET 8</span>
      </div>
    </div>
  );
}

/* ---------------------------------- Work ---------------------------------- */

export function Work() {
  const featured = projects.filter((p) => p.featured);
  const [lead, ...rest] = featured;
  const more = projects.filter((p) => !p.featured);

  return (
    <section aria-labelledby="projects" className="scroll-mt-20 py-20 sm:py-24">
      <Container>
        <SectionHeading
          id="projects"
          eyebrow="Projects"
          title="Engineering Work"
          description="Case studies with the architecture, the decisions behind it and measured results. Each one links to the code."
        />

        <div className="flex flex-col gap-5">
          {lead && <ProjectCard project={lead} size="hero" />}
          <div className="grid gap-5 md:grid-cols-2">
            {rest.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>

        <h3 className="mt-14 mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted">More case studies</h3>
        <div className="grid gap-5 md:grid-cols-2">
          {more.map((p) => (
            <ProjectCard key={p.slug} project={p} size="compact" />
          ))}
        </div>

        <h3 className="mt-14 mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted">Also on GitHub</h3>
        <ul className="divide-y divide-line border-y border-line">
          {moreWork.map((w) => (
            <li key={w.href}>
              <a
                href={w.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-2 py-4 transition-colors md:grid-cols-[14rem_1fr_auto] md:items-baseline md:gap-6"
              >
                <span className="font-medium text-fg group-hover:text-accent-strong">{w.title}</span>
                <span className="text-sm leading-relaxed text-muted">{w.description}</span>
                <span className="flex flex-wrap items-center gap-1.5">
                  {w.stack.map((s) => (
                    <TechBadge key={s}>{s}</TechBadge>
                  ))}
                  <ArrowUpRight className="ml-1 text-faint group-hover:text-fg" aria-label="Opens GitHub" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ------------------------------- Experience ------------------------------- */

export function Experience() {
  return (
    <section aria-labelledby="experience" className="scroll-mt-20 border-t border-line py-20 sm:py-24">
      <Container>
        <SectionHeading id="experience" eyebrow="Experience" title="Career and education" />
        <Timeline items={timeline} />
      </Container>
    </section>
  );
}

/* ---------------------------------- About --------------------------------- */

const path = ["Software engineering", "Backend systems", "Distributed systems", "Cloud", "Data engineering", "Security"];

export function About() {
  return (
    <section aria-labelledby="about" className="scroll-mt-20 border-t border-line py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <SectionHeading id="about" eyebrow="About" title="How I got here" />
            <div className="flex max-w-[62ch] flex-col gap-4 text-[16px] leading-relaxed text-muted">
              <p>
                I started as a software engineer writing backend services and APIs, and each project pulled me one layer further out.
                Building APIs led to distributed systems and message queues. Running them led to containers, CI/CD and the cloud.
                Feeding them led to data pipelines and lakehouses. My MSc at the University of Oslo then turned all of it toward
                security, with a thesis on Zero Trust microservices.
              </p>
              <p>
                The work I enjoy most sits where those areas meet: a sign-in flow that has to survive a deploy, a data pipeline that has
                to be cheap and rerunnable, a cloud setup one person can operate safely. I&apos;m based in Oslo, and I like systems that
                are measured, documented and uneventful to run.
              </p>
            </div>
            <ol aria-label="How my focus developed" className="mt-8 flex flex-wrap items-center gap-x-1.5 gap-y-2">
              {path.map((p, i) => (
                <li key={p} className="flex items-center gap-1.5">
                  {i > 0 && <ArrowRight width={12} height={12} className="text-faint" />}
                  <span
                    className={`rounded-md border px-2 py-1 font-mono text-[11px] ${
                      i === path.length - 1 ? "border-accent/45 bg-accent-soft text-accent-strong" : "border-line-strong text-muted"
                    }`}
                  >
                    {p}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div aria-labelledby="stack-title">
            <Eyebrow className="mb-3">Toolbox</Eyebrow>
            <h3 id="stack-title" className="mb-6 text-xl font-semibold tracking-tight text-fg">
              Technologies by capability
            </h3>
            <dl className="divide-y divide-line border-y border-line">
              {stack.map((g) => (
                <div key={g.area} className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="flex flex-col">
                    <span className="text-sm font-medium text-fg">{g.area}</span>
                    <span className="text-xs text-faint">{g.summary}</span>
                  </dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {g.items.map((t) => (
                      <TechBadge key={t}>{t}</TechBadge>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------- Credentials ------------------------------ */

export function Credentials() {
  return (
    <section aria-labelledby="credentials" className="scroll-mt-20 border-t border-line py-20 sm:py-24">
      <Container>
        <SectionHeading id="credentials" eyebrow="Credentials" title="Certifications and research" />

        <ul className="grid gap-4 sm:grid-cols-3">
          {certifications.map((c) => (
            <li key={c.name} className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-5">
              <span className="w-fit rounded-md border border-line-strong px-1.5 py-0.5 font-mono text-[10.5px] text-faint">{c.short}</span>
              <span className="font-medium leading-snug text-fg">{c.name}</span>
              <span className="mt-auto text-xs text-faint">{c.issuer}</span>
            </li>
          ))}
        </ul>

        <h3 className="mt-14 mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted">Publications</h3>
        <ul className="divide-y divide-line border-y border-line">
          {publications.map((p) => (
            <li key={p.href} className="grid gap-1.5 py-4 md:grid-cols-[10rem_1fr_auto] md:items-baseline md:gap-6">
              <span className="font-mono text-xs text-faint">{p.venue}</span>
              <span className="flex flex-col gap-1">
                <span className="font-medium text-fg">{p.title}</span>
                <span className="text-sm text-muted">{p.topic}</span>
              </span>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-1 font-mono text-xs text-accent hover:text-accent-strong"
              >
                DOI <ArrowUpRight width={12} height={12} />
                <span className="sr-only">for {p.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* --------------------------------- Contact -------------------------------- */

export function Contact() {
  return (
    <section aria-labelledby="contact" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <Container>
        <div className="flex max-w-2xl flex-col gap-5">
          <Eyebrow>Contact</Eyebrow>
          <h2 id="contact" className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            Let&apos;s build reliable systems.
          </h2>
          <p className="text-lg leading-relaxed text-muted">
            I&apos;m interested in software engineering, backend, cloud, data engineering and security roles in Norway and across
            Europe.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <CopyEmail email={profile.email} />
            <ButtonLink href={`mailto:${profile.email}`} variant="primary">
              <Mail /> Email me
            </ButtonLink>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={profile.linkedin} external>
              <LinkedIn /> LinkedIn
            </ButtonLink>
            <ButtonLink href={profile.github} external>
              <GitHub /> GitHub
            </ButtonLink>
            <ButtonLink href={profile.resume} download>
              <Download /> Download resume
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
