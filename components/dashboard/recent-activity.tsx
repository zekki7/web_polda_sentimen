'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/auth-context'

interface RecentActivityProps {
  activities?: any[] // Dibuat opsional biar TypeScript nggak error kalau parent-nya masih ngirim prop
}

const API_URL = 'http://103.245.38.28/api'

export function RecentActivity({ activities: _ignored }: RecentActivityProps) {
  const { token } = useAuth()
  const [realActivities, setRealActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => {
      if (!token) return;
      try {
        const response = await fetch(`${API_URL}/crawled-data?limit=5`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
        const result = await response.json();
        
        if (result.success && result.data && result.data.data) {
          setRealActivities(result.data.data);
        }
      } catch (error) {
        console.error('Error fetching recent activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [token]);

  return (
    <div className="mt-6 pt-6 border-t border-border">
      <h3 className="text-sm font-semibold text-foreground mb-3">
        Laporan Masuk Terbaru
      </h3>
      <div className="space-y-4 text-sm">
        {loading ? (
          <p className="text-muted-foreground animate-pulse">Menarik data asli dari Sentinel...</p>
        ) : realActivities.length === 0 ? (
          <p className="text-muted-foreground">Belum ada laporan terbaru.</p>
        ) : (
          realActivities.map((item, index) => (
            <div key={index} className="flex flex-col border-b border-border/50 pb-2">
              <p className="text-muted-foreground">
                <span className="font-semibold text-accent">@{item.username || 'anonim'}</span> • {item.posted_at || 'Baru saja'}
              </p>
              <p className="mt-1 line-clamp-2">{item.content}</p>
              <div className="flex gap-2 mt-1">
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${item.ai_sentiment === 'Positif' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                  {item.ai_sentiment || 'Netral'}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 bg-accent/20 text-accent rounded">
                  {item.location || 'Tidak diketahui'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
