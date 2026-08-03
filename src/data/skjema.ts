/**
 * The client questionnaire, rendered at /skjema.
 * Canonical source: CLAUDE.OS vault, NUREA.HQ/os/client-onboarding/05-CLIENT-QUESTIONNAIRE.md.
 * If a question changes there, change it here too.
 *
 * Sections without a `services` list are core: every client sees them.
 * Sections with one appear only when the client has picked a matching
 * service in the first step. Questions with `required: true` are the only
 * ones that block submission; they get a star in the UI.
 */

import type { ServiceId } from "./services";

export interface SkjemaQuestion {
  id: string;
  text: string;
  /** Wider answer field for questions that invite longer answers. */
  tall?: boolean;
  /** Blocks submission when empty; rendered with a star. */
  required?: boolean;
}

export interface SkjemaSection {
  id: string;
  title: string;
  /** Services this section is relevant for; omit for core sections everyone sees. */
  services?: ServiceId[];
  questions: SkjemaQuestion[];
}

export const SKJEMA: SkjemaSection[] = [
  {
    id: "bedriften",
    title: "Om bedriften",
    questions: [
      {
        id: "hva-lever-dere-av",
        text: "Hva heter bedriften, og hva lever dere av?",
        required: true,
      },
      { id: "hvor-lenge", text: "Hvor lenge har dere holdt på, og hvor mange er dere?" },
      { id: "historien", text: "Fortell kort historien: hvorfor startet dere?", tall: true },
    ],
  },
  {
    id: "maal",
    title: "Mål",
    questions: [
      {
        id: "utrette",
        text: "Hva skal dette prosjektet gjøre for bedriften? Ikke hvordan det skal se ut, men hva det skal utrette.",
        tall: true,
        required: true,
      },
      {
        id: "viktigst-neste-aar",
        text: "Hva er viktigst det neste året: flere henvendelser, riktigere kunder, høyere priser, eller noe annet?",
      },
    ],
  },
  {
    id: "kundene",
    title: "Kundene",
    questions: [
      {
        id: "droemmekunden",
        text: "Beskriv drømmekunden: hvem er de, og hva er de bekymret for når de leter etter noen som dere?",
        tall: true,
        required: true,
      },
      { id: "spoer-alltid-om", text: "Hva spør kundene alltid om før de bestiller?" },
      { id: "faerre-av", text: "Hvilke kunder vil dere ha færre av?" },
    ],
  },
  {
    id: "tilbudet",
    title: "Tilbudet",
    services: ["merkevare", "nettsider", "innhold", "reklamer"],
    questions: [
      { id: "tjenester", text: "List opp tjenestene deres, med det viktigste først.", tall: true },
      { id: "tjener-mest", text: "Hva tjener dere faktisk mest på?" },
      {
        id: "hvorfor-dere",
        text: "Hvorfor velger kundene dere i stedet for konkurrentene? Hva sier de selv?",
      },
    ],
  },
  {
    id: "personlighet",
    title: "Personlighet",
    services: ["merkevare", "nettsider", "innhold", "reklamer"],
    questions: [
      { id: "tre-ord", text: "Hvis bedriften var en person: hvordan snakker den? Tre ord." },
      { id: "foele", text: "Hva skal folk føle etter å ha vært innom nettsiden deres?" },
    ],
  },
  {
    id: "konkurrenter",
    title: "Konkurrenter",
    services: ["merkevare", "nettsider", "reklamer"],
    questions: [
      {
        id: "sammenlignes-med",
        text: "Nevn to eller tre konkurrenter kundene sammenligner dere med. Gjerne med nettadresse.",
      },
      { id: "gjoer-det-bra", text: "Er det noen i bransjen, hvor som helst, som gjør det digitale bra?" },
    ],
  },
  {
    id: "referanser",
    title: "Visuelle referanser",
    services: ["merkevare", "nettsider", "innhold"],
    questions: [
      {
        id: "nettsider-du-liker",
        text: "Send to eller tre nettsider du liker, fra hvilken som helst bransje, og si kort hva du liker ved dem.",
        tall: true,
      },
      {
        id: "vil-ikke-ha",
        text: "Finnes det farger, uttrykk eller stiler dere absolutt ikke vil ha?",
      },
    ],
  },
  {
    id: "nettsiden",
    title: "Nettsiden",
    services: ["nettsider"],
    questions: [
      { id: "fungerer-irriterer", text: "Hva fungerer på dagens nettside, og hva irriterer dere mest?" },
      { id: "besoekende-gjoere", text: "Hva skal en besøkende gjøre: ringe, sende skjema, booke, besøke?" },
      {
        id: "funksjoner",
        text: "Trenger dere spesielle funksjoner: booking, skjemaer, karriereside, flere språk, noe annet?",
      },
    ],
  },
  {
    id: "innhold",
    title: "Innhold",
    services: ["nettsider", "innhold"],
    questions: [
      {
        id: "eksisterende-innhold",
        text: "Har dere tekster, bilder eller video vi kan bruke, eller skal alt lages?",
      },
      {
        id: "fagperson",
        text: "Hvem hos dere kan svare på faglige spørsmål når vi skriver tekstene?",
      },
    ],
  },
  {
    id: "teknisk",
    title: "Teknisk",
    services: ["nettsider", "systemer", "reklamer"],
    questions: [
      { id: "domenet", text: "Hvor er domenet registrert, og hvem har tilgangen?" },
      {
        id: "kontoer",
        text: "Har dere Google Bedriftsprofil, analyse eller annonsekontoer vi bør vite om?",
      },
    ],
  },
  {
    id: "ikke-liker",
    title: "Det dere ikke liker",
    questions: [
      {
        id: "irritert-tidligere",
        text: "Hva har irritert dere i tidligere samarbeid med byråer, designere eller utviklere?",
      },
    ],
  },
  {
    id: "suksess",
    title: "Suksess",
    questions: [
      {
        id: "annerledes-hverdag",
        text: "Se for deg at vi er ferdige og det ble akkurat som dere håpet. Hva er annerledes i hverdagen deres?",
        tall: true,
      },
      { id: "burde-vite", text: "Er det noe vi ikke har spurt om som vi burde vite?" },
    ],
  },
];

/** The question ids that block submission when empty. */
export const REQUIRED_IDS = SKJEMA.flatMap((s) => s.questions)
  .filter((q) => q.required)
  .map((q) => q.id);
