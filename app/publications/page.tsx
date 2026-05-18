import { Suspense } from "react";
import { publications } from "@/lib/publications";
import { PublicationDashboard } from "@/components/publications/publication-dashboard";

export const metadata = { title: "Publications" };

export default function PublicationsPage() {
  return (
    <Suspense fallback={<div className="py-32 text-center text-[var(--color-muted-foreground)]">Loading...</div>}>
      <PublicationDashboard
        publications={publications}
        eyebrow="Research output"
        title="Publications."
        description="Research outputs from the A-STAR ecosystem — original research, systematic reviews, and technical reports."
        exportBaseName="astar-publications"
      />
    </Suspense>
  );
}
