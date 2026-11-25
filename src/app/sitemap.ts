import type { MetadataRoute } from "next";
import { SERVICES, SITE_URL } from "@/lib/constants";
import { INDUSTRIES } from "@/lib/industries";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/features`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/why-lion-switch`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/mcp`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/live-dashboard`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/industries`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/switching`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/bill-review`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/support`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/holiday-preferences`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const industryRoutes: MetadataRoute.Sitemap = INDUSTRIES.map((i) => ({
    url: `${SITE_URL}/industries/${i.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes];
}
