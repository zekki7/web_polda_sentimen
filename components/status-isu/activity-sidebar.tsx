// Komponen sidebar untuk activity log dan summary
'use client'

import { Issue, activityLog } from '@/lib/data/issues-data'
import { ActivityLog } from './activity-log'
import { StatusSummary } from './status-summary'

interface ActivitySidebarProps {
  issues: Issue[]
}

export function ActivitySidebar({ issues }: ActivitySidebarProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <StatusSummary issues={issues} />

      <div className="border-t border-border pt-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Log Aktivitas
        </h2>
        <ActivityLog activities={activityLog} />
      </div>
    </div>
  )
}
