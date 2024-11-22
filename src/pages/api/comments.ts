import { getCollection } from 'astro:content';
import { addComment, getComments } from '../../lib/comments';

export async function GET({ request }) {
  const url = new URL(request.url);
  const storySlug = url.searchParams.get('storySlug');

  if (!storySlug) {
    return new Response(JSON.stringify({ error: 'Story slug is required' }), {
      status: 400
    });
  }

  try {
    const comments = await getComments(storySlug);
    return new Response(JSON.stringify(comments), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch comments' }), {
      status: 500
    });
  }
}

export async function POST({ request }) {
  try {
    const comment = await request.json();
    
    // Validate required fields
    if (!comment.storySlug || !comment.name || !comment.comment) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400
      });
    }

    await addComment(comment);
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    return new Response(JSON.stringify({ error: 'Failed to add comment' }), {
      status: 500
    });
  }
}