'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type UserRole = 'super_admin' | 'analyst' | 'officer' | 'admin'

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
  devLoginAs: (role: UserRole) => Promise<{ success: boolean; message: string }>
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

  const devLoginAs = async (role: UserRole) => {
    const mockUsers: Record<UserRole, User> = {
      super_admin: { id: 'dev-1', name: 'Dev Super Admin', nrp: '000000', email: 'dev@dev.com', role: 'super_admin', region_code: null },
      admin: { id: 'dev-2', name: 'Dev Admin', nrp: '111111', email: 'dev@dev.com', role: 'admin', region_code: null },
      analyst: { id: 'dev-3', name: 'Dev Analyst', nrp: '222222', email: 'dev@dev.com', role: 'analyst', region_code: null },
      officer: { id: 'dev-4', name: 'Dev Officer', nrp: '333333', email: 'dev@dev.com', role: 'officer', region_code: null },
    }

    const mockUser = mockUsers[role]
    if (mockUser) {
      setUser(mockUser)
      setToken('dev-token-' + role)
      localStorage.setItem('user', JSON.stringify(mockUser))
      localStorage.setItem('token', 'dev-token-' + role)
      return { success: true, message: 'Dev login berhasil' }
    }
    return { success: false, message: 'Role tidak valid' }
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user, hasRole, devLoginAs }}>
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
