import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import useCarousel from "../hooks/useCarousel";
import { useLang } from "../components/layout/Navbar";

/* ── Asset imports ─────────────────────────────────────────────── */
import coverEcommerce from "../assets/1774056567909.jpg";
import coverFurniture from "../assets/Purple and Pink Gradient Modern Bold Mobile App Presentation.jpg";
import coverRecipe from "../assets/Purple and Pink Gradient Modern Bold Mobile App Presentation (1).jpg";
import coverTaskify from "../assets/taskify-cover.jpg";
import coverGaotek from "../assets/gaotek3.jpg";
import coverNgafal from "../assets/NgafalNgefeel.png";
import coverGana from "../assets/ganakonsultan.jpg";
import coverPolytama from "../assets/polytama1.webp";
import coverDaihatsu from "../assets/coverDaihatsu1.webp";
import coverBNPP from "../assets/BNPP.png";
import coverTotalBuah from "../assets/TBS1.png";
import coverRessortHotel from "../assets/HotelImage.png";
import coverLitera from "../assets/Litera-perpustakaan.png";
import logoVodjo from "../assets/vodjo.webp";
import logoLumoshive from "../assets/lumoshive.png";
import logoGaotek from "../assets/GAOTek.png";

/* ================================================================
   DATA — translations (grouped by category)
   ================================================================ */
const TRANSLATIONS = {
  EN: {
    tagline: "Portfolio",
    title: "My Projects",
    subtitle: "A collection of projects I've worked on — from web apps to management systems.",
    cta: "See all projects on GitHub",
    viewAll: "View All",
    showLess: "Show Less",
    groupLabels: { vodjo: "Vodjo — Software QA", development: "Project Development" },
    groupDescs: {
      vodjo: "Quality Assurance projects during my time at Vodjo, covering mobile apps, websites, and enterprise systems.",
      development: "Personal, freelance, and bootcamp projects — from landing pages to full-stack apps.",
    },
    vodjo: [
      { title: "Ngafal Ngefeel", description: "QA for a mobile learning app (iOS & Android). Performed functional, API, and automation testing using Cypress, Playwright & Postman. Collected client feedback via web CMS using Agile methodology." },
      { title: "Gana Konsultan Indonesia", description: "QA for a WordPress corporate website. Conducted functional testing, wrote test cases, reported bugs, and collaborated with the dev team in Agile sprints." },
      { title: "PT. Polytama Propindo", description: "QA for an enterprise CMS managing petrochemical products, feedback, and operational reports. Wrote test cases, performed functional testing, and reported findings." },
      { title: "TMS Daihatsu", description: "QA for a WordPress-based website. Performed functional testing, wrote detailed bug reports, and supported the dev team in fixing identified issues." },
      { title: "BNPP RI", description: "Ongoing QA engagement for the official website of Badan Nasional Pengelola Perbatasan Republik Indonesia. Functional testing, test case creation, and bug reporting." },
      { title: "Total Buah Store", description: "Ongoing QA for an Android mobile app. Performing functional testing, writing test cases, and collaborating with developers to ensure app quality." },
    ],
    development: [
      { title: "Rulif Taskify Movie", description: "Personal project — a movie discovery app built with Next.js, Node.js, Firebase, and Tailwind CSS. Integrates TMDB API with SSG, server-side streaming via Vidsrc, and Framer Motion animations." },
      { title: "E-Commerce App (Tim Ubuntu)", description: "Lumoshive bootcamp batch III final project — a fullstack e-commerce app with authentication, product management, shopping cart, and checkout features." },
      {
        title: "Ressort Hotel Application with PHP",
        description: "A hotel reservation and management web application built with PHP, featuring room booking, customer management, check-in/check-out handling, and an intuitive admin dashboard for efficient hotel operations."
      },
      { title: "Furniture Landing Page", description: "A modern landing page for a furniture brand with elegant design, smooth animations, and a fully responsive layout." },
      { title: "Food Recipe App", description: "A food recipe app integrated with an external API, displaying various recipes with search and category filter features." },
      { title: "Perpustakaan Online", description: "A digital library management system built with Native PHP & MySQLi, featuring book borrowing, member management, and reporting." },
      { title: "React E-Commerce Firebase", description: "A modern e-commerce platform with Firebase authentication, real-time product management, and a responsive UI." },
      { title: "Gaotek Inc — Web WordPress", description: "Developed and maintained the Gaotek Indonesia website. Handled theme updates, SEO optimization, WooCommerce product data via Excel, and UI slicing based on Figma designs." },
    ],
  },
  ID: {
    tagline: "Portofolio",
    title: "Proyek Saya",
    subtitle: "Kumpulan project yang pernah saya kerjakan — dari web app hingga sistem manajemen.",
    cta: "Lihat semua project di GitHub",
    viewAll: "Lihat Semua",
    showLess: "Tampilkan Sedikit",
    groupLabels: { vodjo: "Vodjo — Software QA", development: "Project Development" },
    groupDescs: {
      vodjo: "Proyek Quality Assurance selama bekerja di Vodjo, mencakup aplikasi mobile, website, dan sistem enterprise.",
      development: "Proyek personal, freelance, dan bootcamp — dari landing page hingga aplikasi full-stack.",
    },
    vodjo: [
      { title: "Ngafal Ngefeel", description: "QA untuk aplikasi belajar mobile (iOS & Android). Melakukan pengujian fungsional, API, dan otomasi menggunakan Cypress, Playwright & Postman." },
      { title: "Gana Konsultan Indonesia", description: "QA untuk website korporat berbasis WordPress. Melakukan pengujian fungsional, membuat test case, melaporkan bug, dan berkolaborasi dengan tim dev." },
      { title: "PT. Polytama Propindo", description: "QA untuk enterprise CMS yang mengelola produk petrokimia, feedback, dan laporan operasional." },
      { title: "TMS Daihatsu", description: "QA untuk website berbasis WordPress. Melakukan pengujian fungsional, membuat laporan bug detail." },
      { title: "BNPP RI", description: "QA ongoing untuk website resmi Badan Nasional Pengelola Perbatasan Republik Indonesia." },
      { title: "Total Buah Segar", description: "QA ongoing untuk aplikasi mobile Android. Melakukan pengujian fungsional, membuat test case." },
    ],
    development: [
      { title: "Rulif Taskify Movie", description: "Personal project — aplikasi pencarian film berbasis Next.js, Node.js, Firebase, dan Tailwind CSS." },
      { title: "E-Commerce App (Tim Ubuntu)", description: "Final project bootcamp Lumoshive batch III — aplikasi e-commerce fullstack." },
      { title: "Ressort Hotel Application", description: "Personal Project pemesanan Hotel menggunakan PHP Mysqli modern UI" },
      { title: "Furniture Landing Page", description: "Landing page modern untuk brand furniture dengan desain elegan dan animasi smooth." },
      { title: "Food Recipe App", description: "Aplikasi resep makanan yang terintegrasi dengan API eksternal." },
      { title: "Perpustakaan Online", description: "Sistem manajemen perpustakaan digital berbasis Native PHP & MySQLi." },
      { title: "React E-Commerce Firebase", description: "Platform e-commerce modern dengan autentikasi Firebase." },
      { title: "Gaotek Inc — Web WordPress", description: "Mengembangkan dan memelihara website Gaotek Indonesia." },
    ],
  },
};

/* ── Shared meta (language-independent) ────────────────────────── */
const VODJO_META = [
  { tech: ["Cypress", "Playwright", "Postman", "Agile", "iOS", "Android"], github: null, live: "https://play.google.com/store/apps/details?id=com.nn.ngafalngefeel", gradient: "from-teal-500/20 via-cyan-500/10 to-transparent", cover: coverNgafal, companyIcon: logoVodjo, companyName: "Vodjo" },
  { tech: ["WordPress", "Postman", "Agile", "Manual Testing"], github: null, live: "https://ganakonsultan.com/", gradient: "from-lime-500/20 via-green-500/10 to-transparent", cover: coverGana, companyIcon: logoVodjo, companyName: "Vodjo" },
  { tech: ["CMS", "Postman", "Manual Testing", "Agile"], github: null, live: "https://crm.masplene.com/dashboard", gradient: "from-blue-500/20 via-sky-500/10 to-transparent", cover: coverPolytama, companyIcon: logoVodjo, companyName: "Vodjo" },
  { tech: ["WordPress", "Manual Testing", "Bug Report", "Agile"], github: null, live: "https://www.tmsdaihatsu.co.id/", gradient: "from-red-500/20 via-orange-500/10 to-transparent", cover: coverDaihatsu, companyIcon: logoVodjo, companyName: "Vodjo" },
  { tech: ["Manual Testing", "Test Case", "Bug Report", "Agile"], github: null, live: null, gradient: "from-indigo-500/20 via-blue-500/10 to-transparent", cover: coverBNPP, companyIcon: logoVodjo, companyName: "Vodjo" },
  { tech: ["Android", "Manual Testing", "Test Case", "Agile"], github: null, live: null, gradient: "from-pink-500/20 via-rose-500/10 to-transparent", cover: coverTotalBuah, companyIcon: logoVodjo, companyName: "Vodjo" },
];

const DEV_META = [
  { tech: ["Next.js", "Node.js", "Firebase", "Tailwind CSS", "Framer Motion", "TMDB API"], github: "https://github.com/rulifcode/ruliftaskify-movie", live: "https://ruliftaskify-movie.vercel.app/", gradient: "from-purple-500/20 via-violet-500/10 to-transparent", cover: coverTaskify, companyIcon: null, companyName: null },
  { tech: ["React", "JavaScript", "Tailwind CSS"], github: "https://github.com/lumoshive-final-project-batch-III/Frontend-project-app-ecommerce-frontend-tim-Ubuntu", live: "https://frontend-project-app-ecommerce-fron.vercel.app/", gradient: "from-blue-500/20 via-cyan-500/10 to-transparent", cover: coverEcommerce, companyIcon: logoLumoshive, companyName: "Lumoshive" },
  { tech: ["JavaScript", "HTML", "CSS", "Bootstrap", "PHP"], github: null, live: null, gradient: "from-sky-500/20 via-indigo-500/10 to-transparent", cover: coverRessortHotel, companyIcon: null, companyName: null },
  { tech: ["React", "JavaScript", "Tailwind CSS"], github: "https://github.com/rulifcode/furniture-react-landing-page", live: "https://furniture-react-landing-page-rulif.vercel.app/", gradient: "from-amber-500/20 via-orange-500/10 to-transparent", cover: coverFurniture, companyIcon: null, companyName: null },
  { tech: ["React", "CSS", "REST API"], github: "https://github.com/rulifcode/mp-food-recipe-api", live: "https://mp-food-recipe-api.vercel.app/", gradient: "from-rose-500/20 via-pink-500/10 to-transparent", cover: coverRecipe, companyIcon: null, companyName: null },
  { tech: ["PHP", "MySQLi", "HTML", "CSS"], github: "https://github.com/rulifcode/Perpustakaan_Online-Native_PHP_Mysqli", live: null, gradient: "from-violet-500/20 via-purple-500/10 to-transparent", cover: coverLitera, companyIcon: null, companyName: null },
  { tech: ["React", "Firebase", "CSS"], github: "https://github.com/rulifcode/react-ecommerce-firebase", live: null, gradient: "from-emerald-500/20 via-teal-500/10 to-transparent", cover: null, companyIcon: null, companyName: null },
  { tech: ["WordPress", "WooCommerce", "PHP", "MySQL", "SEO", "Figma"], github: null, live: "https://id.gaotek.com/", gradient: "from-orange-500/20 via-yellow-500/10 to-transparent", cover: coverGaotek, companyIcon: logoGaotek, companyName: "Gaotek" },
];

/* ================================================================
   Constants
   ================================================================ */
const CARDS_PER_SLIDE = 4;
const AUTO_SLIDE_MS = 4000;

/* ================================================================
   ProjectGroup — collapsed carousel ↔ expanded full grid
   ================================================================ */
function ProjectGroup({ label, description, projects, dark, viewAllLabel, showLessLabel }) {
  const [expanded, setExpanded] = useState(false);

  const hasExtra = projects.length > CARDS_PER_SLIDE;

  const carousel = useCarousel(
    projects.length,
    CARDS_PER_SLIDE,
    AUTO_SLIDE_MS,
    !expanded && hasExtra,   // only auto-slide when collapsed
  );

  // reset slide when collapsing
  useEffect(() => {
    if (!expanded) carousel.resetSlide();
  }, [expanded]);

  /* ── which cards to render ──────────────────────────────────── */
  const displayCards = expanded
    ? projects
    : projects.slice(
      carousel.slideIndex * CARDS_PER_SLIDE,
      carousel.slideIndex * CARDS_PER_SLIDE + CARDS_PER_SLIDE,
    );

  return (
    <div className="space-y-5">
      {/* ── Group Header ─────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="space-y-1">
          <h3 className={`text-xl font-bold ${dark ? "text-white/90" : "text-gray-900"}`}>
            {label}
          </h3>
          <p className={`text-xs max-w-lg ${dark ? "text-white/40" : "text-gray-500"}`}>
            {description}
          </p>
        </div>

        {/* Prev / dots / Next — only in collapsed mode */}
        {!expanded && hasExtra && (
          <div
            className="flex items-center gap-2"
            onMouseEnter={() => carousel.setIsPaused(true)}
            onMouseLeave={() => carousel.setIsPaused(false)}
          >
            <NavButton dark={dark} onClick={carousel.goPrev} direction="prev" />

            <div className="flex items-center gap-1.5">
              {Array.from({ length: carousel.totalSlides }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => carousel.goTo(i)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${i === carousel.slideIndex
                      ? `w-6 h-2 ${dark ? "bg-white/70" : "bg-gray-700"}`
                      : `w-2 h-2 ${dark ? "bg-white/20 hover:bg-white/40" : "bg-gray-300 hover:bg-gray-400"}`
                    }`}
                />
              ))}
            </div>

            <NavButton dark={dark} onClick={carousel.goNext} direction="next" />
          </div>
        )}
      </div>

      {/* ── Cards Grid ───────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => carousel.setIsPaused(true)}
        onMouseLeave={() => carousel.setIsPaused(false)}
      >
        <div
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5"
          key={expanded ? "expanded" : `slide-${carousel.slideIndex}`}
          style={{
            animation: expanded
              ? "expandGrid 0.5s cubic-bezier(0.4,0,0.2,1) both"
              : "fadeSlideIn 0.4s cubic-bezier(0.4,0,0.2,1) both",
          }}
        >
          {displayCards.map((project) => (
            <ProjectCard key={project.title} dark={dark} {...project} />
          ))}
        </div>
      </div>

      {/* ── Dynamic Toggle Button ────────────────────────────── */}
      {hasExtra && (
        <div className="flex justify-center">
          <button
            onClick={() => setExpanded((v) => !v)}
            className={`group flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-medium transition-all duration-300 cursor-pointer ${dark
                ? "border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/80 hover:bg-white/[0.06]"
                : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300 hover:text-gray-800 hover:bg-gray-100"
              }`}
          >
            {expanded ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6" /></svg>
                {showLessLabel}
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-0.5 transition-transform duration-200"><path d="M6 9l6 6 6-6" /></svg>
                {`${viewAllLabel} (${projects.length})`}
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

/* ================================================================
   NavButton — small prev/next circle
   ================================================================ */
function NavButton({ dark, onClick, direction }) {
  const isNext = direction === "next";
  return (
    <button
      onClick={onClick}
      aria-label={isNext ? "Next" : "Previous"}
      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${dark
          ? "border-white/15 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
          : "border-gray-200 bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
        }`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d={isNext ? "M9 18l6-6-6-6" : "M15 18l-6-6 6-6"} />
      </svg>
    </button>
  );
}

/* ================================================================
   Projects — main page component
   ================================================================ */
export default function Projects({ dark }) {
  const { lang } = useLang();
  const t = TRANSLATIONS[lang];

  const vodjoProjects = t.vodjo.map((p, i) => ({ ...p, ...VODJO_META[i] }));
  const devProjects = t.development.map((p, i) => ({ ...p, ...DEV_META[i] }));

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`h-px flex-1 bg-gradient-to-r from-transparent ${dark ? "via-white/10" : "via-gray-200"} to-transparent`} />
            <span className={`text-[10px] tracking-widest uppercase font-medium ${dark ? "text-white/30" : "text-gray-400"}`}>
              {t.tagline}
            </span>
            <div className={`h-px flex-1 bg-gradient-to-r from-transparent ${dark ? "via-white/10" : "via-gray-200"} to-transparent`} />
          </div>
          <h2 className={`text-4xl font-bold text-center ${dark ? "text-white/90" : "text-gray-900"}`}>
            {t.title}
          </h2>
          <p className={`text-center text-sm max-w-md mx-auto ${dark ? "text-white/40" : "text-gray-500"}`}>
            {t.subtitle}
          </p>
        </div>

        {/* ── Vodjo Group ──────────────────────────────────────── */}
        <ProjectGroup
          label={t.groupLabels.vodjo}
          description={t.groupDescs.vodjo}
          projects={vodjoProjects}
          dark={dark}
          viewAllLabel={t.viewAll}
          showLessLabel={t.showLess}
        />

        {/* Divider */}
        <div className={`h-px bg-gradient-to-r from-transparent ${dark ? "via-white/8" : "via-gray-200"} to-transparent`} />

        {/* ── Development Group ─────────────────────────────────── */}
        <ProjectGroup
          label={t.groupLabels.development}
          description={t.groupDescs.development}
          projects={devProjects}
          dark={dark}
          viewAllLabel={t.viewAll}
          showLessLabel={t.showLess}
        />

        {/* Footer CTA */}
        <div className="flex justify-center pt-4">
          <a
            href="https://github.com/rulifcode"
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-2 px-6 py-3 rounded-full border text-sm transition-all duration-300 ${dark
                ? "border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/80 hover:bg-white/[0.06]"
                : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300 hover:text-gray-800 hover:bg-gray-100"
              }`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            {t.cta}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform duration-200">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes expandGrid {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}