// Data untuk dashboard
// Sesuai ERD: social_posts, social_analytics, users, audit_logs

// ============================================================
// STAT CARDS
// ============================================================

export interface StatCard {
  label: string
  value: string
  icon: string
  color: string
}

export const dashboardStats: StatCard[] = [
  {
    label: 'Total Laporan',
    value: '2,847',
    icon: '📊',
    color: 'from-blue-600 to-blue-700',
  },
  {
    label: 'Sentimen Positif',
    value: '1,247',
    icon: '😊',
    color: 'from-green-600 to-green-700',
  },
  {
    label: 'Sentimen Negatif',
    value: '856',
    icon: '😠',
    color: 'from-red-600 to-red-700',
  },
  {
    label: 'Isu Viral Hari Ini',
    value: '12',
    icon: '🔥',
    color: 'from-orange-600 to-orange-700',
  },
]

// ============================================================
// TREN SENTIMEN 7 HARI TERAKHIR
// Sesuai ERD: social_analytics (sentiment, analyzed_at)
// ============================================================

export interface SentimentTrend {
  day: string
  positif: number
  netral: number
  negatif: number
}

export const sentimentTrend: SentimentTrend[] = [
  { day: 'Sen', positif: 260, netral: 180, negatif: 145 },
  { day: 'Sel', positif: 290, netral: 195, negatif: 148 },
  { day: 'Rab', positif: 315, netral: 205, negatif: 152 },
  { day: 'Kam', positif: 330, netral: 215, negatif: 163 },
  { day: 'Jum', positif: 360, netral: 220, negatif: 168 },
  { day: 'Sab', positif: 375, netral: 228, negatif: 172 },
  { day: 'Min', positif: 430, netral: 240, negatif: 178 },
]

// ============================================================
// DISTRIBUSI SENTIMEN
// Sesuai ERD: social_analytics (sentiment, confidence_score)
// ============================================================

export interface SentimentDistribution {
  label: string
  percentage: number
  color: string
}

export const sentimentDistribution: SentimentDistribution[] = [
  {
    label: 'Positif',
    percentage: 43.8,
    color: 'bg-green-500',
  },
  {
    label: 'Netral',
    percentage: 30.1,
    color: 'bg-blue-500',
  },
  {
    label: 'Negatif',
    percentage: 26.1,
    color: 'bg-red-500',
  },
]

// ============================================================
// ISU VIRAL HARI INI
// Sesuai ERD: social_posts (content, type), social_analytics (main_topic, keywords)
// case_operations (status, priority)
// ============================================================

export interface ViralIssue {
  id: number
  title: string
  platform: 'Twitter' | 'Facebook' | 'Instagram' | 'TikTok'
  postCount: number
  sentiment: 'Positif' | 'Negatif' | 'Netral'
  topic: string
  region: string
  trendingScore: number // 0-100
}

export const viralIssues: ViralIssue[] = [
  {
    id: 1,
    title: 'Kemacetan Parah Jalan Pantura Akibat Truk Kontainer Terguling',
    platform: 'Twitter',
    postCount: 1247,
    sentiment: 'Negatif',
    topic: 'Lalu Lintas',
    region: 'Semarang',
    trendingScore: 95,
  },
  {
    id: 2,
    title: 'Polisi Berhasil Ungkap Jaringan Penipuan Online Senilai 2 Miliar',
    platform: 'Facebook',
    postCount: 894,
    sentiment: 'Positif',
    topic: 'Kriminal',
    region: 'Surakarta',
    trendingScore: 88,
  },
  {
    id: 3,
    title: 'Demo Buruh di Kawasan Industri Berujung Kericuhan',
    platform: 'TikTok',
    postCount: 756,
    sentiment: 'Negatif',
    topic: 'Ketertiban Umum',
    region: 'Salatiga',
    trendingScore: 82,
  },
  {
    id: 4,
    title: 'Program Sambang Desa Polres Pekalongan Diapresiasi Warga',
    platform: 'Facebook',
    postCount: 612,
    sentiment: 'Positif',
    topic: 'Pelayanan Publik',
    region: 'Pekalongan',
    trendingScore: 74,
  },
  {
    id: 5,
    title: 'Penertiban PKL di Kawasan Simpang Lima Menuai Pro Kontra',
    platform: 'Instagram',
    postCount: 540,
    sentiment: 'Netral',
    topic: 'Ketertiban Umum',
    region: 'Semarang',
    trendingScore: 70,
  },
]

// ============================================================
// RECENT ACTIVITY
// Sesuai ERD: audit_logs (action, target, user_id, created_at)
// ============================================================

export interface Activity {
  id: number
  icon: string
  color: string
  text: string
  target: string
  time: string
  userId: number
  userName: string
}

export const recentActivities: Activity[] = [
  {
    id: 1,
    icon: '✓',
    color: 'text-green-500',
    text: 'Login Admin',
    target: 'auth',
    time: '5 menit lalu',
    userId: 1,
    userName: 'AKBP Andi Firmansyah',
  },
  {
    id: 2,
    icon: '!',
    color: 'text-yellow-500',
    text: 'Data diperbarui',
    target: 'social_posts',
    time: '2 menit lalu',
    userId: 2,
    userName: 'IPTU Budi Santoso',
  },
  {
    id: 3,
    icon: '🔍',
    color: 'text-blue-500',
    text: 'Analisis sentimen dijalankan',
    target: 'social_analytics',
    time: '15 menit lalu',
    userId: 1,
    userName: 'AKBP Andi Firmansyah',
  },
  {
    id: 4,
    icon: '📋',
    color: 'text-purple-500',
    text: 'Status kasus diubah ke Selesai',
    target: 'case_operations',
    time: '1 jam lalu',
    userId: 3,
    userName: 'AIPTU Dewi Rahayu',
  },
  {
    id: 5,
    icon: '⚠️',
    color: 'text-red-500',
    text: 'Isu baru ditandai Darurat',
    target: 'case_operations',
    time: '2 jam lalu',
    userId: 2,
    userName: 'IPTU Budi Santoso',
  },
]

// ============================================================
// PLATFORM BREAKDOWN
// Sesuai ERD: social_authors (platform), social_posts (type)
// ============================================================

export interface PlatformStat {
  platform: string
  postCount: number
  authorCount: number
  sentimentAvg: number // % positif
  color: string
}

export const platformStats: PlatformStat[] = [
  {
    platform: 'Twitter',
    postCount: 1024,
    authorCount: 342,
    sentimentAvg: 38,
    color: 'bg-sky-500',
  },
  {
    platform: 'Facebook',
    postCount: 876,
    authorCount: 289,
    sentimentAvg: 52,
    color: 'bg-blue-700',
  },
  {
    platform: 'Instagram',
    postCount: 612,
    authorCount: 198,
    sentimentAvg: 61,
    color: 'bg-pink-500',
  },
  {
    platform: 'TikTok',
    postCount: 335,
    authorCount: 124,
    sentimentAvg: 44,
    color: 'bg-slate-700',
  },
]