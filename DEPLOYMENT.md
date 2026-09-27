
# Free Deployment Runbook

This runbook targets a zero-dollar starter deployment:

- **Frontend and same-origin API proxy:** Cloudflare Pages (Free)
- **Express API:** Render Web Service (Free)
- **PostgreSQL:** Neon Postgres (Free)
- **Source:** GitHub

This is the simplest free deployment that preserves the existing Express application and admin cookie flow. It is not a high-availability production stack. Render Free sleeps after 15 minutes without traffic and can take about a minute to wake; Neon Free scales its compute to zero after inactivity, caps storage at 0.5 GB and compute at 100 CU-hours/project/month, and does not offer production-grade backup/recovery. Use paid compute/database plans before depending on uninterrupted service or storing important business records without independent backups. Render explicitly positions its free instances for exploration and warns against using them for production applications.

The Pages Function proxies browser `/api/*` requests to Render. The browser therefore sees the API as same-origin with the Pages site, avoiding third-party-cookie restrictions for admin login. The proxy accepts only an HTTPS origin configured in Cloudflare; it never accepts a client-selected upstream URL.

Current provider references: [Render free instance limits](https://render.com/docs/free), [Render pricing](https://render.com/pricing), [Neon plans](https://neon.com/pricing), [Cloudflare Pages Functions routing](https://developers.cloudflare.com/pages/functions/routing/), and [Cloudflare Pages bindings](https://developers.cloudflare.com/pages/functions/bindings/). Free-tier terms and quotas can change; recheck them on the day you create the accounts.

## 1. Repository and GitHub

The root `.gitignore` excludes `.env*` except `.env.example`, `node_modules`, build output, Cloudflare `.dev.vars*`, Wrangler state, and private key files. Keep production credentials in provider secret settings, never in GitHub or any `VITE_` variable.

Check the staging area before the first push. From PowerShell at the repository root:

```powershell
git init -b main
git add .
git status --short
git check-ignore -v .env server/.env node_modules dist .dev.vars
```

Confirm `.env`, `server/.env`, `node_modules`, and any local database dumps are absent from the staged file list. If a secret was ever committed, removing the file is not enough: rotate the credential and remove it from Git history before publishing.

Then create an empty GitHub repository (do not add a README or license during creation) and push:

```powershell
git commit -m "Prepare NOVARIYAN deployment"
git remote add origin https://github.com/YOUR_ACCOUNT/YOUR_REPOSITORY.git
git push -u origin main
```

If this folder already has a Git remote, inspect it with `git remote -v` and use the existing repository instead of adding another.

## 2. Create Neon PostgreSQL

1. Create a Neon project in a region close to the Render service.
2. Create/use the production database branch and database.
3. Copy both connection strings from Neon: the **pooled** connection string for the running API and the **direct/unpooled** connection string for Prisma migrations/bootstrap.
4. Keep both strings private. Neon Free currently has scale-to-zero, 0.5 GB storage, 100 CU-hours per project/month, and no scheduled backups. Keep an independent encrypted backup if the records matter.

## 3. Deploy the backend on Render

Create a **Web Service** from the GitHub repository. Configure:

- Root Directory: `server`
- Runtime: Node
- Build Command: `npm ci && npx prisma generate && npm run build`
- Start Command: `npm start`
- Health Check Path: `/api/health`
- Instance: Free
- Auto-deploy: enabled for `main`

Set these service environment variables in Render:

| Variable | Value |
| --- | --- |
| `NODE_ENV` | `production` |
| `PORT` | Let Render set its injected `PORT`; do not hardcode local port `4000`. |
| `DATABASE_URL` | Neon pooled connection string |
| `FRONTEND_URL` | Exact Cloudflare Pages origin, for example `https://novariyan.pages.dev` |
| `CORS_ORIGIN` | Same exact value as `FRONTEND_URL` |
| `ADMIN_EMAIL` | The intended first administrator's email |
| `WHATSAPP_NUMBER` | Number used by the public contact links, digits with country code |
| `ADMIN_COOKIE_SAME_SITE` | `lax` |
| `TRUST_PROXY_HOPS` | `1` for the Render web-service proxy; validate client IP/rate-limit behavior after launch |
| `ANALYTICS_RETENTION_DAYS` | `90` |

`SESSION_SECRET` is **not used by this codebase**. Admin sessions use cryptographically random opaque tokens, stored as SHA-256 hashes in PostgreSQL, so do not invent or expose a `SESSION_SECRET` just to match a generic checklist. `ADMIN_PASSWORD` is not a persistent Render variable; set it only for the one-time bootstrap command below.

After deployment, copy the Render service origin, such as `https://novariyan-api.onrender.com`. The API may sleep when idle on the free instance. Confirm `https://novariyan-api.onrender.com/api/health` responds with `database: "ready"` after its cold start.

## 4. Apply production migrations and create the administrator

Run these commands from PowerShell on your own machine. Enter the Neon **direct** URL in your terminal; do not paste it into chat, source files, or GitHub. It temporarily exists in that shell's environment.

```powershell
Set-Location server
$secureDatabaseUrl = Read-Host "Paste Neon direct connection URL" -AsSecureString
$databaseUrlPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureDatabaseUrl)
try { $env:DATABASE_URL = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($databaseUrlPointer) }
finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($databaseUrlPointer) }
npx.cmd prisma validate
npx.cmd prisma generate
npx.cmd prisma migrate deploy
```

This applies committed migrations without resetting the database. Do not use `prisma migrate reset`.

Provision the initial admin against that same Neon database:

```powershell
$env:ADMIN_EMAIL = Read-Host "Admin email"
$env:ADMIN_NAME = Read-Host "Admin display name"
$secureAdminPassword = Read-Host "New unique admin password (12+ characters)" -AsSecureString
$adminPasswordPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureAdminPassword)
try { $env:ADMIN_PASSWORD = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($adminPasswordPointer) }
finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($adminPasswordPointer) }
npm.cmd run admin:bootstrap
Remove-Item Env:ADMIN_PASSWORD
Remove-Item Env:DATABASE_URL
```

The bootstrap creates a `SUPER_ADMIN`, hashes the password with Argon2id, and refuses to overwrite an existing account.

## 5. Deploy the frontend on Cloudflare Pages

1. Create a Pages project connected to the same GitHub repository.
2. Set the production branch to `main`.
3. Use these build settings:
   - Framework preset: Vite
   - Root directory: `/`
   - Build command: `npm ci && npm run build`
   - Build output directory: `dist`
   - Node.js version: `22` or newer supported by Vite 8
4. The `functions/api/[[path]].ts` file is deployed as the Pages `/api/*` proxy. Do not set `VITE_API_URL`; production will use same-origin `/api`.
5. Add a Pages **runtime** environment variable (production scope):
   - `API_ORIGIN` = Render origin only, e.g. `https://novariyan-api.onrender.com` (no `/api` suffix and no trailing path)
6. Redeploy after setting the variable.

Cloudflare Pages Free Functions have a daily invocation quota. Static files are served separately; verify that the deployed Pages project generated a `_routes.json` which invokes Functions only for the API paths. Under **Settings > Runtime > Fail open / closed**, use fail-closed behavior for the API proxy so quota exhaustion does not silently route API requests as static assets.

The frontend API base defaults to same-origin in production. The development-only localhost fallback is ignored in production builds, even if a local `.env` file is present.

## 6. Domains and URLs

Free default URL shape:

- Public site: `https://YOUR_PROJECT.pages.dev`
- Admin: `https://YOUR_PROJECT.pages.dev/admin/login`
- Browser-visible API: `https://YOUR_PROJECT.pages.dev/api/*`
- API origin behind the Pages proxy: `https://YOUR_API.onrender.com`
- API health: `https://YOUR_PROJECT.pages.dev/api/health` (proxied)

For a custom domain, add it in Cloudflare Pages and wait for its managed TLS certificate. Then update Render `FRONTEND_URL` and `CORS_ORIGIN` to the custom frontend origin and redeploy the API. The same-origin proxy keeps the browser's admin cookie on the frontend site.

## 7. Production testing

Test on the deployed site, not just localhost:

- Homepage, `/services`, `/services/<slug>`, `/work`, `/about`, `/reviews`, `/blog`, `/book`, and `/contact` load on direct navigation/reload.
- `https://YOUR_PROJECT.pages.dev/api/health` returns success and `database: "ready"` (first request may wait for Render/Neon cold starts).
- Submit one booking and one contact form; confirm each is stored in Neon and rendered in the authenticated admin dashboard.
- `/admin` redirects unauthenticated visitors to `/admin/login`.
- Sign in, refresh, navigate leads/bookings, update a status/note, then sign out; verify the session cookie is HttpOnly, Secure, SameSite=Lax and scoped to `/api/admin`.
- First visit shows consent. Reject optional analytics and confirm no analytics event requests; accept analytics and verify only first-party `/api/analytics/events` requests appear. Marketing remains disabled; no third-party tracking script is expected.
- Browser requests use Pages `/api/*`; direct browser requests to Render are not needed. Invalid origins must not receive credentialed CORS access.
- Confirm the Pages function runtime variable `API_ORIGIN` is set to the HTTPS Render origin and that its API proxy returns the API's 502/503 safely if Render is waking or unavailable.

## Free-tier caveats

- Render Free idles after 15 minutes without inbound traffic; waking can take around one minute. Its docs say free instances are intended for exploration, not production applications.
- Neon Free suspends compute after inactivity and caps storage/compute; it is for prototypes/side projects, not a backed-up production database.
- Free-tier quotas, availability, and provider terms can change. Check current limits in each account before launch.
- The dashboard's Reviews, Content, and Settings pages are placeholders. This deployment does not add those management features.
