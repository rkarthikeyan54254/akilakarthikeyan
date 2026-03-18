import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const GET: APIRoute = async ({ url }) => {
  const storySlug = url.searchParams.get('story');

  if (!storySlug) {
    return new Response(JSON.stringify({ error: 'Story slug required' }), { status: 400 });
  }

  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('story_slug', storySlug)
    .order('created_at', { ascending: false });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { story_slug, author_name, content } = body;

    if (!story_slug || !author_name || !content) {
      return new Response(JSON.stringify({ error: 'All fields required' }), { status: 400 });
    }

    const { data, error } = await supabase
      .from('comments')
      .insert([{ story_slug, author_name, content }])
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: 'Comment submitted successfully' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }
};
