"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import type { Category } from "@/lib/api";
import { bnDate, cn } from "@/lib/utils";

interface NavbarProps {
  categories: Category[];
  user: { name: string; email: string } | null;
}

export default function Navbar({ categories, user }: NavbarProps) {
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut();
    toast.success("লগ আউট সফল হয়েছে");
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      {/* Row 1: logo + auth */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="leading-tight">
          <span className="text-2xl font-bold text-bazar-700">🧺 বাজার দর</span>
          <span className="block text-xs text-gray-500">{bnDate()}</span>
        </Link>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 rounded-lg border border-bazar-600 px-3 py-1.5 text-sm font-medium text-bazar-700 hover:bg-bazar-50 transition"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{user.name}</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200 transition"
              >
                <LogOut className="w-4 h-4" />
                লগ আউট
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="rounded-lg border border-bazar-600 px-4 py-1.5 text-sm font-medium text-bazar-700 hover:bg-bazar-50 transition"
              >
                লগ ইন
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-bazar-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-bazar-700 transition"
              >
                নিবন্ধন করুন
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Row 2: category links */}
      <nav className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto no-scrollbar">
          <Link
            href="/"
            className={cn(
              "px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition",
              pathname === "/"
                ? "border-bazar-600 text-bazar-700"
                : "border-transparent text-gray-500 hover:text-bazar-700"
            )}
          >
            হোম
          </Link>
          {categories.map((cat) => {
            const active = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={cn(
                  "px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition",
                  active
                    ? "border-bazar-600 text-bazar-700"
                    : "border-transparent text-gray-500 hover:text-bazar-700"
                )}
              >
                {cat.icon} {cat.nameBn}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
