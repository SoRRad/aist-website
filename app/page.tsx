// Server component — no "use client"
import { mainTeam, collaboratorTeam } from "@/lib/team";
import { projects } from "@/lib/projects";
import { stats } from "@/lib/stats";
import { collaborators } from "@/lib/collaborators";
import { openings } from "@/lib/openings";
import { upcomingEvents } from "@/lib/events";
import { allNews } from "@/lib/news";

import { Section } from "@/components/site/section";
import { CircuitDivider } from "@/components/site/circuit-divider";

// Section components
import { HeroSection } from "@/components/sections/hero-section";
import { MissionSection } from "@/components/sections/mission-section";
import { CredibilityStrip } from "@/components/sections/credibility-strip";
import { CountersStripClient } from "@/components/sections/counters-strip-client";
import { ResearchProjectsClient } from "@/components/sections/research-projects-client";
import { TeamGridClient } from "@/components/sections/team-grid-client";
import { EventsSection } from "@/components/sections/events-section";
import { FromTheLabSection } from "@/components/sections/from-the-lab-section";
import { CollaboratorMarquee } from "@/components/lab/collaborator-marquee";
import { Reveal } from "@/components/motion/reveal";
import { JoinUsStrip } from "@/components/sections/join-us-strip";

export default function HomePage() {
  const recentNews = allNews.slice(0, 3);
  const sortedCollaborators = [...collaborators].sort((a, b) => a.order - b.order);

  return (
    <>
      <HeroSection />

      {/* 01 — Mission */}
      <Section code="01" label="Mission" id="mission">
        <MissionSection />
      </Section>

      {/* Credibility strip */}
      <CredibilityStrip />

      <CircuitDivider />

      {/* 02 — By the numbers */}
      <Section code="02" label="By the numbers" id="numbers">
        <CountersStripClient stats={stats} />
      </Section>

      <CircuitDivider />

      {/* 03 — Research & Projects */}
      <Section code="03" label="Research & Projects" id="research">
        <ResearchProjectsClient projects={projects} />
      </Section>

      <CircuitDivider />

      {/* 04 — Team */}
      <Section code="04" label="Team" id="team">
        <TeamGridClient mainTeam={mainTeam} collaboratorTeam={collaboratorTeam} />
      </Section>

      <CircuitDivider />

      {/* 05 — Upcoming Events */}
      <Section code="05" label="Events" id="events">
        <EventsSection events={upcomingEvents} />
      </Section>

      <CircuitDivider />

      {/* 06 — From the lab (news) */}
      <Section code="06" label="From the lab" id="news">
        <FromTheLabSection newsItems={recentNews} />
      </Section>

      <CircuitDivider />

      {/* 07 — Collaborators */}
      <Section code="07" label="Collaborators" id="collaborators">
        <Reveal showMark>
          <p className="eyebrow mb-8">Collaborating institutions</p>
        </Reveal>
        <CollaboratorMarquee items={sortedCollaborators} />
      </Section>

      {/* 08 — Join Us */}
      <div
        id="join"
        style={{ background: "var(--color-navy-1000)" }}
        className="mt-24"
      >
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <JoinUsStrip openings={openings} />
        </div>
      </div>
    </>
  );
}
