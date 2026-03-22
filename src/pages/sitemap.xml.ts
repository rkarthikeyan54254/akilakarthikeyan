import { getCollection } from 'astro:content';
import { supabase } from '../lib/supabase';

const SITE_URL = 'https://akilakarthikeyan.com';

export async function GET() {
  // 1. Fetch all static content
  const stories = await getCollection('stories');
  const books = await getCollection('books');

  // 2. Fetch all dynamic content from Supabase
  let dynamicStories = [];
  try {
    const { data } = await supabase
      .from('stories')
      .select('slug, published_at')
      .order('published_at', { ascending: false });
    if (data) dynamicStories = data;
  } catch (e) {
    console.error("Sitemap: Error fetching dynamic stories", e);
  }

  // 3. Define static pages
  const staticPages = [
    '',
    '/about',
    '/stories',
    '/books'
  ];

  // 4. Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
    <url>
      <loc>${SITE_URL}${page}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`).join('')}
  ${stories.map(story => `
    <url>
      <loc>${SITE_URL}/stories/${story.slug}</loc>
      <lastmod>${story.data.publishDate.toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>`).join('')}
  ${books.map(book => `
    <url>
      <loc>${SITE_URL}/books/${book.slug}</loc>
      <lastmod>${book.data.publishDate.toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>`).join('')}
  ${dynamicStories.map(story => `
    <url>
      <loc>${SITE_URL}/stories/${story.slug}</loc>
      <lastmod>${new Date(story.published_at).toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>`).join('')}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}
