import { forwardRef, useRef } from "react";
import ScrollReveal from "../components/ScrollReveal/ScrollReveal";
import { AnimatedBeam } from "../components/AnimatedBeam/AnimatedBeam";

// react-icons — pastikan sudah install: npm install react-icons
import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaPhp, FaGithub, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiTypescript, SiRedux, SiNextdotjs } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

// ── Circle Node ────────────────────────────────────────────────
const CircleNode = forwardRef(({ children, label, className = "" }, ref) => (
  <div className="flex flex-col items-center gap-1">
    <div
      ref={ref}
      title={label}
      className={`z-10 flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg text-xl ${className}`}
    >
      {children}
    </div>
    <span className="text-[9px] text-white/40 font-medium tracking-wide">{label}</span>
  </div>
));
CircleNode.displayName = "CircleNode";

// ── Stack Beam Visual ──────────────────────────────────────────
function StackBeam() {
  const containerRef = useRef(null);
  const vscodeRef = useRef(null);

  // Left refs
  const reactRef = useRef(null);
  const tailwindRef = useRef(null);
  const htmlRef = useRef(null);
  const cssRef = useRef(null);
  const jsRef = useRef(null);
  const phpRef = useRef(null);

  // Right refs
  const tsRef = useRef(null);
  const githubRef = useRef(null);
  const reduxRef = useRef(null);
  const nextjsRef = useRef(null);
  const nodejsRef = useRef(null);

  const leftIcons = [
    { ref: reactRef, icon: <FaReact className="text-[#61DAFB]" />, label: "React" },
    { ref: tailwindRef, icon: <SiTailwindcss className="text-[#38BDF8]" />, label: "Tailwind" },
    { ref: htmlRef, icon: <FaHtml5 className="text-[#E44D26]" />, label: "HTML" },
    { ref: cssRef, icon: <FaCss3Alt className="text-[#1572B6]" />, label: "CSS" },
    { ref: jsRef, icon: <FaJs className="text-[#F7DF1E]" />, label: "JavaScript" },
    { ref: phpRef, icon: <FaPhp className="text-[#8892BF]" />, label: "PHP" },
  ];

  const rightIcons = [
    { ref: tsRef, icon: <SiTypescript className="text-[#3178C6]" />, label: "TypeScript" },
    { ref: githubRef, icon: <FaGithub className="text-white" />, label: "GitHub" },
    { ref: reduxRef, icon: <SiRedux className="text-[#764ABC]" />, label: "Redux" },
    { ref: nextjsRef, icon: <SiNextdotjs className="text-white" />, label: "Next.js" },
    { ref: nodejsRef, icon: <FaNodeJs className="text-[#339933]" />, label: "Node.js" },
  ];

  return (
    <div
      ref={containerRef}
      className="relative flex h-[400px] w-full items-center justify-between overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-4"
    >
      {/* Left icons */}
      <div className="flex flex-col justify-around h-full z-10 gap-1">
        {leftIcons.map(({ ref, icon, label }) => (
          <CircleNode key={label} ref={ref} label={label}>
            {icon}
          </CircleNode>
        ))}
      </div>

      {/* Center — VSCode */}
      <div className="flex flex-col items-center z-10">
        <CircleNode
          ref={vscodeRef}
          label="VS Code"
          className="!size-16 !text-3xl border-blue-500/40 bg-blue-500/10"
        >
          <VscVscode className="text-[#007ACC]" />
        </CircleNode>
      </div>

      {/* Right icons */}
      <div className="flex flex-col justify-around h-full z-10 gap-1">
        {rightIcons.map(({ ref, icon, label }) => (
          <CircleNode key={label} ref={ref} label={label}>
            {icon}
          </CircleNode>
        ))}
      </div>

      {/* Beams: left → VSCode */}
      {leftIcons.map(({ ref, label }, i) => (
        <AnimatedBeam
          key={`l-${label}`}
          containerRef={containerRef}
          fromRef={ref}
          toRef={vscodeRef}
          duration={3 + i * 0.5}
          delay={i * 0.3}
          gradientStartColor="#3b82f6"
          gradientStopColor="#06b6d4"
          pathColor="#ffffff15"
          curvature={i % 2 === 0 ? 15 : -15}
        />
      ))}

      {/* Beams: VSCode → right */}
      {rightIcons.map(({ ref, label }, i) => (
        <AnimatedBeam
          key={`r-${label}`}
          containerRef={containerRef}
          fromRef={vscodeRef}
          toRef={ref}
          reverse
          duration={3 + i * 0.5}
          delay={i * 0.3}
          gradientStartColor="#8b5cf6"
          gradientStopColor="#ec4899"
          pathColor="#ffffff15"
          curvature={i % 2 === 0 ? 15 : -15}
        />
      ))}
    </div>
  );
}

// ── About Page ─────────────────────────────────────────────────
export default function About({ dark }) {
  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-24">

        {/* Section 1 */}
        <section className="max-w-3xl mx-auto">
          <ScrollReveal baseOpacity={0.1} enableBlur baseRotation={3} blurStrength={4}
            textClassName={dark ? "text-white/90" : "text-black/90"}>
            Halo! Nama saya Rulif Fadria Nirwansyah, seorang Frontend Developer berusia 21 tahun yang lahir dan besar di Bandung, Jawa Barat, Indonesia.
          </ScrollReveal>
        </section>

        {/* Section 2 */}
        <section className="max-w-3xl mx-auto">
          <ScrollReveal baseOpacity={0.1} enableBlur baseRotation={3} blurStrength={4}
            textClassName={dark ? "text-white/90" : "text-black/90"}>
            Saya memiliki passion yang kuat dalam membangun antarmuka web yang modern, responsif, dan estetis. Bagi saya, kode yang baik bukan hanya soal fungsi — tapi juga soal pengalaman yang dirasakan pengguna.
          </ScrollReveal>
        </section>

        {/* Section 3 — Split: teks kiri + beam kanan */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <ScrollReveal baseOpacity={0.1} enableBlur baseRotation={3} blurStrength={4}
              textClassName={dark ? "text-white/90" : "text-black/90"}>
              Saya selalu ngikutin perkembangan teknologi yang lagi relevan sekarang. 
              Bukan cuma biar kelihatan update, tapi karena saya percaya tools yang tepat bisa 
              bikin hasil kerja jauh lebih impactful dan efisien.
            </ScrollReveal>
          </div>
          <StackBeam />
        </section>

        {/* Section 4 */}
        <section className="max-w-3xl mx-auto">
          <ScrollReveal baseOpacity={0.1} enableBlur baseRotation={3} blurStrength={4}
            textClassName={dark ? "text-white/90" : "text-black/90"}>
            Selain frontend, saya juga memiliki pengalaman sebagai Software Quality Assurance — memastikan setiap fitur yang dirilis berjalan dengan sempurna, bebas dari bug, dan sesuai standar kualitas yang tinggi.
          </ScrollReveal>
        </section>

        {/* Section 5 */}
        <section className="max-w-3xl mx-auto">
          <ScrollReveal baseOpacity={0.1} enableBlur baseRotation={3} blurStrength={4}
            textClassName={dark ? "text-white/90" : "text-black/90"}>
            Saya juga merambah dunia mobile development, membangun aplikasi yang berjalan lancar di berbagai perangkat dengan performa tinggi dan UI yang intuitif.
          </ScrollReveal>
        </section>

        {/* Section 6 */}
        <section className="max-w-3xl mx-auto">
          <ScrollReveal baseOpacity={0.1} enableBlur baseRotation={3} blurStrength={4}
            textClassName={dark ? "text-white/90" : "text-black/90"}>
            Saya percaya bahwa teknologi terbaik adalah yang tidak terlihat — yang bekerja di balik layar untuk menciptakan pengalaman yang terasa alami, cepat, dan menyenangkan bagi setiap pengguna.
          </ScrollReveal>
        </section>

      </div>
    </main>
  );
}