import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Standard client for use in both Client and Server components
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Admin client for backend operations only.
 * This is wrapped in a function to prevent it from initializing in the browser
 * where the service role key is unavailable.
 */
export const getSupabaseAdmin = () => {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing from environment variables.");
  }
  
  return createClient(supabaseUrl, serviceKey);
};

// For backward compatibility in existing API routes
export const supabaseAdmin = typeof window === 'undefined' 
  ? createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY || 'missing-key')
  : null as any;
