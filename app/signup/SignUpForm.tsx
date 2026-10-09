"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: "/",
    });
    setLoading(false);
    if (error) {
      toast.error(error.message ?? "নিবন্ধন ব্যর্থ হয়েছে, আবার চেষ্টা করুন");
      return;
    }
    toast.success("নিবন্ধন সফল! এখন লগইন করুন।");
    router.push("/signin");
  };

  return (
    <>
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
            placeholder="আপনার নাম"
            className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-bazar-500 focus:outline-none focus:ring-2 focus:ring-bazar-100"
          />
        </div>
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
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="কমপক্ষে ৬ অক্ষর"
            className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-bazar-500 focus:outline-none focus:ring-2 focus:ring-bazar-100"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-bazar-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-bazar-700 transition disabled:opacity-60"
        >
          {loading ? "নিবন্ধন হচ্ছে..." : "নিবন্ধন করুন"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-medium text-bazar-700 hover:underline cursor-pointer">
          লগইন করুন
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
