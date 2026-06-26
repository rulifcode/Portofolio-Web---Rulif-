import { useCallback, useEffect, useRef, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { useLang } from "../components/layout/Navbar";
import useProjects from "../hooks/useProjects";

const AUTO_SLIDE_MS = 4000;

function useRevealOnce() {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(() => {
    if (typeof window === "undefined") return true;

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    return prefersReducedMotion || !("IntersectionObserver" in window);
  });

  useEffect(() => {
    if (revealed) return undefined;

    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [revealed]);

  return [ref, revealed];
}

function useLoopingCardSlider(totalItems, autoDirection = "right", enabled = true) {
  const trackRef = useRef(null);
  const instantScrollRef = useRef(true);
  const resetTimerRef = useRef(null);
  const [virtualIndex, setVirtualIndex] = useState(totalItems);

  const activeIndex = totalItems > 0
    ? ((virtualIndex % totalItems) + totalItems) % totalItems
    : 0;
  const scrollIndex = totalItems > 1
    ? Math.max(0, Math.min(virtualIndex, totalItems * 3 - 1))
    : 0;

  const moveBy = useCallback((delta) => {
    if (totalItems <= 1) return;
    setVirtualIndex((current) => current + delta);
  }, [totalItems]);

  const goPrev = useCallback(() => moveBy(-1), [moveBy]);
  const goNext = useCallback(() => moveBy(1), [moveBy]);

  const goTo = useCallback((index) => {
    if (totalItems === 0) return;
    setVirtualIndex(totalItems + index);
  }, [totalItems]);

  useEffect(() => {
    const track = trackRef.current;
    const item = track?.children?.[scrollIndex];
    if (!track || !item) return undefined;

    const behavior = instantScrollRef.current ? "auto" : "smooth";
    instantScrollRef.current = false;
    track.scrollTo({ left: item.offsetLeft, behavior });

    if (totalItems <= 1) return undefined;
    window.clearTimeout(resetTimerRef.current);
    resetTimerRef.current = window.setTimeout(() => {
      if (virtualIndex < totalItems) {
        instantScrollRef.current = true;
        setVirtualIndex(virtualIndex + totalItems);
      } else if (virtualIndex >= totalItems * 2) {
        instantScrollRef.current = true;
        setVirtualIndex(virtualIndex - totalItems);
      }
    }, 520);

    return () => window.clearTimeout(resetTimerRef.current);
  }, [scrollIndex, totalItems, virtualIndex]);

  useEffect(() => {
    if (!enabled || totalItems <= 1) return undefined;
    const delta = autoDirection === "left" ? -1 : 1;
    const timer = window.setInterval(() => moveBy(delta), AUTO_SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [autoDirection, enabled, moveBy, totalItems]);

  return [trackRef, activeIndex, goPrev, goNext, goTo];
}

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

function ProjectGroup({ label, description, projects, dark, autoDirection = "right" }) {
  const [isPaused, setIsPaused] = useState(false);
  const [gridRef, gridRevealed] = useRevealOnce();
  const hasManyProjects = projects.length > 1;
  const [trackRef, activeIndex, goPrev, goNext, goTo] = useLoopingCardSlider(
    projects.length,
    autoDirection,
    hasManyProjects && !isPaused,
  );
  const sliderProjects = hasManyProjects ? [...projects, ...projects, ...projects] : projects;

  if (projects.length === 0) return null;

  return (
    <div className="space-y-5">
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

        {hasManyProjects && (
          <div className="flex items-center gap-2">
            <NavButton dark={dark} onClick={goPrev} direction="prev" />
            <div className="hidden items-center gap-1.5 sm:flex">
              {projects.map((project, i) => (
                <button
                  key={project.slug || project.title}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${project.title}`}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${i === activeIndex
                    ? `w-6 h-2 ${dark ? "bg-white/70" : "bg-gray-700"}`
                    : `w-2 h-2 ${dark ? "bg-white/20 hover:bg-white/40" : "bg-gray-300 hover:bg-gray-400"}`
                    }`}
                />
              ))}
            </div>
            <NavButton dark={dark} onClick={goNext} direction="next" />
          </div>
        )}
      </div>

      <div
        ref={gridRef}
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <div
          ref={trackRef}
          className="flex gap-3 overflow-hidden scroll-smooth sm:gap-4"
          style={{ scrollbarWidth: "none" }}
        >
          {sliderProjects.map((project, index) => {
            const originalIndex = projects.length > 0 ? index % projects.length : index;

            return (
              <div
                key={`${project.slug || project.title}-${index}`}
                className={`w-full flex-none sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-3rem)/4)] transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
                  gridRevealed
                    ? "translate-y-0 scale-100 opacity-100 blur-0"
                    : "translate-y-7 scale-[0.985] opacity-0 blur-[6px]"
                } motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:blur-0`}
                style={{
                  transitionDelay: gridRevealed ? `${Math.min(originalIndex * 80, 320)}ms` : "0ms",
                }}
              >
                <ProjectCard dark={dark} {...project} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default function Projects({ dark }) {
  const { lang } = useLang();
  const { t, vodjoProjects, devProjects, allProjects } = useProjects(lang);
  const [activeTab, setActiveTab] = useState("all");

  const totalCount = allProjects.length;
  const showQA = activeTab === "all" || activeTab === "qa";
  const showDev = activeTab === "all" || activeTab === "dev";
  const showDivider = showQA && showDev;
  const dividerCls = dark ? "via-white/8" : "via-gray-200";

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
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

        <div className="flex items-center justify-center gap-2 flex-wrap">
          <TabButton active={activeTab === "all"} dark={dark} onClick={() => setActiveTab("all")} count={totalCount}>
            {t.tabs.all}
          </TabButton>
          <TabButton active={activeTab === "dev"} dark={dark} onClick={() => setActiveTab("dev")} count={devProjects.length}>
            <span className={`w-1.5 h-1.5 rounded-full ${activeTab === "dev" ? "bg-blue-400" : dark ? "bg-white/20" : "bg-gray-300"} transition-colors duration-200`} />
            {t.tabs.dev}
          </TabButton>
          <TabButton active={activeTab === "qa"} dark={dark} onClick={() => setActiveTab("qa")} count={vodjoProjects.length}>
            <span className={`w-1.5 h-1.5 rounded-full ${activeTab === "qa" ? "bg-emerald-400" : dark ? "bg-white/20" : "bg-gray-300"} transition-colors duration-200`} />
            {t.tabs.qa}
          </TabButton>
        </div>

        <div
          className="space-y-12"
          key={activeTab}
          style={{ animation: "fadeSlideIn 0.35s cubic-bezier(0.4,0,0.2,1) both" }}
        >
          {showDev && (
            <ProjectGroup
              label={t.groupLabels.development}
              description={t.groupDescs.development}
              projects={devProjects}
              dark={dark}
              autoDirection="right"
            />
          )}

          {showDivider && (
            <div className={`h-px bg-gradient-to-r from-transparent ${dividerCls} to-transparent`} />
          )}

          {showQA && (
            <ProjectGroup
              label={t.groupLabels.vodjo}
              description={t.groupDescs.vodjo}
              projects={vodjoProjects}
              dark={dark}
              autoDirection="left"
            />
          )}
        </div>

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

