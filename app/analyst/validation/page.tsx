// Halaman Validasi Sentiment - Analyst Only
'use client'

import { useState } from 'react'
import { TopNav } from '@/components/top-nav'
import { ProtectedRoute } from '@/components/protected-route'
import { useAuth } from '@/contexts/auth-context'
import { PageHeader } from '@/components/analyst/validation/page-header'
import { SentimentList } from '@/components/analyst/validation/sentiment-list'
import { SentimentFilters } from '@/components/analyst/validation/sentiment-filters'
import { mockSentiments } from '@/lib/data/rbac-data'
import type { SentimentValidation } from '@/lib/data/rbac-data'

export default function SentimentValidationPage() {
  const { user } = useAuth()
  const [sentiments, setSentiments] = useState<SentimentValidation[]>(mockSentiments)
  const [filters, setFilters] = useState({
    showValidated: false,
    sentiment: 'all',
    region: 'all',
  })

  const filteredSentiments = sentiments.filter((item) => {
    // Filter by validation status
    if (!filters.showValidated && item.is_validated) {
      return false
    }

    // Filter by sentiment
    if (filters.sentiment !== 'all' && item.ai_sentiment !== filters.sentiment) {
      return false
    }

    // Filter by region
    if (filters.region !== 'all' && item.region !== filters.region) {
      return false
    }

    return true
  })

  const handleApprove = (id: number) => {
    setSentiments(
      sentiments.map((item) =>
        item.id === id
          ? {
              ...item,
              is_validated: true,
              validated_by: user?.name,
              validated_at: new Date().toISOString(),
            }
          : item
      )
    )
    // TODO: Call API
    console.log(`Approved sentiment ${id}`)
  }

  const handleReject = (id: number) => {
    if (confirm('Reject hasil analisis AI ini?')) {
      setSentiments(sentiments.filter((item) => item.id !== id))
      // TODO: Call API
      console.log(`Rejected sentiment ${id}`)
    }
  }

  const handleEdit = (id: number, newSentiment: 'Positif' | 'Negatif' | 'Netral') => {
    setSentiments(
      sentiments.map((item) =>
        item.id === id
          ? {
              ...item,
              ai_sentiment: newSentiment,
              is_validated: true,
              validated_by: user?.name,
              validated_at: new Date().toISOString(),
            }
          : item
      )
    )
    // TODO: Call API
    console.log(`Edited sentiment ${id} to ${newSentiment}`)
  }

  return (
    <ProtectedRoute allowedRoles={['analyst']}>
      <div className="min-h-screen bg-background">
        <TopNav />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PageHeader totalUnvalidated={sentiments.filter((s) => !s.is_validated).length} />

          <SentimentFilters filters={filters} onFilterChange={setFilters} />

          <SentimentList
            sentiments={filteredSentiments}
            onApprove={handleApprove}
            onReject={handleReject}
            onEdit={handleEdit}
          />
        </main>
      </div>
    </ProtectedRoute>
  )
}
