// Updated TopNav dengan Logout button & mobile responsive
'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Menu, X, ChevronDown, LogOut, User, Shield } from 'lucide-react'

export function TopNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, hasRole, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const profileDropdownRef = useRef<HTMLDivElement>(null)

  // Define menu items berdasarkan role
 const getMenuItems = () => {
  const baseItems = [
    { href: '/dashboard', label: 'Dashboard', roles: ['super_admin', 'analyst', 'officer', 'admin'] },
    { href: '/analisis', label: 'Analisis Wilayah', roles: ['super_admin', 'analyst', 'officer', 'admin'] },
  ]

  const statusIsuItem = {
    href: '/status-isu',
    label: 'Status Isu',
    roles: ['super_admin', 'analyst', 'admin'], // officer tidak bisa
  }

  const userManagementItem = {
    href: '/admin/users',
    label: 'Manajemen Pengguna',
    roles: ['super_admin', 'admin'], // super_admin pakai route /admin/users juga
  }

  // Khusus super_admin: audit log, filter, validasi
  const superAdminOnlyItems = [
    { href: '/admin/audit-log', label: 'Audit Log', roles: ['super_admin'] },
    { href: '/analyst/filters', label: 'Filter Crawling', roles: ['super_admin', 'analyst'] },
    { href: '/analyst/validation', label: 'Validasi Sentiment', roles: ['super_admin', 'analyst'] },
  ]

  return [...baseItems, statusIsuItem, userManagementItem, ...superAdminOnlyItems]
}

  const menuItems = getMenuItems()

  // Filter menu items berdasarkan role user
  const visibleItems = menuItems.filter((item) => {
    if (!user) return false
    return item.roles.includes(user.role)
  })

  const isActive = (href: string) => pathname === href

  const handleLogout = () => {
    setProfileDropdownOpen(false)
    const confirmLogout = confirm('Yakin ingin keluar?')
    if (confirmLogout) {
      logout()
      router.push('/login')
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false)
      }
    }

    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [profileDropdownOpen])

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'Super Admin'
      case 'analyst':
        return 'Analyst'
      case 'officer':
        return 'Officer'
      case 'admin':
        return 'Admin'
      default:
        return role
    }
  }

  const getUserInitial = (name: string) => {
    return name.charAt(0).toUpperCase()
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
              <h1 className="text-sm sm:text-lg font-bold text-foreground">SENTINEL-POLDA</h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Jawa Tengah</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-2 overflow-x-auto">
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

          {/* Desktop User Profile Pill & Dropdown */}
          {user && (
            <div className="hidden md:block relative" ref={profileDropdownRef}>
              {/* Pill */}
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                  profileDropdownOpen
                    ? 'bg-white/10 border-white/20'
                    : 'bg-transparent border-white/15 hover:bg-white/7'
                }`}
              >
                {/* Avatar */}
                <div className="w-6 h-6 rounded-full bg-purple-500/30 border border-purple-500/60 flex items-center justify-center">
                  <span className="text-xs font-bold text-purple-300">
                    {getUserInitial(user.name)}
                  </span>
                </div>
                {/* Name & Role */}
                <div className="text-left">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-white/40">{getRoleLabel(user.role)}</p>
                </div>
                {/* Chevron */}
                <ChevronDown
                  className={`w-4 h-4 text-white/30 transition-transform duration-200 ${
                    profileDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown */}
              {profileDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-2 w-[220px] bg-[#242440] border border-white/12 rounded-xl p-4"
                >
                  {/* Avatar Large */}
                  <div className="w-12 h-12 rounded-full bg-purple-500/30 border-2 border-purple-500/50 flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg font-bold text-purple-300">
                      {getUserInitial(user.name)}
                    </span>
                  </div>
                  {/* Name */}
                  <p className="text-center text-sm font-semibold text-white mb-1">
                    {user.name}
                  </p>
                  {/* Badge */}
                  <div className="flex justify-center mb-3">
                    <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded text-xs font-medium">
                      {getRoleLabel(user.role)}
                    </span>
                  </div>

                  <hr className="border-white/8 mb-3" />

                  {/* Info Rows */}
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-white/30" />
                    <span className="text-xs text-white/45">ID: {user.nrp}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-4 h-4 text-white/30" />
                    <span className="text-xs text-white/45">Polda Jawa Tengah</span>
                  </div>

                  <hr className="border-white/8 mb-3" />

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md border border-red-500/35 bg-red-500/10 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Keluar
                  </button>
                </motion.div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && user && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-2">
              {visibleItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.href)
                      ? 'text-white shadow-lg'
                      : 'text-muted-foreground hover:text-foreground hover:bg-primary/30'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-border pt-4 mt-2">
                {/* Mobile Profile Display */}
                <div className="flex items-center gap-3 px-4 mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/30 border border-purple-500/50 flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-300">
                      {getUserInitial(user.name)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-white/40">
                      {getRoleLabel(user.role)} • ID: {user.nrp}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 bg-red-900/30 text-red-300 border border-red-700 rounded-lg text-sm font-medium hover:bg-red-900/50 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Keluar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}