import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import { FIELD, THANKS_BOX } from "../components/field";
import { mailtoFallback, type FormStatus } from "../lib/useWebForm";
import { deliverSubmission, newSubmissionId } from "../lib/submitSkjema";
import { SKJEMA, REQUIRED_IDS, type SkjemaSection } from "../data/skjema";
import { SERVICES, type ServiceId } from "../data/services";
import { sound } from "../lib/sound";

const STORAGE_KEY = "nurea-skjema-v1";

interface Contact {
  bedrift: string;
  navn: string;
  epost: string;
}

interface Saved {
  contact: Contact;
  answers: Record<string, string>;
  services: ServiceId[];
  submissionId: string;
}

function loadSaved(): Saved {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Saved>;
      const savedSubmissionId =
        typeof parsed.submissionId === "string" && /^[a-z0-9]{12}$/.test(parsed.submissionId)
          ? parsed.submissionId
          : newSubmissionId();
      return {
        contact: { bedrift: "", navn: "", epost: "", ...parsed.contact },
        answers: parsed.answers ?? {},
        services: (parsed.services ?? []).filter((id) =>
          SERVICES.no.some((s) => s.id === id)
        ),
        submissionId: savedSubmissionId,
      };
    }
  } catch {
    /* corrupt or unavailable storage; start clean */
  }
  return {
    contact: { bedrift: "", navn: "", epost: "" },
    answers: {},
    services: [],
    submissionId: newSubmissionId(),
  };
}

/** One collapsible questionnaire section, styled as a site list row. */
function AccordionSection({
  section,
  index,
  open,
  onToggle,
  answers,
  setAnswer,
  missing,
}: {
  section: SkjemaSection;
  index: number;
  open: boolean;
  onToggle: () => void;
  answers: Record<string, string>;
  setAnswer: (id: string, value: string) => void;
  missing: string[];
}) {
  const done = section.questions.filter((q) => answers[q.id]?.trim()).length;
  const total = section.questions.length;

  return (
    <div className="border-b border-ink/20">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`panel-${section.id}`}
        className="group flex w-full items-baseline gap-4 py-6 text-left md:gap-6"
      >
        <span className="poster text-lg text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="display-sans flex-1 text-xl transition-colors group-hover:text-accent md:text-2xl">
          {section.title}
        </span>
        <span
          className={`mono hidden text-[11px] tracking-[0.14em] sm:inline ${
            done === total ? "text-accent" : "text-ink/60"
          }`}
        >
          {done} av {total}
        </span>
        <span
          aria-hidden="true"
          className={`relative block h-4 w-4 shrink-0 self-center transition-transform duration-300 motion-reduce:transition-none ${
            open ? "rotate-45" : ""
          }`}
        >
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink/60" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-ink/60" />
        </span>
      </button>

      <div
        id={`panel-${section.id}`}
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
          open ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-8 pb-10 pt-2">
            {section.questions.map((q) => (
              <div key={q.id}>
                <label
                  htmlFor={q.id}
                  className="mb-2 block text-sm font-semibold leading-relaxed"
                >
                  {q.text}
                  {q.required && (
                    <span className="text-accent" aria-hidden="true">
                      {" "}
                      *
                    </span>
                  )}
                </label>
                <textarea
                  id={q.id}
                  rows={q.tall ? 4 : 2}
                  value={answers[q.id] ?? ""}
                  onChange={(e) => setAnswer(q.id, e.target.value)}
                  aria-required={q.required || undefined}
                  aria-invalid={missing.includes(q.id) || undefined}
                  className={`${FIELD} resize-y ${
                    missing.includes(q.id) ? "border-accent" : ""
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Skjema() {
  const [{ contact, answers, services, submissionId }, setSaved] = useState<Saved>(loadSaved);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [open, setOpen] = useState<Record<string, boolean>>({ [SKJEMA[0].id]: true });
  const [missing, setMissing] = useState<string[]>([]);
  const saveTimer = useRef<number>(undefined);
  const inFlight = useRef(false);

  // Autosave: everything typed lands in localStorage, debounced. An untouched
  // (or emptied) form stores nothing, as the privacy page promises.
  useEffect(() => {
    window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      try {
        const typed = Object.values(contact).some((v) => v.trim()) || Object.values(answers).some((v) => v.trim()) || services.length > 0;
        if (!typed) localStorage.removeItem(STORAGE_KEY);
        else localStorage.setItem(STORAGE_KEY, JSON.stringify({ contact, answers, services, submissionId }));
      } catch {
        /* storage full or blocked; the form still works */
      }
    }, 400);
    return () => window.clearTimeout(saveTimer.current);
  }, [contact, answers, services, submissionId]);

  const setContact = (field: keyof Contact, value: string) =>
    setSaved((s) => ({ ...s, contact: { ...s.contact, [field]: value } }));
  const setAnswer = (id: string, value: string) => {
    setSaved((s) => ({ ...s, answers: { ...s.answers, [id]: value } }));
    if (value.trim()) setMissing((m) => m.filter((x) => x !== id));
  };

  const toggle = (id: string) => {
    sound.play("click");
    setOpen((o) => ({ ...o, [id]: !o[id] }));
  };

  const toggleService = (id: ServiceId) => {
    sound.play("click");
    setSaved((s) => ({
      ...s,
      services: s.services.includes(id)
        ? s.services.filter((x) => x !== id)
        : [...s.services, id],
    }));
  };

  // Core sections always show; service sections only when a matching service is picked.
  const visible = SKJEMA.filter(
    (s) => !s.services || s.services.some((id) => services.includes(id))
  );
  const visibleQuestions = visible.flatMap((s) => s.questions);
  const answered = visibleQuestions.filter((q) => answers[q.id]?.trim()).length;

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    // One delivery at a time. A ref, not state: two clicks in the same tick both see
    // the old state, and the disabled fieldset only lands after the next render.
    if (inFlight.current) return;
    // Honeypot: humans never see the field; bots that fill it get dropped server-side.
    const honeypot = e ? String(new FormData(e.currentTarget).get("website") ?? "") : "";

    // The starred questions are the only ones that block submission.
    const missingIds = REQUIRED_IDS.filter((id) => !answers[id]?.trim());
    if (missingIds.length > 0) {
      setMissing(missingIds);
      setOpen((o) => {
        const next = { ...o };
        for (const s of SKJEMA) {
          if (s.questions.some((q) => missingIds.includes(q.id))) next[s.id] = true;
        }
        return next;
      });
      window.setTimeout(() => {
        const el = document.getElementById(missingIds[0]);
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
        el?.focus({ preventScroll: true });
      }, 120);
      return;
    }

    inFlight.current = true;
    setStatus("sending");

    const serviceTitles = services.map(
      (id) => SERVICES.no.find((s) => s.id === id)?.title ?? id
    );
    const sections = visible.map((s) => ({
      title: s.title,
      questions: s.questions.map((q) => ({
        text: q.text,
        answer: answers[q.id]?.trim() ?? "",
      })),
    }));

    try {
      const result = await deliverSubmission({
        website: honeypot,
        contact,
        services: serviceTitles,
        sections,
        submissionId,
      });

      if (result.outcome !== "failed") {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          /* storage blocked; the answers are delivered, the stale draft is harmless */
        }
        setStatus("ok");
        window.scrollTo(0, 0);
      } else {
        setStatus("error");
      }
    } finally {
      inFlight.current = false;
    }
  };

  return (
    <main>
      <PageHeader
        docTitle="Spørreskjema"
        titleClassName="display-sans"
        eyebrow="Oppstart · 15 til 25 minutter"
        title="Før vi bygger noe, vil vi forstå dere ordentlig."
        intro="Svar kort og ærlig, gjerne i stikkord. Det finnes ingen feil svar. Det du skriver her blir fundamentet for alt vi lager."
      />

      <section className="bg-parchment text-ink">
        <div className="mx-auto max-w-[880px] px-5 pb-20 pt-4 md:px-10 md:pb-28 md:pt-8">
          {status === "ok" ? (
            <Reveal>
              <div className={THANKS_BOX}>
                <p className="poster text-5xl md:text-6xl">Takk.</p>
                <p className="voice mx-auto mt-6 max-w-[34ch] text-xl text-ink md:text-2xl">
                  Vi har mottatt svarene dine. Zaynab leser dem før oppstartsmøtet,
                  så bruker vi tiden der på det som faktisk betyr noe. Du hører fra oss.
                </p>
              </div>
            </Reveal>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Locks every field and button while a delivery is in flight, so what was
                  sent is exactly what is on screen and a double click cannot double send. */}
              <fieldset disabled={status === "sending"} className="contents min-w-0 border-0 p-0 m-0">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />
              <Reveal>
                <p className="max-w-[52ch] text-sm leading-relaxed text-ink/70">
                  Ta det i ditt eget tempo. Svarene lagres automatisk i nettleseren
                  din, så du kan lukke siden og komme tilbake senere. Bare feltene
                  merket med <span className="font-semibold text-accent">*</span> må
                  fylles ut; hopp gjerne over resten der det ikke passer.
                </p>

                <div className="mt-12">
                  <p className="text-sm font-semibold">
                    Hva gjelder det?{" "}
                    <span className="font-normal text-ink/60">
                      Velg gjerne flere. Skjemaet viser bare det som er relevant.
                    </span>
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                    {SERVICES.no.map((s) => {
                      const on = services.includes(s.id);
                      return (
                        <button
                          key={s.id}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggleService(s.id)}
                          className={`rounded-none border px-5 py-4 text-left transition-colors ${
                            on
                              ? "border-accent bg-white/40"
                              : "border-ink/20 bg-white/20 hover:border-ink"
                          }`}
                        >
                          <span className="display-sans block text-lg">{s.title}</span>
                          <span className={`mt-1 block text-xs leading-relaxed ${on ? "text-accent" : "text-ink/60"}`}>
                            {s.description}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                  <div>
                    <label htmlFor="bedrift" className="mb-2 block text-sm font-semibold">
                      Bedrift{" "}
                      <span className="text-accent" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="bedrift"
                      required
                      value={contact.bedrift}
                      onChange={(e) => setContact("bedrift", e.target.value)}
                      placeholder="Bedriften AS"
                      className={FIELD}
                    />
                  </div>
                  <div>
                    <label htmlFor="navn" className="mb-2 block text-sm font-semibold">
                      Navn{" "}
                      <span className="text-accent" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="navn"
                      required
                      value={contact.navn}
                      onChange={(e) => setContact("navn", e.target.value)}
                      placeholder="Fornavn Etternavn"
                      className={FIELD}
                    />
                  </div>
                  <div>
                    <label htmlFor="epost" className="mb-2 block text-sm font-semibold">
                      E-post{" "}
                      <span className="text-accent" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="epost"
                      type="email"
                      required
                      value={contact.epost}
                      onChange={(e) => setContact("epost", e.target.value)}
                      placeholder="deg@bedriften.no"
                      className={FIELD}
                    />
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="mt-16 border-t-2 border-ink">
                  {visible.map((section, i) => (
                    <AccordionSection
                      key={section.id}
                      section={section}
                      index={i}
                      open={!!open[section.id]}
                      onToggle={() => toggle(section.id)}
                      answers={answers}
                      setAnswer={setAnswer}
                      missing={missing}
                    />
                  ))}
                </div>
              </Reveal>

              <div className="mt-14">
                <p className="mono text-xs tracking-[0.14em] text-ink/60">
                  {answered} av {visibleQuestions.length} besvart
                </p>
                <div className="mt-6">
                  <Button type="submit" className="w-full sm:w-auto">
                    {status === "sending" ? "Sender…" : "Send inn svarene"}
                  </Button>
                </div>
                {missing.length > 0 && (
                  <p className="mt-4 text-sm text-accent" role="alert">
                    Noen av feltene merket med * mangler svar. Vi har åpnet dem for deg.
                  </p>
                )}
                <p className="mt-6 max-w-[52ch] text-sm leading-relaxed text-ink/70">
                  Svarene behandles konfidensielt og brukes bare i prosjektet vårt
                  sammen. Les mer i{" "}
                  <Link to="/personvern" className="link-line font-semibold text-accent">
                    personvernerklæringen
                  </Link>
                  .
                </p>
                {status === "error" && (
                  <p className="mt-4 text-sm text-accent">
                    Noe gikk galt med innsendingen. Svarene dine er fortsatt lagret
                    her i nettleseren, så du kan prøve igjen om litt. Du kan også{" "}
                    <button
                      type="button"
                      className="link-line font-semibold"
                      onClick={() => void handleSubmit()}
                    >
                      Prøv igjen
                    </button>{" "}
                    eller{" "}
                    <a
                      className="link-line font-semibold"
                      href={mailtoFallback(
                        "Spørreskjema",
                        "Hei! Jeg fikk ikke sendt inn spørreskjemaet på nurea.no/skjema. Kan dere ta kontakt?"
                      )}
                    >
                      sende oss en e-post direkte
                    </a>
                    .
                  </p>
                )}
              </div>
              </fieldset>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
