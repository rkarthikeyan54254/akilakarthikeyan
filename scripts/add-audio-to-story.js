import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kxphoznrobfllizynxdz.supabase.co';
const supabaseAnonKey = 'sb_publishable_QmSTc6spHLelktYQWvNedg_wizN1oeo';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function updateAudioUrl() {
  const storySlug = 'kali-kaalam';
  const audioUrl = '/audio/kali-kaalam.mp3';

  console.log(`Updating audio_url for "${storySlug}"...`);
  
  // Note: Using RPC or executing SQL directly through createClient is usually disabled 
  // for Anon Key due to security. But since we need to update data, let's just 
  // try the update again. If the previous error was "schema cache", 
  // sometimes it takes a minute or needs a refresh.
  
  const { data, error } = await supabase
    .from('stories')
    .update({ audio_url: audioUrl })
    .eq('slug', storySlug);
  
  if (error) {
    if (error.message.includes("Could not find the 'audio_url' column")) {
        console.error('ERROR: The "audio_url" column does not exist in your Supabase table.');
        console.log('Please go to Supabase Dashboard -> SQL Editor and run:');
        console.log('ALTER TABLE stories ADD COLUMN IF NOT EXISTS audio_url text;');
    } else {
        console.error('Error updating story:', error.message);
    }
  } else {
    console.log('Successfully updated audio_url!');
  }
}

updateAudioUrl();
