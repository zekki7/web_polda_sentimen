'use client'

import { useEffect, useState } from 'react'
import { TopNav } from '@/components/top-nav'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/dashboard/page-header'
import { StatsGrid } from '@/components/dashboard/stats-grid'
import { ChartsSection } from '@/components/dashboard/charts-section'
import { MapSummary } from '@/components/map-summary'
import { itemVariants } from '@/lib/animations/variants'
import { useAuth } from '@/contexts/auth-context'

const API_URL = 'http://103.245.38.28/api'

export default function DashboardPage() {
  const { token } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  // State untuk menyimpan rekap data dinamis dari Machine Learning
  const [stats, setStats] = useState({
    total: 0,
    positif: 0,
    negatif: 0,
    darurat: 0
  })

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) return;
      try {
        const response = await fetch(`${API_URL}/crawled-data?limit=100`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
        const result = await response.json();
        
        if (result.success && result.data && result.data.data) {
          const data = result.data.data;

          // Kalkulasi Metrik dari Data ML
          const total = data.length;
          const positif = data.filter((item: any) => item.ai_sentiment === 'Positif').length;
          const negatif = data.filter((item: any) => item.ai_sentiment === 'Negatif').length;
          
          // PostgreSQL boolean bisa direpresentasikan sebagai 't', true, atau 1
          const darurat = data.filter((item: any) => 
            item.is_emergency === true || item.is_emergency === 't' || item.is_emergency === 1
          ).length;

          setStats({ total, positif, negatif, darurat });
        }
      } catch (error) {
        console.error('Gagal mengambil data dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  return (
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
            {/* Kirim data rekap hasil ML ke komponen StatsGrid */}
            <StatsGrid dynamicStats={stats} />
            
            <ChartsSection />
            
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
            >
              <MapSummary />
            </motion.div>
          </>
        )}
      </main>
    </div>
  )
}
