# Portfolio integration

The portfolio repository was not present in the workspace, so this directory is
a ready-to-apply React integration rather than a claimed modification.

1. Copy `SimpleSiliconProjectCard.tsx` and
   `simple-silicon-project-card.css` into the portfolio's project-card area.
2. Copy the two files in `assets` to the portfolio's public directory under
   `public/simple-silicon/`.
3. Render `<SimpleSiliconProjectCard />` where featured projects are listed.
4. Update the single `SIMPLE_SILICON_URL` constant when the final production
   URL is known. The current value assumes the requested GitHub project site.

The card opens the site in a new tab with `noopener noreferrer`, does not link
to the application repository, and has no dependency beyond React and CSS.
