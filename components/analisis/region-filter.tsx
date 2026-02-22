// Komponen filter wilayah untuk daftar laporan
'use client'

interface RegionFilterProps {
  selectedRegion: string | null
  onRegionChange: (region: string | null) => void
}

const REGIONS = ['Semua', 'Semarang', 'Surakarta', 'Salatiga', 'Pekalongan', 'Purwokerto']

export function RegionFilter({
  selectedRegion,
  onRegionChange,
}: RegionFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {REGIONS.map((region) => (
        <button
          key={region}
          onClick={() =>
            onRegionChange(region === 'Semua' ? null : region)
          }
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            (region === 'Semua' && !selectedRegion) ||
            selectedRegion === region
              ? 'bg-accent text-accent-foreground'
              : 'bg-primary/50 text-muted-foreground hover:bg-primary/70'
          }`}
        >
          {region}
        </button>
      ))}
    </div>
  )
}
