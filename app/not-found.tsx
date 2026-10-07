import { ArrowLeft } from "@/components/icons";
import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start gap-5 py-28">
      <p className="font-mono text-sm text-faint">HTTP 404</p>
      <h1 className="text-3xl font-semibold tracking-tight text-fg">This page doesn&apos;t exist.</h1>
      <p className="text-muted">The link may be out of date. The projects are all on the home page.</p>
      <ButtonLink href="/#projects">
        <ArrowLeft /> Back to projects
      </ButtonLink>
    </Container>
  );
}
