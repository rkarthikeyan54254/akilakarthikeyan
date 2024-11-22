import { query } from './db';

export interface Comment {
  id?: number;
  storySlug: string;
  name: string;
  comment: string;
  date: string;
}

export async function getComments(storySlug: string): Promise<Comment[]> {
  try {
    return await query(
      'SELECT * FROM comments WHERE story_slug = ? ORDER BY date DESC',
      [storySlug]
    );
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}

export async function addComment(comment: Omit<Comment, 'id'>) {
  try {
    return await query(
      'INSERT INTO comments (story_slug, name, comment, date) VALUES (?, ?, ?, ?)',
      [comment.storySlug, comment.name, comment.comment, comment.date]
    );
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}

export async function getFeaturedReviews(limit = 10) {
  try {
    return await query(`
      SELECT 
        c.*,
        s.title as storyTitle,
        s.slug as storySlug
      FROM comments c
      JOIN stories s ON s.slug = c.story_slug
      ORDER BY c.date DESC
      LIMIT ?
    `, [limit]);
  } catch (error) {
    console.error('Error fetching featured reviews:', error);
    throw error;
  }
}