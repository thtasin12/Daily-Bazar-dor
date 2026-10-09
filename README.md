# 🧺 বাজার দর (Bazar Dor)

দেশের বিভিন্ন বাজারের নিত্যপ্রয়োজনীয় পণ্যের আজকের হালনাগাদ দাম জানার একটি আধুনিক ওয়েব অ্যাপ্লিকেশন। চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার দাম — সব এক প্ল্যাটফর্মে, বাংলায়।

## 🚀 Technologies Used

- **Next.js 16** (App Router, latest) — UI ও server-side rendering
- **React 19** (latest) — কম্পোনেন্ট লাইব্রেরি
- **Better Auth** (latest) — Authentication (email/password + Google + GitHub)
- **MongoDB** (official driver + better-auth MongoDB adapter) — ডেটাবেস
- **Tailwind CSS v4** (CSS-first config) — স্টাইলিং ও রেসপন্সিভ ডিজাইন
- **TypeScript** — টাইপ সেফটি
- **react-hot-toast** — টোস্ট নোটিফিকেশন
- **Lucide React** — আইকন

## ✨ Key Features

1. **Live Price Ticker** — ন্যাভবারের নিচে অসীম স্ক্রলিং মার্কি দিয়ে সব পণ্যের আজকের দাম ও পরিবর্তন ▲▼
2. **Smart Product Sections** — "আজকের দাম বাড়ছে ▲" ও "আজকের দাম কমছে ▼" সেকশনে টপ ৬টি পণ্য অটো সাজানো
3. **Market-wise Price Details** — প্রতিটি পণ্যের সর্বনিম্ন/সর্বোচ্চ/গড় দাম সহ ১২টি বাজারের বিস্তারিত তালিকা (লগইন প্রয়োজন — protected route)
4. **Category Sorting** — প্রতিটি ক্যাটাগরিতে দাম (কম↔বেশি) ও নাম (ক↔ক্ষ) অনুযায়ী সর্টিং
5. **Full Authentication** — Better Auth দিয়ে email/password রেজিস্ট্রেশন ও লগইন, Google ও GitHub সোশ্যাল লগইন, প্রোফাইল আপডেট
6. **Skeleton Loading & Toast** — ডেটা লোড হওয়ার সময় স্কেলেটন লোডার, সব অ্যাকশনে টোস্ট ফিডব্যাক
7. **Fully Responsive** — মোবাইল, ট্যাবলেট ও ডেস্কটপ — সব স্ক্রিনে নিখুঁত

## 🛠️ Getting Started

```bash
# 1. Clone & install
git clone <your-repo-url>
cd bazar-dor
npm install

# 2. Environment setup
cp .env.example .env
# .env এ MONGODB_URI বসাও (MongoDB Atlas বা local)
# BETTER_AUTH_SECRET বদলে দিন: openssl rand -base64 32
# Atlas থাকলে Network Access-এ আপনার IP whitelist করতে ভুলবেন না

# 3. Run (MongoDB-তে schema push লাগে না — collection auto তৈরি হয়)
npm run dev
```

ব্রাউজারে খুলুন: http://localhost:3000

## ☁️ Deployment (Vercel)

1. MongoDB Atlas-এ free cluster বানিয়ে `MONGODB_URI` নিন
2. Vercel → Project → Settings → Environment Variables এ বসান:
   - `MONGODB_URI`, `MONGODB_DB_NAME` (optional)
   - `BETTER_AUTH_URL` = আপনার live URL (যেমন `https://bazar-dor.vercel.app`)
   - `BETTER_AUTH_SECRET` = `openssl rand -base64 32` দিয়ে জেনারেট করা সিক্রেট
3. Atlas-এ **Network Access → Allow Access from Anywhere (0.0.0.0/0)** করুন (Vercel-এর IP fixed না)
4. GitHub-এ push করে Vercel-এ import করুন

## 📡 API

- BASE: `https://api.api-store.workers.dev/api/bazardor` (alternative: `https://api.abcz.workers.dev/api/bazardor`)
- Endpoints: `/products`, `/products?category=chal`, `/products/:id`, `/categories`, `/categories/:slug`


