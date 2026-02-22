// Filter buttons untuk status user (active/inactive)
'use client'

interface StatusFilterProps {
  selected: 'all' | 'active' | 'inactive'
  onChange: (status: 'all' | 'active' | 'inactive') => void
}

export function StatusFilter({ selected, onChange }: StatusFilterProps) {
  const filters: Array<{ value: 'all' | 'active' | 'inactive'; label: string }> = [
    { value: 'all', label: 'Semua' },
    { value: 'active', label: 'Aktif' },
    { value: 'inactive', label: 'Non-Aktif' },
  ]

  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selected === filter.value
              ? 'bg-accent text-accent-foreground'
              : 'bg-primary/50 text-muted-foreground hover:bg-primary/70'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
