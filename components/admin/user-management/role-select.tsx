'use client'
import type { UserRole } from '@/contexts/auth-context'

interface RoleSelectProps {
  currentRole: UserRole
  userId: string
  onChange: (userId: string, newRole: UserRole) => void
}

const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  analyst: 'Analyst',
  officer: 'Officer',
}

const ROLE_COLORS: Record<UserRole, string> = {
  super_admin: 'bg-purple-900/30 text-purple-300 border-purple-700',
  admin: 'bg-red-900/30 text-red-300 border-red-700',
  analyst: 'bg-blue-900/30 text-blue-300 border-blue-700',
  officer: 'bg-green-900/30 text-green-300 border-green-700',
}

export function RoleSelect({ currentRole, userId, onChange }: RoleSelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(userId, e.target.value as UserRole)
  }

  return (
    <select
      value={currentRole}
      onChange={handleChange}
      className={`px-3 py-1 rounded-md text-sm font-medium border cursor-pointer transition-colors hover:opacity-80 ${ROLE_COLORS[currentRole] ?? 'bg-gray-900/30 text-gray-300 border-gray-700'} bg-transparent`}
    >
      {(Object.keys(ROLE_LABELS) as UserRole[]).map((role) => (
        <option key={role} value={role}>{ROLE_LABELS[role]}</option>
      ))}
    </select>
  )
}