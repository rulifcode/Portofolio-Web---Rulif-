const contacts = [
  {
    id: "email",
    label: "Email",
    value: "ruliffax@gmail.com",
    href: "mailto:ruliffax@gmail.com",
    description: "Kirim pesan langsung ke inbox",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    accent: "from-sky-500/20 via-blue-500/10 to-transparent",
    dot: "bg-sky-400",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "+62 813-8291-6024",
    href: "https://wa.me/6281382916024",
    description: "Chat langsung via WhatsApp",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
      </svg>
    ),
    accent: "from-emerald-500/20 via-green-500/10 to-transparent",
    dot: "bg-emerald-400",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "ruliffadrian",
    href: "https://www.linkedin.com/in/ruliffadrian",
    description: "Lihat profil profesional",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    accent: "from-blue-600/20 via-blue-500/10 to-transparent",
    dot: "bg-blue-400",
  },
  {
    id: "github",
    label: "GitHub",
    value: "rulifcode",
    href: "https://github.com/rulifcode",
    description: "Lihat semua repository",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
      </svg>
    ),
    accent: "from-white/10 via-white/5 to-transparent",
    dot: "bg-white/50",
  },
  {
    id: "instagram",
    label: "Instagram",
    value: "@ruliffadrian",
    href: "https://instagram.com/ruliffadrian",
    description: "Follow di Instagram",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
    accent: "from-pink-500/20 via-rose-500/10 to-transparent",
    dot: "bg-pink-400",
  },
];

export default function Contact() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="text-[10px] text-white/30 tracking-widest uppercase font-medium">
              Get In Touch
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          <h2 className="text-4xl font-bold text-white/90 text-center">
            Contact
          </h2>
          <p className="text-center text-white/40 text-sm max-w-md mx-auto">
            Terbuka untuk peluang baru, kolaborasi, atau sekadar ngobrol seputar teknologi.
          </p>
        </div>

        {/* Availability badge */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.05]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-emerald-400/80 text-xs tracking-wide">
              Available for opportunities
            </span>
          </div>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((contact) => (
            <a
              key={contact.id}
              href={contact.href}
              target={contact.id !== "email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group relative rounded-2xl border border-white/20 bg-white/[0.07] p-6 overflow-hidden hover:border-white/30 hover:bg-white/[0.12] transition-all duration-300"
            >
              {/* Gradient bg */}
              <div className={`absolute inset-0 bg-gradient-to-br ${contact.accent} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Top accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative space-y-4">
                {/* Icon */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl border border-white/20 bg-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-white/30 group-hover:bg-white/15 transition-all duration-300">
                    {contact.icon}
                  </div>
                  {/* Arrow */}
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    className="text-white/35 group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>

                {/* Text */}
                <div className="space-y-1">
                  <p className="text-white/50 text-[11px] uppercase tracking-widest font-medium">
                    {contact.label}
                  </p>
                  <p className="text-white/90 text-sm font-medium truncate group-hover:text-white transition-colors duration-200">
                    {contact.value}
                  </p>
                  <p className="text-white/45 text-xs">
                    {contact.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-white/35 text-xs">
          Preferably via Email atau WhatsApp untuk response lebih cepat.
        </p>

      </div>
    </main>
  );
}