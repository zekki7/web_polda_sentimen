'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '@/contexts/auth-context'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://103.245.38.28/api'

export function MapSummary() {
  const { token } = useAuth()
  const [regions, setRegions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMapData = async () => {
      if (!token) return
      try {
        const response = await fetch(`${API_URL}/crawled-data?limit=200`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
        })
        const result = await response.json()

        if (result.success && result.data && result.data.data) {
          const data = result.data.data
          const locationStats: Record<string, any> = {}

          // Algoritma pengelompokan wilayah
          data.forEach((item: any) => {
            const loc = item.location
            if (!loc || loc.toLowerCase() === 'tidak diketahui') return

            // Normalisasi nama wilayah
            const cleanLoc = loc.charAt(0).toUpperCase() + loc.slice(1).toLowerCase()

            if (!locationStats[cleanLoc]) {
              locationStats[cleanLoc] = { Positif: 0, Negatif: 0, Netral: 0, total: 0 }
            }

            const sentiment = item.ai_sentiment || 'Netral'
            if (sentiment === 'Positif') locationStats[cleanLoc].Positif++
            else if (sentiment === 'Negatif') locationStats[cleanLoc].Negatif++
            else locationStats[cleanLoc].Netral++

            locationStats[cleanLoc].total++
          })

          // Tentukan dominasi sentimen per wilayah
          const processedRegions = Object.keys(locationStats).map(loc => {
            const stats = locationStats[loc]
            let dominant = 'Netral'
            let maxCount = stats.Netral

            if (stats.Positif > maxCount) { dominant = 'Positif'; maxCount = stats.Positif }
            if (stats.Negatif > maxCount) { dominant = 'Negatif'; maxCount = stats.Negatif }

            let color = 'bg-blue-500'
            if (dominant === 'Positif') color = 'bg-green-500'
            if (dominant === 'Negatif') color = 'bg-red-500'

            return {
              name: loc,
              sentiment: dominant,
              percentage: Math.round((maxCount / stats.total) * 100),
              color: color,
              total: stats.total
            }
          })

          // Ambil 6 wilayah dengan laporan terbanyak
          const topRegions = processedRegions.sort((a, b) => b.total - a.total).slice(0, 6)
          setRegions(topRegions)
        }
      } catch (error) {
        console.error('Gagal memuat data peta:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMapData()
  }, [token])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Analisis Pantauan Wilayah</h2>
          <p className="text-sm text-muted-foreground">Distribusi sentimen riil per kabupaten/kota</p>
        </div>
        <Link href="/analisis" className="px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-md text-sm font-medium transition-colors">
          Lihat Detail
        </Link>
      </div>

      {isLoading ? (
        <div className="mb-6 bg-primary/20 rounded-lg p-8 text-center min-h-64 flex items-center justify-center animate-pulse">
          <p className="text-muted-foreground">Mengkalkulasi sentimen wilayah...</p>
        </div>
      ) : regions.length === 0 ? (
        <div className="mb-6 bg-primary/20 rounded-lg p-8 text-center min-h-64 flex flex-col items-center justify-center">
          <p className="text-4xl mb-2">📡</p>
          <p className="text-muted-foreground">Menunggu data lokasi yang valid dari mesin AI...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {regions.map((region, index) => (
            <motion.div key={region.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }} className="bg-primary/50 border border-border rounded-lg p-4">
              <p className="font-semibold text-foreground mb-2 truncate">{region.name}</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{region.sentiment}</span>
                <span className="text-sm font-bold text-foreground">{region.percentage}%</span>
              </div>
              <div className="w-full bg-primary rounded-full h-2">
                <motion.div initial={{ width: 0 }} animate={{ width: `${region.percentage}%` }} transition={{ delay: 0.5 + index * 0.05, duration: 0.8 }} className={`h-2 rounded-full ${region.color}`} />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-sm font-semibold text-foreground mb-3">Indikator Sentimen</p>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-muted-foreground">Dominan Positif</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm text-muted-foreground">Netral</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-sm text-muted-foreground">Dominan Negatif</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
