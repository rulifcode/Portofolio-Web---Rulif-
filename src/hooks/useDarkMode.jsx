import { useState, useEffect } from "react";

/**
 * useDarkMode — persists dark/light preference and syncs the `dark` class
 * on `<html>` so Tailwind's dark variant works globally.
 *
 * @param {boolean} initialDark  Starting value (default: true)
 * @returns {{ dark: boolean, setDark: Function, toggleDark: Function }}
 */
export default function useDarkMode(initialDark = true) {
  const [dark, setDark] = useState(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "dark") return true;
      if (stored === "light") return false;
    } catch { /* SSR / private browsing */ }
    return initialDark;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch { /* noop */ }
  }, [dark]);

  const toggleDark = () => setDark((d) => !d);

  return { dark, setDark, toggleDark };
}
