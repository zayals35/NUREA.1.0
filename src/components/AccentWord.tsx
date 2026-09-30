/**
 * A line of type with one word (or short phrase) carrying the hero's citron
 * stroke, the r8 treatment carried onto the inner pages: ink fill on top, so
 * it stays readable on paper. Only the first match is stroked; no match
 * returns the plain text.
 */
export default function AccentWord({ text, word }: { text: string; word?: string }) {
  if (!word) return <>{text}</>;
  const at = text.indexOf(word);
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="stroke-citron">{word}</span>
      {text.slice(at + word.length)}
    </>
  );
}
