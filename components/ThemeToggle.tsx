"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "./icons";

type Theme = "light" | "dark";

/* The theme lives on <html data-theme>. Light is the default; a choice is remembered in localStorage.
   The inline script in app/layout.tsx applies the saved choice before first paint. */

const listeners = new Set<() => void>();

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {}
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#0a0c0f" : "#f7f8fa");
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function ThemeToggle({ className = "", withLabel = false }: { className?: string; withLabel?: boolean }) {
  const theme = useSyncExternalStore<Theme>(subscribe, getTheme, () => "light");
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={className}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
      {withLabel && <span>{theme === "dark" ? "Light theme" : "Dark theme"}</span>}
    </button>
  );
}
