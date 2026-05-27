// Header untuk halaman Sentiment Validation dengan stats
'use client'

import { motion } from 'framer-motion'

interface PageHeaderProps {
  totalUnvalidated: number
}

export function PageHeader({ totalUnvalidated }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 sm:mb-8 overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Validasi Sentiment
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Review dan validasi hasil analisis AI
          </p>
        </div>

        {/* Stats Badge */}
        <div className="px-4 py-3 bg-card border border-accent rounded-lg">
          <div className="text-xs sm:text-sm text-muted-foreground mb-1">
            Menunggu Validasi
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-accent">
            {totalUnvalidated}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
