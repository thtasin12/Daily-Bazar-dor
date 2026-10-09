import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <p className="text-7xl font-bold text-bazar-600">৪০৪</p>
      <h1 className="mt-4 text-2xl font-semibold text-gray-800">
        পেজটি পাওয়া যায়নি
      </h1>
      <p className="mt-2 text-gray-500 max-w-md">
        আপনি যে পেজটি খুঁজছেন সেটি হয় নেই, হয় সরানো হয়েছে বা ঠিকানাটি ভুল।
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-bazar-600 px-5 py-2.5 text-white font-medium hover:bg-bazar-700 transition"
      >
        <Home className="w-4 h-4" />
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
