// Komponen word cloud untuk menampilkan kata kunci dominan
'use client'

import { motion } from 'framer-motion'
import { wordCloudData } from '@/lib/data/region-data'

export function DominantKeywords() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card border border-border rounded-lg p-6 mb-8"
    >
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Kata Kunci Dominan
      </h2>
      <div className="flex flex-wrap gap-3 justify-center py-8">
        {wordCloudData.map((item, index) => (
          <motion.div
            key={item.word}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="px-4 py-2 bg-gradient-to-r from-accent to-secondary rounded-full text-accent-foreground text-sm font-semibold hover:shadow-lg transition-shadow cursor-pointer"
            style={{ fontSize: `${10 + item.value / 5}px` }}
          >
            {item.word}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
