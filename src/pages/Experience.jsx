import { useState, useEffect, useRef, useContext } from "react";
import { LangContext } from "../components/layout/Navbar"; 

// ── Logo Icons ────────────────────────────────────────────────────────────────
import logoCakrawala from "../assets/cgy2.png";
import logoGaotek    from "../assets/GAOTek.png";
import logoVodjo     from "../assets/vodjo.webp";
import logoLumoshive from "../assets/lumoshive.png";

// ── Slider Images — Cakrawala ─────────────────────────────────────────────────
import imgCakrawala1 from "../assets/cgy3.webp";
import imgCakrawala2 from "../assets/graduation.jpeg";
import imgCakrawala3 from "../assets/smk.webp";

// ── Slider Images — Gaotek ───────────────────────────────────────────────────
import imgGaotek1 from "../assets/gaotek1.png";
import imgGaotek2 from "../assets/gaotek2.png";

// ── Slider Images — Vodjo ────────────────────────────────────────────────────
import imgVodjo1 from "../assets/vodjo2.jpg";
import imgVodjo2 from "../assets/vodjo3.jpg";
import imgVodjo3 from "../assets/vodjo1.jpeg";

// ── Slider Images — Lumoshive ────────────────────────────────────────────────
import imgLumoshive1 from "../assets/transkripnilai.png";
import imgLumoshive2 from "../assets/lumos1.jpeg";
import imgLumoshive3 from "../assets/lumos2.jpeg";

/* ─── Static per-experience data (tidak diterjemahkan) ──────────────────────── */
const EXP_STATIC = [
  {
    id: 1,
    key: "cakrawala",
    company: "PT. Cakrawala Global Yaksa",
    location: "Bandung, Indonesia",
    period: "Jul 2022 – Dec 2022",
    duration: { EN: "6 months", ID: "6 bulan" },
    type: { EN: "Internship · On-site", ID: "Magang · Luring" },
    accent: "#7dab8f",
    logo: logoCakrawala,
    images: [imgCakrawala1, imgCakrawala2, imgCakrawala3],
    stack: ["CodeIgniter", "Laravel", "MySQL", "cPanel"],
  },
  {
    id: 2,
    key: "gaotek",
    company: "Gaotek Inc",
    location: "New York, USA · Remote",
    period: "Oct 2025 – Dec 2025",
    duration: { EN: "3 months", ID: "3 bulan" },
    type: { EN: "Internship · Remote", ID: "Magang · Daring" },
    accent: "#6fa3c0",
    logo: logoGaotek,
    images: [imgGaotek1, imgGaotek2],
    stack: ["WordPress", "WooCommerce", "SEO", "XAMPP"],
  },
  {
    id: 3,
    key: "vodjo",
    company: "Vodjo",
    location: "Bandung, Indonesia · Hybrid",
    period: "Sep 2025 – Present",
    duration: { EN: "Ongoing", ID: "Berlanjut" },
    type: { EN: "Internship · Hybrid", ID: "Magang · Hybrid" },
    accent: "#c08a82",
    logo: logoVodjo,
    images: [imgVodjo1, imgVodjo2, imgVodjo3],
    stack: ["Postman", "API Testing", "QA Docs", "Bug Tracking"],
  },
  {
    id: 4,
    key: "lumoshive",
    company: "Lumoshive Academy",
    location: "Jakarta, Indonesia",
    period: "Dec 2025 – Mar 2026",
    duration: { EN: "4 months", ID: "4 bulan" },
    type: { EN: "Bootcamp Batch 3", ID: "Bootcamp Batch 3" },
    accent: "#9b87c2",
    logo: logoLumoshive,
    images: [imgLumoshive1, imgLumoshive2, imgLumoshive3],
    stack: ["React.js", "TypeScript", "Redux", "Tailwind CSS", "Axios", "Golang", "Jest", "Git"],
  },
];

/* ─── Translations ───────────────────────────────────────────────────────────── */
const T = {
  EN: {
    tagline: "Career Journey",
    title: "Experience",
    project: "Project",
    data: {
      cakrawala: {
        role: "Praktek Lapangan Kerja",
        project: "Penggajian Karyawan App",
        bullets: [
          "Studied and applied CodeIgniter and Laravel frameworks with MySQL database management for 6 months.",
          "Applied Object-Oriented Programming (OOP) concepts and designed database structures for payroll system requirements.",
          "Deployed applications to the server using cPanel and managed domains, file structures, and hosting configurations.",
          "Tested and debugged the system during the development process.",
          "Prepared basic technical documentation for end-users and system administrators.",
        ],
      },
      gaotek: {
        role: "Web Developer",
        project: null,
        bullets: [
          "Developed and managed websites and online stores using WordPress and WooCommerce, including custom themes, plugin management, product setup, payment integration, and content management.",
          "Implemented basic SEO practices and handled deployment tasks using XAMPP for local development.",
        ],
      },
      vodjo: {
        role: "Software Quality Assurance",
        project: null,
        bullets: [
          "Assisted in gathering, documenting, and updating client feedback for continuous improvement.",
          "Conducted functional and API testing using Postman to ensure software quality.",
          "Collaborated closely with developers to identify, report, and resolve bugs in a timely manner.",
          "Maintained clear communication with clients and team members regarding project updates and test results.",
          "Recorded and tracked testing results and feedback to support reporting and QA documentation.",
        ],
      },
      lumoshive: {
        role: "Frontend Developer Trainee",
        project: null,
        bullets: [
          "Developed responsive web applications using component-based architecture with React.js.",
          "Built reusable and modular UI components following clean code principles.",
          "Managed application state and lifecycle using React Hooks and Redux.",
          "Integrated RESTful APIs using Fetch API and Axios for dynamic data handling.",
          "Implemented client-side routing and optimized application performance.",
          "Utilized Tailwind CSS to create modern, responsive, and user-friendly interfaces.",
          "Applied TypeScript to improve code quality, scalability, and maintainability.",
          "Performed testing using Unit Testing, Integration Testing, and End-to-End Testing.",
          "Collaborated using Git and GitHub in team-based development workflows.",
          "Worked with backend (Golang) team to develop an e-commerce application.",
          "Translated UI/UX designs into responsive web interfaces (slicing design into code).",
          "Implemented mock data and API integrations for application prototyping.",
          "Participated in live coding sessions to strengthen debugging and problem-solving skills.",
        ],
      },
    },
  },
  ID: {
    tagline: "Perjalanan Karier",
    title: "Pengalaman",
    project: "Proyek",
    data: {
      cakrawala: {
        role: "Praktek Lapangan Kerja",
        project: "Aplikasi Penggajian Karyawan",
        bullets: [
          "Mempelajari dan menerapkan framework CodeIgniter dan Laravel dengan manajemen database MySQL selama 6 bulan.",
          "Menerapkan konsep Object-Oriented Programming (OOP) dan merancang struktur database untuk kebutuhan sistem penggajian.",
          "Men-deploy aplikasi ke server menggunakan cPanel serta mengelola domain, struktur file, dan konfigurasi hosting.",
          "Melakukan pengujian dan debugging sistem selama proses pengembangan.",
          "Menyiapkan dokumentasi teknis dasar untuk pengguna akhir dan administrator sistem.",
        ],
      },
      gaotek: {
        role: "Web Developer",
        project: null,
        bullets: [
          "Mengembangkan dan mengelola website serta toko online menggunakan WordPress dan WooCommerce, termasuk tema kustom, manajemen plugin, pengaturan produk, integrasi pembayaran, dan manajemen konten.",
          "Menerapkan praktik SEO dasar dan menangani tugas deployment menggunakan XAMPP untuk pengembangan lokal.",
        ],
      },
      vodjo: {
        role: "Software Quality Assurance",
        project: null,
        bullets: [
          "Membantu pengumpulan, pendokumentasian, dan pembaruan masukan klien untuk perbaikan berkelanjutan.",
          "Melakukan pengujian fungsional dan API menggunakan Postman untuk memastikan kualitas perangkat lunak.",
          "Berkolaborasi dengan developer untuk mengidentifikasi, melaporkan, dan menyelesaikan bug secara tepat waktu.",
          "Menjaga komunikasi yang jelas dengan klien dan anggota tim terkait pembaruan proyek dan hasil pengujian.",
          "Mencatat dan melacak hasil pengujian serta masukan untuk mendukung pelaporan dan dokumentasi QA.",
        ],
      },
      lumoshive: {
        role: "Frontend Developer Trainee",
        project: null,
        bullets: [
          "Mengembangkan aplikasi web responsif menggunakan arsitektur berbasis komponen dengan React.js.",
          "Membangun komponen UI yang dapat digunakan ulang dan modular sesuai prinsip clean code.",
          "Mengelola state dan lifecycle aplikasi menggunakan React Hooks dan Redux.",
          "Mengintegrasikan RESTful API menggunakan Fetch API dan Axios untuk penanganan data dinamis.",
          "Mengimplementasikan client-side routing dan mengoptimalkan performa aplikasi.",
          "Menggunakan Tailwind CSS untuk membuat antarmuka yang modern, responsif, dan ramah pengguna.",
          "Menerapkan TypeScript untuk meningkatkan kualitas kode, skalabilitas, dan kemudahan pemeliharaan.",
          "Melakukan pengujian menggunakan Unit Testing, Integration Testing, dan End-to-End Testing.",
          "Berkolaborasi menggunakan Git dan GitHub dalam alur kerja pengembangan tim.",
          "Bekerja sama dengan tim backend (Golang) untuk mengembangkan aplikasi e-commerce.",
          "Menerjemahkan desain UI/UX menjadi antarmuka web responsif (slicing desain ke kode).",
          "Mengimplementasikan mock data dan integrasi API untuk prototyping aplikasi.",
          "Berpartisipasi dalam sesi live coding untuk memperkuat kemampuan debugging dan pemecahan masalah.",
        ],
      },
    },
  },
};

/* ─── Intersection observer hook ───────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

/* ─── Lightbox ───────────────────────────────────────────────────────────────── */
function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);
  const [portrait, setPortrait] = useState(null);

  useEffect(() => { setPortrait(null); }, [current]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent(c => (c + 1) % images.length);
      if (e.key === "ArrowLeft")  setCurrent(c => (c - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, []);

  const handleLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    setPortrait(naturalHeight > naturalWidth);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center animate-[lbIn_0.2s_ease]"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
    >
      <style>{`@keyframes lbIn { from { opacity:0; transform:scale(0.96) } to { opacity:1; transform:scale(1) } }`}</style>

      <button
        onClick={onClose}
        title="Tutup (Esc)"
        className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full flex items-center justify-center text-white text-2xl leading-none border border-white/30 bg-white/10 hover:bg-white/20 hover:border-white/50 transition-all duration-200"
      >
        ×
      </button>

      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); setCurrent(c => (c - 1 + images.length) % images.length); }}
          className="absolute left-5 w-12 h-12 rounded-full flex items-center justify-center text-white border border-white/25 bg-white/10 hover:bg-white/20 transition-all duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
            <path d="M6.5 2L3.5 5L6.5 8" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); setCurrent(c => (c + 1) % images.length); }}
          className="absolute right-5 w-12 h-12 rounded-full flex items-center justify-center text-white border border-white/25 bg-white/10 hover:bg-white/20 transition-all duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
            <path d="M3.5 2L6.5 5L3.5 8" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      <img
        key={current}
        src={images[current]}
        alt={`zoom-${current}`}
        onLoad={handleLoad}
        onClick={(e) => e.stopPropagation()}
        className={[
          "rounded-2xl object-contain select-none pointer-events-none transition-opacity duration-200",
          portrait === null
            ? "max-w-[88vw] max-h-[90vh] w-auto h-auto"
            : portrait
            ? "h-[90vh] w-auto max-w-[88vw]"
            : "w-[88vw] h-auto max-h-[90vh]",
        ].join(" ")}
        style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.7)" }}
      />

      {images.length > 1 && (
        <div className="absolute bottom-13 text-white/55 text-xs bg-black/45 px-3.5 py-1 rounded-full">
          {current + 1} / {images.length}
        </div>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-5 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
              className="h-1.5 rounded-full border-none p-0 cursor-pointer transition-all duration-300"
              style={{
                width: i === current ? "20px" : "6px",
                background: i === current ? "white" : "rgba(255,255,255,0.35)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Image Slider ───────────────────────────────────────────────────────────── */
function ImageSlider({ images, accent }) {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = (e) => { e.stopPropagation(); setCurrent(c => (c - 1 + images.length) % images.length); };
  const next = (e) => { e.stopPropagation(); setCurrent(c => (c + 1) % images.length); };

  const onPointerDown = (e) => { setDragging(true); setStartX(e.clientX); setDragOffset(0); };
  const onPointerMove = (e) => { if (!dragging) return; setDragOffset(e.clientX - startX); };
  const onPointerUp = () => {
    if (Math.abs(dragOffset) > 50) {
      dragOffset < 0
        ? setCurrent(c => (c + 1) % images.length)
        : setCurrent(c => (c - 1 + images.length) % images.length);
    }
    setDragging(false);
    setDragOffset(0);
  };

  return (
    <div className="relative w-full select-none" onClick={e => e.stopPropagation()}>
      <div
        className="relative w-full h-52 rounded-xl overflow-hidden border border-white/10"
        style={{ cursor: dragging ? "grabbing" : "grab" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div
          className="flex h-full"
          style={{
            width: `${images.length * 100}%`,
            transform: `translateX(calc(-${current * (100 / images.length)}% + ${dragOffset / images.length}px))`,
            transition: dragging ? "none" : "transform 0.45s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {images.map((src, i) => (
            <div key={i} className="h-full flex-shrink-0" style={{ width: `${100 / images.length}%` }}>
              <img
                src={src}
                alt={`slide-${i + 1}`}
                draggable={false}
                className="w-full h-full object-cover pointer-events-none brightness-90"
              />
            </div>
          ))}
        </div>

        <button onClick={prev} className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full flex items-center justify-center border border-white/20 bg-black/50 backdrop-blur-md text-white hover:bg-white/20 transition-colors">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M6.5 2L3.5 5L6.5 8" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button onClick={next} className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full flex items-center justify-center border border-white/20 bg-black/50 backdrop-blur-md text-white hover:bg-white/20 transition-colors">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M3.5 2L6.5 5L3.5 8" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="absolute bottom-2.5 right-3 z-10 text-[10px] font-medium text-white/70 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
          {current + 1} / {images.length}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); setLightbox(true); }}
          className="absolute top-2.5 left-2.5 z-10 w-7 h-7 rounded-full flex items-center justify-center border border-white/20 bg-black/50 backdrop-blur-md text-white hover:bg-white/20 transition-all"
          title="Zoom"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
        </button>
      </div>

      {lightbox && <Lightbox images={images} startIndex={current} onClose={() => setLightbox(false)} />}

      <div className="flex justify-center gap-1.5 mt-2.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className="h-1.5 rounded-full border-none cursor-pointer p-0 transition-all duration-300"
            style={{
              width: i === current ? "20px" : "6px",
              background: i === current ? accent : `${accent}40`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Experience Card ────────────────────────────────────────────────────────── */
function ExpCard({ expStatic, dark, rowIndex, isLast }) {
  const { lang } = useContext(LangContext);
  const t = T[lang].data[expStatic.key];

  const [ref, inView] = useInView(0.08);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Merge static + translated
  const exp = {
    ...expStatic,
    role: t.role,
    project: t.project,
    bullets: t.bullets,
    duration: expStatic.duration[lang],
    type: expStatic.type[lang],
  };

  const textPrimary   = dark ? "text-white"      : "text-black/90";
  const textSecondary = dark ? "text-white/70"   : "text-black/60";
  const textMuted     = dark ? "text-white/40"   : "text-black/35";
  const textFaint     = dark ? "text-white/80"   : "text-black/70";
  const toggleStroke  = dark ? "rgba(255,255,255,0.55)" : "rgba(10,10,10,0.4)";

  const cardBgIdle  = dark ? "rgba(10,10,18,0.55)"  : "rgba(255,255,255,0.60)";
  const cardBgHover = dark ? "rgba(10,10,18,0.70)"  : "rgba(255,255,255,0.80)";
  const cardBorder  = dark
    ? hovered ? `${exp.accent}40` : "rgba(255,255,255,0.10)"
    : hovered ? `${exp.accent}30` : "rgba(0,0,0,0.08)";

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${rowIndex * 0.12}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${rowIndex * 0.12}s`,
      }}
    >
      {/* ── DESKTOP ── */}
      <div className="hidden sm:flex gap-0">
        <div className="w-24 flex-shrink-0 pt-1.5 pr-5 text-right flex flex-col items-end gap-1">
          <span
            className={`text-sm font-medium tracking-wide leading-snug transition-colors duration-300 ${textSecondary}`}
            style={{ color: hovered ? exp.accent : undefined }}
          >
            {exp.period}
          </span>
          <span className={`text-xs italic font-normal tracking-wider ${textMuted}`}>{exp.duration}</span>
        </div>

        <div className="flex flex-col items-center flex-shrink-0 w-8">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 transition-all duration-300"
            style={{
              border: `1px solid ${hovered ? exp.accent : dark ? "rgba(255,255,255,0.1)" : "rgba(10,10,10,0.12)"}`,
              background: hovered ? `${exp.accent}12` : "transparent",
              boxShadow: hovered ? `0 0 0 4px ${exp.accent}18` : "none",
            }}
          >
            <div
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: hovered ? exp.accent : dark ? "rgba(255,255,255,0.25)" : "rgba(10,10,10,0.2)",
                transform: hovered ? "scale(1.25)" : "scale(1)",
              }}
            />
          </div>
          {!isLast && (
            <div
              className="flex-1 min-h-10 mt-0.5 transition-all duration-500"
              style={{
                width: "2px",
                background: `linear-gradient(to bottom, ${hovered ? exp.accent : dark ? "rgba(255,255,255,0.15)" : "rgba(10,10,10,0.1)"} 0%, transparent 100%)`,
              }}
            />
          )}
        </div>

        <div className={`flex-1 pl-5 ${isLast ? "" : "pb-10"}`}>
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => setOpen(v => !v)}
            className="cursor-pointer rounded-2xl p-5 transition-all duration-300"
            style={{
              border: `1px solid ${cardBorder}`,
              background: hovered ? cardBgHover : cardBgIdle,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              marginTop: "-4px",
            }}
          >
            <CardInner exp={exp} open={open} hovered={hovered} textPrimary={textPrimary} textSecondary={textSecondary} textMuted={textMuted} textFaint={textFaint} toggleStroke={toggleStroke} dark={dark} />
          </div>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className={`flex sm:hidden flex-col items-center ${isLast ? "" : "pb-8"}`}>
        <div className="flex flex-col items-center gap-0.5 mb-2">
          <span className={`text-xs font-semibold tracking-wide text-center leading-snug ${textSecondary}`} style={{ color: exp.accent }}>
            {exp.period}
          </span>
          <span className={`text-[10px] italic font-normal tracking-wider text-center ${textMuted}`}>{exp.duration}</span>
        </div>

        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 transition-all duration-300"
          style={{
            border: `1px solid ${open ? exp.accent : dark ? "rgba(255,255,255,0.1)" : "rgba(10,10,10,0.12)"}`,
            background: open ? `${exp.accent}12` : "transparent",
            boxShadow: open ? `0 0 0 4px ${exp.accent}18` : "none",
          }}
        >
          <div className="w-2 h-2 rounded-full transition-all duration-300" style={{ background: open ? exp.accent : dark ? "rgba(255,255,255,0.25)" : "rgba(10,10,10,0.2)", transform: open ? "scale(1.25)" : "scale(1)" }} />
        </div>

        <div className="transition-all duration-500" style={{ width: "2px", height: "16px", background: `linear-gradient(to bottom, ${open ? exp.accent : dark ? "rgba(255,255,255,0.15)" : "rgba(10,10,10,0.1)"}, transparent)` }} />

        <div className="w-full">
          <div
            onClick={() => setOpen(v => !v)}
            className="cursor-pointer rounded-2xl p-4 transition-all duration-300 w-full"
            style={{
              border: `1px solid ${open ? `${exp.accent}40` : cardBorder}`,
              background: open ? cardBgHover : cardBgIdle,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <CardInner exp={exp} open={open} hovered={open} textPrimary={textPrimary} textSecondary={textSecondary} textMuted={textMuted} textFaint={textFaint} toggleStroke={toggleStroke} dark={dark} />
          </div>
        </div>

        {!isLast && (
          <div className="mt-0 transition-all duration-500" style={{ width: "2px", height: "28px", background: `linear-gradient(to bottom, ${dark ? "rgba(255,255,255,0.15)" : "rgba(10,10,10,0.1)"}, transparent)` }} />
        )}
      </div>
    </div>
  );
}

/* ─── Card Inner ─────────────────────────────────────────────────────────────── */
function CardInner({ exp, open, hovered, textPrimary, textSecondary, textMuted, textFaint, toggleStroke, dark }) {
  return (
    <>
      <div className="flex items-start gap-3.5 mb-2.5">
        <div
          className="w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0 bg-white transition-all duration-300"
          style={{
            border: `1px solid ${exp.accent}28`,
            transform: hovered ? "scale(1.08) rotate(-3deg)" : "scale(1) rotate(0deg)",
            boxShadow: hovered ? `0 4px 16px ${exp.accent}28` : "none",
          }}
        >
          <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain p-1" />
        </div>

        <div className="flex-1 min-w-0">
          <div className={`text-xl sm:text-2xl font-bold leading-tight mb-1 tracking-tight ${textPrimary}`}>{exp.company}</div>
          <div className={`text-sm font-semibold tracking-widest uppercase ${textSecondary}`}>{exp.role}</div>
          <div className={`flex items-center gap-1 mt-1.5 text-xs font-medium ${textMuted}`}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
            </svg>
            <span>{exp.location}</span>
          </div>
        </div>

        <div
          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300"
          style={{
            border: `1px solid ${open ? exp.accent : dark ? "rgba(255,255,255,0.15)" : "rgba(10,10,10,0.1)"}`,
            background: open ? `${exp.accent}18` : "transparent",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <svg width="8" height="8" viewBox="0 0 9 9" fill="none">
            <line x1="4.5" y1="0.5" x2="4.5" y2="8.5" stroke={open ? exp.accent : toggleStroke} strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="0.5" y1="4.5" x2="8.5" y2="4.5" stroke={open ? exp.accent : toggleStroke} strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {[exp.type, ...(exp.project ? [exp.project] : [])].map((label, i) => (
          <span
            key={i}
            className="text-xs font-semibold tracking-wide px-3 py-1 rounded-full"
            style={{
              color: i === 1 ? exp.accent : dark ? "rgba(255,255,255,0.6)" : "rgba(10,10,10,0.55)",
              border: `1px solid ${i === 1 ? exp.accent + "38" : dark ? "rgba(255,255,255,0.12)" : "rgba(10,10,10,0.08)"}`,
              background: i === 1 ? `${exp.accent}0f` : dark ? "rgba(255,255,255,0.05)" : "transparent",
            }}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="overflow-hidden transition-all duration-700" style={{ maxHeight: open ? "2000px" : "0px" }}>
        <div className="pt-5">
          <div className="h-px mb-4" style={{ background: `linear-gradient(to right, ${exp.accent}30, transparent)` }} />

          <ImageSlider images={exp.images} accent={exp.accent} />

          <div className="flex flex-wrap gap-1.5 mt-4 mb-4">
            {exp.stack.map((s) => (
              <span key={s} className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded" style={{ color: exp.accent, background: `${exp.accent}14` }}>
                {s}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {exp.bullets.map((b, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="flex-shrink-0 mt-2.5 opacity-60" style={{ width: "16px", height: "1px", background: exp.accent }} />
                <p className={`text-sm leading-relaxed m-0 tracking-wide ${textFaint}`}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Main Section ──────────────────────────────────────────────────────────── */
export default function Experience({ dark }) {
  const { lang } = useContext(LangContext);
  const t = T[lang];

  const [titleRef, titleInView] = useInView(0.2);

  const textPrimary = dark ? "text-white"    : "text-black/90";
  const textMuted   = dark ? "text-white/40" : "text-black/28";
  const dividerBg   = dark ? "bg-white/10"   : "bg-black/7";

  return (
    <section id="experience" className="px-6 py-28 max-w-3xl mx-auto">
      <div
        ref={titleRef}
        className="mb-16 transition-all duration-700"
        style={{ opacity: titleInView ? 1 : 0, transform: titleInView ? "none" : "translateY(20px)" }}
      >
        <div className="flex items-baseline gap-4 mb-1">
          <span className={`text-xs italic font-normal tracking-[0.2em] ${textMuted}`}>{t.tagline}</span>
          <div className={`flex-1 h-px ${dividerBg}`} />
        </div>
        <h2 className={`text-6xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-none select-none mt-1 ${textPrimary}`}>
          {t.title}
        </h2>
      </div>

      <div className="flex flex-col">
        {EXP_STATIC.map((expStatic, i) => (
          <ExpCard
            key={expStatic.id}
            expStatic={expStatic}
            dark={dark}
            rowIndex={i}
            isLast={i === EXP_STATIC.length - 1}
          />
        ))}
      </div>
    </section>
  );
}