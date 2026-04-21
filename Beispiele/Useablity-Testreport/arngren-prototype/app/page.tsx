import Link from "next/link";
import { ProductGrid } from "@/app/components/product-grid";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-5 py-8">
      <section className="rounded-3xl bg-gradient-to-r from-indigo-700 to-slate-900 px-8 py-10 text-white">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-indigo-100">
          UI-Verbesserung fur arngren.net
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight">
          Klickbarer Prototyp mit klarer Navigation, Produktkarten und Originalbildern.
        </h1>
        <p className="mt-4 max-w-3xl text-indigo-100">
          Diese Version reduziert visuelle Uberladung, macht Kategorien klar sichtbar
          und unterstutzt einen nachvollziehbaren Kaufprozess.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/shop"
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-indigo-100"
          >
            Shop starten
          </Link>
          <Link
            href="/vehicles"
            className="rounded-lg border border-white/60 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            E-Fahrzeuge ansehen
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {[
          ["E-Fahrzeuge", "/vehicles"],
          ["E-Bikes", "/shop?cat=bikes"],
          ["Robotik", "/shop?cat=robots"],
          ["Gadgets", "/gadgets"],
        ].map(([label, href]) => (
          <Link
            key={label}
            href={href}
            className="rounded-2xl border border-slate-200 bg-white p-4 font-semibold text-slate-900 shadow-sm hover:border-indigo-300 hover:bg-indigo-50"
          >
            {label}
          </Link>
        ))}
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Ausgewahlte Produkte</h2>
          <p className="text-slate-600">
            Bilder stammen direkt von der Originalseite arngren.net.
          </p>
        </div>
        <ProductGrid limit={6} />
      </section>
    </main>
  );
}
