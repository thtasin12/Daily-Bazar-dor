import Link from "next/link";
import SignInForm from "./SignInForm";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-bazar-50 to-white px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
        <Link href="/" className="block text-center text-2xl font-bold text-bazar-700">
          🧺 বাজার দর
        </Link>
        <h1 className="mt-4 text-center text-xl font-bold text-gray-900">
          অ্যাকাউন্টে লগইন করুন
        </h1>
        <p className="mt-1 text-center text-sm text-gray-500">
          আপনার ইমেইল ও পাসওয়ার্ড দিয়ে লগইন করুন
        </p>
        <SignInForm />
      </div>
    </div>
  );
}
