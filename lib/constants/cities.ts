// ====== KOTA/KABUPATEN DI JAWA TENGAH ======
// File ini berisi daftar semua kota dan kabupaten di Jawa Tengah untuk konsistensi data

export const CENTRAL_JAVA_CITIES = [
  'Semarang',       // Kota besar, ibu kota Jawa Tengah
  'Surakarta',      // Kota besar, dikenal juga sebagai Solo
  'Salatiga',       // Kota kecil
  'Pekalongan',     // Kota di pesisir utara
  'Purwokerto',     // Kota di selatan
  'Magelang',       // Kota di sekitar Gunung Merapi
  'Wonosobo',       // Kota di daerah pegunungan
  'Rembang',        // Kota di pesisir timur
  'Kudus',          // Kota industri rokok
  'Demak',          // Kabupaten di pesisir utara
  'Jepara',         // Kabupaten penghasil mebel
  'Cilacap',        // Kabupaten terbesar di Jawa Tengah
]

// Daftar kota utama yang sering digunakan di dashboard
export const MAIN_CITIES = [
  'Semarang',
  'Surakarta',
  'Salatiga',
  'Pekalongan',
  'Purwokerto',
]

// Daftar semua kota untuk dropdown/select
export const ALL_CITIES = CENTRAL_JAVA_CITIES.sort()

// Fungsi untuk validasi apakah kota valid
export function isValidCity(city: string): boolean {
  return CENTRAL_JAVA_CITIES.includes(city)
}

// Fungsi untuk mendapatkan daftar kota random
export function getRandomCities(count: number): string[] {
  const shuffled = [...CENTRAL_JAVA_CITIES].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}
