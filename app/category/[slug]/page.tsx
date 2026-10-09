import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getCategories, getProducts, type Product } from "@/lib/api";
import type { SortKey } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import ProductGrid from "@/components/ProductGrid";
import SortDropdown from "@/components/SortDropdown";
import Footer from "@/components/Footer";
import { Home } from "lucide-react";

export const dynamic = "force-dynamic";

const VALID_SORTS: SortKey[] = ["default", "price-asc", "price-desc", "name-asc", "name-desc"];

function sortProducts(products: Product[], sort: SortKey): Product[] {
  const list = [...products];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.today - b.today);
    case "price-desc":
      return list.sort((a, b) => b.today - a.today);
    case "name-asc":
      return list.sort((a, b) => a.nameBn.localeCompare(b.nameBn, "bn"));
    case "name-desc":
      return list.sort((a, b) => b.nameBn.localeCompare(a.nameBn, "bn"));
    default:
      return list;
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const { slug } = await params;
  const { sort } = await searchParams;
  const sortKey: SortKey = VALID_SORTS.includes(sort as SortKey)
    ? (sort as SortKey)
    : "default";

  const [products, categories, session] = await Promise.all([
    getProducts(),
    getCategories(),
    auth.api.getSession({ headers: await headers() }),
  ]);

  const category = categories.find((c) => c.slug === slug) ?? null;
  const items = sortProducts(
    products.filter((p) => p.category === slug),
    sortKey
  );

  return (
    <>
      <Navbar
        categories={categories}
        user={session ? { name: session.user.name, email: session.user.email } : null}
      />
      <Ticker products={products} />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {category && items.length > 0 ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {category.icon} {category.nameBn}{" "}
                <span className="text-base font-normal text-gray-400">
                  ({items.length}টি পণ্য)
                </span>
              </h1>
              <SortDropdown basePath={`/category/${slug}`} />
            </div>
            <ProductGrid products={items} />
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-6xl">🛒</p>
            <h1 className="mt-4 text-2xl font-bold text-gray-800">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
            </h1>
            <p className="mt-2 text-gray-500">
              হয়তো ক্যাটাগরিটির নাম ভুল অথবা এখনো কোনো পণ্য যুক্ত হয়নি।
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-bazar-600 px-5 py-2.5 text-white font-medium hover:bg-bazar-700 transition"
            >
              <Home className="w-4 h-4" />
              হোম পেজে ফিরে যান
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
