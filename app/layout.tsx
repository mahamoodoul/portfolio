import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { ogImage, profile, siteUrl } from "@/data/profile";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

const title = `${profile.name} · Software Engineer in Oslo`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s · ${profile.name}` },
  description: profile.description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: [
    "Md Mahamodul Islam",
    "Software Engineer Oslo",
    "Backend Engineer Norway",
    "Cloud Engineer Norway",
    "Data Engineer Norway",
    ".NET Developer Norway",
    "AWS",
    "Zero Trust",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "en_GB",
    url: "/",
    siteName: profile.name,
    title,
    description: profile.description,
    firstName: "Md Mahamodul",
    lastName: "Islam",
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", title, description: profile.description, images: [ogImage] },
  robots: { index: true, follow: true },
  formatDetection: { email: false, telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f7f8fa",
  colorScheme: "light dark",
};

// Applies a saved theme before first paint. Light is the default.
const themeScript = `try{if(localStorage.getItem("theme")==="dark"){document.documentElement.dataset.theme="dark";document.querySelector('meta[name="theme-color"]')?.setAttribute("content","#0a0c0f")}}catch(e){}`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: siteUrl,
  image: `${siteUrl}/mahamodul.jpg`,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Oslo", addressCountry: "NO" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of Oslo" },
    { "@type": "CollegeOrUniversity", name: "Daffodil International University" },
  ],
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: ["Backend engineering", ".NET", "Python", "AWS", "Data engineering", "Application security", "Zero Trust", "Distributed systems"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col font-sans">
        <a
          href="#main"
          className="sr-only z-[100] rounded-md bg-fg px-4 py-2 text-sm font-medium text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Navigation />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
