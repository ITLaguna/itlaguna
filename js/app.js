// #######################
// Author: Herry Saptiawan
// #######################


// =====================================
// KONSTANTA WAKTU (dalam milidetik)
// =====================================
const second = 1000,        // 1 detik = 1000 ms
      minute = second * 60, // 1 menit = 60 detik
      hour   = minute * 60, // 1 jam = 60 menit
      day    = hour * 24;   // 1 hari = 24 jam


// =====================================
// AMBIL ELEMEN DOM YANG DIBUTUHKAN
// =====================================
const fireworkContainer = document.querySelector('.fireworks-container'), // Container kembang api
      newYear = document.querySelector('#new-year-year');                  // Elemen teks tahun baru


// =====================================
// SET TANGGAL TARGET TAHUN BARU
// =====================================

// Mode TESTING
// let new_year = "December 26, 2025 14:44:40"; // Tanggal target New Year

// Mode PRODUKSI
let new_year = "January 01, 2026 00:00:00"; // Tanggal resmi tahun baru


// =====================================
// MENENTUKAN TAHUN BARU SECARA OTOMATIS
// =====================================
const comingYear = new Date(new_year).getFullYear(); // Ambil tahun dari tanggal target
newYear.innerHTML = comingYear;                      // Tampilkan tahun baru ke halaman


// =====================================
// HITUNG WAKTU COUNTDOWN
// =====================================
const countDown = new Date(new_year).getTime(); // Konversi tanggal target ke timestamp


// =====================================
// INTERVAL COUNTDOWN (UPDATE SETIAP DETIK)
// =====================================
const interval = setInterval(function () {

    // Waktu sekarang & selisih waktu menuju tahun baru
    let now = new Date().getTime(),
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
        document.getElementById('minutes').style.display = "none";
        document.getElementById('seconds').classList.remove('scale');
        document.getElementById('seconds-num').style.fontSize = '35rem';

        // Sembunyikan label teks (DAYS, HOURS, dll)
        document.querySelectorAll('.time p').forEach(p => p.style.display = 'none');
    }

    // ---------------------------------
    // ANIMASI DETIK 10 DETIK TERAKHIR
    // ---------------------------------
    if (distance <= second * 10 && distance > 0) {
        document.getElementById('seconds-num').innerText = seconds;
        document.getElementById('seconds').classList.add('scale');
    }

//     if (distance === 0) {
//     document.getElementById('seconds').classList.remove('scale');
// }

    // ---------------------------------
    // SAAT COUNTDOWN SELESAI
    // ---------------------------------
    if (distance <= 0) {
        document.getElementById('seconds').classList.remove('scale');
        document.getElementById('seconds').style.opacity = '0';
        document.getElementById('happy-new-year').classList.add('fadeIn');
        document.getElementById("countdown-container").style.display = "none";
        document.getElementById("happy-new-year").style.display = "block";

        fireworks.start();      // Jalankan animasi kembang api
        clearInterval(interval); // Hentikan countdown
    }

}, 1000); // Update setiap 1 detik


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
  opacity: 0.5,     // Efek glow / transparansi
  hue: {
    min: 0,
    max: 360        // Warna acak (pelangi)
  }
});
