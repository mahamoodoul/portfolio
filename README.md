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

Every push to `main` deploys automatically through `.github/workflows/deploy.yml`:

```
push to main → npm ci → lint → next build → check export → upload → GitHub Pages (https://mahamodul.no)
```

Pull requests run the same checks without deploying. To release a change:

```bash
git add -A
git commit -m "Describe the change"
git push
```

Watch it with `gh run watch` or in the repository's Actions tab. A failed lint or build never reaches the live site.

The custom domain is set in `public/CNAME` and in the repository's Pages settings. DNS for `mahamodul.no` is managed at Cloudflare.
