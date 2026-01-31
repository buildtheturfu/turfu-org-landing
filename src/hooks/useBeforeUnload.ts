import { useEffect } from 'react';

/**
 * Hook to warn users before closing/refreshing the browser tab when there are unsaved changes.
 * Uses the browser's native beforeunload event.
 *
 * @param isDirty - Whether there are unsaved changes that would be lost
 */
export function useBeforeUnload(isDirty: boolean) {
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        // Modern browsers ignore custom messages and show their own default warning
        return '';
      }
    };

    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isDirty]);
}
