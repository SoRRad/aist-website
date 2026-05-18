"use client";

import { Reveal } from "@/components/motion/reveal";
import { ExploreMore } from "@/components/site/explore-more";
import { PlayingCard } from "@/components/lab/playing-card";
import type { TeamMember } from "@/lib/team";

interface TeamGridClientProps {
  mainTeam: TeamMember[];
  collaboratorTeam: TeamMember[];
}

export function TeamGridClient({ mainTeam, collaboratorTeam }: TeamGridClientProps) {
  return (
    <>
      <Reveal>
        <p className="eyebrow mb-4">The team</p>
        <h2
          className="font-display mb-4 max-w-xl text-balance text-3xl font-semibold tracking-tight lg:text-4xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          The people behind A-STAR.
        </h2>
      </Reveal>

      {/* Core team */}
      <div className="mt-10">
        <p className="eyebrow mb-6 text-[var(--color-muted-foreground)]">Core team</p>
        <div className="flex flex-wrap justify-center gap-6">
          {mainTeam.map((member, i) => (
            <div key={member.slug} className="w-[calc(50%-12px)] max-w-[200px] sm:w-[calc(33.33%-16px)] lg:w-[calc(20%-20px)]">
              <PlayingCard member={member} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* Collaborators */}
      {collaboratorTeam.length > 0 && (
        <div className="mt-14">
          <p className="eyebrow mb-6 text-[var(--color-muted-foreground)]">Collaborators</p>
          <div className="flex flex-wrap justify-center gap-6">
            {collaboratorTeam.map((member, i) => (
              <div key={member.slug} className="w-[calc(50%-12px)] max-w-[200px] sm:w-[calc(33.33%-16px)] lg:w-[calc(25%-18px)]">
                <PlayingCard member={member} index={mainTeam.length + i} />
              </div>
            ))}
          </div>
        </div>
      )}

      <ExploreMore href="/team">Meet the full team</ExploreMore>
    </>
  );
}
