import type { NextConfig } from "next";
import path from "path";

/**
 * Security headers for the public site and the Tina admin.
 *
 * `headers()` is baked in at build time, so this cannot mint a per-request
 * nonce. A nonce policy would also force these static pages to render
 * dynamically (see the Next.js CSP guide). Next.js emits inline bootstrap
 * scripts, and the Tina admin HTML (`@tinacms/app/index.html`) contains an
 * inline loader. Both UIs set style attributes. script-src and style-src
 * therefore allow 'unsafe-inline'. In development only, webpack and the Tina
 * dev server also need 'unsafe-eval' and localhost.
 *
 * The two source patterns are disjoint, so a response gets one CSP. The public
 * site does not call Tina. `/admin` does.
 *
 * frame-ancestors: `@tinacms/app` registers a same-origin preview iframe
 * (`#tina-iframe`, route `/~/*`; `getPreviewOrigin()` is this origin). Public
 * pages allow 'self' so that iframe can render, and still refuse every other
 * origin. Collections here do not set `ui.router`, so the form editor is the
 * default and does not open the iframe. The admin document itself is not
 * embedded, so it sends 'none'. X-Frame-Options matches each policy.
 *
 * Hosts are the ones this install actually calls (tinacms 3.14) plus the Tina
 * CSP guide (https://tina.io/docs/guides/csp-configuration):
 * identity.tinajs.io, identity-v2.tinajs.io (PostHog token at
 * /v2/posthog-token), content.tinajs.io, assets.tinajs.io,
 * s3.us-east-1.amazonaws.com, us.i.posthog.com, us-assets.i.posthog.com,
 * assets.tina.io. FontLoader injects fonts.googleapis.com, which pulls
 * fonts.gstatic.com. The admin bundle is emitted under /admin/assets; it is
 * not loaded from tinajs.io. The optional raw MDX editor fetches Monaco from
 * cdn.jsdelivr.net and is not allowed here.
 *
 * Vercel already sends Strict-Transport-Security. This config does not set it.
 */
const isDev = process.env.NODE_ENV !== "production";

const devScriptSources = isDev ? ["'unsafe-eval'", "http://localhost:*"] : [];
const devStyleSources = isDev ? ["http://localhost:*"] : [];
const devConnectSources = isDev
  ? ["http://localhost:*", "ws://localhost:*"]
  : [];

const permissionsPolicy = [
  "accelerometer=()",
  "autoplay=()",
  "camera=()",
  "display-capture=()",
  "encrypted-media=()",
  "fullscreen=()",
  "geolocation=()",
  "gyroscope=()",
  "magnetometer=()",
  "microphone=()",
  "midi=()",
  "payment=()",
  "picture-in-picture=()",
  "publickey-credentials-get=()",
  "screen-wake-lock=()",
  "usb=()",
  "xr-spatial-tracking=()",
  "browsing-topics=()",
].join(", ");

function directive(name: string, sources: string[]): string {
  return `${name} ${sources.join(" ")}`;
}

function publicContentSecurityPolicy(): string {
  return [
    directive("default-src", ["'self'"]),
    directive("script-src", ["'self'", "'unsafe-inline'", ...devScriptSources]),
    directive("style-src", ["'self'", "'unsafe-inline'", ...devStyleSources]),
    directive("img-src", ["'self'", "blob:", "data:"]),
    directive("font-src", ["'self'"]),
    directive("connect-src", ["'self'", ...devConnectSources]),
    directive("object-src", ["'none'"]),
    directive("base-uri", ["'self'"]),
    directive("form-action", ["'self'"]),
    directive("frame-ancestors", ["'self'"]),
    directive("frame-src", ["'none'"]),
    isDev ? "" : "upgrade-insecure-requests",
  ]
    .filter(Boolean)
    .join("; ");
}

function adminContentSecurityPolicy(): string {
  return [
    directive("default-src", ["'self'"]),
    directive("script-src", ["'self'", "'unsafe-inline'", ...devScriptSources]),
    directive("style-src", [
      "'self'",
      "'unsafe-inline'",
      "https://fonts.googleapis.com",
      ...devStyleSources,
    ]),
    directive("img-src", [
      "'self'",
      "blob:",
      "data:",
      "https://assets.tina.io",
      "https://assets.tinajs.io",
    ]),
    directive("font-src", ["'self'", "data:", "https://fonts.gstatic.com"]),
    directive("connect-src", [
      "'self'",
      "https://identity.tinajs.io",
      "https://identity-v2.tinajs.io",
      "https://content.tinajs.io",
      "https://assets.tinajs.io",
      "https://assets.tina.io",
      "https://s3.us-east-1.amazonaws.com",
      "https://us.i.posthog.com",
      "https://us-assets.i.posthog.com",
      ...devConnectSources,
    ]),
    directive("object-src", ["'none'"]),
    directive("base-uri", ["'self'"]),
    directive("form-action", ["'self'"]),
    directive("frame-ancestors", ["'none'"]),
    directive("frame-src", ["'self'"]),
    directive("worker-src", ["'self'", "blob:"]),
    isDev ? "" : "upgrade-insecure-requests",
  ]
    .filter(Boolean)
    .join("; ");
}

function securityHeaders(contentSecurityPolicy: string, frameOptions: string) {
  return [
    { key: "Content-Security-Policy", value: contentSecurityPolicy },
    { key: "X-Frame-Options", value: frameOptions },
    { key: "X-Content-Type-Options", value: "nosniff" },
    {
      key: "Referrer-Policy",
      value: "strict-origin-when-cross-origin",
    },
    { key: "Permissions-Policy", value: permissionsPolicy },
  ];
}

const nextConfig: NextConfig = {
  // Next.js 16 runs `next build` with Turbopack and rejects a webpack hook
  // unless this key is set. `npm run build` still passes `--webpack`.
  turbopack: {},
  outputFileTracingRoot: path.join(__dirname),
  // Next.js 16 runs `next build` with Turbopack and refuses to start when a
  // webpack hook is present unless Turbopack is acknowledged. `npm run build`
  // still passes `--webpack`.
  turbopack: {},
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        // `/admin`, `/admin/index.html`, and `/admin/assets/*`.
        source: "/admin/:path*",
        headers: securityHeaders(adminContentSecurityPolicy(), "DENY"),
      },
      {
        // Everything except paths that start with /admin.
        source: "/((?!admin).*)",
        headers: securityHeaders(publicContentSecurityPolicy(), "SAMEORIGIN"),
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
