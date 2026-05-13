import { ComingSoon } from "@/components/site/coming-soon";
export const metadata = { title: "Now" };
export default function Page() {
  return (
    <ComingSoon
      title="What we're working on now"
      step="Coming in Step 4"
      description="A monthly snapshot of the lab's current focus — open in plain language. Inspired by the /now movement."
    />
  );
}
