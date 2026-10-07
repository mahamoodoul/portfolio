"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { Close, Download, GitHub, LinkedIn, Menu } from "./icons";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Credentials", href: "/#credentials" },
  { label: "Contact", href: "/#contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || open ? "border-line bg-bg/85 backdrop-blur-md" : "border-transparent bg-bg"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 w-full max-w-[1120px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span
            aria-hidden
            className="grid size-7 place-items-center rounded-md border border-line-strong bg-surface-2 font-mono text-[11px] font-semibold text-fg transition-colors group-hover:border-accent/60"
          >
            {profile.initials}
          </span>
          <span className="text-sm font-semibold tracking-tight text-fg">{profile.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.slice(1).map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-fg">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-1 lg:flex">
          <ThemeToggle className="grid size-9 place-items-center rounded-md text-muted transition-colors hover:text-fg" />
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="grid size-9 place-items-center rounded-md text-muted transition-colors hover:text-fg"
          >
            <GitHub />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="grid size-9 place-items-center rounded-md text-muted transition-colors hover:text-fg"
          >
            <LinkedIn />
          </a>
          <a
            href={profile.resume}
            download=""
            className="ml-2 inline-flex h-9 items-center gap-2 rounded-lg border border-line-strong bg-surface px-3 text-sm font-medium text-fg transition-colors hover:border-faint hover:bg-surface-2"
          >
            <Download /> Resume
          </a>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
        <ThemeToggle className="grid size-10 place-items-center rounded-md text-muted transition-colors hover:text-fg" />
        <button
          type="button"
          className="grid size-10 place-items-center rounded-md text-fg"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <Close width={20} height={20} /> : <Menu width={20} height={20} />}
        </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-bg lg:hidden">
          <ul className="flex flex-col px-4 py-4 sm:px-6">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-line py-4 text-lg font-medium text-fg"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-3 px-4 pb-8 sm:px-6">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-line-strong bg-surface text-sm text-fg"
            >
              <GitHub /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-line-strong bg-surface text-sm text-fg"
            >
              <LinkedIn /> LinkedIn
            </a>
            <a
              href={profile.resume}
              download=""
              className="col-span-2 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-fg text-sm font-medium text-bg"
            >
              <Download /> Download resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
