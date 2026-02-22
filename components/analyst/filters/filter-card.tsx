// Card untuk menampilkan satu filter
'use client'

import { motion } from 'framer-motion'
import type { CrawlingFilter } from '@/lib/data/rbac-data'

interface FilterCardProps {
  filter: CrawlingFilter
  index: number
  onEdit: () => void
  onDelete: () => void
  onToggle: () => void
}

export function FilterCard({ filter, index, onEdit, onDelete, onToggle }: FilterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className={`bg-card border rounded-lg p-6 transition-all hover:shadow-lg ${
        filter.is_active ? 'border-accent' : 'border-border opacity-60'
      }`}
    >
      {/* Header dengan nama dan status */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-semibold text-foreground text-lg">{filter.name}</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            filter.is_active
              ? 'bg-green-900/30 text-green-300'
              : 'bg-gray-900/30 text-gray-300'
          }`}
        >
          {filter.is_active ? 'Aktif' : 'Non-Aktif'}
        </span>
      </div>

      {/* Keywords */}
      <div className="mb-3">
        <p className="text-xs text-muted-foreground mb-2">Keywords:</p>
        <div className="flex flex-wrap gap-2">
          {filter.keywords.map((keyword, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded text-xs"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* Platforms */}
      <div className="mb-3">
        <p className="text-xs text-muted-foreground mb-2">Platform:</p>
        <div className="flex flex-wrap gap-2">
          {filter.platforms.map((platform, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-purple-900/30 text-purple-300 rounded text-xs capitalize"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>

      {/* Regions */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2">Wilayah:</p>
        <div className="flex flex-wrap gap-2">
          {filter.regions.map((region, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-orange-900/30 text-orange-300 rounded text-xs"
            >
              {region}
            </span>
          ))}
        </div>
      </div>

      {/* Footer dengan info dan actions */}
      <div className="pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground mb-3">
          <p>Dibuat oleh: {filter.created_by}</p>
          <p>Tanggal: {filter.created_at}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex-1 px-3 py-2 bg-blue-900/30 text-blue-300 rounded-md text-sm font-medium hover:bg-blue-900/50 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={onToggle}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              filter.is_active
                ? 'bg-yellow-900/30 text-yellow-300 hover:bg-yellow-900/50'
                : 'bg-green-900/30 text-green-300 hover:bg-green-900/50'
            }`}
          >
            {filter.is_active ? 'Nonaktifkan' : 'Aktifkan'}
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-2 bg-red-900/30 text-red-300 rounded-md text-sm font-medium hover:bg-red-900/50 transition-colors"
          >
            Hapus
          </button>
        </div>
      </div>
    </motion.div>
  )
}
