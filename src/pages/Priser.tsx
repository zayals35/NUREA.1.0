import type { ReactNode } from "react";
import { PageShell } from "@/components/PageShell";

interface Tier {
  name: string;
  tagline?: string;
  desc: string;
  points: string[];
  featured?: boolean;
}

const RETAINER: Tier[] = [
  {
    name: "Teknisk trygghet",
    desc: "Det laveste nivået. Vi holder det tekniske trygt i bakgrunnen, så du aldri trenger å tenke på at noe krasjer. Hvor stort omfanget er avhenger av hva du allerede har, og prisen settes deretter.",
    points: [
      "Månedlig sjekk av hosting, sky-sikkerhet og API-stabilitet",
      "Du slipper å tenke på at siden krasjer",
    ],
  },
  {
    name: "Digital optimering",
    desc: "Et steg opp. Vi følger med på trafikk og konvertering, og forbedrer jevnt, måned for måned. Hvor mye vi optimerer formes etter bedriften din, og prisen følger omfanget.",
    points: [
      "Månedlig 1-sides helserapport med trafikk og konverteringsdata",
      "Jevn, løpende optimering",
      "Alt fra Teknisk trygghet er inkludert",
    ],
  },
  {
    name: "Strategisk allianse",
    tagline: "Din outsourcede kreative avdeling, samlet i én partner.",
    featured: true,
    desc: "Det høyeste nivået. Strategi, innhold og prioritert eksekvering, skreddersydd helt etter ambisjonene og tempoet ditt. To bedrifter på dette nivået ser sjelden helt like ut.",
    points: [
      "Månedlig strategisamtale (30 min)",
      "Prioritert respons og eksekvering innen 24–48 timer",
      "Alt fra Digital optimering er inkludert",
    ],
  },
];

const CONTENT: Tier[] = [
  {
    name: "Fast og jevnt",
    desc: "En rolig, forutsigbar grunnmengde innhold hver måned, i din stil. Vi blir enige om mengden som passer deg, og prisen settes etter den.",
    points: ["Ferdige visuelle elementer hver måned", "I din stil, klart til bruk"],
  },
  {
    name: "Mer bevegelse",
    desc: "Mer innhold, med bevegelse og video i miksen. Vi setter rytmen sammen med deg, og tilpasser omfang og pris til hvor synlig du vil være.",
    points: ["Mer innhold, inkludert bevegelse og video", "Jevnt tempo gjennom måneden"],
  },
  {
    name: "Full produksjon",
    desc: "Full produksjon for bedrifter som vil være synlige hele tiden. En jevn strøm av video og nye pakker, dimensjonert, og priset, etter ambisjonene dine.",
    points: ["Jevn strøm av video gjennom måneden", "Nye pakker for hver sesong"],
  },
];

const TierCard = ({ t }: { t: Tier }) => (
  <div
    className="p-7 flex flex-col"
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
    <p className="hero-body" style={{ marginTop: 14, fontSize: 14.5, lineHeight: 1.6 }}>{t.desc}</p>
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
    <div className="mt-6" style={{ marginTop: "auto", paddingTop: 18 }}>
      <span
        style={{
          display: "inline-block",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#8a5a2f",
          background: "rgba(138,90,47,0.1)",
          padding: "5px 12px",
          borderRadius: 999,
        }}
      >
        Pris tilpasses deg
      </span>
      <div
        className="mt-4 inline-block"
        style={{ color: "#8a5a2f", fontWeight: 700, fontSize: 13, letterSpacing: "0.06em" }}
      >
        Be om et tilbud →
      </div>
    </div>
  </div>
);

const Group = ({ label, title, intro, children }: { label: string; title: string; intro: string; children: ReactNode }) => (
  <div className="mb-20">
    <p style={{ color: "#8a5a2f", fontWeight: 700, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase" }}>
      {label}
    </p>
    <h2 className="hero-headline" style={{ fontSize: "clamp(28px, 4vw, 44px)", marginTop: 10 }}>{title}</h2>
    <p className="hero-body mt-3" style={{ maxWidth: 540 }}>{intro}</p>
    <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
      {children}
    </div>
  </div>
);

const Priser = () => (
  <PageShell
    eyebrow="Priser"
    title="Ingen prislister. Bare riktig nivå for deg."
    intro="Hver bedrift er ulik i størrelse, tempo og behov, så prisen settes alltid individuelt. Velg nivået som ligner mest, så former vi det rundt deg i en klarhetssamtale."
  >
    <Group
      label="01 / Retainer"
      title="Velg ditt nivå."
      intro="Tre nivåer for bedrifter vi allerede har satt opp digitalt. Bruk dem som utgangspunkt, vi tilpasser innhold og pris til deg."
    >
      {RETAINER.map((t) => (
        <TierCard key={t.name} t={t} />
      ))}
    </Group>

    <Group
      label="02 / Innhold hver måned"
      title="Innhold hver måned."
      intro="Jevnt med innhold uten at du må tenke på det. Velg rytmen, så dimensjonerer vi mengden, og prisen, etter deg."
    >
      {CONTENT.map((t) => (
        <TierCard key={t.name} t={t} />
      ))}
    </Group>

    <p className="hero-body" style={{ maxWidth: 640, fontSize: 13.5, opacity: 0.72 }}>
      Før det månedlige starter, setter vi opp grunnlaget én gang. Omfanget, og prisen,
      avtales i en klarhetssamtale, så du vet nøyaktig hva du får før vi begynner. Ingen
      overraskelser, verken i omfang eller pris.
    </p>
  </PageShell>
);

export default Priser;
