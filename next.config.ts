import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Hostinger CDN was caching HTML for a year while static chunk hashes
  // change on every deploy — that leaves private/incognito tabs with
  // HTML that points at 404 CSS/JS and the site looks unstyled.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/video/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        // Threadless Godot 4 Web export — no COOP/COEP. If you turn on
        // variant/thread_support, add Cross-Origin-Opener-Policy: same-origin
        // and Cross-Origin-Embedder-Policy: require-corp here and on /demo.
        source: "/game/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
