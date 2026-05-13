import { ComingSoon } from "@/components/site/coming-soon";
export const metadata = { title: "About" };
export default function Page() {
  return (
    <ComingSoon
      title="About AIST"
      step="Coming in Step 4"
      description="Our mission, philosophy, and why surgical AI matters across the full operative journey. This page is being built — check back as the lab evolves."
    />
  );
}
