import { getCollection } from 'astro:content';

export async function GET() {
  const stories = await getCollection('stories');
  
  const storiesData = stories.map(story => ({
    title: story.data.title,
    description: story.data.description,
    slug: story.slug,
    genre: story.data.genre,
    publishDate: story.data.publishDate.toISOString()
  }));

  return new Response(JSON.stringify(storiesData), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=3600'
    }
  });
}