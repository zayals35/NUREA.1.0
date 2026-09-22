import { useEffect } from "react";
import Button from "../components/Button";
import { NureaLogo } from "../components/brand/NureaLogo";
import { useLang, type Lang } from "../i18n";

const T: Record<Lang, { docTitle: string; title: string; body: string; home: string }> = {
  no: {
    docTitle: "Siden finnes ikke · NUREA",
    title: "Denne siden finnes ikke.",
    body: "Kanskje lenken er gammel, eller kanskje noe ble skrevet feil. Det viktigste finner du uansett på forsiden.",
    home: "Til forsiden",
  },
  en: {
    docTitle: "Page not found · NUREA",
    title: "This page does not exist.",
    body: "Maybe the link is old, or maybe something was typed wrong. Either way, the important things are on the front page.",
    home: "To the front page",
  },
};

export default function NotFound() {
  const { lang, p } = useLang();
  const t = T[lang];

  useEffect(() => {
    document.title = t.docTitle;
  }, [t.docTitle]);

  return (
    <main className="grain relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-espresso px-6 text-center text-cream">
      <NureaLogo className="relative z-[2] h-12 w-auto text-cream md:h-16" aria-label="Nurea" />
      <p className="eyebrow relative z-[2] text-accent">404</p>
      <h1 className="display relative z-[2] mt-6 text-4xl md:text-6xl">
        {t.title}
      </h1>
      <p className="relative z-[2] mt-6 max-w-[44ch] text-base leading-relaxed text-cream/70">
        {t.body}
      </p>
      <div className="relative z-[2] mt-10">
        <Button to={p("/")}>{t.home}</Button>
      </div>
    </main>
  );
}
