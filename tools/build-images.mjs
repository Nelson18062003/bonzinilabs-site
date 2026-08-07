/**
 * Rasterises the site's vector masters into the bitmap formats that crawlers
 * and legacy browsers still insist on.
 *
 *   node tools/build-images.mjs
 *
 * Produces:
 *   assets/img/og-image.png      1200x630  — social card (no crawler renders SVG)
 *   assets/img/apple-touch-icon.png  180x180
 *   favicon.ico                  32x32 + 16x16, PNG-in-ICO
 *
 * Chromium is used rather than a native SVG rasteriser because it resolves the
 * self-hosted Inter file exactly as the site does, so the card's wordmark is
 * metrically identical to the page. Requires Playwright; the generated files are
 * committed, so this only needs re-running when the artwork changes.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { execSync } from 'node:child_process';

/* Playwright may be installed locally or globally; ESM ignores NODE_PATH, so
   resolve it explicitly rather than assuming a local node_modules. */
async function loadPlaywright() {
  const require = createRequire(import.meta.url);
  try {
    return require('playwright');
  } catch {
    const globalRoot = execSync('npm root -g', { encoding: 'utf8' }).trim();
    return import(pathToFileURL(join(globalRoot, 'playwright', 'index.mjs')).href);
  }
}

const { chromium } = await loadPlaywright();

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const fontData = readFileSync(join(root, 'assets/fonts/inter-var-latin.woff2')).toString('base64');
const fontFace = `@font-face{font-family:Inter;src:url(data:font/woff2;base64,${fontData}) format('woff2');font-weight:100 900;font-display:block}`;

const mark = `
  <path d="M4 3H13L16 6V9L13 12H17L20 15V18L17 21H4Z"/>
  <path d="M4 12H13"/>
  <circle cx="9.5" cy="7.5" r="1.25" fill="url(#g)" stroke="none"/>
  <circle cx="10.5" cy="16.5" r="1.25" fill="url(#g)" stroke="none"/>`;

/* --- 1200x630 social card ------------------------------------------------- */
const ogHtml = `<!doctype html><meta charset="utf-8"><style>
${fontFace}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#08090A;font-family:Inter,sans-serif;
  position:relative;overflow:hidden;-webkit-font-smoothing:antialiased}
.glow-a{position:absolute;inset:0;background:radial-gradient(660px 660px at 210px 150px,
  rgba(110,139,255,.20),rgba(110,139,255,.05) 50%,transparent 70%)}
.glow-b{position:absolute;inset:0;background:radial-gradient(520px 520px at 1080px 610px,
  rgba(23,224,196,.14),rgba(23,224,196,.04) 50%,transparent 70%)}
.rule{position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,rgba(110,139,255,0) 0%,rgba(110,139,255,.85) 34%,
  rgba(23,224,196,.85) 66%,rgba(23,224,196,0) 100%)}
.inner{position:absolute;left:96px;top:140px;right:96px}
svg{width:96px;height:96px;display:block}
h1{margin-top:64px;font-size:84px;font-weight:600;letter-spacing:-.02em;color:#F4F7FB;line-height:1}
h1 span{color:#66768C;font-weight:400;margin-left:14px}
p{margin-top:22px;font-size:30px;font-weight:400;color:#96A5B8;letter-spacing:-.01em}
.divider{margin-top:52px;height:1px;background:rgba(255,255,255,.08)}
.meta{margin-top:28px;font-size:18px;font-weight:500;letter-spacing:.14em;color:#5E6E84}
</style>
<div class="glow-a"></div><div class="glow-b"></div><div class="rule"></div>
<div class="inner">
  <svg viewBox="0 0 24 24" fill="none" stroke="url(#g)" stroke-width="1.5"
       stroke-linecap="round" stroke-linejoin="round">
    <defs><linearGradient id="g" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#6E8BFF"/><stop offset="1" stop-color="#17E0C4"/>
    </linearGradient></defs>${mark}
  </svg>
  <h1>BONZINILABS<span>LTD</span></h1>
  <p>AI automation for business</p>
  <div class="divider"></div>
  <div class="meta">CUSTOM AI AGENTS &middot; CHATBOTS &middot; WHATSAPP BUSINESS API &middot; PROCESS AUTOMATION</div>
</div>`;

/* --- icon tile ------------------------------------------------------------
   The favicon keeps its rounded corners and transparency so it sits cleanly on
   a dark tab strip. The Apple touch icon must NOT: iOS applies its own mask and
   composites transparency to black, so that one is a full-bleed square.     -- */
const iconHtml = (size, { rounded = true } = {}) => `<!doctype html><meta charset="utf-8"><style>
*{margin:0;padding:0}html,body{width:${size}px;height:${size}px;background:transparent}
svg{display:block;width:${size}px;height:${size}px}</style>
<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="${rounded ? 7 : 0}" fill="#08090A"/>
  <path d="M8 7H19L22 10V12L19 15H8Z" fill="#6E8BFF"/>
  <path d="M8 17H21L24 20V22L21 25H8Z" fill="#6E8BFF"/>
</svg>`;

const browser = await chromium.launch();

async function shot(html, width, height, out) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(async () => {
    await Promise.all([
      document.fonts.load('600 84px Inter'),
      document.fonts.load('400 30px Inter'),
      document.fonts.load('500 18px Inter'),
    ]);
    await document.fonts.ready;
  });
  const buffer = await page.screenshot({ type: 'png', omitBackground: true });
  if (out) writeFileSync(join(root, out), buffer);
  await page.close();
  return buffer;
}

await shot(ogHtml, 1200, 630, 'assets/img/og-image.png');
await shot(iconHtml(180, { rounded: false }), 180, 180, 'assets/img/apple-touch-icon.png');
const png32 = await shot(iconHtml(32), 32, 32, null);
const png16 = await shot(iconHtml(16), 16, 16, null);
await browser.close();

/* --- favicon.ico ----------------------------------------------------------
   ICO is a directory of images; since Windows Vista an entry may hold a whole
   PNG file, which every current browser reads. Two entries: 32px then 16px. -- */
function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(entries.length, 4);

  let offset = 6 + entries.length * 16;
  const directory = [];
  for (const { size, data } of entries) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    directory.push(entry);
  }
  return Buffer.concat([header, ...directory, ...entries.map((e) => e.data)]);
}

writeFileSync(
  join(root, 'favicon.ico'),
  buildIco([
    { size: 32, data: png32 },
    { size: 16, data: png16 },
  ])
);

console.log('built: og-image.png, apple-touch-icon.png, favicon.ico');
