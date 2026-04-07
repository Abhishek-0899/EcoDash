export default function FashionCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4 border-2 rounded-xl shadow animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded-md" />
      <div className="h-4 w-3/4 bg-gray-300 rounded" />
      <div className="h-4 w-1/2 bg-gray-300 rounded" />
      <div className="h-10 w-full bg-gray-300 rounded" />
    </div>
  );
}
