"use client";

import { useState } from "react";
import { Check, Copy } from "./icons";

export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-10 items-center gap-2 rounded-lg border border-line-strong bg-surface px-3 font-mono text-[13px] text-fg transition-colors hover:border-faint hover:bg-surface-2"
      aria-label={`Copy email address ${email}`}
    >
      {state === "copied" ? <Check className="text-ok" /> : <Copy className="text-faint" />}
      <span className="select-all">{email}</span>
      <span role="status" className="sr-only">
        {state === "copied" ? "Email address copied" : state === "failed" ? "Copy failed, select the address instead" : ""}
      </span>
    </button>
  );
}
