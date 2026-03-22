# அகிலா கார்த்திகேயன் (Akilakarthikeyan.com)

அகிலா கார்த்திகேயனின் நகைச்சுவை மற்றும் ஆன்மீகச் சிறுகதைகளின் அதிகாரப்பூர்வ இணையதளம்.

The official website of Akila Karthikeyan, featuring a collection of humorous and spiritual Tamil short stories, books, and audio narrations.

## 🚀 Features

- **Hybrid Story Management**: 
  - **Static Stories**: 60+ curated stories managed via MDX files in the `src/content/stories` directory.
  - **Dynamic Stories**: Real-time story management powered by Supabase for quick updates and blog-style posts.
- **Book Collection**: Dedicated section for full-length books, integrated into the main story feed for discoverability.
- **Audio Integration**: Audio slider and embedded players for stories with narrations.
- **Interactive Search**: Real-time filtering by title, description, and genre.
- **Genre-based Navigation**: Specialized pages for நகைச்சுவை (Humor), ஆன்மீகம் (Spiritual), சமூகம் (Social), etc.
- **Social Sharing**: Optimized Open Graph (OG) metadata for rich previews on WhatsApp, Facebook, and Twitter.
- **Admin Dashboard**: Secure management interface to add, edit, and manage dynamic stories.
- **Comment System**: Community engagement via a moderated comment system linked to Supabase.
- **Responsive Design**: Mobile-first, elegant UI designed for comfortable reading in Tamil (using Mukta Malar font).

## 🛠️ Technology Stack

- **Framework**: [Astro 4.x](https://astro.build/) (Server-Side Rendering)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with Typography plugin
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Deployment**: [Netlify](https://www.netlify.com/)
- **Content**: MDX (Markdown for the Component Era)
- **Icons**: Font Awesome 6
- **Typography**: Google Fonts (Mukta Malar)

## 📁 Project Structure

```text
akilakarthikeyan/
├── public/                 # Static assets (images, audio, icons)
├── scripts/                # Utility scripts for DB migration and slug management
├── src/
│   ├── components/         # Reusable UI components (StoryCard, AudioSlider, etc.)
│   ├── content/
│   │   ├── stories/        # Static .mdx story files
│   │   └── books/          # Static .mdx book files
│   ├── layouts/            # Base layouts (OG tags, Navbar, Footer)
│   ├── lib/                # Supabase client and utility functions
│   └── pages/              # Routing (Home, Stories, Books, Admin, API)
├── astro.config.mjs        # Astro configuration
└── tailwind.config.mjs     # Tailwind configuration
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Supabase Project (for dynamic content and comments)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd akilakarthikeyan
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory:
   ```env
   PUBLIC_SUPABASE_URL=your_supabase_url
   PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start Development Server:
   ```bash
   npm run dev
   ```

5. Build for Production:
   ```bash
   npm run build
   ```

## 📜 Content Management

### Adding a Static Story
1. Create a new `.mdx` file in `src/content/stories/`.
2. Add the required frontmatter:
   ```yaml
   ---
   title: 'Story Title'
   author: 'அகிலா கார்த்திகேயன்'
   publishDate: YYYY-MM-DD
   description: 'Brief summary...'
   genre: 'நகைச்சுவை'
   image: '/images/your-image.jpg'
   featured: true
   ---
   ```

### Managing Dynamic Stories
Access the `/admin` route (requires Supabase authentication) to add or edit stories directly through the browser.

## 📄 License

© 2024 அகிலா கார்த்திகேயன். All Rights Reserved.
