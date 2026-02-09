// ============================================
// CALCULATOR CONTROLLER
// Logika bisnis untuk operasi kalkulator
// ============================================

/**
 * Controller untuk menangani operasi matematika
 * Semua fungsi menerima parameter dari request body
 * dan mengembalikan hasil dalam format JSON
 */

// Fungsi untuk penjumlahan
const add = (req, res) => {
  try {
    const { num1, num2 } = req.body;

    // Validasi input
    if (num1 === undefined || num2 === undefined) {
      return res.status(400).json({
        error: 'Parameter tidak lengkap',
        message: 'Kedua angka harus disediakan (num1 dan num2)'
      });
    }

    if (isNaN(num1) || isNaN(num2)) {
      return res.status(400).json({
        error: 'Input tidak valid',
        message: 'Kedua parameter harus berupa angka'
      });
    }

    const result = parseFloat(num1) + parseFloat(num2);
    res.json({
      success: true,
      operation: 'Penjumlahan (+)',
      num1: parseFloat(num1),
      num2: parseFloat(num2),
      result: result
    });
  } catch (error) {
    res.status(500).json({
      error: 'Kesalahan server',
      message: error.message
    });
  }
};

// Fungsi untuk pengurangan
const subtract = (req, res) => {
  try {
    const { num1, num2 } = req.body;

    if (num1 === undefined || num2 === undefined) {
      return res.status(400).json({
        error: 'Parameter tidak lengkap',
        message: 'Kedua angka harus disediakan (num1 dan num2)'
      });
    }

    if (isNaN(num1) || isNaN(num2)) {
      return res.status(400).json({
        error: 'Input tidak valid',
        message: 'Kedua parameter harus berupa angka'
      });
    }

    const result = parseFloat(num1) - parseFloat(num2);
    res.json({
      success: true,
      operation: 'Pengurangan (-)',
      num1: parseFloat(num1),
      num2: parseFloat(num2),
      result: result
    });
  } catch (error) {
    res.status(500).json({
      error: 'Kesalahan server',
      message: error.message
    });
  }
};

// Fungsi untuk perkalian
const multiply = (req, res) => {
  try {
    const { num1, num2 } = req.body;

    if (num1 === undefined || num2 === undefined) {
      return res.status(400).json({
        error: 'Parameter tidak lengkap',
        message: 'Kedua angka harus disediakan (num1 dan num2)'
      });
    }

    if (isNaN(num1) || isNaN(num2)) {
      return res.status(400).json({
        error: 'Input tidak valid',
        message: 'Kedua parameter harus berupa angka'
      });
    }

    const result = parseFloat(num1) * parseFloat(num2);
    res.json({
      success: true,
      operation: 'Perkalian (×)',
      num1: parseFloat(num1),
      num2: parseFloat(num2),
      result: result
    });
  } catch (error) {
    res.status(500).json({
      error: 'Kesalahan server',
      message: error.message
    });
  }
};

// Fungsi untuk pembagian
const divide = (req, res) => {
  try {
    const { num1, num2 } = req.body;

    if (num1 === undefined || num2 === undefined) {
      return res.status(400).json({
        error: 'Parameter tidak lengkap',
        message: 'Kedua angka harus disediakan (num1 dan num2)'
      });
    }

    if (isNaN(num1) || isNaN(num2)) {
      return res.status(400).json({
        error: 'Input tidak valid',
        message: 'Kedua parameter harus berupa angka'
      });
    }

    // Validasi pembagian dengan nol
    if (parseFloat(num2) === 0) {
      return res.status(400).json({
        error: 'Operasi tidak valid',
        message: 'Tidak bisa membagi dengan nol'
      });
    }

    const result = parseFloat(num1) / parseFloat(num2);
    res.json({
      success: true,
      operation: 'Pembagian (÷)',
      num1: parseFloat(num1),
      num2: parseFloat(num2),
      result: result
    });
  } catch (error) {
    res.status(500).json({
      error: 'Kesalahan server',
      message: error.message
    });
  }
};

// Fungsi untuk pangkat (power)
const power = (req, res) => {
  try {
    const { num1, num2 } = req.body;

    if (num1 === undefined || num2 === undefined) {
      return res.status(400).json({
        error: 'Parameter tidak lengkap',
        message: 'Kedua angka harus disediakan (num1 dan num2)'
      });
    }

    if (isNaN(num1) || isNaN(num2)) {
      return res.status(400).json({
        error: 'Input tidak valid',
        message: 'Kedua parameter harus berupa angka'
      });
    }

    const result = Math.pow(parseFloat(num1), parseFloat(num2));
    res.json({
      success: true,
      operation: 'Pangkat (^)',
      num1: parseFloat(num1),
      num2: parseFloat(num2),
      result: result
    });
  } catch (error) {
    res.status(500).json({
      error: 'Kesalahan server',
      message: error.message
    });
  }
};

// Fungsi untuk modulo (sisa pembagian)
const modulo = (req, res) => {
  try {
    const { num1, num2 } = req.body;

    if (num1 === undefined || num2 === undefined) {
      return res.status(400).json({
        error: 'Parameter tidak lengkap',
        message: 'Kedua angka harus disediakan (num1 dan num2)'
      });
    }

    if (isNaN(num1) || isNaN(num2)) {
      return res.status(400).json({
        error: 'Input tidak valid',
        message: 'Kedua parameter harus berupa angka'
      });
    }

    if (parseFloat(num2) === 0) {
      return res.status(400).json({
        error: 'Operasi tidak valid',
        message: 'Tidak bisa modulo dengan nol'
      });
    }

    const result = parseFloat(num1) % parseFloat(num2);
    res.json({
      success: true,
      operation: 'Modulo (%)',
      num1: parseFloat(num1),
      num2: parseFloat(num2),
      result: result
    });
  } catch (error) {
    res.status(500).json({
      error: 'Kesalahan server',
      message: error.message
    });
  }
};

// Export semua fungsi controller
module.exports = {
  add,
  subtract,
  multiply,
  divide,
  power,
  modulo
};
