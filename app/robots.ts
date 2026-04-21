import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/auth/", "/dashboard/", "/settings/"],
    },
    sitemap: "https://bubble-swart-chi.vercel.app",
  };
}
