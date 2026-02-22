// Halaman login SENTINEL-POLDA
// Menampilkan form login dengan validasi username dan password yang ketat

'use client'

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PoldaLogo } from '@/components/polda-logo'
import { LoginErrorDialog } from '@/components/dialogs/login-error-dialog'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const router = useRouter()
  
  // State untuk input form
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  // State untuk error dialog
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [error, setError] = useState('') // Declare the error variable

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
        setError('Username dan password harus diisi') // Set error message
        return
      }

      // Validasi: username minimal 3 karakter
      if (username.length < 3) {
        setErrorMessage('Username harus minimal 3 karakter')
        setShowErrorDialog(true)
        setError('Username harus minimal 3 karakter') // Set error message
        return
      }

      // Validasi: password minimal 6 karakter untuk keamanan
      if (password.length < 6) {
        setErrorMessage('Password harus minimal 6 karakter')
        setShowErrorDialog(true)
        setError('Password harus minimal 6 karakter') // Set error message
        return
      }

      // Simulasi validasi password
      // Di aplikasi real, ini akan check ke database
      const validUsername = 'admin'
      const validPassword = 'password123'

      if (username === validUsername && password === validPassword) {
        // Login berhasil - redirect ke dashboard
        router.push('/dashboard')
      } else {
        // Login gagal - tampilkan error dialog
        setErrorMessage('Username atau password salah. Silakan coba lagi.')
        setShowErrorDialog(true)
        setError('Username atau password salah. Silakan coba lagi.') // Set error message
      }
    } catch (err) {
      setErrorMessage('Terjadi error. Silakan coba lagi nanti.')
      setShowErrorDialog(true)
      setError('Terjadi error. Silakan coba lagi nanti.') // Set error message
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      {/* Background accent elements - untuk visual yang lebih menarik */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        {/* Bagian Logo - menampilkan lambang POLDA Jateng */}
        <div className="flex justify-center mb-8">
          <div className="w-32 h-40">
            <PoldaLogo />
          </div>
        </div>

        {/* Bagian Judul - nama dan deskripsi aplikasi */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            SENTINEL-POLDA
          </h1>
          <p className="text-muted-foreground text-sm">
            Sistem Monitoring Jawa Tengah
          </p>
        </div>

        {/* Kartu Login - container utama form */}
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

          {/* Info Demo - credentials untuk testing */}
          <div className="mt-6 p-3 bg-primary/20 border border-primary rounded-md text-xs text-muted-foreground">
            <p className="font-semibold mb-1">Demo Credentials:</p>
            <p>Username: admin</p>
            <p>Password: password123</p>
          </div>
        </div>

        {/* Footer - informasi copyright */}
        <div className="text-center mt-8 text-xs text-muted-foreground">
          <p>© 2024 POLDA Jawa Tengah</p>
          <p>Sistem Internal - Akses Terotorisasi</p>
        </div>
      </div>

      {/* Dialog Error - muncul jika login gagal */}
      <LoginErrorDialog
        isOpen={showErrorDialog}
        message={errorMessage}
        onClose={() => {
          setShowErrorDialog(false)
          // Clear password field setelah error
          setPassword('')
        }}
      />
    </div>
  )
}
