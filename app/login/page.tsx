// Halaman login SENTINEL-POLDA - Connected to Auth Context
'use client'

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, useMockLogin } from '@/contexts/auth-context'
import type { UserRole } from '@/contexts/auth-context'
import { PoldaLogo } from '@/components/polda-logo'
import { LoginErrorDialog } from '@/components/dialogs/login-error-dialog'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

// Mock credentials untuk testing (nanti ganti dengan API)
const MOCK_CREDENTIALS = {
  super_admin: { username: 'admin', password: 'admin123' },
  analyst: { username: 'analyst', password: 'analyst123' },
  user: { username: 'user', password: 'user123' },
}

export default function LoginPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { loginAs } = useMockLogin()
  
  // State untuk input form
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  // State untuk error dialog
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Redirect jika sudah login
  // Redirect jika sudah login
useEffect(() => {
  if (user) {
    router.push('/dashboard')
  }
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

  // Fungsi untuk handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulasi delay API call (1 detik)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Validasi: username dan password tidak boleh kosong
      if (!username.trim() || !password.trim()) {
        setErrorMessage('Username dan password harus diisi')
        setShowErrorDialog(true)
        return
      }

      // Validasi: username minimal 3 karakter
      if (username.length < 3) {
        setErrorMessage('Username harus minimal 3 karakter')
        setShowErrorDialog(true)
        return
      }

      // Validasi: password minimal 6 karakter
      if (password.length < 6) {
        setErrorMessage('Password harus minimal 6 karakter')
        setShowErrorDialog(true)
        return
      }

      // Check credentials dan login sebagai role yang sesuai
      let roleFound: UserRole | null = null

      for (const [role, creds] of Object.entries(MOCK_CREDENTIALS)) {
        if (username === creds.username && password === creds.password) {
          roleFound = role as UserRole
          break
        }
      }

      if (roleFound) {
        // Login berhasil - set user di auth context
        loginAs(roleFound)
        router.push('/dashboard')
      } else {
        // Login gagal - tampilkan error dialog
        setErrorMessage('Username atau password salah. Silakan coba lagi.')
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
      {/* Background accent elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
  {/* Logo */}
  <div className="flex justify-center mb-8">
    <div className="w-32 aspect-square">
      <PoldaLogo />
    </div>
  </div>
        {/* Judul */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            SENTINEL-POLDA
          </h1>
          <p className="text-muted-foreground text-sm">
            Sistem Monitoring Jawa Tengah
          </p>
        </div>

        {/* Kartu Login */}
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Input Username */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium">
                Username
              </label>
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

            {/* Input Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
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

            {/* Tombol Login */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-2"
            >
              {isLoading ? 'Sedang Memproses...' : 'Masuk Sistem'}
            </Button>
          </form>

          {/* Info Demo Credentials */}
          <div className="mt-6 p-4 bg-primary/20 border border-primary rounded-md text-xs text-muted-foreground space-y-3">
            <p className="font-semibold text-sm"></p>
            
            <div>
          
              
            </div>

            <div>      
            </div>
            <div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-muted-foreground">
          <p>© 2024 POLDA Jawa Tengah</p>
          <p>Sistem Internal - Akses Terotorisasi</p>
        </div>
      </div>

      {/* Dialog Error */}
      <LoginErrorDialog
        isOpen={showErrorDialog}
        message={errorMessage}
        onClose={() => {
          setShowErrorDialog(false)
          setPassword('')
        }}
      />
    </div>
  )
}