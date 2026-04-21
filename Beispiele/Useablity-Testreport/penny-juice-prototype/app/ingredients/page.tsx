import { juiceProducts } from "@/app/lib/penny-data";

export default function IngredientsPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Ingredients</h1>
      <p className="max-w-3xl text-gray-700">
        Transparente Uebersicht der Zutaten je Flavor, damit Nutzende schnell Vertrauen
        aufbauen koennen.
      </p>
      <div className="rounded-2xl border border-emerald-100 bg-white p-4">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-900">
              <th className="py-2">Flavor</th>
              <th className="py-2">Ingredients</th>
            </tr>
          </thead>
          <tbody>
            {juiceProducts.map((product) => (
              <tr key={product.slug} className="border-b border-gray-100 align-top">
                <td className="py-3 font-semibold text-gray-900">{product.name}</td>
                <td className="py-3 text-gray-700">{product.ingredients}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
