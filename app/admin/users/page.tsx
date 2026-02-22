// Halaman User Management - Super Admin Only
'use client'

import { TopNav } from '@/components/top-nav'
import { ProtectedRoute } from '@/components/protected-route'
import { PageHeader } from '@/components/admin/user-management/page-header'
import { UserTable } from '@/components/admin/user-management/user-table'
import { mockUsers } from '@/lib/data/rbac-data'
import { useState } from 'react'
import type { UserManagement } from '@/lib/data/rbac-data'

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserManagement[]>(mockUsers)
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')

  const filteredUsers = users.filter((user) => {
    if (filterStatus === 'all') return true
    return user.status === filterStatus
  })

  const handleRoleChange = (userId: number, newRole: 'super_admin' | 'analyst' | 'user') => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    )
    // TODO: Call API to update role
    console.log(`Update user ${userId} to role ${newRole}`)
  }

  const handleStatusToggle = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
          : user
      )
    )
    // TODO: Call API to toggle status
    console.log(`Toggle status for user ${userId}`)
  }

  return (
    <ProtectedRoute allowedRoles={['super_admin']}>
      <div className="min-h-screen bg-background">
        <TopNav />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PageHeader />

          <UserTable
            users={filteredUsers}
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
            onRoleChange={handleRoleChange}
            onStatusToggle={handleStatusToggle}
          />
        </main>
      </div>
    </ProtectedRoute>
  )
}
