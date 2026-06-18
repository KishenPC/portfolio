import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    config.externals.push("@node-rs/canvas");
    if (isServer) {
      config.externals.push("coffee-script");
      config.externals.push("toml");
    }
    return config;
  },
};

export default nextConfig;