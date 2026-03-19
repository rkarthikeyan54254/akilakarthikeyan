import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Only initialize if we have credentials, otherwise return a dummy to avoid crashing the build
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : { 
      from: () => ({ 
        select: () => ({ eq: () => ({ eq: () => ({ order: () => Promise.resolve({ data: [], error: null }) }) }) }),
        insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase credentials missing' } }) }) })
      }),
      auth: {
        signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase credentials missing' } }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        signOut: () => Promise.resolve({ error: null })
      },
      storage: {
        from: () => ({
          upload: () => Promise.resolve({ data: null, error: { message: 'Supabase credentials missing' } }),
          getPublicUrl: () => ({ data: { publicUrl: '' } })
        })
      }
    } as any;

export interface Comment {
  id: string;
  story_slug: string;
  author_name: string;
  content: string;
  created_at: string;
  approved: boolean;
}
