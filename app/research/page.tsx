import { ComingSoon } from "@/components/site/coming-soon";
export const metadata = { title: "Research" };
export default function Page() {
  return (
    <ComingSoon
      title="Research focus"
      step="Coming in Step 2"
      description="The full surgical-phase navigator — pre-operative planning, intra-operative guidance, post-operative recovery, and external validation. Each phase will link to the projects working on it."
    />
  );
}
