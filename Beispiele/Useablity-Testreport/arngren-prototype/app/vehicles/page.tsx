import { ProductGrid } from "@/app/components/product-grid";

export default function VehiclesPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-5 py-8">
      <header>
        <h1 className="text-3xl font-bold">E-Fahrzeuge</h1>
        <p className="mt-2 text-slate-600">
          ATV, Jeeps und E-Fahrzeuge aus dem Originalkatalog in einer klaren Kategorie.
        </p>
      </header>
      <ProductGrid category="vehicles" />
    </main>
  );
}
