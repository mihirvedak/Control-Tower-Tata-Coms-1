# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Commands
- `npm install` then `npm run build` must pass before any commit. Output goes to `dist/`.
- `npm run dev` starts the dev server; `npm run preview` serves the production build.
- `npm run format` formats the source with Prettier.

## What this is
MMCZ Digital Consignment Control Tower: a browser-only React 18 app built with Vite. No backend. State lives in `localStorage` under the key in `src/lib/constants.js` (`mmcz-ct-v4`). Seed data comes from `src/data/*.json` and `src/data/seed.js`.

## Rules for changes
- Keep the dark navy enterprise theme: header and sidebar `#1A3156`, page `#051936`, and the `--bg-*`, `--text-*`, `--accent-*` and `--status-*` tokens at the top of `src/styles.css`. Generated documents stay paper-white.
- Keep the six top-level personas (Producer, MMCZ Inspectorate, Finance, Compliance, Executive, Customer/Agent) and the "Current Persona" switcher.
- Use Zimbabwean names and organisations in data.
- Never add "demo", "prototype", "mock" or "test user" wording to the UI, data or documents.
- Use the official MMCZ logo (`src/assets/mmcz-logo.jpg`). Do not add vendor credits. Keep login-page branding controls small and icon-only.
- If the seed data shape changes, bump the `localStorage` key in `src/lib/constants.js` so browsers reload the new data.

## Deploying
Pushing to `main` deploys through whichever host is connected (Netlify via `netlify.toml`, Vercel via `vercel.json`, or GitHub Pages via `.github/workflows/deploy-pages.yml`). See README.md.
