export default function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl border border-gray-100 bg-white p-4 animate-pulse">
          <div className="h-10 w-10 rounded bg-gray-200" />
          <div className="mt-3 h-4 w-3/4 rounded bg-gray-200" />
          <div className="mt-2 h-3 w-1/2 rounded bg-gray-100" />
          <div className="mt-4 h-5 w-2/3 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
