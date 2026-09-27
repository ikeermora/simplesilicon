const DEFAULT_GITHUB_REPOSITORY = "ikeermora/simplesilicon";

export function getGitHubPagesConfig(environment = process.env) {
  const repository = environment.GITHUB_REPOSITORY ?? DEFAULT_GITHUB_REPOSITORY;
  const [owner, project, ...unexpected] = repository.split("/");

  if (!owner || !project || unexpected.length > 0) {
    throw new Error(`Invalid GITHUB_REPOSITORY value: ${repository}`);
  }

  const enabled = environment.GITHUB_PAGES === "true";
  const basePath = enabled ? `/${project}` : "";

  return {
    enabled,
    owner,
    project,
    repository,
    basePath,
    siteUrl: enabled
      ? `https://${owner}.github.io${basePath}`
      : "http://localhost:3000",
  };
}
