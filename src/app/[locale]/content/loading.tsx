function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-white/10 rounded ${className || ''}`} />
  );
}

function ArticleCardSkeleton() {
  return (
    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
      <Skeleton className="h-4 w-20 mb-3" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-4" />
      <div className="flex gap-4">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}

export default function ContentLoading() {
  return (
    <main className="flex-1 p-4 md:p-8 max-w-4xl">
      {/* Header skeleton */}
      <div className="mb-8">
        <Skeleton className="h-9 w-48 mb-2" />
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Tags skeleton */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-7 w-16 rounded-full" />
        ))}
      </div>

      {/* Articles skeleton */}
      <div className="grid gap-4">
        {[1, 2, 3, 4].map((i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    </main>
  );
}
