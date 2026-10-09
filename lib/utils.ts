import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BN_DIGITS: Record<string, string> = {
  "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
  "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯",
};

export function toBn(input: number | string): string {
  return String(input).replace(/[0-9]/g, (d) => BN_DIGITS[d]);
}


export function bnPrice(n: number): string {
  return `${toBn(n)} টাকা`;
}

export function bnDate(): string {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

export type SortKey = "default" | "price-asc" | "price-desc" | "name-asc" | "name-desc";
