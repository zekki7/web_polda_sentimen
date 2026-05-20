'use client'

import { useState, useEffect } from 'react'
import { Toaster, toast } from 'sonner'
import { TopNav } from '@/components/top-nav'
import { ProtectedRoute } from '@/components/protected-route'
import { PageHeader } from '@/components/admin/user-management/page-header'
import { UserTable } from '@/components/admin/user-management/user-table'
import { AddUserModal, NewUserData } from '@/components/admin/user-management/add-user-modal'
import { useAuth, UserRole } from '@/contexts/auth-context'
import type { UserManagement } from '@/lib/data/rbac-data'

const API_URL = 'http://103.245.38.28/api'
const LOCAL_STORAGE_KEY = 'sentinel_users'

// Taruh interface di luar komponen
interface UserItem {
  id: string
  name: string
  nrp: string
  email: string
  role: UserRole
  region_code: string
  status: 'active' | 'inactive'
  created_at: string
  last_login: string
}

const MOCK_USERS: UserItem[] = [
  { id: '1', name: 'Admin Utama', nrp: '1234567890', email: 'admin@polda.jateng.go.id', role: 'admin', region_code: 'JATENG', status: 'active', created_at: '2024-01-01', last_login: '2024-02-21 08:30' },
  { id: '2', name: 'Analis Data Semarang', nrp: '0987654321', email: 'analyst1@polda.jateng.go.id', role: 'analyst', region_code: 'SEMARANG', status: 'active', created_at: '2024-01-15', last_login: '2024-02-21 07:15' },
  { id: '3', name: 'Analis Data Surakarta', nrp: '1122334455', email: 'analyst2@polda.jateng.go.id', role: 'analyst', region_code: 'SURAKARTA', status: 'active', created_at: '2024-01-20', last_login: '2024-02-20 16:45' },
  { id: '4', name: 'Petugas Lapangan Semarang', nrp: '5555555555', email: 'petugas1@polda.jateng.go.id', role: 'officer', region_code: 'SEMARANG', status: 'active', created_at: '2024-02-01', last_login: '2024-02-21 09:00' },
  { id: '5', name: 'Petugas Lapangan Salatiga', nrp: '6666666666', email: 'petugas2@polda.jateng.go.id', role: 'officer', region_code: 'SALATIGA', status: 'active', created_at: '2024-02-05', last_login: '2024-02-20 14:20' },
  { id: '6', name: 'Petugas Non-Aktif', nrp: '7777777777', email: 'inactive@polda.jateng.go.id', role: 'officer', region_code: 'PEKALONGAN', status: 'inactive', created_at: '2023-12-01', last_login: '2024-01-15 10:30' },
]

export default function UserManagementPage() {
  const { token } = useAuth()
  const [users, setUsers] = useState<UserItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')
  const [addUserModalOpen, setAddUserModalOpen] = useState(false)
  const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(new Set())
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const saveUsersToStorage = (userList: UserItem[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userList))
    }
  }

  const loadUsers = (): boolean => {
    if (typeof window !== 'undefined') {
      const savedUsers = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (savedUsers) {
        setUsers(JSON.parse(savedUsers))
        setIsLoading(false)
        return true
      }
    }
    return false
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)

      const data = await response.json()
      const transformed: UserItem[] = (data.data || []).map((user: any) => ({
        id: String(user.id),
        name: user.name,
        nrp: user.nrp,
        email: user.email,
        role: user.role as UserRole,
        region_code: user.region_code ?? '',
        status: (user.is_active ? 'active' : 'inactive') as 'active' | 'inactive',
        created_at: user.created_at?.split('T')[0] || '-',
        last_login: user.last_login_at
          ? new Date(user.last_login_at).toLocaleString('id-ID')
          : '-',
      }))
      setUsers(transformed)
      saveUsersToStorage(transformed)
    } catch (err) {
      console.warn('API error, checking local storage:', err)
      if (!loadUsers()) {
        setUsers(MOCK_USERS)
        saveUsersToStorage(MOCK_USERS)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (token) fetchUsers()
  }, [token])

  const filteredUsers = users.filter((user) => {
    if (filterStatus !== 'all' && user.status !== filterStatus) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      if (
        !user.nrp.toLowerCase().includes(q) &&
        !user.name.toLowerCase().includes(q) &&
        !user.email.toLowerCase().includes(q)
      ) return false
    }
    return true
  })

  // Cast ke UserManagement supaya kompatibel dengan UserTable
  const filteredAsUserManagement = filteredUsers as unknown as UserManagement[]

  const handleAddUser = (newUser: NewUserData) => {
    const userItem: UserItem = {
      id: Date.now().toString(),
      name: newUser.name,
      nrp: newUser.nrp,
      email: newUser.email,
      role: newUser.role as UserRole,
      region_code: newUser.region_code,
      status: 'active',
      created_at: new Date().toISOString().split('T')[0],
      last_login: '-',
    }
    const updatedUsers = [userItem, ...users]
    setUsers(updatedUsers)
    saveUsersToStorage(updatedUsers)
    toast.success(`User "${newUser.name}" berhasil ditambahkan`, {
      description: `NRP: ${newUser.nrp} | Role: ${newUser.role}`,
    })
  }

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    const updatedUsers = users.map(u => u.id === userId ? { ...u, role: newRole } : u)
    setUsers(updatedUsers)
    saveUsersToStorage(updatedUsers)
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
    } catch (err) {
      console.warn('Role update API failed, using local state')
    }
  }

  const handleStatusToggle = async (userId: string) => {
    const user = users.find(u => u.id === userId)
    if (!user) return
    const newStatus: 'active' | 'inactive' = user.status === 'active' ? 'inactive' : 'active'
    const updatedUsers = users.map(u => u.id === userId ? { ...u, status: newStatus } : u)
    setUsers(updatedUsers)
    saveUsersToStorage(updatedUsers)
    try {
      await fetch(`${API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ is_active: newStatus === 'active' }),
      })
    } catch (err) {
      console.warn('Status toggle API failed, using local state')
    }
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectedUserIds(checked ? new Set(filteredUsers.map(u => u.id)) : new Set())
  }

  const handleSelectUser = (userId: string, checked: boolean) => {
    const newSelected = new Set(selectedUserIds)
    checked ? newSelected.add(userId) : newSelected.delete(userId)
    setSelectedUserIds(newSelected)
  }

  const handleBulkDelete = () => {
    if (selectedUserIds.size === 0) return
    setDeleteConfirmOpen(true)
  }

  const confirmBulkDelete = () => {
    const remainingUsers = users.filter(u => !selectedUserIds.has(u.id))
    setUsers(remainingUsers)
    saveUsersToStorage(remainingUsers)
    setSelectedUserIds(new Set())
    setDeleteConfirmOpen(false)
    toast.success(`${selectedUserIds.size} user berhasil dihapus`)
  }

  return (
    <ProtectedRoute allowedRoles={['super_admin', 'admin']}>
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
              users={filteredAsUserManagement}
              filterStatus={filterStatus}
              onFilterChange={setFilterStatus}
              onRoleChange={handleRoleChange}
              onStatusToggle={handleStatusToggle}
              onAddUser={() => setAddUserModalOpen(true)}
              onDeleteUser={handleBulkDelete}
              selectedUserIds={selectedUserIds}
              onSelectAll={handleSelectAll}
              onSelectUser={handleSelectUser}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          )}
        </main>

        <Toaster
          position="top-right"
          theme="dark"
          toastOptions={{
            style: {
              background: '#1e1e2e',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
            },
          }}
        />
        <AddUserModal
          isOpen={addUserModalOpen}
          onClose={() => setAddUserModalOpen(false)}
          onAdd={handleAddUser}
        />

        {deleteConfirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteConfirmOpen(false)} />
            <div className="relative bg-card border border-border rounded-xl shadow-2xl p-6 w-full max-w-sm">
              <h3 className="text-lg font-semibold text-foreground mb-2">Konfirmasi Hapus</h3>
              <p className="text-muted-foreground mb-6">
                Apakah kamu yakin ingin menghapus <span className="font-medium text-foreground">{selectedUserIds.size}</span> user yang dipilih?
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDeleteConfirmOpen(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-border text-muted-foreground text-sm font-medium hover:bg-primary/50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={confirmBulkDelete}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Hapus {selectedUserIds.size} User
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}