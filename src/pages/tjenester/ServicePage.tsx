import { useParams, Link } from "react-router-dom";
import { SERVICES } from "@/data/services";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

const accent = "#8a5a2f";
const ink = "#2a1f16";

const eyebrowStyle = (color = accent) => ({
  fontFamily: "'Manrope','Inter',sans-serif",
  fontSize: 11 as const,
  fontWeight: 700 as const,
  letterSpacing: "0.26em",
  textTransform: "uppercase" as const,
  color,
});

const ServicePage = () => {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.id === slug);

  if (!service) {
    return (
      <PageShell eyebrow="Tjeneste" title="Ikke funnet" intro="Denne tjenesten finnes ikke.">
        <Link to="/tjenester" style={{ color: accent, fontWeight: 700, fontSize: 13 }}>
          ← Alle tjenester
        </Link>
      </PageShell>
    );
  }

  const otherServices = SERVICES.filter((s) => s.id !== service.id);
  const isComingSoon = service.id === "reklamer";

  return (
    <PageShell
      eyebrow={`Del av grunnmuren · ${service.position}`}
      title={service.title}
      intro={service.description}
    >
      {/* Back link */}
      <Link
        to="/tjenester"
        style={{
          color: accent,
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: "0.06em",
          fontFamily: "'Manrope','Inter',sans-serif",
        }}
      >
        ← Alle tjenester
      </Link>

      {/* Coming soon notice for Reklamer */}
      {isComingSoon && (
        <div
          style={{
            marginTop: 20,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(138,90,47,0.1)",
            border: "1px solid rgba(138,90,47,0.25)",
            borderRadius: 999,
            padding: "8px 18px",
            fontFamily: "'Manrope','Inter',sans-serif",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: accent,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: accent,
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          Kommer snart
        </div>
      )}

      {/* A — Statement block */}
      <Reveal>
        <div
          style={{
            marginTop: 56,
            borderTop: "1px solid rgba(42,31,22,0.12)",
            paddingTop: 48,
            paddingBottom: 56,
          }}
        >
          <h2
            className="hero-headline"
            style={{
              fontSize: "clamp(26px, 4.2vw, 54px)",
              maxWidth: 820,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
            }}
          >
            {service.statement}
          </h2>
          <p
            className="hero-body mt-6"
            style={{
              maxWidth: 580,
              fontSize: "clamp(15px, 1.15vw, 17px)",
              lineHeight: 1.72,
              opacity: 0.82,
            }}
          >
            {service.statementBody}
          </p>
          <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20 }}>
            <Link
              to="/kontakt"
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 50,
                padding: "0 28px",
                borderRadius: 999,
                background: ink,
                color: "#f3ecdb",
                fontFamily: "'Manrope','Inter',sans-serif",
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Book en klarhetssamtale →
            </Link>
            <Link
              to="/metoden"
              style={{
                color: accent,
                fontFamily: "'Manrope','Inter',sans-serif",
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Se metoden →
            </Link>
          </div>
        </div>
      </Reveal>

      {/* B — Deliverables */}
      <div style={{ paddingBottom: 56 }}>
        <Reveal>
          <p style={eyebrowStyle()}>Dette inngår</p>
          <p
            className="hero-body mt-3"
            style={{ maxWidth: 480, fontSize: 15, opacity: 0.68 }}
          >
            Ikke en løs leveranse, men en retning bedriften kan hvile på.
          </p>
        </Reveal>

        <div style={{ marginTop: 32 }}>
          {service.deliverables.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.07}>
              <div
                style={{
                  display: "flex",
                  gap: "clamp(20px, 4vw, 52px)",
                  alignItems: "flex-start",
                  borderTop: "1px dotted rgba(42,31,22,0.2)",
                  paddingTop: 24,
                  paddingBottom: 24,
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(30px, 4vw, 50px)",
                    fontWeight: 800,
                    color: accent,
                    opacity: 0.28,
                    lineHeight: 1,
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    flexShrink: 0,
                    minWidth: 44,
                    userSelect: "none",
                  }}
                >
                  {`0${i + 1}`}
                </span>
                <div style={{ paddingTop: 6 }}>
                  <div
                    className="hero-headline"
                    style={{ fontSize: "clamp(17px, 1.9vw, 23px)" }}
                  >
                    {d.title}
                  </div>
                  <p
                    className="hero-body"
                    style={{ marginTop: 8, fontSize: 15, maxWidth: "54ch", opacity: 0.78 }}
                  >
                    {d.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* C — Grunnmur band (full-width breakout) */}
      <Reveal>
        <div
          className="-mx-6 md:-mx-12 px-6 md:px-12 py-14 md:py-16"
          style={{ background: "#ece5d9" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 32,
              maxWidth: 860,
            }}
          >
            <div style={{ flex: 1, minWidth: 240 }}>
              <p style={eyebrowStyle()}>{service.position}</p>
              <p
                className="hero-body mt-3"
                style={{ maxWidth: 500, fontSize: "clamp(15px, 1.2vw, 17px)", lineHeight: 1.68 }}
              >
                {service.positionBody}
              </p>
            </div>
            <img
              src={service.image}
              alt=""
              aria-hidden
              style={{ width: 80, height: 80, objectFit: "contain", opacity: 0.7, flexShrink: 0 }}
            />
          </div>
        </div>
      </Reveal>

      {/* D — Other services */}
      <div style={{ paddingTop: 56, paddingBottom: 56 }}>
        <Reveal>
          <p style={eyebrowStyle()}>Andre deler av grunnmuren</p>
          <h3
            className="hero-headline mt-3"
            style={{ fontSize: "clamp(22px, 2.8vw, 34px)" }}
          >
            Fem deler. Én grunnmur.
          </h3>
        </Reveal>

        <div style={{ marginTop: 28, borderTop: "1px solid rgba(42,31,22,0.12)" }}>
          {otherServices.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <Link
                to={s.href}
                className="group"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 18,
                  paddingBottom: 18,
                  borderBottom: "1px solid rgba(42,31,22,0.12)",
                  textDecoration: "none",
                }}
              >
                <div>
                  <span
                    className="hero-headline"
                    style={{ fontSize: "clamp(16px, 1.8vw, 21px)" }}
                  >
                    {s.title}
                  </span>
                  <p
                    className="hero-body"
                    style={{ fontSize: 13.5, marginTop: 3, opacity: 0.65 }}
                  >
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
                    marginLeft: 20,
                  }}
                >
                  Utforsk →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      {/* E — Final CTA (full-width breakout) */}
      <Reveal>
        <div
          className="-mx-6 md:-mx-12 px-6 md:px-12 py-24 md:py-32"
          style={{ background: ink, color: "#f3ecdb", textAlign: "center" }}
        >
          <p style={eyebrowStyle("#d8b07a")}>Neste steg</p>
          <h2
            className="hero-headline"
            style={{
              fontSize: "clamp(30px, 5.5vw, 68px)",
              color: "#f3ecdb",
              marginTop: 16,
              maxWidth: 640,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {service.ctaHeading}
          </h2>
          <p
            className="hero-body"
            style={{
              marginTop: 18,
              maxWidth: 420,
              marginLeft: "auto",
              marginRight: "auto",
              color: "rgba(243,236,219,0.78)",
              fontSize: 16,
            }}
          >
            Vi starter med en rolig, uforpliktende samtale om hvor dere står, og hva som bør bli klarere først.
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
            Book en klarhetssamtale →
          </Link>
        </div>
      </Reveal>
    </PageShell>
  );
};

export default ServicePage;
