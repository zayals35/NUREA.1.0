import { useState, type FormEvent } from "react";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import { useWebForm, mailtoFallback } from "../lib/useWebForm";
import { sound } from "../lib/sound";

const REVIEWS = [
  "Førsteinntrykk",
  "Tydelighet",
  "Tillit",
  "Mobilopplevelse",
  "CTA",
  "Kontaktflyt",
  "Visuell kvalitet",
];

const FIELD =
  "w-full rounded-none border border-ink/15 bg-white/50 px-5 py-4 text-base text-ink placeholder:text-ink/35 outline-none transition-[border-color,box-shadow] focus:border-accent focus:shadow-[0_0_0_3px_rgba(194,81,31,0.15)]";

export default function Klarhetssjekk() {
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
    });
  };

  return (
    <main>
      <PageHeader
        docTitle="Klarhetssjekk"
        eyebrow="Gratis · uforpliktende"
        title="Gratis digital klarhetssjekk."
        intro="Send inn nettsiden din. Du får en kort vurdering med 3 ting som fungerer, 3 ting som svekker tillit, og 1 konkret forbedring du kan gjøre denne uken."
      />

      <section className="bg-parchment text-ink">
        <div className="mx-auto grid max-w-[1440px] gap-16 px-6 py-20 md:grid-cols-[1fr_1.2fr] md:gap-24 md:px-10 md:py-32">
          <Reveal>
            <p className="eyebrow text-accent">Dette ser vi på</p>
            <ul className="mt-8 flex flex-col gap-4">
              {REVIEWS.map((r, i) => (
                <li key={r} className="flex items-baseline gap-4 border-b border-ink/10 pb-4">
                  <span className="text-xs font-semibold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display-sans text-xl md:text-2xl">{r}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-[44ch] text-sm leading-relaxed text-ink/55">
              Vurderingen gjøres av Zaynab personlig. Du hører fra oss innen
              kort tid, uten forpliktelser og uten mas i etterkant.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            {status === "ok" ? (
              <div className="rounded-2xl border border-accent/25 bg-white/40 p-10 text-center md:p-16">
                <p className="display-sans text-5xl md:text-6xl">Takk.</p>
                <p className="mx-auto mt-6 max-w-[40ch] text-base leading-relaxed text-ink/65">
                  Vi har mottatt forespørselen din. Du hører fra oss så snart
                  klarhetssjekken er klar.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-6">
                <div>
                  <label htmlFor="site" className="mb-2 block text-sm font-semibold">
                    Nettside-URL eller Instagram-handle *
                  </label>
                  <input
                    id="site"
                    name="site"
                    required
                    placeholder="dinbedrift.no eller @dinbedrift"
                    className={FIELD}
                  />
                </div>

                <fieldset>
                  <legend className="mb-2 block text-sm font-semibold">
                    Hva vil du at vi ser ekstra på?
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
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold">
                    Navn <span className="font-normal text-ink/40">(valgfritt)</span>
                  </label>
                  <input id="name" name="name" placeholder="Fornavn Etternavn" className={FIELD} />
                </div>

                <div className="mt-2">
                  <Button type="submit" className="w-full py-5 text-base sm:w-auto sm:px-12">
                    {status === "sending" ? "Sender…" : "Få din klarhetssjekk"}
                  </Button>
                </div>

                {status === "error" && (
                  <p className="text-sm text-accent">
                    Noe gikk galt med innsendingen. Du kan i stedet{" "}
                    <a
                      className="link-line font-semibold"
                      href={mailtoFallback(
                        "Klarhetssjekk",
                        "Hei! Jeg vil gjerne ha en klarhetssjekk.\n\nNettside/Instagram: \nE-post: \nNavn: "
                      )}
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
