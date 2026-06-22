import type { ReactNode } from "react";
import { PageShell } from "@/components/PageShell";

const accent = "#8a5a2f";

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <div style={{ marginBottom: 36, maxWidth: 680 }}>
    <h2 className="hero-headline" style={{ fontSize: "clamp(20px, 2.6vw, 28px)", marginBottom: 12 }}>
      {title}
    </h2>
    {children}
  </div>
);

const P = ({ children }: { children: ReactNode }) => (
  <p className="hero-body" style={{ fontSize: 15.5, lineHeight: 1.7, marginBottom: 12 }}>
    {children}
  </p>
);

const Personvern = () => (
  <PageShell
    eyebrow="Personvern"
    title="Personvernerklæring"
    intro="Hvordan NUREA behandler personopplysningene dine når du tar kontakt eller ber om en klarhetssjekk."
  >
    <Section title="Behandlingsansvarlig">
      <P>
        NUREA, Trondheim, Norge, er ansvarlig for behandlingen av personopplysninger på dette
        nettstedet. Har du spørsmål om personvern, kontakt oss på{" "}
        <a href="mailto:hei@nurea.no" style={{ color: accent, fontWeight: 600 }}>hei@nurea.no</a>.
      </P>
    </Section>

    <Section title="Hvilke opplysninger vi samler inn">
      <P>
        Vi samler kun inn det du selv oppgir i skjemaene våre. I kontaktskjemaet kan dette være
        navn, e-postadresse, bedriftsnavn, hvilke tjenester du er interessert i, og meldingen din.
        I klarhetssjekken samler vi inn nettside eller Instagram-profil, e-postadresse, valgt
        fokusområde og eventuelt navn.
      </P>
    </Section>

    <Section title="Hva vi bruker opplysningene til">
      <P>
        Opplysningene brukes utelukkende til å svare på henvendelsen din, gjennomføre en
        klarhetssjekk, og følge opp en eventuell dialog om et samarbeid. Vi bruker dem ikke til
        markedsføring, og vi selger eller deler dem aldri med tredjeparter for deres formål.
      </P>
    </Section>

    <Section title="Rettslig grunnlag">
      <P>
        Behandlingen skjer på grunnlag av ditt samtykke når du sender inn et skjema, og vår
        berettigede interesse i å besvare henvendelser og forberede et mulig oppdrag.
      </P>
    </Section>

    <Section title="Databehandler">
      <P>
        Skjemaene sendes via tjenesten Web3Forms, som videresender innholdet til vår e-postinnboks.
        Web3Forms behandler opplysningene på våre vegne kun for å levere meldingen. Selve dialogen
        oppbevares deretter i e-postsystemet vårt.
      </P>
    </Section>

    <Section title="Lagringstid">
      <P>
        Vi oppbevarer henvendelsen så lenge det er nødvendig for å følge den opp, og for å
        dokumentere et eventuelt kundeforhold. Når opplysningene ikke lenger har et formål, sletter
        vi dem. Du kan når som helst be om at vi sletter henvendelsen din.
      </P>
    </Section>

    <Section title="Rettighetene dine">
      <P>
        Du har rett til innsyn i opplysningene vi har om deg, til å få dem rettet eller slettet, og
        til å trekke tilbake et samtykke. Du kan også klage til Datatilsynet dersom du mener
        behandlingen er i strid med personvernreglene. For å bruke rettighetene dine, kontakt oss på{" "}
        <a href="mailto:hei@nurea.no" style={{ color: accent, fontWeight: 600 }}>hei@nurea.no</a>.
      </P>
    </Section>

    <Section title="Informasjonskapsler">
      <P>
        Nettstedet bruker ikke informasjonskapsler til sporing eller markedsføring. Eventuelle
        tekniske kapsler er kun nødvendige for at siden skal fungere.
      </P>
    </Section>
  </PageShell>
);

export default Personvern;
