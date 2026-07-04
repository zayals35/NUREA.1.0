// One-shot: extract the square N monogram symbol from the locked lockup PNG.
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const SRC = "D:/CLAUDE.OS/nurea.logo.version2.png";

const trimmed = await sharp(SRC).trim().toBuffer();
const m = await sharp(trimmed).metadata();
console.log("trimmed", m.width, m.height);

// Stacked lockup: symbol square on top, wordmark below. Top square = symbol.
const side = Math.min(m.width, m.height);
const buf = await sharp(trimmed)
  .extract({ left: Math.round((m.width - side) / 2), top: 0, width: side, height: side })
  .resize(160, 160, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .webp({ quality: 90 })
  .toBuffer();
await writeFile("public/nurea-symbol.webp", buf);
console.log("saved", (buf.length / 1024).toFixed(1), "KB");
