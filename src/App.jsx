import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { LangContext } from "./components/layout/Navbar";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Project from "./pages/Projects";
import Certificate from "./pages/Certificate";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import ProjectDetail from "./pages/ProjectDetail";
import MentorFeedback from "./components/ui/MentorFeedback";
import SoftAurora from "./components/SoftAurora/SoftAurora";
import SplashScreen from "./components/SplashScreen";

const AURORA_COLORS = {
  dark: ["#0d0d14", "#1a1040", "#0a0f1e"],
  light: ["#dce8ff", "#f0ecff", "#f5f5f3"],
};

const PAGE_SECTIONS = [
  { id: "home", Component: Home },
  { id: "about", Component: About },
  { id: "experience", Component: Experience },
  { id: "projects", Component: Project },
  { id: "certificate", Component: Certificate },
  { id: "mentor-feedback", Component: MentorFeedback },
  { id: "contact", Component: Contact },
];

function AppBackground({ dark }) {
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{ background: dark ? "#0a0a0c" : "#f0f0ee", pointerEvents: "none" }}
    >
      <SoftAurora
        gradientColors={dark ? AURORA_COLORS.dark : AURORA_COLORS.light}
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
  );
}

function AppSections({ dark }) {
  return (
    <main>
      {PAGE_SECTIONS.map((section) => {
        const SectionComponent = section.Component;

        return (
          <section key={section.id} id={section.id}>
            <SectionComponent dark={dark} />
          </section>
        );
      })}
    </main>
  );
}

function HashScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const scrollTimer = window.setTimeout(() => {
      const target = document.querySelector(location.hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 120);

    return () => window.clearTimeout(scrollTimer);
  }, [location.pathname, location.hash]);

  return null;
}

function App() {
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState("EN");
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}

      <Router>
        <HashScrollHandler />
        <AppBackground dark={dark} />

        <div className="min-h-screen flex flex-col">
          <Navbar dark={dark} setDark={setDark} />
          <Routes>
            <Route path="/" element={<AppSections dark={dark} />} />
            <Route path="/projects" element={<Project dark={dark} />} />
            <Route path="/project" element={<Project dark={dark} />} />
            <Route path="/projects/:slug" element={<ProjectDetail dark={dark} />} />
            <Route path="/project/:slug" element={<ProjectDetail dark={dark} />} />
            <Route path="/admin" element={<AdminDashboard dark={dark} />} />
          </Routes>
        </div>
      </Router>
    </LangContext.Provider>
  );
}

export default App;
