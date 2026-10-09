"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

function FormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: next,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message ?? "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে");
      return;
    }
    toast.success("লগইন সফল হয়েছে!");
    router.push(next);
    router.refresh();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            ইমেইল
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-bazar-500 focus:outline-none focus:ring-2 focus:ring-bazar-100"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            পাসওয়ার্ড
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-bazar-500 focus:outline-none focus:ring-2 focus:ring-bazar-100"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-bazar-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-bazar-700 transition disabled:opacity-60"
        >
          {loading ? "লগইন হচ্ছে..." : "লগইন করুন"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        নতুন অ্যাকাউন্ট?{" "}
        <Link href="/signup" className="font-medium text-bazar-700 hover:underline">
          নিবন্ধন করুন
        </Link>
      </p>

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-400">অথবা</span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <SocialButtons />
    </>
  );
}

export default function SignInForm() {
  return (
    <Suspense>
      <FormInner />
    </Suspense>
  );
}
