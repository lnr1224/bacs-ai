# BACS AI — MVP (refactor/bacs-evidence-engine)

This branch contains the MVP refactor focused on evidence-driven business diagnostics and the BACS methodology.

Key points
- Evidence-first design: structured evidence is the single source of truth.
- File-backed JSON storage (data/*.json) to stay lightweight and cheap for MVP.
- No external infra (Postgres/Neo4j/Redis) added.
- UI includes the Executive Diagnostic page and Guided Interview page.

Quick local run (developer)
1. npm install
2. npm run dev
3. Open http://localhost:3000

Deployment (recommended)
- Frontend and static assets can be deployed to Vercel.
- The current build script produces both a static `dist/` frontend and a bundled `dist/server.cjs` Node server. Vercel can host the static frontend, but the Node server requires a host that runs Node processes (e.g., Render, Railway).

Option for deployment
1. Frontend on Vercel (fastest):
   - Connect repo in Vercel, set build command `npm run build`, output directory `dist`.
   - This deploys the frontend. The backend (Express server) must be hosted elsewhere for full functionality.

2. Full stack on Render (recommended for full app):
   - Connect repository to Render, set build command `npm run build`, start command `npm start`.
   - Render will run the bundled server and serve both frontend and backend from the same process.

Vercel readiness check
- This branch is build-ready for Vite frontend. Run `npm run build` locally to ensure the build succeeds in CI.
- If `npm run build` succeeds, the frontend can be deployed to Vercel with output directory `dist`.
- If you want the full server to run, deploy to a Node host (Render/Railway) instead.

Opening a PR
- A PR against `main` should include only minimal build/readme fixes. Do not add new features.

---

Vercel-specific notes
- Environment variables: the server uses GEMINI_API_KEY for AI features; these are optional for MVP (fallbacks are implemented). If you enable AI features, set GEMINI_API_KEY in Vercel environment settings.
- Static files: `data/` contains seed JSON files used for testing; in production you may want to migrate to a DB.
