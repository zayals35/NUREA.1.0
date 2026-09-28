import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import ClipVideo from "../components/ClipVideo";
import { sound } from "../lib/sound";
import { useLang, type Lang } from "../i18n";

interface Clip {
  base: string;
  caption: string;
}

interface Case {
  id: string;
  company: string;
  kind: string;
  delivered: string;
  caption: string;
  href: string;
  hrefLabel: string;
  lead: Clip;
  phone: Clip;
  details: Clip[];
  strip?: Clip;
}

interface Copy {
  docTitle: string;
  eyebrow: string;
  title: string;
  intro: string;
  live: string;
  phone: string;
  possible: string;
  cta: string;
  cases: Case[];
}

const T: Record<Lang, Copy> = {
  no: {
    docTitle: "Arbeider",
    eyebrow: "Utvalgte arbeider",
    title: "Arbeid som gjør bedrifter tydeligere.",
    intro:
      "Ekte nettsider, filmet mens de er i bruk. Ingen mockups, ingen pynt. Det du ser her er det kundene deres ser.",
    live: "Se siden live",
    phone: "Samme side på mobil",
    possible: "Vil du se hva som er mulig for din bedrift?",
    cta: "Få din klarhetssjekk",
    cases: [
      {
        id: "gizay",
        company: "GIZAY",
        kind: "Hjemmetekstiler",
        delivered: "Nettside · Kreativ retning · Innholdsplan",
        caption:
          "GIZAY bringer egyptisk Giza-bomull inn i skandinaviske hjem. Siden forteller historien i den rekkefølgen en kunde trenger den: hvor bomullen kommer fra, hva du kan velge, og hvordan du melder deg på før lansering.",
        href: "https://gizay.no",
        hrefLabel: "gizay.no",
        lead: {
          base: "/work/gizay/clips/01-hero-arrival",
          caption: "Åpningen. Ikonet tegner seg selv, og overskriften lander.",
        },
        phone: { base: "/work/gizay/clips/06-phone-pass", caption: "" },
        details: [
          {
            base: "/work/gizay/clips/02-journey-map",
            caption: "Kartet. Scrollen fører deg fra Nildeltaet via Alexandria til Oslo.",
          },
          {
            base: "/work/gizay/clips/03-colours-travel",
            caption: "Fargene. Ett trykk bytter fra håndklær til sengetøy.",
          },
          {
            base: "/work/gizay/clips/05-close-field",
            caption: "Avslutningen. Påmeldingen ligger på GIZAYs eget dronebilde.",
          },
        ],
      },
      {
        id: "bilmekka",
        company: "Bilmekka",
        kind: "Bilforhandler",
        delivered: "Logo · Nettside · E-post · Systemer",
        caption:
          "Bilmekka trengte et uttrykk som føles like ryddig som en god bilhandel skal være. Kunden skriver inn skiltnummeret, og tre korte steg bærer det rett inn i et tilbudsskjema. Ingen leting, ingen telefonkø.",
        href: "https://www.bilmekka.no",
        hrefLabel: "bilmekka.no",
        lead: {
          base: "/work/bilmekka/clips/01-plate-funnel",
          caption: "Skiltnummer inn, forespørsel ut. Hele veien fra regnr til skjema.",
        },
        phone: { base: "/work/bilmekka/clips/05-phone-scroll", caption: "" },
        details: [
          {
            base: "/work/bilmekka/clips/03-formidling-price",
            caption: "Formidling med fast pris, åpnet med ett trykk.",
          },
          {
            base: "/work/bilmekka/clips/04-steps-reveal",
            caption: "Tre steg, lest på sekunder.",
          },
          {
            base: "/work/bilmekka/clips/06-testimonials",
            caption: "Ekte kunder, med egne ord.",
          },
        ],
        strip: {
          base: "/work/bilmekka/clips/02-partner-marquee",
          caption: "Partnerne som gir tillit, samlet i én rolig stripe.",
        },
      },
    ],
  },
  en: {
    docTitle: "Work",
    eyebrow: "Selected work",
    title: "Work that makes businesses clearer.",
    intro:
      "Real websites, recorded while in use. No mockups, no staging. What you see here is what their customers see.",
    live: "See it live",
    phone: "The same site on a phone",
    possible: "Want to see what is possible for your business?",
    cta: "Get your clarity check",
    cases: [
      {
        id: "gizay",
        company: "GIZAY",
        kind: "Home textiles",
        delivered: "Website · Creative direction · Content plan",
        caption:
          "GIZAY brings Egyptian Giza cotton into Scandinavian homes. The site tells the story in the order a customer needs it: where the cotton comes from, what you can choose, and how to sign up before launch.",
        href: "https://gizay.no",
        hrefLabel: "gizay.no",
        lead: {
          base: "/work/gizay/clips/01-hero-arrival",
          caption: "The opening. The icon draws itself and the headline lands.",
        },
        phone: { base: "/work/gizay/clips/06-phone-pass", caption: "" },
        details: [
          {
            base: "/work/gizay/clips/02-journey-map",
            caption: "The map. Scrolling carries you from the Nile Delta via Alexandria to Oslo.",
          },
          {
            base: "/work/gizay/clips/03-colours-travel",
            caption: "The colours. One press switches from towels to bed linen.",
          },
          {
            base: "/work/gizay/clips/05-close-field",
            caption: "The close. The sign-up sits on GIZAY's own drone footage.",
          },
        ],
      },
      {
        id: "bilmekka",
        company: "Bilmekka",
        kind: "Car dealership",
        delivered: "Logo · Website · Email · Systems",
        caption:
          "Bilmekka needed an expression as tidy as a good car dealership should be. The customer types in their licence plate, and three short steps carry it straight into a quote form. No searching, no phone queue.",
        href: "https://www.bilmekka.no",
        hrefLabel: "bilmekka.no",
        lead: {
          base: "/work/bilmekka/clips/01-plate-funnel",
          caption: "Plate in, inquiry out. The whole way from registration number to form.",
        },
        phone: { base: "/work/bilmekka/clips/05-phone-scroll", caption: "" },
        details: [
          {
            base: "/work/bilmekka/clips/03-formidling-price",
            caption: "Brokerage at a fixed price, opened with one press.",
          },
          {
            base: "/work/bilmekka/clips/04-steps-reveal",
            caption: "Three steps, read in seconds.",
          },
          {
            base: "/work/bilmekka/clips/06-testimonials",
            caption: "Real customers, in their own words.",
          },
        ],
        strip: {
          base: "/work/bilmekka/clips/02-partner-marquee",
          caption: "The partners that build trust, gathered in one calm strip.",
        },
      },
    ],
  },
};

function CaseBlock({ c, index, total, t }: { c: Case; index: number; total: number; t: Copy }) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <article aria-labelledby={`case-${c.id}`}>
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <Reveal className="md:col-span-4 md:sticky md:top-32 md:self-start">
          <p className="mono text-xs tracking-[0.14em] text-cream/55">
            {pad(index + 1)} / {pad(total)} · {c.kind}
          </p>
          <h2 id={`case-${c.id}`} className="display-sans mt-5 text-5xl md:text-7xl">
            {c.company}
          </h2>
          <p className="mono mt-4 text-xs tracking-[0.1em] text-cream/60">{c.delivered}</p>
          <p className="mt-7 max-w-[46ch] text-base leading-relaxed text-cream/80 md:text-lg">
            {c.caption}
          </p>
          <a
            href={c.href}
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.play("click")}
            className="link-line mt-8 inline-block whitespace-nowrap text-sm font-semibold text-cream"
          >
            {t.live}: {c.hrefLabel} ↗
          </a>
        </Reveal>

        <Reveal variant="fade-in" className="md:col-span-8">
          <figure className="relative pb-14 pr-[10%] md:pb-24">
            <div className="aspect-video overflow-hidden rounded-xl bg-espresso ring-1 ring-cream/10">
              <ClipVideo
                base={c.lead.base}
                alt={`${c.company}: ${c.lead.caption}`}
                width={1920}
                height={1080}
              />
            </div>
            <div className="absolute bottom-0 right-0 w-[21%] min-w-[84px] overflow-hidden rounded-[1.1rem] bg-espresso shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] ring-1 ring-cream/15">
              <div className="aspect-[810/1752]">
                <ClipVideo
                  base={c.phone.base}
                  alt={`${c.company}: ${t.phone}`}
                  width={810}
                  height={1752}
                />
              </div>
            </div>
            <figcaption className="mono mt-4 max-w-[60%] text-[11px] leading-relaxed tracking-[0.08em] text-cream/55">
              {c.lead.caption}
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <Reveal stagger={0.08} className="mt-14 grid gap-8 sm:grid-cols-3 md:mt-20 md:gap-6">
        {c.details.map((d) => (
          <figure key={d.base}>
            <div className="aspect-video overflow-hidden rounded-xl bg-espresso ring-1 ring-cream/10">
              <ClipVideo base={d.base} alt={`${c.company}: ${d.caption}`} width={1920} height={1080} />
            </div>
            <figcaption className="mono mt-3 text-[11px] leading-relaxed tracking-[0.08em] text-cream/55">
              {d.caption}
            </figcaption>
          </figure>
        ))}
      </Reveal>

      {c.strip && (
        <Reveal variant="fade-in" className="mt-10 md:mt-14">
          <figure>
            <div className="aspect-[1920/390] overflow-hidden rounded-xl bg-espresso ring-1 ring-cream/10">
              <ClipVideo
                base={c.strip.base}
                alt={`${c.company}: ${c.strip.caption}`}
                width={1920}
                height={390}
              />
            </div>
            <figcaption className="mono mt-3 text-[11px] leading-relaxed tracking-[0.08em] text-cream/55">
              {c.strip.caption}
            </figcaption>
          </figure>
        </Reveal>
      )}
    </article>
  );
}

export default function Arbeider() {
  const { lang, p } = useLang();
  const t = T[lang];
  return (
    <main>
      <PageHeader
        docTitle={t.docTitle}
        eyebrow={t.eyebrow}
        title={t.title}
        intro={t.intro}
      />

      <section className="bg-espresso-deep text-cream">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-32">
          <div className="flex flex-col gap-28 md:gap-44">
            {t.cases.map((c, i) => (
              <CaseBlock key={c.id} c={c} index={i} total={t.cases.length} t={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-parchment text-ink">
        <Reveal className="mx-auto max-w-[1440px] px-6 py-24 text-center md:px-10 md:py-36">
          <p className="display-sans mx-auto max-w-2xl text-2xl text-ink/75 md:text-3xl">
            {t.possible}
          </p>
          <div className="mt-8">
            <Button to={p("/klarhetssjekk")}>{t.cta}</Button>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
