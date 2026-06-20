import { PageShell, Skel } from "@/components/PageShell";

const TIERS = ["Start", "Vekst", "Skreddersydd"];

const Priser = () => (
  <PageShell
    eyebrow="Priser"
    title="Tydelige pakker"
    intro="Enkle, forutsigbare nivåer. (Plassholderside — priser kommer.)"
  >
    <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
      {TIERS.map((t) => (
        <div
          key={t}
          className="p-7"
          style={{
            borderRadius: 20,
            background: "rgba(255,255,255,0.4)",
            border: "1px solid rgba(42,31,22,0.1)",
          }}
        >
          <div className="hero-headline" style={{ fontSize: 26 }}>{t}</div>
          <Skel w="55%" h={12} mt={18} />
          <Skel w="80%" h={10} mt={22} />
          <Skel w="72%" h={10} mt={10} />
          <Skel w="84%" h={10} mt={10} />
          <Skel w="40%" h={10} mt={10} />
          <div
            className="mt-7 inline-block"
            style={{ color: "#8a5a2f", fontWeight: 700, fontSize: 13, letterSpacing: "0.06em" }}
          >
            Be om tilbud →
          </div>
        </div>
      ))}
    </div>
  </PageShell>
);

export default Priser;
