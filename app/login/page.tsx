'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { PoldaLogo } from '@/components/polda-logo'
import { LoginErrorDialog } from '@/components/dialogs/login-error-dialog'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const router = useRouter()
  const { user, login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (user) router.push('/dashboard')
  }, [user, router])

  if (user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    )
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (!username.trim() || !password.trim()) {
        setErrorMessage('Username dan password harus diisi')
        setShowErrorDialog(true)
        return
      }
      const result = await login(username, password)
      if (result.success) {
        router.push('/dashboard')
      } else {
        setErrorMessage(result.message)
        setShowErrorDialog(true)
      }
    } catch (err) {
      setErrorMessage('Terjadi error. Silakan coba lagi nanti.')
      setShowErrorDialog(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl" />
      <div className="relative z-10 w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="w-32 aspect-square"><PoldaLogo /></div>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">SENTINEL-POLDA</h1>
          <p className="text-muted-foreground text-sm">Sistem Monitoring Jawa Tengah</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-2"
            >
              {isLoading ? 'Sedang Memproses...' : 'Masuk Sistem'}
            </Button>
          </form>
        </div>
        <div className="text-center mt-8 text-xs text-muted-foreground">
          <p>© 2026 POLDA Jawa Tengah</p>
          <p>Sistem Internal - Akses Terotorisasi</p>
        </div>
      </div>
      <LoginErrorDialog
        isOpen={showErrorDialog}
        message={errorMessage}
        onClose={() => { setShowErrorDialog(false); setPassword('') }}
      />
    </div>
  )
}
