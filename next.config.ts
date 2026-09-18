import type { NextConfig } from "next";
import { seasons } from "./src/lib/seasons-slugs";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 80],
    formats: ["image/avif", "image/webp"],
  },
  // Redirecciones 301 desde las URLs del sitio anterior en WordPress (conservan el SEO).
  async redirects() {
    return [
      { source: "/el-shaddaimzi", destination: "/", permanent: true },
      { source: "/tienda-en-linea", destination: "/temporadas", permanent: true },
      ...seasons.map((s) => ({ source: `/${s.legacySlug}`, destination: `/temporadas/${s.slug}`, permanent: true })),
    ];
  },
};

export default nextConfig;
