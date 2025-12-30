// #######################
// Author: Herry Saptiawan
// #######################


// =====================================
// KONSTANTA WAKTU
// =====================================
const second = 1000;
const minute = second * 60;
const hour   = minute * 60;
const day    = hour * 24;
let lastSecond = null;

// =====================================
// AMBIL ELEMEN DOM
// =====================================
const daysEl    = document.getElementById("days");
const hoursEl   = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const daysNum    = document.getElementById("days-num");
const hoursNum   = document.getElementById("hours-num");
const minutesNum = document.getElementById("minutes-num");
const secondsNum = document.getElementById("seconds-num");

const countdownContainer = document.getElementById("countdown-container");
const happyNewYear       = document.getElementById("happy-new-year");
const newYearText        = document.getElementById("new-year-year");
const fireworkContainer  = document.querySelector(".fireworks-container");


// =====================================
// TARGET WAKTU
// =====================================
// const new_year   = "December 31, 2025 00:25:00";
const new_year   = "January 01, 2026 00:00:00";

const countDown  = new Date(new_year).getTime();
const comingYear = new Date(new_year).getFullYear();

newYearText.innerHTML = comingYear;


// =====================================
// FLAG PENTING (ANTI DOUBLE 0)
// =====================================
let finished = false;


// =====================================
// COUNTDOWN LOOP (1000ms TEPAT)
// =====================================
const interval = setInterval(() => {

    const now = Date.now();
    const distance = countDown - now;

    // ===============================
    // SELESAI TOTAL (HANYA SEKALI)
    // ===============================
    if (distance < 0) {
        if (finished) return;
        finished = true;

        clearInterval(interval);
        countdownContainer.style.display = "none";

        // TAMPILKAN TAHUN BARU
        newYearText.innerHTML = "";
        newYearText.style.display = "block";

        const delay = 200;
        comingYear.toString().split("").forEach((d, i) => {
            const span = document.createElement("span");
            span.textContent = d;
            span.style.animationDelay = `${i * delay}ms`;
            newYearText.appendChild(span);
        });

        happyNewYear.style.display = "block";
        happyNewYear.classList.add("fadeIn");

        fireworks.start();
        return;
    }

    // ===============================
    // HITUNG WAKTU (AMAN)
    // ===============================
    const days    = Math.floor(distance / day);
    const hours   = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // ===============================
    // NORMAL MODE (> 60 DETIK)
    // ===============================
    if (distance > minute) {
        daysEl.style.display    = days > 0 ? "block" : "none";
        hoursEl.style.display   = (days > 0 || hours > 0 ) ? "block" : "none";
        minutesEl.style.display = "block";

        document.querySelectorAll(".time p")
            .forEach(p => p.style.display = "block");

        secondsEl.classList.remove("scale");
        secondsNum.style.fontSize = "";

        daysNum.innerText    = days < 10 ? "0" + days : days;
        hoursNum.innerText   = hours < 10 ? "0" + hours : hours;
        minutesNum.innerText = minutes < 10 ? "0" + minutes : minutes;
        secondsNum.innerText = seconds < 10 ? "0" + seconds : seconds;

        return;
    }

    // ===============================
    // 60 → 11 DETIK TERAKHIR
    // ===============================
    if (distance <= minute && distance > second * 10) {

        daysEl.style.display    = "none";
        hoursEl.style.display   = "none";
        minutesEl.style.display = "none";

        document.querySelectorAll(".time p")
            .forEach(p => p.style.display = "none");

        secondsNum.innerText = seconds;
        secondsNum.style.fontSize = "35rem";
        secondsEl.classList.remove("scale");

        return;
    }

    // ===============================
    // 10 → 0 DETIK TERAKHIR
    // ===============================
    if (distance <= second * 10) {

        if (seconds !== lastSecond) { // ⬅️ PENGAMAN UTAMA
            secondsNum.innerText = seconds; // 3 2 1 0 (SEKALI)
            secondsNum.style.fontSize = "35rem";

            secondsEl.classList.remove("scale");
            void secondsEl.offsetWidth;
            secondsEl.classList.add("scale");

            lastSecond = seconds;
        }

    return;
    }

}, 1000);


// =====================================
// FIREWORKS
// =====================================
const fireworks = new Fireworks(fireworkContainer, {
    delay: { min: 1, max: 5 },
    speed: 8,
    acceleration: 1,
    particles: 140,
    explosion: 8,
    trace: 4,
    friction: 0.96,
    gravity: 1.5,
    opacity: 0.5,
    hue: { min: 0, max: 360 }
});
