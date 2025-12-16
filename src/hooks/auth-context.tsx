"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { api } from "@/bk/api.ts"

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
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const userData = await api.auth.me()
      setUser(userData as User)
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
      await api.auth.login({ email, password })
      await checkAuth()
    } catch (error) {
      throw error
    }
  }

  const register = async (name: string, email: string, password: string, passwordConfirmation: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
      await api.auth.register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
      await checkAuth()
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await api.auth.logout()
      setUser(null)
    } catch (error) {
      // Even if logout fails on server, clear local state
      setUser(null)
      throw error
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
