import { useEffect, useState } from "react";
import { getCollectionItems } from "../services/adminContentService";

function splitTextList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  return String(value || "")
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeLocalized(value, fallback = "") {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return {
      EN: value.EN || value.en || fallback,
      ID: value.ID || value.id || value.EN || value.en || fallback,
    };
  }

  return {
    EN: value || fallback,
    ID: value || fallback,
  };
}

function normalizeExperience(item, index) {
  const company = item.company || item.title || `Experience ${index + 1}`;

  return {
    id: item.slug || item.id || company,
    key: item.slug || item.id || company,
    company,
    location: item.location || "",
    period: item.period || "",
    duration: normalizeLocalized(item.duration),
    type: normalizeLocalized(item.type || item.typeEN),
    accent: item.accent || "#9ab7ff",
    logo: item.logo || "",
    images: splitTextList(item.images),
    stack: splitTextList(item.stack),
    role: normalizeLocalized(item.role || item.roleEN),
    project: item.project ? normalizeLocalized(item.project) : null,
    description: normalizeLocalized(item.description || item.descriptionEN),
    sortOrder: Number(item.sortOrder) || index + 1,
  };
}

function identity(value) {
  return String(value || "").trim().toLowerCase();
}

function mergeWithFallback(remoteItems, fallbackExperiences) {
  if (remoteItems.length === 0) return fallbackExperiences;

  const remoteKeys = new Set(
    remoteItems.flatMap((item) => [
      identity(item.id),
      identity(item.key),
      identity(item.company),
    ]),
  );

  const fallbackItems = fallbackExperiences.filter((item) => {
    const keys = [identity(item.id), identity(item.key), identity(item.company)];
    return !keys.some((key) => remoteKeys.has(key));
  });

  return [...remoteItems, ...fallbackItems];
}

export default function useExperiences(fallbackExperiences) {
  const [experiences, setExperiences] = useState(fallbackExperiences);

  useEffect(() => {
    let alive = true;

    async function loadExperiences() {
      try {
        const items = await getCollectionItems("experiences");
        if (!alive) return;

        const published = items
          .filter((item) => item.published !== false)
          .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
          .map(normalizeExperience);

        setExperiences(mergeWithFallback(published, fallbackExperiences));
      } catch {
        if (alive) setExperiences(fallbackExperiences);
      }
    }

    loadExperiences();

    return () => {
      alive = false;
    };
  }, [fallbackExperiences]);

  return experiences;
}
