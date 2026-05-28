// Halaman Validasi Sentiment - Analyst, Admin, Superadmin
'use client'

import { useState, useEffect } from 'react'
import { TopNav } from '@/components/top-nav'
import { ProtectedRoute } from '@/components/protected-route'
import { useAuth } from '@/contexts/auth-context'
import { PageHeader } from '@/components/analyst/validation/page-header'
import { SentimentList } from '@/components/analyst/validation/sentiment-list'
import { SentimentFilters } from '@/components/analyst/validation/sentiment-filters'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://103.245.38.28/api'

export default function SentimentValidationPage() {
  const { token, user } = useAuth()
  const [sentiments, setSentiments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    showValidated: false,
    sentiment: 'all',
    region: 'all',
  })

  // Fetch Data dari Backend
  const fetchSentiments = async () => {
    if (!token) return
    setIsLoading(true)
    try {
      const response = await fetch(`${API_URL}/crawled-data?limit=200`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      })
      const result = await response.json()
      if (result.success && result.data?.data) {
        setSentiments(result.data.data)
      }
    } catch (error) {
      console.error('Gagal mengambil data sentimen:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSentiments()
  }, [token])

  // Fungsi Approve (Validasi)
  const handleApprove = async (id: number) => {
    if (!token) return
    try {
      const response = await fetch(`${API_URL}/crawled-data/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          is_validated: true,
          validated_by: user?.name,
        }),
      })

      if (response.ok) {
        setSentiments((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, is_validated: true, validated_by: user?.name } : item
          )
        )
      }
    } catch (error) {
      console.error('Gagal menyetujui sentimen:', error)
    }
  }

  // Fungsi Reject (Hapus/Abaikan data)
  const handleReject = async (id: number) => {
    if (!token || !confirm('Abaikan/Hapus hasil analisis AI ini dari daftar?')) return
    try {
      const response = await fetch(`${API_URL}/crawled-data/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      })

      if (response.ok) {
        setSentiments((prev) => prev.filter((item) => item.id !== id))
      }
    } catch (error) {
      console.error('Gagal menghapus data:', error)
    }
  }

  // Fungsi Edit Sentimen Manual
  const handleEdit = async (id: number, newSentiment: 'Positif' | 'Negatif' | 'Netral') => {
    if (!token) return
    try {
      const response = await fetch(`${API_URL}/crawled-data/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ai_sentiment: newSentiment,
          is_validated: true,
          validated_by: user?.name,
        }),
      })

      if (response.ok) {
        setSentiments((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, ai_sentiment: newSentiment, is_validated: true, validated_by: user?.name } : item
          )
        )
      }
    } catch (error) {
      console.error('Gagal memperbarui sentimen:', error)
    }
  }

  // Logika Filter
  const filteredSentiments = (sentiments ?? []).filter((item) => {
    if (!filters.showValidated && item.is_validated) return false
    if (filters.sentiment !== 'all' && item.ai_sentiment !== filters.sentiment) return false
    if (filters.region !== 'all' && item.region_code !== filters.region) return false
    return true
  })

  return (
    <ProtectedRoute allowedRoles={['analyst', 'super_admin', 'admin', 'officer']}>
      <div className="min-h-screen bg-background">
        <TopNav />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PageHeader totalUnvalidated={sentiments.filter((s) => !s.is_validated).length} />

          <SentimentFilters filters={filters} onFilterChange={setFilters} />

          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            </div>
          ) : (
            <SentimentList
              sentiments={filteredSentiments}
              onApprove={handleApprove}
              onReject={handleReject}
              onEdit={handleEdit}
            />
          )}
        </main>
      </div>
    </ProtectedRoute>
  )
}
