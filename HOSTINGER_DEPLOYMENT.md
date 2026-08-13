# Hostinger deployment — STRAFE.LIVE

This project is a **Next.js Node app** (not a static export). Hostinger must run Node.js hosting so API routes work.

## Before you deploy

1. Confirm `npm run build` succeeds locally.
2. Push this repository to GitHub.
3. Create a free Supabase project (**required for production** so emails survive redeploys).
4. In Supabase SQL editor, paste and run the **contents** of `supabase/schema.sql` (not the file path).
5. Decide an `ADMIN_PASSWORD` (any password you choose).

## Hostinger steps

1. Open Hostinger **hPanel**.
2. Choose your **Node.js** site for strafe.live → **Dashboard**.
3. Connect the GitHub repository / production branch (`main`).
4. Set environment variables (**Environment variables** → Add → Apply changes):

| Key | Value |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://YOUR_PROJECT_REF.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase **secret** / `service_role` key |
| `ADMIN_PASSWORD` | Your admin password |
| `NODE_ENV` | `production` |

5. **Build command:** `npm run build`
6. **Start command:** `npm run start` (or `npm run start -- -p $PORT` if required)
7. Node **20.x** recommended.
8. After changing env vars: **Apply** then **Redeploy**. Wait until the build finishes.
9. Verify:
   - Homepage + drone video load
   - Waitlist signup works
   - `/admin` login works and shows **STORAGE: SUPABASE**
   - A test email appears on `/admin` after signup

## Important

- Do **not** rely on the local `.data/` folder on Hostinger — redeploys wipe it.
- Do not commit `.env.local` or `SUPABASE_SERVICE_ROLE_KEY`.
- If the site looks unstyled after a deploy, flush Hostinger CDN / cache.
- Queue numbers in the UI are theatrical only.

## If Hostinger only offers static/PHP hosting

You need a plan that supports **Node.js applications**.
