/**
 * Rasterize tools/preview/og-image.svg → og-image.png (1200×630) for social previews.
 * Uses resvg-js (dev-only); run via `npm run og:image` before export/check.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PREVIEW = path.join(__dirname, 'preview');
const svgPath = path.join(PREVIEW, 'og-image.svg');
const pngPath = path.join(PREVIEW, 'og-image.png');

const svg = fs.readFileSync(svgPath, 'utf8');
const { Resvg } = await import('@resvg/resvg-js');
const resvg = new Resvg(svg, {
	fitTo: { mode: 'width', value: 1200 },
});
const png = resvg.render().asPng();
fs.writeFileSync(pngPath, png);
console.log(`Wrote ${path.relative(path.resolve(__dirname, '..'), pngPath)} (${png.length} bytes)`);
