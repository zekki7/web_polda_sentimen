'use client'

import { useEffect, useState } from 'react'
import { TopNav } from '@/components/top-nav'
import { ProtectedRoute } from '@/components/protected-route'
import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { useAuth } from '@/contexts/auth-context'

const API_URL = 'http://103.245.38.28/api'

const COLORS = ['#ef4444', '#f97316', '#3b82f6', '#22c55e', '#8b5cf6', '#ec4899']

export default function AnalisisWilayahPage() {
  const { token } = useAuth()
  const [regionData, setRegionData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return
      try {
        const response = await fetch(`${API_URL}/crawled-data?limit=200`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
        })
        const result = await response.json()
        if (result.success && result.data && result.data.data) {
          const grouped = result.data.data.reduce((acc: any, curr: any) => {
            const loc = curr.location || 'Tidak Diketahui'
            if (!acc[loc]) acc[loc] = { name: loc, laporan: 0, positif: 0, netral: 0, negatif: 0 }
            acc[loc].laporan += 1
            if (curr.ai_sentiment === 'Positif') acc[loc].positif += 1
            else if (curr.ai_sentiment === 'Netral') acc[loc].netral += 1
            else if (curr.ai_sentiment === 'Negatif') acc[loc].negatif += 1
            return acc
          }, {})
          setRegionData(Object.values(grouped))
        }
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [token])

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
    <ProtectedRoute allowedRoles={['super_admin', 'analyst', 'admin', 'officer']}>
      <div className="min-h-screen bg-background">
        <TopNav />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Analisis Wilayah
            </h1>
            <p className="text-muted-foreground">
              Analisis mendalam sentimen per wilayah dan topik dominan
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          ) : (
            <>
              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Laporan per Wilayah */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    Laporan per Wilayah
                  </h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={regionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                      <YAxis stroke="rgba(255,255,255,0.5)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          border: '1px solid #E62815',
                        }}
                      />
                      <Legend />
                      <Bar dataKey="laporan" fill="#3b82f6" name="Total Laporan" />
                      <Bar dataKey="positif" fill="#22c55e" name="Positif" />
                      <Bar dataKey="negatif" fill="#ef4444" name="Negatif" />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Distribusi Laporan */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    Distribusi per Wilayah
                  </h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={regionData}
                        dataKey="laporan"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {regionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>

              {/* Word Cloud */}
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
                  {regionData.slice(0, 6).map((region, index) => (
                    <motion.div
                      key={region.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="px-4 py-2 bg-gradient-to-r from-accent to-secondary rounded-full text-accent-foreground text-sm font-semibold hover:shadow-lg transition-shadow cursor-pointer"
                      style={{ fontSize: `${10 + region.laporan / 10}px` }}
                    >
                      {region.name}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Laporan Teks */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-foreground">
                    Daftar Laporan
                  </h2>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setSelectedRegion(null)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        !selectedRegion
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-primary/50 text-muted-foreground hover:bg-primary/70'
                      }`}
                    >
                      Semua
                    </button>
                    {regionData.slice(0, 4).map((region) => (
                      <button
                        key={region.name}
                        onClick={() => setSelectedRegion(region.name)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          selectedRegion === region.name
                            ? 'bg-accent text-accent-foreground'
                            : 'bg-primary/50 text-muted-foreground hover:bg-primary/70'
                        }`}
                      >
                        {region.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {regionData.slice(0, 5).map((region, index) => (
                    <motion.div
                      key={region.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border border-border rounded-lg p-4 hover:border-accent transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-foreground flex-1">
                          {region.laporan} laporan dari region {region.name}
                        </p>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 border ${getSentimentColor(
                            region.positif > region.negatif ? 'Positif' : 'Negatif'
                          )}`}
                        >
                          {region.positif > region.negatif ? 'Positif Dominan' : 'Negatif Dominan'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="px-2 py-1 bg-primary/50 rounded">
                          Positif: {region.positif}
                        </span>
                        <span className="px-2 py-1 bg-primary/50 rounded">
                          Negatif: {region.negatif}
                        </span>
                        <span>Total: {region.laporan}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  )
}