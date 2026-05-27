# Open-Source Robotics — CoRL 2026 Workshop

Website for **"Open-Source Robotics: Closing the Gap with Closed-Source Systems"**, a half-day
interactive workshop proposed for CoRL 2026 (November 9, 2026).

The workshop targets three connected challenges as a single stack — **open hardware → open
datasets → open models (VLAs)** — built around hands-on work with real open-source robots rather
than back-to-back talks.

## Structure

```
index.html            Single-page site
assets/css/styles.css Styles (dark, robotics-themed)
assets/js/main.js     Nav, scroll reveal, active-section spy
.nojekyll             Serve assets/ as-is on GitHub Pages
```

No build step. It's plain HTML/CSS/JS.

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy (GitHub Pages)

Push to the repository and enable Pages:

1. **Settings → Pages → Build and deployment**
2. Source: **Deploy from a branch**
3. Branch: `main`, folder: `/ (root)` → **Save**

The tentative URL is `https://open-hardware-robots.github.io/CoRL2026/`. If the site is served
from a subpath like `/CoRL2026/`, the relative asset paths in `index.html` already work as-is.

## Editing content

All copy lives directly in `index.html`, organized into clearly commented sections
(`MASTHEAD`, `CHALLENGES`, `EVIDENCE`, `SCHEDULE`, `SPEAKERS`, `PARTNERS`, `CALL FOR PROJECTS`,
`ARTIFACT`, `ORGANIZERS`). The three charts in `EVIDENCE` are driven by `assets/js/data.js`
(`ROBOTS`, `DATASETS`, `GAP`, `STATS`) — edit the data there to update the figures. Speaker cards
are placeholders (`To be announced`) and the project submission link is disabled (`coming soon`)
until finalized.
