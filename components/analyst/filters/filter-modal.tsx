// Modal wrapper untuk filter form
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FilterForm } from './filter-form'
import type { CrawlingFilter } from '@/lib/data/rbac-data'

interface FilterModalProps {
  filter: CrawlingFilter | null
  onSave: (filter: CrawlingFilter) => void
  onClose: () => void
}

export function FilterModal({ filter, onSave, onClose }: FilterModalProps) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-card border border-border rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              {filter ? 'Edit Filter' : 'Tambah Filter Baru'}
            </h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Form */}
          <div className="p-6">
            <FilterForm filter={filter} onSave={onSave} onClose={onClose} />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
