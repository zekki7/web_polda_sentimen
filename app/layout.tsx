import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { AuthProvider } from '@/contexts/auth-context'
import { RoleSwitcher } from '@/components/role-switcher'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SENTINEL-POLDA | Sistem Monitoring Jawa Tengah',
  description: 'Sistem monitoring sentiment dan isu publik POLDA Jawa Tengah',
  generator: 'v0.app',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className="font-sans antialiased bg-background text-foreground">
        <AuthProvider>
          {children}
          <RoleSwitcher />
        </AuthProvider>
      </body>
    </html>
  )
}