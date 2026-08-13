# STRAFE.LIVE

Civilian combat-drone operator site (satirical product surface). Next.js App Router + Tailwind + Framer Motion.

If you are helping on this project, start here.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in values (see below)
npm run dev                  # http://localhost:3000
```

```bash
npm run build && npm run start
```

Node **20+** recommended.

## Project map

| Path | What it is |
| --- | --- |
| `src/app/page.tsx` | Homepage sections (hero → theaters → gear → waitlist) |
| `src/app/gear/` | Airframe catalog + `/gear/[id]` product pages |
| `src/app/careers/` | Job listings + apply form (email, name, LinkedIn) |
| `src/app/admin/` | Private analytics dashboard (not in nav) |
| `src/app/api/waitlist/` | Waitlist signup API |
| `src/app/api/careers/` | Career application API |
| `src/app/api/selection/` | Side-select analytics events |
| `src/app/api/admin/` | Admin login + stats |
| `src/components/` | UI by area: `hero`, `selection`, `map`, `gear`, `waitlist`, `careers`, `layout` |
| `src/data/` | Static content: theaters, drones, gear tiers, telemetry |
| `src/lib/` | Validation, local `.data` fallback, Supabase admin client, queue numbers |
| `public/brand/` | Logo + emblem (served assets) |
| `public/drones/` | Product images |
| `public/video/` | Hero loop |
| `supabase/schema.sql` | Database tables — **run this in Supabase SQL editor** |

## Environment variables

Copy `.env.example` → `.env.local` (local) or set the same keys in **Hostinger → Environment variables**.

| Variable | Required in production? | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | **Yes** | Supabase project URL, e.g. `https://xxxx.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | **Yes** | Server **secret** / `service_role` key (never put in client code) |
| `ADMIN_PASSWORD` | **Yes** | Password for `/admin` |

### Storage behavior

- **With both Supabase vars set:** waitlist, careers, and selection events save to Supabase. `/admin` shows `STORAGE: SUPABASE`.
- **Without Supabase:** data writes to `.data/*.json` on disk. Fine for local dev. **On Hostinger, redeploys wipe this** — do not rely on it in production.

## Supabase setup (production emails)

1. Create a free project at [supabase.com](https://supabase.com).
2. **SQL Editor** → paste contents of `supabase/schema.sql` → Run (not the file path).
3. **Settings → API** → copy Project URL + **secret / service_role** key.
4. Set the two env vars on Hostinger → Apply → Redeploy.
5. Submit a test signup → open `/admin` → you should see the row.

## Admin

- URL: `/admin` (intentionally unlisted)
- Login with `ADMIN_PASSWORD`
- Shows waitlist emails/names, career applications, side/theater counts, CSV export for waitlist

## Hostinger deploy

See [HOSTINGER_DEPLOYMENT.md](./HOSTINGER_DEPLOYMENT.md).

Checklist:

1. Node.js Web App connected to this GitHub repo
2. Env vars: `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`
3. Build: `npm run build` · Start: `npm run start`
4. After env changes: **Apply** + **Redeploy**
5. If CSS looks broken: flush Hostinger CDN/cache

## Brand assets

Do not regenerate logos. Served copies live in `public/brand/` and `public/drones/`.

Large source files at the repo root (`Dronesample*.mp4`, `drones/` scratch renders, `full logo.png`) are optional archives — the app does **not** load them at runtime.

## Homepage flow

1. **Hero** — pitch + CTAs  
2. **Choose Your Side** (`#theaters`) — map + allegiance  
3. **Gear** (`#gear`) — airframes for sale + subscription tiers  
4. **Waitlist** (`#waitlist`) — beta signup  

## Notes for collaborators

- Prefer editing data in `src/data/*` over hardcoding copy in components.
- Satire disclosure lives at `/disclosure`; keep the product surface looking “real.”
- After changing env vars on Hostinger, always redeploy or the live app will keep old config.
