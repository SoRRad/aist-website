import { ComingSoon } from "@/components/site/coming-soon";
export const metadata = { title: "News" };
export default function Page() {
  return (
    <ComingSoon
      title="News"
      step="Coming in Step 5"
      description="Lab updates, awards, paper acceptances, and press mentions. Updates every two weeks."
    />
  );
}
