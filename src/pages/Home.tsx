import { useEffect } from "react";
import { useLang } from "../i18n";
import Hero from "../components/home/Hero";
import TrustBelt from "../components/home/TrustBelt";
import ProblemSection from "../components/home/ProblemSection";
import CloseTheGap from "../components/home/CloseTheGap";
import ServicesSection from "../components/home/ServicesSection";
import MethodSection from "../components/home/MethodSection";
import FaqSection from "../components/home/FaqSection";

export default function Home() {
  const { lang } = useLang();
  useEffect(() => {
    document.title =
      lang === "no"
        ? "NUREA, lettere å forstå. Lettere å velge."
        : "NUREA, easier to understand. Easier to choose.";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        lang === "no"
          ? "Nurea driver bedriftens digitale tilstedeværelse og holder den synlig hver uke."
          : "Nurea runs your business's digital presence and keeps it visible every week."
      );
  }, [lang]);

  return (
    <main>
      <Hero />
      <TrustBelt />
      <ProblemSection />
      <ServicesSection />
      <CloseTheGap />
      <MethodSection />
      <FaqSection />
    </main>
  );
}
