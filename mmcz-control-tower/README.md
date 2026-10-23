# MMCZ Digital Consignment Control Tower

A React application (Vite + React 18) for the Minerals Marketing Corporation of Zimbabwe. It tracks every mineral export consignment from declaration to release, across six personas: Producer, MMCZ Inspectorate, Finance, Compliance, Executive and Customer/Agent, plus Administration.

The app runs entirely in the browser. It has no server code and no database: all records are seeded on first load and saved in the browser's `localStorage`.

## Requirements

- Node.js 18 or newer (20 recommended) and npm.

## Run it locally

```bash
npm install
npm run dev        # development server at http://localhost:5173
```

## Build for production

```bash
npm install
npm run build      # writes the static site to dist/
npm run preview    # serves dist/ at http://localhost:4173 to check the build
```

A ready-built copy of `dist/` is included in this package, so you can deploy it straight away without installing anything. Rebuild it after any change.

`dist/` is a plain static website (`index.html` plus an `assets/` folder). The build uses relative paths, so it works from a domain root or from a sub-folder.

## Deploy

Pick one. Each option publishes the `dist/` folder.

### Netlify
- **Drag and drop:** run `npm run build`, open https://app.netlify.com/drop and drop the `dist` folder.
- **From GitHub:** "Add new site" > "Import an existing project" > choose the repository. `netlify.toml` already sets the build command (`npm run build`) and publish folder (`dist`). Every push to `main` redeploys.

### Vercel
"Add New Project" > import the GitHub repository. `vercel.json` sets the framework (Vite), the build command and the output folder. Every push redeploys.

### GitHub Pages
The workflow `.github/workflows/deploy-pages.yml` builds and publishes the site on every push to `main`. One-time setup: in the repository go to Settings > Pages and set Source to "GitHub Actions".

### Your own server (IIS, Apache, Nginx)
Run `npm run build` and copy the contents of `dist/` into the web root (for example `C:\inetpub\wwwroot\mmcz` or `/var/www/html/mmcz/`). Make `index.html` the default document. No rewrite rules are needed because the app does not use URL routes.

## Deploy with Claude

1. Create a GitHub repository and push this folder to it:
   ```bash
   git init && git add . && git commit -m "MMCZ Control Tower"
   git branch -M main
   git remote add origin https://github.com/<your-account>/mmcz-control-tower.git
   git push -u origin main
   ```
2. Connect the repository to Netlify, Vercel or GitHub Pages once (see above). From then on, every push to `main` deploys automatically.
3. Open Claude Code (https://claude.ai/code, the desktop app or the `claude` CLI) on the repository and ask for changes, for example "add a new producer" or "change the SLA for assay to 36 hours, build, and open a pull request". Claude reads `CLAUDE.md` for the project rules, runs `npm run build` to check the change, and pushes a branch or pull request. Merging to `main` publishes the new version.

To have Claude deploy directly with the Netlify CLI instead of through GitHub, give its environment a `NETLIFY_AUTH_TOKEN` (and `NETLIFY_SITE_ID`) and ask it to run `npx netlify-cli deploy --prod --dir=dist` after the build.

## Project structure

```
index.html                 page shell (fonts, styles and scripts are bundled by Vite)
public/favicon.svg
src/
  main.jsx                 entry point: fonts, styles, renders <App/>
  App.jsx                  session, routing between screens, all workflow actions
  styles.css               full theme (navy enterprise palette, tokens, layout)
  assets/mmcz-logo.jpg     official MMCZ logo
  data/                    master and reference data (JSON) and the seed scenarios
    producers.json  minerals.json  buyers.json  routes.json  inspectors.json
    personas.json  personaGroups.json  logins.json  stages.json  documentTypes.json
    integrationSystems.json  mmczOrg.json  ytdMonths.json  valueByMineral.json
    bottlenecks.json  zimbabweOutline.json  zimbabweCities.json
    seed.js                builds the starting consignments, exceptions and messages
  lib/                     business logic without UI
    constants.js  format.js  masterData.js  lifecycle.js  workflow.js  derived.js
    navigation.js  session.js  storage.js  download.js  pdfEngine.js
  components/              shared UI: primitives, cards, charts, lifecycle, header, modals
  layout/                  app header, side navigation, global search, persona selector, notifications
  pages/                   one file per persona (producer, checker, coordinator, inspector, lab,
                           finance, compliance, exceptions, executive, customer, admin),
                           Consignment 360 and Login
  documents/documents.jsx  generated documents (EVR, invoice, CD1, Bill of Entry, release pack) and PDF export
```

## Data and storage

- Starting data is built from `src/data/*.json` and `src/data/seed.js` the first time a browser opens the app.
- After that, all changes (declarations, approvals, exceptions, the custom logo and login background) are saved in that browser under the `localStorage` key `mmcz-ct-v4`. Data is not shared between users or devices; shared multi-user operation needs a backend and database.
- To reset a browser to the starting data, clear the site data, or run `localStorage.removeItem('mmcz-ct-v4')` in the browser console and reload.
- If you change the shape of the seed data, change `KEY` in `src/lib/constants.js` (for example to `mmcz-ct-v5`) so browsers load the new data instead of their saved copy.

## Sign-in accounts

User IDs per persona are in `src/data/logins.json` (for example `t.moyo@plz.co.zw` for Producer). Sign-in accepts any password and any 6-digit code; there is no authentication server.

## Documents and downloads

PDFs are generated in the browser with jsPDF and html2canvas, which load only when a document is downloaded. PDFs and CSV reports save to the browser's Downloads folder. Fonts are bundled with the app, so it works on networks that block Google Fonts or public CDNs.
