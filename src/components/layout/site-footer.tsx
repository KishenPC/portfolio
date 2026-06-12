import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="border-border bg-surface border-t">
      <Container className="text-muted-foreground flex min-h-16 items-center justify-between gap-4 py-4 text-sm">
        <p>&copy; {new Date().getFullYear()}</p>
      </Container>
    </footer>
  );
}
