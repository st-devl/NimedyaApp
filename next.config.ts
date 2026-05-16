import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    localPatterns: [
      { pathname: "/uploads/**" },
      { pathname: "/images/**" },
    ],
  },
};

export default nextConfig;
