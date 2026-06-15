import { useEffect, useMemo, useState } from "react";
import { getPublicProjects } from "../services/projectsService";
import { getStaticProjectGroups } from "../data/projectsData";

export default function useProjects(lang = "EN") {
  const staticGroups = useMemo(() => getStaticProjectGroups(lang), [lang]);
  const [devProjects, setDevProjects] = useState(staticGroups.devProjects);
  const [vodjoProjects, setVodjoProjects] = useState(staticGroups.vodjoProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function loadProjects() {
      setLoading(true);
      try {
        const [remoteDevProjects, remoteQaProjects] = await Promise.all([
          getPublicProjects(lang, "dev"),
          getPublicProjects(lang, "qa"),
        ]);
        if (!alive) return;
        setDevProjects(remoteDevProjects.length > 0 ? remoteDevProjects : staticGroups.devProjects);
        setVodjoProjects(remoteQaProjects.length > 0 ? remoteQaProjects : staticGroups.vodjoProjects);
      } catch {
        if (alive) {
          setDevProjects(staticGroups.devProjects);
          setVodjoProjects(staticGroups.vodjoProjects);
        }
      } finally {
        if (alive) setLoading(false);
      }
    }

    loadProjects();

    return () => {
      alive = false;
    };
  }, [lang, staticGroups.devProjects, staticGroups.vodjoProjects]);

  return {
    ...staticGroups,
    vodjoProjects,
    devProjects,
    allProjects: [...vodjoProjects, ...devProjects],
    loading,
  };
}
