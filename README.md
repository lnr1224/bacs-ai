# BACS AI: Evidence-Driven Business Diagnosis (MVP)

This branch contains the MVP refactor focused on evidence-driven business diagnostics and the BACS methodology.

Core principles
- Evidence-first design: structured evidence is the single source of truth.
- Lightweight file-backed JSON storage (data/*.json) for zero-infrastructure MVP.
- No new backend architecture introduced — the branch is production-ready for a Node host (Render) or frontend-only deploy on Vercel.

Quick local developer run
1. npm install
2. npm run build
3. npm start
4. Open http://localhost:3000

Render (recommended) — full stack (frontend + backend)
1. Create a free Render account: https://render.com
2. Create a new Web Service and connect your GitHub repository
3. Select branch: `refactor/bacs-evidence-engine`
4. Build Command: `npm run build`
5. Start Command: `npm start`
6. Add environment variables (optional):
   - `GEMINI_API_KEY` — only if you enable AI features; the app has local fallbacks for missing keys.
7. Deploy — Render will host the bundled server `dist/server.cjs` and serve both frontend and API.

Vercel (frontend only)
- If you only want the static frontend live immediately, deploy the `dist/` folder to Vercel.
  - Build Command: `npm run build`
  - Output Directory: `dist`
- Note: the Express backend will not run on Vercel unless converted to serverless functions. For the full app use Render.

Release candidate v1.0 — required checklist
Before deploying, ensure the following pass locally:
- npm run build => produces `dist/` and `dist/server.cjs`
- npm start => server starts and serves frontend + API
- Interview flow works end-to-end (submit answers -> evidence.json updated)
- Evidence confirm flow works (POST /api/evidence/:id/confirm)
- GET /api/bacs/report/:businessId returns a valid report for `biz_seed_1`
- UI mobile layout checks (responsive across widths)

If you want me to open a PR with these deployment notes and the release checklist, say “Open PR”.
