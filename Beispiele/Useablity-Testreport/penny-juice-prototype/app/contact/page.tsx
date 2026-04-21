export default function ContactPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Contact</h1>
        <p className="text-gray-700">
          Kontaktkanale sind klar priorisiert und ohne Scroll-Reibung erreichbar.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-emerald-100 bg-white p-5">
          <h2 className="text-lg font-bold text-gray-900">Email</h2>
          <p className="mt-2 text-gray-700">hello@penny-juice.com</p>
          <button className="mt-4 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
            Email schreiben
          </button>
        </article>
        <article className="rounded-2xl border border-emerald-100 bg-white p-5">
          <h2 className="text-lg font-bold text-gray-900">Phone</h2>
          <p className="mt-2 text-gray-700">+1 (000) 123-4567</p>
          <button className="mt-4 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
            Jetzt anrufen
          </button>
        </article>
      </section>
    </main>
  );
}
