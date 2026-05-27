import { useState, useEffect, useCallback, useRef } from "react";
import ProjectCard from "../components/ProjectCard";
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
import coverRessortHotel from "../assets/aureviacover.png";
import coverLitera from "../assets/Litera-perpustakaan.png";
import coverCRUD from "../assets/crud_project_react_axios.png";
import coverHotel from "../assets/Laravel_AureviaHotel_Dashboard.png";
import logoVodjo from "../assets/vodjo.webp";
import logoLumoshive from "../assets/lumoshive.png";
import logoGaotek from "../assets/GAOTek.png";


/* ================================================================
   TRANSLATIONS
   ================================================================ */
const TRANSLATIONS = {
  EN: {
    tagline: "Portfolio",
    title: "My Projects",
    subtitle: "A collection of projects I've worked on — from web apps to management systems.",
    cta: "See all projects on GitHub",
    tabs: { all: "All", qa: "QA", dev: "Development" },
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
      { title: "Aurevia Hotel — Frontend Next.js", description: "A hotel reservation frontend built with Next.js 14, Tailwind CSS, and Laravel API integration. Features room catalog, booking form with real-time price summary, dynamic banners, and responsive elegant UI." },
      { title: "Furniture Landing Page", description: "A modern landing page for a furniture brand with elegant design, smooth animations, and a fully responsive layout." },
      { title: "Food Recipe App", description: "A food recipe app integrated with an external API, displaying various recipes with search and category filter features." },
      { title: "Perpustakaan Online", description: "A digital library management system built with Native PHP & MySQLi, featuring book borrowing, member management, and reporting." },
      { title: "Gaotek Inc — Web WordPress", description: "Developed and maintained the Gaotek Indonesia website. Handled theme updates, SEO optimization, WooCommerce product data via Excel, and UI slicing based on Figma designs." },
      { title: "CRUD React.js & Axios", description: "A responsive product management web application built with React 18, Vite, and Tailwind CSS. This project implements CRUD operations, search, filtering, and pagination using FakeStore API. The application is structured using a Container/Presentational architecture with custom hooks for data fetching, filtering, and state management to keep the code clean and maintainable." },
      { title: "Backend Laravel CMS Dashboard Aurevia Hotel", description: "CMS dashboard & REST API for a web-based hotel management system. Built with Laravel 12, equipped with role-based access control (Admin & Receptionist), media upload via Cloudinary, and consumed by the Next.js frontend" }
    ],
  },
  ID: {
    tagline: "Portofolio",
    title: "Proyek Saya",
    subtitle: "Kumpulan project yang pernah saya kerjakan — dari web app hingga sistem manajemen.",
    cta: "Lihat semua project di GitHub",
    tabs: { all: "Semua", qa: "QA", dev: "Development" },
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
      { title: "CMS dashboard & REST API for a web-based hotel management system. Built with Laravel 12, equipped with role-based access control (Admin & Receptionist), media upload via Cloudinary, and consumed by a Next.js frontend and a Flutter mobile app."}
    ],
    development: [
      { title: "Rulif Taskify Movie", description: "Personal project — aplikasi pencarian film berbasis Next.js, Node.js, Firebase, dan Tailwind CSS." },
      { title: "E-Commerce App (Tim Ubuntu)", description: "Final project bootcamp Lumoshive batch III — aplikasi e-commerce fullstack." },
      { title: "Aurevia Hotel — Frontend Next.js", description: "Frontend pemesanan hotel berbasis Next.js 14 dan Tailwind CSS, terintegrasi dengan Laravel API." },
      { title: "Furniture Landing Page", description: "Landing page modern untuk brand furniture dengan desain elegan dan animasi smooth." },
      { title: "Food Recipe App", description: "Aplikasi resep makanan yang terintegrasi dengan API eksternal." },
      { title: "Perpustakaan Online", description: "Sistem manajemen perpustakaan digital berbasis Native PHP & MySQLi." },
      { title: "Gaotek Inc — Web WordPress", description: "Mengembangkan dan memelihara website Gaotek Indonesia." },
      { title: "CRUD React.js & Axios", description: "Aplikasi manajemen produk responsif yang dibangun menggunakan React 18, Vite, dan Tailwind CSS. Project ini mengimplementasikan fitur CRUD, pencarian, filtering, dan pagination menggunakan FakeStore API. Aplikasi disusun menggunakan arsitektur Container/Presentational serta custom hooks untuk pengelolaan data, filtering, dan state management agar kode tetap rapi dan mudah dikembangkan." },
      { title: "Backend Laravel CMS DAshboard Aurevia Hotal", description: "CMS dashboard & REST API untuk sistem manajemen hotel berbasis web. Dibangun dengan Laravel 12, dilengkapi role-based access control (Admin & Resepsionis), upload media via Cloudinary, dan dikonsumsi oleh frontend Next.js" }
    ]
  },
};

/* ── Shared meta ────────────────────────────────────────────────── */
const VODJO_META = [
  { tech: ["Cypress", "Playwright", "Postman", "Agile", "iOS", "Android"], github: null, live: "https://play.google.com/store/apps/details?id=com.nn.ngafalngefeel", gradient: "from-teal-500/20 via-cyan-500/10 to-transparent", cover: coverNgafal, companyIcon: logoVodjo, companyName: "Vodjo", category: "qa" },
  { tech: ["WordPress", "Postman", "Agile", "Manual Testing"], github: null, live: "https://ganakonsultan.com/", gradient: "from-lime-500/20 via-green-500/10 to-transparent", cover: coverGana, companyIcon: logoVodjo, companyName: "Vodjo", category: "qa" },
  { tech: ["CMS", "Postman", "Manual Testing", "Agile"], github: null, live: "https://crm.masplene.com/dashboard", gradient: "from-blue-500/20 via-sky-500/10 to-transparent", cover: coverPolytama, companyIcon: logoVodjo, companyName: "Vodjo", category: "qa" },
  { tech: ["WordPress", "Manual Testing", "Bug Report", "Agile"], github: null, live: "https://www.tmsdaihatsu.co.id/", gradient: "from-red-500/20 via-orange-500/10 to-transparent", cover: coverDaihatsu, companyIcon: logoVodjo, companyName: "Vodjo", category: "qa" },
  { tech: ["Manual Testing", "Test Case", "Bug Report", "Agile"], github: null, live: null, gradient: "from-indigo-500/20 via-blue-500/10 to-transparent", cover: coverBNPP, companyIcon: logoVodjo, companyName: "Vodjo", category: "qa" },
  { tech: ["Android", "Manual Testing", "Test Case", "Agile"], github: null, live: null, gradient: "from-pink-500/20 via-rose-500/10 to-transparent", cover: coverTotalBuah, companyIcon: logoVodjo, companyName: "Vodjo", category: "qa" },
];

const DEV_META = [
  { tech: ["Next.js", "Node.js", "Firebase", "Tailwind CSS", "Framer Motion", "TMDB API"], github: "https://github.com/rulifcode/ruliftaskify-movie", live: "https://ruliftaskify-movie.vercel.app/", gradient: "from-purple-500/20 via-violet-500/10 to-transparent", cover: coverTaskify, companyIcon: null, companyName: null, category: "dev" },
  { tech: ["React.js", "JavaScript", "Tailwind CSS"], github: "https://github.com/lumoshive-final-project-batch-III/Frontend-project-app-ecommerce-frontend-tim-Ubuntu", live: "https://frontend-project-app-ecommerce-fron.vercel.app/", gradient: "from-blue-500/20 via-cyan-500/10 to-transparent", cover: coverEcommerce, companyIcon: logoLumoshive, companyName: "Lumoshive", category: "dev" },
  { tech: ["Next.js", "Tailwind CSS", "Laravel API", "TypeScript"], github: "https://github.com/rulifcode/Frontend_NextJS_Hotel", live: "https://aurevia-nextjs.vercel.app/", gradient: "from-sky-500/20 via-indigo-500/10 to-transparent", cover: coverRessortHotel, companyIcon: null, companyName: null, category: "dev" },
  { tech: ["React.js", "JavaScript", "Tailwind CSS"], github: "https://github.com/rulifcode/furniture-react-landing-page", live: "https://furniture-react-landing-page-rulif.vercel.app/", gradient: "from-amber-500/20 via-orange-500/10 to-transparent", cover: coverFurniture, companyIcon: null, companyName: null, category: "dev" },
  { tech: ["React.js", "CSS", "REST API"], github: "https://github.com/rulifcode/mp-food-recipe-api", live: "https://mp-food-recipe-api.vercel.app/", gradient: "from-rose-500/20 via-pink-500/10 to-transparent", cover: coverRecipe, companyIcon: null, companyName: null, category: "dev" },
  { tech: ["PHP", "MySQLi", "HTML", "CSS"], github: "https://github.com/rulifcode/Perpustakaan_Online-Native_PHP_Mysqli", live: null, gradient: "from-violet-500/20 via-purple-500/10 to-transparent", cover: coverLitera, companyIcon: null, companyName: null, category: "dev" },
  { tech: ["WordPress", "WooCommerce", "PHP", "MySQL", "SEO", "Figma"], github: null, live: "https://id.gaotek.com/", gradient: "from-orange-500/20 via-yellow-500/10 to-transparent", cover: coverGaotek, companyIcon: logoGaotek, companyName: "Gaotek", category: "dev" },
  { tech: ["React.js", "Axios", "Custom Hooks", "Tailwind CSS"], github: "https://github.com/rulifcode/mp-crud-react-axios", live: "https://mp-crud-react-axios.vercel.app/", gradient: "from-orange-500/20 via-yellow-500/10 to-transparent", cover: coverCRUD, companyIcon: null, companyName: null, category: "dev" },
  {
    tech: ["Laravel 12", "MySQL", "Blade", "Tailwind CSS", "Cloudinary", "PHP", "REST API"], github: "https://github.com/rulifcode/Backend_Laravel_Hotel", live: null, gradient: "from-orange-500/20 via-amber-500/10 to-transparent", cover: coverHotel, companyIcon: null, companyName: null, category: "dev", title: "Aurevia Hotel CMS",
    description: "Full-stack hotel management system with role-based CMS dashboard and REST API. Built with Laravel 12, supports image/video banner sliders via Cloudinary, and consumed by a Next.js frontend and Flutter mobile app."
  }
];

/* ================================================================
   useCarousel
   ================================================================ */
function useCarousel(totalItems, perSlide = 4, intervalMs = 4000, enabled = true) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const totalSlides = Math.max(1, Math.ceil(totalItems / perSlide));
  const goPrev = useCallback(() => setSlideIndex((p) => (p - 1 + totalSlides) % totalSlides), [totalSlides]);
  const goNext = useCallback(() => setSlideIndex((p) => (p + 1) % totalSlides), [totalSlides]);
  const goTo = useCallback((i) => setSlideIndex(i), []);
  const resetSlide = useCallback(() => setSlideIndex(0), []);
  useEffect(() => {
    if (!enabled || isPaused || totalSlides <= 1) return;
    timerRef.current = setInterval(goNext, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [enabled, isPaused, totalSlides, goNext, intervalMs]);
  return { slideIndex, totalSlides, goPrev, goNext, goTo, isPaused, setIsPaused, resetSlide };
}

/* ================================================================
   Constants
   ================================================================ */
const CARDS_PER_SLIDE = 4;
const AUTO_SLIDE_MS = 4000;

/* ================================================================
   Tab Button
   ================================================================ */
function TabButton({ active, dark, onClick, children, count }) {
  const activeStyle = dark
    ? "bg-white/10 text-white border-white/20"
    : "bg-gray-900 text-white border-gray-900";
  const inactiveStyle = dark
    ? "bg-transparent text-white/40 border-white/10 hover:text-white/70 hover:border-white/20 hover:bg-white/5"
    : "bg-transparent text-gray-400 border-gray-200 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50";

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium transition-all duration-200 cursor-pointer ${active ? activeStyle : inactiveStyle}`}
    >
      {children}
      <span className={`text-[10px] px-1.5 py-0.5 rounded-full transition-all duration-200 ${active
        ? dark ? "bg-white/15 text-white/80" : "bg-white/20 text-white/90"
        : dark ? "bg-white/5 text-white/30" : "bg-gray-100 text-gray-400"
        }`}>
        {count}
      </span>
    </button>
  );
}

/* ================================================================
   NavButton
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
   ProjectGroup
   ================================================================ */
function ProjectGroup({ label, description, projects, dark, viewAllLabel, showLessLabel }) {
  const [expanded, setExpanded] = useState(false);
  const hasExtra = projects.length > CARDS_PER_SLIDE;

  const carousel = useCarousel(
    projects.length,
    CARDS_PER_SLIDE,
    AUTO_SLIDE_MS,
    !expanded && hasExtra,
  );

  useEffect(() => {
    if (!expanded) carousel.resetSlide();
  }, [expanded]);

  const displayCards = expanded
    ? projects
    : projects.slice(
      carousel.slideIndex * CARDS_PER_SLIDE,
      carousel.slideIndex * CARDS_PER_SLIDE + CARDS_PER_SLIDE,
    );

  if (projects.length === 0) return null;

  return (
    <div className="space-y-5">
      {/* Group Header */}
      <div className="flex items-start sm:items-center justify-between gap-4 flex-wrap">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className={`text-xl font-bold ${dark ? "text-white/90" : "text-gray-900"}`}>
              {label}
            </h3>
            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${dark ? "border-white/10 bg-white/5 text-white/40" : "border-gray-200 bg-gray-50 text-gray-400"
              }`}>
              {projects.length}
            </span>
          </div>
          <p className={`text-xs max-w-lg ${dark ? "text-white/40" : "text-gray-500"}`}>
            {description}
          </p>
        </div>

        {/* Carousel controls — collapsed only */}
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

      {/* Cards grid — 2 col mobile, 4 col desktop */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => carousel.setIsPaused(true)}
        onMouseLeave={() => carousel.setIsPaused(false)}
      >
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
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

      {/* Toggle button */}
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
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 15l-6-6-6 6" />
                </svg>
                {showLessLabel}
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-0.5 transition-transform duration-200">
                  <path d="M6 9l6 6 6-6" />
                </svg>
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
   Projects — main export
   ================================================================ */
export default function Projects({ dark }) {
  const { lang } = useLang();
  const t = TRANSLATIONS[lang];
  const [activeTab, setActiveTab] = useState("all");

  const vodjoProjects = t.vodjo.map((p, i) => ({ ...p, ...VODJO_META[i] }));
  const devProjects = t.development.map((p, i) => ({ ...p, ...DEV_META[i] }));
  const allProjects = [...vodjoProjects, ...devProjects];
  const totalCount = allProjects.length;

  const showQA = activeTab === "all" || activeTab === "qa";
  const showDev = activeTab === "all" || activeTab === "dev";
  const showDivider = showQA && showDev;
  const dividerCls = dark ? "via-white/8" : "via-gray-200";

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

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

        {/* Tab Filter */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <TabButton active={activeTab === "all"} dark={dark} onClick={() => setActiveTab("all")} count={totalCount}>
            {t.tabs.all}
          </TabButton>
          <TabButton active={activeTab === "qa"} dark={dark} onClick={() => setActiveTab("qa")} count={vodjoProjects.length}>
            <span className={`w-1.5 h-1.5 rounded-full ${activeTab === "qa" ? "bg-emerald-400" : dark ? "bg-white/20" : "bg-gray-300"} transition-colors duration-200`} />
            {t.tabs.qa}
          </TabButton>
          <TabButton active={activeTab === "dev"} dark={dark} onClick={() => setActiveTab("dev")} count={devProjects.length}>
            <span className={`w-1.5 h-1.5 rounded-full ${activeTab === "dev" ? "bg-blue-400" : dark ? "bg-white/20" : "bg-gray-300"} transition-colors duration-200`} />
            {t.tabs.dev}
          </TabButton>
        </div>

        {/* Content */}
        <div
          className="space-y-12"
          key={activeTab}
          style={{ animation: "fadeSlideIn 0.35s cubic-bezier(0.4,0,0.2,1) both" }}
        >
          {showQA && (
            <ProjectGroup
              label={t.groupLabels.vodjo}
              description={t.groupDescs.vodjo}
              projects={vodjoProjects}
              dark={dark}
              viewAllLabel={t.viewAll}
              showLessLabel={t.showLess}
            />
          )}
          {showDivider && (
            <div className={`h-px bg-gradient-to-r from-transparent ${dividerCls} to-transparent`} />
          )}
          {showDev && (
            <ProjectGroup
              label={t.groupLabels.development}
              description={t.groupDescs.development}
              projects={devProjects}
              dark={dark}
              viewAllLabel={t.viewAll}
              showLessLabel={t.showLess}
            />
          )}
        </div>

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