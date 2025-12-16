"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { api } from "../bk/api.ts"

interface User {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<LoginResponse>
  register: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

interface LoginResponse {
  access_token: string
  token_type: string
  user: User
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if user is authenticated on mount
  useEffect(() => {
    const initAuth = async () => {
      api.loadToken() // <-- carrega token do localStorage antes de checkAuth
      await checkAuth()
    }
    initAuth()
  }, [])

  const checkAuth = async () => {
    try {
      if (!api.token) { // se não tiver token, usuário não está logado
        setUser(null)
        return
      }
      const userData = await api.auth.me()
      setUser(userData as User)
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string):Promise<LoginResponse> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const res = await api.auth.login<LoginResponse>({ email, password })

      // salva token no ApiService e localStorage
      api.setToken(res.access_token)

      // opcional: busca os dados do usuário
      //await checkAuth()

      // retorna a response para poder usar na LoginSection
      return res
    } catch (error) {
      throw error
    }
  }

  const register = async (name: string, email: string, password: string, passwordConfirmation: string) => {
    try {
      await api.auth.register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await api.auth.logout()
    } finally {
      api.clearToken() // limpa token do ApiService e localStorage
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
