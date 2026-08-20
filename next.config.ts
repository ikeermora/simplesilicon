import type { NextConfig } from "next";

const basePath = process.env.GITHUB_PAGES === "true" ? "/simple-silicon" : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_SITE_BASE: basePath,
  },
};

export default nextConfig;
