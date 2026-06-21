import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";


const TECH_ICON_MAP = {
  // Languages & Runtimes
  "PHP":           "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
  "MySQL":         "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  "TypeScript":    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  "JavaScript":    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  "Go":            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg",
  "PostgreSQL":    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",

  // Frameworks & Libraries
  "React.js":      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "Next.js":       "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  "Node.js":       "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "Laravel 12":    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
  "Laravel":       "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
  "Tailwind CSS":  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "CSS":           "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  "HTML":          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  "Blade":null,

  // Tools & Platforms
  "Firebase":      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
  "WordPress":     "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg",
  "Figma":         "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
  "Axios":         "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/axios/axios-plain.svg",
  "Cypress":       "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cypressio/cypressio-original.svg",
  "Playwright":    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg",
  "Postman":       "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
  "Cloudinary":    null,
  "Docker":        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  "iOS":           "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg",
  "Android":       "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg",

  // Text-only badges
  "SEO":           null,
  "WooCommerce":   null,
  "Framer Motion": null,
  "TMDB API":      null,
  "REST API":      null,
  "Agile":         null,
  "Manual Testing":null,
  "Bug Report":    null,
  "Test Case":     null,
  "CMS":           null,
  "Custom Hooks":  null,
};

function isPdfFile(value) {
  return /^data:application\/pdf/i.test(value || "") || /\.pdf($|\?)/i.test(value || "");
}

function isVideoFile(value) {
  return /^data:video\//i.test(value || "") || /\.(mp4|webm|ogg|mov)($|\?)/i.test(value || "");
}

function ImageViewer({ src, alt, onClose }) {
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
      onClick={onClose}
    >
      {/* Modal card — no dark backdrop */}
      <div
        className="relative bg-white dark:bg-[#111] rounded-2xl shadow-2xl overflow-hidden max-w-[80vw] max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors duration-150"
          aria-label="Close"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <img
          src={src}
          alt={alt}
          className="block max-w-full max-h-[80vh] object-contain"
        />
      </div>
    </div>
  );
}

export default function ProjectCard({
  title,
  tech = [],
  github,
  live,
  gradient = "from-blue-500/20 via-violet-500/10 to-transparent",
  cover = null,
  dark = true,
  companyIcon = null,
  companyName = null,
  detailHref = null,
}) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const isPdfCover = isPdfFile(cover);
  const isVideoCover = isVideoFile(cover);

  const openViewer = useCallback((e) => {
    if (!cover || isPdfCover || isVideoCover) return;
    e.preventDefault();
    e.stopPropagation();
    setViewerOpen(true);
  }, [cover, isPdfCover, isVideoCover]);

  const closeViewer = useCallback(() => setViewerOpen(false), []);

  /* ── theme-aware tokens ─────────────────────────────────────── */
  const card = dark
    ? "border-white/10 bg-[#0a0a0a] hover:border-white/20 hover:bg-[#111111]"
    : "border-black/10 bg-white hover:border-black/15 hover:bg-gray-50 shadow-sm hover:shadow-md";

  const titleCls = dark
    ? "text-white group-hover:text-white/90"
    : "text-gray-900 group-hover:text-gray-800";


  const badgeCls = dark
    ? "border-white/10 bg-white/5 text-white/60"
    : "border-black/10 bg-black/[0.04] text-gray-600";

  const actionLinkCls = dark
    ? "border-white/10 bg-white/[0.04] text-white/55 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
    : "border-black/10 bg-black/[0.03] text-gray-500 hover:border-black/20 hover:bg-black/[0.06] hover:text-gray-900";


  const borderCls = dark ? "border-white/10" : "border-black/8";

  const ringCls = dark ? "ring-white/5" : "ring-black/5";

  const noPreviewText = dark ? "text-white/20" : "text-black/20";

  const overlayGradient = dark
    ? "from-black/60 via-transparent to-transparent"
    : "from-black/30 via-transparent to-transparent";

  return (
    <>
      <div
        className={`group relative overflow-hidden rounded-xl sm:rounded-2xl border flex flex-col transition-all duration-500 ${card}`}
      >
        {/* Cover Image */}
        <div className="relative w-full h-28 sm:h-44 overflow-hidden">
          {cover && isPdfCover ? (
            <a
              href={cover}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br ${gradient}`}
            >
              <span className={`${noPreviewText} text-xs font-semibold tracking-widest uppercase`}>
                PDF Preview
              </span>
              <span className={`${dark ? "text-white/45" : "text-black/45"} text-[10px]`}>
                Open file
              </span>
            </a>
          ) : cover && isVideoCover ? (
            <video
              src={cover}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : cover ? (
            <>
              <img
                src={cover}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* View image button — appears on hover */}
              <button
                onClick={openViewer}
                className="absolute inset-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-zoom-in"
                aria-label="View image"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>
            </>
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}
            >
              <span className={`${noPreviewText} text-xs tracking-widest uppercase`}>
                No Preview
              </span>
            </div>
          )}
          <div className={`absolute inset-0 bg-gradient-to-t ${overlayGradient} pointer-events-none`} />
        </div>

        {/* Content */}
        <div className="p-3 sm:p-6 flex flex-col gap-2 sm:gap-4 flex-1">
          {/* Gradient glow hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none`}
          />
          <div
            className={`absolute inset-0 rounded-2xl ring-1 ring-inset ${ringCls} pointer-events-none`}
          />

          {/* Header */}
          <div className="relative z-10">
            <h3 className={`min-h-[2.5rem] text-sm font-semibold leading-snug line-clamp-2 break-words transition-colors duration-300 sm:min-h-[3.5rem] sm:text-lg ${titleCls}`}>
              {title}
            </h3>
          </div>

          {/* Tech badges */}
          {tech.length > 0 && (
            <div className="relative z-10 flex flex-wrap gap-1 sm:gap-1.5 mt-auto">
              {tech.map((name) => {
                const iconUrl = TECH_ICON_MAP[name];
                return iconUrl ? (
                  <span
                    key={name}
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
                    />
                  </span>
                ) : (
                  <span
                    key={name}
                    className={`text-[8px] sm:text-[10px] font-medium px-1.5 sm:px-2 py-0.5 rounded-full border tracking-wide ${badgeCls}`}
                  >
                    {name}
                  </span>
                );
              })}
            </div>
          )}

          {/* Links + Company Icon */}
          <div className={`relative z-10 flex flex-col gap-2 pt-2 border-t ${borderCls}`}>
            {/* Company Icon */}
            {companyIcon && (
              <div className="flex min-w-0 items-center gap-2">
                <div
                  title={companyName ?? ""}
                  className={`w-6 h-6 rounded-md border ${dark ? "border-white/10" : "border-black/10"} bg-white flex items-center justify-center overflow-hidden flex-shrink-0`}
                >
                  <img
                    src={companyIcon}
                    alt={companyName ?? "company"}
                    className="w-4 h-4 object-contain"
                  />
                </div>
                {companyName && (
                  <span className={`truncate text-[10px] font-medium ${dark ? "text-white/35" : "text-gray-400"}`}>
                    {companyName}
                  </span>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-1.5 sm:flex sm:flex-wrap sm:gap-2 [&>*]:min-w-0">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex min-w-0 items-center justify-center gap-1.5 rounded-md border px-2 py-1.5 text-[10px] font-medium transition-colors duration-200 sm:text-[11px] ${actionLinkCls}`}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="flex-none">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  <span className="truncate">GitHub</span>
                </a>
              )}

              {live && (
                <a
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex min-w-0 items-center justify-center gap-1.5 rounded-md border px-2 py-1.5 text-[10px] font-medium transition-colors duration-200 sm:text-[11px] ${actionLinkCls}`}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-none"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  <span className="truncate">Live Demo</span>
                </a>
              )}

              {detailHref && (
                <Link
                  to={detailHref}
                  className={`inline-flex min-w-0 items-center justify-center gap-1.5 rounded-md border px-2 py-1.5 text-[10px] font-medium transition-colors duration-200 sm:text-[11px] ${actionLinkCls}`}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-none"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                  <span className="truncate">Details</span>
                </Link>
              )}

              {!github && !live && !detailHref && (
                <span className="inline-flex items-center justify-center gap-1.5 rounded-md border border-amber-400/20 bg-amber-400/10 px-2 py-1.5 text-[10px] font-medium text-amber-400/80 sm:text-[11px]">
                  <span className="size-1.5 rounded-full bg-amber-400 animate-pulse" />
                  On Going
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Viewer */}
      {viewerOpen && cover && !isPdfCover && !isVideoCover && (
        <ImageViewer src={cover} alt={title} onClose={closeViewer} />
      )}
    </>
  );
}
