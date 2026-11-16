// Static export served from GitHub Pages at the custom domain ajaysahuphysics.com
// (public/CNAME), so production builds use no basePath.
// GH_PAGES_PREVIEW=true is an optional switch, not set by any workflow, for building
// the site under the github.io project URL, which needs the /ajaysahuphysics-next basePath.
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
