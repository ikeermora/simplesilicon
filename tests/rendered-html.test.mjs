import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../dist/client/", import.meta.url);

test("exports a complete public landing page", async () => {
  const html = await readFile(new URL("index.html", outputRoot), "utf8");

  assert.match(html, /<title>Simple Silicon — All-in-one EDA, made clear<\/title>/i);
  assert.match(html, /Hardware design/);
  assert.match(html, /In active development/);
  assert.match(html, /Current capabilities/);
  assert.match(html, /Make it simple/);
  assert.match(html, /Serious hardware tools should not be out of reach/);
  assert.match(html, /Iker Garcia Morales/);
  assert.doesNotMatch(html, /github\.com\/ikeermora\/simple-silicon/i);
  assert.doesNotMatch(html, /codex-preview|Starter Project|react-loading-skeleton/i);
  assert.doesNotMatch(html, /href="#/i);
  assert.match(html, /data-scroll-target="top"/);
  assert.match(html, /data-scroll-target="product"/);
  assert.match(html, /data-scroll-target="vision"/);
});

test("includes the public product media and identity assets", async () => {
  await Promise.all([
    access(new URL("product/editor-1600.webp", outputRoot)),
    access(new URL("product/waveforms-1600.webp", outputRoot)),
    access(new URL("product/rtl-1600.webp", outputRoot)),
    access(new URL("product/rtl-register-1600.webp", outputRoot)),
    access(new URL("product/rtl-alu-1600.webp", outputRoot)),
    access(new URL("product/rtl-control-1600.webp", outputRoot)),
    access(new URL("favicon.png", outputRoot)),
    access(new URL("og-v2.png", outputRoot)),
  ]);
});

test("keeps local development and builds rooted at slash", async () => {
  const html = await readFile(new URL("index.html", outputRoot), "utf8");

  assert.match(html, /(?:href|src)="\/_next\//);
  assert.match(html, /src="\/product\/waveforms-1600\.webp"/);
  assert.match(html, /href="\/favicon\.png"/);
  assert.doesNotMatch(html, /\/simplesilicon\//);
  assert.doesNotMatch(html, /\/simple-silicon\//);
});
