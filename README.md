# Simple Silicon website

Public marketing website for Simple Silicon, an all-in-one EDA environment in
development with a working RTL and simulation foundation.
This repository contains only public website source and processed public-facing
screenshots. It does not include or link to the desktop application's source.

## Local development

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

## Builds

```bash
npm run build
npm run build:pages
```

`npm run build:pages` produces a static artifact in `dist/client` with asset
URLs configured for `https://ikeermora.github.io/simple-silicon/`.

The included Pages workflow is manual-only. It will not publish on push. When a
public site repository is ready, enable GitHub Actions as the Pages source and
run **Publish Simple Silicon website** manually. If the repository name changes,
update `basePath` in `next.config.ts` and `SIMPLE_SILICON_URL` in the portfolio
integration before publishing.

For a future custom domain, use the regular `npm run build` output and configure
the domain in GitHub Pages settings.

## Portfolio preview

The `portfolio-integration` directory contains a self-contained React card,
styles, and public assets ready to copy into the portfolio project once that
repository is available.
