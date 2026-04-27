import { useState, useEffect, useRef } from "react";

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
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

const NAV_LINKS = [
  { label: "Home",        href: "#home" },
  { label: "About",       href: "#about" },
  { label: "Experience",  href: "#experience" },
  { label: "Projects",    href: "#projects" },
  { label: "Certificate", href: "#certificate" },
  { label: "Contact",     href: "#contact" },
];

// ── CV Button ─────────────────────────────────────────────────────────────────
function CVButton({ dark, onClick }) {
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
        height: "36px",
        padding: "0 14px",
        borderRadius: "8px",
        border: dark
          ? `1px solid ${hovered ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.18)"}`
          : `1px solid ${hovered ? "rgba(30,30,30,0.45)" : "rgba(30,30,30,0.14)"}`,
        background: hovered
          ? dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"
          : "transparent",
        color: dark
          ? hovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.6)"
          : hovered ? "rgba(10,10,10,1)"    : "rgba(40,40,40,0.6)",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        flexShrink: 0,
        transition: "color 0.2s ease, border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: hovered
          ? dark ? "0 0 18px rgba(255,255,255,0.1)" : "0 0 14px rgba(0,0,0,0.08)"
          : "none",
        transform: pressed ? "scale(0.93)" : hovered ? "scale(1.04)" : "scale(1)",
      }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      CV
    </button>
  );
}

// ── Magnetic Nav Link ──────────────────────────────────────────────────────────
function MagneticLink({ link, dark, onClick }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({ x: (e.clientX - cx) * 0.35, y: (e.clientY - cy) * 0.35 });
  };

  const handleMouseLeave = () => { setPos({ x: 0, y: 0 }); setHovered(false); };

  const textColor = dark
    ? hovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)"
    : hovered ? "rgba(20,20,20,1)"       : "rgba(40,40,40,0.55)";

  return (
    <li style={{ listStyle: "none", position: "relative" }}>
      <a
        ref={ref}
        href={link.href}
        onClick={(e) => onClick(e, link.href)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          textDecoration: "none",
          padding: "6px 14px",
          borderRadius: "6px",
          position: "relative",
          color: textColor,
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          transition: hovered
            ? "color 0.2s ease"
            : "transform 0.55s cubic-bezier(0.23,1,0.32,1), color 0.2s ease",
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        <span style={{
          position: "relative",
          display: "inline-block",
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          transform: hovered ? "translateY(-1px)" : "translateY(0)",
        }}>
          {link.label}
        </span>
        <span style={{
          position: "absolute",
          bottom: "4px", left: "14px", right: "14px",
          height: "1.5px",
          borderRadius: "2px",
          overflow: "hidden",
          background: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}>
          <span style={{
            position: "absolute",
            inset: 0,
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

// ── Icon Button ────────────────────────────────────────────────────────────────
function IconBtn({ href, onClick, dark, children, isToggle }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const borderColor = dark
    ? hovered ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.18)"
    : hovered ? "rgba(30,30,30,0.45)"    : "rgba(30,30,30,0.14)";
  const color = dark
    ? hovered ? "rgba(255,255,255,1)"  : "rgba(255,255,255,0.5)"
    : hovered ? "rgba(10,10,10,1)"     : "rgba(40,40,40,0.5)";
  const glowColor = dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)";

  const sharedStyle = {
    width: "36px", height: "36px",
    borderRadius: "50%",
    border: `1px solid ${borderColor}`,
    display: "flex", alignItems: "center", justifyContent: "center",
    color,
    background: hovered ? glowColor : "transparent",
    cursor: "pointer",
    transition: "color 0.2s ease, border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
    boxShadow: hovered
      ? dark ? "0 0 18px rgba(255,255,255,0.12), inset 0 0 12px rgba(255,255,255,0.04)" : "0 0 14px rgba(0,0,0,0.1)"
      : "none",
    transform: pressed ? "scale(0.88)" : hovered ? "scale(1.1)" : "scale(1)",
    textDecoration: "none",
    flexShrink: 0,
  };

  if (isToggle) {
    return (
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setPressed(false); }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onClick={onClick}
        style={sharedStyle}
      >
        <span style={{
          display: "inline-flex",
          transform: hovered ? "rotate(20deg)" : "rotate(0deg)",
          transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        }}>
          {children}
        </span>
      </button>
    );
  }

  return (
    <a
      href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={sharedStyle}
    >
      <span style={{
        display: "inline-flex",
        transform: hovered ? "scale(1.15)" : "scale(1)",
        transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        {children}
      </span>
    </a>
  );
}

// ── Mobile Link ────────────────────────────────────────────────────────────────
function MobileLink({ link, dark, onClick, index, open }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={link.href}
      onClick={(e) => onClick(e, link.href)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "13px",
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        textDecoration: "none",
        padding: "12px 14px",
        borderRadius: "8px",
        color: dark
          ? hovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)"
          : hovered ? "rgba(10,10,10,1)"       : "rgba(40,40,40,0.55)",
        background: hovered
          ? dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"
          : "transparent",
        transition: `color 0.2s ease, background 0.25s ease, transform 0.25s ease, opacity 0.3s ease ${index * 0.045}s`,
        transform: open ? "translateX(0)" : "translateX(-12px)",
        opacity: open ? 1 : 0,
        cursor: "pointer",
      }}
    >
      <span>{link.label}</span>
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

// ── Hamburger animated icon ────────────────────────────────────────────────────
function HamburgerBtn({ open, dark, onClick }) {
  const [hovered, setHovered] = useState(false);
  const color = dark
    ? hovered ? "rgba(255,255,255,1)"  : "rgba(255,255,255,0.65)"
    : hovered ? "rgba(10,10,10,1)"     : "rgba(40,40,40,0.6)";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: "36px", height: "36px",
        borderRadius: "8px",
        border: "none",
        background: hovered
          ? dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"
          : "transparent",
        color,
        cursor: "pointer",
        transition: "background 0.2s ease, color 0.2s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hovered ? "scale(1.08)" : "scale(1)",
        flexShrink: 0,
      }}
    >
      <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
        <rect x={open ? "3" : "0"} y="0" width={open ? "14" : "20"} height="2" rx="1" fill="currentColor"
          style={{ transform: open ? "rotate(45deg) translate(3px, 5px)" : "none", transformOrigin: "center", transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)" }} />
        <rect x="0" y="6" width="20" height="2" rx="1" fill="currentColor"
          style={{ opacity: open ? 0 : 1, transform: open ? "scaleX(0)" : "scaleX(1)", transformOrigin: "center", transition: "all 0.25s ease" }} />
        <rect x={open ? "3" : "4"} y="12" width={open ? "14" : "16"} height="2" rx="1" fill="currentColor"
          style={{ transform: open ? "rotate(-45deg) translate(3px, -5px)" : "none", transformOrigin: "center", transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)" }} />
      </svg>
    </button>
  );
}

// ── Main Navbar ────────────────────────────────────────────────────────────────
export default function Navbar({ dark, setDark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  // Ganti "/cv.pdf" dengan path atau link CV kamu
  const handleCVClick = () => window.open("/cv.pdf", "_blank");

  const navStyle = {
    position: "fixed",
    top: 0, left: 0, right: 0,
    zIndex: 50,
    width: "100%",
    boxSizing: "border-box",
    overflow: "100v",
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
  };

  const dividerColor = dark ? "rgba(255,255,255,0.1)" : "rgba(26,26,26,0.1)";

  const mobilePanelStyle = {
    position: "fixed",
    top: "68px", left: 0, right: 0,
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
  };

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

      <nav style={navStyle}>
        <div style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "0 16px",
          height: "68px",
          display: "flex",
          alignItems: "center",
          minWidth: 0,
        }}>

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            style={{ display: "flex", alignItems: "center", flexShrink: 0, textDecoration: "none" }}
            onMouseEnter={(e) => e.currentTarget.style.animation = "logoShimmer 0.6s ease"}
            onMouseLeave={(e) => e.currentTarget.style.animation = "none"}
          >
            <img
              src="/Subjudul-Photoroom.png"
              alt="Logo"
              style={{
                height: "160px",
                width: "auto",
                filter: dark ? "invert(1)" : "invert(0)",
                transition: "filter 0.3s ease",
              }}
            />
          </a>

          {/* Divider — desktop only */}
          <div className="hidden-divider" style={{
            width: "1px", height: "28px",
            margin: "0 28px",
            background: dividerColor,
            flexShrink: 0,
          }} />

          {/* Desktop Nav Links */}
          <ul className="desktop-nav" style={{
            display: "flex", alignItems: "center",
            gap: "2px", listStyle: "none", margin: 0, padding: 0,
            minWidth: 0,
          }}>
            {NAV_LINKS.map((link) => (
              <MagneticLink key={link.label} link={link} dark={dark} onClick={handleNavClick} />
            ))}
          </ul>

          <div style={{ flex: 1, minWidth: 0 }} />

          {/* Right area: social icons | CV button | dark toggle | hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <IconBtn href="https://github.com/username" dark={dark}>
              <GithubIcon />
            </IconBtn>
            <IconBtn href="https://instagram.com/username" dark={dark}>
              <InstagramIcon />
            </IconBtn>

            {/* CV Button — desktop only */}
            <div className="cv-btn-desktop">
              <CVButton dark={dark} onClick={handleCVClick} />
            </div>

            {/* Dark mode toggle */}
            <IconBtn isToggle dark={dark} onClick={() => setDark(!dark)}>
              {dark ? <SunIcon /> : <MoonIcon />}
            </IconBtn>

            {/* Hamburger — mobile only */}
            <div className="hamburger-btn">
              <HamburgerBtn open={menuOpen} dark={dark} onClick={() => setMenuOpen(!menuOpen)} />
            </div>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <div style={mobilePanelStyle} className="mobile-panel">
        <div style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "12px 12px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}>
          {NAV_LINKS.map((link, i) => (
            <MobileLink
              key={link.label}
              link={link}
              dark={dark}
              onClick={handleNavClick}
              index={i}
              open={menuOpen}
            />
          ))}

          {/* Divider */}
          <div style={{
            height: "1px",
            background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
            margin: "8px 4px",
          }} />

          {/* Social icons + CV row */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 10px" }}>
            <IconBtn href="https://github.com/username" dark={dark}>
              <GithubIcon />
            </IconBtn>
            <IconBtn href="https://instagram.com/username" dark={dark}>
              <InstagramIcon />
            </IconBtn>
            <CVButton dark={dark} onClick={handleCVClick} />
          </div>
        </div>
      </div>

      {/* Responsive CSS */}
      <style>{`
        .desktop-nav    { display: none !important; }
        .hidden-divider { display: none !important; }
        .hamburger-btn  { display: flex !important; }
        .mobile-panel   { display: block !important; }
        .cv-btn-desktop { display: none !important; }

        @media (min-width: 768px) {
          .desktop-nav    { display: flex !important; }
          .hidden-divider { display: block !important; }
          .hamburger-btn  { display: none !important; }
          .mobile-panel   { display: none !important; }
          .cv-btn-desktop { display: flex !important; }
        }
      `}</style>
    </>
  );
}