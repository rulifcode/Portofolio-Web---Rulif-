# Rulif Fadria Nirwansyah Portfolio

Personal portfolio website for Rulif Fadria Nirwansyah, focused on front-end development, full-stack development, software quality assurance, mobile development, certificates, experience, and project showcase.

Live site:

- Portfolio Part 1: https://rulifweb.vercel.app/
- Portfolio Part 2: https://rulifdev.vercel.app/

## Overview

This project is a React + Vite portfolio with a rich visual interface, bilingual content, project cards, project detail pages, certificates, experience timeline, 3D lanyard, and a Firebase-ready admin dashboard for long-term content management.

The admin dashboard is available at `/admin` so portfolio data can be managed without editing React files directly.

Current Firebase direction:

- Firestore for project, experience, certificate, and contact data.
- Firebase Auth for admin login.
- Optional face-api.js verification after Firebase Auth login.
- Admin dashboard for projects, experience, certificates, and contact content.
- Optional Firebase Storage for cover images.
- Static/local fallback while Firebase is not configured.

## Main Features

- Dark/light mode.
- Bilingual EN/ID content.
- Animated hero with ShinyText and TextType.
- Interactive 3D lanyard card.
- About section with photo grid and tech visuals.
- Experience timeline with expandable cards and image slider.
- Projects section grouped by Development and QA.
- Project detail pages for Development projects.
- Certificate gallery.
- Mentor feedback section.
- Contact section.
- Firebase-ready admin data services.
- Optional admin face verification using local face-api.js models.

## Tech Stack

| Area | Stack |
| --- | --- |
| Framework | React 19, Vite 7 |
| Styling | Tailwind CSS 4, CSS |
| Animation | Framer Motion, GSAP, OGL |
| 3D | Three.js, React Three Fiber, Drei, Rapier |
| Face verification | face-api.js |
| Routing | React Router DOM v7 |
| Icons/UI | Lucide React, React Icons, Radix UI, shadcn helpers |
| Backend-ready | Firebase, Firestore, Firebase Auth |
| Build | Vite |
| Deploy | Vercel |

## Requirements

Use Node.js 20.x.

The project may install and run on newer Node versions, but `package.json` declares:

```json
"engines": {
  "node": "20.x"
}
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build production files:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Run lint:

```bash
npm run lint
```

Note: full lint may still report existing strict React Hooks lint issues in legacy visual components. The Firebase/project files should be linted separately while the legacy lint cleanup is handled.

## Environment Variables

Create `.env.local` in the project root:

```env
# Firebase web app config.
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Optional admin face verification after Firebase Auth login.
VITE_ADMIN_FACE_LOGIN_ENABLED=false
VITE_ADMIN_FACE_LABEL=Rulif Admin
VITE_ADMIN_FACE_DESCRIPTOR=
VITE_ADMIN_FACE_MATCH_THRESHOLD=0.5
VITE_FACE_API_MODEL_URL=/models
```

Use `.env.example` as the template. `.env.local` is ignored by git and is meant for your local values.

Firebase values come from Firebase Console > Project settings > General > Your apps > Web app config.

If any value is empty, `src/lib/firebase.js` keeps Firebase disabled and the app uses fallback behavior.

Current local Firebase app:

- Project ID: `rulifweb-portfolio`
- Auth domain: `rulifweb-portfolio.firebaseapp.com`
- Storage bucket: `rulifweb-portfolio.firebasestorage.app`

Firebase SDK status:

- `firebase` is already installed in `package.json`.
- The app already initializes Firebase in `src/lib/firebase.js`.
- Enabled SDK usage in code: Firebase App, Auth, and Firestore.
- Firebase Storage is documented for later upload support, but the current dashboard drag/drop stores file data directly in the form as data URLs. For production videos or large files, use Firebase Storage and save the download URL to Firestore.

Face login values:

- `VITE_ADMIN_FACE_LOGIN_ENABLED`: set to `true` to require face verification after Firebase Auth login.
- `VITE_ADMIN_FACE_DESCRIPTOR`: 128-number face descriptor generated from the `/admin` face setup screen when face login is enabled but descriptor is still empty.
- `VITE_ADMIN_FACE_LABEL`: display label for the registered admin face.
- `VITE_ADMIN_FACE_MATCH_THRESHOLD`: face match sensitivity. `0.5` is a practical starting point.
- `VITE_FACE_API_MODEL_URL`: model folder path. The current models are in `public/models`, so `/models` is correct.

Recommended face setup flow:

1. Keep `VITE_ADMIN_FACE_LOGIN_ENABLED=false` while setting up Firebase Auth.
2. Login to `/admin` with Firebase Email/Password.
3. Temporarily set `VITE_ADMIN_FACE_LOGIN_ENABLED=true` while `VITE_ADMIN_FACE_DESCRIPTOR` is still empty.
4. Open `/admin`, use the face setup screen to generate the descriptor.
5. Put the descriptor into `.env.local`, then restart the dev server.
6. Keep Firestore rules restricted by admin email. Face login is an extra UI gate, not the database permission layer.

Important: face verification runs in the browser, so it is an extra admin gate, not the main security layer. Keep Firebase Auth and Firestore rules as the source of truth. Do not put admin passwords in any `VITE_` env variable.

## Firebase Setup

Detailed Firebase instructions are in:

```text
FIREBASE_SETUP_CHATGPT.md
```

That file contains:

- Firebase Console setup steps.
- Firestore collection schema.
- `projects` document example.
- Security rules.
- Auth setup.
- Storage notes.
- Seed data plan.
- A prompt you can copy to ChatGPT.

Official references:

- Firebase pricing: https://firebase.google.com/pricing
- Firebase web setup: https://firebase.google.com/docs/web/setup
- Firestore docs: https://firebase.google.com/docs/firestore
- Firebase Auth docs: https://firebase.google.com/docs/auth

## Firebase Data Architecture

Main collections/documents:

```text
projects
experiences
certificates
siteContent/contact
```

The admin dashboard can manage Development projects, QA projects, experience entries, certificates, and contact content.

Recommended document ID:

```text
{slug}
```

Example:

```text
projects/rulif-taskify-movie
```

Document fields:

```js
{
  slug: "rulif-taskify-movie",
  category: "dev",
  title: {
    EN: "Rulif Taskify Movie",
    ID: "Rulif Taskify Movie"
  },
  description: {
    EN: "Personal project - a movie discovery app built with Next.js, Node.js, Firebase, and Tailwind CSS.",
    ID: "Proyek personal - aplikasi pencarian film berbasis Next.js, Node.js, Firebase, dan Tailwind CSS."
  },
  tech: ["Next.js", "Node.js", "Firebase", "Tailwind CSS"],
  github: "https://github.com/rulifcode/ruliftaskify-movie",
  live: "https://ruliftaskify-movie.vercel.app/",
  cover: "https://example.com/project-cover.jpg",
  gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
  companyName: null,
  sortOrder: 1,
  published: true,
  updatedAt: "serverTimestamp()"
}
```

## Firebase Related Files

| File | Purpose |
| --- | --- |
| `src/lib/firebase.js` | Initializes Firebase app, Auth, and Firestore from Vite env variables. |
| `src/lib/adminFaceAuth.js` | Reads optional face verification env values and parses the face descriptor. |
| `src/services/projectsService.js` | Project CRUD helpers, Firestore reads/writes, seed helper, localStorage fallback. |
| `src/services/adminContentService.js` | Generic admin content helpers for experience, certificates, and site content. |
| `src/hooks/useProjects.js` | Public hook that loads Firestore project data and falls back to static data. |
| `src/hooks/useCertificates.js` | Public hook for dynamic certificates with static fallback. |
| `src/hooks/useContactContent.js` | Public hook for dynamic contact copy and links with static fallback. |
| `src/data/projectsData.js` | Static fallback project data, translations, project slug helper, seed data. |
| `src/pages/Projects.jsx` | Public project listing grouped into Development and QA. |
| `src/pages/ProjectDetail.jsx` | Detail page for development project route `/projects/:slug`. |
| `src/pages/AdminDashboard.jsx` | Admin login, optional face verification, and CRUD dashboard. |
| `src/components/ProjectCard.jsx` | Project card UI with GitHub, live demo, and detail link. |

## Routes

| Route | Description |
| --- | --- |
| `/` | Main portfolio single-page experience. |
| `/projects` | Project listing route. |
| `/project` | Alias for the project listing route. |
| `/projects/:slug` | Detail page for a development project. |
| `/project/:slug` | Alias for development project detail. |
| `/admin` | Admin dashboard route for content CRUD. |

## Admin Dashboard

The admin dashboard lets portfolio data be managed without editing code.

Current dashboard scope:

- Login with Firebase Auth Email/Password.
- Optional face verification after Firebase Auth login.
- List Development and QA projects from Firestore/local fallback.
- Create/edit/delete projects.
- Seed default projects.
- Toggle `published`.
- Manage experience entries.
- Manage certificates.
- Manage contact copy and social links.

Fields needed in the admin form:

- Slug.
- Title EN.
- Title ID.
- Description EN.
- Description ID.
- Tech stack.
- GitHub URL.
- Live URL.
- Cover URL/path.
- Gradient class.
- Company name.
- Sort order.
- Published.

## Project Structure

```text
rulifweb/
  public/
    certificates/
    CV_Rulif_Fadrian_Nirwansyah_June_2026.pdf
    img_Rulif_logo.png
    og-cover.png
    robots.txt
    sitemap.xml
  src/
    assets/
    components/
      AnimatedBeam/
      Lanyard/
      ScrollReveal/
      ShinyText/
      SoftAurora/
      TextType/
      layout/
      ui/
      ProjectCard.jsx
      SplashScreen.jsx
      ThemeToggle.jsx
    data/
      projectsData.js
    hooks/
      useCarousel.js
      useDarkMode.jsx
      useProjects.js
    lib/
      firebase.js
      adminFaceAuth.js
      utils.js
    pages/
      About.jsx
      Certificate.jsx
      Contact.jsx
      Experience.jsx
      Home.jsx
      ProjectDetail.jsx
      Projects.jsx
      AdminDashboard.jsx
    services/
      adminContentService.js
      projectsService.js
    App.jsx
    index.css
    main.jsx
  FIREBASE_SETUP_CHATGPT.md
  README.md
  README_VERCEL_DEPLOY.md
  vercel.json
  package.json
  vite.config.js
```

## Static Fallback Behavior

The app is designed to keep running even before Firebase is configured.

Behavior:

- If Firebase env variables are complete, project data can come from Firestore.
- If Firebase env variables are missing, the app uses static data from `src/data/projectsData.js`.
- Admin service helpers fall back to `localStorage` when Firebase is disabled.
- Face verification only runs when Firebase is configured and `VITE_ADMIN_FACE_LOGIN_ENABLED=true`.
- Admin media inputs accept URL/path plus drag/drop files for PDF, image, and video. Drag/drop data is stored as data URLs; for large media use Firebase Storage and paste the download URL.

This keeps development smooth while the Firebase Console setup is still in progress.

## Deployment Notes

The project is ready for Vercel deployment. Detailed deployment steps are in:

```text
README_VERCEL_DEPLOY.md
```

Quick summary:

- Vercel Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js Version: `20.x`
- Add all `VITE_FIREBASE_*` variables in Vercel Project Settings.
- Add the Vercel domain to Firebase Authentication > Authorized domains.

The root `vercel.json` contains an SPA rewrite so direct URLs and refreshes keep working:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This is required for React Router routes such as `/admin`, `/projects`, and `/projects/:slug`.

## Next Implementation Tasks

- Add Firestore security rules.
- Add optional Firebase Storage upload for project cover images.
- Continue moving other hardcoded sections to data/service layers later.

## Useful Links

- GitHub: https://github.com/rulifcode
- LinkedIn: https://www.linkedin.com/in/ruliffadrian/
- WhatsApp: https://wa.me/6281382916024

## Author

Rulif Fadria Nirwansyah  
Front-End Developer based in Bandung, Indonesia
