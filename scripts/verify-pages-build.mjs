import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { getGitHubPagesConfig } from "../github-pages.config.mjs";

const pagesDirectory = resolve("dist/client");
const { basePath, enabled, siteUrl } = getGitHubPagesConfig();

if (!enabled || !basePath) {
  throw new Error("The Pages verifier must run with GITHUB_PAGES=true.");
}

const htmlPath = resolve(pagesDirectory, "index.html");
const html = readFileSync(htmlPath, "utf8");
const referencedUrls = [
  ...html.matchAll(/(?:href|src|srcSet|content)="([^"]+)"/gi),
].map((match) => match[1]);

const deployableUrls = referencedUrls.filter((value) => {
  if (value.startsWith("#") || value.startsWith("mailto:") || value.startsWith("tel:")) {
    return false;
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value.startsWith(`${siteUrl}/`);
  }

  return value.startsWith("/");
});

if (deployableUrls.length === 0) {
  throw new Error("No deployable asset URLs were found in index.html.");
}

for (const value of deployableUrls) {
  const pathname = value.startsWith("http") ? new URL(value).pathname : value;

  if (!pathname.startsWith(`${basePath}/`)) {
    throw new Error(`Asset URL does not use ${basePath}: ${value}`);
  }

  const artifactPath = resolve(
    pagesDirectory,
    pathname.slice(`${basePath}/`.length),
  );

  if (!existsSync(artifactPath)) {
    throw new Error(`Asset URL does not resolve inside the Pages artifact: ${value}`);
  }
}

const expectedPublicAssets = [
  "favicon.png",
  "og-v2.png",
  "product/editor-800.webp",
  "product/editor-1600.webp",
  "product/waveforms-800.webp",
  "product/waveforms-1600.webp",
  "product/rtl-800.webp",
  "product/rtl-1600.webp",
  "product/rtl-register-800.webp",
  "product/rtl-register-1600.webp",
  "product/rtl-alu-800.webp",
  "product/rtl-alu-1600.webp",
  "product/rtl-control-800.webp",
  "product/rtl-control-1600.webp",
];

for (const relativePath of expectedPublicAssets) {
  if (!existsSync(resolve(pagesDirectory, relativePath))) {
    throw new Error(`Expected public asset is missing: ${relativePath}`);
  }
}

function collectFiles(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = resolve(directory, entry);
    return statSync(path).isDirectory() ? collectFiles(path) : [path];
  });
}

const clientJavaScript = collectFiles(resolve(pagesDirectory, "_next"))
  .filter((path) => path.endsWith(".js"))
  .map((path) => readFileSync(path, "utf8"))
  .join("\n");

if (!clientJavaScript.includes(basePath) || !clientJavaScript.includes("/product/")) {
  throw new Error("Dynamic product image URLs do not include the Pages base path.");
}

if (html.includes("/simple-silicon/")) {
  throw new Error("The obsolete /simple-silicon/ path is still present in index.html.");
}

console.log(
  `Verified ${deployableUrls.length} generated URLs for ${siteUrl}/ against dist/client.`,
);
