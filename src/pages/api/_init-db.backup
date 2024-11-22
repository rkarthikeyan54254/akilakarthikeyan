import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { initializeStoryData } from '../../lib/db';

export const GET: APIRoute = async () => {
  try {
    const stories = await getCollection('stories');
    await initializeStoryData(stories);
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error initializing database:', error);
    return new Response(JSON.stringify({ error: 'Failed to initialize database' }), {
      status: 500
    });
  }
};