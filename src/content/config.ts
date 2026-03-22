import { defineCollection, z } from 'astro:content';

const stories = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    publishDate: z.date(),
    description: z.string(),
    featured: z.boolean().default(false),
    genre: z.enum(['நகைச்சுவை', 'நாடகம்', 'ஆன்மீகம்', 'சமூகம்', 'அனுபவம்', 'குடும்பம்', 'ஆன்மிகம்']),
    image: z.string().optional(),
    audio_url: z.string().optional(),
    tags: z.array(z.string()).default([]),
    layout: z.string().optional(),
  }),
});

const books = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    publishDate: z.date(),
    description: z.string(),
    coverImage: z.string(),
    price: z.string().optional(),
    pages: z.number().optional(),
    isbn: z.string().optional(),
    genre: z.enum(['நகைச்சுவை', 'நாடகம்', 'ஆன்மீகம்', 'சமூகம்', 'அனுபவம்', 'குடும்பம்', 'ஆன்மிகம்']),
    featured: z.boolean().default(false),
    inStock: z.boolean().default(true),
    tags: z.array(z.string()).default([]),
    pdfUrl: z.string().optional(),
  }),
});

export const collections = {
  'stories': stories,
  'books': books,
};