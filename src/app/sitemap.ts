import type { MetadataRoute } from "next";

import { POSTPARTUM_GUIDES } from "@/data/guide-data";

const SITE_URL = "https://babyjamjam.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const primaryRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/postpartum-care`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/pricing`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/locations`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const guideRoutes: MetadataRoute.Sitemap = POSTPARTUM_GUIDES.map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}`,
    lastModified: new Date(guide.reviewedAt),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...primaryRoutes, ...guideRoutes];
}
