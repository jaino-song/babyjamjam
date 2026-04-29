import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'postpartum', path: '/postpartum-care' },
  { name: 'pricing', path: '/pricing' },
  { name: 'faq', path: '/faq' },
  { name: 'locations', path: '/locations' },
];

const WIDTHS = [1920, 1100, 780];
const BASE_URL = 'http://localhost:3001';
const OUT_DIR = 'baselines';

mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();

for (const width of WIDTHS) {
  const context = await browser.newContext({ viewport: { width, height: 1080 } });
  const page = await context.newPage();

  for (const { name, path } of PAGES) {
    console.log(`Capturing ${name} @ ${width}px...`);
    await page.goto(`${BASE_URL}${path}`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: `${OUT_DIR}/${name}-${width}.png`,
      fullPage: true,
    });
    console.log(`  Saved ${name}-${width}.png`);
  }

  await context.close();
}

await browser.close();
console.log('Done! All baselines captured.');
