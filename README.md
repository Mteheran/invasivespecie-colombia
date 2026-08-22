# Especies invasoras de Colombia
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Portal web que visualiza las **especies invasoras de Colombia** (plantas y animales). Permite listar las especies, buscarlas y consultar información detallada como su nombre científico, nombres comunes, impacto en el ecosistema y el manejo recomendado para cada una.

Los datos se consumen en tiempo real desde [API Colombia](https://api-colombia.com).

🌐 **Sitio oficial:** https://especiesinvasoras.api-colombia.com/

## 🎯 Objetivo del proyecto

Con este proyecto queremos generar conciencia en las personas sobre cómo se deben manejar las especies invasoras y cómo estas afectan nuestros ecosistemas nativos.

## ✨ Características

- 🚦 **Nivel de riesgo como señal principal**: badge de riesgo (alto/medio/bajo) visible en cada tarjeta.
- 🧭 **Filtros y orden** por categoría (animal/planta), hábitat y riesgo, con el estado reflejado en la URL (compartible).
- 📋 Listado con carga progresiva (scroll infinito) y búsqueda por nombre con _debounce_.
- 🪪 **Ficha de especie como página propia** (`/especie/:id`): nivel de riesgo, nombres comunes, impacto, manejo, «cómo llegó», ficha rápida y mini-mapa.
- 🗺️ **Mapa de distribución** de Colombia (geometría real de Natural Earth con d3-geo + topojson), con leyenda-filtro por riesgo.
- 🆘 Bloque **«Si la encuentras»** con pasos concretos y flujo de reporte.
- 🌐 **Bilingüe ES/EN** (la interfaz se traduce; el contenido de la API se mantiene en español).
- 🖼️ Visor de imágenes a pantalla completa y compartir en WhatsApp, Facebook, X y LinkedIn.
- 📱 Diseño responsive (móvil, tablet y escritorio) y respeto por `prefers-reduced-motion`.

> ⚠️ **Datos de ejemplo:** la API de API Colombia solo expone `id, name, scientificName, commonNames, impact, manage, riskLevel, urlImage`. La categoría, el hábitat, el origen y las ubicaciones del mapa provienen de una tabla local de ejemplo (`src/data/`) marcada como **referencial/no oficial**; deben validarse con Invemar, el Instituto Humboldt o MinAmbiente antes de publicarse.

## 🧰 Tecnologías utilizadas

| Categoría        | Tecnología | Versión |
| ---------------- | ---------- | ------- |
| Framework UI     | [React](https://react.dev) | 19.2 |
| Build / dev tool | [Vite](https://vite.dev) | 7.3 |
| Lenguaje         | [TypeScript](https://www.typescriptlang.org) | 5.9 |
| Librería visual  | [Chakra UI](https://v2.chakra-ui.com) | 2.10 (v2) |
| Animaciones      | [Framer Motion](https://www.framer.com/motion/) | 11.18 |
| Estilado         | [Emotion](https://emotion.sh) | 11.14 |
| Enrutamiento     | [React Router](https://reactrouter.com) | 7.18 |
| Mapa             | [d3](https://d3js.org) · [topojson-client](https://github.com/topojson/topojson-client) (Natural Earth) | 7.9 · 3.1 |
| Iconos           | [React Icons](https://react-icons.github.io/react-icons/) | 5.7 |
| Testing          | [Vitest](https://vitest.dev) · [Testing Library](https://testing-library.com) | 3.2 · 16.3 |
| Linter           | [ESLint](https://eslint.org) | 9.39 |
| API (backend)    | [API Colombia](https://api-colombia.com) | v1 |
| Hosting          | Azure | — |

> Las versiones reflejan las instaladas actualmente; consulta [`package.json`](package.json) para los rangos exactos. `d3` y `topojson-client` se cargan por CDN (pineados con `integrity` en [`index.html`](index.html)).

## 🚀 Puesta en marcha

### Requisitos previos

- [Node.js](https://nodejs.org) **>= 20.19** (recomendado LTS 20 o superior)
- npm (incluido con Node.js)

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/Mteheran/invasivespecie-colombia.git
cd invasivespecie-colombia

# 2. Instalar dependencias
npm install

# 3. Iniciar el entorno de desarrollo
npm run dev
```

La aplicación quedará disponible en `http://localhost:3000`.

### Scripts disponibles

| Script             | Descripción |
| ------------------ | ----------- |
| `npm run dev`      | Inicia el servidor de desarrollo de Vite con recarga en caliente. |
| `npm run build`    | Genera el `sitemap.xml` (`prebuild`), verifica los tipos (`tsc`) y genera la build de producción en `build/`. |
| `npm run preview`  | Sirve localmente la build de producción para previsualizarla. |
| `npm run sitemap`  | Regenera `public/sitemap.xml` con las rutas estáticas + una entrada por especie (desde la API). |
| `npm test`         | Ejecuta la suite de pruebas con Vitest. |
| `npm run test:watch` | Ejecuta las pruebas en modo interactivo (watch). |
| `npm run lint`     | Analiza el código con ESLint. |

### 🔍 SEO

- Metadatos por página (`<title>`, `description`, canonical, **Open Graph** y **Twitter Cards**) gestionados por [`Seo`](src/components/seo/Seo.tsx), que se actualizan en cada cambio de ruta e idioma.
- Metadatos por defecto y **datos estructurados** (JSON-LD `WebSite` con `SearchAction` + `Organization`) en [`index.html`](index.html).
- [`robots.txt`](public/robots.txt) con referencia al sitemap y [`sitemap.xml`](public/sitemap.xml) generado en cada build (rutas estáticas + fichas de especies).

## 🗂️ Estructura del proyecto

```
src/
├── components/     # Componentes reutilizables (navBar, card, filterBar, riskBadge,
│                   #   colombiaMap, ifYouFind, modales…)
├── data/           # Tablas locales de ejemplo (speciesExtra, occurrences) — referenciales
├── hooks/          # Hooks de datos (useSpecies con caché)
├── i18n/           # Traducciones ES/EN y proveedor de idioma
├── pages/          # Páginas por ruta (home, especie, mapa, queHacer, acerca, layout)
├── services/       # Llamadas a la API de especies invasoras + enriquecimiento
├── theme/          # Tema de Chakra UI (colores, tipografía, componentes)
├── utils/          # Filtros/orden, riesgo, funciones, constantes e imágenes
└── index.tsx       # Punto de entrada de la aplicación
```

### Rutas

| Ruta | Descripción |
| ---- | ----------- |
| `/` | Home: hero, buscador, filtros y rejilla de especies |
| `/especie/:id` | Ficha completa de una especie (los enlaces antiguos `/?id=` redirigen aquí) |
| `/mapa` | Mapa de distribución por región |
| `/que-hacer` | Guía «Si la encuentras» y reporte de avistamientos |
| `/acerca` | Información del proyecto |

## 📦 Despliegue

El comando `npm run build` genera los archivos estáticos en la carpeta `build/`, listos para publicarse en cualquier hosting de sitios estáticos (Azure Static Web Apps, Netlify, Vercel, GitHub Pages, etc.).

## 🤝 Aportes

Estamos felices de que quieras ayudar a que este proyecto crezca. Por favor crea un _issue_ en GitHub con tus comentarios, ya sean errores detectados, mejoras, sugerencias o datos que podamos agregar.

Si deseas donar para que nuestro proyecto siga adelante: https://github.com/sponsors/Mteheran

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://mteheran.dev/"><img src="https://avatars.githubusercontent.com/u/3578356?v=4?s=100" width="100px;" alt="Miguel Teheran"/><br /><sub><b>Miguel Teheran</b></sub></a><br /><a href="https://github.com/mteheran/invasivespecie-colombia/commits?author=Mteheran" title="Documentation">📖</a> <a href="https://github.com/mteheran/invasivespecie-colombia/commits?author=Mteheran" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/JuanRCifuentes"><img src="https://avatars.githubusercontent.com/u/42916798?v=4?s=100" width="100px;" alt="Juan R. Cifuentes"/><br /><sub><b>Juan R. Cifuentes</b></sub></a><br /><a href="https://github.com/mteheran/invasivespecie-colombia/commits?author=JuanRCifuentes" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/TeckSergio"><img src="https://avatars.githubusercontent.com/u/106503617?v=4?s=100" width="100px;" alt="TeckSergio"/><br /><sub><b>TeckSergio</b></sub></a><br /><a href="https://github.com/mteheran/invasivespecie-colombia/commits?author=TeckSergio" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/MateoLeon44"><img src="https://avatars.githubusercontent.com/u/30735098?v=4?s=100" width="100px;" alt="MateoLeon44"/><br /><sub><b>MateoLeon44</b></sub></a><br /><a href="https://github.com/mteheran/invasivespecie-colombia/commits?author=MateoLeon44" title="Code">💻</a></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td align="center" size="13px" colspan="7">
        <img src="https://raw.githubusercontent.com/all-contributors/all-contributors-cli/1b8533af435da9854653492b1327a23a4dbd0a10/assets/logo-small.svg">
          <a href="https://all-contributors.js.org/docs/en/bot/usage">Add your contributions</a>
        </img>
      </td>
    </tr>
  </tfoot>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!