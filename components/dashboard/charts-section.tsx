'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { itemVariants } from '@/lib/animations/variants'
import { useAuth } from '@/contexts/auth-context'
import { SentimentChart } from '@/components/sentiment-chart'

const API_URL = 'http://103.245.38.28/api'

export function ChartsSection() {
  const { token } = useAuth()
  const [sentimentData, setSentimentData] = useState({ positif: 0, negatif: 0, netral: 0 })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return
      try {
        const response = await fetch(`${API_URL}/crawled-data?limit=100`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
        })
        const result = await response.json()
        if (result.success && result.data && result.data.data) {
          const data = result.data.data
          setSentimentData({
            positif: data.filter((item: any) => item.ai_sentiment === 'Positif').length,
            negatif: data.filter((item: any) => item.ai_sentiment === 'Negatif').length,
            netral: data.filter((item: any) => item.ai_sentiment === 'Netral').length,
          })
        }
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [token])

  if (isLoading) return <div className="h-64 flex items-center justify-center border rounded-xl mb-8">Memuat Grafik...</div>

  const total = sentimentData.positif + sentimentData.negatif + sentimentData.netral || 1

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

      {/* Sentiment Distribution & Activity */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
        className="bg-card border border-border rounded-lg p-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Distribusi Sentimen
        </h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Positif</span>
              <span className="font-semibold text-foreground">{Math.round((sentimentData.positif / total) * 100)}%</span>
            </div>
            <div className="w-full bg-primary/50 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(sentimentData.positif / total) * 100}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Netral</span>
              <span className="font-semibold text-foreground">{Math.round((sentimentData.netral / total) * 100)}%</span>
            </div>
            <div className="w-full bg-primary/50 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(sentimentData.netral / total) * 100}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Negatif</span>
              <span className="font-semibold text-foreground">{Math.round((sentimentData.negatif / total) * 100)}%</span>
            </div>
            <div className="w-full bg-primary/50 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(sentimentData.negatif / total) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Aktivitas Terakhir
          </h3>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              <span className="text-green-500">✓</span> Login Admin - 5 menit lalu
            </p>
            <p className="text-muted-foreground">
              <span className="text-accent">!</span> Data diperbarui - 2 menit lalu
            </p>
            <p className="text-muted-foreground">
              <span className="text-blue-500">i</span> Report generated - 1 jam lalu
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
