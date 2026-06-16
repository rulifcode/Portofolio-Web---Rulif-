import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Maximize2,
  X,
} from "lucide-react";
import { useLang } from "../components/layout/Navbar";
import useProjects from "../hooks/useProjects";

// ---------------------------------------------------------------------------
// Media helpers
// ---------------------------------------------------------------------------

function isPdfFile(value) {
  return /^data:application\/pdf/i.test(value || "") || /\.pdf($|\?)/i.test(value || "");
}

function isVideoFile(value) {
  return /^data:video\//i.test(value || "") || /\.(mp4|webm|ogg|mov)($|\?)/i.test(value || "");
}

function getUniqueMedia(project) {
  const media = [project.cover, ...(project.images || [])].filter(Boolean);
  return [...new Set(media)];
}

// ---------------------------------------------------------------------------
// Lightbox
// ---------------------------------------------------------------------------

function MediaLightbox({ src, title, onClose }) {
  useEffect(() => {
    if (!src) return;
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [src, onClose]);

  if (!src || isPdfFile(src)) return null;

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
        {isVideoFile(src) ? (
          <video src={src} className="max-h-[90vh] w-full object-contain" autoPlay muted loop playsInline controls />
        ) : (
          <img src={src} alt={title} className="max-h-[90vh] w-full object-contain" />
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Thumbnail strip
// ---------------------------------------------------------------------------

function ThumbnailStrip({ media, activeIndex, onSelect, dark }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current?.children[activeIndex];
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [activeIndex]);

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
      style={{ scrollbarWidth: "none" }}
    >
      {media.map((item, index) => (
        <button
          key={`${item}-${index}`}
          type="button"
          onClick={() => onSelect(index)}
          className={`relative flex-none aspect-video w-20 overflow-hidden rounded-md border transition-all duration-200 ${
            index === activeIndex
              ? dark
                ? "border-white/70 opacity-100 ring-1 ring-white/30"
                : "border-black/60 opacity-100 ring-1 ring-black/20"
              : dark
              ? "border-white/10 opacity-45 hover:opacity-80"
              : "border-black/10 opacity-50 hover:opacity-90"
          }`}
          aria-label={`Go to media ${index + 1}`}
        >
          {isPdfFile(item) ? (
            <span className={`flex h-full w-full items-center justify-center text-xs ${dark ? "bg-white/[0.04] text-white/40" : "bg-black/[0.04] text-black/40"}`}>
              <FileText size={16} strokeWidth={1.8} />
            </span>
          ) : isVideoFile(item) ? (
            <video src={item} className="h-full w-full object-cover" muted playsInline />
          ) : (
            <img src={item} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover" />
          )}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main media viewer
// ---------------------------------------------------------------------------

function MediaViewer({ media, title, dark }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState("");

  const safeIndex = media.length > 0 ? Math.min(activeIndex, media.length - 1) : 0;
  const src = media[safeIndex];
  const hasManyMedia = media.length > 1;

  const goTo = (index) => setActiveIndex((index + media.length) % media.length);

  if (media.length === 0) {
    return (
      <div className={`flex aspect-[16/10] w-full items-center justify-center rounded-xl border ${
        dark ? "border-white/10 bg-white/[0.03] text-white/20" : "border-black/10 bg-black/[0.03] text-black/20"
      }`}>
        <ImageIcon size={32} strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {/* Main viewer */}
        <div className={`relative overflow-hidden rounded-xl border ${
          dark ? "border-white/10 bg-black/40" : "border-black/08 bg-gray-50"
        }`}>
          {isPdfFile(src) ? (
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 text-sm transition ${
                dark ? "text-white/50 hover:text-white" : "text-black/50 hover:text-black"
              }`}
            >
              <FileText size={36} strokeWidth={1.5} />
              <span className="font-medium">Open PDF</span>
            </a>
          ) : isVideoFile(src) ? (
            <div className="aspect-[16/10] w-full">
              <video
                src={src}
                className={`h-full w-full object-contain ${dark ? "bg-black/30" : "bg-gray-100"}`}
                autoPlay muted loop playsInline controls
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setLightboxSrc(src)}
              className="group relative block aspect-[16/10] w-full overflow-hidden"
              aria-label={`Enlarge ${title}`}
            >
              <img
                src={src}
                alt={`${title} — media ${safeIndex + 1}`}
                className={`h-full w-full object-contain transition duration-500 group-hover:scale-[1.02] ${
                  dark ? "bg-black/20" : "bg-gray-100"
                }`}
              />
              <span className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-md border border-white/15 bg-black/45 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                <Maximize2 size={15} strokeWidth={2.2} />
              </span>
            </button>
          )}

          {/* Arrow navigation */}
          {hasManyMedia && (
            <>
              <button
                type="button"
                onClick={() => goTo(safeIndex - 1)}
                className={`absolute left-3 top-1/2 -translate-y-1/2 inline-flex size-9 items-center justify-center rounded-md border backdrop-blur transition ${
                  dark
                    ? "border-white/15 bg-black/50 text-white/80 hover:bg-black/75 hover:text-white"
                    : "border-black/10 bg-white/80 text-black/60 hover:bg-white hover:text-black"
                }`}
                aria-label="Previous"
              >
                <ChevronLeft size={18} strokeWidth={2.2} />
              </button>
              <button
                type="button"
                onClick={() => goTo(safeIndex + 1)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 inline-flex size-9 items-center justify-center rounded-md border backdrop-blur transition ${
                  dark
                    ? "border-white/15 bg-black/50 text-white/80 hover:bg-black/75 hover:text-white"
                    : "border-black/10 bg-white/80 text-black/60 hover:bg-white hover:text-black"
                }`}
                aria-label="Next"
              >
                <ChevronRight size={18} strokeWidth={2.2} />
              </button>

              {/* Counter badge */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur select-none">
                {safeIndex + 1} / {media.length}
              </div>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {hasManyMedia && (
          <ThumbnailStrip
            media={media}
            activeIndex={safeIndex}
            onSelect={goTo}
            dark={dark}
          />
        )}
      </div>

      <MediaLightbox src={lightboxSrc} title={title} onClose={() => setLightboxSrc("")} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Link button
// ---------------------------------------------------------------------------

function ProjectLink({ href, icon: Icon, label, dark }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium transition-all duration-200 ${
        dark
          ? "border-white/10 bg-white/[0.04] text-white/70 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
          : "border-black/10 bg-white text-black/65 shadow-sm hover:border-black/20 hover:shadow-md hover:text-black"
      }`}
    >
      <Icon size={16} strokeWidth={2.2} className="flex-none" />
      <span className="flex-1">{label}</span>
      <ExternalLink size={13} strokeWidth={2.2} className="opacity-50 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}

// ---------------------------------------------------------------------------
// Info row
// ---------------------------------------------------------------------------

function InfoRow({ label, value, dark }) {
  return (
    <div className={`flex items-center justify-between gap-4 py-3 border-b last:border-b-0 ${
      dark ? "border-white/[0.07]" : "border-black/[0.07]"
    }`}>
      <span className={`text-xs ${dark ? "text-white/40" : "text-black/40"}`}>{label}</span>
      <span className={`text-sm font-medium ${dark ? "text-white/80" : "text-black/80"}`}>{value}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tech badge
// ---------------------------------------------------------------------------

function TechBadge({ label, dark }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium ${
      dark
        ? "border-white/10 bg-white/[0.05] text-white/65"
        : "border-black/10 bg-black/[0.04] text-black/65"
    }`}>
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function ProjectDetail({ dark }) {
  const { slug } = useParams();
  const { lang } = useLang();
  const navigate = useNavigate();
  const { t, devProjects } = useProjects(lang);

  const project = devProjects.find((item) => item.slug === slug);
  const media = useMemo(() => (project ? getUniqueMedia(project) : []), [project]);

  // Fix: navbar clicks use hash navigation — intercept and route properly
  useEffect(() => {
    const handleHashClick = (e) => {
      const anchor = e.target.closest("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      // Internal hash links like /#projects, /#about etc.
      if (href && href.startsWith("/#")) {
        e.preventDefault();
        navigate("/");
        // Small delay so the home page mounts before attempting scroll
        setTimeout(() => {
          const id = href.slice(2);
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
          else window.scrollTo({ top: 0, behavior: "smooth" });
        }, 120);
      }
    };
    document.addEventListener("click", handleHashClick);
    return () => document.removeEventListener("click", handleHashClick);
  }, [navigate]);

  const textPrimary = dark ? "text-white/90" : "text-black/90";
  const textMuted = dark ? "text-white/45" : "text-black/45";
  const cardBg = dark
    ? "border-white/[0.08] bg-white/[0.03]"
    : "border-black/[0.08] bg-white shadow-sm";

  // ── Not found ──────────────────────────────────────────────────────────────
  if (!project) {
    return (
      <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className={`inline-flex items-center gap-2 text-sm transition-colors ${textMuted} hover:${textPrimary}`}
          >
            <ArrowLeft size={16} strokeWidth={2.2} />
            {t.detail?.back || "Back"}
          </button>
          <div className={`mt-10 rounded-2xl border p-10 text-center ${cardBg}`}>
            <ImageIcon size={32} strokeWidth={1.5} className={`mx-auto mb-4 ${textMuted}`} />
            <p className={`font-medium ${textPrimary}`}>{t.detail?.unavailable || "Project not found."}</p>
          </div>
        </div>
      </main>
    );
  }

  // ── Page ───────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen pt-24 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">

        {/* ── Back link ── */}
        <Link
          to="/#projects"
          className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${textMuted} hover:${textPrimary}`}
        >
          <ArrowLeft size={16} strokeWidth={2.2} />
          {t.detail?.back || "Back to Projects"}
        </Link>

        {/* ── Hero header ── */}
        <header className="space-y-4 max-w-3xl">
          {/* Eyebrow badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-widest ${cardBg} ${textMuted}`}>
              Project Development
            </span>
            {project.companyName && (
              <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-widest ${cardBg} ${textMuted}`}>
                {project.companyName}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className={`text-4xl font-bold leading-tight sm:text-5xl ${textPrimary}`}>
            {project.title}
          </h1>

          {/* Description — rendered ONCE here only */}
          <p className={`text-base leading-relaxed sm:text-lg ${dark ? "text-white/58" : "text-black/58"}`}>
            {project.description}
          </p>
        </header>

        {/* ── Main content grid ── */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">

          {/* Left — media viewer */}
          <div className="space-y-8">
            <MediaViewer media={media} title={project.title} dark={dark} />

            {/* Tech stack */}
            {project.tech?.length > 0 && (
              <section className={`rounded-xl border p-6 ${cardBg}`}>
                <h2 className={`text-[11px] font-semibold uppercase tracking-widest mb-4 ${textMuted}`}>
                  {t.detail?.stack || "Tech Stack"}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <TechBadge key={tech} label={tech} dark={dark} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right — sticky sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-24">

            {/* Project links */}
            <section className={`rounded-xl border p-5 ${cardBg}`}>
              <h2 className={`text-[11px] font-semibold uppercase tracking-widest mb-4 ${textMuted}`}>
                {t.detail?.links || "Project Links"}
              </h2>
              <div className="space-y-2.5">
                <ProjectLink href={project.github} icon={Code2} label={t.detail?.github || "GitHub"} dark={dark} />
                <ProjectLink href={project.live} icon={ExternalLink} label={t.detail?.live || "Live Demo"} dark={dark} />
                {!project.github && !project.live && (
                  <p className={`text-sm ${textMuted}`}>Link belum tersedia.</p>
                )}
              </div>
            </section>

            {/* Project info */}
            <section className={`rounded-xl border p-5 ${cardBg}`}>
              <h2 className={`text-[11px] font-semibold uppercase tracking-widest mb-2 ${textMuted}`}>
                Project Info
              </h2>
              <InfoRow label="Category" value="Development" dark={dark} />
              <InfoRow label="Media" value={`${media.length} file${media.length !== 1 ? "s" : ""}`} dark={dark} />
              {project.companyName && (
                <InfoRow label="Company" value={project.companyName} dark={dark} />
              )}
              {project.tech?.length > 0 && (
                <InfoRow label="Stack" value={`${project.tech.length} technologies`} dark={dark} />
              )}
            </section>

            {/* Company logo (if available) */}
            {project.companyIcon && (
              <section className={`rounded-xl border p-5 ${cardBg}`}>
                <h2 className={`text-[11px] font-semibold uppercase tracking-widest mb-4 ${textMuted}`}>
                  Company
                </h2>
                <div className="flex items-center gap-3">
                  <img
                    src={project.companyIcon}
                    alt={project.companyName}
                    className="h-9 w-9 rounded-md object-contain"
                  />
                  {project.companyName && (
                    <span className={`text-sm font-medium ${textPrimary}`}>{project.companyName}</span>
                  )}
                </div>
              </section>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}