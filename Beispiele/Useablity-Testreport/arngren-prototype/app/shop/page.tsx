import { ProductGrid } from "@/app/components/product-grid";

type ShopPageProps = {
  searchParams: Promise<{ cat?: "vehicles" | "bikes" | "robots" | "gadgets" }>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const category = params.cat;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-5 py-8">
      <header>
        <h1 className="text-3xl font-bold">Shop</h1>
        <p className="mt-2 text-slate-600">
          Strukturierte Produktdarstellung mit konsistentem Kauf-CTA.
        </p>
      </header>
      <ProductGrid category={category} />
    </main>
  );
}
