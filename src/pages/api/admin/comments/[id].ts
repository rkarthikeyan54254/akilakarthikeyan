import type { APIRoute } from 'astro';
import { isAdmin } from '../../../../lib/auth';
import { query } from '../../../../lib/db';

export const DELETE: APIRoute = async ({ request, params }) => {
  try {
    // Verify admin authentication
    if (!await isAdmin(request)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401
      });
    }

    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ error: 'Comment ID is required' }), {
        status: 400
      });
    }

    await query('DELETE FROM comments WHERE id = ?', [id]);
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete comment' }), {
      status: 500
    });
  }
};