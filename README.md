# 🌐 Rulif Fadria Nirwansyah — Portfolio Website

> Personal portfolio website showcasing projects, experience, certificates, and skills as a Front-End Developer based in Bandung, Indonesia.

🔗 **Live:** [rulifweb.vercel.app](https://rulifweb.vercel.app/)

---

## 📸 Overview

A modern single-page portfolio built with **React 19 + Vite**, featuring:

- ✨ Dark / Light mode with SoftAurora animated background
- 🌏 Bilingual support (EN / ID) with context-based translation
- 🎨 Premium UI with Framer Motion, GSAP, and Three.js animations
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🔍 SEO optimized with Open Graph, Twitter Card, and JSON-LD structured data
- 🎴 Interactive 3D Lanyard ID card (React Three Fiber)
- 🚀 Deployed on Vercel with optimized chunking

---

## 🛠️ Tech Stack

| Category       | Technologies                                                                 |
| -------------- | ---------------------------------------------------------------------------- |
| **Framework**  | React 19, Vite 7                                                             |
| **Styling**    | Tailwind CSS 4, Vanilla CSS                                                  |
| **Animation**  | Framer Motion, GSAP, Three.js, React Three Fiber/Drei                        |
| **Routing**    | React Router DOM v7                                                          |
| **UI Library** | Lucide React, React Icons, Radix UI, Shadcn                                 |
| **Font**       | Inter (Google Fonts), Geist (Fontsource)                                     |
| **Build**      | Vite with manual chunks (vendor, motion, three)                              |
| **Deployment** | Vercel                                                                       |
| **Testing**    | Vitest, React Testing Library                                                |

---

## 📁 Project Structure

```
rulifweb/
├── public/
│   ├── certificates/           # Certificate images (10 files)
│   ├── CV_Rulif_Fadrian_Nirwansyah_2026.pdf
│   ├── img_Rulif_logo.png      # Logo
│   ├── og-cover.png            # Open Graph cover
│   ├── Subjudul.png            # Favicon
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/                 # Project covers, company logos, photos (50+ files)
│   ├── components/
│   │   ├── layout/
│   │   │   └── Navbar.jsx      # Navbar + LangContext + TRANSLATIONS (740 lines)
│   │   ├── ui/
│   │   │   ├── MentorFeedback.jsx  # Mentor feedback carousel with World Map
│   │   │   ├── button.jsx          # Shadcn button component
│   │   │   └── world-map.jsx       # Dotted world map visualization
│   │   ├── AnimatedBeam/       # Animated beam connector component
│   │   ├── Lanyard/            # 3D Lanyard ID card (React Three Fiber)
│   │   ├── ScrollReveal/       # Scroll-based text reveal animation
│   │   ├── ShinyText/          # Shiny text hover effect
│   │   ├── SoftAurora/         # Aurora gradient background (WebGL shader)
│   │   ├── TextType/           # Typewriter text effect
│   │   ├── ProjectCard.jsx     # Project card with tech badges
│   │   └── ThemeToggle.jsx     # Theme toggle button
│   ├── hooks/
│   │   ├── useCarousel.js      # Carousel logic hook
│   │   └── useDarkMode.jsx     # Dark mode persistence hook
│   ├── lib/
│   │   └── utils.js            # Utility functions (cn helper)
│   ├── pages/
│   │   ├── Home.jsx            # Hero section + 3D Lanyard
│   │   ├── About.jsx           # Bio + Photo Grid + Tech Stack/QA/Mobile Beam visuals
│   │   ├── Experience.jsx      # Timeline with expandable cards + image slider + lightbox
│   │   ├── Projects.jsx        # Grouped carousel (QA / Dev) with tab filter
│   │   ├── Certificate.jsx     # Certificate gallery
│   │   └── Contact.jsx         # Contact form + social links
│   ├── App.jsx                 # Main app with SplashScreen, Router, SoftAurora bg
│   ├── App.css
│   ├── index.css
│   └── main.jsx                # Entry point
├── index.html                  # SEO meta, Open Graph, JSON-LD, Google Fonts
├── vite.config.js              # Vite config with Tailwind plugin + manual chunks
├── components.json             # Shadcn configuration
├── package.json
└── README.md
```

---

## 🎯 Sections / Pages

| Section              | Description                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| **Home**             | Hero with ShinyText name, TextType roles, CTA buttons, 3D Lanyard card (desktop/mobile)          |
| **About**            | Bio with ScrollReveal, Photo Grid, AnimatedBeam visuals (Tech Stack, QA Tools, Mobile Dev)       |
| **Experience**       | Interactive timeline (4 entries: Cakrawala, Gaotek, Vodjo, Lumoshive) with image slider/lightbox |
| **Projects**         | Tab filter (All/QA/Dev), grouped carousel with auto-slide, expand/collapse, 14 total projects    |
| **Certificate**      | Certificate gallery (10 certificates)                                                            |
| **Mentor Feedback**  | Mentor testimonials with world map visualization                                                 |
| **Contact**          | Contact information + social links                                                               |

---

## ✨ Key Features

- **Splash Screen** — Animated logo on load with fade-out transition
- **Magnetic Nav Links** — Desktop nav links follow cursor with magnetic effect
- **3D Lanyard** — Interactive 3D ID card using React Three Fiber + Rapier physics
- **AnimatedBeam** — SVG beam connectors showing tech stack relationships
- **ScrollReveal** — Text reveals with blur + rotation on scroll
- **Image Lightbox** — Full-screen image viewer with keyboard navigation + swipe
- **Auto Carousel** — Project cards auto-slide with manual controls and pagination dots
- **Bilingual (EN/ID)** — Full translation system via React Context

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

**Requirements:** Node.js 20.x

---

## 🔗 Links

- **Portfolio (Part 1):** [rulifweb.vercel.app](https://rulifweb.vercel.app/)
- **Portfolio (Part 2):** [rulifdev.vercel.app](https://rulifdev.vercel.app/)
- **GitHub:** [github.com/rulifcode](https://github.com/rulifcode)
- **LinkedIn:** [linkedin.com/in/ruliffadrian](https://www.linkedin.com/in/ruliffadrian/)
- **WhatsApp:** [wa.me/6281382916024](https://wa.me/6281382916024)

---

---

# 📋 CMS Page — Persiapan & Task List

> Catatan persiapan untuk membuat halaman **CMS (Content Management System)** agar konten portfolio bisa dikelola secara dinamis tanpa harus edit kode langsung.

## 🎯 Tujuan CMS

Membuat dashboard admin sederhana untuk mengelola konten portfolio secara dinamis — sehingga data seperti projects, experience, certificates, dan teks lainnya bisa di-update tanpa harus deploy ulang.

---

## 📌 Task yang Harus Di-Update / Dibuat

### 1. 🏠 Home Section
- [ ] **Hero Text** — Buat CMS field untuk: nama, deskripsi hero (EN & ID), role list (TextType)
- [ ] **CTA Buttons** — URL dan label tombol bisa diedit dari CMS
- [ ] **Logo** — Upload logo dari CMS

### 2. 👤 About Section
- [ ] **Bio Text** — Semua paragraf bio (EN & ID) bisa diedit dari CMS
- [ ] **Photos** — Upload/ganti foto About section (PhotoGrid) dari CMS
- [ ] **Tech Stack Icons** — Manage daftar teknologi yang ditampilkan di AnimatedBeam

### 3. 💼 Experience Section
- [ ] **Experience Entries** — CRUD data pengalaman kerja (company, role, period, duration, location, type)
- [ ] **Experience Bullets** — Edit deskripsi bullet points per experience (EN & ID)
- [ ] **Experience Images** — Upload/manage slider images per experience
- [ ] **Company Logos** — Upload logo perusahaan
- [ ] **Tech Stack per Experience** — Manage daftar teknologi per entry

### 4. 📂 Projects Section
- [ ] **Project Entries** — CRUD data project (title, description EN & ID, tech stack, links, cover image)
- [ ] **Project Categories** — Manage kategori/grup (QA, Development, dll.)
- [ ] **Project Covers** — Upload cover image per project
- [ ] **Company Icons** — Upload/assign company icon per project
- [ ] **Project Links** — Edit GitHub URL & live demo URL per project

### 5. 📜 Certificate Section
- [ ] **Certificate Entries** — CRUD data sertifikat (title, issuer, date, image)
- [ ] **Certificate Images** — Upload image sertifikat dari CMS

### 6. 💬 Mentor Feedback Section
- [ ] **Feedback Entries** — CRUD data mentor (nama, role, foto, feedback text EN & ID)
- [ ] **Map Locations** — Edit titik lokasi mentor di world map

### 7. 📞 Contact Section
- [ ] **Contact Info** — Edit teks deskripsi, availability status (EN & ID)
- [ ] **Social Links** — Manage URL social media (WhatsApp, LinkedIn, GitHub, Instagram, Email)

### 8. 🧭 Navbar & Global
- [ ] **Nav Labels** — Edit label navigasi (EN & ID)
- [ ] **CV File** — Upload/update file CV PDF
- [ ] **SEO Meta** — Edit title, description, keywords, OG image dari CMS
- [ ] **Favicon & Logo** — Upload favicon dan logo dari CMS

---

## 🏗️ Arsitektur CMS yang Disarankan

### Option A: Headless CMS (Recommended untuk MVP)
| Service         | Kelebihan                                 |
| --------------- | ----------------------------------------- |
| **Supabase**    | PostgreSQL + Auth + Storage, gratis tier   |
| **Firebase**    | Realtime DB + Auth + Storage              |
| **Strapi**      | Self-hosted, full control, open source    |
| **Sanity.io**   | Realtime, flexible schema, generous free  |

### Option B: Custom Admin Panel
- React + Vite admin dashboard
- REST API (Node.js/Express atau Golang)
- PostgreSQL / MongoDB untuk database
- Cloudinary / Supabase Storage untuk upload gambar

---

## 📝 Perubahan Kode yang Diperlukan

### Data Layer
- [ ] Pindahkan semua **hardcoded data** dari komponen ke file JSON / API call
- [ ] Buat **data service layer** (`src/services/`) untuk fetch data dari CMS/API
- [ ] Buat **loading states** dan **skeleton UI** untuk setiap section
- [ ] Buat **error handling** jika data gagal di-fetch

### Files yang Perlu Refactor (Pindahkan Hardcoded Data)
| File | Data yang Hardcoded |
| ---- | ------------------- |
| `Navbar.jsx` | `TRANSLATIONS` object (~150 lines), `NAV_HREFS` |
| `Home.jsx` | Hero text, role list, CTA labels |
| `About.jsx` | `ABOUT_TRANSLATIONS`, tech stack icons list |
| `Experience.jsx` | `EXP_STATIC` array, `T` translations object |
| `Projects.jsx` | `TRANSLATIONS`, `VODJO_META`, `DEV_META` arrays |
| `Certificate.jsx` | Certificate data & images |
| `Contact.jsx` | Contact info, social links |
| `MentorFeedback.jsx` | Mentor data, feedback text |

### Admin Dashboard (New)
- [ ] Buat route `/admin` atau subdomain terpisah
- [ ] Login/auth untuk admin
- [ ] Form CRUD untuk setiap section
- [ ] Image upload dengan preview
- [ ] Preview perubahan sebelum publish
- [ ] Multi-language editor (EN/ID side by side)

---

## ⚡ Prioritas Implementasi

| Priority | Task | Effort |
| -------- | ---- | ------ |
| 🔴 P0 | Setup database & API layer | Medium |
| 🔴 P0 | Refactor hardcoded data ke data service | High |
| 🟡 P1 | CMS: Projects CRUD | Medium |
| 🟡 P1 | CMS: Experience CRUD | Medium |
| 🟡 P1 | CMS: Certificate CRUD | Low |
| 🟢 P2 | CMS: About section editor | Low |
| 🟢 P2 | CMS: Home section editor | Low |
| 🟢 P2 | CMS: Contact & social links | Low |
| 🔵 P3 | CMS: Mentor Feedback CRUD | Low |
| 🔵 P3 | CMS: SEO meta editor | Low |
| 🔵 P3 | CMS: CV upload | Low |
| 🔵 P3 | Image optimization pipeline | Medium |

---

## 📌 Notes

- Semua teks saat ini **hardcoded bilingual (EN/ID)** di dalam komponen React — ini harus dipindahkan ke database/CMS
- Asset gambar disimpan di `src/assets/` (bundled) dan `public/` (static) — perlu migrasi ke cloud storage
- Saat ini belum ada backend/API — semua data client-side only
- Splash screen, theme toggle, dan language toggle bisa tetap client-side (tidak perlu CMS)

---

## 👤 Author

**Rulif Fadria Nirwansyah**
Front-End Developer · Bandung, Indonesia

---

*Last updated: May 2026*