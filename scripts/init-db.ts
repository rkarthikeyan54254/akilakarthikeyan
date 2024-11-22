import { initDb, run } from '../src/lib/db';
import bcrypt from 'bcryptjs';

const sampleStories = [
  {
    slug: 'ithu-karthikeyan-kathal',
    title: 'இது கார்த்திகேயன் காதல்',
    description: 'கத்தரிக்காய்க்கு காலும் கையும் முளைத்ததுபோல இருக்கும் மூன்று, நான்கு வயதுக்காரர்களே காதல் செய்யும் வசதி வாய்ப்புகள்...',
    content: `கத்தரிக்காய்க்கு காலும் கையும் முளைத்ததுபோல இருக்கும் மூன்று, நான்கு வயதுக்காரர்களே காதல் செய்யும் வசதி வாய்ப்புகள் இப்போது பெருகியிருப்பது என் போன்ற பெரிசுகளை பெருமூச்சு விடச்செய்துள்ளது...`,
    author: 'அகிலா கார்த்திகேயன்',
    publish_date: '2024-03-20',
    genre: 'நகைச்சுவை',
    featured: 1
  },
  {
    slug: 'kaligaala-kaadhu',
    title: 'கலிகால காது',
    description: 'கிருத, த்ரேதா, த்வாபர யுகங்களில் இந்த காது எனும் செவி எந்த ரிஷியின் ரகசிய உபதேச மந்திரங்களை ஒட்டுகேட்டுத் தொலைத்து சாபம் வாங்கிக் கட்டிக் கொண்டதோ...',
    content: `கிருத, த்ரேதா, த்வாபர யுகங்களில் இந்த காது எனும் செவி எந்த ரிஷியின் ரகசிய உபதேச மந்திரங்களை ஒட்டுகேட்டுத் தொலைத்து சாபம் வாங்கிக் கட்டிக் கொண்டதோ தெரியவில்லை...`,
    author: 'அகிலா கார்த்திகேயன்',
    publish_date: '2024-03-21',
    genre: 'நகைச்சுவை',
    featured: 1
  },
  {
    slug: 'vetti-seiyum-looti',
    title: 'வேட்டி செய்யும் லூட்டி',
    description: 'வேட்டிக் கட்டிக்கொண்டு வரக்கூடாதென்று ஏதோ ஒரு கிளப் கிளப்பிவிட்டதில் அதைப் பற்றி பலவிதமான அபிப்பிராயங்கள் கிளம்பியிருப்பதைப் பற்றி...',
    content: `வேட்டிக் கட்டிக்கொண்டு வரக்கூடாதென்று ஏதோ ஒரு 'கிளப்' கிளப்பிவிட்டதில் அதைப் பற்றி பலவிதமான அபிப்பிராயங்கள் கிளம்பியிருப்பதைப் பற்றி நான் ஏதும் அபிப்பிராயம் சொல்ல வரவில்லை...`,
    author: 'அகிலா கார்த்திகேயன்',
    publish_date: '2024-03-22',
    genre: 'நகைச்சுவை',
    featured: 1
  }
];

async function initializeDatabase() {
  try {
    console.log('Initializing database...');
    
    // Initialize database tables
    initDb();

    // Create default admin user if none exists
    const defaultAdmin = {
      username: 'admin',
      password: 'admin123' // Change this in production
    };

    const adminCount = run('SELECT COUNT(*) as count FROM admins')[0]?.count;
    
    if (!adminCount) {
      const hashedPassword = await bcrypt.hash(defaultAdmin.password, 10);
      run(
        'INSERT INTO admins (username, password) VALUES (?, ?)',
        [defaultAdmin.username, hashedPassword]
      );
      
      console.log('Default admin user created');
      console.log('Username:', defaultAdmin.username);
      console.log('Password:', defaultAdmin.password);
    }

    // Import sample stories
    for (const story of sampleStories) {
      run(`
        INSERT OR REPLACE INTO stories (
          slug, title, description, content, author, 
          publish_date, genre, featured
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        story.slug,
        story.title,
        story.description,
        story.content,
        story.author,
        story.publish_date,
        story.genre,
        story.featured
      ]);
    }

    console.log(`Imported ${sampleStories.length} stories`);
    console.log('Database initialized successfully');

  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();