// Component untuk protect routes berdasarkan role
'use client'

import { useAuth, UserRole } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
  redirectTo?: string
}

export function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo = '/dashboard',
}: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Jika belum login, redirect ke login page
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    // Jika ada role restriction dan user tidak punya akses
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      router.push(redirectTo)
      return
    }
  }, [isAuthenticated, user, allowedRoles, router, redirectTo])

  // Jika belum login atau tidak punya akses, tampilkan loading
  if (!isAuthenticated || (allowedRoles && user && !allowedRoles.includes(user.role))) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
