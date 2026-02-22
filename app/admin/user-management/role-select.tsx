// Dropdown untuk select/change user role
'use client'

import type { UserRole } from '@/contexts/auth-context'

interface RoleSelectProps {
  currentRole: UserRole
  userId: number
  onChange: (userId: number, newRole: UserRole) => void
}

const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: 'Super Admin',
  analyst: 'Analyst',
  user: 'User',
}

const ROLE_COLORS: Record<UserRole, string> = {
  super_admin: 'bg-purple-900/30 text-purple-300 border-purple-700',
  analyst: 'bg-blue-900/30 text-blue-300 border-blue-700',
  user: 'bg-gray-900/30 text-gray-300 border-gray-700',
}

export function RoleSelect({ currentRole, userId, onChange }: RoleSelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(userId, e.target.value as UserRole)
  }

  return (
    <select
      value={currentRole}
      onChange={handleChange}
      className={`px-3 py-1 rounded-md text-sm font-medium border cursor-pointer transition-colors hover:opacity-80 ${ROLE_COLORS[currentRole]} bg-transparent`}
    >
      <option value="super_admin">{ROLE_LABELS.super_admin}</option>
      <option value="analyst">{ROLE_LABELS.analyst}</option>
      <option value="user">{ROLE_LABELS.user}</option>
    </select>
  )
}
