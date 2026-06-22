import { Link } from "react-router-dom";
import { SERVICES } from "@/data/services";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

const accent = "#8a5a2f";
const ink = "#2a1f16";

const eyebrowStyle = {
  fontFamily: "'Manrope','Inter',sans-serif",
  fontSize: 11 as const,
  fontWeight: 700 as const,
  letterSpacing: "0.26em",
  textTransform: "uppercase" as const,
  color: accent,
};

const TRAITS = [
  {
    label: "Rolig",
    body: "Vi overbeviser med presisjon, ikke volum. Ingen utropstegn, ingen superlativer.",
  },
  {
    label: "Trygg",
    body: "Tydelighet og tillit er strategien. Vi viser retning og ro, ikke press.",
  },
  {
    label: "Presis",
    body: "Én ting om gangen, gjort riktig. Enkle ord foran fine ord, alltid.",
  },
];

const OmOss = () => (
  <PageShell
    eyebrow="Om oss"
    title="Under overflaten."
    intro="Et lite studio med én tydelig retning: gjøre solide bedrifter lettere å forstå og lettere å velge."
  >
    {/* A — Philosophy */}
    <Reveal>
      <div
        style={{
          borderTop: "1px solid rgba(42,31,22,0.12)",
          paddingTop: 48,
          paddingBottom: 56,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "clamp(32px, 5vw, 72px)",
          alignItems: "start",
        }}
      >
        {/* Left: big quote */}
        <div>
          <blockquote
            className="hero-headline"
            style={{
              fontSize: "clamp(22px, 2.8vw, 34px)",
              lineHeight: 1.22,
              maxWidth: 480,
              borderLeft: `3px solid ${accent}`,
              paddingLeft: 20,
              margin: 0,
            }}
          >
            Vi bygger merkevare, nettside, innhold og systemer som ett system. Ikke løse produkter.
          </blockquote>
          <p
            className="hero-body mt-5"
            style={{ fontSize: 15.5, maxWidth: "46ch", lineHeight: 1.7, opacity: 0.78 }}
          >
            De fleste byråer selger tjenester. Vi selger klarhet. Resultatet er ikke en leveranse
            du betaler for og legger i en skuff. Det er et digitalt uttrykk som henger sammen,
            og som faktisk gjør jobben for bedriften din.
          </p>
        </div>

        {/* Right: personality traits */}
        <div>
          <p style={eyebrowStyle}>Slik jobber vi</p>
          <div style={{ marginTop: 20 }}>
            {TRAITS.map((t, i) => (
              <Reveal key={t.label} delay={i * 0.07}>
                <div
                  style={{
                    paddingTop: 18,
                    paddingBottom: 18,
                    borderTop: "1px dotted rgba(42,31,22,0.2)",
                  }}
                >
                  <div className="hero-headline" style={{ fontSize: 19 }}>{t.label}</div>
                  <p className="hero-body mt-1" style={{ fontSize: 14.5, opacity: 0.72, maxWidth: "38ch" }}>
                    {t.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Reveal>

    {/* B — Services strip */}
    <Reveal>
      <div style={{ paddingBottom: 56 }}>
        <p style={eyebrowStyle}>Hva vi gjør</p>
        <h2
          className="hero-headline mt-3"
          style={{ fontSize: "clamp(24px, 3vw, 38px)" }}
        >
          Fem deler. Én grunnmur.
        </h2>
        <p
          className="hero-body mt-3"
          style={{ maxWidth: 520, fontSize: 15.5, opacity: 0.75 }}
        >
          Tjenestene er ikke løse produkter. De er deler av samme digitale grunnlag, og henger sammen.
        </p>

        <div style={{ marginTop: 32, borderTop: "1px solid rgba(42,31,22,0.12)" }}>
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <Link
                to={s.href}
                className="group"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  paddingTop: 18,
                  paddingBottom: 18,
                  borderBottom: "1px solid rgba(42,31,22,0.12)",
                  textDecoration: "none",
                }}
              >
                <img
                  src={s.image}
                  alt=""
                  aria-hidden
                  style={{ width: 40, height: 40, objectFit: "contain", opacity: 0.75, flexShrink: 0 }}
                />
                <div style={{ flex: 1 }}>
                  <span className="hero-headline" style={{ fontSize: "clamp(16px, 1.7vw, 20px)" }}>
                    {s.title}
                  </span>
                  <p className="hero-body" style={{ fontSize: 13.5, marginTop: 2, opacity: 0.65 }}>
                    {s.description}
                  </p>
                </div>
                <span
                  className="opacity-0 group-hover:opacity-100 transition"
                  style={{
                    color: accent,
                    fontFamily: "'Manrope','Inter',sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    flexShrink: 0,
                  }}
                >
                  Utforsk →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </Reveal>

    {/* C — Dark CTA cap (full-width breakout) */}
    <Reveal>
      <div
        className="-mx-6 md:-mx-12 px-6 md:px-12 py-24 md:py-32"
        style={{ background: ink, color: "#f3ecdb", textAlign: "center" }}
      >
        <p
          style={{
            fontFamily: "'Manrope','Inter',sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "#d8b07a",
          }}
        >
          Neste steg
        </p>
        <h2
          className="hero-headline"
          style={{
            fontSize: "clamp(28px, 5vw, 62px)",
            color: "#f3ecdb",
            marginTop: 16,
            maxWidth: 600,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Usikker på hva bedriften trenger?
        </h2>
        <p
          className="hero-body"
          style={{
            marginTop: 18,
            maxWidth: 400,
            marginLeft: "auto",
            marginRight: "auto",
            color: "rgba(243,236,219,0.78)",
            fontSize: 16,
          }}
        >
          Det er ofte nettopp der vi starter. Vi ser på hva som er uklart, og hvilken retning som gir mest mening videre.
        </p>
        <Link
          to="/kontakt"
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginTop: 32,
            height: 52,
            padding: "0 32px",
            borderRadius: 999,
            background: "#f3ecdb",
            color: ink,
            fontFamily: "'Manrope','Inter',sans-serif",
            fontSize: 15,
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          La oss snakke →
        </Link>
      </div>
    </Reveal>
  </PageShell>
);

export default OmOss;
