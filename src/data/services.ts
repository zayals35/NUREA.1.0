import type { Lang } from "../i18n";

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

export interface Offer {
  id: string;
  title: string;
  /** The promise in one line. */
  description: string;
  outcome: string;
  /** Availability line, only where an offer is not open yet. */
  note?: string;
  serviceIds: ServiceId[];
}

/**
 * The three launch offers, approved 2026-09-20 and unnumbered: independently
 * selectable, never a sequence. Copy mirrors the approved front page.
 */
export const OFFERINGS: Record<Lang, Offer[]> = {
  no: [
    {
      id: "nettside-og-uttrykk",
      title: "Nettside og uttrykk",
      description: "Gjør det lett å velge deg.",
      outcome:
        "En gjennomarbeidet nettside med klare ord, et eget uttrykk og en enkel vei til kontakt. Vi avtaler hva du trenger, og bygger det ferdig.",
      serviceIds: ["nettsider", "merkevare"],
    },
    {
      id: "systemer-og-automatisering",
      title: "Systemer og automatisering",
      description: "Færre ting å følge opp manuelt.",
      outcome:
        "Vi kobler sammen skjema, e-post eller booking, så en henvendelse kommer riktig frem. Én konkret arbeidsflyt, tilpasset verktøyene du bruker, med tydelig avtalt oppfølging.",
      serviceIds: ["systemer"],
    },
    {
      id: "visuell-produksjon",
      title: "Visuell produksjon",
      description: "Nurea Create.",
      outcome:
        "AI-assisterte kampanjebilder og korte filmer for produktmerker. Avgrensede produksjoner med en avtalt visuell retning og ferdige filer til dine kanaler.",
      note: "Under utvikling. Åpner senere.",
      serviceIds: ["innhold"],
    },
  ],
  en: [
    {
      id: "website-and-identity",
      title: "Website and identity",
      description: "Make choosing you easy.",
      outcome:
        "A considered website with clear words, a distinctive identity and a simple way to get in touch. We agree on what you need, then build it.",
      serviceIds: ["nettsider", "merkevare"],
    },
    {
      id: "systems-and-automation",
      title: "Systems and automation",
      description: "Less to follow up manually.",
      outcome:
        "We connect forms, email or booking so inquiries reach the right place. One specific workflow, built around the tools you use, with clearly agreed support.",
      serviceIds: ["systemer"],
    },
    {
      id: "visual-production",
      title: "Visual production",
      description: "Nurea Create.",
      outcome:
        "AI-assisted campaign images and short films for product brands. Defined productions with an agreed visual direction and finished files for your channels.",
      note: "In development. Coming later.",
      serviceIds: ["innhold"],
    },
  ],
};

const SERVICES_NO: Service[] = [
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
    role: "Første løft",
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
    position: "Første løft",
    positionBody: "Nettsiden samler budskap, uttrykk og kontaktflyt i én tydelig vei inn.",
    ctaHeading: "Klar til å få en nettside som faktisk selger?",
  },
  {
    id: "innhold",
    index: "03",
    title: "Innhold",
    role: "Visuell produksjon",
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
    position: "Visuell produksjon",
    positionBody: "Innholdet gjør verdien synlig, i avgrensede produksjoner med en avtalt retning.",
    ctaHeading: "Klar til å lage innhold som faktisk bygger tillit?",
  },
  {
    id: "systemer",
    index: "04",
    title: "Systemer",
    role: "Systemer",
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
    position: "I hverdagen",
    positionBody: "Systemene svarer, booker og følger opp, så henvendelser ikke blir liggende.",
    ctaHeading: "Klar til å kutte friksjon og la systemene jobbe for deg?",
  },
  {
    id: "reklamer",
    index: "05",
    title: "Reklamer",
    role: "Reklamer",
    description: "Strategiske budskap som gjør synligheten tydeligere.",
    statement: "Reklame uten en tydelig merkevare er støy. Med den er det forsterkning.",
    statementBody:
      "Reklame fungerer best når budskapet er tydelig og innholdet allerede har en retning. Vi lager annonser som bygger videre på det du viser hver uke, med språk og uttrykk folk kjenner igjen.",
    deliverables: [
      { title: "Kampanjestrategi", body: "Hva vi skal si, til hvem, og hvor. Strategien som gjør at pengene går til rett sted." },
      { title: "Annonsekopi og kreativt", body: "Tekst og visuals forankret i merkevaren. Ikke generisk, men gjenkjennelig." },
      { title: "Kanalvalg og kjøp", body: "Vi velger kanalene der riktig kunde faktisk er, og setter opp kampanjen uten bortkastet budsjett." },
      { title: "Måling og optimering", body: "Vi følger opp, justerer og rapporterer, slik at hver kampanje er bedre enn den forrige." },
    ],
    position: "Sammen med innholdet",
    positionBody: "Reklamen forlenger innholdet ditt og gjør det enklere for riktige folk å se det.",
    ctaHeading: "Vil du vite om du er klar for reklame?",
  },
];

const SERVICES_EN: Service[] = [
  {
    id: "merkevare",
    index: "01",
    title: "Brand",
    role: "Where everything begins",
    description: "A clear expression before you build more.",
    statement: "The brand is not the logo. It is the recognition.",
    statementBody:
      "A brand is the sum of what people feel when they meet your business, before they have read a single word. We shape it deliberately: who you are for, the tone you speak in, and the visual language that makes the right customer think “this is for me”. When the brand is clear, nothing else has to shout to be understood.",
    deliverables: [
      { title: "Position and direction", body: "Who you are for, and why it matters. The core everything else is built on." },
      { title: "Visual identity", body: "Logo, colors, typography and imagery set in one clear system." },
      { title: "Voice and message", body: "The way you speak, so the tone stays the same wherever the customer meets you." },
      { title: "Brand guidelines", body: "A simple document, so the identity stays consistent over time." },
    ],
    position: "Where everything begins",
    positionBody: "The brand gives websites, content and systems one shared direction to rest on.",
    ctaHeading: "Ready to make your brand clear?",
  },
  {
    id: "nettsider",
    index: "02",
    title: "Websites",
    role: "First lift",
    description: "Built for clarity, trust and the right inquiries.",
    statement: "The website is not the brochure. It is the sales team that never sleeps.",
    statementBody:
      "Most websites talk about the business. A good website leads the visitor from curiosity to decision, without you in the room. We build the structure, the content and the experience so your site does the job, day and night. When the site is clear, you stop having to explain it in every single sales meeting.",
    deliverables: [
      { title: "Structure and sitemap", body: "Which pages are needed, what they should say, and the order the customer meets them in." },
      { title: "Design and user experience", body: "A visual expression anchored in the brand, so the site looks as trustworthy as the business is." },
      { title: "Development", body: "Fast, accessible and stable code. No unnecessary systems, only what is needed." },
      { title: "Launch and training", body: "We set everything up and teach you to own your site, with no dependency on us." },
    ],
    position: "First lift",
    positionBody: "The website gathers message, expression and contact flow into one clear way in.",
    ctaHeading: "Ready for a website that actually sells?",
  },
  {
    id: "innhold",
    index: "03",
    title: "Content",
    role: "Visual production",
    description: "Words, images and structure that make the value easier to understand.",
    statement: "Social media is free advertising. You just have to use it right.",
    statementBody:
      "For many, content feels like a duty, something you do without knowing whether it works. We turn that around. When you say clearly what you do and why, every post becomes a small ad that costs you nothing. You reach people who would never have found you otherwise, and they understand you right away.",
    deliverables: [
      { title: "Content strategy", body: "What to say, to whom, and in what order. The plan that gives everything else direction." },
      { title: "Copy and stories", body: "Page content, articles and case studies written so the customer recognizes themselves." },
      { title: "Image and visuals", body: "Photo, illustration and graphics that reinforce the words and make the content easier to take in." },
      { title: "Publishing plan", body: "When, where and how often. A tidy plan that is easy to follow over time." },
    ],
    position: "Visual production",
    positionBody: "The content makes the value visible, in defined productions with an agreed direction.",
    ctaHeading: "Ready to make content that actually builds trust?",
  },
  {
    id: "systemer",
    index: "04",
    title: "Systems",
    role: "Systems",
    description: "Digital flows that make the everyday simpler and tidier.",
    statement: "A system is not a tool. It is the flow that lets you stop thinking about it.",
    statementBody:
      "Many businesses use ten tools where two would do. We start by understanding why something hurts, and find the simple solution that removes the friction. Maybe it is an integration between a form and your CRM. Maybe it is an automation that sends the right email at the right time. The goal is always the same: your energy goes to the customers, not the systems.",
    deliverables: [
      { title: "Needs analysis", body: "We map what hurts and why, and find the root of the friction before choosing tools." },
      { title: "Integrations", body: "Your tools talk to each other. No manual copying between systems." },
      { title: "Automation", body: "Repetitive tasks are handled automatically, so nothing falls through the cracks." },
      { title: "Training and documentation", body: "You and your team understand and own the systems. No black box, no dependency." },
    ],
    position: "In the everyday",
    positionBody: "The systems answer, book and follow up, so inquiries do not sit unanswered.",
    ctaHeading: "Ready to cut friction and let the systems work for you?",
  },
  {
    id: "reklamer",
    index: "05",
    title: "Advertising",
    role: "Advertising",
    description: "Strategic messages that make your visibility clearer.",
    statement: "Advertising without a clear brand is noise. With one, it is amplification.",
    statementBody:
      "Advertising works best when the message is clear and the content already has direction. We make ads that build on what you show every week, with language and visuals people recognize.",
    deliverables: [
      { title: "Campaign strategy", body: "What to say, to whom, and where. The strategy that sends the money to the right place." },
      { title: "Ad copy and creative", body: "Copy and visuals anchored in the brand. Not generic, but recognizable." },
      { title: "Channels and buying", body: "We choose the channels where the right customer actually is, and set up the campaign without wasted budget." },
      { title: "Measurement and optimization", body: "We follow up, adjust and report, so every campaign is better than the last." },
    ],
    position: "Together with content",
    positionBody: "Advertising extends your content and makes it easier for the right people to see it.",
    ctaHeading: "Want to know if you are ready for advertising?",
  },
];

export const SERVICES: Record<Lang, Service[]> = { no: SERVICES_NO, en: SERVICES_EN };
