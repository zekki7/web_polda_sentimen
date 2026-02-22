// Data laporan dan sentimen untuk setiap wilayah di Jawa Tengah

export const regionData = [
  { region: 'Semarang', laporan: 450, positif: 290, netral: 110, negatif: 50 },
  { region: 'Surakarta', laporan: 380, positif: 220, netral: 100, negatif: 60 },
  { region: 'Salatiga', laporan: 420, positif: 170, netral: 120, negatif: 130 },
  { region: 'Pekalongan', laporan: 320, positif: 160, netral: 160, negatif: 0 },
  { region: 'Purwokerto', laporan: 290, positif: 210, netral: 60, negatif: 20 },
]

export const wordCloudData = [
  { word: 'Transportasi', value: 45 },
  { word: 'Keamanan', value: 38 },
  { word: 'Layanan', value: 35 },
  { word: 'Lalu Lintas', value: 32 },
  { word: 'Kemacetan', value: 28 },
  { word: 'Polisi', value: 25 },
]

export interface Report {
  id: number
  text: string
  sentiment: 'Positif' | 'Negatif' | 'Netral'
  topic: string
  region: string
  time: string
}

export const reports: Report[] = [
  {
    id: 1,
    text: 'Kemacetan parah di Jalan Ahmad Yani akibat kecelakaan',
    sentiment: 'Negatif',
    topic: 'Lalu Lintas',
    region: 'Semarang',
    time: '2 jam lalu',
  },
  {
    id: 2,
    text: 'Apresiasi terhadap patroli malam yang responsif',
    sentiment: 'Positif',
    topic: 'Keamanan',
    region: 'Semarang',
    time: '3 jam lalu',
  },
  {
    id: 3,
    text: 'Proses administrasi di kantor polres sangat cepat',
    sentiment: 'Positif',
    topic: 'Layanan Publik',
    region: 'Surakarta',
    time: '5 jam lalu',
  },
  {
    id: 4,
    text: 'Peningkatan kriminal di kawasan pemukiman',
    sentiment: 'Negatif',
    topic: 'Kriminal',
    region: 'Salatiga',
    time: '6 jam lalu',
  },
]
