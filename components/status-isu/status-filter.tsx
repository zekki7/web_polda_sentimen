// Komponen filter status untuk isu
'use client'

import { STATUS_FILTERS } from '@/lib/data/issues-data'

interface StatusFilterProps {
  filterStatus: string
  onFilterChange: (status: string) => void
}

export function StatusFilter({ filterStatus, onFilterChange }: StatusFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {STATUS_FILTERS.map((status) => (
        <button
          key={status}
          onClick={() => onFilterChange(status)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            filterStatus === status
              ? 'bg-accent text-accent-foreground'
              : 'bg-primary/50 text-muted-foreground hover:bg-primary/70'
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  )
}
