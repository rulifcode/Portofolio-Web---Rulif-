import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Maximize2,
} from "lucide-react";
import { useLang } from "../components/layout/Navbar";
import useProjects from "../hooks/useProjects";

function DetailButton({ href, children, dark, icon: Icon }) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${dark
        ? "border-white/10 bg-white/[0.05] text-white/70 hover:border-white/20 hover:bg-white/[0.09] hover:text-white"
        : "border-black/10 bg-white text-black/65 shadow-sm hover:border-black/15 hover:bg-gray-50 hover:text-black"
        }`}
    >
      {Icon && <Icon size={16} strokeWidth={2.2} />}
      {children}
      <ExternalLink size={14} strokeWidth={2.2} />
    </a>
  );
}

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

function EmptyPreview({ dark }) {
  return (
    <div className={`flex aspect-[16/10] w-full items-center justify-center rounded-lg border ${dark
      ? "border-white/10 bg-white/[0.03] text-white/25"
      : "border-black/10 bg-black/[0.03] text-black/25"
      }`}
    >
      <ImageIcon size={30} strokeWidth={1.8} />
    </div>
  );
}

function MediaPreview({ src, title, dark, onOpen }) {
  if (isPdfFile(src)) {
    return (
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 rounded-lg border text-sm transition ${dark
          ? "border-white/10 bg-white/[0.04] text-white/60 hover:border-white/20 hover:text-white"
          : "border-black/10 bg-black/[0.03] text-black/60 hover:border-black/20 hover:text-black"
          }`}
      >
        <FileText size={34} strokeWidth={1.8} />
        <span>Open PDF</span>
      </a>
    );
  }

  if (isVideoFile(src)) {
    return (
      <div className="aspect-[16/10] w-full overflow-hidden rounded-lg">
        <video
          src={src}
          className={`h-full w-full object-contain ${dark ? "bg-black/30" : "bg-gray-100"}`}
          autoPlay
          muted
          loop
          playsInline
          controls
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block aspect-[16/10] w-full overflow-hidden rounded-lg"
      aria-label={`Open ${title} preview`}
    >
      <img
        src={src}
        alt={title}
        className={`h-full w-full object-contain transition duration-500 group-hover:scale-[1.015] ${dark ? "bg-black/30" : "bg-gray-100"}`}
      />
      <span className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-md border border-white/15 bg-black/40 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
        <Maximize2 size={16} strokeWidth={2.1} />
      </span>
    </button>
  );
}

function MediaLightbox({ src, title, onClose }) {
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!src || isPdfFile(src)) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative max-h-[88vh] w-full max-w-6xl overflow-hidden rounded-lg border border-white/10 bg-black"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex size-9 items-center justify-center rounded-md border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Close preview"
        >
          x
        </button>
        {isVideoFile(src) ? (
          <video
            src={src}
            className="max-h-[88vh] w-full object-contain"
            autoPlay
            muted
            loop
            playsInline
            controls
          />
        ) : (
          <img src={src} alt={title} className="max-h-[88vh] w-full object-contain" />
        )}
      </div>
    </div>
  );
}

function MediaSlider({ media, title, dark }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState("");
  const hasManyMedia = media.length > 1;
  const safeActiveIndex = media.length > 0 ? Math.min(activeIndex, media.length - 1) : 0;
  const activeMedia = media[safeActiveIndex];

  const goTo = (index) => {
    setActiveIndex((index + media.length) % media.length);
  };

  const frame = dark
    ? "border-white/10 bg-[#080808]/75"
    : "border-black/10 bg-white/80 shadow-sm";

  if (media.length === 0) {
    return <EmptyPreview dark={dark} />;
  }

  return (
    <>
      <section className={`overflow-hidden rounded-lg border p-2 sm:p-3 ${frame}`}>
        <div className="relative">
          <MediaPreview
            src={activeMedia}
            title={`${title} media ${safeActiveIndex + 1}`}
            dark={dark}
            onOpen={() => setLightboxSrc(activeMedia)}
          />

          {hasManyMedia && (
            <>
              <button
                type="button"
                onClick={() => goTo(safeActiveIndex - 1)}
                className={`absolute left-3 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-md border backdrop-blur transition ${dark
                  ? "border-white/15 bg-black/45 text-white/75 hover:bg-black/70 hover:text-white"
                  : "border-black/10 bg-white/75 text-black/60 hover:bg-white hover:text-black"
                  }`}
                aria-label="Previous media"
              >
                <ChevronLeft size={20} strokeWidth={2.2} />
              </button>
              <button
                type="button"
                onClick={() => goTo(safeActiveIndex + 1)}
                className={`absolute right-3 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-md border backdrop-blur transition ${dark
                  ? "border-white/15 bg-black/45 text-white/75 hover:bg-black/70 hover:text-white"
                  : "border-black/10 bg-white/75 text-black/60 hover:bg-white hover:text-black"
                  }`}
                aria-label="Next media"
              >
                <ChevronRight size={20} strokeWidth={2.2} />
              </button>
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs text-white/75 backdrop-blur">
                {safeActiveIndex + 1} / {media.length}
              </div>
            </>
          )}
        </div>

        {hasManyMedia && (
          <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
            {media.map((item, index) => (
              <button
                key={`${item}-${index}`}
                type="button"
                onClick={() => goTo(index)}
                className={`relative aspect-video overflow-hidden rounded-md border transition ${index === safeActiveIndex
                  ? dark
                    ? "border-white/60"
                    : "border-black/55"
                  : dark
                    ? "border-white/10 opacity-60 hover:opacity-100"
                    : "border-black/10 opacity-70 hover:opacity-100"
                  }`}
                aria-label={`Open media ${index + 1}`}
              >
                {isPdfFile(item) ? (
                  <span className={`flex h-full w-full items-center justify-center ${dark ? "bg-white/[0.04] text-white/50" : "bg-black/[0.04] text-black/50"}`}>
                    <FileText size={18} strokeWidth={1.8} />
                  </span>
                ) : isVideoFile(item) ? (
                  <video src={item} className="h-full w-full object-cover" muted playsInline />
                ) : (
                  <img src={item} alt={`${title} thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                )}
              </button>
            ))}
          </div>
        )}
      </section>

      <MediaLightbox
        src={lightboxSrc}
        title={title}
        onClose={() => setLightboxSrc("")}
      />
    </>
  );
}

export default function ProjectDetail({ dark }) {
  const { slug } = useParams();
  const { lang } = useLang();
  const { t, devProjects } = useProjects(lang);
  const project = devProjects.find((item) => item.slug === slug);
  const media = useMemo(() => (project ? getUniqueMedia(project) : []), [project]);
  const textPrimary = dark ? "text-white/90" : "text-black/90";
  const textMuted = dark ? "text-white/45" : "text-black/45";
  const panel = dark
    ? "border-white/10 bg-[#0a0a0a]/65"
    : "border-black/10 bg-white/80 shadow-sm";
  const softPanel = dark
    ? "border-white/10 bg-white/[0.035]"
    : "border-black/10 bg-black/[0.025]";

  if (!project) {
    return (
      <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link to="/#projects" className={`text-sm ${textMuted}`}>
            {t.detail.back}
          </Link>
          <div className={`mt-10 rounded-2xl border p-8 ${panel}`}>
            <p className={textPrimary}>{t.detail.unavailable}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <Link
          to="/#projects"
          className={`inline-flex items-center gap-2 text-sm transition-colors ${dark ? "text-white/45 hover:text-white" : "text-black/45 hover:text-black"}`}
        >
          <ArrowLeft size={16} strokeWidth={2.2} />
          {t.detail.back}
        </Link>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.25fr)_360px] lg:items-start">
          <div className="space-y-5">
            <header className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-widest ${softPanel} ${textMuted}`}>
                  Project Development
                </span>
                {project.companyName && (
                  <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-widest ${softPanel} ${textMuted}`}>
                    {project.companyName}
                  </span>
                )}
              </div>
              <h1 className={`max-w-4xl text-4xl font-bold leading-tight sm:text-5xl ${textPrimary}`}>
                {project.title}
              </h1>
              <p className={`max-w-3xl text-sm leading-relaxed sm:text-base ${dark ? "text-white/62" : "text-black/62"}`}>
                {project.description}
              </p>
            </header>

            <MediaSlider media={media} title={project.title} dark={dark} />

            <section className={`rounded-lg border p-5 sm:p-6 ${panel}`}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <h2 className={`text-xs font-semibold tracking-widest uppercase ${textPrimary}`}>
                    {t.detail.overview}
                  </h2>
                  <p className={`mt-3 text-sm leading-relaxed ${dark ? "text-white/58" : "text-black/58"}`}>
                    {project.description}
                  </p>
                </div>
                <div>
                  <h2 className={`text-xs font-semibold tracking-widest uppercase ${textPrimary}`}>
                    {t.detail.stack}
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium ${dark
                          ? "border-white/10 bg-white/[0.04] text-white/62"
                          : "border-black/10 bg-black/[0.03] text-black/62"
                          }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24">
            <section className={`rounded-lg border p-5 ${panel}`}>
              <h2 className={`text-xs font-semibold tracking-widest uppercase ${textPrimary}`}>
                {t.detail.links}
              </h2>
              <div className="mt-4 grid gap-3">
                <DetailButton href={project.github} dark={dark} icon={Code2}>{t.detail.github}</DetailButton>
                <DetailButton href={project.live} dark={dark} icon={ExternalLink}>{t.detail.live}</DetailButton>
                {!project.github && !project.live && (
                  <p className={`text-sm ${textMuted}`}>Project link belum tersedia.</p>
                )}
              </div>
            </section>

            <section className={`rounded-lg border p-5 ${panel}`}>
              <h2 className={`text-xs font-semibold tracking-widest uppercase ${textPrimary}`}>
                Project Info
              </h2>
              <div className={`mt-4 divide-y ${dark ? "divide-white/10" : "divide-black/10"}`}>
                <div className="flex items-center justify-between gap-4 py-3 first:pt-0">
                  <span className={`text-xs ${textMuted}`}>Category</span>
                  <span className={`text-sm font-medium ${textPrimary}`}>Development</span>
                </div>
                <div className="flex items-center justify-between gap-4 py-3">
                  <span className={`text-xs ${textMuted}`}>Media</span>
                  <span className={`text-sm font-medium ${textPrimary}`}>{media.length}</span>
                </div>
                {project.companyName && (
                  <div className="flex items-center justify-between gap-4 py-3">
                    <span className={`text-xs ${textMuted}`}>Source</span>
                    <span className={`text-sm font-medium ${textPrimary}`}>{project.companyName}</span>
                  </div>
                )}
              </div>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
