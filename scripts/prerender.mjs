/**
 * Prerender script — runs AFTER `vite build` to generate static HTML
 * for each route.
 *
 * Pipeline:
 *   1. Build the SSR bundle (src/entry-server.tsx → dist/server/entry.mjs)
 *      using Vite's SSR build mode. This produces a proper ESM bundle
 *      with all dependencies (react, react-dom, react-router-dom, etc.)
 *      resolved and bundled — no runtime CommonJS/ESM interop issues.
 *   2. Import the built SSR bundle dynamically.
 *   3. For each route in PRERENDER_ROUTES:
 *      a. Call render(url) → get HTML string + helmet head tags
 *      b. Inject the helmet head tags into the <head>
 *      c. Inject the rendered HTML into <div id="root">
 *      d. Write the final HTML to dist/{path}/index.html
 *   4. Clean up the SSR bundle (it's not needed for deployment).
 *
 * Usage: node scripts/prerender.mjs
 */

import { build } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const serverDir = path.join(distDir, "server");

async function main() {
  console.log("🎭 Prerendering static HTML...");

  // 1. Verify the client build exists
  const templatePath = path.join(distDir, "index.html");
  if (!fs.existsSync(templatePath)) {
    console.error("✗ dist/index.html not found. Run `vite build` first.");
    process.exit(1);
  }
  const template = fs.readFileSync(templatePath, "utf-8");

  // 2. Build the SSR bundle
  console.log("   Building SSR bundle...");
  await build({
    root,
    mode: "production",
    build: {
      ssr: true,
      outDir: serverDir,
      rollupOptions: {
        input: path.resolve(root, "src/entry-server.tsx"),
        output: {
          format: "es",
          entryFileNames: "entry.mjs",
        },
      },
      minify: false,
      emptyOutDir: false,
    },
    logLevel: "error",
  });

  // 3. Import the built SSR bundle
  const serverEntryPath = path.join(serverDir, "entry.mjs");
  const serverUrl = new URL(`file://${serverEntryPath}`).href;
  const mod = await import(serverUrl);
  const { render, PRERENDER_ROUTES } = mod;

  if (typeof render !== "function") {
    console.error("✗ entry-server.tsx did not export a `render` function.");
    process.exit(1);
  }

  const routes = PRERENDER_ROUTES ?? ["/"];
  console.log(`   Rendering ${routes.length} route(s): ${routes.join(", ")}`);

  // 4. Render each route
  for (const route of routes) {
    const { html, headHtml } = render(route);

    // 5. Build the final HTML
    let finalHtml = template;

    // --- Strip ALL fallback SEO tags from the template's <head> ---
    // The template (index.html) ships a minimal fallback set of SEO tags
    // (title, description, robots, author) so that the SPA 404 route still
    // has something. For prerendered routes, the SSR metadata registry
    // produces the canonical set, and we must remove the fallbacks to
    // avoid duplicates in the static HTML Googlebot receives.
    //
    // We strip in this order: title, description, robots, author. Each
    // regex tolerates multi-line attribute layout, single/double quotes,
    // and self-closing or non-self-closing forms.
    finalHtml = finalHtml.replace(/<title>[^<]*<\/title>\s*/g, "");
    finalHtml = finalHtml.replace(
      /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>\s*/g,
      "",
    );
    finalHtml = finalHtml.replace(
      /<meta\s+name=["']robots["']\s+content=["'][^"']*["']\s*\/?>\s*/g,
      "",
    );
    finalHtml = finalHtml.replace(
      /<meta\s+name=["']author["']\s+content=["'][^"']*["']\s*\/?>\s*/g,
      "",
    );

    // The rendered body HTML from renderToString may contain helmet-rendered
    // tags inline (if helmet v3 with React 19 renders any). Strip them from
    // the body — we inject the clean headHtml into <head> instead.
    //
    // NOTE: with the fix in SEO.tsx that skips <Helmet> on initial hydration,
    // Helmet is NOT rendered during SSR. But we keep these body-cleaning
    // passes as a defensive belt-and-braces measure in case Helmet v3's
    // internals change in the future.
    let cleanBodyHtml = html;
    cleanBodyHtml = cleanBodyHtml.replace(/<title[^>]*>[^<]*<\/title>/g, "");
    cleanBodyHtml = cleanBodyHtml.replace(
      /<meta\s+(?:name|property)=["'][^"']*["'][^>]*\/?>/g,
      "",
    );
    cleanBodyHtml = cleanBodyHtml.replace(
      /<link\s+rel=["']canonical["'][^>]*\/?>/g,
      "",
    );
    cleanBodyHtml = cleanBodyHtml.replace(
      /<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/g,
      "",
    );

    // Inject the prerendered SEO metadata right before </head>
    if (headHtml) {
      finalHtml = finalHtml.replace(
        /<\/head>/,
        `        <!-- Prerendered SEO metadata for ${route} -->\n        ${headHtml}\n    </head>`,
      );
    }

    // Inject the CLEANED rendered React HTML into <div id="root">
    finalHtml = finalHtml.replace(
      /<div id="root"><\/div>/,
      `<div id="root">${cleanBodyHtml}</div>`,
    );

    // 6. Write to the correct path
    let outPath;
    if (route === "/") {
      outPath = path.join(distDir, "index.html");
    } else {
      const routeDir = path.join(distDir, route);
      fs.mkdirSync(routeDir, { recursive: true });
      outPath = path.join(routeDir, "index.html");
    }

    fs.writeFileSync(outPath, finalHtml, "utf-8");

    // Verify (strip HTML comments first so comment-mentioned tags don't
    // inflate the counts; the prerendered tags carry data-prerendered
    // before name=/property= so the regex must allow attribute-permutation).
    const noComments = finalHtml.replace(/<!--[\s\S]*?-->/g, "");
    const ogCount = (noComments.match(/property="og:/g) || []).length;
    const twitterCount = (noComments.match(/name="twitter:/g) || []).length;
    const jsonLdCount = (noComments.match(/application\/ld\+json/g) || []).length;
    const titleCount = (noComments.match(/<title[^>]*>[^<]*<\/title>/g) || []).length;
    const descCount = (
      noComments.match(/<meta[^>]*name=["']description["'][^>]*>/g) || []
    ).length;
    const robotsCount = (
      noComments.match(/<meta[^>]*name=["']robots["'][^>]*>/g) || []
    ).length;
    const authorCount = (
      noComments.match(/<meta[^>]*name=["']author["'][^>]*>/g) || []
    ).length;
    const canonicalCount = (
      noComments.match(/<link[^>]*rel=["']canonical["'][^>]*>/g) || []
    ).length;
    console.log(
      `   ✓ ${route} → ${path.relative(root, outPath)}  ` +
        `(title:${titleCount} desc:${descCount} robots:${robotsCount} author:${authorCount} ` +
        `canonical:${canonicalCount} OG:${ogCount} Twitter:${twitterCount} JSON-LD:${jsonLdCount})`,
    );
  }

  // 7. Clean up the SSR bundle (not needed for deployment)
  fs.rmSync(serverDir, { recursive: true, force: true });

  console.log("✓ Prerendering complete.");
}

main().catch((err) => {
  console.error("✗ Prerender failed:", err);
  process.exit(1);
});
