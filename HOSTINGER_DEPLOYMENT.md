# Hostinger deployment — STRAFE.LIVE

This project is a **Next.js Node app** (not a static export). Hostinger must run Node.js hosting so API routes work.

## Before you deploy

1. Confirm `npm run build` succeeds locally.
2. Push this repository to GitHub.
3. Create a free Supabase project (optional but recommended for production emails/analytics).
4. Run `supabase/schema.sql` in the Supabase SQL editor.
5. Decide an `ADMIN_PASSWORD` (any password you choose — this is not generated for you).
   Example: `strafe-admin-2026`. Put that same value in Hostinger env vars.

## Hostinger steps

1. Open Hostinger **hPanel**.
2. Choose **Node.js Web App** / Websites → Add Website → Node.js (wording varies by plan).
3. Connect your **GitHub** repository for this project.
4. Select your production branch (usually `main`).
5. Set environment variables in Hostinger:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD`
   - `NODE_ENV=production`
6. **Build command:** `npm run build`
7. **Start command:** `npm run start`
8. Ensure the Node version is modern (Node 20+ recommended).
9. Connect domain **strafe.live** to the Node app.
10. Verify SSL is active.
11. Test:
    - Homepage loads with drone video
    - Choose a side → signup posts to `/api/waitlist`
    - `/admin` login works
    - `/api/selection` accepts select events

## If Hostinger only offers static/PHP hosting

You need a plan that supports **Node.js applications**. Shared PHP-only hosting cannot run `next start` API routes.

Alternative free Node hosts if needed: Railway, Render, Fly.io — then point `strafe.live` DNS A/CNAME to that host while keeping the domain at Hostinger.

## Upload without Git (manual)

Not preferred, but possible:

1. Run `npm run build` locally.
2. Upload the full project (including `node_modules` is heavy — better install on server).
3. On the server: `npm install --omit=dev && npm run build && npm run start`.

Prefer Git + Hostinger Node build pipeline.

## Important

- Do not commit `.env.local` or `SUPABASE_SERVICE_ROLE_KEY`.
- Do not process real payments for fictional military services.
- Queue numbers are theatrical UI only.
