// app/status-isu/page.tsx
'use client'

import { useState } from 'react'                              // React
import { TopNav } from '@/components/top-nav'                 // External component
import { motion } from 'framer-motion'                        // Animation
import { PageHeader } from '@/components/status-isu/page-header'         // Local
import { IssuesList } from '@/components/status-isu/issues-list'         // Local
import { ActivitySidebar } from '@/components/status-isu/activity-sidebar' // Local
import { initialIssues, Issue } from '@/lib/data/issues-data' // Data + Type

export default function StatusIsuPage() {
  const [issues, setIssues] = useState<Issue[]>(initialIssues)
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('Semua')

  const handleStatusChange = (id: number, newStatus: Issue['status']) => {
    setIssues(
      issues.map((issue) =>
        issue.id === id ? { ...issue, status: newStatus } : issue
      )
    )
    setSelectedIssue(null)
  }

  const filteredIssues =
    filterStatus === 'Semua'
      ? issues
      : issues.filter((i) => i.status === filterStatus)

  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <IssuesList
              issues={filteredIssues}
              filterStatus={filterStatus}
              selectedIssue={selectedIssue}
              onFilterChange={setFilterStatus}
              onIssueSelect={setSelectedIssue}
              onStatusChange={handleStatusChange}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ActivitySidebar issues={issues} />
          </motion.div>
        </div>
      </main>
    </div>
  )
}
