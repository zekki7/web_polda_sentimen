// Reusable animation variants untuk Framer Motion

// Variant untuk container - animasi container dan children secara bersamaan
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Delay antara setiap child 0.1s
      delayChildren: 0.2,   // Delay total sebelum mulai 0.2s
    },
  },
}

// Variant untuk item individual - animasi fade in dan slide up
export const itemVariants = {
  hidden: { opacity: 0, y: 20 },  // Awal: tidak terlihat, posisi bawah
  visible: {
    opacity: 1,
    y: 0,                          // Akhir: terlihat, posisi normal
    transition: { duration: 0.5 },
  },
}

// Variant untuk fade in dari atas
export const fadeInDownVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}
