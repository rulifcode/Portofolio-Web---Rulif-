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
import coverLanatory from "../assets/LAnatori.png";
import coverRessortHotel from "../assets/aureviacover.png";
import coverLitera from "../assets/Litera-perpustakaan.png";
import coverCRUD from "../assets/crud_project_react_axios.png";
import coverHotel from "../assets/Laravel_AureviaHotel_Dashboard.png";
import coverIndustrix from "../assets/industrix_todo.png";
import logoVodjo from "../assets/vodjo.webp";
import logoLumoshive from "../assets/lumoshive.png";
import logoGaotek from "../assets/GAOTek.png";

function TechBadge({ name, dark }) {
  const iconUrl = TECH_ICON_MAP[name];

  if (iconUrl) {
    return (
      <span
        title={name}
        className={`inline-flex items-center justify-center w-6 h-6 rounded-md border transition-all duration-200 ${dark
          ? "border-white/10 bg-white/5 hover:bg-white/10"
          : "border-gray-200 bg-gray-50 hover:bg-gray-100"
          }`}
      >
        <img
          src={iconUrl}
          alt={name}
          className="w-3.5 h-3.5 object-contain"
          loading="lazy"
          onError={(e) => {
            // fallback to text if image fails
            e.currentTarget.parentElement.outerHTML = `<span class="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border ${dark
              ? "border-white/10 bg-white/5 text-white/40"
              : "border-gray-200 bg-gray-50 text-gray-400"
              }">${name}</span>`;
          }}
        />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border transition-all duration-200 ${dark
        ? "border-white/10 bg-white/5 text-white/40"
        : "border-gray-200 bg-gray-50 text-gray-400"
        }`}
    >
      {name}
    </span>
  );
}

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
      { title: "Ngafal Ngefeel", description: "Ngafal Ngefeel is a cross-platform mobile application available on Android and iOS, designed to support Quran memorization and Islamic learning activities through a modern digital experience. The platform provides features such as Quran memorization guidance, tadabbur sessions, Islamic events, podcasts, chat functionality, and learning programs including Kelas NN Reguler, Community, and NB. The ecosystem is supported by a CMS dashboard system for content management, user administration, and program monitoring to ensure efficient platform operations and user engagement." },
      { title: "Gana Konsultan Indonesia", description: "GKI is a company profile website developed using WordPress to represent the company’s professional services and digital presence. The website was designed with a responsive and user-friendly interface, focusing on clear information delivery, modern visual presentation, and optimized performance to enhance company branding and online accessibility." },
      { title: "PT. Polytama Propindo", description: "PT. Polytama Propindo is one of Indonesia’s leading petrochemical companies specializing in the production of polypropylene resin for various industrial applications. The company supports multiple sectors including packaging, automotive, household products, and consumer goods through high-quality polymer manufacturing and sustainable industrial operations." },
      { title: "TMS Daihatsu", description: "TMS Daihatsu is a WordPress-based automotive sales website developed to showcase vehicle products, promotions, and dealership services through a modern digital platform. The website focuses on providing an informative and user-friendly experience for customers looking for Daihatsu vehicle information, consultation, and purchasing services with responsive design and optimized accessibility across devices." },
      { title: "PPID BNPP RI", description: "PPID BNPP is a web-based information system developed to support public information services and digital communication for Badan Nasional Pengelola Perbatasan (BNPP). The platform features a company profile website, submission management flow, dashboard monitoring system, and CMS for content management. Built with a focus on responsive UI, usability, and efficient information delivery to support organizational transparency and public access to information." },
      { title: "Total Buah Store", description: "TBS is a digital commerce brand focused on providing fresh fruit products and healthy lifestyle solutions through modern online platforms. The brand aims to simplify customer access to high-quality fresh products with a seamless shopping experience across mobile applications, website platforms, and integrated digital services." },
      { title: "La Natory Lombok", description: "LA NOTARY is a landing page and company profile website developed to represent professional notary and legal services through a modern and informative digital platform. The website focuses on delivering clear service information, strengthening company branding, and improving client accessibility with a responsive and user-friendly interface." },
    ],
    development: [
      { title: "Rulif Taskify Movie", description: "Personal project — a movie discovery app built with Next.js, Node.js, Firebase, and Tailwind CSS. Integrates TMDB API with SSG, server-side streaming via Vidsrc, and Framer Motion animations." },
      { title: "E-Commerce App (Tim Ubuntu)", description: "Lumoshive bootcamp batch III final project — a fullstack e-commerce app with authentication, product management, shopping cart, and checkout features." },
      { title: "Aurevia Hotel — Frontend Next.js", description: "A hotel reservation frontend built with Next.js 14, Tailwind CSS, and Laravel API integration. Features room catalog, booking form with real-time price summary, dynamic banners, and responsive elegant UI." },
      { title: "Furniture Landing Page", description: "A modern landing page for a furniture brand with elegant design, smooth animations, and a fully responsive layout." },
      { title: "Food Recipe App", description: "A food recipe app integrated with an external API, displaying various recipes with search and category filter features." },
      { title: "Perpustakaan Online", description: "A digital library management system built with Native PHP & MySQLi, featuring book borrowing, member management, and reporting." },
      { title: "Gaotek Inc — Web WordPress", description: "Developed and maintained the Gaotek Indonesia website. Handled theme updates, SEO optimization, WooCommerce product data via Excel, and UI slicing based on Figma designs." },
      { title: "CRUD React.js & Axios", description: "A responsive product management web application built with React 18, Vite, and Tailwind CSS. Implements CRUD operations, search, filtering, and pagination using FakeStore API. Structured using a Container/Presentational architecture with custom hooks for data fetching, filtering, and state management." },
      { title: "Backend Laravel CMS Dashboard Aurevia Hotel", description: "CMS dashboard & REST API for a web-based hotel management system. Built with Laravel 12, equipped with role-based access control (Admin & Receptionist), media upload via Cloudinary, and consumed by the Next.js frontend." },
      {
        title: "Industrix Todo", description: "A full-stack todo app built with Go (Gin, GORM), React 18 (TypeScript), and PostgreSQL. Features CRUD, pagination, filtering, category management, and Docker support."
      },
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
      { title: "Ngafal Ngefeel", description: "Ngafal Ngefeel adalah aplikasi seluler lintas platform yang tersedia di Android dan iOS, dirancang untuk mendukung hafalan Al-Quran dan kegiatan pembelajaran Islam melalui pengalaman digital modern. Platform ini menyediakan fitur-fitur seperti panduan hafalan Al-Quran, sesi tadabbur, acara Islami, podcast, fungsi obrolan, dan program pembelajaran termasuk Kelas NN Reguler, Komunitas, dan NB. Ekosistem ini didukung oleh sistem dasbor CMS untuk manajemen konten, administrasi pengguna, dan pemantauan program untuk memastikan operasi platform yang efisien dan keterlibatan pengguna." },
      { title: "Gana Konsultan Indonesia", description: "GKI adalah situs web profil perusahaan yang dikembangkan menggunakan WordPress untuk mewakili layanan profesional dan kehadiran digital perusahaan. Situs web ini dirancang dengan antarmuka yang responsif dan ramah pengguna, berfokus pada penyampaian informasi yang jelas, presentasi visual modern, dan kinerja yang dioptimalkan untuk meningkatkan branding perusahaan dan aksesibilitas online." },
      { title: "PT. Polytama Propindo", description: "PT. Polytama Propindo adalah salah satu perusahaan petrokimia terkemuka di Indonesia yang mengkhususkan diri dalam produksi resin polipropilena untuk berbagai aplikasi industri. Perusahaan ini mendukung berbagai sektor termasuk pengemasan, otomotif, produk rumah tangga, dan barang konsumsi melalui manufaktur polimer berkualitas tinggi dan operasi industri yang berkelanjutan." },
      { title: "TMS Daihatsu", description: "TMS Daihatsu adalah situs web penjualan otomotif berbasis WordPress yang dikembangkan untuk menampilkan produk kendaraan, promosi, dan layanan dealer melalui platform digital modern. Situs web ini berfokus pada penyediaan pengalaman yang informatif dan ramah pengguna bagi pelanggan yang mencari informasi kendaraan Daihatsu, konsultasi, dan layanan pembelian dengan desain responsif dan aksesibilitas yang dioptimalkan di berbagai perangkat." },
      { title: "BNPP RI", description: "PPID BNPP adalah sistem informasi berbasis web yang dikembangkan untuk mendukung layanan informasi publik dan komunikasi digital untuk Badan Nasional Pengelola (BNPP). Platform ini memiliki fitur situs web profil perusahaan, alur manajemen pengajuan, sistem pemantauan dasbor, dan CMS untuk manajemen konten. Dibangun dengan fokus pada UI responsif, kemudahan penggunaan, dan penyampaian informasi yang efisien untuk mendukung transparansi organisasi dan akses publik terhadap informasi." },
      { title: "Total Buah Store", description: "TBS adalah merek perdagangan digital yang berfokus pada penyediaan produk buah segar dan solusi gaya hidup sehat melalui platform online modern. Merek ini bertujuan untuk menyederhanakan akses pelanggan ke produk segar berkualitas tinggi dengan pengalaman belanja yang lancar melalui aplikasi seluler, platform situs web, dan layanan digital terintegrasi." },
      { title: "La Natory Lombok", description: "LA NOTARY adalah halaman arahan dan situs web profil perusahaan yang dikembangkan untuk mewakili layanan notaris dan hukum profesional melalui platform digital yang modern dan informatif. Situs web ini berfokus pada penyampaian informasi layanan yang jelas, memperkuat citra merek perusahaan, dan meningkatkan aksesibilitas klien dengan antarmuka yang responsif dan ramah pengguna." },
    ],
    development: [
      { title: "Rulif Taskify Movie", description: "Proyek personal — aplikasi pencarian film berbasis Next.js, Node.js, Firebase, dan Tailwind CSS. Mengintegrasikan TMDB API dengan SSG, server-side streaming via Vidsrc, dan animasi Framer Motion." },
      { title: "E-Commerce App (Tim Ubuntu)", description: "Final project bootcamp Lumoshive batch III — aplikasi e-commerce fullstack dengan fitur autentikasi, manajemen produk, keranjang belanja, dan checkout." },
      { title: "Aurevia Hotel — Frontend Next.js", description: "Frontend pemesanan hotel berbasis Next.js 14 dan Tailwind CSS, terintegrasi dengan Laravel API. Fitur katalog kamar, form booking dengan ringkasan harga real-time, banner dinamis, dan UI responsif yang elegan." },
      { title: "Furniture Landing Page", description: "Landing page modern untuk brand furniture dengan desain elegan, animasi smooth, dan layout yang sepenuhnya responsif." },
      { title: "Food Recipe App", description: "Aplikasi resep makanan yang terintegrasi dengan API eksternal, menampilkan berbagai resep dengan fitur pencarian dan filter kategori." },
      { title: "Perpustakaan Online", description: "Sistem manajemen perpustakaan digital berbasis Native PHP & MySQLi, dengan fitur peminjaman buku, manajemen anggota, dan pelaporan." },
      { title: "Gaotek Inc — Web WordPress", description: "Mengembangkan dan memelihara website Gaotek Indonesia. Menangani pembaruan tema, optimasi SEO, data produk WooCommerce via Excel, dan slicing UI berdasarkan desain Figma." },
      { title: "CRUD React.js & Axios", description: "Aplikasi manajemen produk responsif yang dibangun menggunakan React 18, Vite, dan Tailwind CSS. Mengimplementasikan fitur CRUD, pencarian, filtering, dan pagination menggunakan FakeStore API. Disusun menggunakan arsitektur Container/Presentational dengan custom hooks untuk pengelolaan data, filtering, dan state management." },
      { title: "Backend Laravel CMS Dashboard Aurevia Hotel", description: "CMS dashboard & REST API untuk sistem manajemen hotel berbasis web. Dibangun dengan Laravel 12, dilengkapi role-based access control (Admin & Resepsionis), upload media via Cloudinary, dan dikonsumsi oleh frontend Next.js." },
      { title: "Industrix Todo", description: "Aplikasi todo full-stack dengan Go (Gin, GORM), React 18 (TypeScript), dan PostgreSQL. Fitur CRUD, pagination, filtering, manajemen kategori, dan dukungan Docker."
      }
    ],
  },
};

/* ── Shared meta ────────────────────────────────────────────────── */
const VODJO_META = [
  { tech: ["Cypress", "Playwright", "Postman", "Agile", "iOS", "Android","Figma"], github: null, live: "https://play.google.com/store/apps/details?id=com.nn.ngafalngefeel", gradient: "from-teal-500/20 via-cyan-500/10 to-transparent", cover: coverNgafal, companyIcon: logoVodjo, companyName: "Vodjo", category: "qa" },
  { tech: [ "Cypress", "Playwright", "Postman", "Agile", "Manual Testing","Figma"], github: null, live: "https://ganakonsultan.com/", gradient: "from-lime-500/20 via-green-500/10 to-transparent", cover: coverGana, companyIcon: logoVodjo, companyName: "Vodjo", category: "qa" },
  { tech: ["CMS", "Cypress", "Playwright", "Postman", "Manual Testing", "Agile", "Figma"], github: null, live: "https://crm.masplene.com/dashboard", gradient: "from-blue-500/20 via-sky-500/10 to-transparent", cover: coverPolytama, companyIcon: logoVodjo, companyName: "Vodjo", category: "qa" },
  { tech: ["Cypress", "Playwright", "Postman", "Bug Report", "Agile", "Figma"], github: null, live: "https://www.tmsdaihatsu.co.id/", gradient: "from-red-500/20 via-orange-500/10 to-transparent", cover: coverDaihatsu, companyIcon: logoVodjo, companyName: "Vodjo", category: "qa" },
  { tech: ["Cypress", "Playwright", "Postman", "Test Case", "Bug Report", "Agile", "Figma"], github: null, live: "https://bnpp.go.id/", gradient: "from-indigo-500/20 via-blue-500/10 to-transparent", cover: coverBNPP, companyIcon: logoVodjo, companyName: "Vodjo", category: "qa" },
  { tech: ["Mobile", "Cypress", "Playwright", "Postman", "Test Case", "Agile", "Figma"], github: null, live: null, gradient: "from-pink-500/20 via-rose-500/10 to-transparent", cover: coverTotalBuah, companyIcon: logoVodjo, companyName: "Vodjo", category: "qa" },
  { tech: ["Mobile", "Cypress", "Playwright", "Postman", "Test Case", "Agile", "Figma"], github: null, live: "https://lomboknotary.com/", gradient: "from-brown-500/20 via-rose-500/10 to-transparent", cover: coverLanatory, companyIcon: logoVodjo, companyName: "Vodjo", category: "qa" },
];

const DEV_META = [
  { tech: ["Next.js", "Node.js", "Firebase", "Tailwind CSS", "Framer Motion", "TMDB API"], github: "https://github.com/rulifcode/ruliftaskify-movie", live: "https://ruliftaskify-movie.vercel.app/", gradient: "from-purple-500/20 via-violet-500/10 to-transparent", cover: coverTaskify, companyIcon: null, companyName: null, category: "dev" },
  { tech: ["React.js", "JavaScript", "Tailwind CSS", "Figma"], github: "https://github.com/lumoshive-final-project-batch-III/Frontend-project-app-ecommerce-frontend-tim-Ubuntu", live: "https://frontend-project-app-ecommerce-fron.vercel.app/", gradient: "from-blue-500/20 via-cyan-500/10 to-transparent", cover: coverEcommerce, companyIcon: logoLumoshive, companyName: "Lumoshive", category: "dev" },
  { tech: ["Next.js", "Tailwind CSS", "Laravel", "TypeScript", "Figma"], github: "https://github.com/rulifcode/Frontend_NextJS_Hotel", live: "https://aurevia-nextjs.vercel.app/", gradient: "from-sky-500/20 via-indigo-500/10 to-transparent", cover: coverRessortHotel, companyIcon: null, companyName: null, category: "dev" },
  { tech: ["React.js", "JavaScript", "Tailwind CSS", "Figma"], github: "https://github.com/rulifcode/furniture-react-landing-page", live: "https://furniture-react-landing-page-rulif.vercel.app/", gradient: "from-amber-500/20 via-orange-500/10 to-transparent", cover: coverFurniture, companyIcon: null, companyName: null, category: "dev" },
  { tech: ["React.js", "CSS", "REST API"], github: "https://github.com/rulifcode/mp-food-recipe-api", live: "https://mp-food-recipe-api.vercel.app/", gradient: "from-rose-500/20 via-pink-500/10 to-transparent", cover: coverRecipe, companyIcon: null, companyName: null, category: "dev" },
  { tech: ["PHP", "MySQL", "HTML", "CSS", "Figma"], github: "https://github.com/rulifcode/Perpustakaan_Online-Native_PHP_Mysqli", live: null, gradient: "from-violet-500/20 via-purple-500/10 to-transparent", cover: coverLitera, companyIcon: null, companyName: null, category: "dev" },
  { tech: ["WordPress", "WooCommerce", "PHP", "MySQL", "SEO", "Figma"], github: null, live: "https://id.gaotek.com/", gradient: "from-orange-500/20 via-yellow-500/10 to-transparent", cover: coverGaotek, companyIcon: logoGaotek, companyName: "Gaotek", category: "dev" },
  { tech: ["React.js", "Axios", "Custom Hooks", "Tailwind CSS", "Figma"], github: "https://github.com/rulifcode/mp-crud-react-axios", live: "https://mp-crud-react-axios.vercel.app/", gradient: "from-orange-500/20 via-yellow-500/10 to-transparent", cover: coverCRUD, companyIcon: null, companyName: null, category: "dev" },
  { tech: ["Laravel 12", "MySQL", "Blade", "Tailwind CSS", "Cloudinary", "PHP", "REST API"], github: "https://github.com/rulifcode/Backend_Laravel_Hotel", live: null, gradient: "from-orange-500/20 via-amber-500/10 to-transparent", cover: coverHotel, companyIcon: null, companyName: null, category: "dev" },
  {
    tech: ["Go", "React.js", "TypeScript", "PostgreSQL", "Docker", "Tailwind CSS"], github: "https://github.com/rulifcode/industrix-todo", live: null, gradient: "from-emerald-500/20 via-teal-500/10 to-transparent", cover: coverIndustrix, companyIcon: null, companyName: null, category: "dev"
  },
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