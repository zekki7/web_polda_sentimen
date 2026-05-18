// Komponen filter status untuk isu
'use client'

interface StatusFilterProps {
  filterStatus: string
  onFilterChange: (status: string) => void
}

const STATUS_OPTIONS = [
  { value: 'Semua', label: 'Semua' },
  { value: 'Sedang Ditangani', label: 'Sedang Ditangani' },
  { value: 'Perlu Tindak Lanjut', label: 'Perlu Tindak Lanjut' },
  { value: 'Selesai', label: 'Selesai' },
]

export function StatusFilter({ filterStatus, onFilterChange }: StatusFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {STATUS_OPTIONS.map((status) => (
        <button
          key={status.value}
          onClick={() => onFilterChange(status.value)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            filterStatus === status.value
              ? 'bg-accent text-accent-foreground'
              : 'bg-primary/50 text-muted-foreground hover:bg-primary/70'
          }`}
        >
          {status.label}
        </button>
      ))}
    </div>
  )
}
