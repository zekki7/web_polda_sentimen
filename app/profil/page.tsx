'use client'

import { TopNav } from '@/components/top-nav'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function ProfilPage() {
  const adminData = {
    name: 'Admin POLDA Jawa Tengah',
    nip: '123456789',
    position: 'Administrator Sistem SENTINEL',
    unit: 'Direktorat Teknologi Informasi',
    email: 'admin@polda-jateng.go.id',
    phone: '+62-274-XXXXXX',
    joinDate: '15 Januari 2024',
    lastLogin: '9 Februari 2024, 10:30 WIB',
    loginAttempts: 156,
  }

  const permissions = [
    { name: 'Lihat Dashboard', granted: true },
    { name: 'Analisis Wilayah', granted: true },
    { name: 'Manajemen Status Isu', granted: true },
    { name: 'Unduh Laporan', granted: true },
    { name: 'Kelola Pengguna', granted: false },
    { name: 'Konfigurasi Sistem', granted: false },
  ]

  // ====== RIWAYAT AKTIVITAS ======
  
  // Daftar aktivitas login dan aksi admin terakhir
  const activityHistory = [
    { action: 'Login ke sistem', date: '9 Feb 2024, 10:30', status: 'Sukses' },
    { action: 'Unduh laporan analisis', date: '8 Feb 2024, 15:45', status: 'Sukses' },
    { action: 'Ubah status isu #5', date: '8 Feb 2024, 14:20', status: 'Sukses' },
    { action: 'Lihat detail wilayah Purwokerto', date: '7 Feb 2024, 09:15', status: 'Sukses' },
    {
      action: 'Gagal login - password salah',
      date: '6 Feb 2024, 18:50',
      status: 'Gagal',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">Profil Admin</h1>
          <p className="text-muted-foreground">
            Informasi akun dan pengaturan keamanan
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <div className="text-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-secondary mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👤</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-1">
                {adminData.name}
              </h2>
              <p className="text-sm text-muted-foreground">{adminData.position}</p>
            </div>

            <div className="space-y-4 border-t border-border pt-6">
              <div>
                <p className="text-xs text-muted-foreground mb-1">NIP</p>
                <p className="font-mono text-sm text-foreground">{adminData.nip}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Unit</p>
                <p className="text-sm text-foreground">{adminData.unit}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Email</p>
                <p className="text-sm text-foreground">{adminData.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Telepon</p>
                <p className="text-sm text-foreground">{adminData.phone}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Bergabung</p>
                <p className="text-sm text-foreground">{adminData.joinDate}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border space-y-2">
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                ✎ Edit Profil
              </Button>
              <Button
                variant="outline"
                className="w-full border-border hover:bg-primary/80 bg-transparent"
              >
                🔑 Ubah Password
              </Button>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Security Info */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Informasi Keamanan
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-primary/50 rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">Login Terakhir</p>
                    <p className="text-sm text-muted-foreground">
                      {adminData.lastLogin}
                    </p>
                  </div>
                  <span className="text-2xl">✓</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-primary/50 rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">Total Login</p>
                    <p className="text-sm text-muted-foreground">
                      {adminData.loginAttempts} kali
                    </p>
                  </div>
                  <span className="text-2xl">📊</span>
                </div>

                <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg">
                  <p className="text-sm text-green-300">
                    ✓ Sistem keamanan aktif dan berfungsi dengan baik
                  </p>
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Izin Akses
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {permissions.map((permission, index) => (
                  <motion.div
                    key={permission.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      permission.granted
                        ? 'bg-green-900/20 border-green-700'
                        : 'bg-red-900/20 border-red-700 opacity-60'
                    }`}
                  >
                    <span className="text-xl">
                      {permission.granted ? '✓' : '✗'}
                    </span>
                    <span
                      className={
                        permission.granted
                          ? 'text-green-300'
                          : 'text-red-300'
                      }
                    >
                      {permission.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Activity History */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Riwayat Aktivitas
              </h3>

              <div className="space-y-3">
                {activityHistory.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-accent transition-colors"
                  >
                    <div className="flex-1">
                      <p className="text-sm text-foreground font-medium">
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.date}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        activity.status === 'Sukses'
                          ? 'bg-green-900/30 text-green-300'
                          : 'bg-red-900/30 text-red-300'
                      }`}
                    >
                      {activity.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
