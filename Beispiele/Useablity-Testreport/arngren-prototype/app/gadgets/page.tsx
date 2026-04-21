import { ProductGrid } from "@/app/components/product-grid";

export default function GadgetsPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-5 py-8">
      <header>
        <h1 className="text-3xl font-bold">Gadgets und Elektronik</h1>
        <p className="mt-2 text-slate-600">
          Kleine Elektronikartikel mit besserer Lesbarkeit und klaren Preisen.
        </p>
      </header>
      <ProductGrid category="gadgets" />
    </main>
  );
}
