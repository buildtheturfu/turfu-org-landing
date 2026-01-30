function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-overlay rounded ${className || ''}`} />
  );
}

export default function ArticleLoading() {
  return (
    <div className="flex">
      {/* Main content */}
      <article className="flex-1 p-4 md:p-8 max-w-3xl">
        {/* Back link skeleton */}
        <Skeleton className="h-4 w-16 mb-6" />

        {/* Header skeleton */}
        <header className="mb-8">
          <Skeleton className="h-5 w-24 mb-4" />
          <Skeleton className="h-10 w-full mb-2" />
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-5 w-full mb-6" />

          <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-border">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        </header>

        {/* Content skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-32 w-full mt-6" />
          <Skeleton className="h-4 w-full mt-6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Tags skeleton */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-7 w-20 rounded-full" />
            ))}
          </div>
        </div>
      </article>

      {/* TOC skeleton - hidden on mobile */}
      <aside className="hidden lg:block w-64 p-4">
        <Skeleton className="h-5 w-32 mb-4" />
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </aside>
    </div>
  );
}
