import type { Metadata } from "next";
import { activeMainTeam, mainTeam, collaboratorTeam } from "@/lib/team";
import { TeamRosterRow } from "@/components/lab/team-roster-row";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The surgeons, scientists, and engineers building surgical AI at AIST — core team and institutional collaborators.",
};

export default function TeamPage() {
  const openRoleCount = mainTeam.filter((member) => member.isOpenPosition).length;
  const coreTeamCount = activeMainTeam.length;
  const coreTeamLabel = `${coreTeamCount} member${coreTeamCount === 1 ? "" : "s"}${
    openRoleCount > 0
      ? ` · ${openRoleCount} open role${openRoleCount === 1 ? "" : "s"}`
      : ""
  }`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Page header */}
      <header className="mb-16 max-w-3xl">
        <p className="eyebrow mb-4">Team</p>
        <h1
          className="font-display text-balance text-5xl font-semibold tracking-tight sm:text-6xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          Surgeons, scientists, and engineers building surgical AI together.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted-foreground)]">
          AIST is a collaboration across surgical practice, artificial intelligence research,
          and engineering. Below: the core lab, our research fellows and engineers, and our
          institutional collaborators.
        </p>
      </header>

      {/* Core team */}
      <section className="mb-24">
        <div className="mb-10 flex items-baseline justify-between gap-4">
          <h2
            className="font-display text-3xl font-semibold tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Core team
          </h2>
          <span className="text-sm text-[var(--color-muted-foreground)]">
            {coreTeamLabel}
          </span>
        </div>
        <div className="divide-y divide-[var(--color-border)]">
          {mainTeam.map((member, idx) => (
            <TeamRosterRow key={member.slug} member={member} index={idx + 1} variant="main" />
          ))}
        </div>
      </section>

      {/* Collaborators subsection */}
      {collaboratorTeam.length > 0 && (
        <section>
          <div className="mb-10 flex items-baseline justify-between gap-4">
            <h2
              className="font-display text-3xl font-semibold tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Collaborators
            </h2>
            <span className="text-sm text-[var(--color-muted-foreground)]">
              {collaboratorTeam.length} individuals
            </span>
          </div>
          <p className="mb-10 max-w-2xl text-sm text-[var(--color-muted-foreground)]">
            Clinical and research collaborators whose contributions and partnerships
            extend the AIST Lab&apos;s reach.
          </p>
          <div className="divide-y divide-[var(--color-border)]">
            {collaboratorTeam.map((member, idx) => (
              <TeamRosterRow key={member.slug} member={member} index={idx + 1} variant="collaborator" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
