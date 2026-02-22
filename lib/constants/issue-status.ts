// File constant untuk status isu dan data-data statis
// Memisahkan data dari logic membuat code lebih mudah dibaca dan dirawat

// ====== TIPE DATA ======

/** Tipe untuk status penanganan isu */
export type IssueStatus =
  | "Sedang Ditangani"
  | "Perlu Tindak Lanjut"
  | "Selesai";

/** Tipe untuk status urgency isu */
export type IssueUrgency = "Darurat" | "Tidak Darurat";

// ====== KONFIGURASI STATUS ======

/**
 * Daftar semua status penanganan yang tersedia
 * Digunakan untuk filter dan dropdown di halaman status isu
 */
export const ISSUE_STATUSES: IssueStatus[] = [
  "Sedang Ditangani",
  "Perlu Tindak Lanjut",
  "Selesai",
];

/**
 * Daftar semua urgency level
 * Format biner: Darurat atau Tidak Darurat
 */
export const ISSUE_URGENCIES: IssueUrgency[] = ["Darurat", "Tidak Darurat"];

// ====== WARNA STATUS ======

/**
 * Mapping warna untuk setiap status penanganan
 * Digunakan untuk styling badge dan indikator visual
 */
export const STATUS_COLORS: Record<IssueStatus, string> = {
  "Sedang Ditangani": "bg-blue-900/30 text-blue-300 border-blue-700",
  "Perlu Tindak Lanjut": "bg-yellow-900/30 text-yellow-300 border-yellow-700",
  Selesai: "bg-green-900/30 text-green-300 border-green-700",
};

/**
 * Mapping warna untuk setiap urgency level
 * Merah untuk Darurat, Hijau untuk Tidak Darurat
 */
export const URGENCY_COLORS: Record<IssueUrgency, string> = {
  Darurat: "bg-red-900/30 text-red-300 border-red-700",
  "Tidak Darurat": "bg-green-900/30 text-green-300 border-green-700",
};
