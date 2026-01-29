import { createClient } from '@supabase/supabase-js';

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || '';
}

function getSupabaseAnonKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
}

// Client public (pour lecture)
export function getSupabase() {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();

  if (!url || !key) {
    console.error('Supabase config missing:', { url: !!url, key: !!key });
    throw new Error('Supabase configuration is missing.');
  }

  return createClient(url, key);
}

// Legacy export for backward compatibility
export const supabase = {
  from: (table: string) => getSupabase().from(table),
};

// Client admin (pour ecriture - cote serveur uniquement)
export function createAdminClient() {
  const url = getSupabaseUrl();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error('Supabase admin configuration is missing.');
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
