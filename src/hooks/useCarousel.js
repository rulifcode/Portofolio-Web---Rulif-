import { useState, useEffect, useCallback, useRef } from "react";

/**
 * useCarousel — manages paginated carousel state with auto-slide.
 *
 * @param {number} totalItems    Total number of items
 * @param {number} perSlide      Items shown per slide
 * @param {number} intervalMs    Auto-slide interval in ms
 * @param {boolean} enabled      Whether the carousel is active
 * @returns {{ slideIndex, totalSlides, goPrev, goNext, goTo, isPaused, setIsPaused, resetSlide }}
 */
export default function useCarousel(totalItems, perSlide = 3, intervalMs = 4000, enabled = true) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const totalSlides = Math.max(1, Math.ceil(totalItems / perSlide));

  const goPrev = useCallback(() => {
    setSlideIndex((p) => (p - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goNext = useCallback(() => {
    setSlideIndex((p) => (p + 1) % totalSlides);
  }, [totalSlides]);

  const goTo = useCallback((i) => setSlideIndex(i), []);

  const resetSlide = useCallback(() => setSlideIndex(0), []);

  // auto-slide
  useEffect(() => {
    if (!enabled || isPaused || totalSlides <= 1) return;
    timerRef.current = setInterval(goNext, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [enabled, isPaused, totalSlides, goNext, intervalMs]);

  return { slideIndex, totalSlides, goPrev, goNext, goTo, isPaused, setIsPaused, resetSlide };
}
