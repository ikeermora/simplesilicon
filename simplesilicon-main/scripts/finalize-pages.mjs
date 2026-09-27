import {
  existsSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmdirSync,
  writeFileSync,
} from "node:fs";
import { resolve } from "node:path";
import { getGitHubPagesConfig } from "../github-pages.config.mjs";

const pagesDirectory = resolve("dist/client");
const { basePath, enabled } = getGitHubPagesConfig();

if (!existsSync(pagesDirectory)) {
  throw new Error("Static Pages output was not created at dist/client.");
}

if (!enabled || !basePath) {
  throw new Error("The Pages finalizer must run with GITHUB_PAGES=true.");
}

// vinext uses assetPrefix for both public URLs and its on-disk Vite output.
// GitHub Pages already mounts this artifact at basePath, so keep the prefixed
// URLs but move the generated _next directory to the artifact root.
const nestedAssetDirectory = resolve(
  pagesDirectory,
  basePath.slice(1),
  "_next",
);
const assetDirectory = resolve(pagesDirectory, "_next");

if (!existsSync(nestedAssetDirectory)) {
  throw new Error(`Expected vinext assets at ${nestedAssetDirectory}.`);
}

if (existsSync(assetDirectory)) {
  throw new Error(`Refusing to replace existing assets at ${assetDirectory}.`);
}

renameSync(nestedAssetDirectory, assetDirectory);

const nestedBaseDirectory = resolve(pagesDirectory, basePath.slice(1));
if (readdirSync(nestedBaseDirectory).length === 0) {
  rmdirSync(nestedBaseDirectory);
}

const physicalAssetPrefix = `${basePath.slice(1)}/_next/`;

for (const relativeManifestPath of [
  ".vite/manifest.json",
  "vinext-client-entry-manifest.json",
]) {
  const manifestPath = resolve(pagesDirectory, relativeManifestPath);
  const manifest = readFileSync(manifestPath, "utf8");
  writeFileSync(
    manifestPath,
    manifest.replaceAll(physicalAssetPrefix, "_next/"),
  );
}

writeFileSync(resolve(pagesDirectory, ".nojekyll"), "");
