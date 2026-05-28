// Halaman Filter Crawling - Analyst, Admin, Superadmin
'use client'

import { useState, useEffect } from 'react'
import { TopNav } from '@/components/top-nav'
import { ProtectedRoute } from '@/components/protected-route'
import { useAuth } from '@/contexts/auth-context'
import { PageHeader } from '@/components/analyst/filters/page-header'
import { FilterList } from '@/components/analyst/filters/filter-list'
import { FilterModal } from '@/components/analyst/filters/filter-modal'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://103.245.38.28/api'

export default function FilterCrawlingPage() {
  const { token } = useAuth()
  const [filters, setFilters] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showActiveOnly, setShowActiveOnly] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingFilter, setEditingFilter] = useState<any | null>(null)

  // Fetch Filter
  const fetchFilters = async () => {
    if (!token) return
    setIsLoading(true)
    try {
      const response = await fetch(`${API_URL}/filters`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      })
      const result = await response.json()
      if (result.success && result.data) {
        setFilters(result.data)
      }
    } catch (error) {
      console.error('Gagal memuat filter:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchFilters()
  }, [token])

  const handleAdd = () => {
    setEditingFilter(null)
    setIsModalOpen(true)
  }

  const handleEdit = (filter: any) => {
    setEditingFilter(filter)
    setIsModalOpen(true)
  }

  // Simpan / Update Filter
  const handleSave = async (filter: any) => {
  if (!token) return
  const isEdit = !!editingFilter
  const url = isEdit ? `${API_URL}/filters/${editingFilter.id}` : `${API_URL}/filters`
  const method = isEdit ? 'PUT' : 'POST'

  console.log('filter dari form:', filter) // ← tambah ini

  // Sesuaikan payload dengan yang diexpect API
  const payload = {
    keyword: Array.isArray(filter.keywords) ? filter.keywords.join(',') : filter.keyword,
    platform: Array.isArray(filter.platforms) ? filter.platforms.join(',') : filter.platform,
    is_active: filter.is_active ?? true,
  }
  console.log('payload yang dikirim:', payload) // ← dan ini

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload), // ← kirim payload yang sudah disesuaikan
    })

    const result = await response.json()
    if (response.ok && result.success) {
      if (isEdit) {
        setFilters(filters.map((f) => (f.id === editingFilter.id ? result.data : f)))
      } else {
        setFilters([result.data, ...filters])
      }
      setIsModalOpen(false)
    } else {
      console.error('Gagal simpan:', result)
    }
  } catch (error) {
    console.error('Gagal menyimpan filter:', error)
  }
}

  // Hapus Filter
  const handleDelete = async (id: number) => {
    if (!token || !confirm('Hapus kriteria filter crawling ini?')) return
    try {
      const response = await fetch(`${API_URL}/filters/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      })

      if (response.ok) {
        setFilters(filters.filter((f) => f.id !== id))
      }
    } catch (error) {
      console.error('Gagal menghapus filter:', error)
    }
  }

  // Toggle Status
  const handleToggle = async (id: number) => {
    if (!token) return
    const targetFilter = filters.find((f) => f.id === id)
    if (!targetFilter) return

    try {
      const response = await fetch(`${API_URL}/filters/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ is_active: !targetFilter.is_active }),
      })

      if (response.ok) {
        setFilters(
          filters.map((f) => (f.id === id ? { ...f, is_active: !f.is_active } : f))
        )
      }
    } catch (error) {
      console.error('Gagal mengubah status aktif:', error)
    }
  }

  const displayedFilters = showActiveOnly
    ? filters.filter((f) => f.is_active)
    : filters

  return (
    <ProtectedRoute allowedRoles={['analyst', 'super_admin', 'admin']}>
      <div className="min-h-screen bg-background">
        <TopNav />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PageHeader
            onAdd={handleAdd}
            showActiveOnly={showActiveOnly}
            onToggleFilter={setShowActiveOnly}
          />

          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            </div>
          ) : (
            <FilterList
              filters={displayedFilters}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          )}

          {isModalOpen && (
            <FilterModal
              filter={editingFilter}
              onSave={handleSave}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </main>
      </div>
    </ProtectedRoute>
  )
}
