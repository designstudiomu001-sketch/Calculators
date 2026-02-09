# 🧮 Kalkulator Full-Stack

Aplikasi kalkulator modern dengan arsitektur full-stack menggunakan Node.js/Express di backend dan Vanilla JavaScript di frontend.

## 📋 Daftar Isi

- [Fitur](#fitur)
- [Struktur Folder](#struktur-folder)
- [Persyaratan Sistem](#persyaratan-sistem)
- [Instalasi](#instalasi)
- [Cara Menjalankan](#cara-menjalankan)
- [Dokumentasi API](#dokumentasi-api)
- [Penjelasan Kode](#penjelasan-kode)

## ✨ Fitur

- **Operasi Dasar**: Penjumlahan, pengurangan, perkalian, pembagian
- **Operasi Lanjutan**: Pangkat (power), modulo
- **Backend API**: RESTful API menggunakan Express.js
- **Frontend Modern**: Interface yang responsif dan user-friendly
- **Riwayat Perhitungan**: Menyimpan dan menampilkan history (localStorage)
- **Support Keyboard**: Gunakan keyboard untuk input lebih cepat
- **Loading Indicator**: Visual feedback saat berkomunikasi dengan server
- **Error Handling**: Validasi input dan penanganan error yang baik

## 📁 Struktur Folder

```
calculator-fullstack/
├── frontend/                          # Folder Frontend
│   ├── index.html                     # File HTML utama
│   ├── style.css                      # Styling dan layout
│   └── script.js                      # Logika frontend & komunikasi API
│
├── backend/                           # Folder Backend
│   ├── server.js                      # File utama server Express
│   ├── routes/
│   │   └── calculator.js              # Definisi routes API
│   └── controllers/
│       └── calculatorController.js    # Logika bisnis perhitungan
│
├── package.json                       # Konfigurasi dan dependencies Node.js
└── README.md                          # Dokumentasi (file ini)
```

## 🔧 Persyaratan Sistem

Sebelum memulai, pastikan Anda sudah menginstal:

- **Node.js** (versi 14.0 atau lebih tinggi)
  - Download dari: https://nodejs.org/
- **npm** (biasanya sudah disertakan dengan Node.js)
- **Browser modern** (Chrome, Firefox, Safari, Edge)

Verifikasi instalasi:
```bash
node --version
npm --version
```

## 📦 Instalasi

### 1. Buka Terminal/Command Prompt

Arahkan ke folder `calculator-fullstack`:
```bash
cd c:\Users\lurah\Documents\calculator-fullstack
```

### 2. Install Dependencies

Instal semua package yang diperlukan:
```bash
npm install
```

Perintah ini akan menginstal:
- **express**: Framework web
- **cors**: Middleware untuk Cross-Origin Resource Sharing
- **nodemon** (dev): Untuk auto-restart server saat ada perubahan kode

## 🚀 Cara Menjalankan

### Mode Production

Jalankan server:
```bash
npm start
```

Server akan berjalan di `http://localhost:5000`

### Mode Development (dengan Auto-Reload)

Jalankan dengan nodemon:
```bash
npm run dev
```

Setiap kali Anda mengubah file backend, server akan otomatis restart.

### Akses Aplikasi

Buka browser dan kunjungi:
```
http://localhost:5000
```

## 📡 Dokumentasi API

Semua request harus mengirim **POST** request dengan header `Content-Type: application/json`

### Base URL
```
http://localhost:5000/api/calculator
```

### Endpoint

#### 1. Penjumlahan (Addition)
```
POST /api/calculator/add
Content-Type: application/json

{
  "num1": 10,
  "num2": 5
}

Response:
{
  "success": true,
  "operation": "Penjumlahan (+)",
  "num1": 10,
  "num2": 5,
  "result": 15
}
```

#### 2. Pengurangan (Subtraction)
```
POST /api/calculator/subtract
{
  "num1": 10,
  "num2": 3
}
Result: 7
```

#### 3. Perkalian (Multiplication)
```
POST /api/calculator/multiply
{
  "num1": 10,
  "num2": 5
}
Result: 50
```

#### 4. Pembagian (Division)
```
POST /api/calculator/divide
{
  "num1": 10,
  "num2": 2
}
Result: 5

⚠️ Error jika pembagi = 0
```

#### 5. Pangkat (Power)
```
POST /api/calculator/power
{
  "num1": 2,
  "num2": 3
}
Result: 8 (2^3)
```

#### 6. Modulo (Remainder)
```
POST /api/calculator/modulo
{
  "num1": 10,
  "num2": 3
}
Result: 1

⚠️ Error jika pembagi = 0
```

## 💡 Penjelasan Kode

### Backend Structure

#### `backend/server.js` - Server Utama
- Menggunakan Express.js untuk setup HTTP server
- CORS middleware untuk allow cross-origin requests
- Static file serving untuk melayani frontend files
- Error handling middleware
- Routes definition

#### `backend/routes/calculator.js` - Routes Definition
- Mendefinisikan endpoint API
- Mapping ke controller functions
- Response format yang konsisten

#### `backend/controllers/calculatorController.js` - Business Logic
- Fungsi untuk setiap operasi matematika
- Input validation untuk setiap parameter
- Error handling untuk kasus spesial (pembagian dengan 0)
- Return hasil dalam format JSON yang terstruktur

### Frontend Structure

#### `frontend/index.html` - HTML Structure
- Semantic HTML5
- Organized sections: header, calculator, history, status
- Accessibility features
- Loading indicator untuk UX yang baik

#### `frontend/style.css` - Styling & Layout
- Dark modern theme dengan gradient colors
- Responsive design (mobile-friendly)
- Smooth animations dan transitions
- CSS custom properties (variables) untuk easy customization
- Grid layout untuk button arrangement

#### `frontend/script.js` - Frontend Logic
- **Calculator Class**: Encapsulation semua logika
- **State Management**: Tracking first number, operator, second number
- **API Communication**: Fetch API untuk komunikasi dengan backend
- **Local Storage**: Menyimpan history perhitungan
- **Event Handling**: Button clicks dan keyboard input
- **Error Handling**: User-friendly error messages

## 🎮 Cara Penggunaan

### Menggunakan Mouse/Touch
1. Klik angka untuk input
2. Klik operator (+ − × ÷ x^y Mod)
3. Klik angka kedua
4. Klik **=** untuk hasil

### Menggunakan Keyboard
| Key | Function |
|-----|----------|
| 0-9 | Input angka |
| . | Desimal |
| + | Penjumlahan |
| - | Pengurangan |
| * | Perkalian |
| / | Pembagian |
| Enter atau = | Hitung |
| Backspace | Hapus digit terakhir |
| Escape | Clear semua |

### Riwayat Perhitungan
- Otomatis tersimpan di browser (localStorage)
- Muncul di bagian "📜 Riwayat Perhitungan"
- Klik "Hapus Riwayat" untuk menghapus semua

## 🔌 Troubleshooting

### Port 5000 Sudah Digunakan
```bash
# Ubah port di backend/server.js atau gunakan env variable
set PORT=3000
npm start
```

### Module Not Found Error
Pastikan sudah menjalankan `npm install` di folder project.

### CORS Error
Sudah dikonfigurasi di `server.js`, tapi jika masih ada issue, cek:
```javascript
app.use(cors()); // Harus sebelum routes
```

### Koneksi Server Gagal
1. Pastikan server running: `npm start`
2. Check browser console (F12) untuk error details
3. Pastikan URL benar: `http://localhost:5000`

## 📝 Tips Pengembangan

### Menambah Operasi Baru

1. **Controller** (`backend/controllers/calculatorController.js`):
```javascript
const newOperation = (req, res) => {
  // Logika operasi
};
module.exports = { /* ... existing ... */, newOperation };
```

2. **Routes** (`backend/routes/calculator.js`):
```javascript
router.post('/newoperation', calculatorController.newOperation);
```

3. **Frontend** (`frontend/script.js`):
```javascript
this.handleOperator('newoperation'); // di handleOperator function
```

### Customizing Theme
Edit CSS variables di `frontend/style.css`:
```css
:root {
  --primary-color: #6366f1;  /* Change this */
  --secondary-color: #ec4899; /* and this */
  /* ... more variables ... */
}
```

## 📄 Lisensi

MIT License - Bebas digunakan untuk project pribadi atau komersial

## 🤝 Kontribusi

Silakan fork, modify, dan improve project ini!

---

**Created with ❤️ for Learning Full-Stack Development**

Selamat belajar! 🚀
