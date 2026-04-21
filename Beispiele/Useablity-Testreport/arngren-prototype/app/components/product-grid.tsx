import Image from "next/image";
import { products } from "@/app/lib/arngren-data";

type ProductGridProps = {
  category?: "vehicles" | "bikes" | "robots" | "gadgets";
  limit?: number;
};

export function ProductGrid({ category, limit }: ProductGridProps) {
  const filtered = category
    ? products.filter((product) => product.category === category)
    : products;
  const list = typeof limit === "number" ? filtered.slice(0, limit) : filtered;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((product) => (
        <article
          key={product.id}
          className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="relative h-44 bg-slate-50">
            <Image src={product.image} alt={product.name} fill className="object-contain p-3" />
          </div>
          <div className="flex flex-1 flex-col gap-2 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {product.category}
            </p>
            <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
            <p className="text-sm font-semibold text-indigo-700">{product.price}</p>
            <p className="text-sm text-slate-700">{product.note}</p>
            <button className="mt-auto rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
              In den Warenkorb (Prototyp)
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
