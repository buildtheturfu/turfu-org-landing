import { Check, AlertCircle } from 'lucide-react';

interface SaveIndicatorProps {
  isDirty: boolean;
}

/**
 * Visual indicator showing whether the current content has unsaved changes.
 * Shows "Saved" with a check when clean, "Unsaved changes" with warning when dirty.
 */
export default function SaveIndicator({ isDirty }: SaveIndicatorProps) {
  if (isDirty) {
    return (
      <span className="flex items-center gap-1.5 text-sm text-yellow-500">
        <AlertCircle size={14} />
        Unsaved changes
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1.5 text-sm text-ink-secondary">
      <Check size={14} />
      Saved
    </span>
  );
}
