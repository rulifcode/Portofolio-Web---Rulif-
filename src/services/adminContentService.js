import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "../lib/firebase";
import { projectSlug } from "../data/projectsData";

const LOCAL_PREFIX = "rulif-admin-";

function readLocal(key, fallback) {
  try {
    const saved = localStorage.getItem(`${LOCAL_PREFIX}${key}`);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocal(key, value) {
  localStorage.setItem(`${LOCAL_PREFIX}${key}`, JSON.stringify(value));
}

export async function getCollectionItems(collectionName) {
  if (!isFirebaseConfigured || !db) {
    return readLocal(collectionName, []).map((item) => ({
      ...item,
      slug: item.slug || item.id,
    }));
  }

  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs
    .map((itemDoc) => {
      const data = itemDoc.data();
      return {
        id: itemDoc.id,
        ...data,
        slug: data.slug || itemDoc.id,
        sortOrder: Number(data.sortOrder) || 999,
      };
    })
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

export async function saveCollectionItem(collectionName, item) {
  const slug = item.slug || projectSlug(item.titleEN || item.title || item.company || item.label || "item");
  const payload = {
    ...item,
    slug,
    sortOrder: Number(item.sortOrder) || 1,
    published: item.published !== false,
  };

  if (!isFirebaseConfigured || !db) {
    const items = readLocal(collectionName, []);
    writeLocal(
      collectionName,
      [...items.filter((entry) => entry.slug !== slug), payload].sort(
        (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0),
      ),
    );
    return payload;
  }

  await setDoc(
    doc(db, collectionName, slug),
    {
      ...payload,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
  return payload;
}

export async function deleteCollectionItem(collectionName, slug) {
  if (!slug) {
    throw new Error("Document ID tidak ditemukan untuk delete.");
  }

  if (!isFirebaseConfigured || !db) {
    writeLocal(
      collectionName,
      readLocal(collectionName, []).filter((entry) => (entry.slug || entry.id) !== slug),
    );
    return;
  }

  await deleteDoc(doc(db, collectionName, slug));
}

export async function getSiteContent(documentId, fallback = {}) {
  if (!isFirebaseConfigured || !db) {
    return readLocal(`siteContent-${documentId}`, fallback);
  }

  const snapshot = await getDoc(doc(db, "siteContent", documentId));
  return snapshot.exists() ? snapshot.data() : fallback;
}

export async function saveSiteContent(documentId, payload) {
  if (!isFirebaseConfigured || !db) {
    writeLocal(`siteContent-${documentId}`, payload);
    return payload;
  }

  await setDoc(
    doc(db, "siteContent", documentId),
    {
      ...payload,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
  return payload;
}
