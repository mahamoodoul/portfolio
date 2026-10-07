import {
  siApacheairflow,
  siApachearrow,
  siApachespark,
  siBootstrap,
  siDatabricks,
  siDocker,
  siDotnet,
  siFastapi,
  siGithubactions,
  siGnubash,
  siGo,
  siGooglecolab,
  siGrafana,
  siJsonwebtokens,
  siK6,
  siKeras,
  siKeycloak,
  siKubernetes,
  siMongodb,
  siMysql,
  siNextdotjs,
  siOpenid,
  siPandas,
  siPostgresql,
  siPostman,
  siPrometheus,
  siPytest,
  siPython,
  siRabbitmq,
  siRedis,
  siScikitlearn,
  siScrapy,
  siSnowflake,
  siSqlite,
  siStripe,
  siSwagger,
  siTensorflow,
  siTerraform,
  siTypescript,
  siVault,
} from "simple-icons";

/*
  Monochrome icon for a technology name.
  Brand logos come from Simple Icons (CC0). Brands it doesn't carry (AWS, Azure, C#, SQL Server, Power BI …)
  and concepts (Zero Trust, CI/CD …) get a generic glyph instead of an unofficial logo.
  Rendered on the server, so icons add no client-side JavaScript.
*/

type Brand = { path: string };

const brands: Record<string, Brand> = {
  ".NET 8": siDotnet,
  ".NET Core": siDotnet,
  "ASP.NET Core": siDotnet,
  "Entity Framework Core": siDotnet,
  "Apache Airflow": siApacheairflow,
  Airflow: siApacheairflow,
  "Apache Spark": siApachespark,
  Spark: siApachespark,
  Bash: siGnubash,
  "Bootstrap 5": siBootstrap,
  Databricks: siDatabricks,
  Docker: siDocker,
  "Docker Compose": siDocker,
  FastAPI: siFastapi,
  "GitHub Actions": siGithubactions,
  Go: siGo,
  "Google Colab": siGooglecolab,
  Grafana: siGrafana,
  "HashiCorp Vault": siVault,
  JWT: siJsonwebtokens,
  k6: siK6,
  Keras: siKeras,
  Keycloak: siKeycloak,
  Kubernetes: siKubernetes,
  MongoDB: siMongodb,
  MySQL: siMysql,
  "Next.js": siNextdotjs,
  "OpenID Connect": siOpenid,
  "OAuth 2.0 / OIDC": siOpenid,
  pandas: siPandas,
  PostgreSQL: siPostgresql,
  Postman: siPostman,
  Prometheus: siPrometheus,
  pytest: siPytest,
  Python: siPython,
  PyArrow: siApachearrow,
  RabbitMQ: siRabbitmq,
  Redis: siRedis,
  "scikit-learn": siScikitlearn,
  Scrapy: siScrapy,
  Snowflake: siSnowflake,
  SQLite: siSqlite,
  Stripe: siStripe,
  Swagger: siSwagger,
  TensorFlow: siTensorflow,
  Terraform: siTerraform,
  TypeScript: siTypescript,
};

/* Generic stroke glyphs on a 24px grid. */
const glyphs = {
  cloud: "M7 18h10a4 4 0 0 0 .6-7.96A6 6 0 0 0 6.1 9.6 4.2 4.2 0 0 0 7 18Z",
  database: "M5 6c0-1.66 3.13-3 7-3s7 1.34 7 3-3.13 3-7 3-7-1.34-7-3Zm0 0v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3",
  shield: "M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Zm-3 9 2 2 4-4",
  key: "M14.5 9.5a4 4 0 1 1-1.2-2.8M14.5 9.5 21 16v3h-3v-2h-2v-2h-2l-1.5-1.5M8.5 10.5h.01",
  lock: "M6 11h12v9H6zM9 11V8a3 3 0 0 1 6 0v3",
  code: "m8 8-4 4 4 4m8-8 4 4-4 4m-2.5-11-3 14",
  braces: "M8 4H7a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h1m8-16h1a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a2 2 0 0 1-2 2h-1",
  chart: "M4 20V4m0 16h16M8 16v-4m4 4V8m4 8v-6",
  flask: "M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3M7 15h10",
  spark: "M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5m7 7L18 18M18 6l-2.5 2.5m-7 7L6 18",
  workflow: "M4 6h6v4H4zM14 14h6v4h-6zM7 10v2a2 2 0 0 0 2 2h5M17 14v-2a2 2 0 0 0-2-2h-1",
  network: "M12 5a2 2 0 1 0 0 .01M5 19a2 2 0 1 0 0 .01M19 19a2 2 0 1 0 0 .01M12 7v4m0 0-5.5 6.5M12 11l5.5 6.5",
  message: "M4 5h16v11H9l-5 4V5Zm4 5h8",
  gateway: "M3 12h5m8 0h5M8 7h8v10H8zM12 7V4m0 16v-3",
  box: "M12 3 4 7v10l8 4 8-4V7l-8-4Zm0 0v0M4 7l8 4 8-4M12 11v10",
  people: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-6 9a6 6 0 0 1 12 0m1-9a3 3 0 1 0-1.5-5.6M21 20a6 6 0 0 0-4-5.7",
} as const;

type Glyph = keyof typeof glyphs;

const generic: Record<string, Glyph> = {
  // AWS & Azure services
  "AWS EC2": "cloud",
  "AWS Lambda": "cloud",
  Lambda: "cloud",
  "AWS S3": "cloud",
  "Amazon S3": "cloud",
  S3: "cloud",
  boto3: "cloud",
  "Amazon Athena": "database",
  Athena: "database",
  "Amazon Redshift Serverless": "database",
  Redshift: "database",
  CloudWatch: "chart",
  ECR: "box",
  IAM: "key",
  SSM: "key",
  "Azure Service Bus": "message",
  "Azure DevOps": "workflow",
  // languages, frameworks, tools without a free logo
  "C#": "code",
  Ocelot: "gateway",
  SQL: "database",
  "SQL Server": "database",
  "Delta Lake": "database",
  "Power BI": "chart",
  Playwright: "flask",
  LightGBM: "spark",
  // concepts
  "OAuth 2.0": "key",
  mTLS: "lock",
  "Zero Trust": "shield",
  STRIDE: "shield",
  PASTA: "shield",
  LINDDUN: "shield",
  "MITRE ATT&CK": "shield",
  "Secure systems": "shield",
  "Cloud & microservice security": "shield",
  "CI/CD": "workflow",
  "ETL / ELT": "workflow",
  Microservices: "network",
  "REST APIs": "braces",
  "Machine learning": "spark",
  NLP: "spark",
  Mentoring: "people",
};

export function TechIcon({ name, className = "size-3" }: { name: string; className?: string }) {
  const brand = brands[name];
  if (brand) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={`shrink-0 ${className}`}>
        <path d={brand.path} />
      </svg>
    );
  }
  const glyph = glyphs[generic[name] ?? "code"];
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`shrink-0 ${className}`}
    >
      <path d={glyph} />
    </svg>
  );
}
