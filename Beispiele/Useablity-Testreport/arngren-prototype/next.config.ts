import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "arngren.net",
      },
      {
        protocol: "http",
        hostname: "arngren.net",
      },
    ],
  },
};

export default nextConfig;
