/**
 * Geometry of the homepage card deck, measured from elespacio.net on
 * 2026-09-29 and kept free of the DOM so it can be tested.
 *
 * The reference is a column of sticky cards. Card i sticks at
 * `slot + i * step` (112 + 18i px on desktop), so each covered card shows as
 * an 18 px coloured edge above the next. From the moment a card sticks until
 * the last card reaches its own slot, it shrinks linearly from its top edge
 * to 0.95 raised to the number of cards still to come (0.95, 0.9025,
 * 0.857 for four cards). The last card never sticks: the list ends with it,
 * so the deck folds into it and leaves as one. Reverse scrolling runs the
 * same values backwards because everything is a function of scroll position.
 */

export const DECK_STEP = 18;
export const DECK_SHRINK = 0.95;

export interface DeckGeometry {
  /** Document scroll position at which card i reaches its slot. */
  stick: number[];
  /** Scroll position at which the last card reaches its slot: every shrink ends here. */
  end: number;
  /** Final scale of card i once the last card has landed. */
  scale: number[];
}

/**
 * @param listTop document offset of the list's top edge
 * @param heights each card's height, in order
 * @param gap the space between cards in normal flow
 * @param slot where the first card sticks, from the top of the viewport
 */
export function deckGeometry(listTop: number, heights: number[], gap: number, slot: number, step = DECK_STEP): DeckGeometry {
  const n = heights.length;
  const stick: number[] = [];
  let natural = listTop;
  for (let i = 0; i < n; i++) {
    stick.push(natural - (slot + i * step));
    natural += heights[i] + gap;
  }
  const scale = heights.map((_, i) => Math.pow(DECK_SHRINK, n - 1 - i));
  return { stick, end: stick[n - 1] ?? listTop, scale };
}

/**
 * The card a visitor is reading at a scroll position: the last one that has
 * reached its slot, or the first before any has.
 */
export function activeCard(scrollY: number, stick: number[]): number {
  let active = 0;
  for (let i = 0; i < stick.length; i++) if (scrollY >= stick[i] - 0.5) active = i;
  return active;
}

/**
 * Where to scroll so card i is the top, fully visible card: the moment it
 * lands. Used when keyboard focus enters a card that another card covers.
 */
export function scrollForCard(i: number, stick: number[]): number {
  return Math.max(0, Math.ceil(stick[i]));
}

/** True when card i sits under a later card at this scroll position. */
export function isCovered(i: number, scrollY: number, stick: number[]): boolean {
  return i < stick.length - 1 && scrollY >= stick[i + 1] - 0.5;
}
