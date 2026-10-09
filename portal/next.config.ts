import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    // 統合したカテゴリの旧URL
    return [
      { source: "/category/tele-appointment", destination: "/category/sales-outsourcing", permanent: true },
      // 旧URL（vercel.app）から正式ドメインへ
      { source: "/:path*", has: [{ type: "host", value: "seika-hoshu-navi.vercel.app" }], destination: "https://seika-hoshu-navi.tyokikaku.co.jp/:path*", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
