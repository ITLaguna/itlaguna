/*!
 * fireworks-js 1.3.5 by Vitalij Ryndin (https://crashmax.ru)
 * https://fireworks.js.org
 * License MIT
 */
!function(t, i) {
    // Menyediakan dukungan untuk CommonJS dan AMD
    if ("object" == typeof exports && "object" == typeof module)
        module.exports = i();
    else if ("function" == typeof define && define.amd)
        define([], i);
    else {
        var s = i();
        for (var e in s)
            ("object" == typeof exports ? exports : t)[e] = s[e];
    }
}(this, (function() {
    return (() => {
        "use strict";
        var t = {
            511: (t, i, s) => {
                Object.defineProperty(i, "__esModule", { value: !0 });
                i.Explosion = void 0;
                var e = s(909);
                
                // Kelas Explosion untuk menangani logika ledakan kembang api
                i.Explosion = class {
                    constructor(t) {
                        var { x: i, y: s, ctx: h, hue: n, exp: o, gravity: a, friction: r, brightness: c, explosionLength: _ } = t;
                        for (this._coordinates = [], this._alpha = 1, this._x = i, this._y = s, this._exp = o, this._ctx = h, this._gravity = a, this._friction = r, this._explosionLength = _; this._explosionLength--;) {
                            this._coordinates.push([i, s]); // Menyimpan koordinat awal untuk ledakan
                        }
                        this._angle = (0, e.randomFloat)(0, 2 * Math.PI); // Arah acak untuk ledakan
                        this._speed = (0, e.randomInt)(1, 10); // Kecepatan acak
                        this._hue = (0, e.randomInt)(n - 20, n + 20); // Warna acak
                        this._brightness = (0, e.randomInt)(c.min, c.max); // Kecerahan acak
                        this._decay = (0, e.randomFloat)(c.decay.min, c.decay.max); // Pengurangan transparansi seiring waktu
                    }

                    // Update posisi ledakan
                    update(t) {
                        this._coordinates.pop();
                        this._coordinates.unshift([this._x, this._y]); // Memindahkan koordinat ke posisi terbaru
                        this._speed *= this._friction; // Mengurangi kecepatan dengan faktor gesekan
                        this._x += Math.cos(this._angle) * this._speed; // Menghitung posisi X berdasarkan kecepatan dan arah
                        this._y += Math.sin(this._angle) * this._speed + this._gravity; // Menghitung posisi Y dengan tambahan gravitasi
                        this._alpha -= this._decay; // Mengurangi transparansi sesuai dengan decay
                        if (this._alpha <= this._decay) t(); // Jika transparansi rendah, panggil fungsi t()
                    }

                    // Menggambar ledakan di canvas
                    draw() {
                        var t = this._coordinates.length - 1;
                        this._ctx.beginPath();
                        if (this._exp) {
                            this._ctx.arc(this._x, this._y, (0, e.randomFloat)(0.5, 1.5), 0, 2 * Math.PI); // Gambar lingkaran kecil untuk ledakan
                            this._ctx.fill();
                        }
                        this._ctx.fillStyle = (0, e.hsla)(this._hue, this._brightness, this._alpha); // Warna berdasarkan hue, brightness, dan alpha
                        this._ctx.moveTo(this._coordinates[t][0], this._coordinates[t][1]);
                        this._ctx.lineTo(this._x, this._y); // Gambar garis dari koordinat sebelumnya ke posisi saat ini
                        this._ctx.strokeStyle = (0, e.hsla)(this._hue, this._brightness, this._alpha); // Warna garis yang sama
                        this._ctx.stroke();
                    }
                };
            },
            909: (t, i) => {
                Object.defineProperty(i, "__esModule", { value: !0 });
                i.hsla = i.getDistance = i.randomInt = i.randomFloat = void 0;
                // Fungsi untuk menghasilkan angka acak float dalam rentang tertentu
                i.randomFloat = function(t, i) { return Math.random() * (i - t) + t; };
                // Fungsi untuk menghasilkan angka acak integer dalam rentang tertentu
                i.randomInt = function(t, i) { return Math.floor(t + Math.random() * (i + 1 - t)); };
                // Fungsi untuk menghitung jarak antara dua titik
                i.getDistance = function(t, i, s, e) {
                    var h = Math.pow;
                    return Math.sqrt(h(t - s, 2) + h(i - e, 2)); // Rumus jarak Euclidean
                };
                // Fungsi untuk menghasilkan nilai warna HSLA
                i.hsla = function(t, i) {
                    var s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                    return "hsla(".concat(t, ", 100%, ").concat(i, "%, ").concat(s, ")");
                };
            },
            449: (t, i, s) => {
                var e = this && this.__awaiter || function(t, i, s, e) {
                    return new(s || (s = Promise))((function(h, n) {
                        function o(t) {
                            try { r(e.next(t)); } catch (t) { n(t); }
                        }
                        function a(t) {
                            try { r(e.throw(t)); } catch (t) { n(t); }
                        }
                        function r(t) {
                            var i;
                            t.done ? h(t.value) : (i = t.value, i instanceof s ? i : new s((function(t) { t(i); }))).then(o, a);
                        }
                        r((e = e.apply(t, i || [])).next());
                    }));
                };
                Object.defineProperty(i, "__esModule", { value: !0 });
                i.Sound = void 0;
                var h = s(909);
                
                // Kelas Sound untuk menangani pemutaran suara
                i.Sound = class {
                    constructor(t) {
                        this._buffer = [], this.onInit = !0, this._audioContext = new(window.AudioContext || window.webkitAudioContext), this.options = Object.assign({ enabled: !0, files: ["explosion0.mp3", "explosion1.mp3", "explosion2.mp3"], volume: { min: 4, max: 8 } }, t), this.init();
                    }

                    init() {
                        this.onInit && this.options.enabled && (this.onInit = !1, this.load()); // Inisialisasi hanya jika suara diaktifkan
                    }

                    // Memuat file audio ke dalam buffer
                    load() {
                        return e(this, void 0, void 0, (function* () {
                            for (var t of this.options.files) {
                                var i = yield (yield fetch(t)).arrayBuffer();
                                this._audioContext.decodeAudioData(i).then((t => { this._buffer.push(t); })).catch((t => { throw t; }));
                            }
                        }));
                    }

                    // Memutar suara ledakan
                    play() {
                        if (this.options.enabled && this._buffer.length) {
                            var t = this._audioContext.createBufferSource(),
                                i = this._buffer[(0, h.randomInt)(0, this._buffer.length - 1)], // Pilih file audio acak
                                s = this._audioContext.createGain();
                            t.buffer = i;
                            s.gain.value = (0, h.randomFloat)(this.options.volume.min / 100, this.options.volume.max / 100); // Set volume acak
                            s.connect(this._audioContext.destination);
                            t.connect(s);
                            t.start(0); // Mulai memutar audio
                        } else this.init(); // Jika audio belum dimuat, muat terlebih dahulu
                    }
                };
            },
            668: (t, i, s) => {
                Object.defineProperty(i, "__esModule", { value: !0 });
                i.Trace = void 0;
                var e = s(909);
                
                // Kelas Trace untuk menggambar jejak roket
                i.Trace = class {
                    constructor(t) {
                        var { x: i, y: s, dx: h, dy: n, ctx: o, hue: a, speed: r, traceLength: c, acceleration: _ } = t;
                        for (this._coordinates = [], this._currentDistance = 0, this._x = i, this._y = s, this._sx = i, this._sy = s, this._dx = h, this._dy = n, this._ctx = o, this._hue = a, this._speed = r, this._traceLength = c, this._acceleration = _, this._totalDistance = (0, e.getDistance)(i, s, h, n); this._traceLength--;) {
                            this._coordinates.push([i, s]);
                        }
                        this._angle = Math.atan2(n - s, h - i); // Menghitung sudut dari arah gerakan
                        this._brightness = (0, e.randomInt)(50, 70); // Kecerahan acak untuk jejak
                    }

                    // Update posisi jejak
                    update(t) {
                        this._coordinates.pop();
                        this._coordinates.unshift([this._x, this._y]); // Memindahkan koordinat ke posisi terbaru
                        this._speed *= this._acceleration; // Mengurangi kecepatan dengan faktor percepatan
                        var i = Math.cos(this._angle) * this._speed,
                            s = Math.sin(this._angle) * this._speed;
                        this._currentDistance = (0, e.getDistance)(this._sx, this._sy, this._x + i, this._y + s);
                        if (this._currentDistance >= this._totalDistance) t(this._dx, this._dy, this._hue); // Jika sudah mencapai jarak total, lakukan ledakan
                        else {
                            this._x += i;
                            this._y += s; // Perbarui posisi X dan Y
                        }
                    }

                    // Menggambar jejak roket
                    draw() {
                        var t = this._coordinates.length - 1;
                        this._ctx.beginPath();
                        this._ctx.moveTo(this._coordinates[t][0], this._coordinates[t][1]);
                        this._ctx.lineTo(this._x, this._y); // Gambar garis jejak dari posisi sebelumnya
                        this._ctx.strokeStyle = (0, e.hsla)(this._hue, this._brightness);
                        this._ctx.stroke(); // Gambar garis jejak
                    }
                };
            }
        };

        var i = {};
        function s(e) {
            var h = i[e];
            if (void 0 !== h) return h.exports;
            var n = i[e] = { exports: {} };
            return t[e].call(n.exports, n, n.exports, s), n.exports;
        }

        var e = {};
        return (() => {
            var t = e;
            Object.defineProperty(t, "__esModule", { value: !0 });
            t.Fireworks = void 0;
            var i = s(668),
                h = s(449),
                n = s(511),
                o = s(909);
                
            // Kelas utama Fireworks untuk mengendalikan keseluruhan animasi kembang api
            t.Fireworks = class {
                constructor(t) {
                    var { autoresize: i = !0, boundaries: s, brightness: e, delay: n, hue: o, mouse: a, sound: r, trace: c = 3, speed: _ = 10, explosion: d = 5, gravity: u = 1.5, opacity: l = .5, particles: p = 60, friction: x = .97, rocketsPoint: m = 50, acceleration: v = 1.05 } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    this._tick = 0;
                    this._version = "1.3.5";
                    this._running = !1;
                    this._randomRocketsPoint = !1;
                    this._experimentals = !1;
                    this._m = !1;
                    this._container = t;
                    this._canvas = document.createElement("canvas");
                    this._ctx = this._canvas.getContext("2d");
                    this._container.appendChild(this._canvas);
                    this._sound = new h.Sound(r);
                    this.setSize();
                    this.setBoundaries(Object.assign({ visible: !1, x: 50, y: 50 }, s));
                    this.autoresize = i;
                    this.trace = c;
                    this.speed = _;
                    this.explosion = d;
                    this.gravity = u;
                    this.intensity = 60;
                    this.opacity = l;
                    this.particles = p;
                    this.friction = x;
                    this.rocketsPoint = m;
                    this.acceleration = v;
                    this.hue = Object.assign({ min: 0, max: 360 }, o);
                    this.mouse = Object.assign({ click: !1, move: !1, max: 1 }, a);
                    this.delay = Object.assign({ min: 30, max: 60 }, n);
                    this.brightness = Object.assign({ min: 50, max: 80, decay: { min: .015, max: .03 } }, e);
                    this.autoresize && window.addEventListener("resize", (() => this.windowResize()));
                    this._canvas.addEventListener("mousedown", (t => this.mouseDown(t)));
                    this._canvas.addEventListener("mouseup", (t => this.mouseUp(t)));
                    this._canvas.addEventListener("mousemove", (t => this.mouseMove(t)));
                }

                // Properti untuk memulai dan menghentikan animasi
                get isRunning() {
                    return this._running;
                }

                get version() {
                    return this._version;
                }

                start() {
                    this._running || (this._running = !0, this.clear(), this.render()); // Mulai animasi jika belum berjalan
                }

                stop() {
                    this._running && (this._running = !1, this.clear()); // Hentikan animasi
                }

                unmount() {
                    window.removeEventListener("resize", this.windowResize); // Hapus event listener ketika unmount
                    this._canvas.removeEventListener("mousedown", this.mouseDown);
                    this._canvas.removeEventListener("mouseup", this.mouseUp);
                    this._canvas.removeEventListener("mousemove", this.mouseMove);
                }

                pause() {
                    this._running = !this._running; // Pause atau resume animasi
                }

                clear() {
                    this._ctx && (this._traces = [], this._explosions = [], this._ctx.clearRect(0, 0, this._width, this._height)); // Bersihkan canvas
                }

                setOptions(t) {
                    for (var [i, s] of Object.entries(t)) {
                        var e = Object.prototype.hasOwnProperty.call(this, i);
                        if ("function" == typeof this[i]) throw new Error("You cannot change the methods of the class!");
                        e && ("object" == typeof this[i] ? Object.assign(this[i], s) : this[i] = s), "sound" === i && Object.assign(this._sound.options, s);
                    }
                }

                setSize() {
                    var { width: t = this._container.clientWidth, height: i = this._container.clientHeight } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this._width = t;
                    this._height = i;
                    this._canvas.width = t;
                    this._canvas.height = i;
                    this.setBoundaries({ width: t, height: i });
                }

                setBoundaries(t) {
                    this.boundaries = Object.assign(Object.assign({}, this.boundaries), t);
                }

                useMouse(t, i) {
                    (this.mouse.click || this.mouse.move) && (this._mx = t.pageX - this._canvas.offsetLeft, this._my = t.pageY - this._canvas.offsetTop, this._m = i);
                }

                windowResize() {
                    this.setSize(); // Perbarui ukuran canvas saat window diresize
                }

                mouseDown(t) {
                    this.useMouse(t, this.mouse.click); // Deteksi mouse down
                }

                mouseUp(t) {
                    this.useMouse(t, !1); // Deteksi mouse up
                }

                mouseMove(t) {
                    this.useMouse(t, this._m); // Deteksi gerakan mouse
                }

                render() {
                    // Render animasi kembang api
                    this._ctx && this._running && (requestAnimationFrame(() => this.render()), this._ctx.globalCompositeOperation = "destination-out", this._ctx.fillStyle = "rgba(0, 0, 0, ".concat(this.opacity, ")"), this._ctx.fillRect(0, 0, this._width, this._height), this._ctx.globalCompositeOperation = "lighter", this.drawBoundaries(), this.initTrace(), this.drawTrace(), this.drawExplosion(), this._tick++);
                }

                drawBoundaries() {
                    // Gambar batas jika visible
                    this.boundaries.visible && (this._ctx.beginPath(), this._ctx.strokeStyle = "red", this._ctx.rect(this.boundaries.x, this.boundaries.y, this.boundaries.width - 2 * this.boundaries.x, .5 * this.boundaries.height), this._ctx.stroke());
                }

                initTrace() {
                    // Inisialisasi jejak roket jika waktunya tepat
                    this._ds = (0, o.randomInt)(this.delay.min, this.delay.max);
                    (2 * this._ds < this._tick || this._m && this.mouse.max > this._traces.length) && (this._traces.push(new i.Trace({
                        x: this._width * (this._randomRocketsPoint ? (0, o.randomInt)(0, 100) : this.rocketsPoint) / 100,
                        y: this._height,
                        dx: this._mx && this.mouse.move || this._m ? this._mx : (0, o.randomInt)(this.boundaries.x, this.boundaries.width - 2 * this.boundaries.x),
                        dy: this._my && this.mouse.move || this._m ? this._my : (0, o.randomInt)(this.boundaries.y, .5 * this.boundaries.height),
                        ctx: this._ctx,
                        hue: (0, o.randomInt)(this.hue.min, this.hue.max),
                        speed: this.speed,
                        acceleration: this.acceleration,
                        traceLength: this.trace
                    })), this._tick = 0);
                }

                drawTrace() {
                    // Gambar dan update jejak-jejak roket
                    for (var t = this._traces.length; t--;) {
                        this._traces[t].draw();
                        this._traces[t].update((i, s, e) => {
                            this.initExplosion(i, s, e); // Inisialisasi ledakan setelah jejak roket selesai
                            this._sound.play(); // Mainkan suara
                            this._traces.splice(t, 1); // Hapus jejak setelah ledakan
                        });
                    }
                }

                initExplosion(t, i, s) {
                    // Membuat ledakan setelah jejak roket selesai
                    for (var e = this.particles; e--;) {
                        this._explosions.push(new n.Explosion({
                            x: t,
                            y: i,
                            ctx: this._ctx,
                            hue: s,
                            friction: this.friction,
                            gravity: this.gravity,
                            explosionLength: this.explosion,
                            brightness: this.brightness,
                            exp: this._experimentals
                        }));
                    }
                }

                drawExplosion() {
                    // Gambar dan update ledakan-ledakan kembang api
                    for (var t = this._explosions.length; t--;) {
                        this._explosions[t].draw();
                        this._explosions[t].update(() => { this._explosions.splice(t, 1); });
                    }
                }
            };
        })(), e;
    })();
}));
