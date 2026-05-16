import type { MetadataRoute } from "next";

const BASE = "https://parabreak.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${BASE}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${BASE}/`,
          ko: `${BASE}/ko`,
          ja: `${BASE}/ja`,
        },
      },
    },
    {
      url: `${BASE}/ko`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/ja`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
