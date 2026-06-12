import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  options: {
    mdxRs: true,
  },
});

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "mdx"],
};

export default withMDX(nextConfig);
