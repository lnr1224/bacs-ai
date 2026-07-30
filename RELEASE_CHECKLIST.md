# Release Checklist — BACS v1.0 (refactor/bacs-evidence-engine)

This file documents the release tasks to validate the MVP and prepare for a Render deployment.

Local verification

1) Build
- Run: `npm run build`
- Expected: no build errors, `dist/` exists and contains static frontend output; `dist/server.cjs` is created.

2) Start
- Run: `npm start`
- Expected: server listens (default port 3000) and serves the app

3) Smoke tests
- Visit `/` (Executive Diagnostic page)
- Visit `/interview` (Guided Interview)
- Confirm Business Facts are visible and Imported items show Confirm button

4) Interview flow
- Submit one answer in Interview UI
- Check `data/evidence.json` contains a new evidence record with the businessId used

5) Evidence confirmation
- Use POST `/api/evidence/:id/confirm` (or Confirm button in UI) on an Imported evidence
- Confirm the evidence `status` becomes `Verified` and confidence -> 1

6) BACS report
- GET `/api/bacs/report/biz_seed_1` returns `halted: false` (if critical seed evidence present) and variables array

7) Mobile layout
- Shrink browser viewport to 375px width and verify the UI remains usable

8) Accessibility & polish (fast checks)
- Ensure keyboard navigation to primary buttons
- Ensure meaningful labels present for input elements

9) Deploy to Render (if above checks pass)
- Connect repo & branch `refactor/bacs-evidence-engine`
- Build Command: `npm run build`
- Start Command: `npm start`
- Add optional env vars

Notes
- Do not modify architecture for the launch. Keep the app file-backed and simple.
- If any build error is trivial (typo, missing import), fix it and rerun the checklist.
- If a change requires redesign (serverless conversion), stop and raise the issue; do not attempt large refactors.
