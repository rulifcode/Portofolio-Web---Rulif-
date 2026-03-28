import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Lanyard from "../components/Lanyard/Lanyard";
import TextType from "../components/TextType/TextType";
import ShinyText from "../components/ShinyText/ShinyText";

function Home({ dark }) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full"
      >
        {/* ================= LEFT CONTENT ================= */}
        <div>
          <motion.h1
            variants={item}
            className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-3 leading-tight tracking-tight ${dark ? "text-white/90" : "text-black/90"}`}
          >
            I'm{" "}
            <ShinyText
              text="Rulif Fadria Nirwansyah"
              speed={3}
              color={dark ? "#a0a0a0" : "#606060"}
              shineColor={dark ? "#ffffff" : "#000000"}
              spread={120}
              direction="left"
              className="whitespace-nowrap"
            />
          </motion.h1>

          <motion.div
            variants={item}
            className={`text-xl sm:text-2xl font-medium mb-6 h-9 ${dark ? "text-white/40" : "text-black/40"}`}
          >
            <TextType
              text={[
                "Frontend Developer",
                "React Enthusiast",
                "Software Quality Assurance",
                "Mobile Developer",
              ]}
              typingSpeed={70}
              deletingSpeed={40}
              pauseDuration={1800}
              showCursor={true}
              cursorCharacter="_"
              cursorClassName={dark ? "text-white/40" : "text-black/40"}
              loop={true}
            />
          </motion.div>

          <motion.p
            variants={item}
            className={`text-base sm:text-lg leading-relaxed mb-8 max-w-md ${dark ? "text-white/40" : "text-black/40"}`}
          >
            Fokus membangun aplikasi web modern, responsif, dan UI clean
            menggunakan React & teknologi terbaru.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-3">
            <a
              href="#projects"
              className={`px-6 py-3 rounded-md font-medium text-sm tracking-wide transition-all duration-200 text-center ${dark ? "bg-white text-[#0a0a0c] hover:bg-white/90" : "bg-black text-white hover:bg-black/90"}`}
            >
              Lihat Proyek Saya
            </a>
            <a
              href="#contact"
              className={`px-6 py-3 rounded-md font-medium text-sm tracking-wide border transition-all duration-200 text-center ${dark ? "border-white/20 text-white/60 hover:border-white/40 hover:text-white/90 hover:bg-white/5" : "border-black/20 text-black/60 hover:border-black/40 hover:text-black/90 hover:bg-black/5"}`}
            >
              Hubungi Saya
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className={`mt-12 pt-8 border-t grid grid-cols-4 gap-4 ${dark ? "border-white/10" : "border-black/10"}`}
          >
          </motion.div>
        </div>

        {/* ================= RIGHT - LANYARD 3D ================= */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full hidden md:block"
          style={{ height: "calc(100vh - 4rem)", maxHeight: "800px" }}
        >
          <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} fov={14} />
        </motion.div>

      </motion.div>
    </div>
  );
}

export default Home;