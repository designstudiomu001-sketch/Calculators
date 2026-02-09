// ============================================
// CALCULATOR ROUTES
// Mendefinisikan endpoint API untuk kalkulator
// ============================================

const express = require('express');
const router = express.Router();
const calculatorController = require('../controllers/calculatorController');

/**
 * Endpoint untuk operasi penjumlahan
 * POST /api/calculator/add
 * Body: { num1: number, num2: number }
 */
router.post('/add', calculatorController.add);

/**
 * Endpoint untuk operasi pengurangan
 * POST /api/calculator/subtract
 * Body: { num1: number, num2: number }
 */
router.post('/subtract', calculatorController.subtract);

/**
 * Endpoint untuk operasi perkalian
 * POST /api/calculator/multiply
 * Body: { num1: number, num2: number }
 */
router.post('/multiply', calculatorController.multiply);

/**
 * Endpoint untuk operasi pembagian
 * POST /api/calculator/divide
 * Body: { num1: number, num2: number }
 */
router.post('/divide', calculatorController.divide);

/**
 * Endpoint untuk operasi pangkat
 * POST /api/calculator/power
 * Body: { num1: number, num2: number }
 */
router.post('/power', calculatorController.power);

/**
 * Endpoint untuk operasi modulo
 * POST /api/calculator/modulo
 * Body: { num1: number, num2: number }
 */
router.post('/modulo', calculatorController.modulo);

module.exports = router;
