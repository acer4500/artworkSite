import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Next.js 16 runs `next build` with Turbopack and rejects a webpack hook
  // unless this key is set. `npm run build` still passes `--webpack`.
  turbopack: {},
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
