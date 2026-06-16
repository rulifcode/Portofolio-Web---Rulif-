/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
import { useEffect, useMemo, useRef, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, isFirebaseConfigured } from "../lib/firebase";
import { adminFaceAuthConfig, isAdminFaceLoginConfigured } from "../lib/adminFaceAuth";
import {
  deleteCollectionItem,
  getCollectionItems,
  getSiteContent,
  saveCollectionItem,
  saveSiteContent,
} from "../services/adminContentService";
import {
  deleteProject,
  formToProject,
  getAdminProjects,
  projectToForm,
  saveProject,
  seedDefaultProjects,
} from "../services/projectsService";
import { uploadManyToCloudinary } from "../services/cloudinaryService";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TABS = [
  { id: "experience", label: "Experience" },
  { id: "dev", label: "Project Dev" },
  { id: "qa", label: "Project QA" },
  { id: "certificate", label: "Certificate" },
  { id: "contact", label: "Contact" },
];

const emptyExperience = {
  slug: "",
  company: "",
  roleEN: "",
  roleID: "",
  location: "",
  period: "",
  typeEN: "",
  typeID: "",
  logo: "",
  images: "",
  stack: "",
  descriptionEN: "",
  descriptionID: "",
  sortOrder: 1,
  published: true,
};

const emptyDevProject = {
  slug: "",
  titleEN: "",
  titleID: "",
  descriptionEN: "",
  descriptionID: "",
  tech: "",
  github: "",
  live: "",
  cover: "",
  images: "",
  gradient: "from-blue-500/20 via-violet-500/10 to-transparent",
  companyName: "",
  companyIcon: "",
  sortOrder: 1,
  published: true,
};

const emptyQaProject = {
  slug: "",
  titleEN: "",
  titleID: "",
  descriptionEN: "",
  descriptionID: "",
  cover: "",
  tech: "",
  companyName: "",
  companyIcon: "",
  sortOrder: 1,
  published: true,
};

const emptyCertificate = {
  slug: "",
  title: "",
  description: "",
  issuer: "",
  date: "",
  image: "",
  sortOrder: 1,
  published: true,
};

const emptyContact = {
  taglineEN: "Get In Touch",
  taglineID: "Hubungi Saya",
  titleEN: "Get In Touch",
  titleID: "Hubungi Saya",
  descriptionEN: "Open to new opportunities, collaborations, or just a chat about technology.",
  descriptionID: "Terbuka untuk peluang baru, kolaborasi, atau sekadar ngobrol seputar teknologi.",
  availabilityEN: "Available for opportunities",
  availabilityID: "Tersedia untuk peluang",
  footerEN: "Preferably via Email or WhatsApp for a faster response.",
  footerID: "Preferably via Email atau WhatsApp untuk response lebih cepat.",
  instagram: "https://instagram.com/ruliffadrian",
  linkedin: "https://linkedin.com/in/ruliffadrian",
  whatsapp: "https://wa.me/6281382916024",
  email: "mailto:ruliffax@gmail.com",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function splitList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitMediaList(value) {
  const raw = String(value || "").trim();
  if (!raw) return [];

  const lines = raw
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

  // Never split on comma if this looks like a base64 data URL
  // (those are not expected anymore, but guard just in case)
  if (lines.length > 1 || raw.startsWith("data:")) return lines;

  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function joinList(value) {
  return Array.isArray(value) ? value.join(", ") : value || "";
}

function joinMediaList(value) {
  return Array.isArray(value) ? value.join("\n") : value || "";
}

// Returns true if the string looks like a raw base64 data URL.
// We use this to warn if something sneaks through; base64 must never be saved.
function isBase64(value) {
  return typeof value === "string" && value.startsWith("data:");
}

// ---------------------------------------------------------------------------
// Primitive UI building blocks
// ---------------------------------------------------------------------------

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[10px] font-semibold tracking-widest uppercase text-white/35">{label}</span>
      {children}
    </label>
  );
}

function TextInput(props) {
  return (
    <input
      {...props}
      className="w-full rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/80 outline-none transition focus:border-white/25"
    />
  );
}

function TextArea(props) {
  return (
    <textarea
      {...props}
      className="min-h-24 w-full rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm leading-relaxed text-white/80 outline-none transition focus:border-white/25"
    />
  );
}

// ---------------------------------------------------------------------------
// Media helpers
// ---------------------------------------------------------------------------

function getMediaItems(value) {
  return splitMediaList(value);
}

function mediaItemsToValue(items, multiple) {
  const cleanItems = items.map((item) => String(item || "").trim()).filter(Boolean);
  return multiple ? cleanItems.join("\n") : cleanItems[0] || "";
}

function appendMediaValue(currentValue, nextValues, multiple) {
  const cleanNextValues = nextValues.map((item) => String(item || "").trim()).filter(Boolean);
  if (!multiple) return cleanNextValues[0] || "";
  const currentItems = getMediaItems(currentValue);
  return Array.from(new Set([...currentItems, ...cleanNextValues])).join("\n");
}

function getMediaKind(src) {
  const value = String(src || "").split("?")[0].toLowerCase();
  if (value.startsWith("data:image/") || /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(value)) return "image";
  if (value.startsWith("data:video/") || /\.(mp4|mov|ogg|webm)$/i.test(value)) return "video";
  if (value.startsWith("data:application/pdf") || /\.pdf$/i.test(value)) return "pdf";
  return "link";
}

function getMediaLabel(src, index) {
  const value = String(src || "");
  if (value.startsWith("data:")) return `Uploaded media ${index + 1}`;
  const cleanValue = value.split("?")[0].split("#")[0];
  const lastSegment = cleanValue.split("/").filter(Boolean).at(-1);
  return lastSegment || `Media ${index + 1}`;
}

// ---------------------------------------------------------------------------
// MediaPreview
// ---------------------------------------------------------------------------

function MediaPreview({ src, index, onRemove }) {
  const kind = getMediaKind(src);
  const label = getMediaLabel(src, index);

  return (
    <div className="group relative overflow-hidden rounded-md border border-white/10 bg-black/30">
      <div className="flex aspect-video items-center justify-center bg-white/[0.03]">
        {kind === "image" && (
          <img src={src} alt={label} className="h-full w-full object-cover" />
        )}
        {kind === "video" && (
          <video src={src} className="h-full w-full object-cover" muted playsInline controls />
        )}
        {kind === "pdf" && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-white/55">
            <span className="text-lg font-semibold">PDF</span>
            <span className="max-w-[80%] truncate text-xs text-white/35">{label}</span>
          </div>
        )}
        {kind === "link" && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 px-3 text-center text-white/55">
            <span className="text-lg font-semibold">URL</span>
            <span className="max-w-full truncate text-xs text-white/35">{label}</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-white/10 px-2 py-1.5">
        <span className="min-w-0 truncate text-xs text-white/45">{label}</span>
        <button
          type="button"
          onClick={onRemove}
          className="rounded border border-red-400/20 px-2 py-1 text-[11px] font-medium text-red-200/80 transition hover:border-red-300/40 hover:text-red-100"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// UploadProgress — shown while Cloudinary upload is in flight
// ---------------------------------------------------------------------------

function UploadProgress({ count }) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-xs text-amber-200">
      <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-amber-200 border-t-transparent" />
      Mengupload {count} file ke Cloudinary…
    </div>
  );
}

// ---------------------------------------------------------------------------
// MediaInput  ← main change: handleFiles now uploads to Cloudinary
// ---------------------------------------------------------------------------

function MediaInput({
  label,
  value,
  onChange,
  multiple = false,
  accept = "image/*,application/pdf,video/*",
  placeholder = "Paste URL/path, atau drag file ke sini.",
  onUploadError,
}) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [manualValue, setManualValue] = useState("");
  const [rawOpen, setRawOpen] = useState(false);

  const mediaItems = getMediaItems(value);

  const updateItems = (items) => {
    onChange(mediaItemsToValue(items, multiple));
  };

  const addManualValue = () => {
    const nextItems = splitMediaList(manualValue);
    if (nextItems.length === 0) return;
    // Block base64 from manual entry too
    const hasBase64 = nextItems.some(isBase64);
    if (hasBase64) {
      setStatusMessage("Base64 tidak diizinkan. Paste URL Cloudinary atau path relatif saja.");
      return;
    }
    onChange(appendMediaValue(value, nextItems, multiple));
    setManualValue("");
    setStatusMessage(`${multiple ? nextItems.length : 1} URL berhasil ditambahkan.`);
  };

  /**
   * Upload files to Cloudinary, then store the returned secure_url values.
   * Base64 data URLs are never written to state.
   */
  const handleFiles = async (fileList) => {
    const files = Array.from(fileList || []).slice(0, multiple ? undefined : 1);
    if (files.length === 0) return;

    setUploading(true);
    setUploadCount(files.length);
    setStatusMessage("");

    try {
      const urls = await uploadManyToCloudinary(files);
      onChange(appendMediaValue(value, urls, multiple));
      setStatusMessage(
        multiple
          ? `${urls.length} file berhasil diupload ke Cloudinary.`
          : "File berhasil diupload ke Cloudinary.",
      );
    } catch (error) {
      const msg = error?.message || "Upload Cloudinary gagal.";
      setStatusMessage(msg);
      onUploadError?.(msg);
    } finally {
      setUploading(false);
      setUploadCount(0);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] font-semibold tracking-widest uppercase text-white/35">{label}</span>
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          handleFiles(event.dataTransfer.files);
        }}
        className={`rounded-lg border border-dashed p-3 transition ${
          dragging
            ? "border-emerald-300/60 bg-emerald-300/10"
            : "border-white/10 bg-white/[0.03]"
        }`}
      >
        {/* Upload progress overlay */}
        {uploading && (
          <div className="mb-3">
            <UploadProgress count={uploadCount} />
          </div>
        )}

        {/* Preview grid */}
        {mediaItems.length > 0 ? (
          <div className={`grid gap-3 ${multiple ? "sm:grid-cols-2" : ""}`}>
            {mediaItems.map((src, index) => (
              <MediaPreview
                key={`${src.slice(0, 40)}-${index}`}
                src={src}
                index={index}
                onRemove={() => updateItems(mediaItems.filter((_, i) => i !== index))}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-28 items-center justify-center rounded-md border border-white/10 bg-black/20 px-4 text-center text-sm leading-relaxed text-white/35">
            {placeholder}
          </div>
        )}

        {/* Manual URL input */}
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={manualValue}
            onChange={(event) => setManualValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addManualValue();
              }
            }}
            placeholder={multiple ? "Paste URL Cloudinary, satu per baris juga boleh" : "Paste URL Cloudinary / path media"}
            className="min-w-0 flex-1 rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/80 outline-none transition placeholder:text-white/25 focus:border-white/25"
          />
          <button
            type="button"
            onClick={addManualValue}
            className="rounded-md border border-white/10 px-3 py-2 text-xs font-medium text-white/65 transition hover:border-white/20 hover:text-white"
          >
            Add URL
          </button>
        </div>

        {/* Helper text + action buttons */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-white/35">
            {multiple
              ? "File akan diupload ke Cloudinary — URL tersimpan, bukan Base64."
              : "Upload baru mengganti media lama. File disimpan di Cloudinary."}
          </p>
          <div className="flex flex-wrap gap-2">
            {mediaItems.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setStatusMessage("Media dibersihkan.");
                }}
                className="rounded-md border border-red-400/20 px-3 py-1.5 text-xs font-medium text-red-200/80 transition hover:border-red-300/40 hover:text-red-100"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="rounded-md border border-white/10 px-3 py-1.5 text-xs font-medium text-white/65 transition hover:border-white/20 hover:text-white disabled:opacity-50"
            >
              {uploading
                ? "Uploading…"
                : multiple
                ? "Add files"
                : mediaItems.length > 0
                ? "Replace file"
                : "Browse file"}
            </button>
          </div>
        </div>

        {/* Status / error message */}
        {statusMessage && (
          <p
            className={`mt-2 text-xs ${
              statusMessage.toLowerCase().includes("gagal") ||
              statusMessage.toLowerCase().includes("failed") ||
              statusMessage.toLowerCase().includes("tidak")
                ? "text-red-300/80"
                : "text-emerald-200/70"
            }`}
          >
            {statusMessage}
          </p>
        )}

        {/* Raw value inspector (read-only when uploading) */}
        <div className="mt-3 rounded-md border border-white/10 bg-black/20 px-3 py-2">
          <button
            type="button"
            onClick={() => setRawOpen((open) => !open)}
            className="text-xs font-medium text-white/40 transition hover:text-white/65"
          >
            {rawOpen ? "Hide manual values" : "Show manual values"}
          </button>
          {rawOpen && (
            <textarea
              value={value}
              onChange={(event) => {
                // Block base64 from raw textarea too
                if (!isBase64(event.target.value)) {
                  onChange(event.target.value);
                }
              }}
              placeholder={multiple ? "Satu Cloudinary URL per baris." : "URL Cloudinary / path media."}
              className="mt-2 min-h-20 w-full resize-y rounded-md border border-white/10 bg-black/30 px-3 py-2 text-xs leading-relaxed text-white/65 outline-none transition placeholder:text-white/25 focus:border-white/25"
            />
          )}
        </div>

        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(event) => {
            handleFiles(event.target.files);
            event.target.value = "";
          }}
          className="hidden"
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Checkbox
// ---------------------------------------------------------------------------

function Checkbox({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`h-8 w-14 rounded-full border transition ${
        checked ? "border-emerald-400/40 bg-emerald-400/20" : "border-white/10 bg-white/[0.04]"
      }`}
    >
      <span
        className={`block h-6 w-6 rounded-full bg-white/80 transition ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

// ---------------------------------------------------------------------------
// ItemList
// ---------------------------------------------------------------------------

function ItemList({ items, onEdit, onDelete, titleKey = "titleEN" }) {
  if (items.length === 0) {
    return <p className="text-sm text-white/35">Belum ada data.</p>;
  }

  return (
    <div className="divide-y divide-white/10 rounded-lg border border-white/10">
      {items.map((item) => (
        <div key={item.slug || item.id} className="flex items-center justify-between gap-3 p-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white/80">
              {item[titleKey] || item.title?.EN || item.title || item.company || item.slug}
            </p>
            <p className="truncate text-xs text-white/35">{item.slug}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(item)}
              className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/60 hover:text-white"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(item.slug)}
              className="rounded-md border border-red-400/20 px-3 py-1.5 text-xs text-red-300/80 hover:text-red-200"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SectionShell / FormActions
// ---------------------------------------------------------------------------

function SectionShell({ title, description, children }) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-white/90">{title}</h2>
        <p className="mt-1 text-sm text-white/40">{description}</p>
      </div>
      {children}
    </section>
  );
}

function FormActions({ saving, onReset }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="submit"
        disabled={saving}
        className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90 disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save"}
      </button>
      <button
        type="button"
        onClick={onReset}
        className="rounded-md border border-white/10 px-4 py-2 text-sm text-white/55 transition hover:text-white"
      >
        Reset
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FaceAccessDialog / AdminFaceLogin / AdminLogin  (unchanged logic)
// ---------------------------------------------------------------------------

function FaceAccessDialog({ type, distance, onEnter, onClose, onLogout }) {
  const approved = type === "approved";
  const title = approved
    ? "Halo Bos, selamat datang kembali."
    : "Maaf, kamu bukan Tuan kami.";
  const message = approved
    ? "Wajah sudah cocok. Mau masuk ke halaman admin dan lanjut mengatur portfolio?"
    : "Akses admin ditahan karena wajah tidak cocok dengan data pemilik dashboard.";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-md">
      <section className="w-full max-w-md rounded-lg border border-white/10 bg-[#080808] p-6 shadow-2xl">
        <div
          className={`inline-flex h-11 w-11 items-center justify-center rounded-md border text-lg ${
            approved
              ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
              : "border-red-400/25 bg-red-400/10 text-red-200"
          }`}
        >
          {approved ? "OK" : "NO"}
        </div>
        <h2 className="mt-4 text-2xl font-bold text-white/90">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/50">{message}</p>
        {Number.isFinite(distance) && (
          <p className="mt-3 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/40">
            Match distance: {distance.toFixed(3)}
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          {approved ? (
            <button
              type="button"
              onClick={onEnter}
              className="rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Masuk Admin
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Coba Lagi
            </button>
          )}
          <button
            type="button"
            onClick={onLogout}
            className="rounded-md border border-white/10 px-4 py-2.5 text-sm text-white/60 transition hover:text-white"
          >
            Sign out
          </button>
        </div>
      </section>
    </div>
  );
}

function AdminFaceLogin({ onVerified, onLogout }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const faceApiRef = useRef(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Memuat face model...");
  const [descriptorOutput, setDescriptorOutput] = useState("");
  const [accessDialog, setAccessDialog] = useState(null);

  useEffect(() => {
    let alive = true;

    async function bootFaceLogin() {
      try {
        const faceapi = await import("face-api.js");
        faceApiRef.current = faceapi;

        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(adminFaceAuthConfig.modelUrl),
          faceapi.nets.faceLandmark68Net.loadFromUri(adminFaceAuthConfig.modelUrl),
          faceapi.nets.faceRecognitionNet.loadFromUri(adminFaceAuthConfig.modelUrl),
        ]);

        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error("Browser belum mengizinkan akses kamera.");
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: { facingMode: "user" },
        });

        if (!alive) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        setCameraReady(true);
        setStatus(
          isAdminFaceLoginConfigured
            ? "Arahkan wajah ke kamera, lalu verifikasi."
            : "Ambil descriptor wajah, lalu isi ke env.",
        );
      } catch (error) {
        setStatus(error?.message || "Face login gagal dimuat.");
      }
    }

    bootFaceLogin();
    return () => {
      alive = false;
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const captureFace = async () => {
    if (!faceApiRef.current || !videoRef.current || !cameraReady) return;
    const faceapi = faceApiRef.current;
    setLoading(true);
    setDescriptorOutput("");

    try {
      const detection = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) {
        setStatus("Wajah belum terdeteksi. Coba ulang dengan cahaya lebih terang.");
        return;
      }

      const descriptor = Array.from(detection.descriptor).map((v) => Number(v.toFixed(8)));

      if (!isAdminFaceLoginConfigured) {
        setDescriptorOutput(JSON.stringify(descriptor));
        setStatus("Descriptor berhasil dibuat. Simpan nilainya ke VITE_ADMIN_FACE_DESCRIPTOR.");
        return;
      }

      const distance = faceapi.euclideanDistance(detection.descriptor, adminFaceAuthConfig.descriptor);

      if (distance <= adminFaceAuthConfig.threshold) {
        setStatus("Wajah cocok. Menunggu konfirmasi masuk admin.");
        setAccessDialog({ type: "approved", distance });
        return;
      }

      setStatus("Maaf, kamu bukan Tuan kami. Akses admin ditahan.");
      setAccessDialog({ type: "rejected", distance });
    } catch (error) {
      setStatus(error?.message || "Verifikasi wajah gagal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-24">
      {accessDialog && (
        <FaceAccessDialog
          type={accessDialog.type}
          distance={accessDialog.distance}
          onEnter={onVerified}
          onClose={() => setAccessDialog(null)}
          onLogout={onLogout}
        />
      )}
      <section className="w-full max-w-md rounded-lg border border-white/10 bg-black/25 p-6">
        <p className="text-[10px] font-semibold tracking-widest text-white/35 uppercase">Rulif CMS</p>
        <h1 className="mt-2 text-3xl font-bold text-white/90">Face Login</h1>
        <p className="mt-2 text-sm leading-relaxed text-white/45">
          Verifikasi wajah untuk membuka dashboard admin.
        </p>
        <div className="mt-6 overflow-hidden rounded-lg border border-white/10 bg-black">
          <video ref={videoRef} autoPlay muted playsInline className="aspect-video w-full object-cover" />
        </div>
        <p className="mt-4 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/55">
          {status}
        </p>
        {descriptorOutput && (
          <textarea
            readOnly
            value={descriptorOutput}
            className="mt-4 h-28 w-full rounded-md border border-white/10 bg-black/30 p-3 text-xs text-white/60 outline-none"
          />
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={captureFace}
            disabled={!cameraReady || loading}
            className="rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90 disabled:opacity-60"
          >
            {loading ? "Checking..." : isAdminFaceLoginConfigured ? "Verify face" : "Generate descriptor"}
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-md border border-white/10 px-4 py-2.5 text-sm text-white/60 transition hover:text-white"
          >
            Sign out
          </button>
        </div>
      </section>
    </main>
  );
}

function AdminLogin({ onLogin, authError, loading }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const update = (key, value) => setCredentials((prev) => ({ ...prev, [key]: value }));

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-24">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onLogin(credentials);
        }}
        className="w-full max-w-sm rounded-lg border border-white/10 bg-black/25 p-6"
      >
        <p className="text-[10px] font-semibold tracking-widest text-white/35 uppercase">Rulif CMS</p>
        <h1 className="mt-2 text-3xl font-bold text-white/90">Admin Login</h1>
        <p className="mt-2 text-sm leading-relaxed text-white/45">
          Masuk dengan akun Firebase Auth yang sudah dibuat di Firebase Console.
        </p>
        <div className="mt-6 space-y-4">
          <Field label="Email">
            <TextInput
              type="email"
              value={credentials.email}
              onChange={(e) => update("email", e.target.value)}
              autoComplete="email"
              required
            />
          </Field>
          <Field label="Password">
            <TextInput
              type="password"
              value={credentials.password}
              onChange={(e) => update("password", e.target.value)}
              autoComplete="current-password"
              required
            />
          </Field>
        </div>
        {authError && (
          <p className="mt-4 rounded-md border border-red-400/20 bg-red-400/10 px-3 py-2 text-xs text-red-200">
            {authError}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}

// ---------------------------------------------------------------------------
// Toast — lightweight error notification
// ---------------------------------------------------------------------------

function Toast({ message, onDismiss }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDismiss, 5000);
    return () => clearTimeout(t);
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-red-400/30 bg-red-950/80 px-4 py-3 text-sm text-red-200 shadow-xl backdrop-blur-sm">
      {message}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section admins
// ---------------------------------------------------------------------------

function ExperienceAdmin({ saving, setSaving, notify, onUploadError }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyExperience);

  const load = async () => setItems(await getCollectionItems("experiences"));
  useEffect(() => { load(); }, []);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const reset = () => setForm(emptyExperience);

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    await saveCollectionItem("experiences", {
      ...form,
      title: form.company,
      role: { EN: form.roleEN, ID: form.roleID || form.roleEN },
      type: { EN: form.typeEN, ID: form.typeID || form.typeEN },
      description: { EN: form.descriptionEN, ID: form.descriptionID || form.descriptionEN },
      images: splitMediaList(form.images),
      stack: splitList(form.stack),
    });
    await load();
    reset();
    setSaving(false);
    notify("Experience saved.");
  };

  return (
    <SectionShell
      title="Experience"
      description="Kelola pengalaman kerja, logo, slider image, stack, dan deskripsi bilingual."
    >
      <form onSubmit={submit} className="grid gap-4 lg:grid-cols-2">
        <Field label="Company"><TextInput value={form.company} onChange={(e) => update("company", e.target.value)} required /></Field>
        <Field label="Slug"><TextInput value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="auto kalau kosong" /></Field>
        <Field label="Role EN"><TextInput value={form.roleEN} onChange={(e) => update("roleEN", e.target.value)} /></Field>
        <Field label="Role ID"><TextInput value={form.roleID} onChange={(e) => update("roleID", e.target.value)} /></Field>
        <Field label="Location"><TextInput value={form.location} onChange={(e) => update("location", e.target.value)} /></Field>
        <Field label="Period"><TextInput value={form.period} onChange={(e) => update("period", e.target.value)} /></Field>
        <Field label="Type EN"><TextInput value={form.typeEN} onChange={(e) => update("typeEN", e.target.value)} /></Field>
        <Field label="Type ID"><TextInput value={form.typeID} onChange={(e) => update("typeID", e.target.value)} /></Field>
        <MediaInput
          label="Logo image optional"
          value={form.logo}
          onChange={(value) => update("logo", value)}
          accept="image/*"
          placeholder="/logos/company.png, https://.../logo.svg, atau drag logo PNG/JPG/WebP/SVG."
          onUploadError={onUploadError}
        />
        <Field label="Sort order"><TextInput type="number" value={form.sortOrder} onChange={(e) => update("sortOrder", e.target.value)} /></Field>
        <div className="lg:col-span-2 grid gap-4 lg:grid-cols-2">
          <MediaInput
            label="Images slider media"
            value={form.images}
            onChange={(value) => update("images", value)}
            multiple
            placeholder={"/experience/img-1.jpg\nhttps://.../img-2.png\natau drag beberapa file gambar/video/PDF."}
            onUploadError={onUploadError}
          />
          <Field label="Stack, comma separated"><TextArea value={form.stack} onChange={(e) => update("stack", e.target.value)} placeholder="React.js, Postman, Playwright" /></Field>
          <Field label="Description EN"><TextArea value={form.descriptionEN} onChange={(e) => update("descriptionEN", e.target.value)} placeholder="Experience description in English" /></Field>
          <Field label="Description ID"><TextArea value={form.descriptionID} onChange={(e) => update("descriptionID", e.target.value)} placeholder="Deskripsi pengalaman dalam Bahasa Indonesia" /></Field>
        </div>
        <div className="lg:col-span-2 flex items-center justify-between gap-4">
          <Field label="Published"><Checkbox checked={form.published} onChange={(value) => update("published", value)} /></Field>
          <FormActions saving={saving} onReset={reset} />
        </div>
      </form>
      <ItemList
        items={items}
        titleKey="company"
        onEdit={(item) =>
          setForm({
            ...emptyExperience,
            ...item,
            roleEN: item.role?.EN || item.roleEN || "",
            roleID: item.role?.ID || item.roleID || "",
            typeEN: item.type?.EN || item.typeEN || "",
            typeID: item.type?.ID || item.typeID || "",
            descriptionEN: item.description?.EN || item.descriptionEN || "",
            descriptionID: item.description?.ID || item.descriptionID || "",
            images: joinMediaList(item.images),
            stack: joinList(item.stack),
          })
        }
        onDelete={async (slug) => {
          await deleteCollectionItem("experiences", slug);
          await load();
          notify("Experience deleted.");
        }}
      />
    </SectionShell>
  );
}

function ProjectAdmin({ type, saving, setSaving, notify, onUploadError }) {
  const isQa = type === "qa";
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(isQa ? emptyQaProject : emptyDevProject);

  const load = async () => {
    const projects = await getAdminProjects();
    setItems(projects.filter((p) => p.category === type));
  };

  useEffect(() => { load(); }, [type]);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const reset = () => setForm(isQa ? emptyQaProject : emptyDevProject);

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);

    const payload = isQa
      ? {
          slug: form.slug,
          category: "qa",
          title: { EN: form.titleEN, ID: form.titleID || form.titleEN },
          description: { EN: form.descriptionEN, ID: form.descriptionID || form.descriptionEN },
          cover: form.cover,
          tech: splitList(form.tech),
          companyName: form.companyName || null,
          companyIcon: form.companyIcon || null,
          sortOrder: Number(form.sortOrder) || 1,
          published: form.published,
        }
      : {
          ...formToProject(form),
          images: splitMediaList(form.images),
        };

    await saveProject(payloadToProjectForm(payload));
    await load();
    reset();
    setSaving(false);
    notify(isQa ? "QA project saved." : "Development project saved.");
  };

  return (
    <SectionShell
      title={isQa ? "Project QA" : "Project Development"}
      description={
        isQa
          ? "QA cukup cover, tech, title, description, dan logo perusahaan opsional."
          : "Development punya cover untuk list dan multiple media detail untuk halaman detail."
      }
    >
      {!isQa && (
        <button
          onClick={async () => {
            setSaving(true);
            await seedDefaultProjects();
            await load();
            setSaving(false);
            notify("Default development projects seeded.");
          }}
          className="rounded-md border border-white/10 px-4 py-2 text-sm text-white/60 hover:text-white"
        >
          Seed default development projects
        </button>
      )}
      <form onSubmit={submit} className="grid gap-4 lg:grid-cols-2">
        <Field label="Title EN"><TextInput value={form.titleEN} onChange={(e) => update("titleEN", e.target.value)} placeholder="Project title" required /></Field>
        <Field label="Title ID"><TextInput value={form.titleID} onChange={(e) => update("titleID", e.target.value)} placeholder="Judul project, boleh kosong" /></Field>
        <Field label="Slug"><TextInput value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="auto kalau kosong" /></Field>
        <Field label="Sort order"><TextInput type="number" value={form.sortOrder} onChange={(e) => update("sortOrder", e.target.value)} /></Field>
        <MediaInput
          label="Cover media"
          value={form.cover}
          onChange={(value) => update("cover", value)}
          placeholder="/images/project.png, https://.../cover.jpg, atau drag cover PNG/JPG/WebP/PDF/video."
          onUploadError={onUploadError}
        />
        <Field label="Tech stack"><TextInput value={form.tech} onChange={(e) => update("tech", e.target.value)} placeholder="React.js, Tailwind CSS, Playwright" /></Field>
        {!isQa && <Field label="GitHub URL"><TextInput value={form.github} onChange={(e) => update("github", e.target.value)} placeholder="https://github.com/..." /></Field>}
        {!isQa && <Field label="Live URL"><TextInput value={form.live} onChange={(e) => update("live", e.target.value)} placeholder="https://project-demo.com" /></Field>}
        <Field label="Company name optional"><TextInput value={form.companyName} onChange={(e) => update("companyName", e.target.value)} placeholder="Vodjo, Lumoshive, atau kosong" /></Field>
        <MediaInput
          label="Company logo optional"
          value={form.companyIcon}
          onChange={(value) => update("companyIcon", value)}
          accept="image/*"
          placeholder="/logos/company.png, https://.../logo.svg, atau drag logo PNG/JPG/WebP/SVG."
          onUploadError={onUploadError}
        />
        {!isQa && <Field label="Gradient class"><TextInput value={form.gradient} onChange={(e) => update("gradient", e.target.value)} /></Field>}
        {!isQa && (
          <div className="lg:col-span-2">
            <MediaInput
              label="Detail page media"
              value={form.images}
              onChange={(value) => update("images", value)}
              multiple
              placeholder={"/projects/detail-1.png\n/projects/spec.pdf\nhttps://.../screen.mp4\natau drag banyak file dari file manager."}
              onUploadError={onUploadError}
            />
          </div>
        )}
        <Field label="Description EN"><TextArea value={form.descriptionEN} onChange={(e) => update("descriptionEN", e.target.value)} placeholder="Short project description" /></Field>
        <Field label="Description ID"><TextArea value={form.descriptionID} onChange={(e) => update("descriptionID", e.target.value)} placeholder="Deskripsi project, boleh kosong" /></Field>
        <div className="lg:col-span-2 flex items-center justify-between gap-4">
          <Field label="Published"><Checkbox checked={form.published} onChange={(value) => update("published", value)} /></Field>
          <FormActions saving={saving} onReset={reset} />
        </div>
      </form>
      <ItemList
        items={items}
        onEdit={(item) =>
          setForm({
            ...(isQa ? emptyQaProject : emptyDevProject),
            ...projectToForm(item),
            images: joinMediaList(item.images),
          })
        }
        onDelete={async (slug) => {
          await deleteProject(slug);
          await load();
          notify("Project deleted.");
        }}
      />
    </SectionShell>
  );
}

function payloadToProjectForm(payload) {
  return {
    slug: payload.slug,
    titleEN: payload.title?.EN || "",
    titleID: payload.title?.ID || "",
    descriptionEN: payload.description?.EN || "",
    descriptionID: payload.description?.ID || "",
    tech: joinList(payload.tech),
    github: payload.github || "",
    live: payload.live || "",
    cover: payload.cover || "",
    gradient: payload.gradient || "from-blue-500/20 via-violet-500/10 to-transparent",
    companyName: payload.companyName || "",
    companyIcon: payload.companyIcon || "",
    sortOrder: payload.sortOrder || 1,
    published: payload.published !== false,
    category: payload.category,
    images: joinMediaList(payload.images),
  };
}

function CertificateAdmin({ saving, setSaving, notify, onUploadError }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyCertificate);
  const load = async () => setItems(await getCollectionItems("certificates"));

  useEffect(() => { load(); }, []);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const reset = () => setForm(emptyCertificate);

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    await saveCollectionItem("certificates", form);
    await load();
    reset();
    setSaving(false);
    notify("Certificate saved.");
  };

  return (
    <SectionShell title="Certificate" description="Kelola image, title, description, issuer, dan tanggal sertifikat.">
      <form onSubmit={submit} className="grid gap-4 lg:grid-cols-2">
        <Field label="Title"><TextInput value={form.title} onChange={(e) => update("title", e.target.value)} required /></Field>
        <Field label="Slug"><TextInput value={form.slug} onChange={(e) => update("slug", e.target.value)} /></Field>
        <Field label="Issuer"><TextInput value={form.issuer} onChange={(e) => update("issuer", e.target.value)} /></Field>
        <Field label="Date"><TextInput value={form.date} onChange={(e) => update("date", e.target.value)} /></Field>
        <MediaInput
          label="Certificate media"
          value={form.image}
          onChange={(value) => update("image", value)}
          accept="image/*,application/pdf"
          placeholder="/certificates/name.png, https://.../certificate.pdf, atau drag sertifikat PNG/JPG/PDF."
          onUploadError={onUploadError}
        />
        <Field label="Sort order"><TextInput type="number" value={form.sortOrder} onChange={(e) => update("sortOrder", e.target.value)} /></Field>
        <div className="lg:col-span-2">
          <Field label="Description"><TextArea value={form.description} onChange={(e) => update("description", e.target.value)} /></Field>
        </div>
        <div className="lg:col-span-2 flex items-center justify-between gap-4">
          <Field label="Published"><Checkbox checked={form.published} onChange={(value) => update("published", value)} /></Field>
          <FormActions saving={saving} onReset={reset} />
        </div>
      </form>
      <ItemList
        items={items}
        titleKey="title"
        onEdit={(item) => setForm({ ...emptyCertificate, ...item })}
        onDelete={async (slug) => {
          await deleteCollectionItem("certificates", slug);
          await load();
          notify("Certificate deleted.");
        }}
      />
    </SectionShell>
  );
}

function ContactAdmin({ saving, setSaving, notify }) {
  const [form, setForm] = useState(emptyContact);

  useEffect(() => {
    getSiteContent("contact", emptyContact).then((content) =>
      setForm({ ...emptyContact, ...content }),
    );
  }, []);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    await saveSiteContent("contact", form);
    setSaving(false);
    notify("Contact content saved.");
  };

  return (
    <SectionShell
      title="Contact"
      description="Konten contact yang bisa dipakai halaman depan: headline, deskripsi, availability, dan social links."
    >
      <form onSubmit={submit} className="grid gap-4 lg:grid-cols-2">
        <Field label="Tagline EN"><TextInput value={form.taglineEN} onChange={(e) => update("taglineEN", e.target.value)} /></Field>
        <Field label="Tagline ID"><TextInput value={form.taglineID} onChange={(e) => update("taglineID", e.target.value)} /></Field>
        <Field label="Title EN"><TextInput value={form.titleEN} onChange={(e) => update("titleEN", e.target.value)} /></Field>
        <Field label="Title ID"><TextInput value={form.titleID} onChange={(e) => update("titleID", e.target.value)} /></Field>
        <Field label="Description EN"><TextArea value={form.descriptionEN} onChange={(e) => update("descriptionEN", e.target.value)} /></Field>
        <Field label="Description ID"><TextArea value={form.descriptionID} onChange={(e) => update("descriptionID", e.target.value)} /></Field>
        <Field label="Availability EN"><TextInput value={form.availabilityEN} onChange={(e) => update("availabilityEN", e.target.value)} /></Field>
        <Field label="Availability ID"><TextInput value={form.availabilityID} onChange={(e) => update("availabilityID", e.target.value)} /></Field>
        <Field label="Footer EN"><TextInput value={form.footerEN} onChange={(e) => update("footerEN", e.target.value)} /></Field>
        <Field label="Footer ID"><TextInput value={form.footerID} onChange={(e) => update("footerID", e.target.value)} /></Field>
        <Field label="Instagram URL"><TextInput value={form.instagram} onChange={(e) => update("instagram", e.target.value)} /></Field>
        <Field label="LinkedIn URL"><TextInput value={form.linkedin} onChange={(e) => update("linkedin", e.target.value)} /></Field>
        <Field label="WhatsApp URL"><TextInput value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} /></Field>
        <Field label="Email mailto"><TextInput value={form.email} onChange={(e) => update("email", e.target.value)} /></Field>
        <div className="lg:col-span-2">
          <FormActions saving={saving} onReset={() => setForm(emptyContact)} />
        </div>
      </form>
    </SectionShell>
  );
}

// ---------------------------------------------------------------------------
// AdminDashboard — root
// ---------------------------------------------------------------------------

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("experience");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [authReady, setAuthReady] = useState(!isFirebaseConfigured);
  const [authUser, setAuthUser] = useState(null);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [faceVerified, setFaceVerified] = useState(!adminFaceAuthConfig.enabled);
  const faceRequired = isFirebaseConfigured && adminFaceAuthConfig.enabled;

  const activeLabel = useMemo(
    () => TABS.find((tab) => tab.id === activeTab)?.label || "Admin",
    [activeTab],
  );

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setAuthReady(true);
      return undefined;
    }
    return onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setFaceVerified(!adminFaceAuthConfig.enabled);
      setAuthReady(true);
    });
  }, []);

  const notify = (text) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2500);
  };

  const handleUploadError = (msg) => {
    setUploadError(msg);
  };

  const handleLogin = async ({ email, password }) => {
    if (!auth) return;
    setAuthError("");
    setAuthLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setAuthError(error?.message || "Login gagal. Cek email dan password.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    setFaceVerified(false);
    notify("Signed out.");
  };

  if (isFirebaseConfigured && !authReady) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 py-24">
        <p className="text-sm text-white/45">Checking admin session...</p>
      </main>
    );
  }

  if (isFirebaseConfigured && !authUser) {
    return <AdminLogin onLogin={handleLogin} authError={authError} loading={authLoading} />;
  }

  if (faceRequired && !faceVerified) {
    return <AdminFaceLogin onVerified={() => setFaceVerified(true)} onLogout={handleLogout} />;
  }

  const sharedProps = { saving, setSaving, notify, onUploadError: handleUploadError };

  return (
    <main className="min-h-screen px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      {/* Global upload error toast */}
      <Toast message={uploadError} onDismiss={() => setUploadError("")} />

      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-[10px] font-semibold tracking-widest text-white/35 uppercase">Rulif CMS</p>
            <h1 className="mt-2 text-4xl font-bold text-white/90">Admin Dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/45">
              Kelola konten dinamis untuk experience, projects, certificates, dan contact. Mode saat ini:{" "}
              {isFirebaseConfigured ? "Firebase Firestore" : "Local fallback"}.
            </p>
            {authUser?.email && (
              <p className="mt-2 text-xs text-white/30">Signed in as {authUser.email}</p>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {isFirebaseConfigured && (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md border border-white/10 px-4 py-2 text-sm text-white/60 transition hover:text-white"
              >
                Sign out
              </button>
            )}
            <a
              href="/"
              className="rounded-md border border-white/10 px-4 py-2 text-sm text-white/60 transition hover:text-white"
            >
              Back to site
            </a>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          <aside className="h-fit rounded-lg border border-white/10 bg-black/20 p-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`block w-full rounded-md px-3 py-2 text-left text-sm transition ${
                  activeTab === tab.id
                    ? "bg-white text-black"
                    : "text-white/55 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </aside>

          <div className="rounded-lg border border-white/10 bg-black/20 p-4 sm:p-6">
            <div className="mb-6 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-white/45">{activeLabel}</p>
              {message && (
                <span className="rounded-full border border-emerald-400/20 px-3 py-1 text-xs text-emerald-300">
                  {message}
                </span>
              )}
            </div>
            {activeTab === "experience" && <ExperienceAdmin {...sharedProps} />}
            {activeTab === "dev" && <ProjectAdmin type="dev" {...sharedProps} />}
            {activeTab === "qa" && <ProjectAdmin type="qa" {...sharedProps} />}
            {activeTab === "certificate" && <CertificateAdmin {...sharedProps} />}
            {activeTab === "contact" && <ContactAdmin saving={saving} setSaving={setSaving} notify={notify} />}
          </div>
        </div>
      </div>
    </main>
  );
}