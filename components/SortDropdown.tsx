"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { SortKey } from "@/lib/utils";

const OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
  { value: "name-asc", label: "নাম: ক থেকে ক্ষ" },
  { value: "name-desc", label: "নাম: ক্ষ থেকে ক" },
];

export default function SortDropdown({ basePath }: { basePath: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = (searchParams.get("sort") as SortKey) || "default";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    const qs = params.toString();
    router.push(qs ? `${basePath}?${qs}` : basePath);
  };

  return (
    <div className="relative inline-block">
      <select
        value={current}
        onChange={(e) => handleChange(e.target.value)}
        className="appearance-none rounded-lg border border-gray-200 bg-white pl-4 pr-10 py-2 text-sm font-medium text-gray-700 shadow-sm focus:border-bazar-500 focus:outline-none focus:ring-2 focus:ring-bazar-100 cursor-pointer"
      >
        {OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
    </div>
  );
}
