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
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <>
      {/* ===================== SECTION 1 — HERO ===================== */}
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full"
        >
          {/* LEFT CONTENT */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">

            <motion.h1
              variants={item}
              className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-3 leading-tight tracking-tight ${dark ? "text-white/90" : "text-black/90"}`}
            >
             
              <ShinyText
                text="I'M RULIF FADRIAN"
                speed={3}
                color={dark ? "#a0a0a0" : "#606060"}
                shineColor={dark ? "#ffffff" : "#000000"}
                spread={120}
                direction="left"
                className="whitespace-normal break-words"
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

            {/* Buttons */}
            <motion.div
              variants={item}
              className="flex flex-row flex-wrap justify-center md:justify-start gap-3"
            >
              <a
                href="#projects"
                className={`px-5 py-2.5 rounded-md font-medium text-sm tracking-wide transition-all duration-200 text-center whitespace-nowrap ${dark ? "bg-white text-[#0a0a0c] hover:bg-white/90" : "bg-black text-white hover:bg-black/90"}`}
              >
                Lihat Proyek Saya
              </a>
              <a
                href="#contact"
                className={`px-5 py-2.5 rounded-md font-medium text-sm tracking-wide border transition-all duration-200 text-center whitespace-nowrap ${dark ? "border-white/20 text-white/60 hover:border-white/40 hover:text-white/90 hover:bg-white/5" : "border-black/20 text-black/60 hover:border-black/40 hover:text-black/90 hover:bg-black/5"}`}
              >
                Hubungi Saya
              </a>
            </motion.div>

            <motion.div
              variants={item}
              className={`mt-12 pt-8 border-t w-full grid grid-cols-4 gap-4 ${dark ? "border-white/10" : "border-black/10"}`}
            />
          </div>

          {/* RIGHT — Lanyard desktop (TIDAK DIUBAH) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full hidden md:block"
            style={{ height: "calc(100vh - 4rem)", maxHeight: "800px" }}
          >
            <Lanyard dark={dark} position={[0, 0, 20]} gravity={[0, -40, 0]} fov={14} />
          </motion.div>
        </motion.div>
      </div>

      {/* ===================== SECTION 2 — LANYARD MOBILE ONLY ===================== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="md:hidden w-full flex flex-col items-center px-4 pb-16"
      >
        <p className={`text-xs tracking-widest uppercase mb-4 font-medium ${dark ? "text-white/25" : "text-black/25"}`}>
          ID Card
        </p>
        <div className="w-full aspect-[3/4]">
          <Lanyard dark={dark} position={[0, 0, 20]} gravity={[0, -35, 0]} fov={12} />
        </div>
      </motion.div>
    </>
  );
}

export default Home;