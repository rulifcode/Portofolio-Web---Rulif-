import { useState, useEffect, useRef, createContext, useContext } from "react";

/* ─── Language Context ───────────────────────────────────────────────────────── */
export const LangContext = createContext({ lang: "EN", setLang: () => { } });
export const useLang = () => useContext(LangContext);

export const TRANSLATIONS = {
  EN: {
    nav: ["Home", "About", "Experience", "Projects", "Certificate", "Contact"],
    cv: "CV",
    home: {
      desc: "Focused on building modern responsive web & mobile apps, with great SEO, functionality, and clean UI using JavaScript Library & PHP Framework.",
      cta: {
        projects: "View My Projects",
        contact: "Contact Me",
      },
      idcard: "ID Card",
    },
    experience: {
      tagline: "Career Journey",
      title: "Experience",
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
          bullets: [
            "Developed and managed websites and online stores using WordPress and WooCommerce, including custom themes, plugin management, product setup, payment integration, and content management.",
            "Implemented basic SEO practices and handled deployment tasks using XAMPP for local development.",
          ],
        },
        vodjo: {
          role: "Software Quality Assurance",
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
    contact: {
      tagline: "Get In Touch",
      title: "Contact",
      desc: "Open to new opportunities, collaborations, or just a chat about technology.",
      availability: "Available for opportunities",
      footer: "Preferably via Email or WhatsApp for a faster response.",
    },
  },

  ID: {
    nav: ["Beranda", "Tentang", "Pengalaman", "Proyek", "Sertifikat", "Kontak"],
    cv: "CV",
    home: {
      desc: "Fokus membangun aplikasi web & Mobile modern, responsif, aspek SEO, Functionality dan UI clean menggunakan JavaScript Library & PHP Framework.",
      cta: {
        projects: "Lihat Proyek Saya",
        contact: "Hubungi Saya",
      },
      idcard: "Kartu ID",
    },
    experience: {
      tagline: "Perjalanan Karier",
      title: "Pengalaman",
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
          bullets: [
            "Mengembangkan dan mengelola website serta toko online menggunakan WordPress dan WooCommerce, termasuk tema kustom, manajemen plugin, pengaturan produk, integrasi pembayaran, dan manajemen konten.",
            "Menerapkan praktik SEO dasar dan menangani tugas deployment menggunakan XAMPP untuk pengembangan lokal.",
          ],
        },
        vodjo: {
          role: "Software Quality Assurance",
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
    contact: {
      tagline: "Hubungi Saya",
      title: "Kontak",
      desc: "Terbuka untuk peluang baru, kolaborasi, atau sekadar ngobrol seputar teknologi.",
      availability: "Tersedia untuk peluang",
      footer: "Preferably via Email atau WhatsApp untuk response lebih cepat.",
    },
  },
};

const NAV_HREFS = ["#home", "#about", "#experience", "#projects", "#certificate", "#contact"];

/* ─── Icons ──────────────────────────────────────────────────────────────────── */
const WhatsappIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

/* ─── useWindowWidth hook ────────────────────────────────────────────────────── */
function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

/* ─── Language Toggle ────────────────────────────────────────────────────────── */
function LangToggle({ dark }) {
  const { lang, setLang } = useLang();
  const [hovered, setHovered] = useState(false);
  const isEN = lang === "EN";

  return (
    <button
      onClick={() => setLang(isEN ? "ID" : "EN")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height: "34px",
        padding: "0 4px",
        borderRadius: "20px",
        border: dark
          ? `1px solid ${hovered ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.14)"}`
          : `1px solid ${hovered ? "rgba(30,30,30,0.35)" : "rgba(30,30,30,0.12)"}`,
        background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        flexShrink: 0,
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        boxShadow: hovered
          ? dark ? "0 0 14px rgba(255,255,255,0.08)" : "0 0 10px rgba(0,0,0,0.06)"
          : "none",
        position: "relative",
        overflow: "hidden",
        width: "62px",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "4px",
          left: isEN ? "4px" : "calc(50% + 0px)",
          width: "calc(50% - 4px)",
          bottom: "4px",
          borderRadius: "14px",
          background: dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.09)",
          transition: "left 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          zIndex: 0,
        }}
      />
      {["EN", "ID"].map((l) => (
        <span
          key={l}
          style={{
            position: "relative",
            zIndex: 1,
            flex: 1,
            textAlign: "center",
            fontSize: "11px",        // ← dikecilkan dari 13px
            fontWeight: 500,          // ← dilighten dari 700
            letterSpacing: "0.05em", // ← dikurangi dari 0.08em
            color: lang === l
              ? dark ? "rgba(255,255,255,0.95)" : "rgba(10,10,10,0.9)"
              : dark ? "rgba(255,255,255,0.35)" : "rgba(40,40,40,0.4)",
            transition: "color 0.25s ease",
            userSelect: "none",
          }}
        >
          {l}
        </span>
      ))}
    </button>
  );
}

/* ─── CV Button ──────────────────────────────────────────────────────────────── */
function CVButton({ dark, onClick, compact = false }) {
  const { lang } = useLang();
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onClick={onClick}
      style={{
        height: "34px",
        padding: compact ? "0 10px" : "0 14px",
        borderRadius: "8px",
        border: dark
          ? `1px solid ${hovered ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.18)"}`
          : `1px solid ${hovered ? "rgba(30,30,30,0.45)" : "rgba(30,30,30,0.14)"}`,
        background: hovered
          ? dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"
          : "transparent",
        color: dark
          ? hovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.6)"
          : hovered ? "rgba(10,10,10,1)" : "rgba(40,40,40,0.6)",
        fontSize: "11px",         // ← dikecilkan dari 13px
        fontWeight: 500,           // ← dilighten dari 700
        letterSpacing: "0.07em",  // ← dikurangi dari 0.1em
        textTransform: "uppercase",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "5px",
        flexShrink: 0,
        whiteSpace: "nowrap",
        transition: "color 0.2s ease, border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: hovered
          ? dark ? "0 0 18px rgba(255,255,255,0.1)" : "0 0 14px rgba(0,0,0,0.08)"
          : "none",
        transform: pressed ? "scale(0.93)" : hovered ? "scale(1.04)" : "scale(1)",
      }}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      {TRANSLATIONS[lang].cv}
    </button>
  );
}

/* ─── Magnetic Nav Link ──────────────────────────────────────────────────────── */
function MagneticLink({ label, href, dark, onClick, compact = false }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({ x: (e.clientX - cx) * 0.3, y: (e.clientY - cy) * 0.3 });
  };

  const handleMouseLeave = () => { setPos({ x: 0, y: 0 }); setHovered(false); };

  const textColor = dark
    ? hovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)"
    : hovered ? "rgba(20,20,20,1)" : "rgba(40,40,40,0.55)";

  return (
    <li style={{ listStyle: "none", position: "relative" }}>
      <a
        ref={ref}
        href={href}
        onClick={(e) => onClick(e, href)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          display: "inline-flex", alignItems: "center",
          fontSize: compact ? "11px" : "13px",
          fontWeight: 600,
          letterSpacing: compact ? "0.06em" : "0.1em",
          textTransform: "uppercase", textDecoration: "none",
          padding: compact ? "5px 8px" : "6px 12px",
          borderRadius: "6px",
          position: "relative", color: textColor,
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          transition: hovered
            ? "color 0.2s ease"
            : "transform 0.55s cubic-bezier(0.23,1,0.32,1), color 0.2s ease",
          cursor: "pointer", overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{
          position: "relative", display: "inline-block",
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          transform: hovered ? "translateY(-1px)" : "translateY(0)",
        }}>
          {label}
        </span>
        {/* Underline shimmer */}
        <span style={{
          position: "absolute",
          bottom: compact ? "3px" : "4px",
          left: compact ? "8px" : "12px",
          right: compact ? "8px" : "12px",
          height: "1.5px", borderRadius: "2px", overflow: "hidden",
          background: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)",
          opacity: hovered ? 1 : 0, transition: "opacity 0.2s ease",
        }}>
          <span style={{
            position: "absolute", inset: 0,
            background: dark
              ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)"
              : "linear-gradient(90deg, transparent, rgba(20,20,20,0.8), transparent)",
            transform: hovered ? "translateX(0%)" : "translateX(-100%)",
            transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
          }} />
        </span>
      </a>
    </li>
  );
}

/* ─── Icon Button ────────────────────────────────────────────────────────────── */
function IconBtn({ href, onClick, dark, children, isToggle, size = 34 }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const borderColor = dark
    ? hovered ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.18)"
    : hovered ? "rgba(30,30,30,0.45)" : "rgba(30,30,30,0.14)";
  const color = dark
    ? hovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.5)"
    : hovered ? "rgba(10,10,10,1)" : "rgba(40,40,40,0.5)";

  const sharedStyle = {
    width: `${size}px`, height: `${size}px`, borderRadius: "50%",
    border: `1px solid ${borderColor}`,
    display: "flex", alignItems: "center", justifyContent: "center",
    color,
    background: hovered ? (dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)") : "transparent",
    cursor: "pointer",
    transition: "color 0.2s ease, border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
    boxShadow: hovered
      ? dark ? "0 0 18px rgba(255,255,255,0.12), inset 0 0 12px rgba(255,255,255,0.04)" : "0 0 14px rgba(0,0,0,0.1)"
      : "none",
    transform: pressed ? "scale(0.88)" : hovered ? "scale(1.1)" : "scale(1)",
    textDecoration: "none", flexShrink: 0,
  };

  const inner = (
    <span style={{
      display: "inline-flex",
      transform: hovered ? (isToggle ? "rotate(20deg)" : "scale(1.15)") : (isToggle ? "rotate(0deg)" : "scale(1)"),
      transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
    }}>
      {children}
    </span>
  );

  const events = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => { setHovered(false); setPressed(false); },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
  };

  if (isToggle) return <button {...events} onClick={onClick} style={sharedStyle}>{inner}</button>;
  return <a href={href} target="_blank" rel="noopener noreferrer" {...events} style={sharedStyle}>{inner}</a>;
}

/* ─── Mobile / Tablet Menu Link ──────────────────────────────────────────────── */
function MobileLink({ label, href, dark, onClick, index, open }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onClick={(e) => onClick(e, href)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        fontSize: "15px", fontWeight: 600, letterSpacing: "0.1em",
        textTransform: "uppercase", textDecoration: "none",
        padding: "12px 14px", borderRadius: "8px",
        color: dark
          ? hovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)"
          : hovered ? "rgba(10,10,10,1)" : "rgba(40,40,40,0.55)",
        background: hovered
          ? dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"
          : "transparent",
        transition: `color 0.2s ease, background 0.25s ease, transform 0.25s ease, opacity 0.3s ease ${index * 0.045}s`,
        transform: open ? "translateX(0)" : "translateX(-12px)",
        opacity: open ? 1 : 0, cursor: "pointer",
      }}
    >
      <span>{label}</span>
      <span style={{
        opacity: hovered ? 0.7 : 0,
        transform: hovered ? "translateX(0)" : "translateX(-6px)",
        transition: "opacity 0.2s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </span>
    </a>
  );
}

/* ─── Hamburger ──────────────────────────────────────────────────────────────── */
function HamburgerBtn({ open, dark, onClick }) {
  const [hovered, setHovered] = useState(false);
  const color = dark
    ? hovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.65)"
    : hovered ? "rgba(10,10,10,1)" : "rgba(40,40,40,0.6)";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: "34px", height: "34px", borderRadius: "8px", border: "none",
        background: hovered ? (dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)") : "transparent",
        color, cursor: "pointer",
        transition: "background 0.2s ease, color 0.2s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hovered ? "scale(1.08)" : "scale(1)", flexShrink: 0,
      }}
    >
      <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
        <rect
          x={open ? "3" : "0"} y="0"
          width={open ? "14" : "20"} height="2" rx="1" fill="currentColor"
          style={{ transform: open ? "rotate(45deg) translate(3px, 5px)" : "none", transformOrigin: "center", transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}
        />
        <rect
          x="0" y="6" width="20" height="2" rx="1" fill="currentColor"
          style={{ opacity: open ? 0 : 1, transform: open ? "scaleX(0)" : "scaleX(1)", transformOrigin: "center", transition: "all 0.25s ease" }}
        />
        <rect
          x={open ? "3" : "4"} y="12"
          width={open ? "14" : "16"} height="2" rx="1" fill="currentColor"
          style={{ transform: open ? "rotate(-45deg) translate(3px, -5px)" : "none", transformOrigin: "center", transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}
        />
      </svg>
    </button>
  );
}

/* ─── Main Navbar ────────────────────────────────────────────────────────────── */
export default function Navbar({ dark, setDark }) {
  const { lang } = useLang();
  const width = useWindowWidth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isDesktop = width >= 1100;
  const isMobile = width < 768;

  const navLabels = TRANSLATIONS[lang].nav;
  const navLinks = NAV_HREFS.map((href, i) => ({ label: navLabels[i], href }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isDesktop) setMenuOpen(false);
  }, [isDesktop]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  const handleCVClick = () => window.open("CV_Rulif_Fadrian_Nirwansyah_Mei_2026_Present.pdf", "_blank");

  const dividerColor = dark ? "rgba(255,255,255,0.1)" : "rgba(26,26,26,0.1)";
  const compactNav = width >= 1100 && width < 1280;

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        @keyframes logoShimmer {
          0%   { filter: brightness(1); }
          50%  { filter: brightness(1.25) drop-shadow(0 0 8px rgba(255,255,255,0.3)); }
          100% { filter: brightness(1); }
        }
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        width: "100%", boxSizing: "border-box",
        transition: "background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease",
        background: scrolled
          ? dark ? "rgba(10,10,12,0.92)" : "rgba(245,245,243,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(1.5)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px) saturate(1.5)" : "none",
        borderBottom: scrolled
          ? dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.07)"
          : "1px solid transparent",
        boxShadow: scrolled
          ? dark ? "0 4px 24px rgba(0,0,0,0.3)" : "0 2px 16px rgba(0,0,0,0.06)"
          : "none",
      }}>
        <div style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: isDesktop ? "0 24px" : "0 16px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          gap: "0",
          minWidth: 0,
        }}>

          {/* ── Logo ── */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            style={{ display: "flex", alignItems: "center", flexShrink: 0, textDecoration: "none" }}
            onMouseEnter={(e) => e.currentTarget.style.animation = "logoShimmer 0.6s ease"}
            onMouseLeave={(e) => e.currentTarget.style.animation = "none"}
          >
            <img
              src="/img_Rulif_logo.png"
              alt="Logo"
              style={{
                height: isDesktop ? "160px" : isMobile ? "140px" : "150px",
                width: "auto",
                filter: dark ? "invert(1)" : "invert(0)",
                transition: "filter 0.3s ease, height 0.3s ease",
              }}
            />
          </a>

          {/* ── Divider (desktop only) ── */}
          {isDesktop && (
            <div style={{
              width: "1px",
              height: "24px",
              margin: compactNav ? "0 16px" : "0 24px",
              background: dividerColor,
              flexShrink: 0,
            }} />
          )}

          {/* ── Desktop Nav Links ── */}
          {isDesktop && (
            <ul style={{
              display: "flex",
              alignItems: "center",
              gap: "0",
              listStyle: "none",
              margin: 0,
              padding: 0,
              minWidth: 0,
              flexShrink: 1,
            }}>
              {navLinks.map((link) => (
                <MagneticLink
                  key={link.href}
                  label={link.label}
                  href={link.href}
                  dark={dark}
                  onClick={handleNavClick}
                  compact={compactNav}
                />
              ))}
            </ul>
          )}

          {/* ── Spacer ── */}
          <div style={{ flex: 1, minWidth: 0 }} />

          {/* ── Right Controls ── */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: isDesktop ? "8px" : "6px",
            flexShrink: 0,
          }}>
            <IconBtn href="https://wa.me/6281382916024" dark={dark} size={34}>
              <WhatsappIcon />
            </IconBtn>

            {isDesktop && (
              <CVButton dark={dark} onClick={handleCVClick} compact={compactNav} />
            )}

            <LangToggle dark={dark} />

            <IconBtn isToggle dark={dark} onClick={() => setDark(!dark)} size={34}>
              {dark ? <SunIcon /> : <MoonIcon />}
            </IconBtn>

            {!isDesktop && (
              <HamburgerBtn open={menuOpen} dark={dark} onClick={() => setMenuOpen(!menuOpen)} />
            )}
          </div>
        </div>
      </nav>

      {/* ── Mobile & Tablet Dropdown Menu ── */}
      {!isDesktop && (
        <div
          style={{
            position: "fixed",
            top: "64px",
            left: 0,
            right: 0,
            zIndex: 40,
            width: "100%",
            boxSizing: "border-box",
            overflow: "hidden",
            background: dark ? "rgba(10,10,12,0.97)" : "rgba(245,245,243,0.97)",
            backdropFilter: "blur(20px) saturate(1.8)",
            WebkitBackdropFilter: "blur(20px) saturate(1.8)",
            borderBottom: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.07)",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(-8px)",
            pointerEvents: menuOpen ? "auto" : "none",
            transition: "opacity 0.25s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <div style={{
            maxWidth: isMobile ? "100%" : "520px",
            margin: "0 auto",
            padding: isMobile ? "10px 10px 14px" : "14px 20px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}>
            {navLinks.map((link, i) => (
              <MobileLink
                key={link.href}
                label={link.label}
                href={link.href}
                dark={dark}
                onClick={handleNavClick}
                index={i}
                open={menuOpen}
              />
            ))}

            <div style={{
              height: "1px",
              background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
              margin: "8px 4px",
            }} />

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 10px",
            }}>
              <CVButton dark={dark} onClick={handleCVClick} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}