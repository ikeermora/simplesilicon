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

For the custom domain, run:

```bash
PAGES_CUSTOM_DOMAIN=simplesilicon.app npm run build:pages
```

This produces `dist/client` with root-relative assets and a CNAME file. Without
`PAGES_CUSTOM_DOMAIN`, the build targets the GitHub project path instead.

The workflow at the repository root (`.github/workflows/pages.yml`) builds this
subdirectory and publishes on pushes to main or manual dispatch.

## Public source boundary

This repository must never contain source from the official desktop application,
including snippets, internal dependencies, archives, or application build outputs.
Only website code and approved public media belong here. See the root AGENTS.md.

## Portfolio preview

The `portfolio-integration` directory contains a standalone React card, styles,
and public assets for the portfolio website.
