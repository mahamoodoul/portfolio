import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";
import { ogImage } from "@/data/profile";
import { getProject, projects } from "@/data/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}/` },
    openGraph: {
      type: "article",
      url: `/projects/${project.slug}/`,
      title: project.title,
      description: project.summary,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: project.title, description: project.summary, images: [ogImage] },
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  return <ProjectCaseStudy project={projects[index]} prev={projects[index - 1]} next={projects[index + 1]} />;
}
