import { useEffect } from "react";
import { useLang } from "../../i18n/lang";
import { SITE_URL } from "../../utils/constants";

interface SeoProps {
  title: string;
  description: string;
  /** Ruta canónica (p. ej. "/mapa"). Por defecto la ruta actual. */
  path?: string;
  /** Imagen social absoluta o relativa a la raíz del sitio. */
  image?: string;
  type?: "website" | "article";
}

function upsertMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Gestiona los metadatos de SEO de cada página de forma imperativa
 * (título, descripción, canonical, Open Graph y Twitter Cards).
 */
export default function Seo({ title, description, path, image, type = "website" }: SeoProps) {
  const { lang } = useLang();

  useEffect(() => {
    const url = SITE_URL + (path ?? window.location.pathname);
    const img = image
      ? image.startsWith("http")
        ? image
        : SITE_URL + image
      : `${SITE_URL}/logo512.png`;

    document.title = title;
    document.documentElement.lang = lang;

    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertLink("canonical", url);

    // Open Graph
    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:type"]', "property", "og:type", type);
    upsertMeta('meta[property="og:url"]', "property", "og:url", url);
    upsertMeta('meta[property="og:image"]', "property", "og:image", img);
    upsertMeta('meta[property="og:site_name"]', "property", "og:site_name", "Especies Invasoras de Colombia");
    upsertMeta('meta[property="og:locale"]', "property", "og:locale", lang === "en" ? "en_US" : "es_CO");

    // Twitter
    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", img);
  }, [title, description, path, image, type, lang]);

  return null;
}
