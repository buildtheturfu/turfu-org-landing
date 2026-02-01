import { useEffect, useCallback } from 'react';

/**
 * Hook that captures Cmd+S (Mac) or Ctrl+S (Windows/Linux) and calls the save callback.
 * Prevents the default browser "Save Page" dialog.
 *
 * @param onSave - Callback function to execute when save shortcut is pressed
 */
export function useSaveShortcut(onSave: () => void) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Cmd+S on Mac, Ctrl+S on Windows/Linux
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        onSave();
      }
    },
    [onSave]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
