'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { itemVariants } from '@/lib/animations/variants'
import { useAuth } from '@/contexts/auth-context'

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <motion.div variants={itemVariants} className="bg-card border rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-4">Distribusi Sentimen</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Positif ({sentimentData.positif})</span>
              <span>{Math.round((sentimentData.positif / total) * 100)}%</span>
            </div>
            <div className="w-full bg-secondary/20 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(sentimentData.positif / total) * 100}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Negatif ({sentimentData.negatif})</span>
              <span>{Math.round((sentimentData.negatif / total) * 100)}%</span>
            </div>
            <div className="w-full bg-secondary/20 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(sentimentData.negatif / total) * 100}%` }}></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
