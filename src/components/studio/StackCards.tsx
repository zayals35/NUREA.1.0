import { useRef, type ComponentType, type CSSProperties, type FocusEvent } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/motion";
import { useLang } from "../../i18n";
import { STUDIO, type HomeCard } from "../../data/studioSite";
import { deckGeometry, scrollForCard, type DeckGeometry } from "../../lib/deck";
import BlinkEye from "./BlinkEye";
import { AiArt, FolkArt, HueField, LensArt, SynArt } from "./DeckArt";
import { LENS_POSES, lensTransform, lensVars, type LensPart } from "../../lib/lens";
import { CutLink } from "./parts";

/** Each card's colour, from the identity palette; the text colour follows. Create is the moving hue of all four (her revise, 2026-09-30). */
const TONE: Record<HomeCard["id"], "citron" | "blue" | "red" | "hue"> = { syn: "citron", ai: "blue", folk: "red", create: "hue" };
const ART: Record<HomeCard["id"], ComponentType> = { syn: SynArt, ai: AiArt, folk: FolkArt, create: HueField };

/** Card art is scrubbed by the scroll whenever motion is allowed, deck or no deck. */
const ART_ON = "(prefers-reduced-motion: no-preference)";

/** The sticky deck runs only where studio.css makes it sticky: motion allowed and a screen tall enough for a whole card. */
const DECK_ON = "(prefers-reduced-motion: no-preference) and (min-height: 600px)";

/** Phones: the drawing sits low on a tall card, so its scrub is timed to the drawing itself (studio.css, max-width 899px). */
const PHONE = "(max-width: 899px)";

/**
 * The homepage deck, rebuilt to elespacio.net's measured behaviour
 * (2026-09-29, lib/deck.ts): a statement column pinned beside a column of
 * sticky cards. Each card rises at scroll speed and sticks 18 px below the
 * one before; covered cards shrink from their top edge until the last card
 * lands, and the deck then leaves as one. On landing, a card's content gives
 * one short squash and settle, forwards only, as in the reference.
 *
 * Only transform moves. Sticky itself is layout, so reduced motion and short
 * screens get a plain column of all four cards (studio.css), and there are
 * no pin spacers to leave behind. Keyboard focus entering a covered card
 * scrolls to the moment that card lands, so a focused control is always on
 * the top card, in both directions.
 */
export default function StackCards() {
  const { lang, p } = useLang();
  const t = STUDIO[lang];
  const h = t.home;
  const root = useRef<HTMLElement>(null);
  const geometry = useRef<DeckGeometry | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DECK_ON, () => {
        const section = root.current!;
        const list = section.querySelector<HTMLElement>(".st-deck")!;
        const items = gsap.utils.toArray<HTMLElement>(".st-deck-item", list);
        const inners = items.map((it) => it.querySelector<HTMLElement>(".st-deck-card")!);

        // The list never sticks, so its top is a natural position; card
        // heights are unaffected by sticking and by the scale on the item.
        const measure = () => {
          const slot = parseFloat(getComputedStyle(items[0]).top) || 0;
          const gap = parseFloat(getComputedStyle(list).rowGap) || 0;
          geometry.current = deckGeometry(list.getBoundingClientRect().top + window.scrollY, items.map((it) => it.offsetHeight), gap, slot);
          return geometry.current;
        };
        let g = measure();
        const onRefreshInit = () => {
          g = measure();
        };
        ScrollTrigger.addEventListener("refreshInit", onRefreshInit);

        // Covered cards shrink from their top edge; every shrink ends when the last card lands.
        items.slice(0, -1).forEach((item, i) => {
          gsap.fromTo(
            item,
            { scale: 1, transformOrigin: "50% 0" },
            {
              scale: g.scale[i],
              ease: "none",
              scrollTrigger: { start: () => g.stick[i], end: () => g.end, scrub: true, invalidateOnRefresh: true },
            }
          );
        });

        // The landing: one squash and a damped settle, forwards only.
        items.forEach((_, i) => {
          ScrollTrigger.create({
            start: () => g.stick[i],
            onEnter: () => {
              gsap
                .timeline()
                .to(inners[i], { scaleX: 1.046, scaleY: 0.986, duration: 0.07, ease: "sine.out", overwrite: true })
                .to(inners[i], { scaleX: 1, scaleY: 1, duration: 0.9, ease: "elastic.out(1, 0.27)" });
            },
            onLeaveBack: () => gsap.set(inners[i], { scaleX: 1, scaleY: 1, overwrite: true }),
          });
        });

        // The eye blinks and looks around through the first card's reading
        // interval, from its rise into view until the second card covers it.
        const lid = section.querySelector<SVGElement>(".st-eye-lid");
        const gaze = section.querySelector<SVGElement>(".st-eye-gaze");
        if (lid && gaze && items.length > 1) {
          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: { start: () => g.stick[0] - window.innerHeight * 0.6, end: () => g.stick[1], scrub: 0.25, invalidateOnRefresh: true },
          });
          const blink = (at: number) => {
            tl.to(lid, { y: 0, duration: 0.03 }, at).to(lid, { y: -260, duration: 0.04 }, at + 0.03);
          };
          tl.set(lid, { y: -260 }, 0);
          blink(0.1);
          tl.to(gaze, { x: -18, y: 6, duration: 0.18 }, 0.16).to(gaze, { x: 18, y: 8, duration: 0.2 }, 0.34);
          blink(0.52);
          tl.to(gaze, { x: 0, y: 0, duration: 0.2 }, 0.6);
          blink(0.82);
          tl.to(lid, { y: -150, duration: 0.1 }, 0.9);
        }

        return () => {
          ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
          geometry.current = null;
        };
      });
      // The art on each card arrives as its card rises. In the deck the
      // timing comes from the measured geometry (sticky cards have no fixed
      // trigger position); in the plain column, from the card itself.
      mm.add(ART_ON, () => {
        const section = root.current!;
        const items = gsap.utils.toArray<HTMLElement>(".st-deck-item", section);
        const deck = () => window.matchMedia(DECK_ON).matches && geometry.current;
        const phone = () => window.matchMedia(PHONE).matches;
        // On a phone the drawing enters the screen late in its card's rise, so
        // the scrub starts as the drawing appears and runs a little past the
        // landing, while the next card is still below it: the whole assembly is seen.
        const phoneStart = (i: number, item: HTMLElement) => {
          const art = item.querySelector(".st-card-art");
          const slot = parseFloat(getComputedStyle(item).top) || 0;
          const scale = Number(gsap.getProperty(item, "scaleY")) || 1;
          const artTop = art ? (art.getBoundingClientRect().top - item.getBoundingClientRect().top) / scale : 0;
          return geometry.current!.stick[i] - Math.max(0, window.innerHeight - slot - artTop);
        };
        const span = (i: number, item: HTMLElement) => ({
          trigger: item,
          start: () => (deck() ? (phone() ? phoneStart(i, item) : geometry.current!.stick[i] - window.innerHeight * 0.85) : "top 92%"),
          end: () => (deck() ? geometry.current!.stick[i] + (phone() ? 40 : 0) : "top 35%"),
          scrub: 0.4,
          invalidateOnRefresh: true,
        });
        items.forEach((item, i) => {
          const tl = gsap.timeline({ defaults: { ease: "power2.out" }, scrollTrigger: span(i, item) });
          const open = item.querySelector<SVGGElement>(".st-art-open");
          if (open) {
            gsap.set(open, { svgOrigin: "0 0" });
            tl.fromTo(open, { scaleY: 0.06, opacity: 0.2 }, { scaleY: 1, opacity: 1, ease: "power3.out" });
          }
          const px = item.querySelectorAll<SVGRectElement>(".st-art-px");
          if (px.length) {
            tl.fromTo(
              px,
              { x: () => gsap.utils.random(-260, 60), y: () => gsap.utils.random(-120, 160), opacity: 0 },
              { x: 0, y: 0, opacity: 1, stagger: { each: 0.004, from: "random" }, duration: 0.6 },
              0
            ).fromTo(item.querySelector(".st-art-loose"), { opacity: 1 }, { opacity: 0.35, duration: 0.6 }, 0.2);
          }
          const a = item.querySelector(".st-art-a");
          if (a) {
            // The origin is set before the tween records its start, or GSAP compensates it into a translate.
            gsap.set(item.querySelector(".st-art-idea"), { svgOrigin: "160 44" });
            tl.fromTo(a, { x: -110, y: 70, opacity: 0 }, { x: 0, y: 0, opacity: 1 }, 0)
              .fromTo(item.querySelector(".st-art-b"), { x: 110, y: -70, opacity: 0 }, { x: 0, y: 0, opacity: 1 }, 0)
              .fromTo(item.querySelector(".st-art-idea"), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, ease: "back.out(2)", duration: 0.35 }, 0.7);
          }
        });

        // The lens beside the deck: from rest into one pose per card, each
        // reached as its card lands and held a moment before the next move.
        // In the plain column there is no landing, so the poses share the section.
        const parts = gsap.utils.toArray<SVGGElement>(".st-lens-part", section).map((el) => {
          const part = el.dataset.part as LensPart;
          return { el, part, v: lensVars(part, {}) };
        });
        if (parts.length) {
          const paint = () => parts.forEach(({ el, part, v }) => el.setAttribute("transform", lensTransform(part, v)));
          const g = deck() ? geometry.current! : null;
          const lead = () => window.innerHeight * 0.85;
          const marks = g ? [g.stick[0] - lead(), ...g.stick] : LENS_POSES.map((_, i) => i).concat(LENS_POSES.length);
          const span = marks[LENS_POSES.length] - marks[0] || 1;
          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            onUpdate: paint,
            scrollTrigger: g
              ? { start: () => geometry.current!.stick[0] - lead(), end: () => geometry.current!.end, scrub: 0.6, invalidateOnRefresh: true }
              : { trigger: section, start: "top 75%", end: "bottom 60%", scrub: 0.6, invalidateOnRefresh: true },
          });
          LENS_POSES.forEach((pose, i) => {
            const a = (marks[i] - marks[0]) / span;
            const b = (marks[i + 1] - marks[0]) / span;
            const from = i === 0 ? a : a + (b - a) * 0.25;
            parts.forEach(({ part, v }) => tl.to(v, { ...lensVars(part, pose), duration: b - from }, from));
          });
          paint();
        }
        return () => parts.forEach(({ el }) => el.removeAttribute("transform"));
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true }
  );

  /**
   * Keyboard focus entering a card brings it to the moment it lands: the one
   * position where the whole card, its action included, is the top card.
   * Before it, the card is still rising; after it, the next card rises over it.
   */
  const onFocus = (i: number) => (e: FocusEvent<HTMLLIElement>) => {
    const g = geometry.current;
    // Keyboard only: a pointer click also focuses the link and must never move the page under it.
    if (!g || !window.matchMedia(DECK_ON).matches || !(e.target as HTMLElement).matches(":focus-visible")) return;
    const y = scrollForCard(i, g.stick);
    if (Math.abs(window.scrollY - y) > 1) {
      window.scrollTo({ top: y, behavior: "instant" });
      (e.target as HTMLElement).focus({ preventScroll: true });
    }
  };

  /** Studio paths localize; the hash rides along. */
  const dest = (to: string) => {
    if (!to.startsWith("/")) return to;
    const [path, hash] = to.split("#");
    return p(path) + (hash ? `#${hash}` : "");
  };

  return (
    <section className="st-deck-section st-ink" ref={root} aria-labelledby="cards-h">
      <div className="st-deck-layout">
        <div className="st-deck-left">
          <h2 id="cards-h" className="st-deck-title">
            {h.cardsH}
          </h2>
          <div className="st-deck-art">
            <LensArt />
          </div>
        </div>
        <ol className="st-deck">
          {h.cards.map((card, i) => {
            const tone = TONE[card.id];
            const Art = ART[card.id];
            return (
              <li key={card.id} className={`st-deck-item st-deck-${tone}`} style={{ "--i": i } as CSSProperties} onFocus={onFocus(i)}>
                <article className="st-deck-card" aria-labelledby={`card-${card.id}`}>
                  <Art />
                  <h3 id={`card-${card.id}`} className={card.id === "create" ? "st-voice" : undefined}>
                    {card.h}
                  </h3>
                  <p>{card.p}</p>
                  <div className="st-deck-foot">
                    {card.id === "syn" && <BlinkEye className="st-deck-eye" title={h.eyeAlt} />}
                    {card.status && <span className="st-status">{card.status}</span>}
                    <CutLink to={dest(card.to)} paper={tone !== "citron"}>
                      {card.cta}
                    </CutLink>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
