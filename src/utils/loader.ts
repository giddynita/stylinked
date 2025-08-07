import { supabase } from './supabaseClient'

export const getAuthUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    return null
  }
  return user
}
