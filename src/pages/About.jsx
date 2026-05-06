"use client";
import { forwardRef, useRef } from "react";
import ScrollReveal from "../components/ScrollReveal/ScrollReveal";
import { AnimatedBeam } from "../components/AnimatedBeam/AnimatedBeam";
import { SiFigma } from "react-icons/si";

import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaPhp, FaGitAlt, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiTypescript, SiRedux, SiNextdotjs, SiJest, SiSelenium } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { useLang } from "../components/layout/Navbar";

// ── Translations ───────────────────────────────────────────────
const ABOUT_TRANSLATIONS = {
  EN: {
    bio: "I'm Rulif Fadria Nirwansyah, 21 years old, born and based in Bandung. I have a strong interest in web development, particularly as a Front-End Developer, with the goal of growing into a Full Stack Developer. Beyond front-end, I also have a background in Quality Assurance, which helps me be more thorough in ensuring the quality, functionality, and user experience of an application.",
    passion: "I have a strong passion for building modern, responsive, and aesthetically pleasing web interfaces. To me, good code isn't just about functionality — it's about the experience the user feels.",
    techStack: "I always keep up with the latest relevant technologies. Not just to look up-to-date, but because I genuinely believe the right tools can make the output far more impactful and efficient.",
    qa: "Beyond front-end, I also have experience as a Software Quality Assurance engineer — ensuring every released feature works flawlessly, is free of bugs, and meets high quality standards.",
    mobile: "I've also ventured into mobile development, building applications that run smoothly across various devices with high performance and an intuitive UI.",
    closing: "I believe the best technology is the kind that's invisible — working behind the scenes to create an experience that feels natural, fast, and enjoyable for every user.",
  },
  ID: {
    bio: "Saya Rulif Fadria Nirwansyah, 21 tahun, lahir dan berdomisili di Bandung. Saya memiliki ketertarikan besar di bidang pengembangan web, khususnya sebagai Front-End Developer, dengan tujuan berkembang menjadi Full Stack Developer. Selain berfokus pada front-end development, saya juga memiliki pemahaman di bidang Quality Assurance, yang membantu saya lebih teliti dalam memastikan kualitas, fungsionalitas, dan pengalaman pengguna dari sebuah aplikasi.",
    passion: "Saya memiliki passion yang kuat dalam membangun antarmuka web yang modern, responsif, dan estetis. Bagi saya, kode yang baik bukan hanya soal fungsi — tapi juga soal pengalaman yang dirasakan pengguna.",
    techStack: "Saya selalu ngikutin perkembangan teknologi yang lagi relevan sekarang. Bukan cuma biar kelihatan update, tapi karena saya percaya tools yang tepat bisa bikin hasil kerja jauh lebih impactful dan efisien.",
    qa: "Selain frontend, saya juga memiliki pengalaman sebagai Software Quality Assurance — memastikan setiap fitur yang dirilis berjalan dengan sempurna, bebas dari bug, dan sesuai standar kualitas yang tinggi.",
    mobile: "Saya juga merambah dunia mobile development, membangun aplikasi yang berjalan lancar di berbagai perangkat dengan performa tinggi dan UI yang intuitif.",
    closing: "Saya percaya bahwa teknologi terbaik adalah yang tidak terlihat — yang bekerja di balik layar untuk menciptakan pengalaman yang terasa alami, cepat, dan menyenangkan bagi setiap pengguna.",
  },
};

// ── Circle Node ────────────────────────────────────────────────
const CircleNode = forwardRef(({ children, label, className = "", dark }, ref) => (
  <div className="flex flex-col items-center gap-1">
    <div
      ref={ref}
      title={label}
      className={`z-10 flex size-10 items-center justify-center rounded-full shadow-lg text-xl transition-all duration-300 ${className}`}
      style={{
        border: dark ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(0,0,0,0.08)",
        background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.70)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: dark ? "none" : "0 2px 12px rgba(0,0,0,0.08)",
      }}
    >
      {children}
    </div>
    <span
      className="text-[9px] font-medium tracking-wide"
      style={{ color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)" }}
    >
      {label}
    </span>
  </div>
));
CircleNode.displayName = "CircleNode";

// ── Beam container style helper ────────────────────────────────
function beamContainerStyle(dark) {
  return {
    border: dark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.06)",
    background: dark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.60)",
    backdropFilter: dark ? "none" : "blur(16px)",
    WebkitBackdropFilter: dark ? "none" : "blur(16px)",
    boxShadow: dark ? "none" : "0 4px 32px rgba(0,0,0,0.07)",
  };
}

// ── Postman SVG Icon ───────────────────────────────────────────
function PostmanIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <circle cx="128" cy="128" r="128" fill="#FF6C37" />
      <path d="M144.78 74.06a54.06 54.06 0 1 0 37.27 92.4l-37.27-37.27V74.06z" fill="#fff" opacity="0.9" />
      <path d="M144.78 74.06v55.13l37.27 37.27a54.06 54.06 0 0 0-37.27-92.4z" fill="#fff" opacity="0.6" />
      <circle cx="144.78" cy="128" r="8" fill="#FF6C37" />
      <line x1="144.78" y1="128" x2="175" y2="98" stroke="#FF6C37" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

// ── Cypress SVG Icon ───────────────────────────────────────────
function CypressIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <circle cx="128" cy="128" r="128" fill="#162332" />
      <path d="M128 60a68 68 0 1 0 48.08 116.72L161 161.6A48 48 0 1 1 128 80a47.7 47.7 0 0 1 33.08 13.28l15-15.08A67.76 67.76 0 0 0 128 60z" fill="#04C38E" />
      <path d="M196 128a67.6 67.6 0 0 1-4.64 24.88l16.56 16.56A87.56 87.56 0 0 0 216 128z" fill="#04C38E" opacity="0.5" />
    </svg>
  );
}

// ── Flutter SVG Icon ───────────────────────────────────────────
function FlutterIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 317" xmlns="http://www.w3.org/2000/svg">
      <polygon points="157.666,0 0,157.667 48.118,205.780 253.883,0" fill="#54C5F8"/>
      <polygon points="157.666,0 0,157.667 48.118,205.780 253.883,0" fill="#54C5F8"/>
      <polygon points="48.118,261.895 100.235,314.017 253.883,157.667 201.759,105.549" fill="#54C5F8"/>
      <polygon points="48.118,205.780 100.235,257.895 152.351,205.780 100.235,153.663" fill="#01579B"/>
      <polygon points="100.235,257.895 48.118,261.895 100.235,314.017" fill="#29B6F6"/>
    </svg>
  );
}

// ── Android Studio SVG Icon ────────────────────────────────────
function AndroidIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.523 15.341a5.273 5.273 0 0 1-5.272 5.272 5.273 5.273 0 0 1-5.272-5.272 5.273 5.273 0 0 1 5.272-5.273 5.273 5.273 0 0 1 5.272 5.273z" fill="#3DDC84"/>
      <path d="M0 15.341a12 12 0 0 1 12-12 12 12 0 0 1 12 12H0z" fill="#3DDC84" opacity="0.3"/>
      <circle cx="8.5" cy="10" r="1.2" fill="#fff"/>
      <circle cx="15.5" cy="10" r="1.2" fill="#fff"/>
      <line x1="6" y1="6" x2="3.5" y2="2" stroke="#3DDC84" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="18" y1="6" x2="20.5" y2="2" stroke="#3DDC84" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

// ── Mobile Beam Visual ─────────────────────────────────────────
function MobileBeam({ dark }) {
  const containerRef   = useRef(null);
  const centerRef      = useRef(null);
  const flutterRef     = useRef(null);
  const reactNativeRef = useRef(null);
  const androidRef     = useRef(null);
  const figmaRef       = useRef(null);
  const githubRef      = useRef(null);
  const vscodeRef      = useRef(null);

  const leftIcons = [
    { ref: flutterRef,     label: "Flutter",      icon: <FlutterIcon size={18} />,              className: "border-sky-400/30 bg-sky-400/10" },
    { ref: reactNativeRef, label: "React Native",  icon: <FaReact className="text-[#61DAFB]" />, className: "border-cyan-400/30 bg-cyan-400/10" },
    { ref: androidRef,     label: "Android",       icon: <AndroidIcon size={18} />,              className: "border-green-400/30 bg-green-400/10" },
  ];

  const rightIcons = [
    { ref: figmaRef,   label: "Figma",   icon: <SiFigma className="text-[#F24E1E]" />,   className: "border-orange-400/30 bg-orange-400/10" },
    { ref: githubRef,  label: "Git",     icon: <FaGitAlt className="text-[#F05032]" />,  className: "border-orange-500/30 bg-orange-500/10" },
    { ref: vscodeRef,  label: "VS Code", icon: <VscVscode className="text-[#007ACC]" />, className: "border-blue-500/30 bg-blue-500/10" },
  ];

  return (
    <div
      ref={containerRef}
      className="relative flex h-[320px] w-full items-center justify-between overflow-hidden rounded-2xl px-8 py-6"
      style={beamContainerStyle(dark)}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-32 h-32 rounded-full bg-sky-500/5 blur-3xl" />
      </div>

      <div className="flex flex-col justify-around h-full z-10 gap-3">
        {leftIcons.map(({ ref, icon, label, className }) => (
          <CircleNode key={label} ref={ref} label={label} className={className} dark={dark}>{icon}</CircleNode>
        ))}
      </div>

      <div className="flex flex-col items-center gap-2 z-10">
        <div
          ref={centerRef}
          className="flex size-16 items-center justify-center rounded-full border border-sky-400/40 bg-sky-400/10 shadow-lg shadow-sky-400/10"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="2" width="14" height="20" rx="3" fill="#54C5F8" fillOpacity="0.15" stroke="#54C5F8" strokeWidth="1.5"/>
            <circle cx="12" cy="18" r="1" fill="#54C5F8"/>
            <line x1="9" y1="5" x2="15" y2="5" stroke="#54C5F8" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <span className="text-[9px] text-sky-400/70 font-semibold tracking-widest uppercase">Mobile</span>
      </div>

      <div className="flex flex-col justify-around h-full z-10 gap-3">
        {rightIcons.map(({ ref, icon, label, className }) => (
          <CircleNode key={label} ref={ref} label={label} className={className} dark={dark}>{icon}</CircleNode>
        ))}
      </div>

      {leftIcons.map(({ ref, label }, i) => (
        <AnimatedBeam key={`ml-${label}`} containerRef={containerRef} fromRef={ref} toRef={centerRef}
          duration={3 + i * 0.6} delay={i * 0.4}
          gradientStartColor="#54C5F8" gradientStopColor="#3DDC84"
          pathColor={dark ? "#ffffff10" : "#00000008"}
          curvature={i === 0 ? 20 : i === 2 ? -20 : 0} />
      ))}
      {rightIcons.map(({ ref, label }, i) => (
        <AnimatedBeam key={`mr-${label}`} containerRef={containerRef} fromRef={centerRef} toRef={ref}
          reverse duration={3 + i * 0.6} delay={i * 0.4}
          gradientStartColor="#3DDC84" gradientStopColor="#007ACC"
          pathColor={dark ? "#ffffff10" : "#00000008"}
          curvature={i === 0 ? 20 : i === 2 ? -20 : 0} />
      ))}
    </div>
  );
}

import photoMain from "../assets/WhatsApp Image 2026-04-26 at 16.08.06.jpeg";
import photoTop from "../assets/photo2.jpeg";
import photoBottom from "../assets/photo3.jpeg";

function PhotoGrid({ dark }) {
  const photos = [
    { src: photoMain, alt: "Rulif - Main Photo" },
    { src: photoTop,  alt: "Rulif - Photo 2" },
    { src: photoBottom, alt: "Rulif - Photo 3" },
  ];

  return (
    <div className="relative w-full h-full">
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-500/10 via-violet-500/5 to-transparent blur-2xl pointer-events-none" />
      <div className="grid grid-cols-3 grid-rows-2 gap-3 h-[340px]">
        <div className={`relative overflow-hidden rounded-2xl border shadow-2xl group col-span-2 row-span-2 ${dark ? "border-white/10 shadow-black/40" : "border-gray-200 shadow-black/10"}`}>
          <img src={photos[0].src} alt={photos[0].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className={`absolute inset-0 rounded-2xl ring-1 ring-inset ${dark ? "ring-white/10" : "ring-black/5"}`} />
        </div>
        <div className={`relative overflow-hidden rounded-2xl border shadow-xl group col-span-1 row-span-1 ${dark ? "border-white/10 shadow-black/30" : "border-gray-200 shadow-black/5"}`}>
          <img src={photos[1].src} alt={photos[1].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className={`absolute inset-0 rounded-2xl ring-1 ring-inset ${dark ? "ring-white/10" : "ring-black/5"}`} />
        </div>
        <div className={`relative overflow-hidden rounded-2xl border shadow-xl group col-span-1 row-span-1 ${dark ? "border-white/10 shadow-black/30" : "border-gray-200 shadow-black/5"}`}>
          <img src={photos[2].src} alt={photos[2].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-tl from-violet-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className={`absolute inset-0 rounded-2xl ring-1 ring-inset ${dark ? "ring-white/10" : "ring-black/5"}`} />
          <div className={`absolute bottom-3 left-3 flex items-center gap-1.5 backdrop-blur-md rounded-full px-3 py-1 border ${dark ? "bg-black/50 border-white/10" : "bg-white/70 border-gray-200"}`}>
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className={`text-[9px] font-medium tracking-wider uppercase ${dark ? "text-white/70" : "text-gray-600"}`}>Bandung, ID</span>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-4 -right-4 opacity-20 pointer-events-none">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          {Array.from({ length: 4 }, (_, row) =>
            Array.from({ length: 4 }, (_, col) => (
              <circle key={`${row}-${col}`} cx={col * 18 + 9} cy={row * 18 + 9} r="2" fill={dark ? "white" : "#374151"} />
            ))
          )}
        </svg>
      </div>
    </div>
  );
}

// ── Stack Beam Visual ──────────────────────────────────────────
function StackBeam({ dark }) {
  const containerRef = useRef(null);
  const vscodeRef    = useRef(null);
  const reactRef     = useRef(null);
  const tailwindRef  = useRef(null);
  const htmlRef      = useRef(null);
  const cssRef       = useRef(null);
  const jsRef        = useRef(null);
  const phpRef       = useRef(null);
  const tsRef        = useRef(null);
  const githubRef    = useRef(null);
  const reduxRef     = useRef(null);
  const nextjsRef    = useRef(null);
  const nodejsRef    = useRef(null);

  const leftIcons = [
    { ref: reactRef,    icon: <FaReact className="text-[#61DAFB]" />,       label: "React" },
    { ref: tailwindRef, icon: <SiTailwindcss className="text-[#38BDF8]" />, label: "Tailwind" },
    { ref: htmlRef,     icon: <FaHtml5 className="text-[#E44D26]" />,       label: "HTML" },
    { ref: cssRef,      icon: <FaCss3Alt className="text-[#1572B6]" />,     label: "CSS" },
    { ref: jsRef,       icon: <FaJs className="text-[#F7DF1E]" />,          label: "JavaScript" },
    { ref: phpRef,      icon: <FaPhp className="text-[#8892BF]" />,         label: "PHP" },
  ];

  const rightIcons = [
    { ref: tsRef,     icon: <SiTypescript className="text-[#3178C6]" />,                          label: "TypeScript" },
    { ref: githubRef, icon: <FaGitAlt className="text-[#F05032]" />,                              label: "Git" },
    { ref: reduxRef,  icon: <SiRedux className="text-[#764ABC]" />,                               label: "Redux" },
    { ref: nextjsRef, icon: <SiNextdotjs className={dark ? "text-white" : "text-gray-800"} />,     label: "Next.js" },
    { ref: nodejsRef, icon: <FaNodeJs className="text-[#339933]" />,                              label: "Node.js" },
  ];

  return (
    <div
      ref={containerRef}
      className="relative flex h-[400px] w-full items-center justify-between overflow-hidden rounded-2xl px-6 py-4"
      style={beamContainerStyle(dark)}
    >
      <div className="flex flex-col justify-around h-full z-10 gap-1">
        {leftIcons.map(({ ref, icon, label }) => (
          <CircleNode key={label} ref={ref} label={label} dark={dark}>{icon}</CircleNode>
        ))}
      </div>

      <div className="flex flex-col items-center z-10">
        <CircleNode
          ref={vscodeRef}
          label="VS Code"
          dark={dark}
          className="!size-16 !text-3xl border-blue-500/40 bg-blue-500/10"
        >
          <VscVscode className="text-[#007ACC]" />
        </CircleNode>
      </div>

      <div className="flex flex-col justify-around h-full z-10 gap-1">
        {rightIcons.map(({ ref, icon, label }) => (
          <CircleNode key={label} ref={ref} label={label} dark={dark}>{icon}</CircleNode>
        ))}
      </div>

      {leftIcons.map(({ ref, label }, i) => (
        <AnimatedBeam key={`l-${label}`} containerRef={containerRef} fromRef={ref} toRef={vscodeRef}
          duration={3 + i * 0.5} delay={i * 0.3}
          gradientStartColor="#3b82f6" gradientStopColor="#06b6d4"
          pathColor={dark ? "#ffffff15" : "#00000008"}
          curvature={i % 2 === 0 ? 15 : -15} />
      ))}
      {rightIcons.map(({ ref, label }, i) => (
        <AnimatedBeam key={`r-${label}`} containerRef={containerRef} fromRef={vscodeRef} toRef={ref}
          reverse duration={3 + i * 0.5} delay={i * 0.3}
          gradientStartColor="#8b5cf6" gradientStopColor="#ec4899"
          pathColor={dark ? "#ffffff15" : "#00000008"}
          curvature={i % 2 === 0 ? 15 : -15} />
      ))}
    </div>
  );
}

// ── QA Tools Beam Visual ───────────────────────────────────────
function QABeam({ dark }) {
  const containerRef = useRef(null);
  const centerRef    = useRef(null);
  const postmanRef   = useRef(null);
  const seleniumRef  = useRef(null);
  const jestRef      = useRef(null);
  const cypressRef   = useRef(null);
  const githubRef2   = useRef(null);
  const vscodeRef2   = useRef(null);

  const leftIcons = [
    { ref: postmanRef,  label: "Postman",  icon: <PostmanIcon size={18} />,                   className: "border-orange-500/30 bg-orange-500/10" },
    { ref: seleniumRef, label: "Selenium", icon: <SiSelenium className="text-[#43B02A]" />,   className: "border-green-500/30 bg-green-500/10" },
    { ref: jestRef,     label: "Jest",     icon: <SiJest className="text-[#C21325]" />,        className: "border-red-500/30 bg-red-500/10" },
  ];

  const rightIcons = [
    { ref: cypressRef,  label: "Cypress",  icon: <CypressIcon size={18} />,                                        className: "border-emerald-500/30 bg-emerald-500/10" },
    { ref: githubRef2,  label: "Git",      icon: <FaGitAlt className="text-[#F05032]" />,                         className: "border-orange-500/30 bg-orange-500/10" },
    { ref: vscodeRef2,  label: "VS Code",  icon: <VscVscode className="text-[#007ACC]" />,                         className: "border-blue-500/30 bg-blue-500/10" },
  ];

  return (
    <div
      ref={containerRef}
      className="relative flex h-[320px] w-full items-center justify-between overflow-hidden rounded-2xl px-8 py-6"
      style={beamContainerStyle(dark)}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-32 h-32 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      <div className="flex flex-col justify-around h-full z-10 gap-3">
        {leftIcons.map(({ ref, icon, label, className }) => (
          <CircleNode key={label} ref={ref} label={label} className={className} dark={dark}>{icon}</CircleNode>
        ))}
      </div>

      <div className="flex flex-col items-center gap-2 z-10">
        <div
          ref={centerRef}
          className="flex size-16 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 shadow-lg shadow-emerald-500/10"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
              fill="#04C38E" fillOpacity="0.2" stroke="#04C38E" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M9 12l2 2 4-4" stroke="#04C38E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-[9px] text-emerald-400/70 font-semibold tracking-widest uppercase">QA</span>
      </div>

      <div className="flex flex-col justify-around h-full z-10 gap-3">
        {rightIcons.map(({ ref, icon, label, className }) => (
          <CircleNode key={label} ref={ref} label={label} className={className} dark={dark}>{icon}</CircleNode>
        ))}
      </div>

      {leftIcons.map(({ ref, label }, i) => (
        <AnimatedBeam key={`ql-${label}`} containerRef={containerRef} fromRef={ref} toRef={centerRef}
          duration={3 + i * 0.6} delay={i * 0.4}
          gradientStartColor="#FF6C37" gradientStopColor="#04C38E"
          pathColor={dark ? "#ffffff10" : "#00000008"}
          curvature={i === 0 ? 20 : i === 2 ? -20 : 0} />
      ))}
      {rightIcons.map(({ ref, label }, i) => (
        <AnimatedBeam key={`qr-${label}`} containerRef={containerRef} fromRef={centerRef} toRef={ref}
          reverse duration={3 + i * 0.6} delay={i * 0.4}
          gradientStartColor="#04C38E" gradientStopColor="#3b82f6"
          pathColor={dark ? "#ffffff10" : "#00000008"}
          curvature={i === 0 ? 20 : i === 2 ? -20 : 0} />
      ))}
    </div>
  );
}

// ── About Page ─────────────────────────────────────────────────
export default function About({ dark }) {
  const { lang } = useLang();
  const t = ABOUT_TRANSLATIONS[lang];

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-24">

        {/* Section 1 */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <ScrollReveal baseOpacity={0.1} enableBlur baseRotation={3} blurStrength={4}
              textClassName={dark ? "text-white/90" : "text-black/90"}>
              {t.bio}
            </ScrollReveal>
          </div>
          <PhotoGrid dark={dark} />
        </section>

        {/* Section 2 */}
        <section className="max-w-3xl mx-auto">
          <ScrollReveal baseOpacity={0.1} enableBlur baseRotation={3} blurStrength={4}
            textClassName={dark ? "text-white/90" : "text-black/90"}>
            {t.passion}
          </ScrollReveal>
        </section>

        {/* Section 3 */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <ScrollReveal baseOpacity={0.1} enableBlur baseRotation={3} blurStrength={4}
              textClassName={dark ? "text-white/90" : "text-black/90"}>
              {t.techStack}
            </ScrollReveal>
          </div>
          <StackBeam dark={dark} />
        </section>

        {/* Section 4 — QA */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <QABeam dark={dark} />
          </div>
          <div className="order-1 lg:order-2">
            <ScrollReveal baseOpacity={0.1} enableBlur baseRotation={3} blurStrength={4}
              textClassName={dark ? "text-white/90" : "text-black/90"}>
              {t.qa}
            </ScrollReveal>
          </div>
        </section>

        {/* Section 5 — Mobile Dev */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <ScrollReveal baseOpacity={0.1} enableBlur baseRotation={3} blurStrength={4}
              textClassName={dark ? "text-white/90" : "text-black/90"}>
              {t.mobile}
            </ScrollReveal>
          </div>
          <MobileBeam dark={dark} />
        </section>

        {/* Section 6 */}
        <section className="max-w-3xl mx-auto">
          <ScrollReveal baseOpacity={0.1} enableBlur baseRotation={3} blurStrength={4}
            textClassName={dark ? "text-white/90" : "text-black/90"}>
            {t.closing}
          </ScrollReveal>
        </section>

      </div>
    </main>
  );
}