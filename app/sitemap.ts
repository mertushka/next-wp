import { MetadataRoute } from "next";
import { getAllPages, getAllPosts } from "@/lib/wordpress";
import { siteConfig } from "@/site.config";
import { Page, Post } from "@/lib/wordpress.d";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const pages = await getAllPages();

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.site_domain}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${siteConfig.site_domain}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteConfig.site_domain}/blog/yazarlar`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.site_domain}/blog/kategoriler`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.site_domain}/blog/etiketler`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const postUrls: MetadataRoute.Sitemap = posts.map((post: Post) => ({
    url: `${siteConfig.site_domain}/blog/${post.slug}`,
    lastModified: new Date(post.modified),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const pageUrls: MetadataRoute.Sitemap = pages.map((page: Page) => ({
    url: `${siteConfig.site_domain}/${page.slug}`,
    lastModified: new Date(page.modified),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticUrls, ...pageUrls, ...postUrls];
}
