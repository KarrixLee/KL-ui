import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "github.com",
      },
    ],
  },
};

export default nextConfig;
