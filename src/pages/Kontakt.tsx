import type { FormEvent } from "react";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import { FIELD, THANKS_BOX } from "../components/field";
import { useWebForm, mailtoFallback, LEAD_EMAIL } from "../lib/useWebForm";
import { useLang, type Lang } from "../i18n";

const T: Record<Lang, {
  docTitle: string;
  eyebrow: string;
  title: string;
  intro: string;
  direct: string;
  about: string;
  thanks: string;
  thanksBody: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  sending: string;
  send: string;
  errorPre: string;
  errorLink: string;
  mailtoSubject: string;
}> = {
  no: {
    docTitle: "Kontakt",
    eyebrow: "Kontakt",
    title: "La oss snakke.",
    intro: "En rolig, uforpliktende samtale om hvor du står, og hva som bør bli klarere først.",
    direct: "Direkte",
    about:
      "NUREA holder til i Trondheim og jobber med bedrifter i hele Norge. Zaynab er din kontaktperson fra første melding.",
    thanks: "Takk.",
    thanksBody: "Meldingen er sendt. Du hører fra oss snart.",
    nameLabel: "Navn *",
    namePlaceholder: "Fornavn Etternavn",
    emailLabel: "E-post *",
    emailPlaceholder: "deg@bedriften.no",
    messageLabel: "Melding *",
    messagePlaceholder: "Fortell kort om bedriften din og hva du ønsker å få til.",
    sending: "Sender…",
    send: "Send melding",
    errorPre: "Noe gikk galt med innsendingen. Du kan i stedet",
    errorLink: "sende oss en e-post direkte",
    mailtoSubject: "Henvendelse fra nettsiden",
  },
  en: {
    docTitle: "Contact",
    eyebrow: "Contact",
    title: "Let's talk.",
    intro: "A calm, no-obligation conversation about where you stand, and what should become clearer first.",
    direct: "Direct",
    about:
      "NUREA is based in Trondheim and works with businesses across Norway and beyond. Zaynab is your contact from the first message.",
    thanks: "Thank you.",
    thanksBody: "Your message has been sent. You will hear from us soon.",
    nameLabel: "Name *",
    namePlaceholder: "First and last name",
    emailLabel: "Email *",
    emailPlaceholder: "you@yourbusiness.com",
    messageLabel: "Message *",
    messagePlaceholder: "Tell us briefly about your business and what you want to achieve.",
    sending: "Sending…",
    send: "Send message",
    errorPre: "Something went wrong with the submission. You can instead",
    errorLink: "send us an email directly",
    mailtoSubject: "Inquiry from the website",
  },
};

export default function Kontakt() {
  const { lang } = useLang();
  const t = T[lang];
  const { status, submit } = useWebForm("Kontaktskjema, ny melding");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    submit({
      Navn: String(data.get("name") ?? ""),
      "E-post": String(data.get("email") ?? ""),
      Melding: String(data.get("message") ?? ""),
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
        <div className="mx-auto grid max-w-[1440px] gap-16 px-5 pb-20 pt-4 md:grid-cols-[1fr_1.2fr] md:gap-24 md:px-10 md:pb-32 md:pt-8">
          <Reveal>
            <p className="eyebrow text-accent">{t.direct}</p>
            <a href={`mailto:${LEAD_EMAIL}`} className="link-line display-sans mt-6 inline-block text-3xl md:text-4xl">
              {LEAD_EMAIL}
            </a>
            <p className="mt-8 max-w-[44ch] text-sm leading-relaxed text-ink/70 md:text-base">
              {t.about}
            </p>
            <p className="mt-6 text-sm text-ink/70">
              <a
                href="https://www.instagram.com/nurea.no"
                target="_blank"
                rel="noreferrer"
                className="link-line font-semibold text-accent"
              >
                Instagram
              </a>
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            {status === "ok" ? (
              <div className={THANKS_BOX}>
                <p className="poster text-5xl md:text-6xl">{t.thanks}</p>
                <p className="voice mx-auto mt-6 max-w-[30ch] text-xl text-ink md:text-2xl">
                  {t.thanksBody}
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold">
                    {t.nameLabel}
                  </label>
                  <input id="name" name="name" required placeholder={t.namePlaceholder} className={FIELD} />
                </div>
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
                  <label htmlFor="message" className="mb-2 block text-sm font-semibold">
                    {t.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder={t.messagePlaceholder}
                    className={`${FIELD} resize-y`}
                  />
                </div>
                <div className="mt-2">
                  <Button type="submit" className="w-full sm:w-auto">
                    {status === "sending" ? t.sending : t.send}
                  </Button>
                </div>
                {status === "error" && (
                  <p className="text-sm text-accent">
                    {t.errorPre}{" "}
                    <a
                      className="link-line font-semibold"
                      href={mailtoFallback(t.mailtoSubject, "Hei!\n\n")}
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
