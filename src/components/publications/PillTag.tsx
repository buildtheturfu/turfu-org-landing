interface PillTagProps {
  label: string;
  layer?: number | null;
  active?: boolean;
}

const layerStyles: Record<number, string> = {
  0: 'bg-layer-0-light text-layer-0',
  1: 'bg-layer-1-light text-layer-1',
  2: 'bg-layer-2-light text-layer-2',
};

export function PillTag({ label, layer, active }: PillTagProps) {
  const colorClass =
    layer != null && layer in layerStyles
      ? layerStyles[layer]
      : 'bg-paper-depth text-ink-secondary';

  const activeClass = active ? 'ring-2 ring-accent' : '';

  return (
    <span
      className={`inline-block px-2.5 py-0.5 text-caption font-medium rounded-[6px] ${colorClass} ${activeClass}`}
    >
      {label}
    </span>
  );
}
