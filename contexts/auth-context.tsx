// Context untuk authentication dan role management
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

// Types untuk user dan role
export type UserRole = 'super_admin' | 'analyst' | 'user'

export interface User {
  id: number
  name: string
  nrp: string
  email: string
  role: UserRole
  region_code: string
}

interface AuthContextType {
  user: User | null
  login: (userData: User) => void
  logout: () => void
  isAuthenticated: boolean
  hasRole: (roles: UserRole | UserRole[]) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user untuk development - GANTI dengan data dari API
const MOCK_USERS: Record<UserRole, User> = {
  super_admin: {
    id: 1,
    name: 'Admin Utama',
    nrp: '1234567890',
    email: 'admin@polda.jateng.go.id',
    role: 'super_admin',
    region_code: 'JATENG',
  },
  analyst: {
    id: 2,
    name: 'Analis Data',
    nrp: '0987654321',
    email: 'analyst@polda.jateng.go.id',
    role: 'analyst',
    region_code: 'SEMARANG',
  },
  user: {
    id: 3,
    name: 'Petugas Lapangan',
    nrp: '5555555555',
    email: 'petugas@polda.jateng.go.id',
    role: 'user',
    region_code: 'SURAKARTA',
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Untuk development, default ke super_admin
  // Nanti ganti dengan data dari localStorage/API
  // nak meh gajal role e wil
  // Login as Super Admin
//const [user, setUser] = useState<User | null>(MOCK_USERS.super_admin)

// Login as Analyst
//const [user, setUser] = useState<User | null>(MOCK_USERS.analyst)

// Login as User
const [user, setUser] = useState<User | null>(MOCK_USERS.user)

  const login = (userData: User) => {
    setUser(userData)
    // TODO: Save to localStorage/session
    // localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    // TODO: Clear localStorage/session
    // localStorage.removeItem('user')
  }

  const hasRole = (roles: UserRole | UserRole[]) => {
    if (!user) return false
    const roleArray = Array.isArray(roles) ? roles : [roles]
    return roleArray.includes(user.role)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook untuk menggunakan auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Helper untuk switch user (development only)
export function useMockLogin() {
  const { login } = useAuth()
  
  const loginAs = (role: UserRole) => {
    login(MOCK_USERS[role])
  }

  return { loginAs, mockUsers: MOCK_USERS }
}
