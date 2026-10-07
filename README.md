# mahamodul.no: portfolio

Personal site of Md Mahamodul Islam. Next.js 16 (App Router), TypeScript and Tailwind CSS 4, exported as a fully static site.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
npm run lint
```

## Where things live

| Path | What |
|---|---|
| `data/profile.ts` | Name, links, hero facts, site URL |
| `data/projects.ts` | Case studies (typed content blocks: text, lists, diagrams, sequences, metrics, tables, code) |
| `data/experience.ts` | Timeline, certifications, publications, tech stack |
| `components/` | `ProjectCard`, `ProjectCaseStudy`, `ArchitectureDiagram`, `Timeline`, `Navigation`, `Footer`, shared UI |
| `app/` | Routes: `/` and `/projects/[slug]/`, plus sitemap, robots and icon |
| `public/` | Resume PDF and the Open Graph image |

**Add a project:** append an object to `data/projects.ts`. The home page, the case-study route, prev/next links and the sitemap pick it up automatically. Set `featured: true` to show it among the large cards.

**Content rule:** only verifiable facts. Every metric should trace back to a repository, the thesis or the resume.

## Deploy

The site URL defaults to `https://mahamodul.no`. Set `NEXT_PUBLIC_SITE_URL` at build time for another domain; it drives canonical URLs, Open Graph tags, the sitemap and robots.txt.

`npm run build` writes plain files to `out/`, so any static host works:

- **Vercel / Cloudflare Pages / Netlify:** build command `npm run build`, output directory `out`.
- **GitHub Pages:** publish `out/` (for a project page under a sub-path, also set `basePath` in `next.config.ts`).
- **AWS:** `aws s3 sync out/ s3://<bucket> --delete` behind CloudFront.
