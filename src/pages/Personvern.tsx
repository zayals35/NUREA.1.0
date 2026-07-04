import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { LEAD_EMAIL } from "../lib/useWebForm";

const SECTIONS = [
  {
    h: "Hvilke opplysninger vi samler inn",
    p: "Når du sender inn et skjema på denne siden (klarhetssjekk eller kontakt), lagrer vi opplysningene du selv oppgir: navn, e-postadresse, nettside eller Instagram-handle, og innholdet i meldingen din. Vi samler ikke inn andre personopplysninger, og vi bruker ikke sporingsverktøy for annonsering.",
  },
  {
    h: "Hva opplysningene brukes til",
    p: "Opplysningene brukes kun til å svare på henvendelsen din og følge opp dialogen du selv har startet. Vi selger eller deler aldri opplysningene dine med tredjeparter for markedsføring.",
  },
  {
    h: "Behandlingsgrunnlag",
    p: "Behandlingen skjer på grunnlag av ditt samtykke, som du gir ved å sende inn skjemaet. Du kan når som helst trekke samtykket tilbake ved å kontakte oss.",
  },
  {
    h: "Hvor lenge vi lagrer opplysningene",
    p: "Vi lagrer henvendelser så lenge det er nødvendig for å følge opp dialogen. Du kan når som helst be om at opplysningene dine slettes.",
  },
  {
    h: "Tredjeparter",
    p: "Skjemaene på siden sendes via Web3Forms, som formidler innholdet til vår e-post. Siden er driftet på Vercel. Begge behandler data i tråd med sine personvernerklæringer.",
  },
  {
    h: "Dine rettigheter",
    p: "Du har rett til innsyn, retting og sletting av opplysningene vi har om deg, og rett til å klage til Datatilsynet. Ta kontakt, så hjelper vi deg raskt.",
  },
];

export default function Personvern() {
  return (
    <main>
      <PageHeader
        docTitle="Personvern"
        eyebrow="Personvern"
        title="Personvernerklæring."
        intro="Kort fortalt: vi lagrer bare det du selv sender oss, vi bruker det bare til å svare deg, og du kan når som helst be om at det slettes."
      />

      <section className="bg-parchment text-ink">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-32">
          <div className="max-w-3xl">
            {SECTIONS.map((s, i) => (
              <Reveal key={s.h} delay={Math.min(i * 0.04, 0.15)} className="border-t border-ink/10 py-10">
                <h2 className="display-sans text-2xl md:text-3xl">{s.h}</h2>
                <p className="mt-4 max-w-[68ch] text-sm leading-relaxed text-ink/65 md:text-base">
                  {s.p}
                </p>
              </Reveal>
            ))}
            <Reveal className="border-t border-ink/10 py-10">
              <h2 className="display-sans text-2xl md:text-3xl">Behandlingsansvarlig</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink/65 md:text-base">
                NUREA, Trondheim, Norge.{" "}
                <a href={`mailto:${LEAD_EMAIL}`} className="link-line font-semibold text-accent">
                  {LEAD_EMAIL}
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
