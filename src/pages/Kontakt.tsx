import type { FormEvent } from "react";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import { useWebForm, mailtoFallback, LEAD_EMAIL } from "../lib/useWebForm";

const FIELD =
  "w-full rounded-xl border border-ink/15 bg-white/50 px-5 py-4 text-base text-ink placeholder:text-ink/35 outline-none transition-[border-color,box-shadow] focus:border-accent focus:shadow-[0_0_0_3px_rgba(138,90,47,0.15)]";

export default function Kontakt() {
  const { status, submit } = useWebForm("Kontaktskjema, ny melding");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    submit({
      Navn: String(data.get("name") ?? ""),
      "E-post": String(data.get("email") ?? ""),
      Melding: String(data.get("message") ?? ""),
    });
  };

  return (
    <main>
      <PageHeader
        docTitle="Kontakt"
        eyebrow="Kontakt"
        title="La oss snakke."
        intro="En rolig, uforpliktende samtale om hvor du står, og hva som bør bli klarere først."
      />

      <section className="bg-parchment text-ink">
        <div className="mx-auto grid max-w-[1440px] gap-16 px-6 py-20 md:grid-cols-[1fr_1.2fr] md:gap-24 md:px-10 md:py-32">
          <Reveal>
            <p className="eyebrow text-accent">Direkte</p>
            <a href={`mailto:${LEAD_EMAIL}`} className="link-line display mt-6 inline-block text-3xl md:text-4xl">
              {LEAD_EMAIL}
            </a>
            <p className="mt-8 max-w-[44ch] text-sm leading-relaxed text-ink/55 md:text-base">
              NUREA holder til i Trondheim og jobber med bedrifter i hele
              Norge. Zaynab er din kontaktperson fra første melding.
            </p>
            <p className="mt-6 text-sm text-ink/55">
              <a
                href="https://www.instagram.com/nurea.no"
                target="_blank"
                rel="noreferrer"
                className="link-line font-semibold"
              >
                Instagram
              </a>
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            {status === "ok" ? (
              <div className="rounded-2xl border border-accent/25 bg-white/40 p-10 text-center md:p-16">
                <p className="display text-5xl md:text-6xl">Takk.</p>
                <p className="mx-auto mt-6 max-w-[40ch] text-base leading-relaxed text-ink/65">
                  Meldingen er sendt. Du hører fra oss snart.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold">
                    Navn *
                  </label>
                  <input id="name" name="name" required placeholder="Fornavn Etternavn" className={FIELD} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                    E-post *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="deg@bedriften.no"
                    className={FIELD}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-semibold">
                    Melding *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Fortell kort om bedriften din og hva du ønsker å få til."
                    className={`${FIELD} resize-y`}
                  />
                </div>
                <div className="mt-2">
                  <Button type="submit" className="w-full py-5 text-base sm:w-auto sm:px-12">
                    {status === "sending" ? "Sender…" : "Send melding"}
                  </Button>
                </div>
                {status === "error" && (
                  <p className="text-sm text-accent">
                    Noe gikk galt med innsendingen. Du kan i stedet{" "}
                    <a
                      className="link-line font-semibold"
                      href={mailtoFallback("Henvendelse fra nettsiden", "Hei!\n\n")}
                    >
                      sende oss en e-post direkte
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
