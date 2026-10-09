
import type { Product } from "@/lib/api";
import { toBn } from "@/lib/utils";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

export default function Ticker({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="bg-bazar-900 overflow-hidden py-2 text-white">
      <MarqueeText
      direction="left"
      duration={12}
      className="w-full"
      >
        {products.map((p, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-4 text-sm whitespace-nowrap"
          >
            <span>{p.image}</span>

            <span className="font-medium">
              {p.nameBn}
            </span>

            <span className="text-bazar-100">
              {toBn(p.today)} টাকা/{p.unit}
            </span>

            <span
              className={
                p.change.dir === "up"
                  ? "text-green-400"
                  : p.change.dir === "down"
                    ? "text-red-400"
                    : "text-gray-400"
              }
            >
              {p.change.dir === "up"
                ? "▲"
                : p.change.dir === "down"
                  ? "▼"
                  : "▬"}{" "}
              {toBn(Math.abs(p.change.pct))}%
            </span>
          </span>
        ))}
      </MarqueeText>
    </div>
  );
}
