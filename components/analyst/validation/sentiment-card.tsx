// Card untuk menampilkan satu post yang perlu divalidasi
'use client'

import { motion } from 'framer-motion'
import { ValidationActions } from './validation-actions'
import type { SentimentValidation } from '@/lib/data/rbac-data'

interface SentimentCardProps {
  sentiment: SentimentValidation
  index: number
  onApprove: () => void
  onReject: () => void
  onEdit: (sentiment: 'Positif' | 'Negatif' | 'Netral') => void
}

export function SentimentCard({
  sentiment,
  index,
  onApprove,
  onReject,
  onEdit,
}: SentimentCardProps) {
  const getSentimentColor = (sent: string) => {
    switch (sent) {
      case 'Positif':
        return 'bg-green-900/30 text-green-300 border-green-700'
      case 'Negatif':
        return 'bg-red-900/30 text-red-300 border-red-700'
      default:
        return 'bg-blue-900/30 text-blue-300 border-blue-700'
    }
  }

  const getConfidenceColor = (score: number) => {
    if (score >= 90) return 'text-green-400'
    if (score >= 75) return 'text-yellow-400'
    return 'text-orange-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`bg-card border rounded-lg p-6 ${
        sentiment.is_validated
          ? 'border-border opacity-60'
          : 'border-accent shadow-lg'
      }`}
    >
      {/* Post Content */}
      <div className="mb-4">
        <p className="text-foreground text-base leading-relaxed">
          "{sentiment.content}"
        </p>
      </div>

      {/* Platform & Posted Date */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
        <span className="px-2 py-1 bg-purple-900/30 text-purple-300 rounded">
          {sentiment.platform}
        </span>
        <span>{sentiment.posted_at}</span>
        <span>Post ID: {sentiment.post_id}</span>
      </div>

      {/* AI Analysis */}
      <div className="bg-primary/30 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🤖</span>
          <h4 className="font-semibold text-foreground">AI Analysis:</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sentiment Prediction */}
          <div>
            <p className="text-xs text-muted-foreground mb-1">Sentiment:</p>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getSentimentColor(
                sentiment.ai_sentiment
              )}`}
            >
              {sentiment.ai_sentiment}
            </span>
          </div>

          {/* Confidence Score */}
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              Confidence Score:
            </p>
            <span
              className={`text-2xl font-bold ${getConfidenceColor(
                sentiment.confidence_score
              )}`}
            >
              {sentiment.confidence_score}%
            </span>
          </div>

          {/* Main Topic */}
          <div>
            <p className="text-xs text-muted-foreground mb-1">Topic:</p>
            <span className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded text-sm">
              {sentiment.main_topic}
            </span>
          </div>

          {/* Keywords */}
          <div>
            <p className="text-xs text-muted-foreground mb-1">Keywords:</p>
            <div className="flex flex-wrap gap-1">
              {sentiment.keywords.map((keyword, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-orange-900/30 text-orange-300 rounded text-xs"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Region */}
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground">
            📍 Wilayah: <span className="text-foreground">{sentiment.region}</span>
          </p>
        </div>
      </div>

      {/* Validation Status or Actions */}
      {sentiment.is_validated ? (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-3">
          <p className="text-sm text-green-300">
            ✓ Sudah divalidasi oleh <strong>{sentiment.validated_by}</strong> pada{' '}
            {sentiment.validated_at}
          </p>
        </div>
      ) : (
        <ValidationActions
          currentSentiment={sentiment.ai_sentiment}
          onApprove={onApprove}
          onReject={onReject}
          onEdit={onEdit}
        />
      )}
    </motion.div>
  )
}
