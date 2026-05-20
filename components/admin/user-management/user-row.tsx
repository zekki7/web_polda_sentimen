'use client'
import { motion } from 'framer-motion'
import { RoleSelect } from './role-select'
import { StatusBadge } from './status-badge'
import type { UserManagement } from '@/lib/data/rbac-data'
import type { UserRole } from '@/contexts/auth-context'

interface UserRowProps {
  user: UserManagement
  index: number
  onRoleChange: (userId: string, newRole: UserRole) => void
  onStatusToggle: (userId: string) => void
  isSelected: boolean
  onSelect: (checked: boolean) => void
}

export function UserRow({ user, index, onRoleChange, onStatusToggle, isSelected, onSelect }: UserRowProps) {
  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`hover:bg-primary/20 transition-colors ${isSelected ? 'bg-accent/10' : ''}`}
    >
      <td className="px-4 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(e.target.checked)}
          className="w-4 h-4 rounded border-border bg-background text-accent focus:ring-accent cursor-pointer"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-foreground">{user.nrp}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-foreground">{user.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-muted-foreground">{user.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <RoleSelect
          currentRole={user.role}
          userId={user.id}
          onChange={onRoleChange}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-foreground">{user.region_code}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={user.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <button
          onClick={() => onStatusToggle(user.id)}
          className={`px-3 py-1 rounded-md font-medium transition-colors ${
            user.status === 'active'
              ? 'bg-red-900/30 text-red-300 hover:bg-red-900/50'
              : 'bg-green-900/30 text-green-300 hover:bg-green-900/50'
          }`}
        >
          {user.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}
        </button>
      </td>
    </motion.tr>
  )
}