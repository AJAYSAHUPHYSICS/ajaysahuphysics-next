// PREVIEW PHASE: this repo currently deploys to https://ajaysahuphysics.github.io/ajaysahuphysics-next/
// which needs a basePath. When ready to switch the live ajaysahuphysics.com domain to this repo,
// remove the GH_PAGES_PREVIEW env var from .github/workflows/deploy.yml (no other change needed)
// and add a public/CNAME file containing "ajaysahuphysics.com".
import type { NextConfig } from "next";

const isGhPagesPreview = process.env.GH_PAGES_PREVIEW === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: isGhPagesPreview ? "/ajaysahuphysics-next" : "",
};

export default nextConfig;
