import assert from "node:assert/strict";
import test from "node:test";
import { getGitHubPagesConfig } from "../github-pages.config.mjs";

test("custom domains serve assets from the root", () => {
  const config = getGitHubPagesConfig({ GITHUB_PAGES: "true", PAGES_CUSTOM_DOMAIN: "simplesilicon.app" });
  assert.equal(config.basePath, "");
  assert.equal(config.siteUrl, "https://simplesilicon.app");
});

test("project sites retain their repository prefix", () => {
  const config = getGitHubPagesConfig({ GITHUB_PAGES: "true", GITHUB_REPOSITORY: "owner/website" });
  assert.equal(config.basePath, "/website");
  assert.equal(config.siteUrl, "https://owner.github.io/website");
});

test("local development remains rooted at slash", () => {
  const config = getGitHubPagesConfig({});
  assert.equal(config.basePath, "");
  assert.equal(config.siteUrl, "http://localhost:3000");
});
