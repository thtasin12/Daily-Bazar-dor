export default function Footer() {
  return (
    <footer className="mt-16 bg-bazar-900 text-bazar-50">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div>
          <p className="text-xl font-bold">🧺 বাজার দর</p>
          <p className="text-sm text-bazar-200 mt-1">
            আপনার প্রয়োজনীয় পণ্যের দাম এক ঠিকানায়
          </p>
        </div>
        <p className="text-sm text-bazar-200">
          সর্বস্বত্ব নিবন্ধনধারীর প্রতি সংরক্ষিত © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
