import { ComingSoon } from "@/components/site/coming-soon";
export const metadata = { title: "Publications" };
export default function Page() {
  return (
    <ComingSoon
      title="Publications"
      step="Coming in Step 5"
      description="Filterable by year, project, author, and venue, with BibTeX and RIS export for every entry."
    />
  );
}
