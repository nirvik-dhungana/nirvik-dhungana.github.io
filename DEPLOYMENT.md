# Deployment Guide

## Architecture

This project is a **prerendered static SPA** deployed to **Cloudflare Workers (Static Assets mode)**.

```
Source code (src/)
       ↓
vite build  →  dist/  (static HTML, JS, CSS, images, fonts)
       ↓                 ↑
scripts/prerender.mjs  (SSR at build time → static HTML for each route)
       ↓
wrangler deploy  →  Cloudflare Worker "nirvik-dhungana-portfolio"
                    (serves dist/ as static assets with SPA fallback)
```

## Why Workers Static Assets (not Pages, not a JS Worker)

- **Not a JS Worker** — the build output is 100% static files. There's no `src/worker.ts`, no `_worker.js`, no `functions/` directory, no server-side runtime. Deploying as a traditional Worker would have nothing to execute.

- **Not Cloudflare Pages** — Pages works, but Workers Static Assets is Cloudflare's modern unified recommendation. It deploys via a single `wrangler deploy` command (no dashboard configuration needed), and it uses the same Worker name that already exists in the account.

- **Workers Static Assets** — the `wrangler.jsonc` config tells Wrangler to deploy `dist/` as static files served by a Worker. The Worker itself has no JavaScript logic; it's just an asset host. SPA routing is handled by `not_found_handling: "single-page-application"`.

## The "Worker already exists" error (resolved)

**Root cause:** Running `wrangler deploy` without a config file makes Wrangler infer the Worker name from `package.json` (`"nirvik-dhungana-portfolio"`). When a Worker with that name already exists, Wrangler refuses to overwrite it as a safety mechanism.

**Fix:** The `wrangler.jsonc` file explicitly names the Worker. This tells Wrangler "yes, I intend to update this specific Worker" — the safety check passes and the existing Worker is updated in place.

## Deployment commands

```bash
# One-command deploy (builds + deploys)
npm run deploy

# Or step by step
npm run build          # vite build + prerender
npx wrangler deploy    # upload dist/ to Cloudflare
```

## Configuration files

| File | Purpose |
|------|---------|
| `wrangler.jsonc` | Wrangler config — names the Worker, points to `dist/`, configures SPA fallback |
| `public/_headers` | Cloudflare security headers + caching rules (CSP, HSTS, immutable asset caching) |
| `public/_redirects` | SPA fallback rule (`/* → /index.html 200`) — safety net for the Pages path |

## First-time deployment

If you've never deployed this Worker before:

```bash
npm run build
npx wrangler deploy
```

The first deploy creates the Worker named `nirvik-dhungana-portfolio` in your account. Subsequent deploys update it in place.

## If a Worker with this name already exists from a different project

Either:
1. **Delete the old Worker** in the Cloudflare dashboard, then deploy.
2. **Rename this project's Worker** by editing `wrangler.jsonc` → `"name"`, then deploy as a new Worker.

## Custom domain

To attach a custom domain (e.g. `nirvikdhungana.com.np`):

1. Add a route to `wrangler.jsonc`:
   ```jsonc
   "routes": [
     { "pattern": "nirvikdhungana.com.np/*", "custom_domain": true }
   ]
   ```
2. Run `npx wrangler deploy`.
3. Cloudflare will provision the SSL certificate automatically.

## Verification

After deploying, verify:
- `https://<your-worker>.<your-subdomain>.workers.dev/` loads the portfolio
- `https://<your-worker>.<your-subdomain>.workers.dev/projects/pyrope` loads the Pyrope page (SPA routing)
- Security headers are present (check with `curl -I` — should show `Content-Security-Policy`, `Strict-Transport-Security`, etc. from `_headers`)
