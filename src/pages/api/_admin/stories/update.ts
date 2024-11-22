import type { APIRoute } from 'astro';
import { isAdmin } from '../../../../lib/auth';
import { query } from '../../../../lib/db';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Verify admin authentication
    if (!await isAdmin(request)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401
      });
    }

    const { slug, title, description, content } = await request.json();
    
    await query(`
      UPDATE stories 
      SET title = ?, description = ?, content = ?
      WHERE slug = ?
    `, [title, description, content, slug]);
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error updating story:', error);
    return new Response(JSON.stringify({ error: 'Failed to update story' }), {
      status: 500
    });
  }
};