import { useEffect, useState } from "react";

export default function SplashScreen({ onDone }) {
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
        src="/img_Rulif_logo.png"
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
