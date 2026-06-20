import type { ReactNode } from "react";
import { PageShell } from "@/components/PageShell";

interface Tier {
  name: string;
  price: string;
  range?: string;
  tagline?: string;
  points: string[];
  featured?: boolean;
}

const RETAINER: Tier[] = [
  {
    name: "Teknisk trygghet",
    price: "1 900",
    range: "1 900–2 500 kr/mnd",
    points: [
      "Månedlig sjekk av hosting, sky-sikkerhet og API-stabilitet",
      "Du slipper å tenke på at siden krasjer",
    ],
  },
  {
    name: "Digital optimering",
    price: "4 500",
    range: "4 500–5 500 kr/mnd",
    points: [
      "Månedlig 1-sides helserapport med trafikk og konverteringsdata",
      "Alt fra Teknisk trygghet er inkludert",
    ],
  },
  {
    name: "Strategisk allianse",
    price: "12 500",
    range: "12 500–15 000 kr/mnd",
    tagline: "Din outsourcede kreative avdeling, samlet i én partner.",
    featured: true,
    points: [
      "Månedlig strategisamtale (30 min)",
      "Prioritert respons og eksekvering innen 24–48 timer",
      "Alt fra Digital optimering er inkludert",
    ],
  },
];

const CONTENT: Tier[] = [
  { name: "Fast og jevnt", price: "3 500", points: ["8 ferdige visuelle elementer i måneden"] },
  { name: "Mer bevegelse", price: "7 500", points: ["Mer innhold, med bevegelse og video"] },
  {
    name: "Full produksjon",
    price: "14 500",
    points: ["Jevn strøm av video gjennom måneden", "Nye pakker for hver sesong"],
  },
];

const TierCard = ({ t }: { t: Tier }) => (
  <div
    className="p-7"
    style={{
      borderRadius: 20,
      background: "rgba(255,255,255,0.42)",
      border: t.featured ? "2px solid #8a5a2f" : "1px solid rgba(42,31,22,0.12)",
    }}
  >
    <div className="hero-headline" style={{ fontSize: 24 }}>{t.name}</div>
    {t.tagline && (
      <p className="hero-body" style={{ marginTop: 8, fontSize: 13.5, opacity: 0.85 }}>{t.tagline}</p>
    )}
    <div className="mt-5" style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
      <span className="hero-headline" style={{ fontSize: 34 }}>{t.price}</span>
      <span className="hero-body" style={{ fontSize: 13, opacity: 0.7 }}>kr/mnd</span>
    </div>
    {t.range && (
      <p className="hero-body" style={{ marginTop: 4, fontSize: 12, opacity: 0.6 }}>Intervall {t.range}</p>
    )}
    <ul className="mt-5" style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {t.points.map((p) => (
        <li
          key={p}
          className="hero-body"
          style={{ fontSize: 14, padding: "8px 0", borderTop: "1px solid rgba(42,31,22,0.1)" }}
        >
          {p}
        </li>
      ))}
    </ul>
    <div
      className="mt-6 inline-block"
      style={{ color: "#8a5a2f", fontWeight: 700, fontSize: 13, letterSpacing: "0.06em" }}
    >
      Be om tilbud →
    </div>
  </div>
);

const Group = ({ label, title, intro, children }: { label: string; title: string; intro: string; children: ReactNode }) => (
  <div className="mb-20">
    <p style={{ color: "#8a5a2f", fontWeight: 700, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase" }}>
      {label}
    </p>
    <h2 className="hero-headline" style={{ fontSize: "clamp(28px, 4vw, 44px)", marginTop: 10 }}>{title}</h2>
    <p className="hero-body mt-3" style={{ maxWidth: 520 }}>{intro}</p>
    <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
      {children}
    </div>
  </div>
);

const Priser = () => (
  <PageShell
    eyebrow="Priser"
    title="En grunnmur må følges opp, ikke bare bygges."
    intro="Månedlig partner, ikke engangsprosjekt. Velg nivået som passer bedriften din."
  >
    <Group
      label="01 / Retainer"
      title="Velg ditt nivå."
      intro="Tre faste pakker for bedrifter vi allerede har satt opp. Passer ingen? Vi lager en skreddersydd fastpris."
    >
      {RETAINER.map((t) => (
        <TierCard key={t.name} t={t} />
      ))}
    </Group>

    <Group
      label="02 / Innhold hver måned"
      title="Innhold hver måned."
      intro="Jevnt med innhold uten at du må tenke på det. Vi lager det i din stil, hver måned. Du velger hvor mye."
    >
      {CONTENT.map((t) => (
        <TierCard key={t.name} t={t} />
      ))}
    </Group>

    <p className="hero-body" style={{ maxWidth: 620, fontSize: 13.5, opacity: 0.7 }}>
      Prisene gjelder bedrifter NUREA allerede har satt opp digitalt. Nye kunder starter med
      et engangsoppsett (fastpris) som avtales i en klarhetssamtale, før den månedlige
      retaineren begynner.
    </p>
  </PageShell>
);

export default Priser;
