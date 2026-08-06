import { useEffect } from "react";
import { useLang } from "../i18n";
import Hero from "../components/home/Hero";
import TrustBelt from "../components/home/TrustBelt";
import ProblemSection from "../components/home/ProblemSection";
import CloseTheGap from "../components/home/CloseTheGap";
import ServicesSection from "../components/home/ServicesSection";
import MethodSection from "../components/home/MethodSection";
import OfferSection from "../components/home/OfferSection";
import FaqSection from "../components/home/FaqSection";

export default function Home() {
  const { lang } = useLang();
  useEffect(() => {
    document.title =
      lang === "no"
        ? "NUREA, merkevare og digital retning"
        : "NUREA, brand and digital direction";
  }, [lang]);

  return (
    <main>
      <Hero />
      <TrustBelt />
      <ProblemSection />
      <ServicesSection />
      <CloseTheGap />
      <MethodSection />
      <OfferSection />
      <FaqSection />
    </main>
  );
}
