# বায়তুল হাসানাহ্‌ · Baitul Hasanah — Website & Member Management System

MERN project (React + Vite + Tailwind / Express / MongoDB Atlas).

## Honest status

| Area | Status |
|---|---|
| Public website (home, about, activities, Qard Hasan, transparency, constitution, news, contact, 404) | Written (Phase 1). **Not yet built or run** — see "Not yet tested" |
| Bengali/English switcher, content from the constitution draft | Written |
| Database models for every collection + ledger | Written |
| Auth API (register as *pending*, login, logout, me), rate limiting, CORS, CSRF origin check, Helmet, input sanitization | Written, **not yet run** |
| Login/Register pages | UI only, inputs disabled — **not yet connected to the API** (Phase 2 remainder) |
| Member dashboard, admin dashboard, donation/deposit/Qard Hasan management, reports, announcements, PDF export | **Not built yet** (Phases 3–5) |
| News, Transparency, Contact form | Show empty states; nothing is invented. Contact form is disabled until its endpoint exists |

## Not yet tested
Package installation was unavailable in the environment where this code was written, so `npm install`, `npm run build` and the server have **not been executed**. Expect to fix small typos on first run.

## Run locally
```bash
# 1) API
cd server
cp .env.example .env        # fill in MONGODB_URI, JWT_SECRET, CLIENT_ORIGIN
npm install
npm run seed:admin          # creates the first admin from ADMIN_* in .env (then delete ADMIN_PASSWORD)
npm run dev                 # http://localhost:5000

# 2) Website
cd ../client
npm install
npm run dev                 # http://localhost:5173 (proxies /api to :5000)
```
Node 20+ is required.

## Environment variables (server/.env)
| Name | Purpose |
|---|---|
| `MONGODB_URI` | MongoDB Atlas free (M0) connection string |
| `JWT_SECRET` | ≥ 32 random chars |
| `CLIENT_ORIGIN` | Allowed frontend origin(s), comma separated |
| `ADMIN_NAME/EMAIL/PASSWORD` | Used only by `seed:admin`. There is no public admin signup |

## Things you still need to provide (placeholders in `client/src/lib/siteConfig.js`)
- Official member registration form URL
- Contact email, phone, address, social links
- Payment details (bKash/Nagad etc.)
- Committee member names/photos (to be editable from admin later)

## Design decisions to confirm
- The emblem is navy + gold; the brief asks for emerald + gold. The site uses emerald/gold with the emblem shown unmodified on white.
- The constitution is marked **draft** on the site (its cover says "প্রাথমিক খসড়া").
- The constitution says members register with NID. The website does **not** collect NID; keep that in a separate private process.
- Loan limits (e.g. 10,000–20,000 BDT, 70–80% cap) and reserve (20–30%) are *proposals* in the constitution, so they are not hard-coded.
- `bcryptjs` (pure-JS bcrypt) is used instead of native `bcrypt` so it installs on free hosts without compiling.

## Free-tier deployment (planned)
- Frontend: Vercel (`client/`, build `npm run build`, output `dist`; `vercel.json` handles SPA routing)
- API: Render free web service (`server/`, start `npm start`; sleeps when idle — first request can take ~30–60 s)
- DB: MongoDB Atlas M0
- Email/SMS notifications: not integrated yet. Free option: Brevo/Resend free email tiers; SMS is paid in Bangladesh, so use in-app notices and manual reminders.
- Because the site and API are on different domains, production cookies use `SameSite=None; Secure`, guarded by an origin check.
