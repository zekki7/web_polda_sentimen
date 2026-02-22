// Filter controls untuk audit log
'use client'

interface LogFiltersProps {
  filters: {
    dateRange: string
    user: string
    action: string
  }
  onFilterChange: (filters: any) => void
}

export function LogFilters({ filters, onFilterChange }: LogFiltersProps) {
  const dateRangeOptions = [
    { value: 'today', label: 'Hari Ini' },
    { value: '7days', label: '7 Hari Terakhir' },
    { value: '30days', label: '30 Hari Terakhir' },
    { value: 'all', label: 'Semua' },
  ]

  const actionOptions = [
    { value: 'all', label: 'Semua Aksi' },
    { value: 'UPDATE_USER_ROLE', label: 'Update Role' },
    { value: 'DEACTIVATE_USER', label: 'Nonaktifkan User' },
    { value: 'CREATE_USER', label: 'Buat User' },
    { value: 'VALIDATE_SENTIMENT', label: 'Validasi Sentiment' },
    { value: 'CREATE_FILTER', label: 'Buat Filter' },
  ]

  return (
    <div className="mb-6 bg-card border border-border rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Periode
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) =>
              onFilterChange({ ...filters, dateRange: e.target.value })
            }
            className="w-full px-3 py-2 bg-primary/50 border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {dateRangeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* User Filter */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            User
          </label>
          <select
            value={filters.user}
            onChange={(e) => onFilterChange({ ...filters, user: e.target.value })}
            className="w-full px-3 py-2 bg-primary/50 border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="all">Semua User</option>
            <option value="Admin Utama">Admin Utama</option>
            <option value="Analis Data Semarang">Analis Data Semarang</option>
          </select>
        </div>

        {/* Action Filter */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Jenis Aksi
          </label>
          <select
            value={filters.action}
            onChange={(e) =>
              onFilterChange({ ...filters, action: e.target.value })
            }
            className="w-full px-3 py-2 bg-primary/50 border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {actionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
