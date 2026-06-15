import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "../lib/firebase";
import { getSeedProjects, mapRemoteProject, projectSlug } from "../data/projectsData";

const COLLECTION_NAME = "projects";
const LOCAL_KEY = "rulif-admin-projects";

function splitMediaList(value) {
  const raw = String(value || "").trim();
  if (!raw) return [];

  const lines = raw
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (lines.length > 1 || raw.startsWith("data:")) return lines;

  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function joinMediaList(value) {
  return Array.isArray(value) ? value.join("\n") : value || "";
}

function readLocalProjects() {
  try {
    const saved = localStorage.getItem(LOCAL_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function writeLocalProjects(projects) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(projects));
}

export function projectToForm(project) {
  return {
    slug: project.slug || project.id || "",
    titleEN: project.title?.EN || project.titleEN || project.title || "",
    titleID: project.title?.ID || project.titleID || "",
    descriptionEN: project.description?.EN || project.descriptionEN || project.description || "",
    descriptionID: project.description?.ID || project.descriptionID || "",
    tech: Array.isArray(project.tech) ? project.tech.join(", ") : project.tech || "",
    github: project.github || "",
    live: project.live || "",
    cover: project.cover || project.coverUrl || "",
    gradient: project.gradient || "from-blue-500/20 via-violet-500/10 to-transparent",
    companyName: project.companyName || "",
    companyIcon: project.companyIcon || "",
    sortOrder: project.sortOrder || 1,
    published: project.published !== false,
    category: project.category || "dev",
    images: joinMediaList(project.images),
  };
}

export function formToProject(form) {
  const slug = form.slug || projectSlug(form.titleEN);

  return {
    slug,
    category: form.category || "dev",
    title: {
      EN: form.titleEN.trim(),
      ID: (form.titleID || form.titleEN).trim(),
    },
    description: {
      EN: form.descriptionEN.trim(),
      ID: (form.descriptionID || form.descriptionEN).trim(),
    },
    tech: String(form.tech || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    github: form.github?.trim() || null,
    live: form.live?.trim() || null,
    cover: form.cover?.trim() || null,
    gradient: form.gradient?.trim() || "from-blue-500/20 via-violet-500/10 to-transparent",
    companyName: form.companyName?.trim() || null,
    companyIcon: form.companyIcon?.trim() || null,
    images: splitMediaList(form.images),
    sortOrder: Number(form.sortOrder) || 1,
    published: Boolean(form.published),
  };
}

export async function getAdminProjects() {
  if (!isFirebaseConfigured || !db) {
    return readLocalProjects()
      .map((project) => ({
        ...project,
        slug: project.slug || project.id,
        sortOrder: Number(project.sortOrder) || 999,
      }))
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  return snapshot.docs
    .map((projectDoc) => {
      const data = projectDoc.data();
      return {
        id: projectDoc.id,
        ...data,
        slug: data.slug || projectDoc.id,
        sortOrder: Number(data.sortOrder) || 999,
      };
    })
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

export async function getPublicProjects(lang = "EN", category = "dev") {
  const projects = await getAdminProjects();
  return projects
    .filter((project) => project.category === category && project.published !== false)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
    .map((project) => mapRemoteProject(project, lang));
}

export async function saveProject(form) {
  const project = formToProject(form);

  if (!isFirebaseConfigured || !db) {
    const projects = readLocalProjects();
    const nextProjects = [
      ...projects.filter((item) => item.slug !== project.slug),
      project,
    ].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    writeLocalProjects(nextProjects);
    return project;
  }

  await setDoc(
    doc(db, COLLECTION_NAME, project.slug),
    {
      ...project,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
  return project;
}

export async function deleteProject(slug) {
  if (!slug) {
    throw new Error("Document ID project tidak ditemukan untuk delete.");
  }

  if (!isFirebaseConfigured || !db) {
    writeLocalProjects(readLocalProjects().filter((item) => (item.slug || item.id) !== slug));
    return;
  }

  await deleteDoc(doc(db, COLLECTION_NAME, slug));
}

export async function seedDefaultProjects() {
  const seeds = getSeedProjects();

  if (!isFirebaseConfigured || !db) {
    writeLocalProjects(seeds);
    return seeds;
  }

  await Promise.all(
    seeds.map((project) =>
      setDoc(
        doc(db, COLLECTION_NAME, project.slug),
        {
          ...project,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      ),
    ),
  );
  return seeds;
}
