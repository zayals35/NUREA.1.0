import Hero from "@/components/hero/Hero";
import { SiteNav } from "@/components/home/SiteNav";
import { CloseTheGap } from "@/components/CloseTheGap";
import { HomeSections, SiteFooter } from "@/components/home/HomeSections";

const Index = () => (
  <div style={{ background: "#e9e2d6" }}>
    <SiteNav />
    <span id="top" />
    <Hero />
    {/* Section 3: "VI TETTER GAPET" statement (the gap scroll effect) */}
    <CloseTheGap />
    {/* Work, Services, Method, FAQ, Final CTA */}
    <HomeSections />
    <SiteFooter />
  </div>
);

export default Index;
