import { team } from "@/lib/team";
import { TeamCard } from "@/components/lab/team-card";

export const metadata = { title: "Team" };

export default function TeamPage() {
  const sorted = [...team].sort((a, b) => a.order - b.order);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12">
        <p className="eyebrow mb-4">The team</p>
        <h1
          className="font-display max-w-2xl text-balance text-5xl font-semibold tracking-tight sm:text-6xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          The people behind AIST.
        </h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sorted.map((member) => (
          <TeamCard key={member.slug} member={member} />
        ))}
      </div>
    </section>
  );
}
