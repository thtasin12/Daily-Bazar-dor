import Link from "next/link";
import type { Product } from "@/lib/api";
import { toBn } from "@/lib/utils";

function ChangeBadge({ change }: { change: Product["change"] }) {
  const styles =
    change.dir === "up"
      ? "bg-green-100 text-green-700"
      : change.dir === "down"
        ? "bg-red-100 text-red-700"
        : "bg-gray-100 text-gray-600";
  const arrow = change.dir === "up" ? "▲" : change.dir === "down" ? "▼" : "▬";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${styles}`}>
      {arrow} {toBn(Math.abs(change.pct))}%
    </span>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md hover:border-bazar-200 transition"
    >
      <div className="text-4xl">{product.image}</div>
      <h3 className="mt-3 font-semibold text-gray-900">{product.nameBn}</h3>
      <p className="text-sm text-gray-500">একক: {product.unit}</p>
      <div className="mt-3 flex items-center justify-between gap-2">
        <p className="text-lg font-bold text-bazar-700">
          {toBn(product.today)}{" "}
          <span className="text-sm font-normal text-gray-500">টাকা</span>
        </p>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}
