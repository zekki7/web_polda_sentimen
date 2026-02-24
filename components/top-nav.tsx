// Updated TopNav dengan Logout button
'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { motion } from 'framer-motion'

export function TopNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, hasRole, logout } = useAuth()

  // Define menu items berdasarkan role
  const getMenuItems = () => {
    const baseItems = [
      { href: '/dashboard', label: 'Dashboard', roles: ['super_admin', 'analyst', 'user'] },
      { href: '/analisis', label: 'Analisis Wilayah', roles: ['super_admin', 'analyst', 'user'] },
    ]

    const statusIsuItem = {
      href: '/status-isu',
      label: 'Status Isu',
      roles: ['super_admin', 'analyst'],
    }

    const adminItems = [
      { href: '/admin/users', label: 'User Management', roles: ['super_admin'] },
      { href: '/admin/audit-log', label: 'Audit Log', roles: ['super_admin'] },
    ]

    const analystItems = [
      { href: '/analyst/filters', label: 'Filter Crawling', roles: ['analyst'] },
      { href: '/analyst/validation', label: 'Validasi Sentiment', roles: ['analyst'] },
    ]

    return [...baseItems, statusIsuItem, ...adminItems, ...analystItems]
  }

  const menuItems = getMenuItems()

  // Filter menu items berdasarkan role user
  const visibleItems = menuItems.filter((item) => {
    if (!user) return false
    return item.roles.includes(user.role)
  })

  const isActive = (href: string) => pathname === href

  const handleLogout = () => {
    const confirmLogout = confirm('Yakin ingin keluar?')
    if (confirmLogout) {
      logout()
      router.push('/login')
    }
  }

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur-sm bg-card/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
<Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
  <div className="w-10 h-10 flex items-center justify-center">
    <img
      src="/images/lambang-polda-jateng.png"
      alt="Logo POLDA Jawa Tengah"
      className="w-full h-full object-contain"
    />
  </div>
  <div>
    <h1 className="text-lg font-bold text-foreground">SENTINEL-POLDA</h1>
    <p className="text-xs text-muted-foreground">Jawa Tengah</p>
  </div>
</Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            {visibleItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-white shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-primary/30'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-accent rounded-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* User Info, Role Badge & Logout */}
          {user && (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.nrp}</p>
              </div>
              
              {/* Role Badge */}
              <div
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  user.role === 'super_admin'
                    ? 'bg-purple-900/30 text-purple-300 border border-purple-700'
                    : user.role === 'analyst'
                    ? 'bg-blue-900/30 text-blue-300 border border-blue-700'
                    : 'bg-gray-900/30 text-gray-300 border border-gray-700'
                }`}
              >
                {user.role === 'super_admin'
                  ? 'Super Admin'
                  : user.role === 'analyst'
                  ? 'Analyst'
                  : 'User'}
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-900/30 text-red-300 border border-red-700 rounded-lg text-sm font-medium hover:bg-red-900/50 transition-colors flex items-center gap-2"
                title="Keluar"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}