// Header untuk halaman Filter Crawling
'use client'

import { motion } from 'framer-motion'

interface PageHeaderProps {
  onAdd: () => void
  showActiveOnly: boolean
  onToggleFilter: (show: boolean) => void
}

export function PageHeader({ onAdd, showActiveOnly, onToggleFilter }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Filter Crawling
          </h1>
          <p className="text-muted-foreground">
            Kelola filter untuk crawling data sosial media
          </p>
        </div>

        <button
          onClick={onAdd}
          className="px-4 py-2 bg-accent text-accent-foreground rounded-md font-medium hover:bg-accent/90 transition-colors"
        >
          + Tambah Filter Baru
        </button>
      </div>

      {/* Toggle Active Only */}
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={() => onToggleFilter(false)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            !showActiveOnly
              ? 'bg-accent text-accent-foreground'
              : 'bg-primary/50 text-muted-foreground hover:bg-primary/70'
          }`}
        >
          Semua Filter
        </button>
        <button
          onClick={() => onToggleFilter(true)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            showActiveOnly
              ? 'bg-accent text-accent-foreground'
              : 'bg-primary/50 text-muted-foreground hover:bg-primary/70'
          }`}
        >
          Aktif Saja
        </button>
      </div>
    </motion.div>
  )
}
