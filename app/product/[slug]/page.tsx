import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getCategories, getProductBySlug } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import { toBn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [product, categories, session] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
    auth.api.getSession({ headers: await headers() }),
  ]);

  // Protected route — login required
  if (!session) {
    redirect(`/signin?next=${encodeURIComponent(`/product/${slug}`)}`);
  }

  if (!product) notFound();

  const prices = product.markets.map((m) => (m.min + m.max) / 2);
  const min = Math.min(...product.markets.map((m) => m.min));
  const max = Math.max(...product.markets.map((m) => m.max));
  const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);

  return (
    <>
      <Navbar
        categories={categories}
        user={session ? { name: session.user.name, email: session.user.email } : null}
      />
      <Ticker products={[product]} />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Top summary */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="text-7xl bg-bazar-50 rounded-2xl p-6 self-start">
              {product.image}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                {product.nameBn}
              </h1>
              <p className="mt-2 text-gray-600 max-w-2xl">
                {product.nameBn}-এর বাজারদর সারসংক্ষেপ — গতকালের তুলনায়{" "}
                {product.change.dir === "up"
                  ? `দাম ${toBn(product.change.pct)}% বেড়েছে 📈`
                  : product.change.dir === "down"
                    ? `দাম ${toBn(Math.abs(product.change.pct))}% কমেছে 📉`
                    : "দাম অপরিবর্তিত রয়েছে ➖"}
                । বিভিন্ন বাজারে সর্বশেষ সংগ্রহকৃত তথ্য অনুযায়ী আজকের সর্বনিম্ন দাম{" "}
                {toBn(min)} টাকা এবং সর্বোচ্চ {toBn(max)} টাকা।
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                <span className="rounded-full bg-bazar-100 text-bazar-800 px-3 py-1 font-medium">
                  {product.categoryIcon} {product.categoryNameBn}
                </span>
                <span className="rounded-full bg-gray-100 text-gray-700 px-3 py-1 font-medium">
                  একক: {product.unit}
                </span>
              </div>
            </div>
          </div>

          {/* Price summary */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl bg-green-50 border border-green-100 p-5 text-center">
              <p className="text-sm text-green-700 font-medium">সর্বনিম্ন দাম</p>
              <p className="mt-1 text-2xl font-bold text-green-800">
                {toBn(min)} <span className="text-sm font-normal">টাকা</span>
              </p>
            </div>
            <div className="rounded-xl bg-red-50 border border-red-100 p-5 text-center">
              <p className="text-sm text-red-700 font-medium">সর্বোচ্চ দাম</p>
              <p className="mt-1 text-2xl font-bold text-red-800">
                {toBn(max)} <span className="text-sm font-normal">টাকা</span>
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-5 text-center">
              <p className="text-sm text-gray-600 font-medium">গড় দাম</p>
              <p className="mt-1 text-2xl font-bold text-gray-800">
                {toBn(avg)} <span className="text-sm font-normal">টাকা</span>
              </p>
            </div>
          </div>
        </div>

        {/* Market-wise prices */}
        <h2 className="mt-10 mb-4 text-2xl font-bold text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-bazar-50 text-left text-bazar-900">
                <th className="px-4 py-3 font-semibold">বাজারের নাম</th>
                <th className="px-4 py-3 font-semibold">বিভাগ</th>
                <th className="px-4 py-3 font-semibold">সর্বনিম্ন (টাকা)</th>
                <th className="px-4 py-3 font-semibold">সর্বোচ্চ (টাকা)</th>
              </tr>
            </thead>
            <tbody>
              {product.markets.map((m, i) => (
                <tr
                  key={m.market}
                  className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-3 font-medium text-gray-800">{m.market}</td>
                  <td className="px-4 py-3 text-gray-600">{m.division}</td>
                  <td className="px-4 py-3 text-green-700 font-semibold">
                    {toBn(m.min)}
                  </td>
                  <td className="px-4 py-3 text-red-700 font-semibold">
                    {toBn(m.max)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
}
