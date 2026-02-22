// Halaman Audit Log - Super Admin Only
'use client'

import { useState } from 'react'
import { TopNav } from '@/components/top-nav'
import { ProtectedRoute } from '@/components/protected-route'
import { PageHeader } from '@/components/admin/audit-log/page-header'
import { LogTable } from '@/components/admin/audit-log/log-table'
import { LogFilters } from '@/components/admin/audit-log/log-filters'
import { mockAuditLogs } from '@/lib/data/rbac-data'
import type { AuditLog } from '@/lib/data/rbac-data'

export default function AuditLogPage() {
  const [logs, setLogs] = useState<AuditLog[]>(mockAuditLogs)
  const [filters, setFilters] = useState({
    dateRange: '7days',
    user: 'all',
    action: 'all',
  })

  const filteredLogs = logs.filter((log) => {
    // Filter by user
    if (filters.user !== 'all' && log.user_name !== filters.user) {
      return false
    }
    
    // Filter by action
    if (filters.action !== 'all' && log.action !== filters.action) {
      return false
    }
    
    return true
  })

  return (
    <ProtectedRoute allowedRoles={['super_admin']}>
      <div className="min-h-screen bg-background">
        <TopNav />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PageHeader />

          <LogFilters
            filters={filters}
            onFilterChange={setFilters}
          />

          <LogTable logs={filteredLogs} />
        </main>
      </div>
    </ProtectedRoute>
  )
}
