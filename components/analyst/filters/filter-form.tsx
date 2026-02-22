// Form untuk add/edit filter
'use client'

import { useState } from 'react'
import type { CrawlingFilter } from '@/lib/data/rbac-data'

interface FilterFormProps {
  filter: CrawlingFilter | null
  onSave: (filter: CrawlingFilter) => void
  onCancel: () => void
}

export function FilterForm({ filter, onSave, onCancel }: FilterFormProps) {
  const [formData, setFormData] = useState<Partial<CrawlingFilter>>({
    name: filter?.name || '',
    keywords: filter?.keywords || [],
    platforms: filter?.platforms || [],
    regions: filter?.regions || [],
    is_active: filter?.is_active ?? true,
    created_by: filter?.created_by || 'Current User',
    created_at: filter?.created_at || new Date().toISOString().split('T')[0],
  })

  const [keywordInput, setKeywordInput] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    filter?.platforms || []
  )
  const [selectedRegions, setSelectedRegions] = useState<string[]>(
    filter?.regions || []
  )

  const availablePlatforms = ['twitter', 'facebook', 'instagram', 'news']
  const availableRegions = ['SEMARANG', 'SURAKARTA', 'SALATIGA', 'PEKALONGAN', 'PURWOKERTO', 'JATENG']

  const handleAddKeyword = () => {
    if (keywordInput.trim()) {
      setFormData({
        ...formData,
        keywords: [...(formData.keywords || []), keywordInput.trim()],
      })
      setKeywordInput('')
    }
  }

  const handleRemoveKeyword = (index: number) => {
    setFormData({
      ...formData,
      keywords: formData.keywords?.filter((_, i) => i !== index),
    })
  }

  const handlePlatformToggle = (platform: string) => {
    const updated = selectedPlatforms.includes(platform)
      ? selectedPlatforms.filter((p) => p !== platform)
      : [...selectedPlatforms, platform]
    setSelectedPlatforms(updated)
    setFormData({ ...formData, platforms: updated })
  }

  const handleRegionToggle = (region: string) => {
    const updated = selectedRegions.includes(region)
      ? selectedRegions.filter((r) => r !== region)
      : [...selectedRegions, region]
    setSelectedRegions(updated)
    setFormData({ ...formData, regions: updated })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      id: filter?.id || Date.now(),
      name: formData.name!,
      keywords: formData.keywords!,
      platforms: formData.platforms!,
      regions: formData.regions!,
      is_active: formData.is_active!,
      created_by: formData.created_by!,
      created_at: formData.created_at!,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nama Filter */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Nama Filter *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 bg-primary/50 border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Contoh: Filter Kriminal Semarang"
        />
      </div>

      {/* Keywords */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Keywords *
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
            className="flex-1 px-4 py-2 bg-primary/50 border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Ketik keyword lalu tekan Enter"
          />
          <button
            type="button"
            onClick={handleAddKeyword}
            className="px-4 py-2 bg-accent text-accent-foreground rounded-md font-medium hover:bg-accent/90"
          >
            Tambah
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.keywords?.map((keyword, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm flex items-center gap-2"
            >
              {keyword}
              <button
                type="button"
                onClick={() => handleRemoveKeyword(i)}
                className="hover:text-red-400"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Platforms */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Platform *
        </label>
        <div className="flex flex-wrap gap-2">
          {availablePlatforms.map((platform) => (
            <button
              key={platform}
              type="button"
              onClick={() => handlePlatformToggle(platform)}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                selectedPlatforms.includes(platform)
                  ? 'bg-purple-900/50 text-purple-300 border-2 border-purple-700'
                  : 'bg-primary/50 text-muted-foreground border border-border hover:bg-primary/70'
              }`}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      {/* Regions */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Wilayah *
        </label>
        <div className="flex flex-wrap gap-2">
          {availableRegions.map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => handleRegionToggle(region)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedRegions.includes(region)
                  ? 'bg-orange-900/50 text-orange-300 border-2 border-orange-700'
                  : 'bg-primary/50 text-muted-foreground border border-border hover:bg-primary/70'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-md font-medium hover:bg-accent/90"
        >
          {filter ? 'Update Filter' : 'Simpan Filter'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-primary/50 text-muted-foreground rounded-md font-medium hover:bg-primary/70"
        >
          Batal
        </button>
      </div>
    </form>
  )
}
