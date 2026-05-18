'use client'

import { useState, useEffect } from 'react'
import { TopNav } from '@/components/top-nav'
import { ProtectedRoute } from '@/components/protected-route'
import { PageHeader } from '@/components/admin/audit-log/page-header'
import { LogTable } from '@/components/admin/audit-log/log-table'
import { LogFilters } from '@/components/admin/audit-log/log-filters'
import { useAuth } from '@/contexts/auth-context'

const API_URL = 'http://103.245.38.28/api'

export default function AuditLogPage() {
  const { token } = useAuth()
  const [logs, setLogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    dateRange: '7days',
    user: 'all',
    action: 'all',
  })

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(`${API_URL}/audit-logs`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        })
        const data = await response.json()
        // Transform data backend ke format yang dibutuhkan LogTable
        const transformed = (data.data || []).map((log: any) => ({
          id: log.id,
          user_id: log.user_id,
          user_name: log.properties?.user_agent ? 'User' : 'System',
          action: log.event?.toUpperCase() || '-',
          target: log.description || '-',
          ip_address: log.user_ip || log.properties?.ip || '-',
          user_agent: log.user_agent || log.properties?.user_agent || '-',
          payload: log.properties,
          created_at: log.created_at,
        }))
        setLogs(transformed)
      } catch (err) {
        console.error('Failed to fetch audit logs:', err)
      } finally {
        setIsLoading(false)
      }
    }

    if (token) fetchLogs()
  }, [token])

  const filteredLogs = logs.filter((log: any) => {
    if (filters.user !== 'all' && log.user_name !== filters.user) return false
    if (filters.action !== 'all' && log.action !== filters.action) return false
    return true
  })

  return (
    <ProtectedRoute allowedRoles={['super_admin']}>
      <div className="min-h-screen bg-background">
        <TopNav />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PageHeader />
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          ) : (
            <>
              <LogFilters filters={filters} onFilterChange={setFilters} />
              <LogTable logs={filteredLogs} />
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  )
}
