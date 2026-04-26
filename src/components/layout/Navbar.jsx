import { useState, useEffect } from "react";

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

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ── Anchor links untuk single page scroll ──
const NAV_LINKS = [
  { label: "Home",     href: "#home" },
  { label: "About",    href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact" },
];

export default function Navbar({ dark, setDark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);

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

  const navBg = dark
    ? scrolled ? "bg-[#0a0a0c]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20" : "bg-transparent border-b border-transparent"
    : scrolled ? "bg-[#f5f5f3]/90 backdrop-blur-md border-b border-black/8 shadow-sm"               : "bg-transparent border-b border-transparent";

  const linkCls  = dark ? "text-white/50 hover:text-white/90 hover:bg-white/5" : "text-[#3a3a3a]/60 hover:text-[#1a1a1a] hover:bg-black/5";
  const iconCls  = dark ? "border-white/20 text-white/50 hover:text-white hover:border-white/60 hover:bg-white/5" : "border-[#1a1a1a]/15 text-[#3a3a3a]/50 hover:text-[#1a1a1a] hover:border-[#1a1a1a]/40 hover:bg-black/5";
  const hambCls  = dark ? "text-white/70 hover:text-white" : "text-[#3a3a3a]/60 hover:text-[#1a1a1a]";
  const mobileBg = dark ? "bg-[#0a0a0c]/98 backdrop-blur-md border-b border-white/10" : "bg-[#f5f5f3]/98 backdrop-blur-md border-b border-black/8";
  const divider  = dark ? "bg-white/10" : "bg-[#1a1a1a]/10";

  // Smooth scroll ke anchor
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        <div className="max-w-[1240px] mx-auto px-6 md:px-8 h-[68px] flex items-center">

          {/* Logo */}
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center flex-shrink-0">
            <img
              src="/Subjudul-Photoroom.png"
              alt="Logo"
              className={`h-40 w-auto transition-all duration-300 ${dark ? "invert" : "invert-0"}`}
            />
          </a>

          <div className={`hidden md:block w-px h-7 mx-7 flex-shrink-0 ${divider}`} />

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-[13px] font-medium tracking-[0.08em] uppercase px-3.5 py-1.5 rounded-md transition-colors duration-200 ${linkCls}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <a href="https://github.com/username" target="_blank" rel="noopener noreferrer" className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 ${iconCls}`}>
              <GithubIcon />
            </a>
            <a href="https://instagram.com/username" target="_blank" rel="noopener noreferrer" className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 ${iconCls}`}>
              <InstagramIcon />
            </a>
            <button onClick={() => setDark(!dark)} className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${iconCls}`}>
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className={`md:hidden w-9 h-9 flex items-center justify-center rounded-md transition-colors cursor-pointer ${hambCls}`}>
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-[68px] left-0 right-0 z-40 transition-all duration-200 ${mobileBg} ${menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
        <div className="max-w-[1240px] mx-auto px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-[13px] font-medium tracking-[0.08em] uppercase px-3.5 py-3 rounded-lg transition-colors duration-200 ${linkCls}`}
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-2 px-3.5 pt-3 pb-1">
            <a href="https://github.com/username" target="_blank" rel="noopener noreferrer" className={`w-9 h-9 rounded-full border flex items-center justify-center ${iconCls}`}><GithubIcon /></a>
            <a href="https://instagram.com/username" target="_blank" rel="noopener noreferrer" className={`w-9 h-9 rounded-full border flex items-center justify-center ${iconCls}`}><InstagramIcon /></a>
          </div>
        </div>
      </div>
    </>
  );
}