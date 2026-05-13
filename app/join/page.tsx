import { ComingSoon } from "@/components/site/coming-soon";
export const metadata = { title: "Join Us" };
export default function Page() {
  return (
    <ComingSoon
      title="Join AIST"
      step="Coming in Step 6"
      description="Open positions for postdocs, research fellows, residents, and engineering collaborators — plus a general interest form for prospective applicants."
    />
  );
}
