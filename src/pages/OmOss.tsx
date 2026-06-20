import { PageShell, Skel } from "@/components/PageShell";

const OmOss = () => (
  <PageShell
    eyebrow="Om oss"
    title="Under overflaten"
    intro="Et lite studio med én tydelig retning. (Plassholderside.)"
  >
    <div className="grid gap-12" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
      <div style={{ maxWidth: 520 }}>
        <Skel w="100%" h={12} />
        <Skel w="96%" h={12} mt={12} />
        <Skel w="92%" h={12} mt={12} />
        <Skel w="70%" h={12} mt={12} />
        <Skel w="88%" h={12} mt={28} />
        <Skel w="80%" h={12} mt={12} />
      </div>
      <div>
        {["Merkevare", "Nettsider", "Innhold", "Systemer", "Reklamer"].map((k) => (
          <div
            key={k}
            className="py-4 hero-body"
            style={{ borderBottom: "1px solid rgba(42,31,22,0.12)", fontWeight: 600 }}
          >
            {k}
          </div>
        ))}
      </div>
    </div>
  </PageShell>
);

export default OmOss;
