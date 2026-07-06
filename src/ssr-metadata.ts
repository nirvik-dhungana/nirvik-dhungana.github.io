/**
 * SSR metadata registry — a build-time-only mechanism for the prerender
 * script to extract SEO metadata from the <SEO /> component during SSR.
 *
 * Why this exists:
 *   react-helmet-async v3 + React 19 does NOT support SSR head extraction
 *   (the React19Dispatcher uses componentDidMount + document, which don't
 *   fire during renderToString). So we can't rely on helmet's context.helmet.
 *
 *   Instead, the <SEO /> component calls registerSSRMetadata() during render.
 *   This is a side-effect during render (normally discouraged), but it's
 *   safe here because:
 *     1. This only runs during SSR (the prerender script), never on the client.
 *     2. The registry is cleared before each route render.
 *     3. We read the registry immediately after renderToString returns.
 *
 *   The <SEO /> component still uses <Helmet> for client-side navigation
 *   (so route changes update the head tags dynamically). This registry is
 *   a parallel SSR-only extraction path.
 */

import type { JSX } from "react";

export interface SSRMetadata {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogType: string;
  ogImage: string;
  ogImageAlt: string;
  jsonLd: Array<Record<string, unknown>>;
}

// Global registry — reset before each route render.
let currentMetadata: SSRMetadata | null = null;

/** Reset the registry. Called before each route render in the prerender script. */
export function resetSSRMetadata(): void {
  currentMetadata = null;
}

/** Called by the <SEO /> component during render to register its metadata. */
export function registerSSRMetadata(meta: SSRMetadata): void {
  currentMetadata = meta;
}

/** Read the registered metadata. Called after renderToString returns. */
export function getSSRMetadata(): SSRMetadata | null {
  return currentMetadata;
}

/**
 * Build the complete <head> HTML string from the registered metadata.
 * This produces the exact same tags that <Helmet> would produce on the
 * client, ensuring consistency between prerendered and client-rendered pages.
 */
export function renderMetadataToHeadHtml(meta: SSRMetadata): string {
  const tags: string[] = [];

  tags.push(`<title>${escapeHtml(meta.title)}</title>`);
  tags.push(
    `<meta name="description" content="${escapeHtml(meta.description)}"/>`,
  );
  tags.push(`<meta name="robots" content="${escapeHtml(meta.robots)}"/>`);
  tags.push(`<meta name="author" content="Nirvik Dhungana"/>`);
  tags.push(`<link rel="canonical" href="${escapeHtml(meta.canonical)}"/>`);

  // Open Graph
  tags.push(`<meta property="og:site_name" content="Nirvik Dhungana"/>`);
  tags.push(`<meta property="og:url" content="${escapeHtml(meta.canonical)}"/>`);
  tags.push(`<meta property="og:type" content="${escapeHtml(meta.ogType)}"/>`);
  tags.push(`<meta property="og:locale" content="en_US"/>`);
  tags.push(`<meta property="og:title" content="${escapeHtml(meta.title)}"/>`);
  tags.push(
    `<meta property="og:description" content="${escapeHtml(meta.description)}"/>`,
  );
  tags.push(`<meta property="og:image" content="${escapeHtml(meta.ogImage)}"/>`);
  tags.push(`<meta property="og:image:type" content="image/png"/>`);
  tags.push(`<meta property="og:image:width" content="1200"/>`);
  tags.push(`<meta property="og:image:height" content="630"/>`);
  tags.push(
    `<meta property="og:image:alt" content="${escapeHtml(meta.ogImageAlt)}"/>`,
  );
  tags.push(`<meta property="fb:app_id" content="1574476827372709"/>`);

  // Twitter
  tags.push(
    `<meta name="twitter:card" content="summary_large_image"/>`,
  );
  tags.push(`<meta name="twitter:site" content="@Dhungana_Nirvik"/>`);
  tags.push(`<meta name="twitter:creator" content="@Dhungana_Nirvik"/>`);
  tags.push(
    `<meta name="twitter:domain" content="nirvikdhungana.com.np"/>`,
  );
  tags.push(
    `<meta name="twitter:url" content="${escapeHtml(meta.canonical)}"/>`,
  );
  tags.push(
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}"/>`,
  );
  tags.push(
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}"/>`,
  );
  tags.push(
    `<meta name="twitter:image" content="${escapeHtml(meta.ogImage)}"/>`,
  );
  tags.push(
    `<meta name="twitter:image:alt" content="${escapeHtml(meta.ogImageAlt)}"/>`,
  );

  // JSON-LD
  for (const block of meta.jsonLd) {
    tags.push(
      `<script type="application/ld+json">${JSON.stringify(block)}</script>`,
    );
  }

  return tags.join("\n        ");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Re-export JSX type for the SEO component
export type { JSX };
