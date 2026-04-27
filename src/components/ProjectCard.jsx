export default function ProjectCard({
  title,
  description,
  tech = [],
  github,
  live,
  gradient = "from-blue-500/20 via-violet-500/10 to-transparent",
  cover = null,
  dark = true,
  companyIcon = null, // path to company logo image
  companyName = null, // tooltip / alt text
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] flex flex-col transition-all duration-500 hover:border-white/20 hover:bg-[#111111]">

      {/* Cover Image */}
      <div className="relative w-full h-44 overflow-hidden">
        {cover ? (
          <img
            src={cover}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <span className="text-white/20 text-xs tracking-widest uppercase">No Preview</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Company Icon Badge */}
        {companyIcon && (
          <div
            title={companyName ?? ""}
            className="absolute top-3 right-3 w-7 h-7 rounded-lg border border-white/15 bg-black/60 backdrop-blur-sm flex items-center justify-center overflow-hidden"
          >
            <img
              src={companyIcon}
              alt={companyName ?? "company"}
              className="w-5 h-5 object-contain"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4 flex-1">

        {/* Gradient glow hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none`} />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 pointer-events-none" />

        {/* Header */}
        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-white group-hover:text-white/90 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-white/50 mt-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Tech badges */}
        {tech.length > 0 && (
          <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
            {tech.map((t) => (
              <span
                key={t}
                className="text-[10px] font-medium px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 tracking-wide"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="relative z-10 flex items-center gap-3 pt-2 border-t border-white/10">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] text-white/40 hover:text-white transition-colors duration-200"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </a>
          )}
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] text-white/40 hover:text-white transition-colors duration-200"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Live Demo
            </a>
          )}
          {!github && !live && (
            <span className="flex items-center gap-1.5 text-[11px] text-white/25">
              <span className="size-1.5 rounded-full bg-white/20" />
              Private Project
            </span>
          )}
        </div>
      </div>
    </div>
  );
}