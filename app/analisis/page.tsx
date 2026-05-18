'use client'

import { useEffect, useState } from 'react'
import { TopNav } from '@/components/top-nav'
import { ProtectedRoute } from '@/components/protected-route'
import { useAuth } from '@/contexts/auth-context'

const API_URL = 'http://103.245.38.28/api'

export default function AnalisisWilayahPage() {
  const { token } = useAuth()
  const [locations, setLocations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return
      try {
        const response = await fetch(`${API_URL}/crawled-data?limit=200`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
        })
        const result = await response.json()
        if (result.success && result.data && result.data.data) {
          // Kelompokkan berdasarkan lokasi dari ML
          const grouped = result.data.data.reduce((acc: any, curr: any) => {
            const loc = curr.location || 'Tidak Diketahui'
            if (!acc[loc]) acc[loc] = { name: loc, total: 0, positif: 0, negatif: 0 }
            acc[loc].total += 1
            if (curr.ai_sentiment === 'Positif') acc[loc].positif += 1
            if (curr.ai_sentiment === 'Negatif') acc[loc].negatif += 1
            return acc
          }, {})
          setLocations(Object.values(grouped))
        }
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [token])

  return (
    <ProtectedRoute allowedRoles={['super_admin', 'analyst', 'admin']}>
      <div className="min-h-screen bg-background">
        <TopNav />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-6">Analisis Wilayah</h1>
          {isLoading ? (
            <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((loc, idx) => (
                <div key={idx} className="bg-card border rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-2">{loc.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">Total Laporan: {loc.total}</p>
                  <div className="flex justify-between text-sm border-t pt-4">
                    <span className="text-green-600 font-semibold">Positif: {loc.positif}</span>
                    <span className="text-red-600 font-semibold">Negatif: {loc.negatif}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  )
}
