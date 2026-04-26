// App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Project from "./pages/Projects";
import Contact from "./pages/Contact";
import GradientBlinds from "./components/SoftAurora/SoftAurora";
import MentorFeedback from "./components/ui/MentorFeedback";
import SoftAurora from "./components/SoftAurora/SoftAurora";

function App() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const darkColors = ['#0d0d14', '#1a1040', '#0a0f1e'];
  const lightColors = ['#dce8ff', '#f0ecff', '#f5f5f3'];

  return (
    <Router>
      {/* ── Global Background ── */}
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
          <section id="home">
            <Home dark={dark} />
          </section>

          <section id="about">
            <About dark={dark} />
          </section>

          <section id="projects">
            <Project dark={dark} />
          </section>

          {/* ── Section Mentor Feedback ── */}
          <section id="mentor-feedback">
            <MentorFeedback dark={dark} />
          </section>

          <section id="contact">
            <Contact dark={dark} />
          </section>
        </main>
      </div>
    </Router>
  );
}

export default App;