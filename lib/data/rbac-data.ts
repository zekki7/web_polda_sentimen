// Mock data untuk fitur admin dan analyst
// Nanti akan diganti dengan data dari API

import { User, UserRole } from '@/contexts/auth-context'

// ====== USER MANAGEMENT DATA ======

export interface UserManagement extends User {
  status: 'active' | 'inactive'
  created_at: string
  last_login?: string
}

export const mockUsers: UserManagement[] = [
  {
    id: 1,
    name: 'Admin Utama',
    nrp: '1234567890',
    email: 'admin@polda.jateng.go.id',
    role: 'super_admin',
    region_code: 'JATENG',
    status: 'active',
    created_at: '2024-01-01',
    last_login: '2024-02-21 08:30',
  },
  {
    id: 2,
    name: 'Analis Data Semarang',
    nrp: '0987654321',
    email: 'analyst1@polda.jateng.go.id',
    role: 'analyst',
    region_code: 'SEMARANG',
    status: 'active',
    created_at: '2024-01-15',
    last_login: '2024-02-21 07:15',
  },
  {
    id: 3,
    name: 'Analis Data Surakarta',
    nrp: '1122334455',
    email: 'analyst2@polda.jateng.go.id',
    role: 'analyst',
    region_code: 'SURAKARTA',
    status: 'active',
    created_at: '2024-01-20',
    last_login: '2024-02-20 16:45',
  },
  {
    id: 4,
    name: 'Petugas Lapangan Semarang',
    nrp: '5555555555',
    email: 'petugas1@polda.jateng.go.id',
    role: 'user',
    region_code: 'SEMARANG',
    status: 'active',
    created_at: '2024-02-01',
    last_login: '2024-02-21 09:00',
  },
  {
    id: 5,
    name: 'Petugas Lapangan Salatiga',
    nrp: '6666666666',
    email: 'petugas2@polda.jateng.go.id',
    role: 'user',
    region_code: 'SALATIGA',
    status: 'active',
    created_at: '2024-02-05',
    last_login: '2024-02-20 14:20',
  },
  {
    id: 6,
    name: 'Petugas Non-Aktif',
    nrp: '7777777777',
    email: 'inactive@polda.jateng.go.id',
    role: 'user',
    region_code: 'PEKALONGAN',
    status: 'inactive',
    created_at: '2023-12-01',
    last_login: '2024-01-15 10:30',
  },
]

// ====== AUDIT LOG DATA ======

export interface AuditLog {
  id: number
  user_id: number
  user_name: string
  action: string
  target: string
  ip_address: string
  user_agent: string
  payload?: any
  created_at: string
}

export const mockAuditLogs: AuditLog[] = [
  {
    id: 1,
    user_id: 1,
    user_name: 'Admin Utama',
    action: 'UPDATE_USER_ROLE',
    target: 'User: Analis Data Semarang',
    ip_address: '192.168.1.100',
    user_agent: 'Mozilla/5.0',
    payload: { old_role: 'user', new_role: 'analyst' },
    created_at: '2024-02-21 08:30:15',
  },
  {
    id: 2,
    user_id: 1,
    user_name: 'Admin Utama',
    action: 'DEACTIVATE_USER',
    target: 'User: Petugas Non-Aktif',
    ip_address: '192.168.1.100',
    user_agent: 'Mozilla/5.0',
    payload: { reason: 'Mutasi ke wilayah lain' },
    created_at: '2024-02-21 08:15:30',
  },
  {
    id: 3,
    user_id: 2,
    user_name: 'Analis Data Semarang',
    action: 'VALIDATE_SENTIMENT',
    target: 'Post ID: 12345',
    ip_address: '192.168.1.101',
    user_agent: 'Mozilla/5.0',
    payload: { original: 'Negatif', validated: 'Positif' },
    created_at: '2024-02-21 07:45:22',
  },
  {
    id: 4,
    user_id: 2,
    user_name: 'Analis Data Semarang',
    action: 'CREATE_FILTER',
    target: 'Filter: keyword-korupsi',
    ip_address: '192.168.1.101',
    user_agent: 'Mozilla/5.0',
    payload: { keyword: 'korupsi', platforms: ['twitter', 'facebook'] },
    created_at: '2024-02-20 16:20:10',
  },
  {
    id: 5,
    user_id: 1,
    user_name: 'Admin Utama',
    action: 'CREATE_USER',
    target: 'User: Petugas Lapangan Salatiga',
    ip_address: '192.168.1.100',
    user_agent: 'Mozilla/5.0',
    payload: { nrp: '6666666666', role: 'user' },
    created_at: '2024-02-05 09:00:00',
  },
]

// ====== CRAWLING FILTER DATA ======

export interface CrawlingFilter {
  id: number
  name: string
  keywords: string[]
  platforms: string[]
  regions: string[]
  date_start?: string
  date_end?: string
  is_active: boolean
  created_by: string
  created_at: string
}

export const mockFilters: CrawlingFilter[] = [
  {
    id: 1,
    name: 'Filter Kriminal Semarang',
    keywords: ['pencurian', 'perampokan', 'kriminal'],
    platforms: ['twitter', 'facebook', 'instagram'],
    regions: ['SEMARANG'],
    is_active: true,
    created_by: 'Analis Data Semarang',
    created_at: '2024-02-15',
  },
  {
    id: 2,
    name: 'Filter Lalu Lintas Jawa Tengah',
    keywords: ['kemacetan', 'kecelakaan', 'macet'],
    platforms: ['twitter', 'facebook'],
    regions: ['SEMARANG', 'SURAKARTA', 'SALATIGA'],
    is_active: true,
    created_by: 'Analis Data Surakarta',
    created_at: '2024-02-10',
  },
  {
    id: 3,
    name: 'Filter Korupsi',
    keywords: ['korupsi', 'suap', 'gratifikasi'],
    platforms: ['twitter', 'facebook', 'news'],
    regions: ['JATENG'],
    date_start: '2024-01-01',
    is_active: true,
    created_by: 'Analis Data Semarang',
    created_at: '2024-01-20',
  },
  {
    id: 4,
    name: 'Filter Narkoba (Non-aktif)',
    keywords: ['narkoba', 'narkotika', 'sabu'],
    platforms: ['twitter', 'facebook'],
    regions: ['SEMARANG'],
    is_active: false,
    created_by: 'Analis Data Semarang',
    created_at: '2023-12-01',
  },
]

// ====== SENTIMENT VALIDATION DATA ======

export interface SentimentValidation {
  id: number
  post_id: number
  content: string
  platform: string
  posted_at: string
  ai_sentiment: 'Positif' | 'Negatif' | 'Netral'
  confidence_score: number
  main_topic: string
  keywords: string[]
  region: string
  is_validated: boolean
  validated_by?: string
  validated_at?: string
}

export const mockSentiments: SentimentValidation[] = [
  {
    id: 1,
    post_id: 12345,
    content: 'Kemacetan parah di Jalan Ahmad Yani pagi ini. Kecelakaan mobil vs truk. Semoga cepat selesai.',
    platform: 'Twitter',
    posted_at: '2024-02-21 07:30',
    ai_sentiment: 'Negatif',
    confidence_score: 87.5,
    main_topic: 'Lalu Lintas',
    keywords: ['kemacetan', 'kecelakaan', 'ahmad yani'],
    region: 'SEMARANG',
    is_validated: false,
  },
  {
    id: 2,
    post_id: 12346,
    content: 'Terima kasih Pak Polisi yang bantu saat motor saya mogok di jalan. Pelayanan ramah dan cepat!',
    platform: 'Facebook',
    posted_at: '2024-02-21 08:00',
    ai_sentiment: 'Positif',
    confidence_score: 95.2,
    main_topic: 'Layanan Publik',
    keywords: ['terima kasih', 'polisi', 'pelayanan'],
    region: 'SURAKARTA',
    is_validated: false,
  },
  {
    id: 3,
    post_id: 12347,
    content: 'Lapor pencurian HP di daerah Salatiga. Polisi langsung datang dan buat laporan. Proses cepat.',
    platform: 'Twitter',
    posted_at: '2024-02-21 06:45',
    ai_sentiment: 'Netral',
    confidence_score: 72.8,
    main_topic: 'Kriminal',
    keywords: ['pencurian', 'lapor', 'polisi'],
    region: 'SALATIGA',
    is_validated: false,
  },
  {
    id: 4,
    post_id: 12348,
    content: 'Patroli malam di komplek saya makin sering. Merasa lebih aman sekarang. Good job Polda Jateng!',
    platform: 'Facebook',
    posted_at: '2024-02-20 22:00',
    ai_sentiment: 'Positif',
    confidence_score: 91.3,
    main_topic: 'Keamanan',
    keywords: ['patroli', 'aman', 'polda'],
    region: 'SEMARANG',
    is_validated: true,
    validated_by: 'Analis Data Semarang',
    validated_at: '2024-02-21 07:45',
  },
  {
    id: 5,
    post_id: 12349,
    content: 'Kecewa dengan respon lambat saat lapor kasus perampokan. Sudah 2 hari belum ada tindakan.',
    platform: 'Twitter',
    posted_at: '2024-02-20 15:30',
    ai_sentiment: 'Negatif',
    confidence_score: 89.7,
    main_topic: 'Layanan Publik',
    keywords: ['kecewa', 'lambat', 'perampokan'],
    region: 'PEKALONGAN',
    is_validated: false,
  },
]
