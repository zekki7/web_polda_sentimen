// Data untuk isu publik dan activity log

// Interface untuk struktur data isu
export interface Issue {
  id: number
  title: string
  description: string
  status: 'Sedang Ditangani' | 'Perlu Tindak Lanjut' | 'Selesai'
  urgency: 'Darurat' | 'Tidak Darurat'
  region: string
  date: string
  reportCount: number
}

// Daftar isu awal
export const initialIssues: Issue[] = [
  {
    id: 1,
    title: 'Kemacetan Jalan Ahmad Yani',
    description: 'Kemacetan parah akibat kecelakaan kendaraan di persimpangan',
    status: 'Sedang Ditangani',
    urgency: 'Darurat',
    region: 'Semarang',
    date: '2024-02-09',
    reportCount: 47,
  },
  {
    id: 2,
    title: 'Kriminalitas Meningkat di Kawasan Perumahan',
    description: 'Laporan pencurian dan perampokan meningkat 3x lipat',
    status: 'Perlu Tindak Lanjut',
    urgency: 'Darurat',
    region: 'Surakarta',
    date: '2024-02-08',
    reportCount: 32,
  },
  {
    id: 3,
    title: 'Pelayanan Administrasi Lambat di Polres Salatiga',
    description: 'Proses izin mengemudi membutuhkan waktu lebih dari 2 hari',
    status: 'Sedang Ditangani',
    urgency: 'Tidak Darurat',
    region: 'Salatiga',
    date: '2024-02-07',
    reportCount: 18,
  },
  {
    id: 4,
    title: 'Apresiasi Program Patroli Malam',
    description: 'Masyarakat sangat puas dengan peningkatan patroli malam',
    status: 'Selesai',
    urgency: 'Tidak Darurat',
    region: 'Pekalongan',
    date: '2024-02-06',
    reportCount: 25,
  },
  {
    id: 5,
    title: 'Gangguan Transaksi Online di Platform Pembayaran',
    description: 'Banyak laporan fraud dan penipuan online',
    status: 'Perlu Tindak Lanjut',
    urgency: 'Darurat',
    region: 'Purwokerto',
    date: '2024-02-05',
    reportCount: 54,
  },
]

// Interface untuk activity log
export interface ActivityLog {
  id: number
  action: string
  issue: string
  status: string
  time: string
}

// Daftar log aktivitas admin
export const activityLog: ActivityLog[] = [
  {
    id: 1,
    action: 'Admin mengubah status',
    issue: 'Kemacetan Jalan Ahmad Yani',
    status: 'Sedang Ditangani',
    time: '2 jam lalu',
  },
  {
    id: 2,
    action: 'Admin membuat laporan PDF',
    issue: 'Kriminalitas Meningkat di Kawasan Perumahan',
    status: 'Perlu Tindak Lanjut',
    time: '4 jam lalu',
  },
  {
    id: 3,
    action: 'Admin menandai sebagai selesai',
    issue: 'Apresiasi Program Patroli Malam',
    status: 'Selesai',
    time: '1 hari lalu',
  },
]

// Status filters untuk dropdown
export const STATUS_FILTERS = [
  'Semua',
  'Sedang Ditangani',
  'Perlu Tindak Lanjut',
  'Selesai',
] as const
