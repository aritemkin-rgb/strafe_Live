# STRAFE.LIVE

Fictional satirical platform artwork presenting remote warfare as a consumer livestream / subscription experience.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build:

```bash
npm run build
npm run start
```

## Existing brand assets used

Preserved at project root and copied into `public/`:

| Original | Public path |
| --- | --- |
| `full logo.png` | `/brand/strafe-live-logo.png` |
| `emblem.png` | `/brand/strafe-emblem.png` |
| `Dronesample.mp4` | `/video/strafe-hero-loop.mp4` |

Do not regenerate or redraw these files.

## Environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (optional locally) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only Supabase key (never expose to client) |
| `ADMIN_PASSWORD` | Password gate for `/admin` |

Without Supabase configured, waitlist + selection analytics store in local `.data/` JSON files on the server.

SQL schema: `supabase/schema.sql`

## Admin

Visit `/admin` (not linked in the public nav). Requires `ADMIN_PASSWORD`.

## Hostinger

See [HOSTINGER_DEPLOYMENT.md](./HOSTINGER_DEPLOYMENT.md).
