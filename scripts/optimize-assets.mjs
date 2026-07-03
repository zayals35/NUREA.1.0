// One-shot asset pipeline: pulls selected images from the old repo and
// re-exports everything as capped-size WebP into public/.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OLD = "D:/Projects/NUREA/under-surface-stones/public";
const OUT = new URL("../public", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

// [source, destination (relative to public/), max width, quality]
const JOBS = [
  [`${OLD}/nurealogo.png`, "nurea-mark.webp", 480, 90],

  [`${OLD}/work/art-metanoia.webp`, "work/art-metanoia.webp", 1200, 72],
  [`${OLD}/work/art-bilmekka.webp`, "work/art-bilmekka.webp", 1200, 72],
  [`${OLD}/work/art-moustach.webp`, "work/art-moustach.webp", 1200, 68],
  [`${OLD}/work/art-nue.webp`, "work/art-nue.webp", 1200, 72],
  [`${OLD}/work/moremarin/art-moremarin.webp`, "work/art-moremarin.webp", 1200, 68],

  [`${OLD}/work/metanoia/IMG_0533.JPG`, "work/metanoia/shot-1.webp", 1400, 70],
  [`${OLD}/work/metanoia/IMG_1853.JPG`, "work/metanoia/shot-2.webp", 1400, 70],
  [`${OLD}/work/metanoia/IMG_2753.JPEG`, "work/metanoia/shot-3.webp", 1400, 70],
  [`${OLD}/work/metanoia/metanoia-logo.webp`, "work/metanoia/logo.webp", 800, 78],

  [`${OLD}/work/bilmekka/phonehero.png`, "work/bilmekka/shot-1.webp", 1400, 70],
  [`${OLD}/work/bilmekka/businesscards1.png`, "work/bilmekka/shot-2.webp", 1400, 70],
  [`${OLD}/work/bilmekka/bilmekka.skilt.png`, "work/bilmekka/shot-3.webp", 1400, 70],

  [`${OLD}/work/moremarin/moremarin-hero.webp`, "work/moremarin/shot-1.webp", 1400, 70],
  [`${OLD}/work/moremarin/moremarin-crew.webp.png`, "work/moremarin/shot-2.webp", 1400, 70],
  [`${OLD}/work/moremarin/sjø.png`, "work/moremarin/shot-3.webp", 1400, 70],

  [`${OLD}/work/nue-cover.webp`, "work/nue/shot-1.webp", 1400, 72],
  [`${OLD}/work/nue-logo.webp`, "work/nue/logo.webp", 800, 78],

  [`${OLD}/work/tetter.gapet.backgroundimage.png`, "work/ribbon.webp", 1200, 66],
];

const MAX_KB = 200;

for (const [src, dest, width, quality] of JOBS) {
  const outPath = path.join(OUT, dest);
  await mkdir(path.dirname(outPath), { recursive: true });
  let q = quality;
  let buf;
  do {
    buf = await sharp(src)
      .rotate() // respect EXIF orientation
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: q, effort: 6 })
      .toBuffer();
    q -= 8;
  } while (buf.length > MAX_KB * 1024 && q > 30);
  const { writeFile } = await import("node:fs/promises");
  await writeFile(outPath, buf);
  console.log(`${dest}  ${(buf.length / 1024).toFixed(0)} KB`);
}
console.log("done");
