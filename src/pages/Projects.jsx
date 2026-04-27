import ProjectCard from "../components/ProjectCard";
import coverEcommerce from "../assets/1774056567909.jpg";
import coverFurniture from "../assets/Purple and Pink Gradient Modern Bold Mobile App Presentation.jpg";
import coverRecipe    from "../assets/Purple and Pink Gradient Modern Bold Mobile App Presentation (1).jpg";
// TODO: tambahkan cover image project baru di bawah ini
import coverTaskify   from "../assets/taskify-cover.jpg";
import coverGaotek    from "../assets/gaotek3.jpg";
import coverNgafal    from "../assets/NgafalNgefeel.png";
import coverGana      from "../assets/ganakonsultan.jpg";
import coverPolytama  from "../assets/polytama1.webp";
import coverDaihatsu  from "../assets/coverDaihatsu1.webp";
import coverBNPP      from "../assets/BNPP.png";
import coverTotalBuah from "../assets/TBS1.png";

import { useLang } from "../components/layout/Navbar";

import logoVodjo     from "../assets/vodjo.webp";
import logoLumoshive from "../assets/lumoshive.png";
import logoGaotek    from "../assets/gaotek.png";

const PROJECTS_TRANSLATIONS = {
  EN: {
    tagline: "Portfolio",
    title: "My Projects",
    subtitle: "A collection of projects I've worked on — from web apps to management systems.",
    cta: "See all projects on GitHub",
    projects: [
      // ── Personal ──────────────────────────────────────────────────────────
      {
        title: "Rulif Taskify Movie",
        description: "Personal project — a movie discovery app built with Next.js, Node.js, Firebase, and Tailwind CSS. Integrates TMDB API with SSG, server-side streaming via Vidsrc, and Framer Motion animations.",
      },
      // ── Lumoshive ─────────────────────────────────────────────────────────
      {
        title: "E-Commerce App (Tim Ubuntu)",
        description: "Lumoshive bootcamp batch III final project — a fullstack e-commerce app with authentication, product management, shopping cart, and checkout features.",
      },
      {
        title: "Start Up Match Making",
        description: "Lumoshive Academy mini project — a startup-investor matchmaking platform with matching features and company profiles.",
      },
      // ── Personal ──────────────────────────────────────────────────────────
      {
        title: "Furniture Landing Page",
        description: "A modern landing page for a furniture brand with elegant design, smooth animations, and a fully responsive layout.",
      },
      {
        title: "Food Recipe App",
        description: "A food recipe app integrated with an external API, displaying various recipes with search and category filter features.",
      },
      {
        title: "Perpustakaan Online",
        description: "A digital library management system built with Native PHP & MySQLi, featuring book borrowing, member management, and reporting.",
      },
      {
        title: "React E-Commerce Firebase",
        description: "A modern e-commerce platform with Firebase authentication, real-time product management, and a responsive UI.",
      },
      // ── Gaotek ────────────────────────────────────────────────────────────
      {
        title: "Gaotek Inc — Web WordPress",
        description: "Developed and maintained the Gaotek Indonesia website. Handled theme updates, SEO optimization, WooCommerce product data via Excel, and UI slicing based on Figma designs.",
      },
      // ── Vodjo ─────────────────────────────────────────────────────────────
      {
        title: "Ngafal Ngefeel",
        description: "QA for a mobile learning app (iOS & Android). Performed functional, API, and automation testing using Cypress, Playwright & Postman. Collected client feedback via web CMS using Agile methodology.",
      },
      {
        title: "Gana Konsultan Indonesia",
        description: "QA for a WordPress corporate website. Conducted functional testing, wrote test cases, reported bugs, and collaborated with the dev team in Agile sprints.",
      },
      {
        title: "PT. Polytama Propindo",
        description: "QA for an enterprise CMS managing petrochemical products, feedback, and operational reports. Wrote test cases, performed functional testing, and reported findings.",
      },
      {
        title: "TMS Daihatsu",
        description: "QA for a WordPress-based website. Performed functional testing, wrote detailed bug reports, and supported the dev team in fixing identified issues.",
      },
      {
        title: "BNPP RI",
        description: "Ongoing QA engagement for the official website of Badan Nasional Pengelola Perbatasan Republik Indonesia. Functional testing, test case creation, and bug reporting.",
      },
      {
        title: "Total Buah Store",
        description: "Ongoing QA for an Android mobile app. Performing functional testing, writing test cases, and collaborating with developers to ensure app quality.",
      },
    ],
  },

  ID: {
    tagline: "Portofolio",
    title: "Proyek Saya",
    subtitle: "Kumpulan project yang pernah saya kerjakan — dari web app hingga sistem manajemen.",
    cta: "Lihat semua project di GitHub",
    projects: [
      // ── Personal ──────────────────────────────────────────────────────────
      {
        title: "Rulif Taskify Movie",
        description: "Personal project — aplikasi pencarian film berbasis Next.js, Node.js, Firebase, dan Tailwind CSS. Mengintegrasikan TMDB API dengan SSG, streaming server via Vidsrc, dan animasi Framer Motion.",
      },
      // ── Lumoshive ─────────────────────────────────────────────────────────
      {
        title: "E-Commerce App (Tim Ubuntu)",
        description: "Final project bootcamp Lumoshive batch III — aplikasi e-commerce fullstack dengan fitur autentikasi, manajemen produk, keranjang belanja, dan checkout.",
      },
      {
        title: "Start Up Match Making",
        description: "Mini project Lumoshive Academy — platform penjodohan startup dengan investor, dilengkapi fitur matching dan profil perusahaan.",
      },
      // ── Personal ──────────────────────────────────────────────────────────
      {
        title: "Furniture Landing Page",
        description: "Landing page modern untuk brand furniture dengan desain elegan, animasi smooth, dan layout yang fully responsive.",
      },
      {
        title: "Food Recipe App",
        description: "Aplikasi resep makanan yang terintegrasi dengan API eksternal, menampilkan berbagai resep dengan fitur pencarian dan filter kategori.",
      },
      {
        title: "Perpustakaan Online",
        description: "Sistem manajemen perpustakaan digital berbasis Native PHP & MySQLi dengan fitur peminjaman buku, manajemen anggota, dan laporan.",
      },
      {
        title: "React E-Commerce Firebase",
        description: "Platform e-commerce modern dengan autentikasi Firebase, manajemen produk real-time, dan UI yang responsif.",
      },
      // ── Gaotek ────────────────────────────────────────────────────────────
      {
        title: "Gaotek Inc — Web WordPress",
        description: "Mengembangkan dan memelihara website Gaotek Indonesia. Menangani update tema, optimasi SEO, data produk WooCommerce via Excel, dan slicing UI berdasarkan desain Figma.",
      },
      // ── Vodjo ─────────────────────────────────────────────────────────────
      {
        title: "Ngafal Ngefeel",
        description: "QA untuk aplikasi belajar mobile (iOS & Android). Melakukan pengujian fungsional, API, dan otomasi menggunakan Cypress, Playwright & Postman. Mengumpulkan feedback klien via web CMS dengan metodologi Agile.",
      },
      {
        title: "Gana Konsultan Indonesia",
        description: "QA untuk website korporat berbasis WordPress. Melakukan pengujian fungsional, membuat test case, melaporkan bug, dan berkolaborasi dengan tim dev dalam sprint Agile.",
      },
      {
        title: "PT. Polytama Propindo",
        description: "QA untuk enterprise CMS yang mengelola produk petrokimia, feedback, dan laporan operasional. Membuat test case, melakukan pengujian fungsional, dan melaporkan temuan.",
      },
      {
        title: "TMS Daihatsu",
        description: "QA untuk website berbasis WordPress. Melakukan pengujian fungsional, membuat laporan bug detail, dan mendukung tim dev dalam memperbaiki isu yang ditemukan.",
      },
      {
        title: "BNPP RI",
        description: "Keterlibatan QA ongoing untuk website resmi Badan Nasional Pengelola Perbatasan Republik Indonesia. Pengujian fungsional, pembuatan test case, dan pelaporan bug.",
      },
      {
        title: "Total Buah Segar",
        description: "QA ongoing untuk aplikasi mobile Android. Melakukan pengujian fungsional, membuat test case, dan berkolaborasi dengan developer untuk memastikan kualitas aplikasi.",
      },
    ],
  },
};

const PROJECT_META = [
  // ── Personal ──────────────────────────────────────────────────────────────
  {
    tech: ["Next.js", "Node.js", "Firebase", "Tailwind CSS", "Framer Motion", "TMDB API"],
    github: "https://github.com/rulifcode/ruliftaskify-movie",
    live: "https://ruliftaskify-movie.vercel.app/",
    gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
    cover: coverTaskify, // TODO: ganti dengan → cover: coverTaskify
    companyIcon: null,
    companyName: null,
  },
  // ── Lumoshive ─────────────────────────────────────────────────────────────
  {
    tech: ["React", "JavaScript", "Tailwind CSS"],
    github: "https://github.com/lumoshive-final-project-batch-III/Frontend-project-app-ecommerce-frontend-tim-Ubuntu",
    live: "https://frontend-project-app-ecommerce-fron.vercel.app/",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    cover: coverEcommerce,
    companyIcon: logoLumoshive,
    companyName: "Lumoshive",
  },
  {
    tech: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/rulifcode/Start-Up-Match-Making",
    live: null,
    gradient: "from-sky-500/20 via-indigo-500/10 to-transparent",
    cover: null, // TODO: ganti dengan → cover: coverMatchmaking
    companyIcon: logoLumoshive,
    companyName: "Lumoshive",
  },
  // ── Personal ──────────────────────────────────────────────────────────────
  {
    tech: ["React", "JavaScript", "Tailwind CSS"],
    github: "https://github.com/rulifcode/furniture-react-landing-page",
    live: "https://furniture-react-landing-page-rulif.vercel.app/",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    cover: coverFurniture,
    companyIcon: null,
    companyName: null,
  },
  {
    tech: ["React", "CSS", "REST API"],
    github: "https://github.com/rulifcode/mp-food-recipe-api",
    live: "https://mp-food-recipe-api.vercel.app/",
    gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
    cover: coverRecipe,
    companyIcon: null,
    companyName: null,
  },
  {
    tech: ["PHP", "MySQLi", "HTML", "CSS"],
    github: "https://github.com/rulifcode/Perpustakaan_Online-Native_PHP_Mysqli",
    live: null,
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    cover: null, // TODO: ganti dengan → cover: coverPerpus
    companyIcon: null,
    companyName: null,
  },
  {
    tech: ["React", "Firebase", "CSS"],
    github: "https://github.com/rulifcode/react-ecommerce-firebase",
    live: null,
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    cover: null, // TODO: ganti dengan → cover: coverFirebase
    companyIcon: null,
    companyName: null,
  },
  // ── Gaotek ────────────────────────────────────────────────────────────────
  {
    tech: ["WordPress", "WooCommerce", "PHP", "MySQL", "SEO", "Figma"],
    github: null,
    live: "https://id.gaotek.com/",
    gradient: "from-orange-500/20 via-yellow-500/10 to-transparent",
    cover: coverGaotek, // TODO: ganti dengan → cover: coverGaotek
    companyIcon: logoGaotek,
    companyName: "Gaotek",
  },
  // ── Vodjo ─────────────────────────────────────────────────────────────────
  {
    tech: ["Cypress", "Playwright", "Postman", "Agile", "iOS", "Android"],
    github: null,
    live: "https://play.google.com/store/apps/details?id=com.nn.ngafalngefeel",
    gradient: "from-teal-500/20 via-cyan-500/10 to-transparent",
    cover: coverNgafal, // TODO: ganti dengan → cover: coverNgafal
    companyIcon: logoVodjo,
    companyName: "Vodjo",
  },
  {
    tech: ["WordPress", "Postman", "Agile", "Manual Testing"],
    github: null,
    live: "https://ganakonsultan.com/",
    gradient: "from-lime-500/20 via-green-500/10 to-transparent",
    cover: coverGana, // TODO: ganti dengan → cover: coverGana
    companyIcon: logoVodjo,
    companyName: "Vodjo",
  },
  {
    tech: ["CMS", "Postman", "Manual Testing", "Agile"],
    github: null,
    live: "https://crm.masplene.com/dashboard",
    gradient: "from-blue-500/20 via-sky-500/10 to-transparent",
    cover: coverPolytama, 
    companyIcon: logoVodjo,
    companyName: "Vodjo",
  },
  {
    tech: ["WordPress", "Manual Testing", "Bug Report", "Agile"],
    github: null,
    live: null,
    gradient: "from-red-500/20 via-orange-500/10 to-transparent",
    cover: coverDaihatsu, // TODO: ganti dengan → cover: coverDaihatsu
    companyIcon: logoVodjo,
    companyName: "Vodjo",
  },
  {
    tech: ["Manual Testing", "Test Case", "Bug Report", "Agile"],
    github: null,
    live: null,
    gradient: "from-indigo-500/20 via-blue-500/10 to-transparent",
    cover: coverBNPP, // TODO: ganti dengan → cover: coverBNPP
    companyIcon: logoVodjo,
    companyName: "Vodjo",
    status: "On Going",
  },
  {
    tech: ["Android", "Manual Testing", "Test Case", "Agile"],
    github: null,
    live: null,
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    cover: coverTotalBuah, // TODO: ganti dengan → cover: coverTotalBuah
    companyIcon: logoVodjo,
    companyName: "Vodjo",
    status: "On Going",
  },
];

export default function Projects({ dark }) {
  const { lang } = useLang();
  const t = PROJECTS_TRANSLATIONS[lang];

  const projects = t.projects.map((p, i) => ({
    ...p,
    ...PROJECT_META[i],
  }));

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`h-px flex-1 bg-gradient-to-r from-transparent ${dark ? "via-white/10" : "via-black/10"} to-transparent`} />
            <span className={`text-[10px] tracking-widest uppercase font-medium ${dark ? "text-white/30" : "text-black/30"}`}>
              {t.tagline}
            </span>
            <div className={`h-px flex-1 bg-gradient-to-r from-transparent ${dark ? "via-white/10" : "via-black/10"} to-transparent`} />
          </div>

          <h2 className={`text-4xl font-bold text-center ${dark ? "text-white/90" : "text-black/90"}`}>
            {t.title}
          </h2>

          <p className={`text-center text-sm max-w-md mx-auto ${dark ? "text-white/40" : "text-black/40"}`}>
            {t.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectCard key={project.title} dark={dark} {...project} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="flex justify-center pt-4">
          <a
            href="https://github.com/rulifcode"
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-2 px-6 py-3 rounded-full border text-sm transition-all duration-300 ${
              dark
                ? "border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/80 hover:bg-white/[0.06]"
                : "border-black/10 bg-black/[0.03] text-black/50 hover:border-black/20 hover:text-black/80 hover:bg-black/[0.06]"
            }`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            {t.cta}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform duration-200">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

      </div>
    </main>
  );
}