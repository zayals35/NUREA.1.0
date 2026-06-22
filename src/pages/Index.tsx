import Hero from "@/components/hero/Hero";
import { SiteNav } from "@/components/home/SiteNav";
import { CloseTheGap } from "@/components/CloseTheGap";
import { HomeSections, EnemySection, TrapsSection, SiteFooter } from "@/components/home/HomeSections";

const Index = () => (
  <div style={{ background: "#e9e2d6" }}>
    <SiteNav />
    <span id="top" />
    <Hero />
    {/* Overlay moment: the thesis pins as a base, and the "VI TETTER GAPET" gap
        video card slides up and covers it. The overlay stops here. */}
    <div className="stack">
      {/* Thesis: the sharpest positioning line, sized to its own content */}
      <EnemySection />
      {/* "VI TETTER GAPET" gap card, covers the thesis above it */}
      <CloseTheGap />
    </div>
    {/* The two traps, a normal section styled like the thesis (no overlay) */}
    <TrapsSection />
    {/* Work, Services, Method, FAQ, Final CTA */}
    <HomeSections />
    <SiteFooter />
  </div>
);

export default Index;
