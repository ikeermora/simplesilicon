const DEFAULT_GITHUB_REPOSITORY = "ikeermora/simplesilicon";

export function getGitHubPagesConfig(environment = process.env) {
  const repository = environment.GITHUB_REPOSITORY ?? DEFAULT_GITHUB_REPOSITORY;
  const [owner, project, ...unexpected] = repository.split("/");

  if (!owner || !project || unexpected.length > 0) {
    throw new Error(`Invalid GITHUB_REPOSITORY value: ${repository}`);
  }

  const enabled = environment.GITHUB_PAGES === "true";
  const customDomain = environment.PAGES_CUSTOM_DOMAIN?.trim();
  if (customDomain && !/^[a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,}$/i.test(customDomain)) {
    throw new Error(`Invalid PAGES_CUSTOM_DOMAIN: ${customDomain}`);
  }
  const basePath = enabled && !customDomain ? `/${project}` : "";

  return {
    enabled,
    owner,
    project,
    repository,
    basePath,
    customDomain,
    siteUrl: enabled
      ? customDomain ? `https://${customDomain}` : `https://${owner}.github.io${basePath}`
      : "http://localhost:3000",
  };
}
