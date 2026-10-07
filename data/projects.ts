import type { Project } from "@/lib/types";

/*
  Every figure on this page comes from the project's repository, its documentation, or the MSc thesis.
  To add a project: append an object below. Cards, routes, sitemap and metadata pick it up automatically.
*/

const travelplaner: Project = {
  slug: "travelplaner",
  title: "TravelPlaner",
  domain: "CLOUD / BACKEND / DATA",
  problem:
    "Journey planners show the scheduled trip, not how likely you are to make it. TravelPlaner estimates the chance of arriving on time in Norway from its own history of observed departures.",
  summary:
    "A reliability-aware public-transport planner for Norway. It collects realtime departures from Entur across the whole Ruter network, turns them into delay distributions, and tells you when to leave and why. It runs in production on AWS behind CI/CD with health-gated deploys and automatic rollback.",
  evidence: ["Live on AWS", "CI/CD with auto-rollback", "23 ADRs", "172 Python tests"],
  preview: ["Entur SIRI", "Collectors", "PostgreSQL", "FastAPI", "Next.js"],
  specs: [
    ["region", "AWS eu-north-1"],
    ["deploy", "health-gated, auto-rollback"],
    ["auth", "OIDC + PKCE via BFF"],
    ["data", "~1M observations / Ruter day"],
  ],
  stack: [
    "Python",
    "FastAPI",
    "PostgreSQL",
    "Redis",
    "Next.js",
    "TypeScript",
    "Keycloak",
    "LightGBM",
    "Docker",
    "Terraform",
    "AWS EC2",
    "ECR",
    "S3",
    "SSM",
    "GitHub Actions",
  ],
  context: "Personal product, built and operated end to end",
  period: "2026",
  live: { label: "travel.mahamodul.no", href: "https://travel.mahamodul.no" },
  privateNote: "The repository is private. I'm happy to walk through the code in an interview.",
  order: 1,
  featured: true,
  sections: [
    {
      id: "overview",
      title: "Project overview",
      blocks: [
        {
          type: "p",
          text: "TravelPlaner answers a question normal planners skip: if I take this connection, how likely am I to be on time, and when should I leave? For each journey it shows the probability of arriving on time, the buffer you need, a leave-by time, and a plain-language explanation of every estimate.",
        },
        {
          type: "p",
          text: "Behind the web app is a data platform I call Norway Mobility Intelligence. It collects realtime data continuously, keeps raw snapshots immutable, aggregates delays by line, stop, weekday and hour, and serves a statistical reliability engine through a FastAPI backend. Signed-in users can save daily commutes and get a leave-by time every day.",
        },
      ],
    },
    {
      id: "problem",
      title: "Problem",
      blocks: [
        {
          type: "p",
          text: "Timetables and realtime feeds tell you where a bus is now. They don't tell you how often the 08:12 actually misses a 4-minute transfer at Majorstuen. Answering that needs history: weeks of observed departures per line, stop and hour, plus a way to combine the delays of several legs into one probability.",
        },
      ],
    },
    {
      id: "requirements",
      title: "Requirements",
      blocks: [
        {
          type: "list",
          items: [
            "Collect every Ruter departure through Entur's network-wide SIRI feed, plus busy hubs for other operators, without losing or rewriting raw data.",
            "Search must stay fast at request time, so aggregation happens ahead of time and incrementally.",
            "Every estimate must be explainable and must state its confidence when history is thin.",
            "Accounts are optional, and tokens must never reach the browser.",
            "Run in production on a small budget, with no manual deploy steps and a safe way back from a bad release.",
          ],
        },
      ],
    },
    {
      id: "architecture",
      title: "Architecture",
      blocks: [
        {
          type: "diagram",
          diagram: {
            caption: "Data moves from the sources through to the clients, and the browser only ever talks to the web server.",
            layers: [
              {
                title: "Sources",
                nodes: [
                  { label: "Entur SIRI", detail: "network-wide realtime", tone: "external" },
                  { label: "Entur Journey API", detail: "trip search", tone: "external" },
                  { label: "MET Norway", detail: "weather", tone: "external" },
                ],
              },
              {
                title: "Ingestion",
                nodes: [
                  { label: "siri_collector", detail: "whole operator" },
                  { label: "entur_collector", detail: "hub stops" },
                  { label: "Raw snapshots", detail: "immutable, write-once", tone: "data" },
                ],
              },
              {
                title: "Processing",
                nodes: [
                  { label: "processor", detail: "parse, normalise, load" },
                  { label: "Observations", detail: "daily partitions", tone: "data" },
                  { label: "Aggregates", detail: "incremental", tone: "data" },
                ],
              },
              {
                title: "Serving",
                nodes: [
                  { label: "FastAPI", detail: "modular monolith", tone: "accent" },
                  { label: "Reliability engine", detail: "statistical-v1" },
                  { label: "PostgreSQL · Redis", tone: "data" },
                ],
              },
              {
                title: "Clients",
                nodes: [
                  { label: "Next.js web", detail: "BFF, same-origin proxy", tone: "accent" },
                  { label: "Mobile app", detail: "Expo / React Native" },
                ],
              },
            ],
            edges: ["poll", "snapshots", "aggregates", "HTTPS"],
            planes: [
              {
                title: "Platform",
                nodes: [
                  { label: "Keycloak", detail: "OIDC", tone: "security" },
                  { label: "ml-trainer", detail: "LightGBM, weekly" },
                  { label: "Caddy", detail: "TLS" },
                  { label: "Nightly backups", detail: "S3" },
                ],
              },
            ],
          },
        },
        {
          type: "p",
          text: "The backend is a FastAPI modular monolith with journey, location, reliability, weather, analytics, users and commute modules. Collectors and the processor run as separate processes because they behave differently at runtime. A pure-Python reliability package holds the maths, with no web or database code, so it can be unit-tested on its own.",
        },
      ],
    },
    {
      id: "decisions",
      title: "Technology decisions",
      blocks: [
        {
          type: "p",
          text: "The repository holds 23 architecture decision records. These are the ones that shaped the system most:",
        },
        {
          type: "decisions",
          items: [
            {
              title: "Modular monolith, not microservices (ADR-002)",
              body: "The domain has clear boundaries, but there is one developer and modest traffic. Modules talk through in-process interfaces; only workers with a different runtime profile are separate processes.",
            },
            {
              title: "Statistics before machine learning (ADR-005, ADR-014)",
              body: "A deterministic engine with documented weights serves every estimate. A LightGBM model is only served after it beats that engine on days it has never seen and an administrator activates it, and the statistical engine stays as the automatic fallback.",
            },
            {
              title: "Immutable raw snapshots (ADR-006)",
              body: "The storage layer refuses overwrites, so any day can be reprocessed from source after a parser fix.",
            },
            {
              title: "Backend-for-frontend sign-in (ADR-010)",
              body: "The Next.js server runs the OIDC code flow with PKCE and keeps tokens in Redis. The browser only holds an opaque, httpOnly session id.",
            },
            {
              title: "One free-plan server instead of ECS Fargate, for now (ADR-021)",
              body: "The target architecture (Fargate, RDS, ElastiCache, ALB, NAT) would cost roughly $150–250 a month before any traffic. The first deployment runs the same Compose stack on one t4g.small for about $19 a month, built with Terraform so it can grow into the full design later.",
            },
            {
              title: "Health-gated deploys (ADR-022)",
              body: "A release only stays live if every service reports healthy within six minutes. Otherwise the previous version is deployed again automatically.",
            },
          ],
        },
      ],
    },
    {
      id: "implementation",
      title: "Implementation",
      blocks: [
        {
          type: "p",
          text: "The reliability engine picks the most specific delay history that has at least 20 observations. It starts with line, stop, weekday and hour, and falls back through coarser levels to documented per-mode defaults, which are always labelled low confidence. It then adjusts for realtime delay and weather, and composes the legs of a journey:",
        },
        {
          type: "code",
          lang: "text",
          caption: "Transfer risk between two legs (packages/reliability/transfer.py)",
          code: "margin  = (aimed departure of next − aimed arrival of previous) − walking time\nP(miss) = P(A_prev − B'_next > margin)\n\nA   = adjusted arrival-delay distribution of the incoming leg\nB'  = departure-delay distribution of the outgoing leg, 50% of its\n      historical lateness credited (realtime delay credited in full)",
        },
        {
          type: "list",
          items: [
            "Each leg can fail through cancellation or a missed connection. A failure costs one headway of waiting, and the final arrival is a mixture over every failure combination (computed exactly up to 6 legs).",
            "The API returns probability_on_time, expected delay, p95 delay and the leave-by time, together with the explanation codes the UI turns into sentences.",
            "Ruter's feed alone adds about 8,000 observed departures every few minutes, and a Ruter day is roughly 1 million rows. Detailed observations stay 14 days in PostgreSQL, then move to daily gzipped training files.",
            "The ML pipeline exports training data nightly, trains weekly, compares models with the baseline on later unseen days, and supports shadow mode before activation.",
          ],
        },
      ],
    },
    {
      id: "security",
      title: "Security considerations",
      blocks: [
        {
          type: "sequence",
          caption: "Sign-in: tokens stay on the server",
          steps: [
            { from: "Browser", to: "Web (BFF)", label: "GET /auth/login" },
            { from: "Web (BFF)", to: "Browser", label: "302 to Keycloak with state, nonce, PKCE S256" },
            { from: "Browser", to: "Keycloak", label: "Sign in" },
            { from: "Web (BFF)", to: "Keycloak", label: "Code + verifier on the back channel" },
            { from: "Web (BFF)", to: "Redis", label: "Store tokens; verify ID token (iss, aud, nonce)" },
            { from: "Web (BFF)", to: "Browser", label: "httpOnly session cookie (random id only)" },
            { from: "Web (BFF)", to: "API", label: "Bearer access token; API checks JWKS signature, iss, aud, exp" },
          ],
        },
        {
          type: "list",
          items: [
            "One public surface: only the website and sign-in are exposed. The API, PostgreSQL and Redis have no public host name, and the web proxy allow-lists paths and caps request bodies at 16 KB.",
            "SIRI XML is parsed with defusedxml in streaming mode, with tests that confirm DTDs and entity expansion are refused.",
            "Server-side ownership checks: another user's commute returns 404, the same as a missing one.",
            "CSP, X-Frame-Options, rate limiting backed by Redis, and containers running as a non-root user.",
            "In AWS, only ports 80 and 443 are open and there is no SSH (SSM Session Manager instead). IMDSv2 is required, and every secret is generated by Terraform and stored as an SSM SecureString.",
            "CI runs pip-audit, npm audit and Trivy image scans. HIGH or CRITICAL findings fail the build.",
          ],
        },
      ],
    },
    {
      id: "delivery",
      title: "Cloud & delivery",
      blocks: [
        {
          type: "diagram",
          diagram: {
            caption: "Every merge to main ships itself, and a failing release rolls itself back.",
            layers: [
              { title: "CI", nodes: [{ label: "GitHub Actions", detail: "lint, tests, scans" }, { label: "PostgreSQL service", detail: "integration tests", tone: "data" }] },
              { title: "Build", nodes: [{ label: "4 images", detail: "arm64" }, { label: "Amazon ECR", detail: "tagged by commit", tone: "accent" }] },
              { title: "Release", nodes: [{ label: "SSM Run Command", detail: "no SSH" }, { label: "deploy.sh", detail: "pull, back up, replace" }] },
              { title: "Gate", nodes: [{ label: "Health checks", detail: "≤ 6 min", tone: "security" }, { label: "Auto-rollback", detail: "previous version" }] },
            ],
            edges: ["main", "bundle → S3", "replace"],
            planes: [
              {
                title: "AWS · eu-north-1",
                nodes: [
                  { label: "EC2 t4g.small", detail: "Docker Compose" },
                  { label: "S3", detail: "backups, bundles", tone: "data" },
                  { label: "SSM Parameter Store", detail: "secrets", tone: "security" },
                  { label: "Budgets", detail: "stop on overspend" },
                ],
              },
            ],
          },
        },
        {
          type: "list",
          items: [
            "Migrations follow expand-then-contract, so a rollback never meets a schema it can't read. Every release takes a database backup first.",
            "The last five images of each service stay in ECR, and deploy bundles are kept for 90 days, so any recent version can be put back with one command.",
            "AWS Budgets email at 50% and 80% of the monthly limit, and a narrowly scoped role stops the server at 100% or on any real charge.",
          ],
        },
      ],
    },
    {
      id: "challenges",
      title: "Challenges",
      blocks: [
        {
          type: "list",
          items: [
            "Cold start: with no history, estimates fall back to documented defaults and say so (low confidence) rather than pretending to be precise.",
            "Rollback safety: rolling back code does not roll back a database, which led to the expand-then-contract rule for migrations.",
            "Cloud constraints: the AWS organisation policy blocked GitHub OIDC providers, so deploys use a narrowly scoped key stored only in GitHub's encrypted production environment, with a documented path back to OIDC.",
            "Memory: the full stack uses about 1.6 GB, so the server runs with memory caps per container and 2 GB of swap.",
          ],
        },
      ],
    },
    {
      id: "results",
      title: "Results",
      blocks: [
        {
          type: "metrics",
          items: [
            { value: "Live", label: "travel.mahamodul.no", note: "on AWS since Sep 2026" },
            { value: "~$19", label: "per month", note: "estimated, versus $150–250 for the target design" },
            { value: "≤ 6 min", label: "health gate", note: "before a release stays live" },
            { value: "172", label: "Python test functions", note: "unit, contract, API and integration" },
          ],
          source: "Figures from the repository's deployment docs and test suite.",
        },
        {
          type: "p",
          text: "The machine-learning stage is built up to activation. A fair evaluation against the statistical engine needs about three weeks of collected history, so the model is not yet serving estimates.",
        },
      ],
    },
    {
      id: "learned",
      title: "What I learned",
      blocks: [
        {
          type: "list",
          items: [
            "Writing decisions down (ADRs) made later trade-offs faster, because the original constraints were still visible.",
            "A cheap deployment can still be a careful one: health gates, backups before migrations and a budget kill switch matter more than the size of the server.",
            "Shipping a statistical baseline first gave the ML work an honest benchmark and a safe fallback.",
          ],
        },
      ],
    },
  ],
};

const zeroTrust: Project = {
  slug: "zero-trust-microservices",
  title: "Zero Trust Microservices",
  domain: "SECURITY / DISTRIBUTED SYSTEMS",
  problem:
    "Every service-to-service call in a microservice system is a path an attacker can use. My MSc thesis measured how much Zero Trust security costs in latency.",
  summary:
    "MSc thesis at the University of Oslo. I threat-modelled a .NET 8 microservice system with STRIDE, PASTA and LINDDUN, implemented layered controls (Keycloak with OAuth 2.0/OIDC, HashiCorp Vault Transit, mTLS, RBAC and microsegmentation), and measured the overhead with k6, Prometheus and Grafana.",
  evidence: ["MSc thesis, UiO", "p95 144 ms under k6 load", "0% errors"],
  preview: ["Client", "API gateway", "Services", "Keycloak · Vault"],
  stack: [
    ".NET 8",
    "ASP.NET Core",
    "Keycloak",
    "OAuth 2.0 / OIDC",
    "HashiCorp Vault",
    "mTLS",
    "Docker",
    "Kubernetes",
    "SQLite",
    "Prometheus",
    "Grafana",
    "k6",
  ],
  context: "MSc thesis, University of Oslo",
  period: "2024 – 2025",
  repo: { label: "microservice_dot_net", href: "https://github.com/mahamoodoul/microservice_dot_net" },
  privateNote: "The base application is public. The thesis and hardening code are in a private repository; I can share them on request.",
  order: 2,
  featured: true,
  sections: [
    {
      id: "overview",
      title: "Project overview",
      blocks: [
        {
          type: "p",
          text: "The system under study is a .NET 8 ordering application: an MVC store front-end and separate Auth, Product, Coupon, ShoppingCart, Order and Rewards APIs. I used it as a realistic target, mapped its threats, applied Zero Trust controls service by service, and then measured whether the system was still fast enough to use.",
        },
      ],
    },
    {
      id: "problem",
      title: "Problem",
      blocks: [
        {
          type: "p",
          text: "Splitting an application into services multiplies the network paths, tokens and secrets an attacker can abuse. The threat analysis highlighted three risks above the rest: unauthorised access, injection attacks, and lateral movement across service boundaries. Zero Trust answers these by verifying every request, but each check adds work. The thesis asks how far you can go before the cost is too high.",
        },
      ],
    },
    {
      id: "requirements",
      title: "Requirements",
      blocks: [
        {
          type: "list",
          items: [
            "Centralised identity: no service trusts a request because of where it comes from.",
            "Every service authorises each call itself, based on token claims and roles.",
            "Sensitive data encrypted with keys the services never hold.",
            "Encrypted service-to-service traffic, with each workload confined to the smallest possible blast radius.",
            "Measured, not assumed: latency, throughput, errors and CPU under normal and peak load.",
          ],
        },
      ],
    },
    {
      id: "architecture",
      title: "Architecture",
      blocks: [
        {
          type: "diagram",
          diagram: {
            caption: "Every hop carries a token and every service checks it. Encryption keys never leave Vault.",
            layers: [
              { title: "Client", nodes: [{ label: "Store (MVC)", detail: "ASP.NET Core", tone: "accent" }] },
              { title: "Edge", nodes: [{ label: "API gateway", detail: "single entry point" }] },
              {
                title: "Services",
                nodes: [
                  { label: "Auth API" },
                  { label: "Product · Coupon" },
                  { label: "ShoppingCart" },
                  { label: "Order API", tone: "accent" },
                  { label: "Rewards API" },
                ],
              },
              {
                title: "Data",
                nodes: [
                  { label: "Database per service", tone: "data" },
                  { label: "Rewards catalog", detail: "encrypted, SQLite", tone: "data" },
                ],
              },
            ],
            edges: ["HTTPS + token", "mTLS + JWT", "EF Core"],
            planes: [
              {
                title: "Trust plane",
                nodes: [
                  { label: "Keycloak", detail: "OAuth 2.0 / OIDC", tone: "security" },
                  { label: "Vault", detail: "Transit encryption", tone: "security" },
                  { label: "Prometheus · Grafana", detail: "metrics, alerts" },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      id: "auth-flow",
      title: "Authentication flow",
      blocks: [
        {
          type: "sequence",
          caption: "Token-based access, verified at every service",
          steps: [
            { from: "User", to: "Store", label: "Open protected page" },
            { from: "Store", to: "Keycloak", label: "OIDC authorization code flow" },
            { from: "Keycloak", to: "Store", label: "ID token + access token (roles, audience)" },
            { from: "Store", to: "API gateway", label: "Request with Bearer token" },
            { from: "API gateway", to: "Order API", label: "Forward; Order API validates signature, issuer, audience, expiry" },
            { from: "Rewards API", to: "Vault", label: "Transit encrypt / decrypt; the key never leaves Vault" },
          ],
        },
        {
          type: "p",
          text: "Authorisation combines roles (RBAC) with attributes (ABAC), and service-to-service traffic is encrypted with mTLS. During testing, invalid and tampered tokens were sent on purpose to confirm they were rejected without slowing valid traffic.",
        },
      ],
    },
    {
      id: "secrets",
      title: "Secrets management",
      blocks: [
        {
          type: "list",
          items: [
            "The Rewards API stores its data encrypted through the HashiCorp Vault Transit secrets engine: it sends plaintext and gets ciphertext back, so the AES-256 key never reaches the application.",
            "Keys can be rotated inside Vault without redeploying the service.",
            "Most Transit encrypt and decrypt calls completed in under 2 ms, with a few encryptions reaching about 10 ms.",
          ],
        },
      ],
    },
    {
      id: "threat-model",
      title: "Threat model",
      blocks: [
        {
          type: "table",
          caption: "Methods used and what each contributed",
          head: ["Method", "Used for"],
          rows: [
            ["STRIDE", "Threats per component: MVC app, Auth API, the business APIs and the Rewards API"],
            ["PASTA", "Risk-centred analysis linking attack scenarios to business impact"],
            ["LINDDUN", "Privacy threats around user and order data"],
            ["MITRE ATT&CK", "Mapping attack vectors to known adversary techniques"],
            ["Zero Trust", "Design principle for the countermeasures: never trust, always verify"],
          ],
        },
        {
          type: "p",
          text: "Each threat was mapped to a countermeasure in a threat-to-solution matrix, then implemented system-wide (identity, encryption, segmentation) or per component.",
        },
      ],
    },
    {
      id: "observability",
      title: "Observability",
      blocks: [
        {
          type: "list",
          items: [
            "Every service exposes Prometheus metrics: http_request_duration_seconds and process_cpu_seconds_total.",
            "Grafana dashboards cover latency, request volume, CPU and errors such as invalid tokens and database failures.",
            "Alerts fire when p95 latency goes above 500 ms or CPU or memory goes above 80%.",
          ],
        },
      ],
    },
    {
      id: "performance",
      title: "Performance testing",
      blocks: [
        {
          type: "p",
          text: "Two k6 scripts drove the tests. loadtest.js simulated normal traffic: 20 virtual users ramped over two minutes. apigateway_test.js simulated spikes and attacks: up to 100 virtual users within 30 seconds, mixing authentication flows with invalid and tampered credentials.",
        },
        {
          type: "metrics",
          items: [
            { value: "144 ms", label: "p95 latency", note: "p90 70 ms, mean 27 ms" },
            { value: "~99", label: "requests / second", note: "sustained through the test" },
            { value: "0%", label: "error rate", note: "order, rewards and store endpoints" },
            { value: "< 2 ms", label: "mean latency, normal load", note: "20 virtual users" },
          ],
          source: "k6 results reported in the thesis. The slowest request at peak load was 839 ms.",
        },
      ],
    },
    {
      id: "decisions",
      title: "Key engineering decisions",
      blocks: [
        {
          type: "decisions",
          items: [
            {
              title: "Keycloak as the single identity provider",
              body: "One place to issue, rotate and revoke tokens, using standard OAuth 2.0 and OIDC instead of custom auth code in every service.",
            },
            {
              title: "Vault Transit rather than encrypting inside each service",
              body: "Key material never leaves Vault. Rotating a key doesn't require redeploying services.",
            },
            {
              title: "Measure the cost, don't assume it",
              body: "Instrument first, then add controls, so any change in latency can be traced to a specific layer.",
            },
          ],
        },
      ],
    },
    {
      id: "learned",
      title: "What I learned",
      blocks: [
        {
          type: "list",
          items: [
            "Zero Trust is mostly an identity and key-management problem. The network controls are the easier part.",
            "Under load, the cost of security shows up in the tail (p95 and max), not the average, so report percentiles.",
            "Threat modelling before writing controls kept the work focused on the risks that mattered for this system.",
          ],
        },
      ],
    },
  ],
};

const awsPipeline: Project = {
  slug: "aws-data-pipeline",
  title: "Care Plus AWS Data Pipeline",
  domain: "CLOUD / DATA ENGINEERING",
  problem:
    "Support tickets live in an operational MySQL database and application logs in daily text files, so nobody can query them together.",
  summary:
    "A serverless AWS pipeline that lands support tickets and logs in S3, cleans them with S3-triggered Lambda functions into Parquet, loads them incrementally into Redshift Serverless, and serves ad-hoc SQL in Athena and a Power BI dashboard.",
  evidence: ["Event-driven Lambda ETL", "Incremental loads", "Parquet"],
  preview: ["MySQL · logs", "S3 raw", "Lambda", "S3 Parquet", "Redshift · Athena"],
  stack: ["Python", "boto3", "pandas", "PyArrow", "Amazon S3", "AWS Lambda", "Amazon Redshift Serverless", "Amazon Athena", "SQL", "Power BI"],
  context: "Data engineering project",
  period: "2025",
  repo: { label: "care-plus-de", href: "https://github.com/mahamoodoul/care-plus-de" },
  order: 3,
  featured: true,
  sections: [
    {
      id: "overview",
      title: "Project overview",
      blocks: [
        {
          type: "p",
          text: "Care Plus is a support organisation with two data sources that don't meet: support tickets in a MySQL database (priority, channel, status, agent, resolution time) and application logs written to a file per day. The pipeline brings both into one analytical store so questions like 'which channel produces the most escalations' take one SQL query.",
        },
      ],
    },
    {
      id: "architecture",
      title: "Architecture",
      blocks: [
        {
          type: "diagram",
          diagram: {
            caption: "Raw and processed data live in separate S3 prefixes, and processing is triggered by new objects.",
            layers: [
              {
                title: "Source",
                nodes: [
                  { label: "MySQL", detail: "support tickets", tone: "external" },
                  { label: "Log files", detail: "one per day", tone: "external" },
                ],
              },
              { title: "Landing", nodes: [{ label: "S3 raw/", detail: "CSV and .log", tone: "data" }] },
              { title: "Transform", nodes: [{ label: "AWS Lambda", detail: "S3 event trigger", tone: "accent" }, { label: "pandas · regex" }] },
              { title: "Processed", nodes: [{ label: "S3 processed/", detail: "Parquet", tone: "data" }] },
              {
                title: "Analytics",
                nodes: [
                  { label: "Redshift Serverless", detail: "COPY, incremental", tone: "accent" },
                  { label: "Athena", detail: "ad-hoc SQL" },
                  { label: "Power BI", detail: "dashboard" },
                ],
              },
            ],
            edges: ["boto3 upload", "ObjectCreated", "PyArrow", "COPY / query"],
          },
        },
      ],
    },
    {
      id: "implementation",
      title: "Implementation",
      blocks: [
        {
          type: "list",
          items: [
            "Ingestion reads new tickets from MySQL with SQLAlchemy and uploads day-partitioned files to s3://…/raw/. A date tracker records the last loaded day, so reruns never duplicate data.",
            "An S3 ObjectCreated event triggers a Lambda function per source. The log parser uses a regular expression with named groups to pull out timestamp, log level, component, event type, error flag, response time, CPU usage and user agent. The ticket cleaner trims and lower-cases fields and parses timestamps.",
            "Both functions write columnar Parquet with PyArrow to a processed/ prefix, which keeps scans cheap for Athena and loads fast into Redshift.",
            "Redshift Serverless loads each new day with COPY using an IAM role. Athena queries the same Parquet files directly for ad-hoc work.",
          ],
        },
        {
          type: "code",
          lang: "python",
          caption: "Lambda entry point (simplified from the repository)",
          code: "def lambda_handler(event, context):\n    record = event[\"Records\"][0][\"s3\"]\n    bucket, key = record[\"bucket\"][\"name\"], record[\"object\"][\"key\"]\n\n    raw = read_log_from_s3(bucket, key)\n    df = parse_logs(raw)                     # regex → typed columns\n    out = key.replace(\"raw/\", \"processed/\").replace(\".log\", \".parquet\")\n    save_parquet_to_s3(df, bucket, out)      # PyArrow → S3",
        },
      ],
    },
    {
      id: "decisions",
      title: "Technology decisions",
      blocks: [
        {
          type: "decisions",
          items: [
            {
              title: "Event-driven Lambda instead of a scheduled cluster",
              body: "The volume is a few files a day, so pay-per-invocation compute that runs only when data arrives fits better than an always-on Spark or Glue job.",
            },
            {
              title: "Parquet in the processed layer",
              body: "Columnar and compressed: Athena scans less data per query, and Redshift COPY loads it natively.",
            },
            {
              title: "Both Athena and Redshift",
              body: "Athena for exploration directly on S3, Redshift for the modelled tables behind the dashboard.",
            },
          ],
        },
      ],
    },
    {
      id: "results",
      title: "Results",
      blocks: [
        {
          type: "p",
          text: "The analytics layer answers ticket load by channel, status breakdown (resolved, open, escalated), daily ticket trends, error-event counts in the logs, and average CPU usage per user agent. These feed the Careplus Insights dashboard in Power BI.",
        },
      ],
    },
    {
      id: "learned",
      title: "What I learned",
      blocks: [
        {
          type: "list",
          items: [
            "Keeping raw and processed data in separate prefixes makes it safe to reprocess everything after a parser change.",
            "Idempotent incremental loading (tracked dates, append-only days) matters more than raw speed in small pipelines.",
            "Next step: move credentials to Secrets Manager and define the bucket, functions and triggers in Terraform instead of the console.",
          ],
        },
      ],
    },
  ],
};

const dotnetMicroservices: Project = {
  slug: "dotnet-microservices",
  title: ".NET Microservices Ordering Platform",
  domain: "BACKEND / MICROSERVICES",
  problem:
    "A food-ordering system in which ordering, payment, rewards and email must not block one another or share a database.",
  summary:
    "Seven ASP.NET Core services behind an Ocelot API gateway, each with its own SQL Server database. Services communicate asynchronously through Azure Service Bus queues and topics. This system later became the target for my MSc security work.",
  evidence: ["7 services", "19 gateway routes", "Azure Service Bus topics"],
  preview: ["MVC web", "Ocelot gateway", "7 APIs", "Service Bus"],
  stack: [".NET 8", "ASP.NET Core", "Entity Framework Core", "SQL Server", "Azure Service Bus", "Ocelot", "JWT", "Stripe", "Swagger", "Bootstrap 5"],
  context: "Backend project",
  period: "2024 – 2025",
  repo: { label: "microservice_dot_net", href: "https://github.com/mahamoodoul/microservice_dot_net" },
  order: 4,
  featured: false,
  sections: [
    {
      id: "overview",
      title: "Project overview",
      blocks: [
        {
          type: "p",
          text: "An ordering platform split along business boundaries: Auth, Product, Coupon, ShoppingCart, Order, Reward and Email. An ASP.NET Core MVC front-end talks only to the gateway. Each service owns its data and publishes events instead of calling other services directly for side effects.",
        },
      ],
    },
    {
      id: "architecture",
      title: "Architecture",
      blocks: [
        {
          type: "diagram",
          diagram: {
            caption: "Synchronous calls go through the gateway; side effects go through the message bus.",
            layers: [
              { title: "Client", nodes: [{ label: "Mango.Web", detail: "MVC, Bootstrap 5", tone: "accent" }] },
              { title: "Edge", nodes: [{ label: "Ocelot gateway", detail: "19 routes" }] },
              {
                title: "Services",
                nodes: [
                  { label: "Auth", detail: "Identity + JWT", tone: "security" },
                  { label: "Product · Coupon" },
                  { label: "ShoppingCart" },
                  { label: "Order", detail: "Stripe checkout", tone: "accent" },
                ],
              },
              {
                title: "Async",
                nodes: [
                  { label: "Azure Service Bus", detail: "queues + topic", tone: "external" },
                  { label: "Email API", detail: "consumer" },
                  { label: "Reward API", detail: "consumer" },
                ],
              },
            ],
            edges: ["HTTPS", "REST", "publish"],
            planes: [{ title: "Persistence", nodes: [{ label: "SQL Server", detail: "one database per service", tone: "data" }, { label: "EF Core", detail: "migrations per service" }] }],
          },
        },
        {
          type: "table",
          caption: "Messaging contracts",
          head: ["Channel", "Type", "Producer → consumer"],
          rows: [
            ["OrderCreated", "Topic", "Order → Reward and Email (one subscription each)"],
            ["emailshoppingcart", "Queue", "ShoppingCart → Email"],
            ["registeruser", "Queue", "Auth → Email"],
          ],
        },
      ],
    },
    {
      id: "decisions",
      title: "Engineering decisions",
      blocks: [
        {
          type: "decisions",
          items: [
            {
              title: "A topic for OrderCreated",
              body: "Rewards and email react to the same event independently. Adding a new reaction means adding a subscription; the Order service doesn't change.",
            },
            {
              title: "Database per service",
              body: "No service reads another service's tables, so schemas can change independently. EF Core migrations live with each service.",
            },
            {
              title: "Gateway as the only entry point",
              body: "The front-end knows one address. Routing and authentication at the edge are configured in one file (ocelot.json).",
            },
            {
              title: "Shared message bus library",
              body: "Mango.MessageBus wraps publishing, so services depend on a small interface instead of the Azure SDK directly.",
            },
          ],
        },
      ],
    },
    {
      id: "implementation",
      title: "Implementation",
      blocks: [
        {
          type: "list",
          items: [
            "N-layer services using the repository and unit-of-work patterns, each with its own Swagger/OpenAPI document.",
            "Authentication with ASP.NET Core Identity issuing JWTs with roles, validated by every service.",
            "Stripe Checkout sessions for payment, with coupons synchronised to Stripe.",
            "Background consumers (AzureServiceBusConsumer) in the Email and Reward services process messages outside the request path.",
          ],
        },
      ],
    },
    {
      id: "learned",
      title: "What I learned",
      blocks: [
        {
          type: "list",
          items: [
            "Asynchronous messaging removes coupling, but you need idempotent consumers because messages can arrive more than once.",
            "Microservices move complexity from code into operations and security, which is what my MSc thesis then measured on this same system.",
          ],
        },
      ],
    },
  ],
};

const bengali: Project = {
  slug: "bengali-news-classification",
  title: "Bengali News Classification",
  domain: "MACHINE LEARNING / NLP",
  problem:
    "Bengali has very few large labelled text datasets, so I built one by scraping Bangladeshi news sites, then trained and compared classifiers on it.",
  summary:
    "BSc thesis. I scraped Bangladeshi news sites with Scrapy, built a dataset of 504,266 labelled articles in 7 categories, and compared Naive Bayes, SVM, CNN, LSTM and CNN+LSTM models. The best deep models reached 93.3% accuracy on 50,062 held-out articles.",
  evidence: ["504,266 articles", "7 categories", "93.3% test accuracy"],
  preview: ["Scrapy spiders", "Cleaning", "Tokenise", "CNN / LSTM"],
  stack: ["Python", "Scrapy", "pandas", "scikit-learn", "Keras", "TensorFlow", "Google Colab"],
  context: "BSc thesis, Daffodil International University",
  period: "2020 – 2021",
  repo: { label: "Bengali_News_Classification", href: "https://github.com/mahamoodoul/Bengali_News_Classification" },
  related: [
    {
      label: "Data collection (Scrapy)",
      href: "https://github.com/mahamoodoul/thesis-bengali-news-clasification-machine-learning",
    },
  ],
  order: 5,
  featured: false,
  sections: [
    {
      id: "dataset",
      title: "Dataset",
      blocks: [
        {
          type: "p",
          text: "No large labelled Bengali news corpus was available, so I wrote Scrapy spiders for Bangladeshi news sites, including Jago News, Bangladesh Pratidin and Ittefaq. I used each site's own section as the label.",
        },
        {
          type: "metrics",
          items: [
            { value: "504,266", label: "articles collected" },
            { value: "7", label: "categories", note: "sports, international, national, all-Bangladesh, politics, entertainment, economics-business" },
            { value: "500,620", label: "after cleaning" },
            { value: "50,062", label: "held-out test articles", note: "10% split" },
          ],
          source: "Counts from the notebook outputs in the repository.",
        },
      ],
    },
    {
      id: "preprocessing",
      title: "Preprocessing",
      blocks: [
        {
          type: "list",
          items: [
            "Removed empty records and articles shorter than 490 or longer than 5,000 characters, which were mostly stubs or merged pages.",
            "Tokenised Bengali text with a Keras tokenizer and padded sequences to 250 tokens for the CNN and 500 tokens for the LSTM.",
            "Used TF-IDF and count features for the classical baselines, and one-hot labels for the neural models.",
          ],
        },
      ],
    },
    {
      id: "experiments",
      title: "Model experimentation",
      blocks: [
        {
          type: "table",
          caption: "Accuracy on the held-out test set",
          head: ["Model", "Features", "Test accuracy"],
          rows: [
            ["Naive Bayes", "Bag of words", "85%"],
            ["SVM (linear kernel)", "TF-IDF", "90.9%"],
            ["CNN", "Embeddings, 250 tokens", "93.3%"],
            ["LSTM", "Embeddings, 500 tokens", "93.3%"],
            ["CNN + LSTM", "Embeddings, 250 tokens (6 classes)", "92.9%"],
          ],
        },
        {
          type: "p",
          text: "Training accuracy for the neural models reached 97–98%, while validation accuracy levelled off around 93–94% after two or three epochs. I report test accuracy, and the gap between the two told me where to stop training.",
        },
      ],
    },
    {
      id: "results",
      title: "Result",
      blocks: [
        {
          type: "p",
          text: "Both the CNN and the LSTM reached 93.3% accuracy with macro F1 of 0.93 across the seven classes. The CNN trained about twice as fast per epoch, which made it the practical choice.",
        },
      ],
    },
    {
      id: "learned",
      title: "What I learned",
      blocks: [
        {
          type: "list",
          items: [
            "Collecting and cleaning the data took more work than modelling, and it set the upper limit on accuracy.",
            "Strong classical baselines (SVM at 90.9%) are important context for deep-learning results.",
            "Reporting held-out metrics rather than training accuracy is the difference between a demo and an evaluation.",
          ],
        },
      ],
    },
  ],
};

export const projects: Project[] = [travelplaner, zeroTrust, awsPipeline, dotnetMicroservices, bengali].sort(
  (a, b) => a.order - b.order,
);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** Smaller repositories listed under the case studies. */
export const moreWork = [
  {
    title: "Stocks ETL Pipeline",
    description: "Airflow DAGs load end-of-day prices from the Polygon.io API through S3 into a Snowflake dimensional model, with data-quality checks and Slack alerts.",
    stack: ["Airflow", "Snowflake", "AWS S3", "Docker"],
    href: "https://github.com/mahamoodoul/stocks_etl_pipeline",
  },
  {
    title: "Spark E-Commerce Lakehouse",
    description: "A Databricks medallion lakehouse (bronze, silver, gold) with historical and incremental loads for orders, shipments and returns.",
    stack: ["Spark", "Databricks", "Delta Lake"],
    href: "https://github.com/mahamoodoul/spark_project_databricks_de",
  },
  {
    title: "FASTQ QC Microservice",
    description: "Go services for upload, a RabbitMQ worker and a results API, backed by PostgreSQL, with a Prometheus /metrics endpoint on every service.",
    stack: ["Go", "RabbitMQ", "PostgreSQL", "Docker"],
    href: "https://github.com/mahamoodoul/fastq-qc",
  },
];
