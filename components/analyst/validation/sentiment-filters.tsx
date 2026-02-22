// Filter controls untuk sentiment validation
'use client'

interface SentimentFiltersProps {
  filters: {
    showValidated: boolean
    sentiment: string
    region: string
  }
  onFilterChange: (filters: any) => void
}

export function SentimentFilters({ filters, onFilterChange }: SentimentFiltersProps) {
  const sentimentOptions = [
    { value: 'all', label: 'Semua Sentiment' },
    { value: 'Positif', label: 'Positif' },
    { value: 'Negatif', label: 'Negatif' },
    { value: 'Netral', label: 'Netral' },
  ]

  const regionOptions = [
    { value: 'all', label: 'Semua Wilayah' },
    { value: 'SEMARANG', label: 'Semarang' },
    { value: 'SURAKARTA', label: 'Surakarta' },
    { value: 'SALATIGA', label: 'Salatiga' },
    { value: 'PEKALONGAN', label: 'Pekalongan' },
    { value: 'PURWOKERTO', label: 'Purwokerto' },
  ]

  return (
    <div className="mb-6 bg-card border border-border rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Show Validated Toggle */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Status Validasi
          </label>
          <div className="flex gap-2">
            <button
              onClick={() =>
                onFilterChange({ ...filters, showValidated: false })
              }
              className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                !filters.showValidated
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-primary/50 text-muted-foreground hover:bg-primary/70'
              }`}
            >
              Belum Validasi
            </button>
            <button
              onClick={() =>
                onFilterChange({ ...filters, showValidated: true })
              }
              className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                filters.showValidated
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-primary/50 text-muted-foreground hover:bg-primary/70'
              }`}
            >
              Semua
            </button>
          </div>
        </div>

        {/* Sentiment Filter */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Sentiment
          </label>
          <select
            value={filters.sentiment}
            onChange={(e) =>
              onFilterChange({ ...filters, sentiment: e.target.value })
            }
            className="w-full px-3 py-2 bg-primary/50 border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {sentimentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Region Filter */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Wilayah
          </label>
          <select
            value={filters.region}
            onChange={(e) =>
              onFilterChange({ ...filters, region: e.target.value })
            }
            className="w-full px-3 py-2 bg-primary/50 border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {regionOptions.map((option) => (
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
