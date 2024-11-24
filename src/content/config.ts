import { defineCollection, z } from 'astro:content';

const stories = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    publishDate: z.date(),
    description: z.string(),
    featured: z.boolean().default(false),
    genre: z.enum(['நகைச்சுவை', 'நாடகம்', 'ஆன்மீகம்', 'சமூகம்', 'அனுபவம்']),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    layout: z.string().optional(),
  }),
});

export const collections = {
  'stories': stories,
};