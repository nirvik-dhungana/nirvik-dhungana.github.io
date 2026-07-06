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

    // Remove the static fallback <title> and <meta name="description"> from
    // the template — the prerendered versions replace them. This prevents
    // duplicate tags which would confuse crawlers.
    finalHtml = finalHtml.replace(
      /<title>[^<]*<\/title>\s*/g,
      "",
    );
    finalHtml = finalHtml.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>\s*/g,
      "",
    );

    // The rendered body HTML from renderToString may contain helmet-rendered
    // tags inline (if helmet v3 with React 19 renders any). Strip them from
    // the body — we inject the clean headHtml into <head> instead.
    let cleanBodyHtml = html;
    cleanBodyHtml = cleanBodyHtml.replace(/<title>[^<]*<\/title>/g, "");
    cleanBodyHtml = cleanBodyHtml.replace(
      /<meta\s+(?:name|property)="[^"]*"[^>]*\/?>/g,
      "",
    );
    cleanBodyHtml = cleanBodyHtml.replace(
      /<link\s+rel="canonical"[^>]*\/?>/g,
      "",
    );
    cleanBodyHtml = cleanBodyHtml.replace(
      /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/g,
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

    // Verify
    const ogCount = (finalHtml.match(/property="og:/g) || []).length;
    const twitterCount = (finalHtml.match(/name="twitter:/g) || []).length;
    const jsonLdCount = (finalHtml.match(/application\/ld\+json/g) || []).length;
    console.log(
      `   ✓ ${route} → ${path.relative(root, outPath)}  (OG: ${ogCount}, Twitter: ${twitterCount}, JSON-LD: ${jsonLdCount})`,
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
