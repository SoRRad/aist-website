import { ComingSoon } from "@/components/site/coming-soon";
export const metadata = { title: "Projects" };
export default function Page() {
  return (
    <ComingSoon
      title="Projects"
      step="Coming in Step 3"
      description="Deep pages for MOSI and SIRIS with embedded live tools, status timelines, and linked publications. The project index will support filtering by surgical phase and project status."
    />
  );
}
