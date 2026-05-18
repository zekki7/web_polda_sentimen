'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type UserRole = 'super_admin' | 'analyst' | 'user' | 'officer' | 'admin'

export interface User {
  id: string
  name: string
  nrp: string
  email: string
  role: UserRole
  region_code: string | null
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (username: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  isAuthenticated: boolean
  hasRole: (roles: UserRole | UserRole[]) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const API_URL = 'http://103.245.38.28/api'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user')
      const savedToken = localStorage.getItem('token')
      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser))
        setToken(savedToken)
      }
    }
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (data.success) {
        setUser(data.data.user)
        setToken(data.data.token)
        localStorage.setItem('user', JSON.stringify(data.data.user))
        localStorage.setItem('token', data.data.token)
        return { success: true, message: 'Login berhasil' }
      } else {
        return { success: false, message: data.message || 'Login gagal' }
      }
    } catch (err) {
      return { success: false, message: 'Tidak dapat terhubung ke server' }
    }
  }

  const logout = () => {
    if (token) {
      fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      }).catch(() => {})
    }
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const hasRole = (roles: UserRole | UserRole[]) => {
    if (!user) return false
    const roleArray = Array.isArray(roles) ? roles : [roles]
    return roleArray.includes(user.role)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user, hasRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function useMockLogin() {
  const { login } = useAuth()
  const loginAs = async (username: string, password: string) => {
    return await login(username, password)
  }
  return { loginAs }
}
