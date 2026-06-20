import { PageShell, Skel } from "@/components/PageShell";

const Arbeider = () => (
  <PageShell
    eyebrow="Arbeider"
    title="Utvalgte prosjekter"
    intro="Et utvalg av arbeidet vårt. (Plassholderside — prosjekter kommer.)"
  >
    <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i}>
          <div
            style={{
              aspectRatio: "4 / 3",
              borderRadius: 18,
              background: "rgba(42,31,22,0.08)",
              border: "1px solid rgba(42,31,22,0.08)",
            }}
          />
          <Skel w="60%" h={13} mt={16} />
          <Skel w="40%" h={10} mt={9} />
        </div>
      ))}
    </div>
  </PageShell>
);

export default Arbeider;
