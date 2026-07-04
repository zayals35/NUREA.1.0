import { useEffect } from "react";
import Hero from "../components/home/Hero";
import ProblemSection from "../components/home/ProblemSection";
import CloseTheGap from "../components/home/CloseTheGap";
import ServicesSection from "../components/home/ServicesSection";
import MethodSection from "../components/home/MethodSection";
import OfferSection from "../components/home/OfferSection";
import FaqSection from "../components/home/FaqSection";

export default function Home() {
  useEffect(() => {
    document.title = "NUREA, merkevare og digital retning";
  }, []);

  return (
    <main>
      <Hero />
      <ProblemSection />
      <ServicesSection />
      <CloseTheGap />
      <MethodSection />
      <OfferSection />
      <FaqSection />
    </main>
  );
}
