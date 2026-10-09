import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getCategories } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, PencilLine } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?next=/profile");
  const categories = await getCategories();
  const user = session.user;

  return (
    <>
      <Navbar categories={categories} user={{ name: user.name, email: user.email }} />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-bazar-100 text-3xl font-bold text-bazar-700">
            {user.name?.charAt(0)?.toUpperCase()}
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">{user.name}</h1>
          <p className="mt-1 flex items-center justify-center gap-1.5 text-gray-500">
            <Mail className="h-4 w-4" /> {user.email}
          </p>
          <Link
            href="/profile/update"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-bazar-600 px-5 py-2.5 text-white font-medium hover:bg-bazar-700 transition"
          >
            <PencilLine className="h-4 w-4" /> তথ্য আপডেট করুন
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
