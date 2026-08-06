import { useState, type FormEvent } from "react";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import { useWebForm, mailtoFallback } from "../lib/useWebForm";
import { sound } from "../lib/sound";
import { useLang, type Lang } from "../i18n";

const T: Record<Lang, {
  docTitle: string;
  eyebrow: string;
  title: string;
  intro: string;
  lookAt: string;
  reviews: string[];
  personal: string;
  thanks: string;
  thanksBody: string;
  siteLabel: string;
  sitePlaceholder: string;
  focusLegend: string;
  emailLabel: string;
  emailPlaceholder: string;
  nameLabel: string;
  nameOptional: string;
  namePlaceholder: string;
  sending: string;
  cta: string;
  errorPre: string;
  errorLink: string;
  mailtoSubject: string;
  mailtoBody: string;
}> = {
  no: {
    docTitle: "Klarhetssjekk",
    eyebrow: "Gratis · uforpliktende",
    title: "Gratis digital klarhetssjekk.",
    intro:
      "Send inn nettsiden din. Du får en kort vurdering med 3 ting som fungerer, 3 ting som svekker tillit, og 1 konkret forbedring du kan gjøre denne uken.",
    lookAt: "Dette ser vi på",
    reviews: [
      "Førsteinntrykk",
      "Tydelighet",
      "Tillit",
      "Mobilopplevelse",
      "CTA",
      "Kontaktflyt",
      "Visuell kvalitet",
    ],
    personal:
      "Vurderingen gjøres av Zaynab personlig. Du hører fra oss innen kort tid, uten forpliktelser og uten mas i etterkant.",
    thanks: "Takk.",
    thanksBody:
      "Vi har mottatt forespørselen din. Du hører fra oss så snart klarhetssjekken er klar.",
    siteLabel: "Nettside-URL eller Instagram-handle *",
    sitePlaceholder: "dinbedrift.no eller @dinbedrift",
    focusLegend: "Hva vil du at vi ser ekstra på?",
    emailLabel: "E-post *",
    emailPlaceholder: "deg@bedriften.no",
    nameLabel: "Navn",
    nameOptional: "(valgfritt)",
    namePlaceholder: "Fornavn Etternavn",
    sending: "Sender…",
    cta: "Få din klarhetssjekk",
    errorPre: "Noe gikk galt med innsendingen. Du kan i stedet",
    errorLink: "sende oss en e-post direkte",
    mailtoSubject: "Klarhetssjekk",
    mailtoBody: "Hei! Jeg vil gjerne ha en klarhetssjekk.\n\nNettside/Instagram: \nE-post: \nNavn: ",
  },
  en: {
    docTitle: "Clarity check",
    eyebrow: "Free · no obligations",
    title: "Free digital clarity check.",
    intro:
      "Send us your website. You get a short assessment with 3 things that work, 3 things that weaken trust, and 1 concrete improvement you can make this week.",
    lookAt: "What we look at",
    reviews: [
      "First impression",
      "Clarity",
      "Trust",
      "Mobile experience",
      "CTA",
      "Contact flow",
      "Visual quality",
    ],
    personal:
      "The assessment is done by Zaynab personally. You hear from us shortly, with no obligations and no chasing afterwards.",
    thanks: "Thank you.",
    thanksBody:
      "We have received your request. You will hear from us as soon as your clarity check is ready.",
    siteLabel: "Website URL or Instagram handle *",
    sitePlaceholder: "yourbusiness.com or @yourbusiness",
    focusLegend: "What should we look at extra closely?",
    emailLabel: "Email *",
    emailPlaceholder: "you@yourbusiness.com",
    nameLabel: "Name",
    nameOptional: "(optional)",
    namePlaceholder: "First and last name",
    sending: "Sending…",
    cta: "Get your clarity check",
    errorPre: "Something went wrong with the submission. You can instead",
    errorLink: "send us an email directly",
    mailtoSubject: "Clarity check",
    mailtoBody: "Hi! I would like a clarity check.\n\nWebsite/Instagram: \nEmail: \nName: ",
  },
};

const FIELD =
  "w-full rounded-none border border-ink/15 bg-white/50 px-5 py-4 text-base text-ink placeholder:text-ink/35 outline-none transition-[border-color,box-shadow] focus:border-accent focus:shadow-[0_0_0_3px_rgba(194,81,31,0.15)]";

export default function Klarhetssjekk() {
  const { lang } = useLang();
  const t = T[lang];
  const { status, submit } = useWebForm("Klarhetssjekk, ny forespørsel");
  const [focus, setFocus] = useState<string[]>([]);

  const toggleFocus = (val: string) => {
    sound.play("click");
    setFocus((f) => (f.includes(val) ? f.filter((x) => x !== val) : [...f, val]));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    submit({
      "Nettside eller Instagram": String(data.get("site") ?? ""),
      Fokus: focus.join(", ") || "Ikke valgt",
      "E-post": String(data.get("email") ?? ""),
      Navn: String(data.get("name") ?? "") || "Ikke oppgitt",
      Språk: lang === "no" ? "Norsk" : "Engelsk",
    });
  };

  return (
    <main>
      <PageHeader
        docTitle={t.docTitle}
        eyebrow={t.eyebrow}
        title={t.title}
        intro={t.intro}
      />

      <section className="bg-parchment text-ink">
        <div className="mx-auto grid max-w-[1440px] gap-16 px-6 py-20 md:grid-cols-[1fr_1.2fr] md:gap-24 md:px-10 md:py-32">
          <Reveal>
            <p className="eyebrow text-accent">{t.lookAt}</p>
            <ul className="mt-8 flex flex-col gap-4">
              {t.reviews.map((r, i) => (
                <li key={r} className="flex items-baseline gap-4 border-b border-ink/10 pb-4">
                  <span className="text-xs font-semibold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display-sans text-xl md:text-2xl">{r}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-[44ch] text-sm leading-relaxed text-ink/55">
              {t.personal}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            {status === "ok" ? (
              <div className="rounded-2xl border border-accent/25 bg-white/40 p-10 text-center md:p-16">
                <p className="display-sans text-5xl md:text-6xl">{t.thanks}</p>
                <p className="mx-auto mt-6 max-w-[40ch] text-base leading-relaxed text-ink/65">
                  {t.thanksBody}
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-6">
                <div>
                  <label htmlFor="site" className="mb-2 block text-sm font-semibold">
                    {t.siteLabel}
                  </label>
                  <input
                    id="site"
                    name="site"
                    required
                    placeholder={t.sitePlaceholder}
                    className={FIELD}
                  />
                </div>

                <fieldset>
                  <legend className="mb-2 block text-sm font-semibold">
                    {t.focusLegend}
                  </legend>
                  <div className="flex gap-3">
                    {["UI/UX", "SEO/AEO"].map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => toggleFocus(f)}
                        aria-pressed={focus.includes(f)}
                        className={`mono rounded-none border px-5 py-2.5 text-xs tracking-[0.1em] transition-colors ${
                          focus.includes(f)
                            ? "border-accent bg-accent text-[#f6efe2]"
                            : "border-ink/20 text-ink/70 hover:border-ink/50"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                    {t.emailLabel}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={t.emailPlaceholder}
                    className={FIELD}
                  />
                </div>

                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold">
                    {t.nameLabel} <span className="font-normal text-ink/40">{t.nameOptional}</span>
                  </label>
                  <input id="name" name="name" placeholder={t.namePlaceholder} className={FIELD} />
                </div>

                <div className="mt-2">
                  <Button type="submit" className="w-full py-5 text-base sm:w-auto sm:px-12">
                    {status === "sending" ? t.sending : t.cta}
                  </Button>
                </div>

                {status === "error" && (
                  <p className="text-sm text-accent">
                    {t.errorPre}{" "}
                    <a
                      className="link-line font-semibold"
                      href={mailtoFallback(t.mailtoSubject, t.mailtoBody)}
                    >
                      {t.errorLink}
                    </a>
                    .
                  </p>
                )}
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </main>
  );
}
