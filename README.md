# Shaikh Aseel, portfolio

Minimal, work-first portfolio with a centered profile, project images, handwritten accents and separate pages for each project. React, Vite and Tailwind CSS. Fonts are bundled locally.

## Run locally

Use Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

## Build and deploy

```sh
npm test
npm run build
npm run preview
```

The build is in `dist/`. On Vercel, import this folder as a Vite project, use `npm run build`, and set the output directory to `dist`. The included `vercel.json` supplies SPA routing and security headers. No environment variables or secrets are needed.

For another static host, serve `dist/` and rewrite application routes to `index.html`. Preserve normal static-asset paths. The browser must be allowed to connect to `https://api.github.com` for the GitHub statistics.

Nothing has been deployed by this handoff.

## Edit

- `src/data.js`: profile, projects, links, experience and writing.
- `src/pages/`: home, individual project pages, open source, writing and experience.
- `src/index.css` and `tailwind.config.js`: type, colors, spacing and motion.
- `src/data-contributions.js`: the contribution graph data. GitHub has no public JSON API for the contribution calendar, so this is a dated snapshot taken from the real profile page, labeled as one on the home page.
- `public/images/`: project screenshots and existing project artwork. The detail pages identify artwork rather than calling it a product screenshot.

## GitHub data

The Open source page requests every statistic from the public GitHub API: merged, open and closed-unmerged PR counts (excluding repositories owned by Aseel012), unique contributed projects, kavynUI stars and public repos. Data is refreshed on page load and reused in memory during navigation, without an access token. There is an eight-second timeout. API failure, rate limits or incomplete data leave the dated November 23, 2026 snapshot visible. A successful complete fetch is labeled as fetched this visit. The PR list shows every public PR to other projects, grouped by merged, open and closed without merge, as of the snapshot date.

The snapshot is 10 merged, 5 open and 7 closed-unmerged external PRs across 8 repositories, 8 stars on kavynUI and 49 public repositories. The home page contribution graph is a separate dated snapshot (435 contributions in the last year, November 23, 2026) because the calendar has no unauthenticated API.

## Checks

```sh
npm test
bash scripts/check.sh
```

The second command also needs Chrome/Chromium. Set `CHROME_BIN` if it is not at `/usr/bin/google-chrome`. It checks every route at phone and desktop widths, images, browser errors, keyboard navigation and reduced-motion rendering. The unit tests cover routes, links, color contrast, data integrity and GitHub success/failure paths.

kavynUI, Tarrarium and RemoveAnything images are fresh interface screenshots taken November 23, 2026; the remaining images are project artwork carried forward and labeled as such. Project copy was checked against public repository descriptions and READMEs. Conflicting component counts and uncertain internship dates were omitted. Writing links and education were preserved from the supplied portfolio material; the writing feed did not permit a fresh automated read.
