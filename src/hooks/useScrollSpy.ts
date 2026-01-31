'use client';

import { useEffect, useState, useRef } from 'react';

interface UseScrollSpyOptions {
  /** Offset from top to trigger section change (default: 100px) */
  offset?: number;
  /** Throttle delay in ms (default: 100) */
  throttleMs?: number;
}

/**
 * Hook that observes sections and updates URL hash on scroll
 * @param sectionIds - Array of section IDs to observe
 * @param options - Configuration options
 * @returns Currently active section ID
 */
export function useScrollSpy(
  sectionIds: string[],
  options: UseScrollSpyOptions = {}
): string | null {
  const { offset = 100, throttleMs = 100 } = options;
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const throttleRef = useRef<NodeJS.Timeout | null>(null);
  const isManualScrollRef = useRef(false);

  useEffect(() => {
    // Skip if no sections or not in browser
    if (sectionIds.length === 0 || typeof window === 'undefined') return;

    // Get all section elements
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const updateActiveSection = () => {
      // Don't update during manual navigation (click on anchor)
      if (isManualScrollRef.current) return;

      const scrollPosition = window.scrollY + offset;

      // Find the section that's currently in view
      let currentSection: string | null = null;

      for (const section of sections) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSection = section.id;
          break;
        }
      }

      // If we're above the first section, use the first one
      if (!currentSection && scrollPosition < sections[0].offsetTop) {
        currentSection = sections[0].id;
      }

      // If we're below the last section, use the last one
      if (!currentSection) {
        const lastSection = sections[sections.length - 1];
        if (scrollPosition >= lastSection.offsetTop) {
          currentSection = lastSection.id;
        }
      }

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);

        // Update URL hash without triggering scroll
        const newHash = `#${currentSection}`;
        if (window.location.hash !== newHash) {
          history.replaceState(null, '', newHash);
        }
      }
    };

    const throttledUpdate = () => {
      if (throttleRef.current) return;

      throttleRef.current = setTimeout(() => {
        updateActiveSection();
        throttleRef.current = null;
      }, throttleMs);
    };

    // Handle manual anchor clicks - pause scroll spy briefly
    const handleHashChange = () => {
      isManualScrollRef.current = true;
      setTimeout(() => {
        isManualScrollRef.current = false;
      }, 1000);
    };

    // Initial check
    updateActiveSection();

    // Listen to scroll and hash changes
    window.addEventListener('scroll', throttledUpdate, { passive: true });
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('scroll', throttledUpdate);
      window.removeEventListener('hashchange', handleHashChange);
      if (throttleRef.current) {
        clearTimeout(throttleRef.current);
      }
    };
  }, [sectionIds, activeSection, offset, throttleMs]);

  return activeSection;
}
