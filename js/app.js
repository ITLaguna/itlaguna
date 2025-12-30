// #######################
// Author: Herry Saptiawan
// #######################


// =====================================
// KONSTANTA WAKTU (dalam milidetik)
// =====================================
// Digunakan untuk konversi waktu countdown
const second = 1000,        // 1 detik = 1000 ms
      minute = second * 60, // 1 menit = 60 detik
      hour   = minute * 60, // 1 jam = 60 menit
      day    = hour * 24;   // 1 hari = 24 jam


// =====================================
// AMBIL ELEMEN DOM YANG DIBUTUHKAN
// =====================================
// Container animasi kembang api
const fireworkContainer = document.querySelector('.fireworks-container'),
      // Elemen teks untuk menampilkan tahun baru (2025, 2026, dst)
      newYear = document.querySelector('#new-year-year');


// =====================================
// SET TANGGAL TARGET TAHUN BARU
// =====================================

// Mode TESTING (untuk debug / demo)
// let new_year = "December 20, 2025 19:07:30";

// Mode PRODUKSI (aktifkan saat live)
let new_year = "January 01, 2026 00:00:00";


// =====================================
// MENENTUKAN TAHUN BARU SECARA OTOMATIS
// =====================================
// Ambil angka tahun dari tanggal target
const comingYear = new Date(new_year).getFullYear();

// Tampilkan tahun ke elemen HTML
newYear.innerHTML = comingYear;


// =====================================
// HITUNG WAKTU COUNTDOWN
// =====================================
// Konversi tanggal target ke timestamp (ms)
const countDown = new Date(new_year).getTime();


// =====================================
// INTERVAL COUNTDOWN (UPDATE SETIAP DETIK)
// =====================================
const interval = setInterval(function () {

    // Ambil waktu sekarang
    let now = new Date().getTime(),

        // Selisih waktu menuju tahun baru
        distance = countDown - now;

    // ---------------------------------
    // HITUNG SISA WAKTU
    // ---------------------------------
    let days    = Math.floor(distance / day);
    let hours   = Math.floor((distance % day) / hour);
    let minutes = Math.floor((distance % hour) / minute);
    let seconds = Math.floor((distance % minute) / second);

    // ---------------------------------
    // UPDATE TAMPILAN COUNTDOWN
    // ---------------------------------
    // Format angka agar selalu 2 digit
    document.getElementById('days-num').innerText    = days < 10 ? '0' + days : days;
    document.getElementById('hours-num').innerText   = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes-num').innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds-num').innerText = seconds < 10 ? '0' + seconds : seconds;

    // ---------------------------------
    // SEMBUNYIKAN HARI JIKA < 1 HARI
    // ---------------------------------
    if (distance <= day) {
        document.getElementById('days').style.display = "none";
    }

    // ---------------------------------
    // SEMBUNYIKAN JAM JIKA < 1 JAM
    // ---------------------------------
    if (distance <= hour) {
        document.getElementById('hours').style.display = "none";
    }

    // ---------------------------------
    // SEMBUNYIKAN MENIT JIKA < 1 MENIT
    // ---------------------------------
    if (distance <= minute) {

        // Hilangkan tampilan menit
        document.getElementById('minutes').style.display = "none";

        // Reset animasi scale detik
        document.getElementById('seconds').classList.remove('scale');

        // Perbesar angka detik di akhir countdown
        document.getElementById('seconds-num').style.fontSize = '35rem';

        // Sembunyikan semua label teks (DAYS, HOURS, MINUTES, SECONDS)
        document.querySelectorAll('.time p').forEach(p => p.style.display = 'none');
    }

    // ---------------------------------
    // ANIMASI DETIK 10 DETIK TERAKHIR
    // ---------------------------------
    if (distance <= second * 10 && distance > 0) {

        // Update angka detik
        document.getElementById('seconds-num').innerText = seconds;

        // Aktifkan animasi scale (zoom)
        document.getElementById('seconds').classList.add('scale');
    }

    // ---------------------------------
    // SAAT COUNTDOWN SELESAI
    // ---------------------------------
    if (distance <= 0) {

        // Sembunyikan container countdown
        document.getElementById("countdown-container").style.display = "none";

        // Tampilkan container tahun baru
        newYear.style.display = "block";
        newYear.innerHTML = "";

        // Konversi tahun menjadi string (misal "2025")
        const yearString = comingYear.toString();

        // Delay animasi antar digit
        const delayPerDigit = 180;

        // Pecah setiap digit menjadi span terpisah
        yearString.split("").forEach((digit, index) => {
            const span = document.createElement("span");
            span.textContent = digit;

            // Delay animasi per digit (efek muncul satu-satu)
            span.style.animationDelay = `${index * delayPerDigit}ms`;
            newYear.appendChild(span);
        });

        // Mulai animasi kembang api
        fireworks.start();

        // Tampilkan teks "Happy New Year"
        document.getElementById('happy-new-year').style.display = "block";
        document.getElementById('happy-new-year').classList.add('fadeIn');

        // Hentikan interval countdown
        clearInterval(interval);
    }

}, 1000); // Interval update setiap 1 detik


// =====================================
// INISIALISASI ANIMASI KEMBANG API
// =====================================
const fireworks = new Fireworks(fireworkContainer, {

  // ⏱️ Jeda antar roket
  delay: {
    min: 1,   // Jeda minimum (lebih sering)
    max: 5    // Jeda maksimum (lebih halus)
  },

  // 🚀 Gerakan roket
  speed: 8,         // Kecepatan awal roket
  acceleration: 1,  // Percepatan roket ke atas

  // 💥 Efek ledakan
  particles: 140,   // Jumlah partikel ledakan
  explosion: 8,     // Radius sebaran partikel
  trace: 4,         // Panjang jejak roket

  // 🎈 Gerakan partikel
  friction: 0.96,   // Gesekan partikel
  gravity: 1.5,     // Gravitasi partikel

  // ✨ Efek visual
  opacity: 0.5,     // Intensitas glow / transparansi
  hue: {
    min: 0,
    max: 360        // Warna acak (full spectrum)
  }
});
