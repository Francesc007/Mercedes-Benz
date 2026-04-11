import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL || ''
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

/** Cliente solo si hay URL y anon key (para insertar en Supabase desde el navegador). */
export const supabase = url && anonKey ? createClient(url, anonKey) : null

export function isSupabaseConfigured() {
  return Boolean(supabase)
}
