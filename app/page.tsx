import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getCategories, getProducts } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import SectionTitle from "@/components/SectionTitle";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [products, categories, session] = await Promise.all([
    getProducts(),
    getCategories(),
    auth.api.getSession({ headers: await headers() }),
  ]);

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <>
      <Navbar
        categories={categories}
        user={session ? { name: session.user.name, email: session.user.email } : null}
      />
      <Ticker products={products} />
      <Hero />

      <div className="max-w-6xl mx-auto px-4 space-y-14 mt-12">
        <section>
          <SectionTitle title="আজকের দাম বাড়ছে ▲" subtitle="গতকালের তুলনায় সবচেয়ে বেশি দাম বেড়েছে যেসব পণ্যের" />
          <ProductGrid products={risers} />
        </section>

        <section>
          <SectionTitle title="আজকের দাম কমছে ▼" subtitle="গতকালের তুলনায় সবচেয়ে বেশি দাম কমেছে যেসব পণ্যের" />
          <ProductGrid products={fallers} />
        </section>

        <section id="sob-ponno" className="scroll-mt-24">
          <SectionTitle title="সব পণ্য" subtitle="বাজারে প্রাপ্ত সকল পণ্যের আজকের হালনাগাদ দাম" />
          <ProductGrid products={products} />
        </section>
      </div>

      <Footer />
    </>
  );
}
