import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kxphoznrobfllizynxdz.supabase.co';
const supabaseAnonKey = 'sb_publishable_QmSTc6spHLelktYQWvNedg_wizN1oeo';
// Note: In a real migration you might need a service role key if RLS prevents updates, 
// but here the Auth Update policy allows 'authenticated' users. 
// Since this is a script, we'll assume the environment has what it needs or the user will provide a key.

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const slugMapping = {
  'பொய்யும்-மெய்யும்': 'poiyum-meiyum',
  'கோவிந்தனும்-கொரோனாவும்': 'govindhanum-coranavum',
  'உஞ்சவிர்த்தி-எனும்-உன்னதம்': 'unjavarthi-enum-unnadham',
  'உயிர்கொண்டு-போம்பொழுது': 'uyirkondu-pogumpothu',
  'அமேசான்-காட்டில்-குணாவும்-ட்ரம்பும்': 'amazon-kaatil-gunavum-trumpum'
};

async function migrateSlugs() {
  console.log('Starting slug migration...');
  
  for (const [oldSlug, newSlug] of Object.entries(slugMapping)) {
    console.log(`\nMigrating "${oldSlug}" to "${newSlug}"...`);
    
    // 1. Update Stories Table
    const { error: storyError } = await supabase
      .from('stories')
      .update({ slug: newSlug })
      .eq('slug', oldSlug);
      
    if (storyError) {
      console.error(`Error migrating story ${oldSlug}:`, storyError.message);
    } else {
      console.log(`Successfully migrated story: ${oldSlug} -> ${newSlug}`);
      
      // 2. Update Comments Table
      const { error: commentError } = await supabase
        .from('comments')
        .update({ story_slug: newSlug })
        .eq('story_slug', oldSlug);
        
      if (commentError) {
        console.error(`Error migrating comments for ${oldSlug}:`, commentError.message);
      } else {
        console.log(`Successfully migrated related comments.`);
      }
    }
  }
  
  console.log('\nMigration finished.');
}

migrateSlugs();
