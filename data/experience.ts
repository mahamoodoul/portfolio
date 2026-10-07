import type { TimelineItem } from "@/lib/types";

export const timeline: TimelineItem[] = [
  {
    kind: "education",
    title: "MSc Informatics: Information Security",
    org: "University of Oslo",
    place: "Oslo, Norway",
    period: "2022 – 2025",
    points: [
      "Thesis: Zero Trust security for a .NET microservice system, from threat model to measured overhead.",
    ],
    tags: ["Secure systems", "Cloud & microservice security", "Zero Trust"],
  },
  {
    kind: "work",
    title: "Teaching Assistant",
    org: "University of Oslo",
    place: "Oslo, Norway",
    period: "Aug 2023 – Dec 2024",
    points: [
      "Mentored around 200 students in Python/Bash programming and Database Systems.",
      "Reviewed and debugged assignments, explaining programming and database concepts one to one.",
      "Automated parts of the grading workflow, cutting manual review effort by about 40%.",
    ],
    tags: ["Python", "Bash", "SQL", "Mentoring"],
  },
  {
    kind: "work",
    title: "Software Engineer",
    org: "Luminous Labs",
    place: "Dhaka, Bangladesh",
    period: "Aug 2021 – Jun 2022",
    points: [
      "Built backend services and APIs in .NET Core within a microservice-based system.",
      "Cut data-synchronisation processing time by about 60% by reworking the processing workflow.",
      "Reduced API and query latency (database queries about 35% faster).",
      "Set up CI/CD with Azure DevOps and GitHub Actions; release failures dropped by about 40%.",
    ],
    tags: [".NET Core", "Microservices", "SQL", "Azure DevOps", "GitHub Actions"],
  },
  {
    kind: "education",
    title: "BSc Software Engineering",
    org: "Daffodil International University",
    place: "Dhaka, Bangladesh",
    period: "2017 – 2021",
    points: ["Thesis: Bengali news classification on 500k scraped articles."],
    tags: ["Machine learning", "NLP"],
  },
];

export const certifications = [
  { name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", short: "SAA" },
  { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", short: "CCP" },
  { name: "Databricks Certified Data Engineer Associate", issuer: "Databricks", short: "DE-A" },
];

export const publications = [
  {
    title: "PhishGuard: A CNN Model for Phishing URL Detection",
    venue: "IEEE AIIoT 2024",
    topic: "Deep learning for real-time phishing URL detection.",
    href: "https://doi.org/10.1109/AIIoT58432.2024.10574688",
  },
  {
    title: "Sentiment Polarity Analysis of Bangla Food Reviews",
    venue: "IEEE ICAEEE 2024",
    topic: "NLP and sequence models for sentiment classification; 87% accuracy.",
    href: "https://doi.org/10.1109/ICAEEE62219.2024.10561876",
  },
  {
    title: "Prediction of Compressive Strength of High-Performance Concrete",
    venue: "Springer, 2024",
    topic: "Machine learning regression on infrastructure data.",
    href: "https://doi.org/10.1007/s41024-024-00445-z",
  },
];

export const stack: { area: string; summary: string; items: string[] }[] = [
  {
    area: "Backend",
    summary: "Services and APIs",
    items: ["C#", ".NET 8", "ASP.NET Core", "Entity Framework Core", "Python", "FastAPI", "REST APIs", "Microservices"],
  },
  {
    area: "Cloud",
    summary: "AWS first, Azure where needed",
    items: ["AWS EC2", "S3", "Lambda", "Athena", "Redshift", "IAM", "ECR", "SSM", "CloudWatch", "Azure Service Bus", "Terraform"],
  },
  {
    area: "Data engineering",
    summary: "Batch pipelines and lakehouses",
    items: ["SQL", "Databricks", "Apache Spark", "Delta Lake", "Apache Airflow", "Snowflake", "ETL / ELT", "Power BI"],
  },
  {
    area: "Databases",
    summary: "Relational first",
    items: ["PostgreSQL", "SQL Server", "SQLite", "MySQL", "Redis", "MongoDB"],
  },
  {
    area: "DevOps",
    summary: "Build, ship, roll back",
    items: ["Docker", "Docker Compose", "Kubernetes", "GitHub Actions", "Azure DevOps", "CI/CD"],
  },
  {
    area: "Security",
    summary: "Identity, secrets, threat models",
    items: ["OAuth 2.0", "OpenID Connect", "Keycloak", "HashiCorp Vault", "Zero Trust", "mTLS", "STRIDE", "PASTA", "LINDDUN", "MITRE ATT&CK"],
  },
  {
    area: "Observability & testing",
    summary: "Measure before claiming",
    items: ["Prometheus", "Grafana", "k6", "pytest", "Playwright", "Postman"],
  },
];
