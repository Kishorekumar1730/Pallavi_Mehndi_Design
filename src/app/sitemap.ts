import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pallavi-mehndi-artistry.netlify.app';

  // Base static public pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/enquire`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  try {
    // Dynamic published services
    const services = await prisma.service.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    });

    const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
      url: `${baseUrl}/services#${s.slug}`,
      lastModified: s.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    return [...staticRoutes, ...serviceRoutes];
  } catch {
    return staticRoutes;
  }
}

