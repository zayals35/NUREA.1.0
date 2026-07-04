// One-shot: crop the lowercase-n wave mark (top portion) out of the stacked
// nurea-mark.webp, which pairs mark over "nurea" wordmark. We want mark only.
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const SRC = "public/nurea-mark.webp";
const trimmed = await sharp(SRC).trim().toBuffer();
const m = await sharp(trimmed).metadata();
console.log("trimmed", m.width, m.height);

// Stacked lockup: the "n" mark sits in the upper ~62%, the "nurea" wordmark below.
const markH = Math.round(m.height * 0.6);
const buf = await sharp(trimmed)
  .extract({ left: 0, top: 0, width: m.width, height: markH })
  .trim()
  .resize(200, 200, { fit: "inside", withoutEnlargement: false })
  .webp({ quality: 90 })
  .toBuffer();
await writeFile("public/nurea-n-mark.webp", buf);
console.log("saved", (buf.length / 1024).toFixed(1), "KB");
