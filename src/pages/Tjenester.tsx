import { Link } from "react-router-dom";
import { SERVICES } from "@/data/services";
import { PageShell } from "@/components/PageShell";

const Tjenester = () => (
  <PageShell
    eyebrow="Tjenester"
    title="Det vi gjør"
    intro="Fem tjenester, én tydelig retning. (Plassholderside.)"
  >
    <div className="grid gap-px" style={{ borderTop: "1px solid rgba(42,31,22,0.12)" }}>
      {SERVICES.map((s) => (
        <Link
          key={s.id}
          to={`/tjenester/${s.id}`}
          className="group flex items-baseline justify-between py-6 transition"
          style={{ borderBottom: "1px solid rgba(42,31,22,0.12)" }}
        >
          <span className="hero-headline" style={{ fontSize: "clamp(26px, 4vw, 44px)" }}>
            {s.title}
          </span>
          <span
            className="opacity-0 group-hover:opacity-100 transition"
            style={{ color: "#8a5a2f", fontWeight: 700, fontSize: 13, letterSpacing: "0.1em" }}
          >
            Utforsk →
          </span>
        </Link>
      ))}
    </div>
  </PageShell>
);

export default Tjenester;
