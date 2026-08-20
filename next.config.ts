import type { NextConfig } from "next";
import { getGitHubPagesConfig } from "./github-pages.config.mjs";

const { basePath, siteUrl } = getGitHubPagesConfig();

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_SITE_BASE: basePath,
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
};

export default nextConfig;
