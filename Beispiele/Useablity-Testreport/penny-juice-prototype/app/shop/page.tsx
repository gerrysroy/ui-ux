import { ProductGrid } from "@/app/components/product-grid";

export default function ShopPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Shop Organic Juices</h1>
        <p className="max-w-3xl text-gray-700">
          Zielgerichteter Produktbereich mit klarer Trennung zwischen Information und Kauf.
        </p>
      </header>
      <ProductGrid />
    </main>
  );
}
