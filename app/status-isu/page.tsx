'use client'

import { useEffect, useState } from 'react'
import { TopNav } from '@/components/top-nav'
import { ProtectedRoute } from '@/components/protected-route'
import { PageHeader } from '@/components/status-isu/page-header'
import { IssuesList } from '@/components/status-isu/issues-list'
import { StatusSummary } from '@/components/status-isu/status-summary'
import { ActivitySidebar } from '@/components/status-isu/activity-sidebar'
import { useAuth } from '@/contexts/auth-context'
import { Issue } from '@/lib/data/issues-data'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://103.245.38.28/api'

export default function StatusIsuPage() {
  const { token } = useAuth()
  const [issues, setIssues] = useState<Issue[]>([])
  const [filterStatus, setFilterStatus] = useState<string>('Semua')
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null)
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
          const transformed: Issue[] = result.data.data.map((item: any, idx: number) => ({
            id: item.id || idx,
            title: item.main_topic || 'Isu Tanpa Judul',
            description: item.content || '',
            status: item.status === 'resolved' ? 'Selesai' : item.status === 'handling' ? 'Sedang Ditangani' : 'Perlu Tindak Lanjut',
            urgency: item.is_emergency ? 'Darurat' : 'Tidak Darurat',
            region: item.location || item.region || 'Tidak Diketahui',
            date: item.posted_at ? new Date(item.posted_at).toLocaleDateString('id-ID') : '-',
            reportCount: item.report_count || 1,
          }))
          setIssues(transformed)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [token])

  const filteredIssues = filterStatus === 'Semua'
    ? issues
    : issues.filter(issue => issue.status === filterStatus)

  const handleStatusChange = (id: number, newStatus: Issue['status']) => {
    setIssues(issues.map(issue =>
      issue.id === id ? { ...issue, status: newStatus } : issue
    ))
  }

  return (
    <ProtectedRoute allowedRoles={['super_admin', 'analyst', 'admin', 'officer']}>
      <div className="min-h-screen bg-background">
        <TopNav />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PageHeader />

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <IssuesList
                  issues={filteredIssues}
                  filterStatus={filterStatus}
                  selectedIssue={selectedIssue}
                  onFilterChange={setFilterStatus}
                  onIssueSelect={setSelectedIssue}
                  onStatusChange={handleStatusChange}
                />
              </div>

              <div className="space-y-6">
                <ActivitySidebar issues={issues} />
              </div>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  )
}