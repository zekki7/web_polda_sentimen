'use client'

import { useState, useEffect } from 'react'
import { TopNav } from '@/components/top-nav'
import { ProtectedRoute } from '@/components/protected-route'
import { PageHeader } from '@/components/admin/user-management/page-header'
import { UserTable } from '@/components/admin/user-management/user-table'
import { useAuth } from '@/contexts/auth-context'

const API_URL = 'http://103.245.38.28/api'

export default function UserManagementPage() {
  const { token } = useAuth()
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      })
      const data = await response.json()
      const transformed = (data.data || []).map((user: any) => ({
        id: user.id,
        name: user.name,
        nrp: user.nrp,
        email: user.email,
        role: user.role,
        region_code: user.region_code,
        status: user.is_active ? 'active' : 'inactive',
        created_at: user.created_at?.split('T')[0] || '-',
        last_login: user.last_login_at
          ? new Date(user.last_login_at).toLocaleString('id-ID')
          : '-',
      }))
      setUsers(transformed)
    } catch (err) {
      console.error('Failed to fetch users:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (token) fetchUsers()
  }, [token])

  const filteredUsers = users.filter((user: any) => {
    if (filterStatus === 'all') return true
    return user.status === filterStatus
  })

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await fetch(`${API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      })
      fetchUsers()
    } catch (err) {
      console.error('Failed to update role:', err)
    }
  }

  const handleStatusToggle = async (userId: string) => {
    const user = users.find((u: any) => u.id === userId) as any
    if (!user) return
    try {
      await fetch(`${API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ is_active: user.status !== 'active' }),
      })
      fetchUsers()
    } catch (err) {
      console.error('Failed to toggle status:', err)
    }
  }

  return (
    <ProtectedRoute allowedRoles={['super_admin']}>
      <div className="min-h-screen bg-background">
        <TopNav />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PageHeader />
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          ) : (
            <UserTable
              users={filteredUsers}
              filterStatus={filterStatus}
              onFilterChange={setFilterStatus}
              onRoleChange={handleRoleChange}
              onStatusToggle={handleStatusToggle}
            />
          )}
        </main>
      </div>
    </ProtectedRoute>
  )
}
