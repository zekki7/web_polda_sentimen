// Filter dropdown untuk status user dengan chevron
'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, UserX, UserPlus } from 'lucide-react'

interface StatusFilterDropdownProps {
  selected: 'all' | 'active' | 'inactive'
  onChange: (status: 'all' | 'active' | 'inactive') => void
}

const FILTERS = [
  { value: 'all', label: 'Semua' },
  { value: 'active', label: 'Aktif' },
  { value: 'inactive', label: 'Non-Aktif' },
]

export function StatusFilterDropdown({ selected, onChange }: StatusFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedLabel = FILTERS.find(f => f.value === selected)?.label || 'Semua'

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium text-foreground hover:bg-primary/50 transition-colors"
      >
        <span>{selectedLabel}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-10">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => {
                onChange(filter.value)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                selected === filter.value
                  ? 'bg-accent text-accent-foreground'
                  : 'text-foreground hover:bg-primary/50'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Action buttons untuk tambah & hapus user
interface UserActionButtonsProps {
  onAddUser?: () => void
  onDeleteUser?: () => void
  selectedCount?: number
}

export function UserActionButtons({ onAddUser, onDeleteUser, selectedCount = 0 }: UserActionButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onDeleteUser}
        disabled={selectedCount === 0}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          selectedCount === 0
            ? 'border border-border bg-muted text-muted-foreground cursor-not-allowed opacity-50'
            : 'border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20'
        }`}
      >
        <UserX className="w-4 h-4" />
        {selectedCount > 0 ? `Hapus (${selectedCount})` : 'Hapus User'}
      </button>
      <button
        onClick={onAddUser}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/80 transition-colors"
      >
        <UserPlus className="w-4 h-4" />
        Tambah User
      </button>
    </div>
  )
}