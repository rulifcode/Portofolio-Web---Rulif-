import { useEffect, useMemo, useState } from "react";
import { getSiteContent } from "../services/adminContentService";

function normalizeEmailHref(value, fallback) {
  if (!value) return fallback;
  return value.startsWith("mailto:") ? value : `mailto:${value}`;
}

function normalizeWhatsAppHref(value, fallback) {
  if (!value) return fallback;
  if (value.startsWith("http")) return value;
  return `https://wa.me/${value.replace(/\D/g, "")}`;
}

export default function useContactContent(lang, fallback) {
  const fallbackContent = useMemo(
    () => ({
      tagline: fallback.tagline,
      title: fallback.title,
      desc: fallback.desc,
      availability: fallback.availability,
      footer: fallback.footer,
      links: [
        { label: "Instagram", value: "@ruliffadrian", href: "https://instagram.com/ruliffadrian" },
        { label: "LinkedIn", value: "ruliffadrian", href: "https://linkedin.com/in/ruliffadrian" },
        { label: "WhatsApp", value: "+62 813-8291-6024", href: "https://wa.me/6281382916024" },
        { label: "Email", value: "ruliffax@gmail.com", href: "mailto:ruliffax@gmail.com" },
      ],
    }),
    [fallback],
  );
  const [content, setContent] = useState(fallbackContent);

  useEffect(() => {
    let alive = true;

    async function loadContact() {
      try {
        const saved = await getSiteContent("contact", {});
        if (!alive) return;
        const suffix = lang === "ID" ? "ID" : "EN";
        setContent({
          tagline: saved[`tagline${suffix}`] || fallbackContent.tagline,
          title: saved[`title${suffix}`] || fallbackContent.title,
          desc: saved[`description${suffix}`] || fallbackContent.desc,
          availability: saved[`availability${suffix}`] || fallbackContent.availability,
          footer: saved[`footer${suffix}`] || fallbackContent.footer,
          links: [
            { label: "Instagram", value: "@ruliffadrian", href: saved.instagram || fallbackContent.links[0].href },
            { label: "LinkedIn", value: "ruliffadrian", href: saved.linkedin || fallbackContent.links[1].href },
            { label: "WhatsApp", value: "+62 813-8291-6024", href: normalizeWhatsAppHref(saved.whatsapp, fallbackContent.links[2].href) },
            { label: "Email", value: "ruliffax@gmail.com", href: normalizeEmailHref(saved.email, fallbackContent.links[3].href) },
          ],
        });
      } catch {
        if (alive) setContent(fallbackContent);
      }
    }

    loadContact();

    return () => {
      alive = false;
    };
  }, [lang, fallbackContent]);

  return content;
}
