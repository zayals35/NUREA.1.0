NUREA work showcase images ("Utvalgte arbeider" on the homepage).

Each project (src/data/work.ts) now has TWO image roles:

1) ART  (the NUREA-made abstract artwork shown AT REST — the card "frame")
   art-<id>.webp   e.g. art-metanoia.webp
   These are generated abstract pieces in the warm palette, one per card.

2) SHOTS  (the REAL brand work: lookbook / logo / identity / site)
   On hover (desktop) the art greys + recedes and these appear FRAMED inside
   it, cycling. On phone they auto-cycle over the receded art.
   Name per project: <id>-cover.webp, <id>-a.webp, <id>-logo.webp, ...

All images are optimized webp (max 1280px wide). To add/replace: drop the
file in this folder, then point src/data/work.ts at it (art / shots[]).
A project with shots: [] simply rests as its artwork (e.g. Moustache City
until its assets arrive).
