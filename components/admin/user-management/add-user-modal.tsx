// Modal untuk tambah user baru
'use client'

import { useState, useEffect } from 'react'
import { X, UserPlus, AlertCircle } from 'lucide-react'

interface AddUserModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (user: NewUserData) => void
}

export interface NewUserData {
  name: string
  nrp: string
  email: string
  role: 'super_admin' | 'analyst' | 'user'
  region_code: string
}

export function AddUserModal({ isOpen, onClose, onAdd }: AddUserModalProps) {
  const [formData, setFormData] = useState<NewUserData>({
    name: '',
    nrp: '',
    email: '',
    role: 'user',
    region_code: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof NewUserData, string>>>({})

  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: '', nrp: '', email: '', role: 'user', region_code: '' })
      setErrors({})
    }
  }, [isOpen])

  if (!isOpen) return null

  const validate = () => {
    const newErrors: Partial<Record<keyof NewUserData, string>> = {}

    if (!formData.name.trim()) newErrors.name = 'Nama wajib diisi'
    if (!formData.nrp.trim()) newErrors.nrp = 'NRP wajib diisi'
    else if (formData.nrp.length < 5) newErrors.nrp = 'NRP minimal 5 karakter'
    if (!formData.email.trim()) newErrors.email = 'Email wajib diisi'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Format email tidak valid'
    if (!formData.region_code.trim()) newErrors.region_code = 'Wilayah wajib diisi'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onAdd(formData)
      onClose()
    }
  }

  const handleChange = (field: keyof NewUserData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-card border border-border rounded-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Tambah User Baru</h2>
              <p className="text-sm text-muted-foreground">Lengkapi data user di bawah</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-primary/50 transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nama */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Masukkan nama lengkap"
              className={`w-full px-4 py-2 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
                errors.name ? 'border-red-500' : 'border-border'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.name}
              </p>
            )}
          </div>

          {/* NRP */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              NRP
            </label>
            <input
              type="text"
              value={formData.nrp}
              onChange={(e) => handleChange('nrp', e.target.value)}
              placeholder="Masukkan NRP"
              className={`w-full px-4 py-2 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
                errors.nrp ? 'border-red-500' : 'border-border'
              }`}
            />
            {errors.nrp && (
              <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.nrp}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="email@contoh.com"
              className={`w-full px-4 py-2 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
                errors.email ? 'border-red-500' : 'border-border'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.email}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value as NewUserData['role'])}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="super_admin">Super Admin</option>
              <option value="analyst">Analyst</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* Region */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Wilayah
            </label>
            <input
              type="text"
              value={formData.region_code}
              onChange={(e) => handleChange('region_code', e.target.value)}
              placeholder="Contoh: SEMARANG, SURAKARTA"
              className={`w-full px-4 py-2 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
                errors.region_code ? 'border-red-500' : 'border-border'
              }`}
            />
            {errors.region_code && (
              <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.region_code}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border border-border text-muted-foreground text-sm font-medium hover:bg-primary/50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/80 transition-colors"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}