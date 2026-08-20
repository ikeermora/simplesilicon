import { existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const pagesDirectory = resolve("dist/client");

if (!existsSync(pagesDirectory)) {
  throw new Error("Static Pages output was not created at dist/client.");
}

writeFileSync(resolve(pagesDirectory, ".nojekyll"), "");
