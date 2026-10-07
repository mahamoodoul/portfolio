export type Link = { label: string; href: string };

/* ---------- Architecture diagrams ---------- */

export type NodeTone = "default" | "accent" | "security" | "data" | "external";

export type DiagramNode = {
  label: string;
  detail?: string;
  tone?: NodeTone;
};

/** One column of the diagram (left → right on desktop, top → bottom on phones). */
export type DiagramLayer = {
  title: string;
  nodes: DiagramNode[];
};

/** A band under the main flow for things every layer uses (identity, secrets, observability). */
export type DiagramPlane = {
  title: string;
  nodes: DiagramNode[];
};

export type Diagram = {
  caption: string;
  layers: DiagramLayer[];
  /** Label on the connector after layer i (length = layers.length - 1). */
  edges?: string[];
  planes?: DiagramPlane[];
};

/* ---------- Case-study content blocks ---------- */

export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "diagram"; diagram: Diagram }
  | { type: "sequence"; caption: string; steps: { from: string; to: string; label: string }[] }
  | { type: "metrics"; items: { value: string; label: string; note?: string }[]; source?: string }
  | { type: "decisions"; items: { title: string; body: string }[] }
  | { type: "code"; caption?: string; lang: string; code: string }
  | { type: "table"; caption?: string; head: string[]; rows: string[][] };

export type CaseSection = {
  id: string;
  title: string;
  blocks: Block[];
};

export type Project = {
  slug: string;
  title: string;
  /** Engineering domain label shown on cards, e.g. "SECURITY / DISTRIBUTED SYSTEMS". */
  domain: string;
  /** One sentence: the problem the project solves. */
  problem: string;
  /** Two or three sentences for the case-study header and meta description. */
  summary: string;
  /** Short verifiable evidence chips, e.g. "Live on AWS", "172 tests". */
  evidence: string[];
  /** Compact left-to-right architecture preview for cards. */
  preview: string[];
  /** Key/value system facts shown on the large featured card. */
  specs?: [string, string][];
  stack: string[];
  context: string;
  period: string;
  repo?: Link;
  /** Extra repositories (data collection, base application …). */
  related?: Link[];
  live?: Link;
  /** Shown when the source is private. */
  privateNote?: string;
  /** Lower number = earlier on the home page. */
  order: number;
  featured: boolean;
  sections: CaseSection[];
};

export type TimelineItem = {
  kind: "work" | "education";
  title: string;
  org: string;
  place: string;
  period: string;
  points?: string[];
  tags?: string[];
};
