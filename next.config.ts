import type { NextConfig } from "next";

// Fully static site: `next build` writes plain HTML/CSS/JS to `out/`, which any static host can serve
// (Vercel, Cloudflare Pages, GitHub Pages, S3 + CloudFront).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
