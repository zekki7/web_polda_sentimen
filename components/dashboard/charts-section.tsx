// Komponen section untuk charts (sentiment trend + distribution)
'use client'

import { motion } from 'framer-motion'
import { SentimentChart } from '@/components/sentiment-chart'
import { SentimentDistribution } from '@/components/dashboard/sentiment-distribution'
import { itemVariants } from '@/lib/animations/variants'

export function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Sentiment Trend Chart */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
        className="lg:col-span-2"
      >
        <SentimentChart />
      </motion.div>

      {/* Sentiment Distribution */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
      >
        <SentimentDistribution />
      </motion.div>
    </div>
  )
}
