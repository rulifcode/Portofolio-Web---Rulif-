import ProjectCard from "../components/ProjectCard";
import MentorFeedback from "../components/ui/MentorFeedback";
import coverEcommerce from "../assets/1774056567909.jpg";
import coverFurniture from "../assets/Purple and Pink Gradient Modern Bold Mobile App Presentation.jpg";
import coverRecipe    from "../assets/Purple and Pink Gradient Modern Bold Mobile App Presentation (1).jpg";

const projects = [
  {
    title: "E-Commerce App (Tim Ubuntu)",
    description: "Final project bootcamp Lumoshive batch III — aplikasi e-commerce fullstack dengan fitur autentikasi, manajemen produk, keranjang belanja, dan checkout.",
    tech: ["React", "JavaScript", "Tailwind CSS"],
    github: "https://github.com/lumoshive-final-project-batch-III/Frontend-project-app-ecommerce-frontend-tim-Ubuntu",
    live: "https://frontend-project-app-ecommerce-fron.vercel.app/",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    cover: coverEcommerce,
  },
  {
    title: "Perpustakaan Online",
    description: "Sistem manajemen perpustakaan digital berbasis Native PHP & MySQLi dengan fitur peminjaman buku, manajemen anggota, dan laporan.",
    tech: ["PHP", "MySQLi", "HTML", "CSS"],
    github: "https://github.com/rulifcode/Perpustakaan_Online-Native_PHP_Mysqli",
    live: null,
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    cover: null,
  },
  {
    title: "React E-Commerce Firebase",
    description: "Platform e-commerce modern dengan autentikasi Firebase, manajemen produk real-time, dan UI yang responsif.",
    tech: ["React", "Firebase", "CSS"],
    github: "https://github.com/rulifcode/react-ecommerce-firebase",
    live: null,
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    cover: null,
  },
  {
    title: "Furniture Landing Page",
    description: "Landing page modern untuk brand furniture dengan desain elegan, animasi smooth, dan layout yang fully responsive.",
    tech: ["React", "JavaScript", "Tailwind CSS"],
    github: "https://github.com/rulifcode/furniture-react-landing-page",
    live: "https://furniture-react-landing-page-rulif.vercel.app/",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    cover: coverFurniture,
  },
  {
    title: "Food Recipe App",
    description: "Aplikasi resep makanan yang terintegrasi dengan API eksternal, menampilkan berbagai resep dengan fitur pencarian dan filter kategori.",
    tech: ["React", "CSS", "REST API"],
    github: "https://github.com/rulifcode/mp-food-recipe-api",
    live: "https://mp-food-recipe-api.vercel.app/",
    gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
    cover: coverRecipe,
  },
  {
    title: "Start Up Match Making",
    description: "Mini project Lumoshive Academy — platform penjodohan startup dengan investor, dilengkapi fitur matching dan profil perusahaan.",
    tech: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/rulifcode/Start-Up-Match-Making",
    live: null,
    gradient: "from-sky-500/20 via-indigo-500/10 to-transparent",
    cover: null,
  },
];

export default function Projects({ dark }) {
  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`h-px flex-1 bg-gradient-to-r from-transparent ${dark ? "via-white/10" : "via-black/10"} to-transparent`} />
            <span className={`text-[10px] tracking-widest uppercase font-medium ${dark ? "text-white/30" : "text-black/30"}`}>
              Portfolio
            </span>
            <div className={`h-px flex-1 bg-gradient-to-r from-transparent ${dark ? "via-white/10" : "via-black/10"} to-transparent`} />
          </div>

          <h2 className={`text-4xl font-bold text-center ${dark ? "text-white/90" : "text-black/90"}`}>
            My Projects
          </h2>

          <p className={`text-center text-sm max-w-md mx-auto ${dark ? "text-white/40" : "text-black/40"}`}>
            Kumpulan project yang pernah saya kerjakan — dari web app hingga sistem manajemen.
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
            Lihat semua project di GitHub
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform duration-200">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

      </div>
      <MentorFeedback />
    </main>
  );
}