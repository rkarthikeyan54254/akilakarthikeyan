import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://akilakarthikeyan.com', // Replace with your actual domain
  integrations: [
    mdx(),
    tailwind(),
    // Correct way to add the astro:assets integration
    { name: 'astro:assets' },
  ],
  i18n: {
    defaultLocale: 'ta',
    locales: ['ta'],
  }
});

