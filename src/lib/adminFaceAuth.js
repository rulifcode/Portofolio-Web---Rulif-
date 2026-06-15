const DEFAULT_FACE_MODEL_URL = "/models";
const DEFAULT_FACE_MATCH_THRESHOLD = 0.5;

function parseBoolean(value) {
  return String(value || "").toLowerCase() === "true";
}

function parseNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function parseDescriptor(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;

  try {
    const parsed = raw.startsWith("[")
      ? JSON.parse(raw)
      : raw.split(",").map((item) => Number(item.trim()));

    if (!Array.isArray(parsed)) return null;

    const descriptor = parsed.map(Number);
    return descriptor.length === 128 && descriptor.every(Number.isFinite)
      ? new Float32Array(descriptor)
      : null;
  } catch {
    return null;
  }
}

export const adminFaceAuthConfig = {
  enabled: parseBoolean(import.meta.env.VITE_ADMIN_FACE_LOGIN_ENABLED),
  label: import.meta.env.VITE_ADMIN_FACE_LABEL || "Admin",
  modelUrl: import.meta.env.VITE_FACE_API_MODEL_URL || DEFAULT_FACE_MODEL_URL,
  threshold: parseNumber(
    import.meta.env.VITE_ADMIN_FACE_MATCH_THRESHOLD,
    DEFAULT_FACE_MATCH_THRESHOLD,
  ),
  descriptor: parseDescriptor(import.meta.env.VITE_ADMIN_FACE_DESCRIPTOR),
};

export const isAdminFaceLoginConfigured = Boolean(adminFaceAuthConfig.descriptor);
