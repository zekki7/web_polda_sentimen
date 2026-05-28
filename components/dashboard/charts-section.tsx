'use client'
import { motion } from 'framer-motion'
import { itemVariants } from '@/lib/animations/variants'
import { SentimentChart } from '@/components/sentiment-chart'

interface ChartsSectionProps {
  rawData: any[]
}

export function ChartsSection({ rawData }: ChartsSectionProps) {
  const positif = rawData.filter((item: any) => item.ai_sentiment === 'Positif').length
  const negatif = rawData.filter((item: any) => item.ai_sentiment === 'Negatif').length
  const netral = rawData.filter((item: any) => item.ai_sentiment === 'Netral' || !item.ai_sentiment).length
  const total = positif + negatif + netral || 1

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }} className="lg:col-span-2">
        <SentimentChart rawData={rawData} />
      </motion.div>
      <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.5 }} className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Distribusi Sentimen</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Positif</span>
              <span className="font-semibold text-foreground">{Math.round((positif / total) * 100)}%</span>
            </div>
            <div className="w-full bg-primary/50 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(positif / total) * 100}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Netral</span>
              <span className="font-semibold text-foreground">{Math.round((netral / total) * 100)}%</span>
            </div>
            <div className="w-full bg-primary/50 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(netral / total) * 100}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Negatif</span>
              <span className="font-semibold text-foreground">{Math.round((negatif / total) * 100)}%</span>
            </div>
            <div className="w-full bg-primary/50 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(negatif / total) * 100}%` }} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
