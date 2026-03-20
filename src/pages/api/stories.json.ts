import { getCollection } from 'astro:content';
import { supabase } from '../../lib/supabase';

export async function GET() {
  // 1. Fetch Static Stories
  const staticStories = await getCollection('stories');
  const storiesData = staticStories.map(story => ({
    title: story.data.title,
    description: story.data.description,
    slug: story.slug,
    genre: story.data.genre,
    type: 'story',
    url: `/stories/${story.slug}`,
    publishDate: story.data.publishDate.toISOString()
  }));

  // 2. Fetch Dynamic Stories from Supabase
  let dynamicStoriesData = [];
  try {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .order('published_at', { ascending: false });
    
    if (!error && data) {
      dynamicStoriesData = data.map(s => ({
        title: s.title,
        description: s.excerpt || '',
        slug: s.slug,
        genre: s.genre,
        type: 'story',
        url: `/stories/${s.slug}`,
        publishDate: new Date(s.published_at).toISOString()
      }));
    }
  } catch (e) {
    console.error("Error fetching dynamic stories for API:", e);
  }

  // 3. Fetch Books
  const books = await getCollection('books');
  const booksData = books.map(book => ({
    title: book.data.title,
    description: book.data.description,
    slug: book.slug,
    type: 'book',
    url: `/books/${book.slug}`,
    publishDate: book.data.publishDate.toISOString()
  }));

  const allData = [...storiesData, ...dynamicStoriesData, ...booksData].sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  return new Response(JSON.stringify(allData), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  });
}
