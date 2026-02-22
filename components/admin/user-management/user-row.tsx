// Single user row dalam table
'use client'

import { motion } from 'framer-motion'
import { RoleSelect } from './role-select'
import { StatusBadge } from './status-badge'
import type { UserManagement } from '@/lib/data/rbac-data'
import type { UserRole } from '@/contexts/auth-context'

interface UserRowProps {
  user: UserManagement
  index: number
  onRoleChange: (userId: number, newRole: UserRole) => void
  onStatusToggle: (userId: number) => void
}

export function UserRow({ user, index, onRoleChange, onStatusToggle }: UserRowProps) {
  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="hover:bg-primary/20 transition-colors"
    >
      {/* NRP */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-foreground">{user.nrp}</div>
      </td>

      {/* Name */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-foreground">{user.name}</div>
      </td>

      {/* Email */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-muted-foreground">{user.email}</div>
      </td>

      {/* Role - Editable */}
      <td className="px-6 py-4 whitespace-nowrap">
        <RoleSelect
          currentRole={user.role}
          userId={user.id}
          onChange={onRoleChange}
        />
      </td>

      {/* Region */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-foreground">{user.region_code}</div>
      </td>

      {/* Status Badge */}
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={user.status} />
      </td>

      {/* Actions */}
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