// Komponen card untuk menampilkan satu laporan
'use client'

import { motion } from 'framer-motion'
import { Report } from '@/lib/data/region-data'

interface ReportCardProps {
  report: Report
  index: number
}

export function ReportCard({ report, index }: ReportCardProps) {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positif':
        return 'bg-green-900/30 text-green-300 border-green-700'
      case 'Negatif':
        return 'bg-red-900/30 text-red-300 border-red-700'
      default:
        return 'bg-blue-900/30 text-blue-300 border-blue-700'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border border-border rounded-lg p-4 hover:border-accent transition-colors"
    >
      <div className="flex items-start justify-between mb-2">
        <p className="text-foreground flex-1">{report.text}</p>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 border ${getSentimentColor(
            report.sentiment
          )}`}
        >
          {report.sentiment}
        </span>
      </div>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="px-2 py-1 bg-primary/50 rounded">
          {report.topic}
        </span>
        <span>{report.region}</span>
        <span>{report.time}</span>
      </div>
    </motion.div>
  )
}
