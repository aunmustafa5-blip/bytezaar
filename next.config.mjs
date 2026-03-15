/** @type {import('next').NextConfig} */

// Use an environment variable to define the base path for GitHub Pages
// Or detect if running in GitHub Actions CI
const isGithubActions = process.env.GITHUB_ACTIONS || false;
const repoName = 'bytezaar';
const basePath = isGithubActions ? `/${repoName}` : '';

const nextConfig = {
  output: 'export',
  basePath: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
