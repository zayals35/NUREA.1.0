import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { WorkCard } from "@/components/home/WorkCard";
import { WORK } from "@/data/work";

const Arbeider = () => (
  <PageShell
    eyebrow="Arbeider"
    title="Utvalgte prosjekter"
    intro="Et utvalg av arbeidet vårt. Merkevare, nettsider, innhold og digitale systemer, samlet i én tydelig retning."
  >
    <div
      className="flex flex-col gap-8"
      style={{ borderTop: "1px dotted rgba(42,31,22,0.28)", paddingTop: 32, maxWidth: 1100 }}
    >
      {WORK.map((w, i) => (
        <Reveal key={w.id} delay={(i % 2) * 0.05}>
          <WorkCard item={w} index={i} total={WORK.length} />
        </Reveal>
      ))}
    </div>
  </PageShell>
);

export default Arbeider;
