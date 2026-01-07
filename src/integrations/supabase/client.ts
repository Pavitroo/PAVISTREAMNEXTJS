import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ejultgheslzyrobaadrj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_NJ6bj9LyNJBeSG3HiUxKpw_AY_x4sVa";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
