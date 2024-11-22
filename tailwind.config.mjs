/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        tamil: ['Mukta Malar', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            'max-width': '65ch',
            color: '#333',
            strong: {
              color: '#333',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}