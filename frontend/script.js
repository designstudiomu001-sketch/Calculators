// ============================================
// CALCULATOR FRONTEND - script.js
// Logika frontend dan komunikasi dengan backend
// ============================================

/**
 * CALCULATOR APP
 * Aplikasi kalkulator yang berkomunikasi dengan backend API
 */

class Calculator {
  constructor() {
    // Elemen DOM
    this.display = document.getElementById('display');
    this.operationInfo = document.getElementById('operation-info');
    this.statusText = document.querySelector('.status-text');
    this.historyList = document.getElementById('history');
    this.loading = document.getElementById('loading');

    // State aplikasi
    this.firstNumber = null;
    this.secondNumber = null;
    this.operation = null;
    this.displayValue = '0';
    this.history = this.loadHistory();
    this.apiUrl = '/api/calculator';

    // Inisialisasi event listeners
    this.initializeEventListeners();
    this.displayHistory();
  }

  /**
   * Menginisialisasi semua event listeners
   */
  initializeEventListeners() {
    // Number buttons
    document.querySelectorAll('.btn-number').forEach(btn => {
      btn.addEventListener('click', () => this.handleNumberInput(btn.dataset.value));
    });

    // Operator buttons
    document.querySelectorAll('.btn-operator').forEach(btn => {
      btn.addEventListener('click', () => this.handleOperator(btn.dataset.operator));
    });

    // Special buttons
    document.getElementById('btn-equals').addEventListener('click', () => this.calculate());
    document.getElementById('btn-clear').addEventListener('click', () => this.clear());
    document.getElementById('btn-backspace').addEventListener('click', () => this.backspace());
    document.getElementById('btn-clear-history').addEventListener('click', () => this.clearHistory());

    // Keyboard support
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));
  }

  /**
   * Menangani input angka
   * @param {string} value - Nilai angka atau desimal
   */
  handleNumberInput(value) {
    // Jika display adalah 0, replace dengan nilai baru
    if (this.displayValue === '0' && value !== '.') {
      this.displayValue = value;
    } else if (value === '.') {
      // Cekdesimal sudah ada
      if (!this.displayValue.includes('.')) {
        this.displayValue += value;
      }
    } else {
      this.displayValue += value;
    }

    this.updateDisplay();
    this.operationInfo.textContent = `Input: ${this.displayValue}`;
  }

  /**
   * Menangani operator matematika
   * @param {string} operator - Operator yang dipilih
   */
  handleOperator(operator) {
    // Jika sudah ada operasi sebelumnya, hitung dulu
    if (this.operation !== null && this.displayValue !== '0') {
      this.performCalculation();
    } else if (this.displayValue !== '0') {
      this.firstNumber = parseFloat(this.displayValue);
    }

    this.operation = operator;
    this.displayValue = '0';

    // Update info
    const operatorSymbol = this.getOperatorSymbol(operator);
    this.operationInfo.textContent = `Operasi: ${operatorSymbol}`;
  }

  /**
   * Melakukan perhitungan dengan memanggil API backend
   */
  async performCalculation() {
    if (this.firstNumber === null || this.operation === null || this.displayValue === '0') {
      return;
    }

    this.secondNumber = parseFloat(this.displayValue);

    try {
      this.showLoading(true);
      this.updateStatus('processing');

      // Panggil API backend
      const response = await fetch(`${this.apiUrl}/${this.operation}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          num1: this.firstNumber,
          num2: this.secondNumber
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Simpan hasil ke first number untuk operasi berikutnya
        this.firstNumber = data.result;
        this.displayValue = this.formatResult(data.result);
        this.updateDisplay();

        // Simpan ke history
        const historyEntry = {
          operation: data.operation,
          expression: `${data.num1} ${this.getOperatorSymbol(this.operation)} ${data.num2}`,
          result: data.result,
          timestamp: new Date().toLocaleTimeString('id-ID')
        };
        this.addToHistory(historyEntry);

        this.operationInfo.textContent = `Hasil: ${this.displayValue}`;
        this.updateStatus('ready');
      } else {
        this.showError(data.message || 'Terjadi kesalahan');
      }
    } catch (error) {
      this.showError(`Kesalahan koneksi: ${error.message}`);
    } finally {
      this.showLoading(false);
    }
  }

  /**
   * Tombol equals untuk menyelesaikan perhitungan
   */
  async calculate() {
    if (this.operation === null) {
      return;
    }

    await this.performCalculation();
    this.operation = null;
    this.secondNumber = null;
  }

  /**
   * Tombol clear untuk mereset kalkulator
   */
  clear() {
    this.firstNumber = null;
    this.secondNumber = null;
    this.operation = null;
    this.displayValue = '0';
    this.updateDisplay();
    this.operationInfo.textContent = 'Siap untuk operasi';
    this.updateStatus('ready');
  }

  /**
   * Tombol backspace untuk menghapus digit terakhir
   */
  backspace() {
    if (this.displayValue.length > 1) {
      this.displayValue = this.displayValue.slice(0, -1);
    } else {
      this.displayValue = '0';
    }
    this.updateDisplay();
    this.operationInfo.textContent = `Input: ${this.displayValue}`;
  }

  /**
   * Update display dengan nilai terkini
   */
  updateDisplay() {
    this.display.value = this.displayValue;
  }

  /**
   * Update status indicator
   * @param {string} status - Status (ready, processing, error)
   */
  updateStatus(status) {
    this.statusText.classList.remove('processing', 'error');
    
    switch(status) {
      case 'ready':
        this.statusText.textContent = '✓ Siap';
        this.statusText.classList.add('ready');
        break;
      case 'processing':
        this.statusText.textContent = '⟳ Memproses...';
        this.statusText.classList.add('processing');
        break;
      case 'error':
        this.statusText.textContent = '✕ Error';
        this.statusText.classList.add('error');
        break;
    }
  }

  /**
   * Tampilkan/sembunyikan loading indicator
   * @param {boolean} show - Tampilkan atau sembunyikan
   */
  showLoading(show) {
    const loadingElement = document.getElementById('loading');
    if (show) {
      loadingElement.classList.add('show');
    } else {
      loadingElement.classList.remove('show');
    }
  }

  /**
   * Tampilkan pesan error
   * @param {string} message - Pesan error
   */
  showError(message) {
    alert(`❌ Error: ${message}`);
    this.updateStatus('error');

    setTimeout(() => {
      this.updateStatus('ready');
    }, 2000);
  }

  /**
   * Format hasil perhitungan
   * @param {number} result - Hasil perhitungan
   * @returns {string} Hasil yang sudah diformat
   */
  formatResult(result) {
    // Batasi decimal places hingga 10
    if (Number.isInteger(result)) {
      return result.toString();
    }
    return parseFloat(result.toFixed(10)).toString();
  }

  /**
   * Ambil simbol operator dari nama operator
   * @param {string} operatorName - Nama operator
   * @returns {string} Simbol operator
   */
  getOperatorSymbol(operatorName) {
    const symbols = {
      'add': '+',
      'subtract': '−',
      'multiply': '×',
      'divide': '÷',
      'power': 'x^y',
      'modulo': 'Mod'
    };
    return symbols[operatorName] || operatorName;
  }

  /**
   * Tambahkan entry ke history
   * @param {object} entry - Entry yang akan ditambahkan
   */
  addToHistory(entry) {
    this.history.unshift(entry);
    // Batasi history hingga 50 entries
    if (this.history.length > 50) {
      this.history.pop();
    }
    this.saveHistory();
    this.displayHistory();
  }

  /**
   * Tampilkan history
   */
  displayHistory() {
    this.historyList.innerHTML = '';

    if (this.history.length === 0) {
      this.historyList.innerHTML = '<p class="empty-history">Belum ada riwayat perhitungan</p>';
      return;
    }

    this.history.forEach((entry, index) => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      historyItem.innerHTML = `
        <div class="history-item-operation">${entry.operation} - ${entry.timestamp}</div>
        <div>${entry.expression}</div>
        <div class="history-item-result">= ${entry.result}</div>
      `;
      this.historyList.appendChild(historyItem);
    });
  }

  /**
   * Hapus history
   */
  clearHistory() {
    if (confirm('Yakin ingin menghapus semua riwayat?')) {
      this.history = [];
      this.saveHistory();
      this.displayHistory();
    }
  }

  /**
   * Simpan history ke localStorage
   */
  saveHistory() {
    localStorage.setItem('calculatorHistory', JSON.stringify(this.history));
  }

  /**
   * Muat history dari localStorage
   * @returns {array} History yang dimuat
   */
  loadHistory() {
    const saved = localStorage.getItem('calculatorHistory');
    return saved ? JSON.parse(saved) : [];
  }

  /**
   * Menangani input dari keyboard
   * @param {KeyboardEvent} event - Event keyboard
   */
  handleKeyboard(event) {
    const key = event.key;

    // Number dan decimal point
    if (/[0-9.]/.test(key)) {
      this.handleNumberInput(key);
    }

    // Operators
    switch(key) {
      case '+':
        event.preventDefault();
        this.handleOperator('add');
        break;
      case '-':
        event.preventDefault();
        this.handleOperator('subtract');
        break;
      case '*':
        event.preventDefault();
        this.handleOperator('multiply');
        break;
      case '/':
        event.preventDefault();
        this.handleOperator('divide');
        break;
      case 'Enter':
      case '=':
        event.preventDefault();
        this.calculate();
        break;
      case 'Escape':
        event.preventDefault();
        this.clear();
        break;
      case 'Backspace':
        event.preventDefault();
        this.backspace();
        break;
    }
  }
}

/**
 * INISIALISASI APLIKASI
 * Jalankan ketika DOM sudah siap
 */

document.addEventListener('DOMContentLoaded', () => {
  // Buat instance calculator
  const calculator = new Calculator();

  // Test koneksi ke backend
  console.log('🧮 Calculator App Initialized');
  console.log('API URL:', calculator.apiUrl);
});
