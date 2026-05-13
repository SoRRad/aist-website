import { ComingSoon } from "@/components/site/coming-soon";
export const metadata = { title: "Events" };
export default function Page() {
  return (
    <ComingSoon
      title="Events"
      step="Coming in Step 5"
      description="Upcoming meetings, conferences, and lab talks — plus an archive of past events with slides and recordings."
    />
  );
}
