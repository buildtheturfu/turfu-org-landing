'use client';

import { useScrollSpy } from '@/hooks/useScrollSpy';

const SECTION_IDS = ['problem', 'ecosystem', 'architecture', 'principles', 'cta'];

/**
 * Invisible component that tracks scroll position and updates URL hash
 */
export default function ScrollSpy() {
  useScrollSpy(SECTION_IDS, { offset: 150 });
  return null;
}
