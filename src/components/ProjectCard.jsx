import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Maximize2, X } from "lucide-react";

const TECH_ICON_MAP = {
  // Languages & Runtimes
  PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  Go: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg",
  PostgreSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",

  // Frameworks & Libraries
  "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "Laravel 12": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
  Laravel: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",

  // Tools & Platforms
  Firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
  WordPress: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg",
  Figma: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
  Axios: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/axios/axios-plain.svg",
  Cypress: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cypressio/cypressio-original.svg",
  Playwright: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg",
  Postman: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  iOS: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg",
  Android: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg",
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
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 py-8 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex size-9 items-center justify-center rounded-md border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Close preview"
        >
          <X size={16} strokeWidth={2.2} />
        </button>

        <img src={src} alt={alt} className="max-h-[90vh] w-full object-contain" />
      </div>
    </div>
  );
}

export default function ProjectCard({
  title,
  tech = [],
  github,
  live,
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

  const borderCls = dark ? "border-white/10" : "border-black/10";
  const ringCls = dark ? "ring-white/5" : "ring-black/5";
  const noPreviewText = dark ? "text-white/20" : "text-black/20";
  const previewFallbackCls = dark ? "bg-white/[0.04]" : "bg-black/[0.035]";
  const techIconCls = dark
    ? "border-white/10 bg-white/5 text-white/55 hover:bg-white/10 hover:text-white/80"
    : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-800";
  const titleLength = String(title || "").length;
  const titleSizeCls = titleLength > 54
    ? "text-[12px] leading-snug sm:text-[15px] sm:leading-snug"
    : titleLength > 34
      ? "text-[13px] leading-snug sm:text-base sm:leading-snug"
      : "text-sm sm:text-lg";
  const titleClampCls = titleLength > 34
    ? "min-h-[3.1rem] line-clamp-3 sm:min-h-[4.4rem]"
    : "min-h-[2.5rem] line-clamp-2 sm:min-h-[3.5rem]";

  return (
    <>
      <div
        className={`group relative flex h-[380px] flex-col overflow-hidden rounded-xl border transition-all duration-500 sm:h-[500px] sm:rounded-2xl ${card}`}
      >
        <div className="relative h-28 w-full overflow-hidden sm:h-44">
          {cover && isPdfCover ? (
            <a
              href={cover}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex h-full w-full flex-col items-center justify-center gap-2 ${previewFallbackCls}`}
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
            <button
              type="button"
              onClick={openViewer}
              className="group/image relative block h-full w-full cursor-zoom-in overflow-hidden"
              aria-label={`Enlarge ${title}`}
            >
              <img
                src={cover}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-md border border-white/15 bg-black/45 text-white opacity-0 backdrop-blur transition group-hover/image:opacity-100">
                <Maximize2 size={14} strokeWidth={2.2} />
              </span>
            </button>
          ) : (
            <div className={`flex h-full w-full items-center justify-center ${previewFallbackCls}`}>
              <span className={`${noPreviewText} text-xs tracking-widest uppercase`}>No Preview</span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-3 sm:gap-4 sm:p-6">
          <div className={`absolute inset-0 rounded-2xl ring-1 ring-inset ${ringCls} pointer-events-none`} />

          <div className="relative z-10">
            <h3 className={`font-semibold break-words transition-colors duration-300 ${titleClampCls} ${titleSizeCls} ${titleCls}`}>
              {title}
            </h3>
          </div>

          {tech.length > 0 && (
            <div className="relative z-10 mt-auto flex min-h-[4.25rem] max-h-[4.25rem] flex-wrap content-start gap-1 overflow-hidden sm:min-h-[4.75rem] sm:max-h-[4.75rem] sm:gap-1.5">
              {tech.map((name) => {
                const iconUrl = TECH_ICON_MAP[name];

                if (iconUrl) {
                  return (
                    <span
                      key={name}
                      title={name}
                      className={`inline-flex size-7 items-center justify-center rounded-md border transition-all duration-200 sm:size-8 ${techIconCls}`}
                    >
                      <img
                        src={iconUrl}
                        alt={name}
                        className="h-4 w-4 object-contain sm:h-[18px] sm:w-[18px]"
                        loading="lazy"
                      />
                    </span>
                  );
                }

                return (
                  <span
                    key={name}
                    title={name}
                    className={`inline-flex min-h-7 items-center justify-center rounded-md border px-1.5 text-center text-[8px] font-medium leading-tight transition-all duration-200 sm:min-h-8 sm:px-2 sm:text-[10px] ${badgeCls}`}
                  >
                    {name}
                  </span>
                );
              })}
            </div>
          )}

          <div className={`relative z-10 flex flex-col gap-2 border-t pt-2 ${borderCls}`}>
            {companyIcon && (
              <div className="flex min-w-0 items-center gap-2">
                <div
                  title={companyName ?? ""}
                  className={`flex h-6 w-6 flex-shrink-0 items-center justify-center overflow-hidden rounded-md border bg-white ${dark ? "border-white/10" : "border-black/10"}`}
                >
                  <img src={companyIcon} alt={companyName ?? "company"} className="h-4 w-4 object-contain" />
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

      {viewerOpen && cover && !isPdfCover && !isVideoCover && (
        <ImageViewer src={cover} alt={title} onClose={closeViewer} />
      )}
    </>
  );
}
