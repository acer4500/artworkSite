import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
        permanent: false,
      },
    ];
  },
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      modules: [
        path.resolve(__dirname, "node_modules"),
        ...(config.resolve?.modules ?? ["node_modules"]),
      ],
    };
    return config;
  },
};

export default nextConfig;
