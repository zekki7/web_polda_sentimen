// Halaman Filter Crawling - Analyst Only
'use client'

import { useState } from 'react'
import { TopNav } from '@/components/top-nav'
import { ProtectedRoute } from '@/components/protected-route'
import { PageHeader } from '@/components/analyst/filters/page-header'
import { FilterList } from '@/components/analyst/filters/filter-list'
import { FilterModal } from '@/components/analyst/filters/filter-modal'
import { mockFilters } from '@/lib/data/rbac-data'
import type { CrawlingFilter } from '@/lib/data/rbac-data'

export default function FilterCrawlingPage() {
  const [filters, setFilters] = useState<CrawlingFilter[]>(mockFilters)
  const [showActiveOnly, setShowActiveOnly] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingFilter, setEditingFilter] = useState<CrawlingFilter | null>(null)

  const displayedFilters = showActiveOnly
    ? filters.filter((f) => f.is_active)
    : filters

  const handleAdd = () => {
    setEditingFilter(null)
    setIsModalOpen(true)
  }

  const handleEdit = (filter: CrawlingFilter) => {
    setEditingFilter(filter)
    setIsModalOpen(true)
  }

  const handleSave = (filter: CrawlingFilter) => {
    if (editingFilter) {
      // Update existing
      setFilters(filters.map((f) => (f.id === filter.id ? filter : f)))
    } else {
      // Add new
      setFilters([...filters, { ...filter, id: Date.now() }])
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id: number) => {
    if (confirm('Hapus filter ini?')) {
      setFilters(filters.filter((f) => f.id !== id))
    }
  }

  const handleToggle = (id: number) => {
    setFilters(
      filters.map((f) =>
        f.id === id ? { ...f, is_active: !f.is_active } : f
      )
    )
  }

  return (
    <ProtectedRoute allowedRoles={['analyst']}>
      <div className="min-h-screen bg-background">
        <TopNav />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PageHeader
            onAdd={handleAdd}
            showActiveOnly={showActiveOnly}
            onToggleFilter={setShowActiveOnly}
          />

          <FilterList
            filters={displayedFilters}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />

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
