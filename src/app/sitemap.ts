import type { MetadataRoute } from "next";
import { restaurant } from "@/content/restaurant";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: restaurant.site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
