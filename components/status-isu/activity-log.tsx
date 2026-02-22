// Komponen untuk menampilkan log aktivitas
'use client'

import { ActivityLog as ActivityLogType } from '@/lib/data/issues-data'

interface ActivityLogProps {
  activities: ActivityLogType[]
}

export function ActivityLog({ activities }: ActivityLogProps) {
  return (
    <div className="space-y-4">
      {activities.map((log) => (
        <div
          key={log.id}
          className="pb-4 border-b border-border last:border-0"
        >
          <p className="text-sm font-medium text-foreground mb-1">
            {log.action}
          </p>
          <p className="text-xs text-muted-foreground mb-2">{log.issue}</p>
          <p className="text-xs text-muted-foreground">{log.time}</p>
        </div>
      ))}
    </div>
  )
}
