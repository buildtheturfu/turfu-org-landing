import { createClient } from '@supabase/supabase-js';
import { env } from './env';

// Client public (pour lecture)
export function getSupabase() {
  return createClient(env.supabase.url, env.supabase.anonKey);
}

// Legacy export for backward compatibility
export const supabase = {
  from: (table: string) => getSupabase().from(table),
};

// Client admin (pour ecriture - cote serveur uniquement)
export function createAdminClient() {
  return createClient(env.supabase.url, env.supabase.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
