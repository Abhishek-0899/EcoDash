export default function ProductSliderSkeleton() {
  return (
    <div className="px-4 py-6 animate-pulse">
      <div className="mb-4 flex items-center gap-3">
        <div className="h-6 w-32 bg-gray-300 rounded" />
        <div className="h-5 w-20 bg-gray-300 rounded" />
      </div>

      <div className="relative flex items-center">
        <div className="absolute left-0 z-10 h-10 w-10 bg-gray-200 rounded-full" />
        <div className="mx-12 flex gap-4 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="min-w-40 h-52 rounded-lg bg-gray-200 shadow-sm"
            />
          ))}
        </div>
        <div className="absolute right-0 z-10 h-10 w-10 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
}