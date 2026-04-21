import Link from "next/link";
import { ProductGrid } from "@/app/components/product-grid";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-6 py-10">
      <section className="rounded-3xl bg-gradient-to-r from-emerald-700 to-lime-600 px-8 py-12 text-white">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider">
          Fresh Fruits, Better Navigation
        </p>
        <h1 className="max-w-2xl text-4xl font-bold leading-tight">
          Organic juices mit klarerem Nutzerfluss vom ersten Klick bis zum Store Finder.
        </h1>
        <p className="mt-4 max-w-2xl text-emerald-50">
          Dieser klickbare Prototyp setzt die Empfehlungen aus dem Test um: direkte
          Orientierung, eindeutige CTAs und ein prominenter Zugriff auf Verfügbarkeit.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/shop"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-100"
          >
            Jetzt Shop ansehen
          </Link>
          <Link
            href="/store-finder"
            className="rounded-full border border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Store Finder starten
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Beliebte Flavors</h2>
            <p className="text-gray-700">
              Offizielle Produktbilder aus dem Penny-Juice-Shop.
            </p>
          </div>
          <Link href="/shop" className="text-sm font-semibold text-emerald-700 hover:underline">
            Alle Produkte
          </Link>
        </div>
        <ProductGrid compact />
      </section>
    </main>
  );
}
