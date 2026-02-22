// List untuk menampilkan sentiment cards
'use client'

import { motion } from 'framer-motion'
import { SentimentCard } from './sentiment-card'
import type { SentimentValidation } from '@/lib/data/rbac-data'

interface SentimentListProps {
  sentiments: SentimentValidation[]
  onApprove: (id: number) => void
  onReject: (id: number) => void
  onEdit: (id: number, sentiment: 'Positif' | 'Negatif' | 'Netral') => void
}

export function SentimentList({
  sentiments,
  onApprove,
  onReject,
  onEdit,
}: SentimentListProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      {sentiments.map((sentiment, index) => (
        <SentimentCard
          key={sentiment.id}
          sentiment={sentiment}
          index={index}
          onApprove={() => onApprove(sentiment.id)}
          onReject={() => onReject(sentiment.id)}
          onEdit={(newSentiment) => onEdit(sentiment.id, newSentiment)}
        />
      ))}

      {/* Empty state */}
      {sentiments.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground text-lg">
            Tidak ada data untuk divalidasi
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Semua sentiment sudah divalidasi atau filter tidak menemukan hasil
          </p>
        </div>
      )}
    </motion.div>
  )
}
