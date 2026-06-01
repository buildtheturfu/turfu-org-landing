interface PillTagProps {
  label: string;
  layer?: number | null;
  active?: boolean;
}

export function PillTag({ label, active }: PillTagProps) {
  const base =
    'inline-block px-2.5 py-0.5 border text-caption font-mono uppercase tracking-wider rounded-sm transition-colors';
  const stateClass = active
    ? 'border-accent text-accent bg-accent-light'
    : 'border-rule text-ink-secondary hover:border-gold hover:text-gold';

  return <span className={`${base} ${stateClass}`}>{label}</span>;
}
