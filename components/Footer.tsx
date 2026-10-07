import Link from "next/link";
import { profile } from "@/data/profile";
import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <Container className="flex flex-col gap-4 py-8 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-fg">
              GitHub
            </a>
          </li>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-fg">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.email}`} className="transition-colors hover:text-fg">
              Email
            </a>
          </li>
          <li>
            <Link href="/#projects" className="transition-colors hover:text-fg">
              Projects
            </Link>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
