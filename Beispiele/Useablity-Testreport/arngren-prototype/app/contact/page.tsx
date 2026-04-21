export default function ContactPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-5 py-8">
      <header>
        <h1 className="text-3xl font-bold">Kontakt und Bestellung</h1>
        <p className="mt-2 text-slate-600">
          Klar strukturierter Kontaktbereich als verbesserter Einstieg fur Kaufanfragen.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold">Direkter Kontakt</h2>
          <p className="mt-2 text-sm text-slate-700">Telefon: +47-22149166</p>
          <p className="text-sm text-slate-700">Mobil: +47-92060873</p>
          <p className="text-sm text-slate-700">E-Mail: frithjof@arngren.net</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold">Bestellung (Prototyp)</h2>
          <p className="mt-2 text-sm text-slate-700">
            1) Produkt wahlen, 2) Anfrage senden, 3) Zahlungsdetails erhalten.
          </p>
          <button className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
            Anfrage starten
          </button>
        </article>
      </section>
    </main>
  );
}
