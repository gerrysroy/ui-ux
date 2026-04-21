import Image from "next/image";
import { juiceProducts } from "@/app/lib/penny-data";

type ProductGridProps = {
  compact?: boolean;
};

export function ProductGrid({ compact = false }: ProductGridProps) {
  const products = compact ? juiceProducts.slice(0, 3) : juiceProducts;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <article
          key={product.slug}
          className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm"
        >
          <div className="relative h-52 bg-emerald-50">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-4"
            />
          </div>
          <div className="space-y-2 p-4">
            <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-700">{product.ingredients}</p>
            <button className="mt-1 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
              Buy
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
