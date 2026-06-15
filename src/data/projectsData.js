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

export const projectSlug = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const PROJECT_TRANSLATIONS = {
  EN: {
    tagline: "Portfolio",
    title: "My Projects",
    subtitle: "A collection of projects I've worked on - from web apps to management systems.",
    cta: "See all projects on GitHub",
    tabs: { all: "All", qa: "QA", dev: "Development" },
    viewAll: "View All",
    showLess: "Show Less",
    groupLabels: { vodjo: "Vodjo - Software QA", development: "Project Development" },
    groupDescs: {
      vodjo: "Quality Assurance projects during my time at Vodjo, covering mobile apps, websites, and enterprise systems.",
      development: "Personal, freelance, and bootcamp projects - from landing pages to full-stack apps.",
    },
    detail: {
      back: "Back to Projects",
      overview: "Overview",
      stack: "Tech Stack",
      links: "Project Links",
      unavailable: "Project detail not found.",
      github: "GitHub",
      live: "Live Demo",
      admin: "Admin",
    },
    vodjo: [
      { title: "Ngafal Ngefeel", description: "Ngafal Ngefeel is a cross-platform mobile application available on Android and iOS, designed to support Quran memorization and Islamic learning activities through a modern digital experience. The platform provides features such as Quran memorization guidance, tadabbur sessions, Islamic events, podcasts, chat functionality, and learning programs including Kelas NN Reguler, Community, and NB. The ecosystem is supported by a CMS dashboard system for content management, user administration, and program monitoring to ensure efficient platform operations and user engagement." },
      { title: "Gana Konsultan Indonesia", description: "GKI is a company profile website developed using WordPress to represent the company's professional services and digital presence. The website was designed with a responsive and user-friendly interface, focusing on clear information delivery, modern visual presentation, and optimized performance to enhance company branding and online accessibility." },
      { title: "PT. Polytama Propindo", description: "PT. Polytama Propindo is one of Indonesia's leading petrochemical companies specializing in the production of polypropylene resin for various industrial applications. The company supports multiple sectors including packaging, automotive, household products, and consumer goods through high-quality polymer manufacturing and sustainable industrial operations." },
      { title: "TMS Daihatsu", description: "TMS Daihatsu is a WordPress-based automotive sales website developed to showcase vehicle products, promotions, and dealership services through a modern digital platform. The website focuses on providing an informative and user-friendly experience for customers looking for Daihatsu vehicle information, consultation, and purchasing services with responsive design and optimized accessibility across devices." },
      { title: "PPID BNPP RI", description: "PPID BNPP is a web-based information system developed to support public information services and digital communication for Badan Nasional Pengelola Perbatasan (BNPP). The platform features a company profile website, submission management flow, dashboard monitoring system, and CMS for content management. Built with a focus on responsive UI, usability, and efficient information delivery to support organizational transparency and public access to information." },
      { title: "Total Buah Store", description: "TBS is a digital commerce brand focused on providing fresh fruit products and healthy lifestyle solutions through modern online platforms. The brand aims to simplify customer access to high-quality fresh products with a seamless shopping experience across mobile applications, website platforms, and integrated digital services." },
      { title: "La Natory Lombok", description: "LA NOTARY is a landing page and company profile website developed to represent professional notary and legal services through a modern and informative digital platform. The website focuses on delivering clear service information, strengthening company branding, and improving client accessibility with a responsive and user-friendly interface." },
    ],
    development: [
      { title: "Rulif Taskify Movie", description: "Personal project - a movie discovery app built with Next.js, Node.js, Firebase, and Tailwind CSS. Integrates TMDB API with SSG, server-side streaming via Vidsrc, and Framer Motion animations." },
      { title: "E-Commerce App (Tim Ubuntu)", description: "Lumoshive bootcamp batch III final project - a fullstack e-commerce app with authentication, product management, shopping cart, and checkout features." },
      { title: "Aurevia Hotel - Frontend Next.js", description: "A hotel reservation frontend built with Next.js 14, Tailwind CSS, and Laravel API integration. Features room catalog, booking form with real-time price summary, dynamic banners, and responsive elegant UI." },
      { title: "Furniture Landing Page", description: "A modern landing page for a furniture brand with elegant design, smooth animations, and a fully responsive layout." },
      { title: "Food Recipe App", description: "A food recipe app integrated with an external API, displaying various recipes with search and category filter features." },
      { title: "Perpustakaan Online", description: "A digital library management system built with Native PHP & MySQLi, featuring book borrowing, member management, and reporting." },
      { title: "Gaotek Inc - Web WordPress", description: "Developed and maintained the Gaotek Indonesia website. Handled theme updates, SEO optimization, WooCommerce product data via Excel, and UI slicing based on Figma designs." },
      { title: "CRUD React.js & Axios", description: "A responsive product management web application built with React 18, Vite, and Tailwind CSS. Implements CRUD operations, search, filtering, and pagination using FakeStore API. Structured using a Container/Presentational architecture with custom hooks for data fetching, filtering, and state management." },
      { title: "Backend Laravel CMS Dashboard Aurevia Hotel", description: "CMS dashboard & REST API for a web-based hotel management system. Built with Laravel 12, equipped with role-based access control (Admin & Receptionist), media upload via Cloudinary, and consumed by the Next.js frontend." },
      { title: "Industrix Todo", description: "A full-stack todo app built with Go (Gin, GORM), React 18 (TypeScript), and PostgreSQL. Features CRUD, pagination, filtering, category management, and Docker support." },
    ],
  },
  ID: {
    tagline: "Portofolio",
    title: "Proyek Saya",
    subtitle: "Kumpulan project yang pernah saya kerjakan - dari web app hingga sistem manajemen.",
    cta: "Lihat semua project di GitHub",
    tabs: { all: "Semua", qa: "QA", dev: "Development" },
    viewAll: "Lihat Semua",
    showLess: "Tampilkan Sedikit",
    groupLabels: { vodjo: "Vodjo - Software QA", development: "Project Development" },
    groupDescs: {
      vodjo: "Proyek Quality Assurance selama bekerja di Vodjo, mencakup aplikasi mobile, website, dan sistem enterprise.",
      development: "Proyek personal, freelance, dan bootcamp - dari landing page hingga aplikasi full-stack.",
    },
    detail: {
      back: "Kembali ke Projects",
      overview: "Overview",
      stack: "Tech Stack",
      links: "Link Project",
      unavailable: "Detail project tidak ditemukan.",
      github: "GitHub",
      live: "Live Demo",
      admin: "Admin",
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
      { title: "Rulif Taskify Movie", description: "Proyek personal - aplikasi pencarian film berbasis Next.js, Node.js, Firebase, dan Tailwind CSS. Mengintegrasikan TMDB API dengan SSG, server-side streaming via Vidsrc, dan animasi Framer Motion." },
      { title: "E-Commerce App (Tim Ubuntu)", description: "Final project bootcamp Lumoshive batch III - aplikasi e-commerce fullstack dengan fitur autentikasi, manajemen produk, keranjang belanja, dan checkout." },
      { title: "Aurevia Hotel - Frontend Next.js", description: "Frontend pemesanan hotel berbasis Next.js 14 dan Tailwind CSS, terintegrasi dengan Laravel API. Fitur katalog kamar, form booking dengan ringkasan harga real-time, banner dinamis, dan UI responsif yang elegan." },
      { title: "Furniture Landing Page", description: "Landing page modern untuk brand furniture dengan desain elegan, animasi smooth, dan layout yang sepenuhnya responsif." },
      { title: "Food Recipe App", description: "Aplikasi resep makanan yang terintegrasi dengan API eksternal, menampilkan berbagai resep dengan fitur pencarian dan filter kategori." },
      { title: "Perpustakaan Online", description: "Sistem manajemen perpustakaan digital berbasis Native PHP & MySQLi, dengan fitur peminjaman buku, manajemen anggota, dan pelaporan." },
      { title: "Gaotek Inc - Web WordPress", description: "Mengembangkan dan memelihara website Gaotek Indonesia. Menangani pembaruan tema, optimasi SEO, data produk WooCommerce via Excel, dan slicing UI berdasarkan desain Figma." },
      { title: "CRUD React.js & Axios", description: "Aplikasi manajemen produk responsif yang dibangun menggunakan React 18, Vite, dan Tailwind CSS. Mengimplementasikan fitur CRUD, pencarian, filtering, dan pagination menggunakan FakeStore API. Disusun menggunakan arsitektur Container/Presentational dengan custom hooks untuk pengelolaan data, filtering, dan state management." },
      { title: "Backend Laravel CMS Dashboard Aurevia Hotel", description: "CMS dashboard & REST API untuk sistem manajemen hotel berbasis web. Dibangun dengan Laravel 12, dilengkapi role-based access control (Admin & Resepsionis), upload media via Cloudinary, dan dikonsumsi oleh frontend Next.js." },
      { title: "Industrix Todo", description: "Aplikasi todo full-stack dengan Go (Gin, GORM), React 18 (TypeScript), dan PostgreSQL. Fitur CRUD, pagination, filtering, manajemen kategori, dan dukungan Docker." },
    ],
  },
};

export const DEV_META = [
  { slug: "rulif-taskify-movie", tech: ["Next.js", "Node.js", "Firebase", "Tailwind CSS", "Framer Motion", "TMDB API"], github: "https://github.com/rulifcode/ruliftaskify-movie", live: "https://ruliftaskify-movie.vercel.app/", gradient: "from-purple-500/20 via-violet-500/10 to-transparent", cover: coverTaskify, companyIcon: null, companyName: null, category: "dev" },
  { slug: "e-commerce-app-tim-ubuntu", tech: ["React.js", "JavaScript", "Tailwind CSS", "Figma"], github: "https://github.com/lumoshive-final-project-batch-III/Frontend-project-app-ecommerce-frontend-tim-Ubuntu", live: "https://frontend-project-app-ecommerce-fron.vercel.app/", gradient: "from-blue-500/20 via-cyan-500/10 to-transparent", cover: coverEcommerce, companyIcon: logoLumoshive, companyName: "Lumoshive", category: "dev" },
  { slug: "aurevia-hotel-frontend-next-js", tech: ["Next.js", "Tailwind CSS", "Laravel", "TypeScript", "Figma"], github: "https://github.com/rulifcode/Frontend_NextJS_Hotel", live: "https://aurevia-nextjs.vercel.app/", gradient: "from-sky-500/20 via-indigo-500/10 to-transparent", cover: coverRessortHotel, companyIcon: null, companyName: null, category: "dev" },
  { slug: "furniture-landing-page", tech: ["React.js", "JavaScript", "Tailwind CSS", "Figma"], github: "https://github.com/rulifcode/furniture-react-landing-page", live: "https://furniture-react-landing-page-rulif.vercel.app/", gradient: "from-amber-500/20 via-orange-500/10 to-transparent", cover: coverFurniture, companyIcon: null, companyName: null, category: "dev" },
  { slug: "food-recipe-app", tech: ["React.js", "CSS", "REST API"], github: "https://github.com/rulifcode/mp-food-recipe-api", live: "https://mp-food-recipe-api.vercel.app/", gradient: "from-rose-500/20 via-pink-500/10 to-transparent", cover: coverRecipe, companyIcon: null, companyName: null, category: "dev" },
  { slug: "perpustakaan-online", tech: ["PHP", "MySQL", "HTML", "CSS", "Figma"], github: "https://github.com/rulifcode/Perpustakaan_Online-Native_PHP_Mysqli", live: null, gradient: "from-violet-500/20 via-purple-500/10 to-transparent", cover: coverLitera, companyIcon: null, companyName: null, category: "dev" },
  { slug: "gaotek-inc-web-wordpress", tech: ["WordPress", "WooCommerce", "PHP", "MySQL", "SEO", "Figma"], github: null, live: "https://id.gaotek.com/", gradient: "from-orange-500/20 via-yellow-500/10 to-transparent", cover: coverGaotek, companyIcon: logoGaotek, companyName: "Gaotek", category: "dev" },
  { slug: "crud-react-js-and-axios", tech: ["React.js", "Axios", "Custom Hooks", "Tailwind CSS", "Figma"], github: "https://github.com/rulifcode/mp-crud-react-axios", live: "https://mp-crud-react-axios.vercel.app/", gradient: "from-orange-500/20 via-yellow-500/10 to-transparent", cover: coverCRUD, companyIcon: null, companyName: null, category: "dev" },
  { slug: "backend-laravel-cms-dashboard-aurevia-hotel", tech: ["Laravel 12", "MySQL", "Blade", "Tailwind CSS", "Cloudinary", "PHP", "REST API"], github: "https://github.com/rulifcode/Backend_Laravel_Hotel", live: null, gradient: "from-orange-500/20 via-amber-500/10 to-transparent", cover: coverHotel, companyIcon: null, companyName: null, category: "dev" },
  { slug: "industrix-todo", tech: ["Go", "React.js", "TypeScript", "PostgreSQL", "Docker", "Tailwind CSS"], github: "https://github.com/rulifcode/industrix-todo", live: null, gradient: "from-emerald-500/20 via-teal-500/10 to-transparent", cover: coverIndustrix, companyIcon: null, companyName: null, category: "dev" },
];

export const VODJO_META = [
  { tech: ["Cypress", "Playwright", "Postman", "Agile", "iOS", "Android", "Figma"], github: null, live: "https://play.google.com/store/apps/details?id=com.nn.ngafalngefeel", gradient: "from-teal-500/20 via-cyan-500/10 to-transparent", cover: coverNgafal, companyIcon: logoVodjo, companyName: "Vodjo", category: "qa" },
  { tech: ["Cypress", "Playwright", "Postman", "Agile", "Manual Testing", "Figma"], github: null, live: "https://ganakonsultan.com/", gradient: "from-lime-500/20 via-green-500/10 to-transparent", cover: coverGana, companyIcon: logoVodjo, companyName: "Vodjo", category: "qa" },
  { tech: ["CMS", "Cypress", "Playwright", "Postman", "Manual Testing", "Agile", "Figma"], github: null, live: "https://crm.masplene.com/dashboard", gradient: "from-blue-500/20 via-sky-500/10 to-transparent", cover: coverPolytama, companyIcon: logoVodjo, companyName: "Vodjo", category: "qa" },
  { tech: ["Cypress", "Playwright", "Postman", "Bug Report", "Agile", "Figma"], github: null, live: "https://www.tmsdaihatsu.co.id/", gradient: "from-red-500/20 via-orange-500/10 to-transparent", cover: coverDaihatsu, companyIcon: logoVodjo, companyName: "Vodjo", category: "qa" },
  { tech: ["Cypress", "Playwright", "Postman", "Test Case", "Bug Report", "Agile", "Figma"], github: null, live: "https://bnpp.go.id/", gradient: "from-indigo-500/20 via-blue-500/10 to-transparent", cover: coverBNPP, companyIcon: logoVodjo, companyName: "Vodjo", category: "qa" },
  { tech: ["Mobile", "Cypress", "Playwright", "Postman", "Test Case", "Agile", "Figma"], github: null, live: null, gradient: "from-pink-500/20 via-rose-500/10 to-transparent", cover: coverTotalBuah, companyIcon: logoVodjo, companyName: "Vodjo", category: "qa" },
  { tech: ["Mobile", "Cypress", "Playwright", "Postman", "Test Case", "Agile", "Figma"], github: null, live: "https://lomboknotary.com/", gradient: "from-brown-500/20 via-rose-500/10 to-transparent", cover: coverLanatory, companyIcon: logoVodjo, companyName: "Vodjo", category: "qa" },
];

export function mapRemoteProject(project, lang = "EN") {
  const title = project.title?.[lang] || project.titleEN || project.title || "";
  const description =
    project.description?.[lang] ||
    project.descriptionEN ||
    project.description ||
    "";

  const category = project.category || "dev";

  return {
    ...project,
    title,
    description,
    slug: project.slug || projectSlug(title),
    category,
    tech: Array.isArray(project.tech) ? project.tech : [],
    cover: project.cover || project.coverUrl || null,
    companyIcon: project.companyIcon || null,
    images: Array.isArray(project.images) ? project.images : [],
    detailHref: category === "dev" ? `/projects/${project.slug || projectSlug(title)}` : null,
  };
}

export function getStaticProjectGroups(lang = "EN") {
  const t = PROJECT_TRANSLATIONS[lang] || PROJECT_TRANSLATIONS.EN;
  const vodjoProjects = t.vodjo.map((project, index) => ({
    ...project,
    ...VODJO_META[index],
  }));
  const devProjects = t.development.map((project, index) => ({
    ...project,
    ...DEV_META[index],
    detailHref: `/projects/${DEV_META[index].slug}`,
  }));

  return {
    t,
    vodjoProjects,
    devProjects,
    allProjects: [...vodjoProjects, ...devProjects],
  };
}

export function getSeedProjects() {
  return PROJECT_TRANSLATIONS.EN.development.map((project, index) => ({
    id: DEV_META[index].slug,
    slug: DEV_META[index].slug,
    category: "dev",
    title: {
      EN: project.title,
      ID: PROJECT_TRANSLATIONS.ID.development[index]?.title || project.title,
    },
    description: {
      EN: project.description,
      ID: PROJECT_TRANSLATIONS.ID.development[index]?.description || project.description,
    },
    tech: DEV_META[index].tech,
    github: DEV_META[index].github,
    live: DEV_META[index].live,
    gradient: DEV_META[index].gradient,
    cover: DEV_META[index].cover,
    companyName: DEV_META[index].companyName,
    sortOrder: index + 1,
    published: true,
  }));
}
