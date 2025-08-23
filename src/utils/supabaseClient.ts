const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!
const { createClient } = await import('@supabase/supabase-js')
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const bucket = 'product-images'
