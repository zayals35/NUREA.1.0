import { useEffect } from "react";
import Hero from "../components/home/Hero";
import Positioning from "../components/home/Positioning";
import TrustRow from "../components/home/TrustRow";
import KineticRibbon from "../components/home/KineticRibbon";
import WorkSection from "../components/home/WorkSection";
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
      <Positioning />
      <TrustRow />
      <KineticRibbon />
      <WorkSection />
      <ServicesSection />
      <MethodSection />
      <OfferSection />
      <FaqSection />
    </main>
  );
}
