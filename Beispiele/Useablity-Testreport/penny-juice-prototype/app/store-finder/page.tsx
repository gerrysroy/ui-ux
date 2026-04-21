export default function StoreFinderPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Store Finder</h1>
        <p className="text-gray-700">
          Direkt erreichbar uber das Hauptmenu, damit Nutzende Verfugbarkeit schnell finden.
        </p>
      </header>

      <section className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">Standort suchen</h2>
        <p className="mt-1 text-sm text-gray-700">
          Prototyp-Interaktion: gib eine Postleitzahl oder Stadt ein.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:border-emerald-500"
            placeholder="z. B. 10115 oder Berlin"
          />
          <button className="rounded-xl bg-emerald-600 px-5 py-2.5 font-semibold text-white hover:bg-emerald-700">
            Suche starten
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-emerald-200 bg-white p-6">
        <h3 className="text-lg font-bold text-gray-900">Demo-Ergebnisse</h3>
        <ul className="mt-3 space-y-3 text-sm text-gray-800">
          <li className="rounded-xl border border-gray-200 p-3">
            Penny Market Center - Musterstr. 12, 10115 Berlin
          </li>
          <li className="rounded-xl border border-gray-200 p-3">
            Green Grocery Hub - Lindenweg 2, 10405 Berlin
          </li>
        </ul>
      </section>
    </main>
  );
}
