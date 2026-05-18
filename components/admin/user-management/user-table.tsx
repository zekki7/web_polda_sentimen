// Table untuk menampilkan daftar user dengan checkbox selection
'use client'

import { motion } from 'framer-motion'
import { UserRow } from './user-row'
import { StatusFilterDropdown, UserActionButtons } from './status-filter-dropdown'
import type { UserManagement } from '@/lib/data/rbac-data'
import type { UserRole } from '@/contexts/auth-context'

interface UserTableProps {
  users: UserManagement[]
  filterStatus: 'all' | 'active' | 'inactive'
  onFilterChange: (status: 'all' | 'active' | 'inactive') => void
  onRoleChange: (userId: number, newRole: UserRole) => void
  onStatusToggle: (userId: number) => void
  onAddUser?: () => void
  onDeleteUser?: () => void
  selectedUserIds: Set<string>
  onSelectAll: (checked: boolean) => void
  onSelectUser: (userId: string, checked: boolean) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function UserTable({
  users,
  filterStatus,
  onFilterChange,
  onRoleChange,
  onStatusToggle,
  onAddUser,
  onDeleteUser,
  selectedUserIds,
  onSelectAll,
  onSelectUser,
  searchQuery,
  onSearchChange,
}: UserTableProps) {
  const allSelected = users.length > 0 && users.every(u => selectedUserIds.has(u.id))
  const someSelected = users.some(u => selectedUserIds.has(u.id))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card border border-border rounded-lg overflow-hidden relative"
    >
      {/* Header dengan search, filter & action buttons */}
      <div className="p-4 sm:p-6 border-b border-border">
        {/* Desktop: Search + Filter + Actions in one row */}
        <div className="hidden sm:flex sm:items-center gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari NRP, nama, atau email..."
              className="w-full px-4 py-2 pl-10 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Filter Dropdown */}
          <StatusFilterDropdown selected={filterStatus} onChange={onFilterChange} />

          {/* Spacer */}
          <div className="flex-1" />

          {/* Action Buttons */}
          <UserActionButtons
            onAddUser={onAddUser}
            onDeleteUser={onDeleteUser}
            selectedCount={selectedUserIds.size}
          />
        </div>

        {/* Mobile: Row 1 = Search + Filter, Row 2 = Actions */}
        <div className="flex flex-col gap-3 sm:hidden">
          {/* Row 1: Search + Filter */}
          <div className="flex items-center gap-2">
            {/* Search Bar */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Cari..."
                className="w-full px-3 py-2 pl-9 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent text-sm"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Filter Dropdown */}
            <StatusFilterDropdown selected={filterStatus} onChange={onFilterChange} />
          </div>

          {/* Row 2: Action Buttons */}
          <div className="flex items-center gap-2">
            <UserActionButtons
              onAddUser={onAddUser}
              onDeleteUser={onDeleteUser}
              selectedCount={selectedUserIds.size}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto overflow-y-hidden overscroll-x-contain max-w-full">
        <style jsx>{`
          .overflow-x-auto::-webkit-scrollbar {
            height: 6px;
          }
          .overflow-x-auto::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.1);
          }
          .overflow-x-auto::-webkit-scrollbar-thumb {
            background: #7f1d1d;
            border-radius: 3px;
          }
          .overflow-x-auto::-webkit-scrollbar-thumb:hover {
            background: #991b1b;
          }
        `}</style>
        <table className="w-full min-w-[600px]">
          <thead className="bg-primary/50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="w-4 h-4 rounded border-border bg-background text-accent focus:ring-accent cursor-pointer"
                />
              </th>
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
                isSelected={selectedUserIds.has(user.id)}
                onSelect={(checked) => onSelectUser(user.id, checked)}
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