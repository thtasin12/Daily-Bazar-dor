import SkeletonGrid from "@/components/SkeletonGrid";

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="h-8 w-64 rounded bg-gray-200 animate-pulse mb-6" />
      <SkeletonGrid count={8} />
    </div>
  );
}
