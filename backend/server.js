// ============================================
// BACKEND CALCULATOR - server.js
// Server utama dengan Express.js
// ============================================

const express = require('express');
const cors = require('cors');
const path = require('path');
const calculatorRoutes = require('./routes/calculator');

// Inisialisasi aplikasi Express
const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// MIDDLEWARE
// ============================================

// Middleware untuk parsing JSON
app.use(express.json());

// Middleware untuk CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware untuk melayani file statis dari folder frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// ============================================
// ROUTES
// ============================================

// Route untuk operasi kalkulator
app.use('/api/calculator', calculatorRoutes);

// Route untuk halaman utama
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ============================================
// ERROR HANDLING
// ============================================

// Middleware untuk menangani route yang tidak ditemukan
app.use((req, res) => {
  res.status(404).json({
    error: 'Route tidak ditemukan',
    message: `Path "${req.path}" tidak ada di server`
  });
});

// Middleware untuk menangani error
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Terjadi kesalahan server',
    message: err.message
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════╗
  ║  🧮 CALCULATOR BACKEND RUNNING         ║
  ║  Server berjalan di: http://localhost:${PORT}  ║
  ╚════════════════════════════════════════╝
  `);
});

module.exports = app;
