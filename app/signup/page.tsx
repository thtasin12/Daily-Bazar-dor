import Link from "next/link";
import SignUpForm from "./SignUpForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-bazar-50 to-white px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
        <Link href="/" className="block text-center text-2xl font-bold text-bazar-700">
          🧺 বাজার দর
        </Link>
        <h1 className="mt-4 text-center text-xl font-bold text-gray-900">
          নতুন অ্যাকাউন্ট খুলুন
        </h1>
        <p className="mt-1 text-center text-sm text-gray-500">
          মাত্র এক মিনিটে নিবন্ধন সম্পন্ন করুন
        </p>
        <SignUpForm />
      </div>
    </div>
  );
}
