import Link from "next/link";

export default function LearnPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Learn</h1>
      <p className="max-w-3xl text-gray-700">
        Inspirationsbereich mit klaren Anschlussaktionen, damit Nutzende nicht im
        Content stecken bleiben.
      </p>
      <section className="grid gap-4 md:grid-cols-3">
        {[
          "What makes plant-based juice refreshing?",
          "How to pair flavors with meals",
          "Sustainability and sourcing highlights",
        ].map((topic) => (
          <article key={topic} className="rounded-2xl border border-emerald-100 bg-white p-5">
            <h2 className="font-bold text-gray-900">{topic}</h2>
            <p className="mt-2 text-sm text-gray-700">
              Kurzer Teasertext als Platzhalter fuer den klickbaren Prototyp.
            </p>
            <Link href="/shop" className="mt-4 inline-block text-sm font-semibold text-emerald-700 hover:underline">
              Passende Produkte ansehen
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
