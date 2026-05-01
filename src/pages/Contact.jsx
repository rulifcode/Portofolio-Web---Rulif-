import { useState, useEffect, useRef } from "react";
import { useLang, TRANSLATIONS } from "../components/layout/Navbar";
import bgContact from "../assets/background_contact.webp";

const FOOTER_LINKS = [
  {
    label: "Instagram",
    value: "@ruliffadrian",
    href: "https://instagram.com/ruliffadrian",
  },
  {
    label: "LinkedIn",
    value: "ruliffadrian",
    href: "https://linkedin.com/in/ruliffadrian",
  },
  {
    label: "WhatsApp",
    value: "+62 813-8291-6024",
    href: "https://wa.me/6281382916024",
  },
  {
    label: "Email",
    value: "ruliffax@gmail.com",
    href: "mailto:ruliffax@gmail.com",
  },
];

export default function Contact() {
  const { lang } = useLang();
  const t = TRANSLATIONS[lang].contact;
  const currentYear = new Date().getFullYear();

  const [form, setForm] = useState({ name: "", email: "", subject: "", budget: "", message: "" });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(false);
  const [footerVis, setFooterVis] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setFooterVis(true); },
      { threshold: 0.1 }
    );
    if (footerRef.current) obs.observe(footerRef.current);
    return () => obs.disconnect();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: false }));
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = true;
    if (!form.email.trim()) newErrors.email = true;
    if (!form.message.trim()) newErrors.message = true;
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setToast(true);
    setTimeout(() => setToast(false), 3500);
    setForm({ name: "", email: "", subject: "", budget: "", message: "" });
    setErrors({});
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes ping {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(8px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes footerFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .contact-field {
          width: 100%;
          background: rgba(255,255,255,0.07);
          border: 0.5px solid rgba(255,255,255,0.14);
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 13px;
          color: rgba(255,255,255,0.88);
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          appearance: none;
          -webkit-appearance: none;
          box-sizing: border-box;
        }
        .contact-field::placeholder { color: rgba(255,255,255,0.25); }
        .contact-field:focus {
          border-color: rgba(255,255,255,0.28);
          background: rgba(255,255,255,0.10);
        }
        .contact-field.error { border-color: rgba(239,68,68,0.55); }
        .contact-field option { background: #1a1a2e; color: #fff; }

        .submit-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 22px;
          background: rgba(255,255,255,0.08);
          border: 0.5px solid rgba(255,255,255,0.18);
          border-radius: 8px;
          color: rgba(255,255,255,0.85);
          font-size: 13px; font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer; transition: all 0.2s ease;
          letter-spacing: 0.02em; white-space: nowrap;
        }
        .submit-btn:hover {
          background: rgba(255,255,255,0.13);
          border-color: rgba(255,255,255,0.28);
          color: #fff;
        }
        .submit-btn:hover .btn-arrow { transform: translate(2px, -2px); }
        .submit-btn:active { transform: scale(0.98); }
        .btn-arrow { transition: transform 0.2s; display: inline-block; }
        .left-anim { animation: fadeSlideIn 0.5s ease forwards; }
        .right-anim { animation: fadeSlideIn 0.55s 0.08s ease both; }

        /* ── FOOTER ── */
        .cf-footer {
          padding: 32px 48px;
          font-family: 'DM Sans', sans-serif;
        }
        .cf-footer-inner { max-width: 1200px; margin: 0 auto; }

        .cf-links { opacity: 0; }
        .cf-links.vis { animation: footerFadeUp 0.5s 0.1s ease forwards; }

        .cf-link-plain {
          display: flex; flex-direction: column; align-items: center; gap: 4;
          text-decoration: none; position: relative;
          border: none; background: none; padding: 0;
        }
        .cf-link-label-text {
          font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.22); font-weight: 500;
        }
        .cf-plain-value {
          font-size: 13px;
          color: rgba(255,255,255,0.45);
          font-family: 'DM Sans', sans-serif;
          position: relative;
          transition: color 0.25s ease;
          white-space: nowrap;
        }
        .cf-plain-value::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 100%; height: 0.5px;
          background: rgba(255,255,255,0.5);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .cf-link-plain:hover .cf-plain-value { color: rgba(255,255,255,0.88); }
        .cf-link-plain:hover .cf-plain-value::after { transform: scaleX(1); }

        .cf-bottom {
          display: flex; justify-content: center;
          align-items: center; opacity: 0;
          margin-top: 28px;
        }
        .cf-bottom.vis { animation: footerFadeUp 0.45s 0.3s ease forwards; }
        .cf-copy { font-size: 11px; color: rgba(255,255,255,0.16); letter-spacing: 0.03em; }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .contact-wrapper {
            flex-direction: column !important;
            padding: 0 20px !important;
          }
          .contact-left {
            width: 100% !important;
            padding-top: 160px !important;
            padding-right: 0 !important;
            padding-bottom: 32px !important;
            padding-left: 0 !important;
          }
          .contact-right {
            width: 100% !important;
            padding: 32px 0 56px 0 !important;
            border-left: none !important;
            border-top: 0.5px solid rgba(255,255,255,0.07) !important;
          }
          .contact-form-grid { grid-template-columns: 1fr !important; }
          .contact-world-map { display: none !important; }
          .contact-submit-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .submit-btn { width: 100% !important; justify-content: center !important; }
          .cf-footer { padding: 36px 20px 24px !important; }

          /* zigzag footer links */
          .cf-links-row {
            flex-direction: column !important;
            gap: 12px !important;
            align-items: stretch !important;
          }
          .cf-link-plain:nth-child(odd) {
            align-items: flex-start !important;
          }
          .cf-link-plain:nth-child(even) {
            align-items: flex-end !important;
          }
        }

        @media (max-width: 480px) {
          .contact-wrapper { padding: 0 16px !important; }
          .contact-left { padding-top: 140px !important; }
          .contact-main-title { font-size: 32px !important; }
          .cf-footer { padding: 28px 16px 20px !important; }
        }
      `}</style>

      <main
        className="relative overflow-hidden"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          backgroundImage: `url(${bgContact})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* ── CONTACT SECTION ── */}
        <div
          className="contact-wrapper relative z-10 flex mx-auto"
          style={{ minHeight: "100vh", maxWidth: "1200px", padding: "0 48px" }}
        >
          {/* LEFT PANEL */}
          <div
            className="contact-left left-anim flex flex-col"
            style={{ width: "46%", padding: "240px 40px 56px 0" }}
          >
            <div className="flex items-center gap-3" style={{ marginBottom: 24 }}>
              <div style={{ height: 1, width: 32, background: "rgba(255,255,255,0.1)" }} />
              <span style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", fontWeight: 500 }}>
                {t.tagline}
              </span>
              <div style={{ height: 1, width: 32, background: "rgba(255,255,255,0.1)" }} />
            </div>

            <h2
              className="contact-main-title"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(34px, 4.5vw, 52px)",
                fontWeight: 700, letterSpacing: "-0.035em",
                lineHeight: 1.08, color: "rgba(255,255,255,0.93)", marginBottom: 18,
              }}
            >
              Get In Touch
            </h2>

            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.32)", lineHeight: 1.8, maxWidth: 280, marginBottom: 32 }}>
              {t.desc}
            </p>

            <div style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              padding: "7px 16px", borderRadius: 100,
              border: "1px solid rgba(52,211,153,0.22)",
              background: "rgba(52,211,153,0.05)",
              width: "fit-content", marginBottom: 40,
            }}>
              <span style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}>
                <span style={{
                  position: "absolute", inset: -3, borderRadius: "50%",
                  background: "#34d399", opacity: 0.3,
                  animation: "ping 1.8s ease-out infinite",
                }} />
                <span style={{ position: "relative", display: "block", width: 8, height: 8, borderRadius: "50%", background: "#34d399" }} />
              </span>
              <span style={{ fontSize: 11, color: "rgba(52,211,153,0.78)", letterSpacing: "0.05em" }}>
                {t.availability}
              </span>
            </div>

            {/* World Map */}
            <div className="contact-world-map" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <div style={{ width: "120%", marginLeft: "-20%", position: "relative" }}>
                <img
                  src="https://assets.aceternity.com/pro/world.svg"
                  alt="World map"
                  style={{ width: "100%", opacity: 0.15, display: "block", filter: "brightness(1.3)", userSelect: "none", pointerEvents: "none" }}
                />
                <div style={{
                  position: "absolute", top: "52%", left: "80%",
                  transform: "translate(-50%, -50%)",
                  display: "flex", flexDirection: "column", alignItems: "center",
                  pointerEvents: "none",
                }}>
                  <div style={{
                    background: "rgba(255,255,255,0.08)", border: "0.5px solid rgba(255,255,255,0.16)",
                    borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 500,
                    color: "rgba(255,255,255,0.82)", whiteSpace: "nowrap", marginBottom: 5,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    Bandung, ID
                  </div>
                  <div style={{ width: 1, height: 20, background: "linear-gradient(to bottom, rgba(100,160,255,0.6), transparent)" }} />
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(56,131,255,0.28) 0%, transparent 70%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    animation: "glow 2.5s ease-in-out infinite",
                  }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#3883ff", boxShadow: "0 0 8px rgba(56,131,255,0.9)" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div
            className="contact-right right-anim flex flex-col justify-center"
            style={{ width: "54%", padding: "240px 0 56px 52px" }}
          >
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 600, letterSpacing: "-0.025em", color: "rgba(255,255,255,0.9)", marginBottom: 6 }}>
              Send a message
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.26)", marginBottom: 32, lineHeight: 1.7 }}>
              Fill in the details below and I'll get back to you within 24 hours.
            </p>

            <div
              className="contact-form-grid"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <label style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>Full name</label>
                <input className={`contact-field${errors.name ? " error" : ""}`} type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <label style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>Email</label>
                <input className={`contact-field${errors.email ? " error" : ""}`} type="email" name="email" placeholder="you@email.com" value={form.email} onChange={handleChange} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <label style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>Subject</label>
                <select className="contact-field" name="subject" value={form.subject} onChange={handleChange} style={{ color: form.subject ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.3)", cursor: "pointer" }}>
                  <option value="" disabled>Select topic</option>
                  <option value="freelance">Freelance project</option>
                  <option value="job">Job opportunity</option>
                  <option value="collab">Collaboration</option>
                  <option value="hi">Just saying hi</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <label style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>Company / Profile</label>
                <input className="contact-field" type="text" name="budget" placeholder="e.g. Startup, Agency, Personal" value={form.budget} onChange={handleChange} />
              </div>
              <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: 7 }}>
                <label style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>Message</label>
                <textarea className={`contact-field${errors.message ? " error" : ""}`} name="message" placeholder="Tell me about your project or idea..." value={form.message} onChange={handleChange} style={{ resize: "none", height: 108, lineHeight: 1.65 }} />
              </div>
            </div>

            <div className="contact-submit-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 24 }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.16)" }}>{t.footer}</span>
              <button className="submit-btn" onClick={handleSubmit}>
                Send message <span className="btn-arrow">↗</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer className="cf-footer" ref={footerRef}>
          <div className="cf-footer-inner">
            <div
              className={`cf-links cf-links-row${footerVis ? " vis" : ""}`}
              style={{ display: "flex", flexDirection: "row", gap: 40, marginBottom: 28, justifyContent: "center" }}
            >
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="cf-link-plain"
                >
                  <span className="cf-link-label-text">{link.label}</span>
                  <span className="cf-plain-value">{link.value}</span>
                </a>
              ))}
            </div>

            <div className={`cf-bottom${footerVis ? " vis" : ""}`}>
              <span className="cf-copy">© {currentYear} Ruliff Adrian. All rights reserved.</span>
            </div>
          </div>
        </footer>

        {/* Toast */}
        {toast && (
          <div style={{
            position: "fixed", bottom: 24, right: 24,
            background: "rgba(52,211,153,0.08)",
            border: "1px solid rgba(52,211,153,0.22)",
            borderRadius: 10, padding: "12px 18px",
            fontSize: 13, color: "#34d399",
            display: "flex", alignItems: "center", gap: 8,
            zIndex: 999, animation: "slideUp 0.3s ease",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            ✓ Message sent! I'll reply soon.
          </div>
        )}
      </main>
    </>
  );
}