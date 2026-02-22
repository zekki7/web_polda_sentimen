// Role Switcher - Development Tool untuk testing
// Tambahkan di bottom-right corner untuk gampang switch role
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMockLogin } from '@/contexts/auth-context'
import { useAuth } from '@/contexts/auth-context'
import type { UserRole } from '@/contexts/auth-context'

export function RoleSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const { loginAs } = useMockLogin()
  const { user } = useAuth()

  const roles: Array<{ value: UserRole; label: string; emoji: string }> = [
    { value: 'super_admin', label: 'Super Admin', emoji: '👑' },
    { value: 'analyst', label: 'Analyst', emoji: '🔬' },
    { value: 'user', label: 'User', emoji: '👤' },
  ]

  const handleSwitch = (role: UserRole) => {
    loginAs(role)
    setIsOpen(false)
    // Reload page untuk apply changes
    window.location.reload()
  }

  // Hide in production
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-2 bg-card border border-border rounded-lg shadow-xl overflow-hidden"
          >
            <div className="p-3 border-b border-border bg-primary/50">
              <p className="text-xs font-semibold text-foreground">
                🎭 Switch Role (Dev Mode)
              </p>
            </div>
            <div className="p-2 space-y-1">
              {roles.map((role) => (
                <button
                  key={role.value}
                  onClick={() => handleSwitch(role.value)}
                  disabled={user?.role === role.value}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                    user?.role === role.value
                      ? 'bg-accent text-accent-foreground cursor-not-allowed'
                      : 'text-foreground hover:bg-primary/50'
                  }`}
                >
                  <span className="text-lg">{role.emoji}</span>
                  <span className="flex-1">{role.label}</span>
                  {user?.role === role.value && (
                    <span className="text-xs">✓</span>
                  )}
                </button>
              ))}
            </div>
            <div className="p-2 border-t border-border bg-primary/20">
              <p className="text-xs text-muted-foreground text-center">
                Current: {user?.name}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-br from-accent to-secondary rounded-full shadow-lg flex items-center justify-center text-2xl hover:shadow-xl transition-shadow"
        title="Switch Role (Dev Tool)"
      >
        🎭
      </motion.button>

      {/* Dev Badge */}
      <div className="absolute -top-2 -left-2 bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
        DEV
      </div>
    </div>
  )
}
