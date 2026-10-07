import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { TechIcon } from "./TechIcon";

/* Shared primitives: buttons, badges, section headings, page container. */

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  download?: boolean;
  className?: string;
} & Omit<ComponentProps<"a">, "href">;

const buttonStyles = {
  primary:
    "bg-fg text-bg hover:opacity-90 border border-fg",
  secondary:
    "bg-surface text-fg border border-line-strong hover:border-faint hover:bg-surface-2",
  ghost: "text-muted hover:text-fg border border-transparent",
};

export function ButtonLink({ href, children, variant = "secondary", external, download, className = "", ...rest }: ButtonProps) {
  const cls = `inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors ${buttonStyles[variant]} ${className}`;
  if (external || download || /^(mailto:|https?:)/.test(href)) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: "" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Technology chip. Plain-string technologies get a monochrome logo; accent chips (facts, not tools) stay text-only. */
export function TechBadge({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "accent" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-2xs tracking-tight ${
        tone === "accent" ? "border-accent/30 bg-accent-soft text-accent-strong" : "border-line bg-surface-2 text-muted"
      }`}
    >
      {tone === "default" && typeof children === "string" && <TechIcon name={children} className="size-3.5" />}
      {children}
    </span>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-2xs font-medium uppercase tracking-[0.14em] text-accent ${className}`}>{children}</p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10 flex max-w-2xl flex-col gap-3">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
        {title}
      </h2>
      {description && <p className="text-base leading-relaxed text-muted">{description}</p>}
    </div>
  );
}

export function StatusDot({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`inline-block size-2 rounded-full bg-ok motion-safe:animate-pulse-dot ${className}`} />;
}
