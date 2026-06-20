import { PageShell, Skel } from "@/components/PageShell";

const Kontakt = () => (
  <PageShell
    eyebrow="Kontakt"
    title="La oss snakke"
    intro="Fortell oss kort hva du trenger, så tar vi det derfra. (Plassholderside.)"
  >
    <div className="grid gap-12" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
      <div style={{ maxWidth: 420 }}>
        <Skel w="30%" h={11} />
        <Skel w="70%" h={16} mt={8} />
        <Skel w="30%" h={11} mt={26} />
        <Skel w="64%" h={16} mt={8} />
        <Skel w="30%" h={11} mt={26} />
        <Skel w="90%" h={70} mt={8} />
        <div
          className="mt-7 inline-block"
          style={{ color: "#8a5a2f", fontWeight: 700, fontSize: 13, letterSpacing: "0.06em" }}
        >
          Send →
        </div>
      </div>
      <div>
        <div className="hero-body" style={{ fontWeight: 600 }}>NUREA</div>
        <Skel w="180px" h={11} mt={14} />
        <Skel w="150px" h={11} mt={10} />
        <Skel w="160px" h={11} mt={10} />
        <p className="hero-body mt-6" style={{ fontSize: 13, opacity: 0.7 }}>Oslo · Norge</p>
      </div>
    </div>
  </PageShell>
);

export default Kontakt;
