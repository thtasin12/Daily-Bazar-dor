import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-bazar-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-sm font-medium text-bazar-700 tracking-wide">
            প্রতিদিন হালনাগাদকৃত বাজারদর
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            আজকের বাজারের দাম,{" "}
            <span className="text-bazar-600">এক নজরেই</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-md">
            দেশের বিভিন্ন বাজারের নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ দাম জানুন —
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ সবকিছুর হালনাগাদ তথ্য।
          </p>
          <a
            href="#sob-ponno"
            className="mt-6 inline-block rounded-lg bg-bazar-600 px-6 py-3 text-white font-medium hover:bg-bazar-700 transition shadow-md"
          >
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="flex justify-center">
          <Image
            src="/bazar-hero.png"
            alt="তাজা সবজি ও ফলমূলের বাজারের ঝুড়ি"
            width={420}
            height={420}
            priority
            className="drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
