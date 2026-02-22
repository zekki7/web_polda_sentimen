// Grid layout untuk menampilkan filter cards
'use client'

import { motion } from 'framer-motion'
import { FilterCard } from './filter-card'
import type { CrawlingFilter } from '@/lib/data/rbac-data'

interface FilterListProps {
  filters: CrawlingFilter[]
  onEdit: (filter: CrawlingFilter) => void
  onDelete: (id: number) => void
  onToggle: (id: number) => void
}

export function FilterList({ filters, onEdit, onDelete, onToggle }: FilterListProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {filters.map((filter, index) => (
        <FilterCard
          key={filter.id}
          filter={filter}
          index={index}
          onEdit={() => onEdit(filter)}
          onDelete={() => onDelete(filter.id)}
          onToggle={() => onToggle(filter.id)}
        />
      ))}

      {/* Empty state */}
      {filters.length === 0 && (
        <div className="col-span-full py-12 text-center">
          <p className="text-muted-foreground text-lg">
            Tidak ada filter yang ditemukan
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Klik tombol "Tambah Filter Baru" untuk membuat filter
          </p>
        </div>
      )}
    </motion.div>
  )
}
