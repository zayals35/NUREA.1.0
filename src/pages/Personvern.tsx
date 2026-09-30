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
    p: "Skjemaene på siden sendes via Web3Forms, som formidler innholdet til vår e-post. Svar fra prosjektskjemaet lagres i tillegg som en fil i et privat GitHub-arkiv som bare Nurea har tilgang til. Siden er driftet på Vercel. Alle tre behandler data i tråd med sine personvernerklæringer.",
  },
  {
    h: "Informasjonskapsler og lagring i nettleseren",
    p: "Nettstedet setter ingen informasjonskapsler og bruker ingen analyseverktøy, annonsesporing eller innhold fra andre nettsteder som sporer deg. Skrifter og videoer lastes fra vår egen server. Nettleseren din lagrer bare det funksjonene du bruker trenger, og ingenting av det sendes til oss: «nurea-consent» husker at du har lukket meldingen om lagring, i opptil 180 dager. «nurea-sound» husker om du har slått lyd av eller på, og lagres bare hvis du bruker lydknappen. «nurea-skjema-v1» er et utkast av prosjektskjemaet mens du fyller det ut, og slettes når du sender det. «nurea-intro-seen» lagres bare for denne fanen, slik at en introanimasjon på enkelte eldre sider bare vises én gang. Du kan slette alt dette i nettleserens innstillinger.",
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
        <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-4 md:px-10 md:pb-32 md:pt-8">
          <div className="max-w-3xl">
            {SECTIONS.map((s, i) => (
              <Reveal key={s.h} delay={Math.min(i * 0.04, 0.15)} className="border-t border-ink/20 py-10">
                <h2 className="display-sans text-2xl md:text-3xl">{s.h}</h2>
                <p className="mt-4 max-w-[68ch] text-sm leading-relaxed text-ink/70 md:text-base">
                  {s.p}
                </p>
              </Reveal>
            ))}
            <Reveal className="border-t border-ink/20 py-10">
              <h2 className="display-sans text-2xl md:text-3xl">Behandlingsansvarlig</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink/70 md:text-base">
                NUREA, org.nr 937 929 145, Trondheim, Norge.{" "}
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
