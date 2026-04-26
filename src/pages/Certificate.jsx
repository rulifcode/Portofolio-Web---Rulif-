import { useState, useEffect, useRef, useCallback } from "react";

const CERTIFICATES = [
  { id: 1,  title: "Front Web Development With React Batch 3",  issuer: "Lumoshive Academy", date: "13 March 2026", image: "/certificates/lumosfinish.png" },
  { id: 2,  title: "Certificate 2",  issuer: "Issuer Name", date: "2024", image: "/certificates/cert-2.png" },
  { id: 3,  title: "Certificate 3",  issuer: "Issuer Name", date: "2024", image: "/certificates/cert-3.png" },
  { id: 4,  title: "Certificate 4",  issuer: "Issuer Name", date: "2024", image: "/certificates/cert-4.png" },
  { id: 5,  title: "Certificate 5",  issuer: "Issuer Name", date: "2024", image: "/certificates/cert-5.png" },
  { id: 6,  title: "Certificate 6",  issuer: "Issuer Name", date: "2024", image: "/certificates/cert-6.png" },
  { id: 7,  title: "Certificate 7",  issuer: "Issuer Name", date: "2024", image: "/certificates/cert-7.png" },
  { id: 8,  title: "Certificate 8",  issuer: "Issuer Name", date: "2024", image: "/certificates/cert-8.png" },
  { id: 9,  title: "Certificate 9",  issuer: "Issuer Name", date: "2024", image: "/certificates/cert-9.png" },
  { id: 10, title: "Certificate 10", issuer: "Issuer Name", date: "2024", image: "/certificates/cert-10.png" },
];

const TOTAL = CERTIFICATES.length;
const AUTO_INTERVAL = 3200;
const wrap = (n, max) => ((n % max) + max) % max;

// ── Single Card ───────────────────────────────────────────────────────────────
function CertCard({ cert, offset, dark, onClick, isActive }) {
  const abs = Math.abs(offset);
  const visible = abs <= 2;

  const scale   = offset === 0 ? 1    : abs === 1 ? 0.82  : 0.66;
  const tx      = offset * 260;
  const tz      = offset === 0 ? 0    : abs === 1 ? -90   : -180;
  const opacity = offset === 0 ? 1    : abs === 1 ? 0.6   : 0.28;
  const rotY    = offset * -12;
  const zIndex  = 10 - abs;
  // Active: no blur. Neighbour (abs=1): soft blur. Far (abs=2): heavier blur
  const blur    = offset === 0 ? 0    : abs === 1 ? 2.5   : 5;

  return (
    <div
      onClick={() => onClick && onClick(offset)}
      style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: "340px",
        transform: `
          translate(-50%, -50%)
          translateX(${tx}px)
          translateZ(${tz}px)
          rotateY(${rotY}deg)
          scale(${scale})
        `,
        opacity,
        zIndex,
        filter: `blur(${blur}px)`,
        transition: "all 0.65s cubic-bezier(0.34,1.2,0.64,1)",
        cursor: offset === 0 ? "default" : "pointer",
        pointerEvents: visible ? "auto" : "none",
        willChange: "transform, opacity",
      }}
    >
      {/* Card shell */}
      <div style={{
        position: "relative",
        borderRadius: "18px",
        overflow: "hidden",
        background: dark
          ? "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)"
          : "linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(245,245,245,0.9) 100%)",
        border: isActive
          ? dark
            ? "1px solid rgba(255,255,255,0.22)"
            : "1px solid rgba(0,0,0,0.18)"
          : dark
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid rgba(0,0,0,0.08)",
        boxShadow: isActive
          ? dark
            ? "0 32px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.08)"
            : "0 32px 80px rgba(0,0,0,0.12)"
          : dark
            ? "0 12px 40px rgba(0,0,0,0.4)"
            : "0 12px 40px rgba(0,0,0,0.08)",
        transition: "box-shadow 0.5s ease, border-color 0.5s ease",
      }}>
        {/* Shimmer sweep on active card */}
        {isActive && (
          <div style={{
            position: "absolute",
            top: 0, left: "-100%",
            width: "60%", height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
            animation: "shimmerSlide 2.8s ease-in-out infinite",
            zIndex: 2,
            pointerEvents: "none",
          }} />
        )}

        {/* Image area */}
        <div style={{
          width: "100%",
          aspectRatio: "4/3",
          background: dark
            ? "linear-gradient(135deg, #161616 0%, #0d0d0d 100%)"
            : "linear-gradient(135deg, #ececec 0%, #e2e2e2 100%)",
          position: "relative",
          overflow: "hidden",
        }}>
          <img
            src={cert.image}
            alt={cert.title}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.6s ease",
            }}
            onError={(e) => { e.target.style.display = "none"; }}
          />


          {/* Bottom gradient overlay */}
          <div style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: "50%",
            background: dark
              ? "linear-gradient(to top, rgba(12,12,12,0.85), transparent)"
              : "linear-gradient(to top, rgba(255,255,255,0.85), transparent)",
            pointerEvents: "none",
          }} />
        </div>

        {/* Text info */}
        <div style={{ padding: "18px 22px 22px", position: "relative" }}>
          <p style={{
            margin: 0,
            fontSize: "15px",
            fontWeight: 600,
            color: dark ? "rgba(255,255,255,0.9)" : "rgba(10,10,10,0.88)",
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
            // inherit site font — no fontFamily override
          }}>
            {cert.title}
          </p>
          <div style={{
            marginTop: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <span style={{
              fontSize: "12px",
              color: dark ? "rgba(255,255,255,0.42)" : "rgba(0,0,0,0.42)",
              fontWeight: 500,
              letterSpacing: "0.03em",
            }}>
              {cert.issuer}
            </span>
            <span style={{
              fontSize: "11px",
              color: dark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)",
              letterSpacing: "0.06em",
            }}>
              {cert.date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function Certificate({ dark }) {
  const [active, setActive]   = useState(0);
  const [paused, setPaused]   = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const timerRef = useRef(null);

  const next = useCallback(() => setActive((a) => wrap(a + 1, TOTAL)), []);
  const prev = useCallback(() => setActive((a) => wrap(a - 1, TOTAL)), []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [paused, next]);

  const handleCardClick = (offset) => {
    if (offset === 0) return;
    clearInterval(timerRef.current);
    if (offset > 0) next(); else prev();
    setPaused(true);
    setTimeout(() => setPaused(false), 4000);
  };

  const handlePointerDown = (e) => setDragStart(e.clientX);
  const handlePointerUp   = (e) => {
    if (dragStart === null) return;
    const dx = e.clientX - dragStart;
    if (Math.abs(dx) > 40) {
      if (dx < 0) next(); else prev();
      setPaused(true);
      setTimeout(() => setPaused(false), 4000);
    }
    setDragStart(null);
  };

  const goTo = (i) => {
    setActive(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 4000);
  };

  // neutral accent — adapts to dark/light cleanly
  const accent = dark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.75)";
  const accentSub = dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)";

  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "100px 24px 80px",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes shimmerSlide {
          0%   { left: -100%; }
          60%  { left: 120%;  }
          100% { left: 120%;  }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-10px); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1);   opacity: 0.4; }
          100% { transform: scale(1.7); opacity: 0;   }
        }
        @keyframes rotateSlow {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
      `}</style>

      {/* ── Subtle background rings — neutral, no colour ── */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: "600px", height: "600px",
        borderRadius: "50%",
        border: dark
          ? "1px solid rgba(255,255,255,0.04)"
          : "1px solid rgba(0,0,0,0.05)",
        animation: "rotateSlow 30s linear infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: "820px", height: "820px",
        borderRadius: "50%",
        border: dark
          ? "1px solid rgba(255,255,255,0.025)"
          : "1px solid rgba(0,0,0,0.035)",
        animation: "rotateSlow 55s linear infinite reverse",
        pointerEvents: "none",
      }} />

      {/* ── Floating blob — neutral ── */}
      <div style={{
        position: "absolute",
        top: "8%", left: "4%",
        width: "380px", height: "380px",
        borderRadius: "50%",
        background: dark
          ? "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)"
          : "radial-gradient(circle, rgba(0,0,0,0.025) 0%, transparent 70%)",
        pointerEvents: "none",
        animation: "floatY 8s ease-in-out infinite",
      }} />

      {/* ── Counter badge ── */}
      <div style={{
        marginBottom: "48px",
        display: "flex", alignItems: "center", gap: "10px",
        position: "relative", zIndex: 5,
      }}>
        <div style={{ position: "relative" }}>
          <div style={{
            width: "46px", height: "46px",
            borderRadius: "50%",
            border: dark ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(0,0,0,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
            position: "relative",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              borderRadius: "50%",
              border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
              animation: "pulseRing 2.2s ease-out infinite",
            }} />
            <span style={{
              fontSize: "14px",
              fontWeight: 700,
              color: dark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.75)",
              fontVariantNumeric: "tabular-nums",
            }}>
              {String(active + 1).padStart(2, "0")}
            </span>
          </div>
        </div>
        <span style={{
          fontSize: "12px",
          color: dark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.22)",
          letterSpacing: "0.1em",
        }}>
          / {String(TOTAL).padStart(2, "0")}
        </span>
      </div>

      {/* ── 3D Carousel stage ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "900px",
          height: "400px",
          perspective: "1000px",
          transformStyle: "preserve-3d",
          cursor: "grab",
          zIndex: 2,
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={() => setDragStart(null)}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {CERTIFICATES.map((cert, i) => {
          const offset = wrap(i - active + Math.floor(TOTAL / 2), TOTAL) - Math.floor(TOTAL / 2);
          return (
            <CertCard
              key={cert.id}
              cert={cert}
              offset={offset}
              dark={dark}
              onClick={handleCardClick}
              isActive={i === active}
            />
          );
        })}
      </div>

      {/* ── Nav arrows + dots ── */}
      <div style={{
        display: "flex", alignItems: "center", gap: "16px",
        marginTop: "52px", zIndex: 5, position: "relative",
      }}>
        <NavArrow dir="left" dark={dark} onClick={prev} />

        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          {CERTIFICATES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === active ? "24px" : "6px",
                height: "6px",
                borderRadius: "3px",
                border: "none",
                background: i === active
                  ? dark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.7)"
                  : dark ? "rgba(255,255,255,0.18)"  : "rgba(0,0,0,0.14)",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.3s ease",
              }}
            />
          ))}
        </div>

        <NavArrow dir="right" dark={dark} onClick={next} />
      </div>

      {/* ── Active cert info below ── */}
      <div style={{
        marginTop: "28px",
        textAlign: "center",
        zIndex: 5,
        position: "relative",
        minHeight: "42px",
      }}>
        <p style={{
          margin: 0,
          fontSize: "14px",
          fontWeight: 600,
          color: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)",
          letterSpacing: "0.02em",
        }}>
          {CERTIFICATES[active].title}
        </p>
        <p style={{
          margin: "4px 0 0",
          fontSize: "12px",
          color: dark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)",
          letterSpacing: "0.05em",
        }}>
          {CERTIFICATES[active].issuer} · {CERTIFICATES[active].date}
        </p>
      </div>
    </section>
  );
}

// ── Arrow Button ───────────────────────────────────────────────────────────────
function NavArrow({ dir, dark, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        width: "42px", height: "42px",
        borderRadius: "50%",
        border: dark
          ? `1px solid ${hovered ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.1)"}`
          : `1px solid ${hovered ? "rgba(0,0,0,0.3)"        : "rgba(0,0,0,0.1)"}`,
        background: hovered
          ? dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)"
          : "transparent",
        color: dark
          ? hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)"
          : hovered ? "rgba(0,0,0,0.85)"      : "rgba(0,0,0,0.3)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.25s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        transform: pressed ? "scale(0.88)" : hovered ? "scale(1.08)" : "scale(1)",
        boxShadow: hovered
          ? dark ? "0 0 18px rgba(255,255,255,0.08)" : "0 0 14px rgba(0,0,0,0.07)"
          : "none",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {dir === "left"
          ? <polyline points="15 18 9 12 15 6" />
          : <polyline points="9 18 15 12 9 6" />
        }
      </svg>
    </button>
  );
}