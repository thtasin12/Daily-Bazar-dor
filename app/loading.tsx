import SkeletonGrid from "@/components/SkeletonGrid";

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="h-6 w-full max-w-3xl mx-auto rounded bg-gray-200 animate-pulse mb-8" />
      <div className="h-56 rounded-xl bg-gray-100 animate-pulse mb-10" />
      <SkeletonGrid count={8} />
    </div>
  );
}
