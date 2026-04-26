import { useState, useEffect, useRef } from "react";

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

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const EXPERIENCES = [
  {
    id: 1,
    role: "Praktek Lapangan Kerja",
    company: "PT. Cakrawala Global Yaksa",
    location: "Bandung, Indonesia",
    period: "Jul 2022 – Dec 2022",
    duration: "6 months",
    type: "Internship · On-site",
    accent: "#7dab8f",
    logo: logoCakrawala,
    images: [imgCakrawala1, imgCakrawala2, imgCakrawala3],
    project: "Penggajian Karyawan App",
    stack: ["CodeIgniter", "Laravel", "MySQL", "cPanel"],
    bullets: [
      "Studied and applied CodeIgniter and Laravel frameworks with MySQL database management for 6 months.",
      "Applied Object-Oriented Programming (OOP) concepts and designed database structures for payroll system requirements.",
      "Deployed applications to the server using cPanel and managed domains, file structures, and hosting configurations.",
      "Tested and debugged the system during the development process.",
      "Prepared basic technical documentation for end-users and system administrators.",
    ],
  },
  {
    id: 2,
    role: "Web WordPress Developer",
    company: "Gaotek Inc",
    location: "New York, USA · Remote",
    period: "Oct 2025 – Dec 2025",
    duration: "3 months",
    type: "Internship · Remote",
    accent: "#6fa3c0",
    logo: logoGaotek,
    images: [imgGaotek1, imgGaotek2],
    stack: ["WordPress", "WooCommerce", "SEO", "XAMPP"],
    bullets: [
      "Developed and managed websites and online stores using WordPress and WooCommerce, including custom themes, plugin management, product setup, payment integration, and content management.",
      "Implemented basic SEO practices and handled deployment tasks using XAMPP for local development.",
    ],
  },
  {
    id: 3,
    role: "Software Quality Assurance",
    company: "Vodjo",
    location: "Bandung, Indonesia · Hybrid",
    period: "Sep 2025 – Present",
    duration: "Ongoing",
    type: "Internship · Hybrid",
    accent: "#c08a82",
    logo: logoVodjo,
    images: [imgVodjo1, imgVodjo2, imgVodjo3],
    stack: ["Postman", "API Testing", "QA Docs", "Bug Tracking"],
    bullets: [
      "Assisted in gathering, documenting, and updating client feedback for continuous improvement.",
      "Conducted functional and API testing using Postman to ensure software quality.",
      "Collaborated closely with developers to identify, report, and resolve bugs in a timely manner.",
      "Maintained clear communication with clients and team members regarding project updates and test results.",
      "Recorded and tracked testing results and feedback to support reporting and QA documentation.",
    ],
  },
  {
    id: 4,
    role: "Frontend Developer Trainee",
    company: "Lumoshive Academy",
    location: "Semarang, Indonesia",
    period: "Dec 2025 – Mar 2026",
    duration: "4 months",
    type: "Bootcamp Batch 3",
    accent: "#9b87c2",
    logo: logoLumoshive,
    images: [imgLumoshive1, imgLumoshive2, imgLumoshive3],
    stack: ["React.js", "TypeScript", "Redux", "Tailwind CSS", "Axios", "Golang", "Jest", "Git"],
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
];

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

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent(c => (c + 1) % images.length);
      if (e.key === "ArrowLeft") setCurrent(c => (c - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.9)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "lbIn 0.2s ease",
      }}
    >
      <style>{`@keyframes lbIn { from { opacity:0; transform:scale(0.97) } to { opacity:1; transform:scale(1) } }`}</style>

      {/* Close btn */}
      <button onClick={onClose} style={{
        position:"absolute", top:"18px", right:"18px",
        width:"36px", height:"36px", borderRadius:"50%",
        border:"1px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.08)",
        color:"white", fontSize:"20px", cursor:"pointer",
        display:"flex", alignItems:"center", justifyContent:"center", lineHeight:1,
      }}>×</button>

      {/* Prev */}
      {images.length > 1 && (
        <button onClick={(e) => { e.stopPropagation(); setCurrent(c => (c - 1 + images.length) % images.length); }} style={{
          position:"absolute", left:"16px",
          width:"40px", height:"40px", borderRadius:"50%",
          border:"1px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.08)",
          color:"white", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
        }}>
          <svg width="12" height="12" viewBox="0 0 10 10" fill="none"><path d="M6.5 2L3.5 5L6.5 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}

      {/* Next */}
      {images.length > 1 && (
        <button onClick={(e) => { e.stopPropagation(); setCurrent(c => (c + 1) % images.length); }} style={{
          position:"absolute", right:"16px",
          width:"40px", height:"40px", borderRadius:"50%",
          border:"1px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.08)",
          color:"white", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
        }}>
          <svg width="12" height="12" viewBox="0 0 10 10" fill="none"><path d="M3.5 2L6.5 5L3.5 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}

      {/* Image */}
      <img
        src={images[current]}
        alt={`zoom-${current}`}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: "90vw", maxHeight: "88vh",
          borderRadius: "12px",
          objectFit: "contain",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        }}
      />

      {/* Counter */}
      {images.length > 1 && (
        <div style={{
          position:"absolute", bottom:"20px",
          color:"rgba(255,255,255,0.5)", fontSize:"12px",
          background:"rgba(0,0,0,0.4)", padding:"4px 12px", borderRadius:"20px",
        }}>{current + 1} / {images.length}</div>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div style={{ position:"absolute", bottom:"52px", display:"flex", gap:"8px" }}>
          {images.map((_, i) => (
            <button key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i); }} style={{
              width: i === current ? "20px" : "6px", height:"6px", borderRadius:"3px",
              border:"none", background: i === current ? "white" : "rgba(255,255,255,0.35)",
              cursor:"pointer", padding:0, transition:"all 0.3s ease",
            }} />
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
            <div key={i} className="h-full flex-shrink-0 relative group/img" style={{ width: `${100 / images.length}%` }}>
              <img
                src={src}
                alt={`slide-${i + 1}`}
                draggable={false}
                className="w-full h-full object-cover pointer-events-none brightness-90"
              />
            </div>
          ))}
        </div>

        <button onClick={prev} className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full flex items-center justify-center border border-white/20 bg-black/50 backdrop-blur-md text-white transition-colors hover:bg-white/20">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M6.5 2L3.5 5L6.5 8" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button onClick={next} className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full flex items-center justify-center border border-white/20 bg-black/50 backdrop-blur-md text-white transition-colors hover:bg-white/20">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M3.5 2L6.5 5L3.5 8" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="absolute bottom-2.5 right-3 z-10 text-[10px] font-medium text-white/70 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
          {current + 1} / {images.length}
        </div>

        {/* Zoom button */}
        <button
          onClick={(e) => { e.stopPropagation(); setLightbox(true); }}
          className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full flex items-center justify-center border border-white/20 bg-black/50 backdrop-blur-md text-white transition-all hover:bg-white/20"
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

/* ─── Timeline Node ─────────────────────────────────────────────────────────── */
function TimelineNode({ accent, isLast, hovered, dark }) {
  return (
    <div className="flex flex-col items-center flex-shrink-0 w-8">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 transition-all duration-300"
        style={{
          border: `1px solid ${hovered ? accent : dark ? "rgba(255,255,255,0.1)" : "rgba(10,10,10,0.12)"}`,
          background: hovered ? `${accent}12` : "transparent",
          boxShadow: hovered ? `0 0 0 4px ${accent}18` : "none",
        }}
      >
        <div
          className="w-2 h-2 rounded-full transition-all duration-300"
          style={{
            background: hovered ? accent : dark ? "rgba(255,255,255,0.25)" : "rgba(10,10,10,0.2)",
            transform: hovered ? "scale(1.25)" : "scale(1)",
          }}
        />
      </div>

      {!isLast && (
        <div
          className="flex-1 min-h-10 mt-0.5 transition-all duration-500"
          style={{
            width: "2px",
            background: `linear-gradient(to bottom, ${
              hovered ? accent : dark ? "rgba(255,255,255,0.15)" : "rgba(10,10,10,0.1)"
            } 0%, transparent 100%)`,
          }}
        />
      )}
    </div>
  );
}

/* ─── Experience Card ────────────────────────────────────────────────────────── */
function ExpCard({ exp, dark, rowIndex, isLast }) {
  const [ref, inView] = useInView(0.08);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  // ── font & color tokens — bumped up ──
  const textPrimary   = dark ? "text-white"      : "text-black/90";
  const textSecondary = dark ? "text-white/70"   : "text-black/60";   // was 50
  const textMuted     = dark ? "text-white/40"   : "text-black/35";   // was 25
  const textFaint     = dark ? "text-white/80"   : "text-black/70";   // was 60
  const toggleStroke  = dark ? "rgba(255,255,255,0.55)" : "rgba(10,10,10,0.4)";

  // ── card background: dark mode gets a frosted dark layer ──
  const cardBgIdle    = dark ? "rgba(10,10,18,0.55)"  : "rgba(255,255,255,0.60)";
  const cardBgHover   = dark ? `rgba(10,10,18,0.70)`  : "rgba(255,255,255,0.80)";
  const cardBorder    = dark
    ? hovered ? `${exp.accent}40` : "rgba(255,255,255,0.10)"
    : hovered ? `${exp.accent}30` : "rgba(0,0,0,0.08)";

  return (
    <div
      ref={ref}
      className="flex gap-0"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${rowIndex * 0.12}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${rowIndex * 0.12}s`,
      }}
    >
      {/* Left: period + duration */}
      <div className="w-24 flex-shrink-0 pt-1.5 pr-5 text-right flex flex-col items-end gap-1">
        <span
          className={`text-sm font-medium tracking-wide leading-snug transition-colors duration-300 ${textSecondary}`}
          style={{ color: hovered ? exp.accent : undefined }}
        >
          {exp.period}
        </span>
        <span className={`text-xs italic font-normal tracking-wider ${textMuted}`}>
          {exp.duration}
        </span>
      </div>

      {/* Center: timeline */}
      <TimelineNode accent={exp.accent} isLast={isLast} hovered={hovered} dark={dark} />

      {/* Right: card */}
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
          {/* Top: logo + company + toggle */}
          <div className="flex items-start gap-3.5 mb-2.5">

            {/* Logo */}
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
              {/* Company name — bigger + bolder */}
              <div className={`text-xl sm:text-2xl font-bold leading-tight mb-1 tracking-tight ${textPrimary}`}>
                {exp.company}
              </div>
              {/* Role — more visible */}
              <div className={`text-sm font-semibold tracking-widest uppercase ${textSecondary}`}>
                {exp.role}
              </div>

              {/* Location */}
              <div className={`flex items-center gap-1 mt-1.5 text-xs font-medium ${textMuted}`}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
                </svg>
                <span>{exp.location}</span>
              </div>
            </div>

            {/* Toggle */}
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

          {/* Meta tags */}
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

          {/* Expandable */}
          <div
            className="overflow-hidden transition-all duration-700"
            style={{ maxHeight: open ? "2000px" : "0px" }}
          >
            <div className="pt-5">

              {/* Divider */}
              <div
                className="h-px mb-4"
                style={{ background: `linear-gradient(to right, ${exp.accent}30, transparent)` }}
              />

              {/* Image Slider */}
              <ImageSlider images={exp.images} accent={exp.accent} />

              {/* Stack chips */}
              <div className="flex flex-wrap gap-1.5 mt-4 mb-4">
                {exp.stack.map((s) => (
                  <span
                    key={s}
                    className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded"
                    style={{ color: exp.accent, background: `${exp.accent}14` }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Bullets */}
              <div className="flex flex-col gap-3">
                {exp.bullets.map((b, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div
                      className="flex-shrink-0 mt-2.5 opacity-60"
                      style={{ width: "16px", height: "1px", background: exp.accent }}
                    />
                    <p className={`text-sm leading-relaxed m-0 tracking-wide ${textFaint}`}>
                      {b}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section ──────────────────────────────────────────────────────────── */
export default function Experience({ dark }) {
  const [titleRef, titleInView] = useInView(0.2);

  const textPrimary = dark ? "text-white"     : "text-black/90";
  const textMuted   = dark ? "text-white/40"  : "text-black/28";
  const dividerBg   = dark ? "bg-white/10"    : "bg-black/7";

  return (
    <section id="experience" className="px-6 py-28 max-w-3xl mx-auto">

      {/* Header */}
      <div
        ref={titleRef}
        className="mb-16 transition-all duration-700"
        style={{
          opacity: titleInView ? 1 : 0,
          transform: titleInView ? "none" : "translateY(20px)",
        }}
      >
        <div className="flex items-baseline gap-4 mb-1">
          <span className={`text-xs italic font-normal tracking-[0.2em] ${textMuted}`}>
            Career Journey
          </span>
          <div className={`flex-1 h-px ${dividerBg}`} />
        </div>

        <h2 className={`text-6xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-none select-none mt-1 ${textPrimary}`}>
          Experience
        </h2>
      </div>

      {/* Timeline */}
      <div className="flex flex-col">
        {EXPERIENCES.map((exp, i) => (
          <ExpCard
            key={exp.id}
            exp={exp}
            dark={dark}
            rowIndex={i}
            isLast={i === EXPERIENCES.length - 1}
          />
        ))}
      </div>

    </section>
  );
}