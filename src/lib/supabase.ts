
import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Provide fallback values for development if environment variables are not set
// NOTE: In production, you must set the actual environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase credentials. Using development fallbacks or the app might not work correctly.');
}

// Create Supabase client
const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);

export default supabase;
