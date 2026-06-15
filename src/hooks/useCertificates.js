import { useEffect, useState } from "react";
import { DEFAULT_CERTIFICATES } from "../data/certificatesData";
import { getCollectionItems } from "../services/adminContentService";

export default function useCertificates() {
  const [certificates, setCertificates] = useState(DEFAULT_CERTIFICATES);

  useEffect(() => {
    let alive = true;

    async function loadCertificates() {
      try {
        const items = await getCollectionItems("certificates");
        if (!alive) return;
        const published = items
          .filter((item) => item.published !== false)
          .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
        setCertificates(published.length > 0 ? published : DEFAULT_CERTIFICATES);
      } catch {
        if (alive) setCertificates(DEFAULT_CERTIFICATES);
      }
    }

    loadCertificates();

    return () => {
      alive = false;
    };
  }, []);

  return certificates;
}
