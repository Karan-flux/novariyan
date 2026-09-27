
# Admin Dashboard and Analytics

## Local setup

The backend remains on Prisma 6. The schema and generated client are managed from `server/`.

```powershell
cd server
npx.cmd prisma validate
npx.cmd prisma generate
npx.cmd prisma migrate deploy
npm.cmd run build
```

The migrations are additive. `migrate deploy` applies them without resetting the database. Do not run `prisma migrate reset` against a database containing data.

To provision the first administrator, configure `ADMIN_EMAIL`, `ADMIN_NAME`, and a private `ADMIN_PASSWORD` of at least 12 characters in the backend process environment (or in the ignored local `server/.env` file), then run once:

```powershell
npm.cmd run admin:bootstrap
```

The bootstrap command creates a `SUPER_ADMIN` with an Argon2id password hash. It refuses to replace an existing account. Never commit the bootstrap password. Admin login is at `/admin/login`.

## API contracts

All admin endpoints other than login require the HttpOnly `novariyan_admin_session` cookie. Login, logout, and admin mutations also require the configured same-origin header.

- `POST /api/admin/auth/login`: `{ email, password }`; returns the admin profile and sets the session cookie.
- `GET /api/admin/auth/me`: returns the authenticated admin profile.
- `POST /api/admin/auth/logout`: revokes the current session and clears its cookie.
- `GET /api/admin/overview?from=<ISO>&to=<ISO>`: selected-range counts, visitor aggregates, top pages, and recent audit activity.
- `GET /api/admin/leads` and `GET /api/admin/bookings`: server-side pagination, search, status, date, and sorting filters.
- `PATCH /api/admin/leads/:id`: status, private notes, and read state.
- `PATCH /api/admin/bookings/:id`: validated status transition, private notes, and rescheduling.
- `POST /api/analytics/events`: strictly validated, rate-limited event ingestion; no authentication cookie is required.

## Cookie and analytics behavior

The admin authentication cookie is separate from visitor preferences and analytics identifiers. It is HttpOnly, uses the configured `ADMIN_COOKIE_SAME_SITE` policy, is scoped to `/api/admin`, and is Secure in production. Its opaque token is stored only as a SHA-256 hash in `AdminSession`; authentication credentials are never stored in browser storage.

Cookie preferences are stored locally with a consent version and timestamp. Essential preferences are always enabled. Analytics identifiers are created only after analytics consent; the anonymous visitor identifier expires after 30 days and the tab session after 30 minutes. Revoking analytics consent removes both identifiers. Referrers are reduced to their origin, paths exclude query strings, and no IP addresses or form contents are recorded. No third-party analytics or marketing scripts are configured. Marketing remains off by default.

## Current scope and production limits

The dashboard currently implements overview, leads/contacts, bookings, and analytics pages. Reviews, content, and settings have reserved routes but are explicitly placeholders; no CMS or review mutation API is implemented. Admin account creation, password recovery, and MFA are not implemented. Rate limits use the process-local default store; deploy one API instance or add a shared store before horizontal scaling. Public pages and admin screens are lazy-loaded, but the existing Three.js scene remains a separate large chunk. Review legal/privacy disclosures and production deployment configuration before launch.

Configure `FRONTEND_URL` and `CORS_ORIGIN` to the deployed frontend origin; production requires HTTPS. Set the frontend build variable `VITE_API_URL` to the HTTPS API origin when the API is hosted separately. If it is omitted, the frontend calls same-origin `/api`; localhost and non-HTTPS API URLs are ignored in production builds. If the API is served on the same origin behind a reverse proxy, `TRUST_PROXY_HOPS` should match the exact number of trusted proxies. For cross-site frontend/API deployments, set `ADMIN_COOKIE_SAME_SITE=none`; production cookies are then Secure.

Schedule `npm.cmd run analytics:prune` from `server/` at least daily in the hosting platform's scheduler. It removes analytics sessions older than `ANALYTICS_RETENTION_DAYS` (90 by default, permitted range 30–730); related events are deleted by the database cascade.
