import { Helmet } from "react-helmet-async";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import type { JSX } from "react";
import { registerSSRMetadata } from "../ssr-metadata";

/**
 * ============================================================================
 *  <SEO /> — Type-safe, route-aware SEO engine (react-helmet-async)
 * ============================================================================
 *
 *  Canonical URL normalization rules (enforced in `normalizeCanonical`):
 *    1. Absolute URLs only — always prefixed with the production origin.
 *    2. Case invariance — entire URL forced to lowercase (paths + host).
 *       NOTE: This is safe for this portfolio because no route uses
 *       case-sensitive path segments. If case-sensitive paths are added
 *       later, scope the lowercasing to the host only.
 *    3. Query parameter stripping — all `?...` removed (no tracking params
 *       like utm_*, fbclid, gclid ever leak into canonical or og:url).
 *    4. Trailing slash consistency — architecture standard is NO trailing
 *       slash. A single trailing slash (other than the root "/") is stripped.
 *       Root path stays as the bare origin.
 *
 *  Tag deduplication (FIX for the post-hydration duplicate-metadata bug):
 *    The architecture is:
 *      - SSR registry → prerender script → static <head> tags
 *        (serves Googlebot and the initial browser paint).
 *      - <Helmet> → react-helmet-async v3 → React19Dispatcher → React 19
 *        native hoisting → updates <head> on client-side navigation.
 *
 *    react-helmet-async@3 + React 19 does NOT deduplicate against existing
 *    <head> tags. So if <Helmet> renders on the initial hydration pass, it
 *    creates a second full set of <title>/<meta>/<link>/<script> tags
 *    alongside the prerendered set — verified duplicates in DevTools.
 *
 *    Fix: render <Helmet> ONLY when this <SEO /> instance is mounted as a
 *    result of a client-side navigation (not the initial hydration). The
 *    `useIsInitialLoad()` hook below returns `true` for the very first
 *    render of <SEO /> in the page lifecycle, and `false` thereafter.
 *
 *    Additionally, when <Helmet> does render (on client nav), we strip
 *    every prerendered tag (marked with `data-prerendered`) from <head>
 *    so they don't accumulate. This keeps the live DOM clean even after
 *    multiple client-side route changes.
 *
 *  JSON-LD URL consistency:
 *    All JSON-LD `url` fields use the exact same form as the canonical URL
 *    (no trailing slash on the homepage, lowercase, absolute) so Google's
 *    entity binder can match the JSON-LD `@id`/`url` to the canonical URL.
 * ============================================================================
 */

// ----------------------------------------------------------------------------
//  Types
// ----------------------------------------------------------------------------

const SITE_ORIGIN = "https://nirvikdhungana.com.np";
const DEFAULT_OG_IMAGE =
  "https://res.cloudinary.com/dxt7szquk/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/v1782074268/og-image_ocdhpu.png";
const TWITTER_HANDLE = "@Dhungana_Nirvik";
const FB_APP_ID = "1574476827372709";
const BRAND_SUFFIX = "Nirvik Dhungana";

/** Robots directive — callers can override the default `index, follow`. */
export type RobotsDirective =
  | "index, follow, max-image-preview:large"
  | "noindex, nofollow"
  | "index, follow"
  | "noindex, follow"
  | string;

/** Open Graph type — `website` for landing pages, `article` for posts. */
export type OgType = "website" | "article" | "profile";

/**
 * A single JSON-LD block. Typed as `Record<string, unknown>` so callers can
 * pass any schema.org object without us needing a dependency on a JSON-LD
 * type library. The component serializes via `JSON.stringify`, which is
 * safe against script injection because JSON has no `<` or `>` in its
 * value space (and `JSON.stringify` escapes them where they appear in
 * strings).
 */
export type JsonLdBlock = Record<string, unknown>;

export interface SEOProps {
  /** Page-specific title. The brand suffix is appended automatically. */
  title: string;
  /**
   * Page-specific description. Must be 120–160 characters for SERP display.
   * Falls back to the portfolio default if omitted.
   */
  description?: string;
  /**
   * Path relative to the site origin (e.g. `/projects/pyrope`).
   * The component normalizes this into an absolute, lowercase,
   * query-stripped, no-trailing-slash canonical URL.
   * For the homepage, pass `/` or omit.
   */
  path?: string;
  /** Open Graph type. Defaults to `website`. */
  ogType?: OgType;
  /**
   * Absolute URL to the OG/Twitter share image. Must be absolute (https://).
   * Falls back to the portfolio default Cloudinary OG image.
   */
  ogImage?: string;
  /** Alt text for the share image — used by both OG and Twitter. */
  ogImageAlt?: string;
  /** Robots directive. Defaults to `index, follow, max-image-preview:large`. */
  robots?: RobotsDirective;
  /**
   * Optional publication/modified timestamps. Only emitted when `ogType`
   * is `article` (as `article:published_time` / `article:modified_time`).
   * ISO 8601 form, e.g. "2026-07-04T00:00:00+05:45".
   */
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  /** One or more JSON-LD blocks to inject as structured data. */
  jsonLd?: JsonLdBlock | JsonLdBlock[];
}

// ----------------------------------------------------------------------------
//  Canonical normalization
// ----------------------------------------------------------------------------

/**
 * Normalize a relative path into a production-ready absolute canonical URL.
 *
 * Pipeline:
 *   1. Default to root if no path given.
 *   2. Strip any `?query=...` suffix.
 *   3. Strip any URL fragment (`#...`).
 *   4. Lowercase the entire URL (host + path). Safe for this portfolio.
 *   5. Remove trailing slash — EXCEPT for the bare root origin.
 *   6. Prefix with the absolute origin.
 *
 * Examples:
 *   normalizeCanonical("/")                          → "https://nirvikdhungana.com.np"
 *   normalizeCanonical("/projects/pyrope")           → "https://nirvikdhungana.com.np/projects/pyrope"
 *   normalizeCanonical("/Projects/Pyrope/")          → "https://nirvikdhungana.com.np/projects/pyrope"
 *   normalizeCanonical("/projects/pyrope?utm_source=tw") → "https://nirvikdhungana.com.np/projects/pyrope"
 */
function normalizeCanonical(path?: string): string {
  let p = (path ?? "/").trim();

  // 1. Strip query string
  const queryIdx = p.indexOf("?");
  if (queryIdx !== -1) p = p.slice(0, queryIdx);

  // 2. Strip fragment
  const hashIdx = p.indexOf("#");
  if (hashIdx !== -1) p = p.slice(0, hashIdx);

  // 3. Ensure leading slash
  if (!p.startsWith("/")) p = "/" + p;

  // 4. Remove trailing slash — except for root "/"
  if (p.length > 1 && p.endsWith("/")) {
    p = p.replace(/\/+$/, "");
  }

  // 5. Lowercase the path (host is already lowercase in SITE_ORIGIN)
  p = p.toLowerCase();

  // 6. Join with origin (origin has no trailing slash)
  return `${SITE_ORIGIN}${p === "/" ? "" : p}`;
}

// ----------------------------------------------------------------------------
//  Default fallbacks (harvested from the original index.html)
// ----------------------------------------------------------------------------

const DEFAULT_DESCRIPTION =
  "Portfolio of Nirvik Dhungana — a frontend developer building accessible, responsive interfaces with React, TypeScript, and Tailwind CSS.";

// ----------------------------------------------------------------------------
//  Title helper — appends brand suffix, enforces 60-char limit
// ----------------------------------------------------------------------------

/**
 * Build the final <title>. Format: "{pageTitle} — {BRAND_SUFFIX}".
 * If the combined string exceeds 60 chars (SERP truncation threshold),
 * the page title is truncated and an ellipsis is inserted before the suffix.
 */
function buildTitle(pageTitle: string): string {
  const suffix = ` — ${BRAND_SUFFIX}`;
  const maxPageLen = 60 - suffix.length;
  if (pageTitle.length > maxPageLen) {
    return `${pageTitle.slice(0, maxPageLen - 1)}…${suffix}`;
  }
  return `${pageTitle}${suffix}`;
}

// ----------------------------------------------------------------------------
//  useIsInitialLoad — true only for the first <SEO /> render in the page
//  lifecycle. Used to suppress <Helmet> on initial hydration (the prerender
//  script already injected the correct tags into the static <head>).
// ----------------------------------------------------------------------------

function useIsInitialLoad(): boolean {
  // `useState(true)` initial value is set during the first render (both on
  // the server and on the client's first hydration render). The value is
  // flipped to `false` in a useEffect, which only runs on the client AFTER
  // hydration completes. So:
  //   - SSR (renderToString):        isInitialLoad = true  → Helmet skipped
  //   - Client initial hydration:    isInitialLoad = true  → Helmet skipped
  //   - Client after mount:          isInitialLoad = false → Helmet active
  //   - Client-side route change:    new <SEO /> mounts with isInitialLoad=false
  //                                  → Helmet active immediately
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  useEffect(() => {
    setIsInitialLoad(false);
  }, []);
  return isInitialLoad;
}

// ----------------------------------------------------------------------------
//  stripPrerenderedHeadTags — removes every [data-prerendered] tag from
//  <head>. Called from a useEffect before <Helmet> renders new tags on a
//  client-side navigation, so the prerendered set for the previous route
//  doesn't linger alongside the new Helmet-rendered set.
// ----------------------------------------------------------------------------

function stripPrerenderedHeadTags(): void {
  if (typeof document === "undefined") return;
  const stale = document.head.querySelectorAll("[data-prerendered]");
  stale.forEach((node) => node.parentNode?.removeChild(node));
}

// ----------------------------------------------------------------------------
//  Component
// ----------------------------------------------------------------------------

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = "Nirvik Dhungana — Frontend Developer portfolio preview",
  robots = "index, follow, max-image-preview:large",
  articlePublishedTime,
  articleModifiedTime,
  jsonLd,
}: SEOProps): JSX.Element {
  const canonicalUrl = normalizeCanonical(path);
  const finalTitle = buildTitle(title);
  const isInitialLoad = useIsInitialLoad();
  const location = useLocation();
  // Track whether we've already stripped the prerendered tags for THIS
  // component instance. Prevents redundant DOM walks on re-renders.
  const strippedRef = useRef(false);

  // Normalize jsonLd into an array for uniform rendering.
  const jsonLdBlocks: JsonLdBlock[] = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  // SSR-only: register the metadata so the prerender script can extract it
  // and inject it into the static HTML <head>. This is a no-op on the client
  // (registerSSRMetadata is only called during renderToString). On the client,
  // the <Helmet> below handles head tag injection via react-helmet-async.
  if (typeof window === "undefined") {
    registerSSRMetadata({
      title: finalTitle,
      description,
      canonical: canonicalUrl,
      robots,
      ogType,
      ogImage,
      ogImageAlt,
      articlePublishedTime,
      articleModifiedTime,
      jsonLd: jsonLdBlocks,
    });
  }

  // Client-side: when this <SEO /> is mounted as a result of a client-side
  // navigation (i.e. NOT the initial hydration), strip the prerendered
  // <head> tags so they don't duplicate with the <Helmet> tags below.
  useEffect(() => {
    if (!isInitialLoad && !strippedRef.current) {
      stripPrerenderedHeadTags();
      strippedRef.current = true;
    }
  }, [isInitialLoad, location.pathname]);

  // On the initial hydration, the prerender script has already injected the
  // exact same tags into the static <head>. Rendering <Helmet> here would
  // cause react-helmet-async v3 + React 19's native hoisting to append a
  // second full set of tags → duplicates in the live DOM. So we skip Helmet
  // entirely on the initial load.
  if (isInitialLoad) {
    return <></>;
  }

  const isArticle = ogType === "article";

  return (
    <Helmet prioritizeSeoTags>
      {/* --- Standard HTML --- */}
      <title key="title">{finalTitle}</title>
      <meta name="description" key="description" content={description} />
      <meta name="robots" key="robots" content={robots} />
      <meta name="author" key="author" content="Nirvik Dhungana" />
      <link rel="canonical" key="canonical" href={canonicalUrl} />

      {/* --- Open Graph (Facebook / LinkedIn / etc.) --- */}
      <meta property="og:site_name" key="og:site_name" content={BRAND_SUFFIX} />
      <meta property="og:url" key="og:url" content={canonicalUrl} />
      <meta property="og:type" key="og:type" content={ogType} />
      <meta property="og:locale" key="og:locale" content="en_US" />
      <meta property="og:title" key="og:title" content={finalTitle} />
      <meta property="og:description" key="og:description" content={description} />
      <meta property="og:image" key="og:image" content={ogImage} />
      <meta property="og:image:type" key="og:image:type" content="image/png" />
      <meta property="og:image:width" key="og:image:width" content="1200" />
      <meta property="og:image:height" key="og:image:height" content="630" />
      <meta property="og:image:alt" key="og:image:alt" content={ogImageAlt} />
      <meta property="fb:app_id" key="fb:app_id" content={FB_APP_ID} />

      {/* --- Article-specific OG (only when ogType === "article") --- */}
      {isArticle && articlePublishedTime && (
        <meta
          property="article:published_time"
          key="article:published_time"
          content={articlePublishedTime}
        />
      )}
      {isArticle && articleModifiedTime && (
        <meta
          property="article:modified_time"
          key="article:modified_time"
          content={articleModifiedTime}
        />
      )}

      {/* --- Twitter Cards --- */}
      <meta name="twitter:card" key="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" key="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" key="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:domain" key="twitter:domain" content="nirvikdhungana.com.np" />
      <meta name="twitter:url" key="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" key="twitter:title" content={finalTitle} />
      <meta name="twitter:description" key="twitter:description" content={description} />
      <meta name="twitter:image" key="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" key="twitter:image:alt" content={ogImageAlt} />

      {/* --- Structured Data (JSON-LD) --- */}
      {jsonLdBlocks.map((block, idx) => (
        <script
          type="application/ld+json"
          key={`jsonld-${idx}`}
          // JSON.stringify escapes <, >, & inside string values, preventing
          // XSS via script injection. Safe to inject via dangerouslySetInnerHTML.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </Helmet>
  );
}

export default SEO;

// ----------------------------------------------------------------------------
//  JSON-LD factory helpers — reusable structured-data blocks
// ----------------------------------------------------------------------------

/**
 * The Person entity for the site owner. Used on every route.
 *
 * NOTE: `url` deliberately has NO trailing slash so it exactly matches the
 * homepage canonical URL (`https://nirvikdhungana.com.np`). Google's JSON-LD
 * binder matches `url` against the canonical URL, so consistency matters.
 */
export const PERSON_JSONLD: JsonLdBlock = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://nirvikdhungana.com.np/#person",
  name: "Nirvik Dhungana",
  image:
    "https://res.cloudinary.com/dxt7szquk/image/upload/f_auto,q_auto/v1762424795/pfp_yggogi.png",
  url: "https://nirvikdhungana.com.np",
  jobTitle: "Frontend Developer",
  email: "mailto:info.nirvik.dh@gmail.com",
  sameAs: [
    "https://github.com/nirvik-dhungana",
    "https://www.linkedin.com/in/nirvik-dhungana/",
    "https://x.com/Dhungana_Nirvik",
    "https://gitlab.com/nirvik.dhungana",
    "https://leetcode.com/u/nirvik-dhungana/",
    "https://www.freecodecamp.org/nirvik-dhungana",
    "https://ratings.fide.com/profile/12359149",
  ],
  knowsAbout: [
    "Frontend Development",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Accessible Web Design",
    "Web Performance",
    "Chess",
  ],
};

/** The WebSite entity. isPartOf back-reference for sub-pages. */
export const WEBSITE_JSONLD: JsonLdBlock = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://nirvikdhungana.com.np/#website",
  name: "Nirvik Dhungana",
  url: "https://nirvikdhungana.com.np",
  description: DEFAULT_DESCRIPTION,
  inLanguage: "en",
  publisher: { "@id": "https://nirvikdhungana.com.np/#person" },
};

/** ProfilePage for the homepage. */
export const PROFILE_PAGE_JSONLD: JsonLdBlock = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://nirvikdhungana.com.np/#profilepage",
  url: "https://nirvikdhungana.com.np",
  dateCreated: "2026-06-22T00:00:00+05:45",
  dateModified: "2026-07-04T00:00:00+05:45",
  isPartOf: { "@id": "https://nirvikdhungana.com.np/#website" },
  mainEntity: { "@id": "https://nirvikdhungana.com.np/#person" },
};

/** BreadcrumbList factory — connect sub-pages back to the site hierarchy. */
export function breadcrumbJsonLd(
  crumbs: Array<{ name: string; url: string }>,
): JsonLdBlock {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}
