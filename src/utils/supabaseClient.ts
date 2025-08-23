import type { SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!
let client: SupabaseClient | null = null

const { createClient } = await import('@supabase/supabase-js')
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const getSupabaseClient = async (): Promise<SupabaseClient> => {
  if (client) return client

  const { createClient } = await import('@supabase/supabase-js')
  client = createClient(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_ANON_KEY!
  )
  return client
}

export const bucket = 'product-images'
