// Table untuk menampilkan daftar user
'use client'

import { motion } from 'framer-motion'
import { UserRow } from './user-row'
import { StatusFilter } from './status-filter'
import type { UserManagement } from '@/lib/data/rbac-data'
import type { UserRole } from '@/contexts/auth-context'

interface UserTableProps {
  users: UserManagement[]
  filterStatus: 'all' | 'active' | 'inactive'
  onFilterChange: (status: 'all' | 'active' | 'inactive') => void
  onRoleChange: (userId: number, newRole: UserRole) => void
  onStatusToggle: (userId: number) => void
}

export function UserTable({
  users,
  filterStatus,
  onFilterChange,
  onRoleChange,
  onStatusToggle,
}: UserTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card border border-border rounded-lg overflow-hidden"
    >
      {/* Header dengan filter */}
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          Daftar Pengguna
        </h2>
        <StatusFilter selected={filterStatus} onChange={onFilterChange} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                NRP
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Nama
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Wilayah
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user, index) => (
              <UserRow
                key={user.id}
                user={user}
                index={index}
                onRoleChange={onRoleChange}
                onStatusToggle={onStatusToggle}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {users.length === 0 && (
        <div className="p-12 text-center">
          <p className="text-muted-foreground">Tidak ada user yang ditemukan</p>
        </div>
      )}
    </motion.div>
  )
}