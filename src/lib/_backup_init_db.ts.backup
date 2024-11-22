import { getCollection } from 'astro:content';
import { initializeStoryData } from './db';

export async function initializeDatabase() {
  try {
    console.log('Initializing database...');
    const stories = await getCollection('stories');
    await initializeStoryData(stories);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}