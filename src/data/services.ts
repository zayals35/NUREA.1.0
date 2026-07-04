export type ServiceId = "merkevare" | "nettsider" | "innhold" | "systemer" | "reklamer";

export interface Service {
  id: ServiceId;
  index: string;
  title: string;
  /** Short plain-language role tag (replaces the retired stone metaphor). */
  role: string;
  description: string;
  statement: string;
  statementBody: string;
  deliverables: { title: string; body: string }[];
  position: string;
  positionBody: string;
  ctaHeading: string;
}

export const SERVICES: Service[] = [
  {
    id: "merkevare",
    index: "01",
    title: "Merkevare",
    role: "Der alt begynner",
    description: "Et tydelig uttrykk før du bygger mer.",
    statement: "Merkevaren er ikke logoen. Den er gjenkjennelsen.",
    statementBody:
      "En merkevare er summen av det folk føler når de møter bedriften din, før de har lest et eneste ord. Vi former den bevisst: hvem dere er for, tonen dere snakker i, og det visuelle språket som gjør at riktig kunde tenker «dette er for meg». Når merkevaren er tydelig, slipper alt annet å rope for å bli forstått.",
    deliverables: [
      { title: "Posisjon og retning", body: "Hvem dere er for, og hvorfor det betyr noe. Kjernen alt annet bygger på." },
      { title: "Visuell identitet", body: "Logo, farger, typografi og bildespråk satt i ett tydelig system." },
      { title: "Stemme og budskap", body: "Måten dere snakker på, så tonen er den samme uansett hvor kunden møter dere." },
      { title: "Merkevarehåndbok", body: "Et enkelt dokument, så identiteten holder seg konsekvent over tid." },
    ],
    position: "Der alt begynner",
    positionBody: "Merkevaren gir nettsider, innhold og systemer en felles retning å hvile på.",
    ctaHeading: "Klar til å gjøre merkevaren tydelig?",
  },
  {
    id: "nettsider",
    index: "02",
    title: "Nettsider",
    role: "Bygget på merkevaren",
    description: "Bygget for klarhet, tillit og riktige henvendelser.",
    statement: "Nettsiden er ikke brosjyren. Den er salgsteamet som aldri sover.",
    statementBody:
      "De fleste nettsider forteller om bedriften. En god nettside leder besøkeren fra nysgjerrighet til beslutning, uten at du er til stede. Vi bygger strukturen, innholdet og brukeropplevelsen slik at siden din gjør jobben, dag og natt. Når siden er tydelig, slipper du å forklare det i hvert eneste salgsmøte.",
    deliverables: [
      { title: "Struktur og sidekart", body: "Hvilke sider som trengs, hva de skal si, og i hvilken rekkefølge kunden møter dem." },
      { title: "Design og brukeropplevelse", body: "Et visuelt uttrykk forankret i merkevaren, slik at siden ser like trygg ut som bedriften er." },
      { title: "Utvikling", body: "Rask, tilgjengelig og stabil kode. Ingen unødvendige systemer, bare det som trengs." },
      { title: "Lansering og opplæring", body: "Vi setter opp alt og lærer deg å eie siden din, uten avhengighet til oss." },
    ],
    position: "Etter merkevaren",
    positionBody: "Nettsiden virker bare når merkevaren bak den er tydelig nok til å bære vekten.",
    ctaHeading: "Klar til å få en nettside som faktisk selger?",
  },
  {
    id: "innhold",
    index: "03",
    title: "Innhold",
    role: "Fyller siden med mening",
    description: "Ord, bilder og struktur som gjør verdien lettere å forstå.",
    statement: "Sosiale medier er gratis annonsering. Du trenger bare å bruke det riktig.",
    statementBody:
      "For mange føles innhold som en plikt, noe man må gjøre uten å vite om det virker. Vi snur på det. Når du forteller tydelig hva du gjør og hvorfor, blir hvert innlegg en liten annonse som ikke koster deg noe. Du når folk som aldri ville funnet deg ellers, og de forstår deg med en gang.",
    deliverables: [
      { title: "Innholdsstrategi", body: "Hva dere skal si, til hvem, og i hvilken rekkefølge. Planen som gir alt annet retning." },
      { title: "Tekst og historier", body: "Sideinnhold, artikler og kasusstudier skrevet slik at kunden kjenner seg igjen." },
      { title: "Bilde og visuelt", body: "Foto, illustrasjon og grafikk som forsterker det skrevne og gjør innholdet lettere å ta inn." },
      { title: "Publiseringsplan", body: "Når, hvor og hvor ofte. En ryddig plan som er enkel å følge over tid." },
    ],
    position: "Sammen med nettsiden",
    positionBody: "Innholdet forsterker merkevaren og fyller nettsiden med mening som faktisk holder.",
    ctaHeading: "Klar til å lage innhold som faktisk bygger tillit?",
  },
  {
    id: "systemer",
    index: "04",
    title: "Systemer",
    role: "Fjerner friksjon",
    description: "Digitale flyter som gjør hverdagen enklere og mer ryddig.",
    statement: "Et system er ikke et verktøy. Det er flyten som gjør at du slipper å tenke.",
    statementBody:
      "Mange bedrifter bruker ti verktøy der to ville holdt. Vi starter med å forstå hvorfor noe gjør vondt, og finner den enkle løsningen som tar bort friksjon. Kanskje det er en integrasjon mellom skjema og CRM. Kanskje det er en automatisering som sender riktig e-post til riktig tid. Målet er alltid det samme: at du kan bruke energien din på kundene, ikke på systemene.",
    deliverables: [
      { title: "Behovsanalyse", body: "Vi kartlegger hva som gjør vondt og hvorfor, og finner roten til friksjon før vi velger verktøy." },
      { title: "Integrasjoner", body: "Verktøyene dine snakker sammen. Ingen manuell kopiering mellom systemer." },
      { title: "Automatisering", body: "Gjentakende oppgaver blir håndtert automatisk, slik at ingenting faller mellom stolene." },
      { title: "Opplæring og dokumentasjon", body: "Du og teamet ditt forstår og eier systemene. Ingen svart boks, ingen avhengighet." },
    ],
    position: "Under alt det andre",
    positionBody: "Systemene bak siden gjør at merkevare, nettsider og innhold lever av seg selv.",
    ctaHeading: "Klar til å kutte friksjon og la systemene jobbe for deg?",
  },
  {
    id: "reklamer",
    index: "05",
    title: "Reklamer",
    role: "Det siste steget",
    description: "Strategiske budskap som gjør synligheten tydeligere.",
    statement: "Reklame uten en tydelig merkevare er støy. Med den er det forsterkning.",
    statementBody:
      "De fleste bedrifter starter med reklame før de er klare for det. Resultatet er dyrt og skuffende. Vi tilbyr reklame som det siste steget, når merkevaren, nettsiden og innholdet allerede gjør jobben. Da er hver krone du bruker på synlighet en krone som faktisk lønner seg.",
    deliverables: [
      { title: "Kampanjestrategi", body: "Hva vi skal si, til hvem, og hvor. Strategien som gjør at pengene går til rett sted." },
      { title: "Annonsekopi og kreativt", body: "Tekst og visuals forankret i merkevaren. Ikke generisk, men gjenkjennelig." },
      { title: "Kanalvalg og kjøp", body: "Vi velger kanalene der riktig kunde faktisk er, og setter opp kampanjen uten bortkastet budsjett." },
      { title: "Måling og optimering", body: "Vi følger opp, justerer og rapporterer, slik at hver kampanje er bedre enn den forrige." },
    ],
    position: "Det siste steget",
    positionBody: "Reklamen er det siste steget. Den virker bare når resten allerede gjør jobben.",
    ctaHeading: "Vil du vite om du er klar for reklame?",
  },
];
