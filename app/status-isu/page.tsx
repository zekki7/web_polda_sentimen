'use client'

import { useEffect, useState } from 'react'
import { TopNav } from '@/components/top-nav'
import { ProtectedRoute } from '@/components/protected-route'
import { useAuth } from '@/contexts/auth-context'

const API_URL = 'http://103.245.38.28/api'

export default function StatusIsuPage() {
  const { token } = useAuth()
  const [issues, setIssues] = useState<any[]>([])
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
          // Filter hanya yang darurat
          const emergencies = result.data.data.filter((item: any) => 
            item.is_emergency === true || item.is_emergency === 't' || item.is_emergency === 1
          )
          setIssues(emergencies)
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
    <ProtectedRoute allowedRoles={['super_admin', 'analyst', 'admin', 'officer']}>
      <div className="min-h-screen bg-background">
        <TopNav />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-6 text-red-600">🚨 Peringatan Isu Darurat</h1>
          {isLoading ? (
            <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div></div>
          ) : issues.length === 0 ? (
            <div className="bg-card border rounded-xl p-10 text-center text-muted-foreground">Tidak ada isu darurat saat ini. Aman terkendali.</div>
          ) : (
            <div className="space-y-4">
              {issues.map((issue, idx) => (
                <div key={idx} className="bg-red-50 dark:bg-red-900/10 border border-red-200 rounded-xl p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-red-700">{issue.main_topic || 'Isu Krusial'}</h3>
                    <span className="text-xs font-semibold bg-red-100 text-red-800 px-2 py-1 rounded">Darurat</span>
                  </div>
                  <p className="text-foreground mb-4">{issue.content}</p>
                  <div className="flex justify-between text-xs text-muted-foreground border-t border-red-100 pt-4">
                    <span>📍 {issue.location || 'Lokasi tidak terdeteksi'}</span>
                    <span>🕒 {new Date(issue.posted_at).toLocaleString('id-ID')}</span>
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
