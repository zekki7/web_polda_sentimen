'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { useAuth } from '@/contexts/auth-context'
import { format, subDays, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://103.245.38.28/api'

export function SentimentChart() {
  const { token } = useAuth()
  const [chartData, setChartData] = useState<any[]>([])
  const [summary, setSummary] = useState({ peakPositif: 0, avgNetral: 0, peakNegatif: 0 })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchChartData = async () => {
      if (!token) return
      try {
        const response = await fetch(`${API_URL}/crawled-data?limit=50000`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
	  cache: 'no-store'
        })
        const result = await response.json()

        if (result.success && result.data && result.data.data) {
          const rawData = result.data.data

          // Buat template 7 hari terakhir (mundur dari hari ini)
          const last7Days = Array.from({ length: 7 }).map((_, i) => {
            const d = subDays(new Date(), 6 - i)
            return {
              date: format(d, 'EEE', { locale: id }), // Hasilnya: Sen, Sel, Rab
              fullDate: format(d, 'yyyy-MM-dd'),
              positif: 0,
              netral: 0,
              negatif: 0
            }
          })

          // Masukkan data dari API ke template hari yang sesuai
          rawData.forEach((item: any) => {
            if (!item.posted_at) return
            // Asumsi posted_at formatnya ISO atau YYYY-MM-DD
            const itemDate = format(parseISO(item.posted_at.split(' ')[0]), 'yyyy-MM-dd')
            
            const dayIndex = last7Days.findIndex(d => d.fullDate === itemDate)
            if (dayIndex !== -1) {
              const sentiment = item.ai_sentiment || 'Netral'
              if (sentiment === 'Positif') last7Days[dayIndex].positif++
              else if (sentiment === 'Negatif') last7Days[dayIndex].negatif++
              else last7Days[dayIndex].netral++
            }
          })

          setChartData(last7Days)

          // Kalkulasi Summary bawah grafik
          const pPos = Math.max(...last7Days.map(d => d.positif))
          const pNeg = Math.max(...last7Days.map(d => d.negatif))
          const tNetral = last7Days.reduce((sum, d) => sum + d.netral, 0)
          
          setSummary({
            peakPositif: pPos,
            avgNetral: Math.round(tNetral / 7),
            peakNegatif: pNeg
          })
        }
      } catch (error) {
        console.error('Gagal mengambil data chart:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchChartData()
  }, [token])

  if (isLoading) return <div className="h-96 flex items-center justify-center border rounded-xl animate-pulse">Menghitung Tren 7 Hari...</div>

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Tren Sentimen (7 Hari Terakhir)</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
          <YAxis stroke="rgba(255,255,255,0.5)" />
          <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid #333', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="line" />
          <Line type="monotone" dataKey="positif" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e' }} name="Positif" />
          <Line type="monotone" dataKey="netral" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} name="Netral" />
          <Line type="monotone" dataKey="negatif" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444' }} name="Negatif" />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Peak Positif</p>
          <p className="text-2xl font-bold text-green-500">{summary.peakPositif}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Rata-rata Netral</p>
          <p className="text-2xl font-bold text-blue-500">{summary.avgNetral}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Peak Negatif</p>
          <p className="text-2xl font-bold text-red-500">{summary.peakNegatif}</p>
        </div>
      </div>
    </motion.div>
  )
}
