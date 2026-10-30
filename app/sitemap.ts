
import type { MetadataRoute } from 'next';
import { blogPosts } from './lib/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return [
    {
      url: `${siteUrl}/blog`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      changeFrequency: 'monthly' as const,
      priority: post.featured ? 0.9 : 0.7,
    })),
  ];
}
