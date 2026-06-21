NUREA work showcase images ("Utvalgte arbeider" on the homepage).

Each project has TWO kinds of image:

1) COVER  (the calm placeholder/hero shown by default)
   work-1.webp, work-2.webp, ... work-6.webp

2) SHOTS  (the REAL work: website / logo / identity)
   These appear on HOVER on desktop, and auto-cycle over a blurred cover on phone.
   Name them per project with a letter suffix:
   work-1-a.webp, work-1-b.webp, work-1-c.webp   (project 1's shots)
   work-2-a.webp, work-2-b.webp ...              (project 2's shots)

(jpg/png also fine - just keep the names matching, or tell me and I'll wire paths.)

Then, in src/data/work.ts, for each project set:
  - title, caption           (short, honest)
  - metric / metricLabel      (a type tag like "Merkevare", or a REAL result)
  - cover: "/work/work-1.webp"
  - shots: ["/work/work-1-a.webp", "/work/work-1-b.webp"]
  - href: optional link to the live site/case

Best project first. Until images exist, cards show a warm placeholder (nothing breaks).
