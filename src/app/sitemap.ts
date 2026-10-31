import type { MetadataRoute } from "next";
import { absoluteUrl, routes } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...routes.map((r) => r.href), "/rezerwacja"];
  return paths.map((path) => ({
    url: absoluteUrl(path === "/" ? "/" : `${path}/`),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
