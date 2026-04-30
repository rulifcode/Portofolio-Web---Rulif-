// App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { LangContext } from "./components/layout/Navbar";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Project from "./pages/Projects";
import Certificate from "./pages/Certificate";
import Contact from "./pages/Contact";
import MentorFeedback from "./components/ui/MentorFeedback";
import SoftAurora from "./components/SoftAurora/SoftAurora";

// ── Splash Screen ──────────────────────────────────────────────
function SplashScreen({ onDone }) {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHiding(true);
      setTimeout(onDone, 400);
    }, 1200);
    return () => clearTimeout(timer);
  }, [onDone]);
  
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0a0a0c",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: hiding ? 0 : 1,
        transition: "opacity 0.7s ease",
        pointerEvents: hiding ? "none" : "all",
      }}
    >
      <img
        src="/Subjudul-Photoroom.png"
        alt="Logo"
        style={{
          width: "clamp(160px, 35vw, 280px)",
          objectFit: "contain",
          filter: "brightness(0) invert(1)",
          animation: "splashPop 0.6s cubic-bezier(0.34,1.56,0.64,1) both",
        }}
      />
      <style>{`
        @keyframes splashPop {
          from { opacity: 0; transform: scale(0.7); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
// ──────────────────────────────────────────────────────────────

function App() {
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState("EN");
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const darkColors = ['#0d0d14', '#1a1040', '#0a0f1e'];
  const lightColors = ['#dce8ff', '#f0ecff', '#f5f5f3'];

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}

      <Router>
        <div
          className="fixed inset-0 -z-10"
          style={{ background: dark ? "#0a0a0c" : "#f0f0ee", pointerEvents: "none" }}
        >
          <SoftAurora
            gradientColors={dark ? darkColors : lightColors}
            angle={0}
            noise={0.3}
            blindCount={12}
            blindMinWidth={50}
            spotlightRadius={0.5}
            spotlightSoftness={1}
            spotlightOpacity={1}
            mouseDampening={0.15}
            distortAmount={0}
            shineDirection="left"
            mixBlendMode="lighten"
          />
        </div>

        <div className="min-h-screen flex flex-col">
          <Navbar dark={dark} setDark={setDark} />
          <main>
            <section id="home"><Home dark={dark} /></section>
            <section id="about"><About dark={dark} /></section>
            <section id="experience"><Experience dark={dark} /></section>
            <section id="projects"><Project dark={dark} /></section>
            <section id="certificate"><Certificate dark={dark} /></section>
            <section id="mentor-feedback"><MentorFeedback dark={dark} /></section>
            <section id="contact"><Contact dark={dark} /></section>
          </main>
        </div>
      </Router>
    </LangContext.Provider>
  );
}

export default App;