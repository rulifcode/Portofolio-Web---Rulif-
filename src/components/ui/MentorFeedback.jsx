import { useState, useEffect, useRef, useCallback } from "react";
import photoMentor from "../../assets/photomentor.jpg";

const feedbacks = [
  {
    id: 1,
    label: "Milestone — HTML, CSS & JavaScript",
    quote: `Project yang dibuat menunjukkan kualitas yang sangat tinggi baik dari sisi teknis maupun tampilan visual. Struktur HTML sudah sangat rapi, semantik, dan terorganisir dengan baik. Penggunaan elemen seperti nav, header, main, section, article, dan footer diterapkan secara konsisten, sehingga alur konten mudah dipahami baik oleh pengguna maupun mesin pencari. Implementasi atribut aksesibilitas seperti role, aria-label, dan aria-hidden juga menjadi nilai tambah besar karena menunjukkan perhatian terhadap aspek usability dan inclusive design.

Dari sisi JavaScript, implementasi pengambilan data API, filtering, searching, pagination berbasis limit, serta manajemen modal sudah sangat solid. Logika filter yang menggabungkan pencarian, kategori, dan tingkat kesulitan disusun dengan rapi dan efisien. Pengelolaan event juga sangat baik, termasuk penggunaan event pada input, dropdown, tombol reset, serta shortcut keyboard untuk menutup modal. Struktur kode terorganisir, mudah dibaca, dan mencerminkan pemahaman yang matang terhadap alur data dan interaksi antarkomponen.

Pada aspek UI dan UX, project ini menonjol secara signifikan. Penggunaan konsep parallax, hero section, grid layout, modal interaktif, serta animasi transisi memberikan kesan modern dan profesional. Pemilihan warna, tipografi, spacing, serta konsistensi desain menunjukkan perhatian tinggi terhadap detail visual. Tampilan juga responsif di berbagai ukuran layar, dengan pengaturan breakpoint yang rapi dan adaptif, sehingga pengalaman pengguna tetap optimal di desktop maupun mobile.

Beberapa pengembangan lanjutan yang dapat dipertimbangkan adalah penambahan fitur pagination dinamis berbasis halaman, lazy loading gambar untuk optimasi performa, serta pemisahan kode JavaScript menjadi modul agar struktur project lebih scalable. Namun secara keseluruhan, kualitas project ini sudah sangat matang dan jauh melampaui ekspektasi milestone dasar.`,
  },
  {
    id: 2,
    label: "Milestone — React & State Management",
    quote: `Rulif menunjukkan implementasi teknis yang solid, terutama dalam mengintegrasikan fitur-fitur lanjutan pada ekosistem React. Penggunaan Redux Toolkit dengan createAsyncThunk untuk mengelola data dari API JSONPlaceholder dijalankan dengan sangat baik, memastikan sinkronisasi data antara server dan UI berjalan mulus. Rulif juga telah menerapkan Unit Testing menggunakan Jest dan React Testing Library, yang mencakup pengujian fungsionalitas komponen serta Snapshot Testing untuk menjaga integritas visual aplikasi. Pengujian End-to-End (E2E) menggunakan Cypress juga telah dikonfigurasi dan dijalankan untuk memverifikasi alur aplikasi secara menyeluruh, sebagaimana ditunjukkan dalam demonstrasi videonya.

Dalam aspek efisiensi, Rulif menunjukkan pemahaman yang baik mengenai Optimasi Performa. Ia menerapkan teknik memoization menggunakan React.memo dan useCallback untuk mencegah re-render yang tidak diperlukan pada komponen-komponen yang sering berubah. Penerapan Lazy Loading juga terlihat pada komponen-komponen tertentu, yang membantu mempercepat waktu muat awal aplikasi. Selain itu, aplikasi ini sudah dikonversi menjadi Progressive Web App (PWA) dengan konfigurasi Service Worker dan manifest yang memadai, sehingga memungkinkan aplikasi untuk diinstal dan memiliki kemampuan dasar untuk diakses secara offline.

Secara visual, desain tetap konsisten dengan referensi Figma dan memiliki responsivitas yang baik. Video penjelasan yang diberikan sangat membantu dalam memahami alur logika dan pembuktian hasil pengujian yang telah dilakukan. Namun, absennya link live deployment menjadi catatan karena fungsionalitas aplikasi di lingkungan produksi tidak dapat diuji secara langsung oleh pengguna luar.`,
  },
  {
    id: 3,
    label: "Milestone — Redux & Advanced React",
    quote: `Halo Rulif! Selamat atas pengerjaan proyek yang sangat berkualitas ini. Saya sangat mengapresiasi caramu menjelaskan alur Redux-Thunk dalam video dokumentasi—penjelasanmu sangat sistematis dan menunjukkan bahwa kamu benar-benar memahami bagaimana data mengalir dari API menuju Store hingga ke UI.

Satu saran kecil untuk menyempurnakan portofolio ini: kamu bisa menambahkan Toast Notification (seperti menggunakan library react-toastify) untuk memberikan umpan balik instan saat tugas berhasil ditambah atau dihapus. Hal ini akan memberikan kesan aplikasi yang lebih 'premium'. Secara teknis, kemampuanmu dalam mengelola global state sudah sangat baik. Terus pertahankan standar kodingmu yang rapi ini, Rulif!`,
  },
  {
    id: 4,
    label: "Evaluasi Tim — Final Project (Tim Ubuntu)",
    quote: `Kelompok Ubuntu berhasil menunjukkan standar kerja yang mendekati level industri melalui koordinasi tim yang sangat rapi dan dokumentasi yang komprehensif. Sebagai ketua dan integrator utama, Rulif Fadria Nirwansyah tampil sebagai tulang punggung tim yang luar biasa. Kemampuannya dalam menangani seluruh alur autentikasi, proteksi route, hingga melakukan mitigasi teknis terhadap bug backend menunjukkan kematangan logika pemrogaman yang sangat tinggi. Rulif tidak hanya memastikan aplikasi berjalan, tapi juga menjaga kualitas kode melalui refactoring dan debugging final yang membuat aplikasi ini sangat stabil saat dideploy.

Kontribusi M. Rizqi Hidayatullah juga sangat krusial dalam membangun ekosistem admin (CMS). Keberhasilannya melakukan slicing UI untuk manajemen produk, stok, dan rating, serta mengintegrasikan modul pesanan, memberikan fondasi yang kuat bagi fungsionalitas operasional aplikasi. Sementara itu, Hanif Nabila menunjukkan performa yang solid dalam mengelola fitur kategori dan promosi. Logika publish/unpublish serta manajemen diskon yang ia bangun berhasil memperkaya fitur marketing platform ini, memastikan seluruh data dinamis dari API tertampil dengan akurat. Di sisi antarmuka, Matthew Florentino berhasil menghidupkan estetika aplikasi dengan desain yang responsif dan detail UX yang baik, seperti implementasi toast notification, carousel, hingga optimasi SEO yang seringkali terlupakan oleh pengembang lain.

Poin paling impresif dari tim ini adalah inisiatif mereka dalam menyusun laporan teknis mengenai kekurangan backend. Hal ini membuktikan bahwa mereka bekerja dengan integritas dan transparansi. Meskipun terdapat banyak kendala di sisi API, tim Ubuntu tetap mampu menyajikan solusi end-to-end yang fungsional bagi pengguna akhir. Kolaborasi mereka adalah contoh nyata dari tim yang mampu beradaptasi dengan cepat terhadap masalah teknis tanpa menurunkan standar kualitas output mereka.`,
  },
];

export default function MentorFeedback({ dark }) {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
  const timerRef = useRef(null);

  const goTo = useCallback(
    (index, dir = "next") => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setActive(index);
        setAnimating(false);
      }, 350);
    },
    [animating]
  );

  const next = useCallback(() => {
    goTo((active + 1) % feedbacks.length, "next");
  }, [active, goTo]);

  const prev = useCallback(() => {
    goTo((active - 1 + feedbacks.length) % feedbacks.length, "prev");
  }, [active, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(next, 8000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 8000);
  };

  const handleDot = (i) => {
    if (i === active) return;
    goTo(i, i > active ? "next" : "prev");
    resetTimer();
  };

  const handlePrev = () => { prev(); resetTimer(); };
  const handleNext = () => { next(); resetTimer(); };

  const slideStyle = {
    opacity: animating ? 0 : 1,
    transform: animating
      ? `translateY(${direction === "next" ? "12px" : "-12px"})`
      : "translateY(0)",
    transition: "opacity 0.35s ease, transform 0.35s ease",
  };

  // ── Token warna — semua inline style, tidak bergantung Tailwind scan ──
  const t = {
    high:    dark ? "rgba(255,255,255,0.90)" : "rgba(0,0,0,0.88)",
    mid:     dark ? "rgba(255,255,255,0.60)" : "rgba(0,0,0,0.68)",
    low:     dark ? "rgba(255,255,255,0.40)" : "rgba(0,0,0,0.50)",
    muted:   dark ? "rgba(255,255,255,0.30)" : "rgba(0,0,0,0.38)",
    dimmed:  dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.32)",
    faint:   dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.42)",
    border:  dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)",
    cardBg:  dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
    badgeBg: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
    divider: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
    ring:    dark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)",
    ringAvatar: dark ? "#000" : "#fff",
    dotActive:   dark ? "rgba(255,255,255,0.60)" : "rgba(0,0,0,0.50)",
    dotInactive: dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)",
    btnBorder:   dark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)",
    btnBg:       dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
    btnText:     dark ? "rgba(255,255,255,0.40)" : "rgba(0,0,0,0.40)",
    accentLine:  dark ? "rgba(255,255,255,0.20)" : "rgba(0,0,0,0.10)",
    scrollThumb:      dark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)",
    scrollThumbHover: dark ? "rgba(255,255,255,0.20)" : "rgba(0,0,0,0.18)",
  };

  return (
    <section className="w-full py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-14">

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div
              className="h-px flex-1"
              style={{ background: `linear-gradient(to right, transparent, ${t.ring}, transparent)` }}
            />
            <span
              className="text-[10px] tracking-widest uppercase font-medium"
              style={{ color: t.muted }}
            >
              Lumoshive Academy
            </span>
            <div
              className="h-px flex-1"
              style={{ background: `linear-gradient(to right, transparent, ${t.ring}, transparent)` }}
            />
          </div>
          <h2
            className="text-4xl font-bold text-center"
            style={{ color: t.high }}
          >
            Mentor Feedback
          </h2>
          <p
            className="text-center text-sm max-w-md mx-auto"
            style={{ color: t.low }}
          >
            Penilaian langsung dari tutor bootcamp terhadap hasil project yang dikerjakan.
          </p>
        </div>

        {/* Card */}
        <div
          className="relative rounded-2xl backdrop-blur-sm overflow-hidden"
          style={{ border: `1px solid ${t.border}`, background: t.cardBg }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(to right, transparent, ${t.accentLine}, transparent)` }}
          />

          {/* Glow blob */}
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)" }}
          />

          <div className="p-8 sm:p-12 space-y-8">

            {/* Mentor identity */}
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <div
                  className="w-12 h-12 rounded-full overflow-hidden"
                  style={{ outline: `1px solid ${t.ring}` }}
                >
                  <img
                    src={photoMentor}
                    alt="Idaz Anggara"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400"
                  style={{ outline: `2px solid ${t.ringAvatar}` }}
                />
              </div>
              <div>
                <p
                  className="text-sm font-semibold tracking-wide"
                  style={{ color: t.high }}
                >
                  Idaz Anggara
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: t.faint }}
                >
                  Software Engineering Tutor · JavaScript & Engineering Fundamentals
                </p>
              </div>

              {/* Label badge */}
              <div
                className="ml-auto hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] tracking-wide"
                style={{
                  border: `1px solid ${t.border}`,
                  background: t.badgeBg,
                  color: t.faint,
                  ...slideStyle,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400/70" />
                {feedbacks[active].label}
              </div>
            </div>

            {/* Mobile label */}
            <div
              className="sm:hidden flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] tracking-wide w-fit"
              style={{
                border: `1px solid ${t.border}`,
                background: t.badgeBg,
                color: t.faint,
                ...slideStyle,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400/70" />
              {feedbacks[active].label}
            </div>

            {/* Opening quote mark */}
            <svg
              width="32" height="24" viewBox="0 0 32 24" fill="none"
              style={{ color: dark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)" }}
            >
              <path
                d="M0 24V14.4C0 6.4 4.8 1.6 14.4 0l1.6 2.4C10.4 3.6 7.6 6 6.4 9.6H12V24H0Zm16 0V14.4C16 6.4 20.8 1.6 30.4 0L32 2.4C26.4 3.6 23.6 6 22.4 9.6H28V24H16Z"
                fill="currentColor"
              />
            </svg>

            {/* Scrollable quote */}
            <div
              className="max-h-64 overflow-y-auto pr-2 space-y-4 mentor-scroll"
              style={slideStyle}
            >
              {feedbacks[active].quote.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="text-sm sm:text-[15px] leading-relaxed"
                  style={{ color: t.mid }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px" style={{ background: t.divider }} />

            {/* Controls */}
            <div className="flex items-center justify-between">

              {/* Dots */}
              <div className="flex items-center gap-2">
                {feedbacks.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleDot(i)}
                    aria-label={`Slide ${i + 1}`}
                    className="transition-all duration-300"
                    style={{
                      width: i === active ? "24px" : "6px",
                      height: "6px",
                      borderRadius: "3px",
                      background: i === active ? t.dotActive : t.dotInactive,
                    }}
                  />
                ))}
              </div>

              {/* Counter + Arrows */}
              <div className="flex items-center gap-3">
                <span
                  className="text-xs tabular-nums"
                  style={{ color: t.dimmed }}
                >
                  {String(active + 1).padStart(2, "0")} / {String(feedbacks.length).padStart(2, "0")}
                </span>
                <div className="flex gap-2">
                  {[handlePrev, handleNext].map((handler, idx) => (
                    <button
                      key={idx}
                      onClick={handler}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                      style={{
                        border: `1px solid ${t.btnBorder}`,
                        background: t.btnBg,
                        color: t.btnText,
                      }}
                      aria-label={idx === 0 ? "Previous" : "Next"}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        {idx === 0
                          ? <path d="M19 12H5M12 5l-7 7 7 7" />
                          : <path d="M5 12h14M12 5l7 7-7 7" />
                        }
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        .mentor-scroll::-webkit-scrollbar { width: 3px; }
        .mentor-scroll::-webkit-scrollbar-track { background: transparent; }
        .mentor-scroll::-webkit-scrollbar-thumb {
          background: ${t.scrollThumb};
          border-radius: 99px;
        }
        .mentor-scroll::-webkit-scrollbar-thumb:hover {
          background: ${t.scrollThumbHover};
        }
      `}</style>
    </section>
  );
}