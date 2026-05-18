import { Reveal } from "@/components/motion/reveal";

export function MissionSection() {
  return (
    <Reveal showMark>
      <p className="eyebrow mb-6">Our mission</p>
      <p
        className="font-display max-w-4xl text-balance font-semibold leading-[1.05]"
        style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}
      >
        A-STAR advances artificial intelligence across the full surgical journey —
        from risk stratification through patient education and rigorous validation.
      </p>
    </Reveal>
  );
}
