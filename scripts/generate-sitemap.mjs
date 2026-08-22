/**
 * Genera public/sitemap.xml con las rutas estáticas + una entrada por especie
 * (obtenidas de la API). Si la API no está disponible, conserva el sitemap
 * existente y no falla el build.
 */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const SITE = 'https://especiesinvasoras.api-colombia.com';
const API = 'https://api-colombia.com/api/v1/InvasiveSpecie';

const STATIC = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/mapa', changefreq: 'weekly', priority: '0.8' },
  { loc: '/que-hacer', changefreq: 'monthly', priority: '0.7' },
  { loc: '/acerca', changefreq: 'monthly', priority: '0.5' },
];

function urlEntry({ loc, changefreq, priority, lastmod }) {
  return [
    '  <url>',
    `    <loc>${SITE}${loc}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    changefreq ? `    <changefreq>${changefreq}</changefreq>` : null,
    priority ? `    <priority>${priority}</priority>` : null,
    '  </url>',
  ]
    .filter(Boolean)
    .join('\n');
}

async function main() {
  const outPath = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'sitemap.xml');
  let entries = [...STATIC];

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const res = await fetch(API, { signal: controller.signal });
    clearTimeout(timeout);
    const data = await res.json();
    if (Array.isArray(data)) {
      const species = data
        .filter((s) => s && typeof s.id === 'number')
        .sort((a, b) => a.id - b.id)
        .map((s) => ({ loc: `/especie/${s.id}`, changefreq: 'monthly', priority: '0.6' }));
      entries = [...STATIC, ...species];
      console.log(`[sitemap] ${species.length} especies añadidas.`);
    }
  } catch (err) {
    console.warn(`[sitemap] No se pudo consultar la API (${err.message}); se conserva el sitemap actual.`);
    return; // no sobrescribir con solo rutas estáticas si falló la red
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(urlEntry),
    '</urlset>',
    '',
  ].join('\n');

  await writeFile(outPath, xml, 'utf8');
  console.log(`[sitemap] Escrito ${outPath} (${entries.length} URLs).`);
}

main();
