// Komponen untuk menampilkan aktivitas terakhir
'use client'

import { Activity } from '@/lib/data/dashboard-data'

interface RecentActivityProps {
  activities: Activity[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="mt-6 pt-6 border-t border-border">
      <h3 className="text-sm font-semibold text-foreground mb-3">
        Aktivitas Terakhir
      </h3>
      <div className="space-y-2 text-sm">
        {activities.map((activity, index) => (
          <p key={index} className="text-muted-foreground">
            <span className={activity.color}>{activity.icon}</span> {activity.text} - {activity.time}
          </p>
        ))}
      </div>
    </div>
  )
}
