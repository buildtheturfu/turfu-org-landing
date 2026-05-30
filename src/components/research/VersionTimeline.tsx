import { Star, Clock } from 'lucide-react';
import type { ResearchVersion } from '@/data/research';

interface Props {
  versions: ResearchVersion[];
  title?: string;
}

export default function VersionTimeline({ versions, title }: Props) {
  return (
    <section className="my-10">
      {title && (
        <h2 className="font-display text-2xl text-ink mb-6 flex items-center gap-2">
          <Clock size={20} /> {title}
        </h2>
      )}
      <ol className="relative border-l-2 border-border ml-4 space-y-6">
        {versions.map((v, i) => {
          const isLatest = i === versions.length - 1;
          return (
            <li key={`${v.version}-${v.date}`} className="ml-6 relative">
              <span
                className={`absolute -left-[33px] top-1 w-4 h-4 rounded-full border-2 ${
                  isLatest
                    ? 'bg-accent border-accent ring-4 ring-accent-light/60'
                    : 'bg-paper border-border'
                }`}
              />
              <div
                className={`p-4 rounded-xl border ${
                  isLatest
                    ? 'border-accent/40 bg-accent-light/30'
                    : 'border-border bg-paper-warm/60'
                }`}
              >
                <div className="flex flex-wrap items-baseline gap-3 mb-2">
                  <span className="font-mono text-body-sm font-semibold text-ink">v{v.version}</span>
                  <span className="text-caption text-ink-tertiary">{v.date}</span>
                  {isLatest && (
                    <span className="text-caption uppercase font-mono tracking-widest text-accent ml-auto">
                      Latest
                    </span>
                  )}
                </div>
                <p className="text-body-sm text-ink leading-relaxed mb-2">{v.status}</p>
                {v.scores && (
                  <div className="flex flex-wrap gap-3 text-caption text-ink-tertiary mt-2">
                    {Object.entries(v.scores).map(([key, val]) => (
                      <span key={key} className="flex items-center gap-1">
                        <Star size={11} className="text-accent" /> {key}: <strong>{val}</strong>/10
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
