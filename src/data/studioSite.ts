import articleData from "./articles.json";
import type { Lang } from "../i18n";

/**
 * Copy and media map for the studio site (home, work, services, studio,
 * insights, create). Norwegian Bokmål is the source; English is a faithful
 * twin with no new claims. No prices, no weekly promise, no invented results.
 */

const W = "/work";

export const CLIP = {
  gizayDesktop: `${W}/gizay/clips/01-hero-arrival`,
  gizayTurn: `${W}/gizay/clips/04-language-turn`,
  gizayField: `${W}/gizay/clips/05-close-field`,
  gizayPhone: `${W}/gizay/clips/06-phone-pass`,
  bilmekkaDesktop: `${W}/bilmekka/clips/01-plate-funnel`,
  bilmekkaSteps: `${W}/bilmekka/clips/04-steps-reveal`,
  bilmekkaPhone: `${W}/bilmekka/clips/05-phone-scroll`,
} as const;

/**
 * Where "Nurea Create" links. Zaynab owns a domain for Create but has not
 * supplied its exact URL; until she does, the internal page is the
 * destination. Set VITE_CREATE_URL at build time to point it elsewhere.
 */
export const CREATE_DESTINATION: string = (import.meta.env.VITE_CREATE_URL as string | undefined) || "/create";

export type Orientation = "wide" | "tall";

export interface WorkPiece {
  id: string;
  client: string;
  clip: string;
  orientation: Orientation;
  url: string;
  domain: string;
  /** Marks the lead, offset piece in the gallery. */
  lead?: boolean;
}

/** Real recordings of live sites; the gallery groups them by client, in first-seen order. */
export const WORK: WorkPiece[] = [
  { id: "gizay-desktop", client: "GIZAY", clip: CLIP.gizayDesktop, orientation: "wide", url: "https://gizay.no", domain: "gizay.no", lead: true },
  { id: "gizay-phone", client: "GIZAY", clip: CLIP.gizayPhone, orientation: "tall", url: "https://gizay.no", domain: "gizay.no" },
  { id: "bilmekka-desktop", client: "Bilmekka", clip: CLIP.bilmekkaSteps, orientation: "wide", url: "https://www.bilmekka.no", domain: "bilmekka.no" },
  { id: "bilmekka-phone", client: "Bilmekka", clip: CLIP.bilmekkaPhone, orientation: "tall", url: "https://www.bilmekka.no", domain: "bilmekka.no" },
];

export const BELT = [
  { src: "/logos/metanoia.png", alt: "Metanoia", h: 40 },
  { src: "/logos/bilmekka.svg", alt: "Bilmekka", h: 18 },
  { src: "/logos/moremarin.png", alt: "Møre Marin", h: 38 },
  { src: "/logos/gizay.svg", alt: "GIZAY", h: 26 },
] as const;

export type ServiceId = "nettside" | "systemer" | "create";

/** One of the stacked scroll cards on the homepage; `to` is a studio path, an anchor on one, or the Create destination. */
export interface HomeCard {
  id: "syn" | "ai" | "folk" | "create";
  h: string;
  p: string;
  status?: string;
  cta: string;
  to: string;
}

export interface ServiceCopy {
  id: ServiceId;
  name: string;
  short: string;
  status?: string;
  need: string;
  deliverablesLabel: string;
  deliverables: string[];
  next: { label: string; to: string };
  proof: { kind: "clip"; clip: string; caption: string } | { kind: "art"; src: string; alt: string; caption: string };
}

export interface Article {
  published: boolean;
  slug: Record<Lang, string>;
  title: Record<Lang, string>;
  lead: Record<Lang, string>;
  /** ISO date, only set once the article is actually published. */
  date?: string;
  body: Record<Lang, { heading: string; paragraphs: string[] }[]>;
  cover: string;
  sources: { title: string; url: string; note: Record<Lang, string> }[];
}

/**
 * Editorial articles. The weekly research
 * heartbeat proposes pitches and Zaynab selects. Unpublished entries never
 * reach navigation, the index, the sitemap or the prerender.
 */
export const ARTICLES: Article[] = articleData;

export const publishedArticles = () => ARTICLES.filter((a) => a.published);

export function findArticle(slug: string, lang: Lang): Article | undefined {
  return publishedArticles().find((a) => a.slug[lang] === slug);
}

const no = {
  meta: {
    home: {
      title: "NUREA, lettere å forstå. Lettere å velge.",
      description:
        "Nurea er et designstudio i Trondheim. Vi lager nettsider, tydelige budskap og visuell retning, slik at gode bedrifter blir lettere å forstå og lettere å velge.",
    },
    work: {
      title: "Arbeider · NUREA",
      description: "Se nettsidene til Bilmekka og GIZAY i bruk, på datamaskin og mobil. Ulike bedrifter, ulike uttrykk, samme klarhet.",
    },
    services: {
      title: "Tjenester · NUREA",
      description:
        "Nettside og uttrykk, systemer og automatisering, og bilder og film gjennom Nurea Create. Vi starter der dere står. Avgrensede leveranser, avtalt omfang.",
    },
    studio: {
      title: "Studio · NUREA",
      description:
        "Nurea er et designstudio i Trondheim. Direkte samarbeid, beslutninger tatt på ekte skjermer, og mennesker som eier kvaliteten.",
    },
    insights: {
      title: "Innsikt · NUREA",
      description: "Korte tekster om hvorfor gode bedrifter blir oversett, og hva som faktisk gjør dem lettere å velge.",
    },
    create: {
      title: "Nurea Create · AI-assisted content, ad visuals and campaign imagery",
      description:
        "Nurea Create makes AI-assisted explainer content, images and film for ads, and campaign imagery for product brands, for every kind of business, with human creative direction and defined batches. In development.",
    },
  },
  shell: {
    skip: "Hopp til innhold",
    brand: "Nurea, forsiden",
    menu: "Hovedmeny",
    menuOpen: "Meny",
    menuClose: "Lukk",
    dockLabel: "Sidemeny",
    nav: [
      { to: "/arbeider", label: "Arbeider" },
      { to: "/tjenester", label: "Tjenester" },
      { to: "/om-oss", label: "Studio" },
      { to: "/innsikt", label: "Innsikt" },
    ],
    createLabel: "Nurea Create",
    contact: "La oss snakke",
    home: "Forsiden",
    langLabel: "Språk",
    inviteA: "Skal vi gjøre",
    inviteB: "det ",
    inviteEm: "tydeligere?",
    inviteCta: "Fortell om prosjektet",
    inviteAlt: "Eller be om en gratis klarhetssjekk",
    reassure: "Du trenger ikke ha en ferdig plan. Vi finner ut hvor det er verdt å begynne.",
    studioLine: "Et designstudio i Trondheim",
    orgnr: "Org.nr 937 929 145",
    privacy: "Personvern",
    demos: "Demoer",
    method: "Metoden",
    clarity: "Klarhetssjekk",
    footerNav: "Bunnmeny",
    cookies: "Informasjonskapsler",
  },
  cookie: {
    label: "Informasjonskapsler",
    text: "Nettstedet setter ingen informasjonskapsler og bruker ingen sporing eller statistikk. Nettleseren lagrer bare det funksjonene du bruker trenger, som denne meldingen og utkast i skjemaet.",
    close: "Lukk",
    more: "Se hva som lagres",
  },
  video: { label: "Opptak fra nettsiden", play: "Spill av", pause: "Pause" },
  belt: "Merker vi har jobbet med",
  beltPause: "Stopp bevegelsen",
  beltPlay: "Start bevegelsen",
  home: {
    kicker: "Designstudio, Trondheim",
    h1a: "Lettere å forstå.",
    h1b: "Lettere å ",
    h1accent: "velge",
    sub: "Et designstudio i Trondheim som lager nettsider, tydelig budskap og visuell retning for bedrifter som vil bli forstått raskere.",
    cta: "Fortell om prosjektet",
    heroAlt: "Se arbeidet",
    scroll: "Bla ned",
    workLabel: "Utvalgt arbeid",
    workH: "Se arbeidet i bruk.",
    workLead: "Ekte nettsider, tatt opp slik kundene møter dem. Ingen stillbilder.",
    workAll: "Alle arbeider",
    servicesLabel: "Tjenester",
    servicesH: "Vi starter der dere står.",
    servicesLead: "Noen trenger et strammere uttrykk først, andre en ny nettside eller enklere systemer. Rekkefølgen finner vi sammen.",
    cardsLabel: "Slik jobber vi",
    cardsH: "Fire ting du bør vite om oss.",
    cards: [
      {
        id: "syn",
        h: "Det gode må synes.",
        p: "Vi samler budskap, design og teknologi rundt det kunden trenger å forstå. Slik får bedriften et uttrykk som viser hva den faktisk er god på.",
        cta: "Slik tenker vi",
        to: "/om-oss",
      },
      {
        id: "ai",
        h: "AI i arbeidet.",
        p: "Vi bruker AI til research, idéutforsking og første utkast. Det gir mer rom for å velge retning, bearbeide detaljene og kontrollere resultatet. Vurderingene og ansvaret ligger hos oss.",
        cta: "Slik bruker vi AI",
        to: "/om-oss#ai",
      },
      {
        id: "folk",
        h: "Mennesker bak valgene.",
        p: "Du samarbeider direkte med den som gjør jobben. Vi avklarer retningen sammen, viser arbeidet underveis og tar ansvar for det vi leverer.",
        cta: "Slik samarbeider vi",
        to: "/om-oss#samarbeid",
      },
      {
        id: "create",
        h: "Nurea Create",
        p: "Forklarende innhold, bilder og film til annonser, og kampanjebilder for produktmerker. For alle slags bedrifter. AI i produksjonen, menneskelig regi fra idé til ferdig uttrykk.",
        status: "Under utvikling",
        cta: "Utforsk Nurea Create",
        to: CREATE_DESTINATION,
      },
    ] as HomeCard[],
    eyeAlt: "Et tegnet øye som blunker mens du blar",
    insightsLabel: "Innsikt",
    insightsTitle: "Innsikt.",
    insightsH: "Hva vi mener om nettsider, budskap og valg.",
    insightsP: "Korte tekster om hvorfor gode bedrifter blir oversett, og hva som faktisk gjør dem lettere å velge.",
    insightsSoon: "De første artiklene er under arbeid.",
    insightsCta: "Til innsikt",
    insightsArtAlt: "Tegning: en stein, en tommestokk og et forstørrelsesglass ser på et blankt kort som nettopp ble tydelig.",
  },
  work: {
    h1: "Se forskjellen.",
    lead: "Ulike bedrifter. Ulike uttrykk. Her er arbeidet i bruk, på datamaskin og mobil.",
    note: "Nettsidene er live. Opptakene er gjort på de faktiske sidene.",
    visit: "Besøk",
    initiativeLabel: "Studio-initiativ",
    initiativeH: "Nurea Create",
    initiativeP: "Nureas egen produksjonsgren for bilder og film. Ikke et kundeoppdrag, og fortsatt under utvikling.",
    initiativeCta: "Les om Create",
    cases: {
      GIZAY: { task: "Landingsside, merkevare og web", caption: "Egyptisk bomull for nordiske hjem. Materialet fikk sette tonen fra første skjerm." },
      Bilmekka: { task: "Nettside og visuell identitet", caption: "Fra registreringsnummer til henvendelse på ett skjermbilde. Bilsalget forklart i konkrete steg." },
    } as Record<string, { task: string; caption: string }>,
    desktop: "Datamaskin",
    phone: "Mobil",
  },
  services: {
    h1a: "Det gode",
    h1b: "må ",
    h1accent: "synes.",
    lead: "Et uttrykk og en nettside som viser hvem dere er. Systemer som tar bort de manuelle stegene. Bilder og film med samme retning.",
    intro:
      "Hver tjeneste kan velges for seg. Hva som kommer først, finner vi ut sammen. Alt er avgrenset, avtalt og testet før du tar det i bruk.",
    open: "Åpne",
    close: "Lukk",
    proofLabel: "Sett i arbeid",
    list: [
      {
        id: "nettside",
        name: "Nettside og uttrykk",
        short: "Avgrenset nettside, tydelig budskap og visuell retning.",
        need: "Dere er gode. Nettsiden sier det ikke. Kunden leser to setninger og går videre til noen som var lettere å forstå.",
        deliverablesLabel: "Det du får",
        deliverables: ["Budskap og sidetekster", "Visuell retning og typografi", "Design som fungerer på mobil", "Bygg, testing og kontaktflyt", "Overlevering med filer og dokumentasjon"],
        next: { label: "Snakk om nettsiden", to: "/kontakt" },
        proof: { kind: "clip", clip: CLIP.gizayDesktop, caption: "GIZAY, gizay.no" },
      },
      {
        id: "systemer",
        name: "Systemer og automatisering",
        short: "Én konkret arbeidsflyt, testet hele veien.",
        need: "Henvendelser, skjema og booking som ikke henger sammen, og manuelle steg som stjeler tid hver uke.",
        deliverablesLabel: "Det du får",
        deliverables: ["Én avgrenset flyt: skjema, e-post eller booking", "Testet fra første klikk til svar", "Avtalt omfang og tydelig støttegrense"],
        next: { label: "Fortell hva som tar tid", to: "/kontakt" },
        proof: { kind: "clip", clip: CLIP.bilmekkaDesktop, caption: "Bilmekka, bilmekka.no" },
      },
      {
        id: "create",
        name: "Nurea Create",
        short: "Forklarende innhold, annonser og kampanjebilder, i bilde og film.",
        status: "Under utvikling",
        need: "Bedrifter som trenger mer innhold enn én fotografering rekker over, enten det er forklarende innhold, annonser eller produktbilder, med en retning som holder fra bilde til bilde.",
        deliverablesLabel: "Slik vil det fungere",
        deliverables: ["Avtalt retning før produksjon", "Definerte leveranser i runder", "Menneskelig kreativ ledelse og godkjenning"],
        next: { label: "Les om Create", to: CREATE_DESTINATION },
        proof: { kind: "art", src: "/brand/art/hvem.webp", alt: "Fra «hvem?» til «dere!», plakat fra Nureas identitetsserie", caption: "Nureas identitetsserie, 2026" },
      },
    ] as ServiceCopy[],
    workingH: "Du skal kjenne deg igjen. Og vite hva som skjer.",
    working: [
      { q: "Retningen godkjennes sammen.", a: "Du ser forslag som ferdige skjermer før vi bygger videre. Vi forklarer valgene og justerer det som ikke treffer." },
      { q: "Omfanget er avtalt.", a: "Vi avklarer leveransen, prisen og revisjonene før prosjektet starter. Nye ønsker avklares underveis." },
      { q: "Arbeidet er ditt.", a: "Ved overlevering får du filene og dokumentasjonen du trenger for å fortsette med oss eller andre." },
    ],
  },
  studio: {
    h1a: "Eget uttrykk.",
    h1em: "Tydelig",
    h1c: "retning.",
    intro: "Nurea er et designstudio i Trondheim. Vi gjør verdien i gode bedrifter lettere å se.",
    artAlt: "Det gode må synes, plakat fra Nureas identitetsserie",
    principleLabel: "Der vi begynner",
    principleH: "Vi begynner med det som er sant.",
    principle:
      "Hva er dere gode på? Hvorfor velger kundene dere? Svaret former ordene, designet og veien gjennom nettsiden. Da får uttrykket en grunn til å være akkurat deres.",
    aiH: "Slik bruker vi AI.",
    aiLead: "AI er et verktøy i arbeidet. Det gjør forarbeidet raskere, slik at mer av tiden går til å velge retning, bearbeide detaljene og kontrollere resultatet.",
    ai: [
      { h: "Research", p: "Vi bruker AI til å samle og sortere bakgrunnsstoff: bransjen, konkurrentene og spørsmålene kundene stiller. Det vi bruker, sjekker vi før det går inn i arbeidet." },
      { h: "Idéutforsking", p: "Tidlig i et prosjekt lar AI oss prøve flere retninger i tekst og bilde enn vi ellers ville rukket. Vi velger ut, forkaster det meste og bygger videre på det som treffer." },
      { h: "Første utkast", p: "Tekst, struktur og kode kan begynne som et AI-utkast. Så skriver vi om, bearbeider og tester til det holder et nivå vi står inne for." },
      { h: "Det som ligger hos oss", p: "Retningen, vurderingene og godkjenningen gjøres av mennesker. Du samarbeider med den som gjør jobben, og vi tar ansvaret for det som leveres." },
    ],
    howH: "Slik samarbeider vi.",
    howLead: "Direkte. Konkret. Uten overraskelser.",
    how: [
      { h: "Direkte samarbeid", p: "Du snakker med den som gjør jobben, fra første melding til overlevering. Ingen mellomledd, ingen oversettelse." },
      { h: "Retningen avklares sammen", p: "Før vi bygger, blir vi enige om hva arbeidet skal gjøre og for hvem. Underveis ser du arbeidet og sier din mening før vi går videre." },
      { h: "Beslutninger på ekte skjermer", p: "Vi viser aldri en beskrivelse når vi kan vise siden. Du godkjenner det du faktisk kommer til å få." },
      { h: "Kvaliteten eies her", p: "Ingenting går ut uten at vi står inne for det. Når noe ikke er godt nok, sier vi det før du må." },
    ],
    workLink: "Se arbeidet",
  },
  insights: {
    h1: "Innsikt.",
    lead: "Korte tekster om hvorfor gode bedrifter blir oversett, og hva som faktisk gjør dem lettere å velge.",
    featured: "Utvalgt",
    all: "Flere tekster",
    soonH: "De første artiklene er under arbeid.",
    soonP: "Vi skriver om det vi ser i arbeidet. Temaene under er de første som kommer.",
    soonMark: "Kommer",
    themesLabel: "Temaer vi skriver om",
    themes: [
      { h: "Hvorfor gode bedrifter blir oversett", p: "Verdien finnes. Den kommer bare ikke frem raskt nok." },
      { h: "Nettsiden som første møte", p: "Hva en kunde må forstå på ti sekunder, og hva som kan vente." },
      { h: "Systemer som sparer tid", p: "Små arbeidsflyter som gir tilbake timer, og hvor de ofte ryker." },
    ],
    artAlt: "Tegning: en stein, en tommestokk og et forstørrelsesglass ser på et blankt kort som nettopp ble tydelig.",
    notify: "Vil du høre når den første er ute?",
    notifyCta: "Send oss en e-post",
    back: "Alle tekster",
    readMore: "Les",
  },
  create: {
    kicker: "A Nurea initiative",
    h1a: "Nurea",
    h1b: "Create",
    lead: "AI-assisted explainer content, ad visuals and campaign imagery, for every kind of business. Human creative direction, defined batches, clear revisions.",
    status: "In development. Not taking orders yet.",
    whatLabel: "What it is",
    whatH: "Images and film in defined batches.",
    what: "A production branch of the Nurea studio, built for businesses that need more content than a shoot can cover: explainer content like the pieces Nurea makes for itself, images and short films for ads, and campaign imagery for products. The visual direction holds from one piece to the next. Everything is produced with AI tools and directed, selected and finished by people.",
    howLabel: "How a batch works",
    how: [
      { h: "Direction agreed first", p: "What you sell, who it is for, the mood and the references are settled before anything is generated." },
      { h: "A defined batch", p: "A fixed number of images or films, with formats and use agreed up front." },
      { h: "Human review", p: "Every frame is judged by a person before you see it. Only the ones that hold are delivered." },
      { h: "Defined revisions", p: "Revision rounds are agreed with the batch, so both sides know when it is done." },
    ],
    whoLabel: "Who it is for",
    who: "Service businesses that need to explain what they do, companies that advertise and need fresh visuals often, and product brands in clothing, beauty, beverages, jewellery and home. Anyone whose work deserves better than a stock scene.",
    statusLabel: "Status",
    statusH: "Building the process, not selling it yet.",
    statusP: "Create opens when the studio can stand behind every batch. Until then there is no price list and no checkout, only a conversation.",
    ctaLabel: "Interested?",
    cta: "Get in touch",
    email: "hei@nurea.no",
    studioLink: "The Nurea studio",
    artAlt: "From «who?» to «you!», poster from Nurea's identity series",
    artCaption: "Nurea's identity series, 2026",
  },
};

export type StudioCopy = typeof no;

const en: StudioCopy = {
  meta: {
    home: {
      title: "NUREA, easier to understand. Easier to choose.",
      description:
        "Nurea is a design studio in Trondheim. We make websites, clear messaging and visual direction, so good businesses become easier to understand and easier to choose.",
    },
    work: {
      title: "Work · NUREA",
      description: "See the Bilmekka and GIZAY websites in use, on desktop and on mobile. Different businesses, different identities, the same clarity.",
    },
    services: {
      title: "Services · NUREA",
      description: "Website and identity, systems and automation, and images and film through Nurea Create. We start where you are. Scoped deliverables, agreed scope.",
    },
    studio: {
      title: "The studio · NUREA",
      description: "Nurea is a design studio in Trondheim. Direct collaboration, decisions made on real screens, and people who own the quality.",
    },
    insights: {
      title: "Insights · NUREA",
      description: "Short pieces on why good businesses get overlooked, and what actually makes them easier to choose.",
    },
    create: no.meta.create,
  },
  shell: {
    skip: "Skip to content",
    brand: "Nurea, front page",
    menu: "Main menu",
    menuOpen: "Menu",
    menuClose: "Close",
    dockLabel: "Site menu",
    nav: [
      { to: "/arbeider", label: "Work" },
      { to: "/tjenester", label: "Services" },
      { to: "/om-oss", label: "Studio" },
      { to: "/innsikt", label: "Insights" },
    ],
    createLabel: "Nurea Create",
    contact: "Let's talk",
    home: "Home",
    langLabel: "Language",
    inviteA: "Shall we make",
    inviteB: "it ",
    inviteEm: "clearer?",
    inviteCta: "Tell us about the project",
    inviteAlt: "Or ask for a free clarity check",
    reassure: "You don't need a finished plan. We'll find where it's worth starting.",
    studioLine: "A design studio in Trondheim",
    orgnr: "Org. no. 937 929 145",
    privacy: "Privacy",
    demos: "Demos",
    method: "Method",
    clarity: "Clarity check",
    footerNav: "Footer menu",
    cookies: "Cookies",
  },
  cookie: {
    label: "Cookies",
    text: "This site sets no cookies and uses no tracking or statistics. Your browser only stores what the features you use need, like this notice and form drafts.",
    close: "Close",
    more: "What is stored (in Norwegian)",
  },
  video: { label: "Recording of the website", play: "Play", pause: "Pause" },
  belt: "Brands we have worked with",
  beltPause: "Pause the motion",
  beltPlay: "Play the motion",
  home: {
    kicker: "Design studio, Trondheim",
    h1a: "Easier to understand.",
    h1b: "Easier to ",
    h1accent: "choose",
    sub: "A design studio in Trondheim making websites, clear messaging and visual direction for businesses that want to be understood faster.",
    cta: "Tell us about the project",
    heroAlt: "See the work",
    scroll: "Scroll",
    workLabel: "Selected work",
    workH: "See the work in use.",
    workLead: "Real websites, recorded the way customers meet them. No still images.",
    workAll: "All work",
    servicesLabel: "Services",
    servicesH: "We start where you are.",
    servicesLead: "Some need a sharper identity first, others a new website or simpler systems. We find the order together.",
    cardsLabel: "How we work",
    cardsH: "Four things to know about us.",
    cards: [
      {
        id: "syn",
        h: "The good must show.",
        p: "We bring messaging, design and technology together around what the customer needs to understand. That gives the business an expression that shows what it is actually good at.",
        cta: "How we think",
        to: "/om-oss",
      },
      {
        id: "ai",
        h: "AI in the work.",
        p: "We use AI for research, exploring ideas and first drafts. That leaves more room to choose a direction, refine the details and check the result. The judgement and the responsibility stay with us.",
        cta: "How we use AI",
        to: "/om-oss#ai",
      },
      {
        id: "folk",
        h: "People behind the choices.",
        p: "You work directly with the person doing the work. We agree the direction together, show the work along the way and take responsibility for what we deliver.",
        cta: "How we work together",
        to: "/om-oss#samarbeid",
      },
      {
        id: "create",
        h: "Nurea Create",
        p: "Explainer content, images and film for ads, and campaign visuals for product brands. For every kind of business. AI in the production, human direction from idea to finished piece.",
        status: "In development",
        cta: "Explore Nurea Create",
        to: CREATE_DESTINATION,
      },
    ],
    eyeAlt: "A drawn eye that blinks as you scroll",
    insightsLabel: "Insights",
    insightsTitle: "Insights.",
    insightsH: "What we think about websites, messaging and choice.",
    insightsP: "Short pieces on why good businesses get overlooked, and what actually makes them easier to choose.",
    insightsSoon: "The first articles are being written.",
    insightsCta: "To insights",
    insightsArtAlt: "Drawing: a stone, a folding ruler and a magnifying glass looking at a blank card that has just become clear.",
  },
  work: {
    h1: "See the difference.",
    lead: "Different businesses. Different identities. Here is the work in use, on desktop and on mobile.",
    note: "The websites are live. The recordings were made on the actual sites.",
    visit: "Visit",
    initiativeLabel: "Studio initiative",
    initiativeH: "Nurea Create",
    initiativeP: "Nurea's own production branch for images and film. Not a client project, and still in development.",
    initiativeCta: "Read about Create",
    cases: {
      GIZAY: { task: "Landing page, brand and web", caption: "Egyptian cotton for Nordic homes. The material set the tone from the first screen." },
      Bilmekka: { task: "Website and visual identity", caption: "From licence plate to enquiry on one screen. The car sale explained in concrete steps." },
    },
    desktop: "Desktop",
    phone: "Mobile",
  },
  services: {
    h1a: "The good",
    h1b: "must ",
    h1accent: "show.",
    lead: "An identity and a website that show who you are. Systems that remove the manual steps. Images and film in the same direction.",
    intro: "Each service can be chosen on its own. What comes first, we work out together. Everything is scoped, agreed and tested before you use it.",
    open: "Open",
    close: "Close",
    proofLabel: "In use",
    list: [
      {
        id: "nettside",
        name: "Website and identity",
        short: "A scoped website, clear messaging and visual direction.",
        need: "You are good. The website doesn't say so. The customer reads two sentences and moves on to someone who was easier to understand.",
        deliverablesLabel: "What you get",
        deliverables: ["Messaging and page copy", "Visual direction and typography", "Design that works on mobile", "Build, testing and contact flow", "Handover with files and documentation"],
        next: { label: "Talk about the website", to: "/kontakt" },
        proof: { kind: "clip", clip: CLIP.gizayDesktop, caption: "GIZAY, gizay.no" },
      },
      {
        id: "systemer",
        name: "Systems and automation",
        short: "One concrete workflow, tested all the way.",
        need: "Enquiries, forms and bookings that don't fit together, and manual steps that steal time every week.",
        deliverablesLabel: "What you get",
        deliverables: ["One scoped flow: form, email or booking", "Tested from first click to reply", "Agreed scope and a clear support boundary"],
        next: { label: "Tell us what takes time", to: "/kontakt" },
        proof: { kind: "clip", clip: CLIP.bilmekkaDesktop, caption: "Bilmekka, bilmekka.no" },
      },
      {
        id: "create",
        name: "Nurea Create",
        short: "Explainer content, ads and campaign visuals, in stills and film.",
        status: "In development",
        need: "Businesses that need more content than a shoot can cover, whether explainer content, ads or product imagery, with a direction that holds from image to image.",
        deliverablesLabel: "How it will work",
        deliverables: ["Direction agreed before production", "Defined deliverables in batches", "Human creative direction and approval"],
        next: { label: "Read about Create", to: CREATE_DESTINATION },
        proof: { kind: "art", src: "/brand/art/hvem.webp", alt: "From «who?» to «you!», poster from Nurea's identity series", caption: "Nurea's identity series, 2026" },
      },
    ],
    workingH: "You should recognise yourself. And know what happens.",
    working: [
      { q: "The direction is approved together.", a: "You see proposals as finished screens before we build further. We explain the choices and adjust what doesn't land." },
      { q: "The scope is agreed.", a: "We clarify the deliverables, the price and the revisions before the project starts. New wishes are agreed along the way." },
      { q: "The work is yours.", a: "At handover you get the files and documentation you need to continue with us or with others." },
    ],
  },
  studio: {
    h1a: "Own identity.",
    h1em: "Clear",
    h1c: "direction.",
    intro: "Nurea is a design studio in Trondheim. We make the value in good businesses easier to see.",
    artAlt: "The good must show, poster from Nurea's identity series",
    principleLabel: "Where we start",
    principleH: "We start with what is true.",
    principle:
      "What are you good at? Why do customers choose you? The answer shapes the words, the design and the path through the website. Then the identity has a reason to be exactly yours.",
    aiH: "How we use AI.",
    aiLead: "AI is a tool in the work. It makes the groundwork faster, so more of the time goes into choosing a direction, refining the details and checking the result.",
    ai: [
      { h: "Research", p: "We use AI to gather and sort background material: the industry, the competitors and the questions customers ask. What we use, we check before it goes into the work." },
      { h: "Exploring ideas", p: "Early in a project, AI lets us try more directions in words and images than we otherwise would have time for. We select, discard most of it and build on what lands." },
      { h: "First drafts", p: "Text, structure and code can start as an AI draft. Then we rewrite, refine and test until it holds a standard we stand behind." },
      { h: "What stays with us", p: "The direction, the judgement and the approval are made by people. You work with the person doing the work, and we take responsibility for what is delivered." },
    ],
    howH: "How we work together.",
    howLead: "Direct. Concrete. No surprises.",
    how: [
      { h: "Direct collaboration", p: "You talk to the person doing the work, from the first message to handover. No middlemen, no translation." },
      { h: "The direction is agreed together", p: "Before we build, we agree what the work should do and for whom. Along the way you see the work and have your say before we move on." },
      { h: "Decisions on real screens", p: "We never show a description when we can show the page. You approve what you are actually going to get." },
      { h: "Quality is owned here", p: "Nothing goes out unless we stand behind it. When something isn't good enough, we say so before you have to." },
    ],
    workLink: "See the work",
  },
  insights: {
    h1: "Insights.",
    lead: "Short pieces on why good businesses get overlooked, and what actually makes them easier to choose.",
    featured: "Featured",
    all: "More pieces",
    soonH: "The first articles are being written.",
    soonP: "We write about what we see in the work. The themes below are the first to come.",
    soonMark: "Coming",
    themesLabel: "Themes we write about",
    themes: [
      { h: "Why good businesses get overlooked", p: "The value exists. It just doesn't come through fast enough." },
      { h: "The website as the first meeting", p: "What a customer must understand in ten seconds, and what can wait." },
      { h: "Systems that save time", p: "Small workflows that give hours back, and where they usually break." },
    ],
    artAlt: "Drawing: a stone, a folding ruler and a magnifying glass looking at a blank card that has just become clear.",
    notify: "Want to hear when the first one is out?",
    notifyCta: "Send us an email",
    back: "All pieces",
    readMore: "Read",
  },
  create: no.create,
};

export const STUDIO: Record<Lang, StudioCopy> = { no, en };
