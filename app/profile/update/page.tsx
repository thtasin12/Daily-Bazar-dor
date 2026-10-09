"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) router.push("/signin?next=/profile/update");
    if (session?.user?.name) setName(session.user.name);
  }, [session, isPending, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await authClient.updateUser({ name });
    setLoading(false);
    if (error) {
      toast.error(error.message ?? "আপডেট ব্যর্থ হয়েছে");
      return;
    }
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
    router.push("/profile");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-bazar-50 to-white px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-bazar-700"
        >
          <ArrowLeft className="h-4 w-4" /> প্রোফাইলে ফিরে যান
        </Link>
        <h1 className="mt-4 text-xl font-bold text-gray-900">
          প্রোফাইল আপডেট করুন
        </h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              নাম
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-bazar-500 focus:outline-none focus:ring-2 focus:ring-bazar-100"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-bazar-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-bazar-700 transition disabled:opacity-60"
          >
            {loading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
          </button>
        </form>
      </div>
    </div>
  );
}
