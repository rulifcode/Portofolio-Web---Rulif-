import { useEffect, useRef, useState } from "react";

const contacts = [
  {
    id: "email",
    label: "Email",
    value: "ruliffax@gmail.com",
    href: "mailto:ruliffax@gmail.com",
    num: "01",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "+62 813-8291-6024",
    href: "https://wa.me/6281382916024",
    num: "02",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "ruliffadrian",
    href: "https://www.linkedin.com/in/ruliffadrian",
    num: "03",
  },
  {
    id: "github",
    label: "GitHub",
    value: "rulifcode",
    href: "https://github.com/rulifcode",
    num: "04",
  },
  {
    id: "instagram",
    label: "Instagram",
    value: "@ruliffadrian",
    href: "https://instagram.com/ruliffadrian",
    num: "05",
  },
];

function ContactRow({ contact, index }) {
  const [hovered, setHovered] = useState(false);
  const isRight = index % 2 === 1;

  return (
    <a
      href={contact.href}
      target={contact.id !== "email" ? "_blank" : undefined}
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isRight ? "flex-end" : "flex-start",
        textAlign: isRight ? "right" : "left",
        padding: "28px 0",
        textDecoration: "none",
        position: "relative",
        animation: `fadeSlideIn 0.55s ease forwards`,
        animationDelay: `${index * 0.09}s`,
        opacity: 0,
      }}
    >
      {/* Top glow line that grows from the correct side */}
      <div style={{
        position: "absolute",
        top: 0,
        left: isRight ? "auto" : 0,
        right: isRight ? 0 : "auto",
        height: "1px",
        width: hovered ? "100%" : "0%",
        background: isRight
          ? "linear-gradient(270deg, rgba(255,255,255,0.18), transparent)"
          : "linear-gradient(90deg, rgba(255,255,255,0.18), transparent)",
        transition: "width 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
      }} />

      {/* Number */}
      <span style={{
        fontSize: "10px",
        letterSpacing: "0.2em",
        fontWeight: 500,
        color: "rgba(255,255,255,0.2)",
        marginBottom: "6px",
      }}>
        {contact.num}
      </span>

      {/* Label */}
      <p style={{
        fontSize: "10px",
        textTransform: "uppercase",
        letterSpacing: "0.2em",
        fontWeight: 500,
        color: "rgba(255,255,255,0.28)",
        marginBottom: "4px",
      }}>
        {contact.label}
      </p>

      {/* Value */}
      <p style={{
        fontSize: "clamp(20px, 3.5vw, 34px)",
        fontWeight: 600,
        letterSpacing: "-0.02em",
        lineHeight: 1.15,
        color: hovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.55)",
        transition: "color 0.3s ease",
      }}>
        {contact.value}
      </p>

      {/* Arrow */}
      <div style={{
        marginTop: "8px",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translate(0,0)" : isRight ? "translate(6px,-4px)" : "translate(-6px,-4px)",
        transition: "all 0.25s ease",
        color: "rgba(255,255,255,0.4)",
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>
    </a>
  );
}

export default function Contact() {
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const stateRef = useRef({ mouseX: 0.5, mouseY: 0.5, curX: 0.5, curY: 0.5 });

  useEffect(() => {
    const container = containerRef.current;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      stateRef.current.mouseX = (e.clientX - rect.left) / rect.width;
      stateRef.current.mouseY = (e.clientY - rect.top) / rect.height;
    };
    container.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      const s = stateRef.current;
      s.curX += (s.mouseX - s.curX) * 0.04;
      s.curY += (s.mouseY - s.curY) * 0.04;
      if (orb1Ref.current)
        orb1Ref.current.style.transform = `translate(${(s.curX - 0.5) * -40}px, ${(s.curY - 0.5) * -25}px)`;
      if (orb2Ref.current)
        orb2Ref.current.style.transform = `translate(${(s.curX - 0.5) * 28}px, ${(s.curY - 0.5) * 18}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes subtlePulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        @keyframes pingDot {
          0% { transform: scale(1); opacity: 0.75; }
          100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>

      <main
        ref={containerRef}
        className="relative min-h-screen pt-16 pb-20 px-6 sm:px-10 lg:px-16 overflow-hidden"
        style={{ background: "#06060f", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%)", maskImage: "linear-gradient(to bottom, transparent 0%, black 12%)" }}
      >
        {/* mask-image fade dari atas — konten section fade in dari gelap */}
        {/* Orbs */}
        <div ref={orb1Ref} className="pointer-events-none absolute" style={{
          top: "8%", right: "8%", width: "500px", height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(90,60,180,0.2) 0%, transparent 70%)",
          animation: "subtlePulse 7s ease-in-out infinite",
        }} />
        <div ref={orb2Ref} className="pointer-events-none absolute" style={{
          bottom: "10%", left: "-4%", width: "420px", height: "420px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(30,70,150,0.18) 0%, transparent 70%)",
          animation: "subtlePulse 9s ease-in-out infinite 3s",
        }} />

        <div className="relative z-10 max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-14 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <span className="text-[10px] text-white/30 tracking-widest uppercase font-medium">
                Get In Touch
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
            <h2 className="text-4xl font-bold text-white/90 text-center">Contact</h2>
            <p className="text-center text-white text-sm max-w-md mx-auto">
              Terbuka untuk peluang baru, kolaborasi, atau sekadar ngobrol seputar teknologi.
            </p>
          </div>

          {/* Availability badge */}
          <div className="flex justify-center mb-14">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.05]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" style={{ animation: "pingDot 1.8s ease-out infinite" }} />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-emerald-400/80 text-xs tracking-wide">
                Available for opportunities
              </span>
            </div>
          </div>

          {/* Zigzag list */}
          <div className="relative">
            {/* Center spine line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 pointer-events-none" style={{
              background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.07) 15%, rgba(255,255,255,0.07) 85%, transparent)"
            }} />

            {contacts.map((contact, i) => (
              <ContactRow key={contact.id} contact={contact} index={i} />
            ))}

            {/* Bottom border */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />
          </div>

          {/* Footer note */}
          <p className="text-center text-white/25 text-xs mt-10 tracking-wide">
            Preferably via Email atau WhatsApp untuk response lebih cepat.
          </p>

        </div>
      </main>
    </>
  );
}