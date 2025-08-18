import { toast } from 'sonner'
import { supabase } from './supabaseClient'
import type { LoginAction, UserDataType, UserRole } from './types'
import type { User } from '@supabase/supabase-js'

export const getAuthUserDetails = async (user: User | null) => {
  if (!user) {
    return {
      userData: null,
      userRole: null,
    }
  }
  const { data: userRole, error: userError } = await supabase
    .from('users')
    .select<'role', UserRole>('role')
    .eq('id', user.id)
    .single()
  if (userError) throw new Error(userError.message)

  const userRoleTable =
    userRole?.role == 'buyer'
      ? 'buyers'
      : userRole?.role == 'vendor'
      ? 'vendors'
      : 'logistics'
  const { data: userData, error: dataError } = await supabase
    .from(userRoleTable)
    .select<'*', UserDataType>('*')
    .eq('id', user.id)
    .single()
  if (dataError) throw new Error(dataError.message)

  const AuthUserData = { userData, userRole }
  return AuthUserData
}

export const login = async (props: LoginAction) => {
  const { email, password } = props
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) {
    toast.error('Failed to login.')
    throw new Error(error.message)
  }
  return data.user
}
