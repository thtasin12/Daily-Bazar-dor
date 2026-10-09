export interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
  markets: MarketPrice[];
}

export interface Category {
  slug: string;
  nameBn: string;
  icon: string;
  count: number;
}

const BASE_URLS = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor", // alternative
];

async function fetchJson<T>(path: string): Promise<T> {
  let lastError: unknown = null;
  for (const base of BASE_URLS) {
    try {
      const res = await fetch(`${base}${path}`, {
        next: { revalidate: 300 },
      });
      if (!res.ok) throw new Error(`API responded with ${res.status}`);
      return (await res.json()) as T;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError ?? new Error("Failed to reach the BazarDor API");
}

export async function getProducts(): Promise<Product[]> {
  return fetchJson<Product[]>("/products");
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  try {
    const raw = await fetchJson<any[]>("/categories");
    return raw.map((c) => ({
      slug: c.slug,
      nameBn: c.nameBn ?? c.name ?? c.slug,
      icon: c.icon ?? c.categoryIcon ?? "🛒",
      count: typeof c.count === "number" ? c.count : 0,
    }));
  } catch {
    // Fallback: derive categories from the products list
    const products = await getProducts();
    const map = new Map<string, Category>();
    for (const p of products) {
      const cur = map.get(p.category) ?? {
        slug: p.category,
        nameBn: p.categoryNameBn,
        icon: p.categoryIcon,
        count: 0,
      };
      cur.count += 1;
      map.set(p.category, cur);
    }
    return [...map.values()];
  }
}
