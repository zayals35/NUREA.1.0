import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import WordReveal from "../components/WordReveal";

const TRAITS = [
  {
    h: "Rolig",
    p: "Vi overbeviser med presisjon, ikke volum. Ingen utropstegn, ingen superlativer.",
  },
  {
    h: "Trygg",
    p: "Klarhet og tillit er strategien. Vi viser retning og ro, ikke press.",
  },
  {
    h: "Presis",
    p: "Én ting av gangen, gjort riktig. Enkle ord foran fine ord, alltid.",
  },
];

export default function OmOss() {
  return (
    <main>
      <PageHeader
        docTitle="Om oss"
        eyebrow="Om oss"
        title="Under overflaten."
        intro="Et lite studio med én tydelig retning: gjøre solide bedrifter lettere å forstå og lettere å velge."
      />

      <section className="grain relative overflow-hidden bg-espresso text-cream">
        <div className="relative z-[2] mx-auto max-w-[1440px] px-6 pb-24 md:px-10 md:pb-36">
          <WordReveal
            className="display max-w-4xl text-2xl leading-[1.2] sm:text-3xl md:text-5xl"
            text="Vi bygger merkevare, nettside, innhold og systemer som *ett* *system.* Ikke løse produkter."
          />
          <Reveal className="mt-12 flex items-center gap-4" delay={0.1}>
            <span
              aria-hidden="true"
              className="display flex h-14 w-14 items-center justify-center rounded-full border border-accent/50 bg-accent/15 text-xl text-cream"
            >
              Z
            </span>
            <span>
              <span className="block font-semibold text-cream">Zaynab</span>
              <span className="block text-sm text-cream/50">
                Grunnlegger og din kontaktperson i hvert prosjekt
              </span>
            </span>
          </Reveal>
        </div>
      </section>

      <section className="bg-parchment text-ink">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-32">
          <Reveal>
            <p className="eyebrow text-accent">Slik jobber vi</p>
          </Reveal>
          <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-10">
            {TRAITS.map((t, i) => (
              <Reveal key={t.h} delay={i * 0.1} className="border-t-2 border-accent/30 pt-6">
                <h2 className="display text-3xl md:text-4xl">{t.h}</h2>
                <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-ink/60 md:text-base">
                  {t.p}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-24 max-w-3xl">
            <p className="text-base leading-relaxed text-ink/65 md:text-lg">
              NUREA holder til i Trondheim. Zaynab leder hvert oppdrag, fra
              strategi og kreativ retning til gjennomføring, og trekker inn
              nøye utvalgte samarbeidspartnere på design og utvikling når
              omfanget krever det. Kvaliteten og omsorgen for arbeidet er den
              samme, uansett prosjektets størrelse.
            </p>
            <div className="mt-10">
              <Button to="/klarhetssjekk">Få din klarhetssjekk</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
