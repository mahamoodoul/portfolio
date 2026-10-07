export const profile = {
  name: "Md Mahamodul Islam",
  shortName: "Mahamodul",
  initials: "MI",
  role: "Software Engineer",
  focus: "Backend · Cloud · Data · Security",
  location: "Oslo, Norway",
  availability: "Open to software, cloud and data engineering roles in Norway and Europe",
  email: "mdmahamodul1998@gmail.com",
  github: "https://github.com/mahamoodoul",
  githubHandle: "mahamoodoul",
  linkedin: "https://www.linkedin.com/in/md-mahamodul-islam/",
  resume: "/Md_Mahamodul_Islam_Resume.pdf",
  headline: "I build secure, scalable software and cloud systems.",
  intro:
    "Software engineer based in Oslo, working across backend engineering, cloud, data platforms and application security.",
  description:
    "Software engineer in Oslo building backend systems, cloud infrastructure, data pipelines and secure distributed architectures with .NET, Python and AWS. MSc in Information Security, University of Oslo.",
  /** Quick-scan facts for the hero panel. Every line is backed by the resume or a repository. */
  facts: [
    { key: "roles", value: "Software · Backend · Cloud · Data · Platform · Security" },
    { key: "based", value: "Oslo, Norway" },
    { key: "stack", value: "C# / .NET 8 · Python · SQL · AWS · Docker · Kubernetes · Terraform" },
    { key: "certs", value: "AWS SAA · AWS CCP · Databricks DE Associate" },
    { key: "degree", value: "MSc Informatics (Information Security), UiO" },
  ],
} as const;

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mahamodul.no").replace(/\/$/, "");

export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Md Mahamodul Islam, Software Engineer in Oslo",
};
