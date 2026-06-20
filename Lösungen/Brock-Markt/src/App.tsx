type Product = {
  id: number
  name: string
  category: 'Highlights' | 'Empfehlungen' | 'Aktionen'
  price: string
  oldPrice?: string
  badge?: string
  image: string
}

const products: Product[] = [
  { id: 1, name: 'Kapselmaschine Plus', category: 'Highlights', price: '79,99 EUR', oldPrice: '99,99 EUR', badge: '-20%', image: '/ai/p1.webp' },
  { id: 2, name: 'Smartphone Lite 128GB', category: 'Highlights', price: '229,00 EUR', oldPrice: '279,00 EUR', badge: '-18%', image: '/ai/p2.webp' },
  { id: 3, name: 'Pflege-Set Sensitive', category: 'Empfehlungen', price: '14,99 EUR', image: '/ai/p3.webp' },
  { id: 4, name: 'Kabellose In-Ears', category: 'Empfehlungen', price: '49,99 EUR', oldPrice: '69,99 EUR', badge: '-28%', image: '/ai/p4.webp' },
  { id: 5, name: 'Kinder Outdoor Bundle', category: 'Aktionen', price: '39,00 EUR', oldPrice: '55,00 EUR', badge: '-29%', image: '/ai/p5.webp' },
  { id: 6, name: 'Premium Mixer Pro', category: 'Aktionen', price: '119,00 EUR', oldPrice: '159,00 EUR', badge: '-25%', image: '/ai/p6.webp' },
]

const grouped = {
  highlights: products.filter((item) => item.category === 'Highlights'),
  recommendations: products.filter((item) => item.category === 'Empfehlungen'),
  deals: products.filter((item) => item.category === 'Aktionen'),
}

function ProductCard({ item }: { item: Product }) {
  return (
    <article className="product-card">
      {item.badge && <span className="badge">{item.badge}</span>}
      <img className="product-media" src={item.image} alt={item.name} />
      <p className="product-category">{item.category}</p>
      <h3>{item.name}</h3>
      <div className="product-price">
        <strong>{item.price}</strong>
        {item.oldPrice && <span>{item.oldPrice}</span>}
      </div>
      <button className="ghost-btn">Details</button>
    </article>
  )
}

function ProductRow({ title, items }: { title: string; items: Product[] }) {
  return (
    <section className="section">
      <div className="section-head">
        <h2>{title}</h2>
        <a href="#angebote">Alle anzeigen</a>
      </div>
      <div className="grid">
        {items.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

export default function App() {
  return (
    <div className="page">
      <header className="topbar">
        <strong>Brock Markt</strong>
        <nav>
          <a href="#angebote">Angebote</a>
          <a href="#ideen">Ideen</a>
          <a href="#service">Service</a>
        </nav>
        <button className="ghost-btn">Anmelden</button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <img
              className="hero-image"
              src="/ai/hero.webp"
              alt="Fruehlingskampagne mit Familie und Osterangeboten"
            />
            <p className="eyebrow">Fruehlingsspecial</p>
            <h1>Dein Ostern. Deine Rituale. Ein klarer Start mit starken Deals.</h1>
            <p>
              Statt vieler gleichwertiger Banner fuehren wir dich direkt zum wichtigsten Ziel:
              die besten Angebote fuer deinen Einkauf.
            </p>
            <div className="hero-actions">
              <button className="primary-btn">Jetzt Top-Angebote sichern</button>
              <button className="ghost-btn">Zu den Kategorien</button>
            </div>
          </div>
          <aside className="hero-panel">
            <img
              className="deal-image"
              src="/ai/deal.webp"
              alt="Deal des Tages aus dem Kampagnen-Screenshot"
            />
            <h2>Deal des Tages</h2>
            <p>Kabellose In-Ears</p>
            <strong>49,99 EUR</strong>
            <button className="primary-btn">In den Warenkorb</button>
          </aside>
        </section>

        <section className="value-strip" id="service">
          <div>
            <strong>Klar priorisiert</strong>
            <span>Eine primäre Handlung pro Startscreen</span>
          </div>
          <div>
            <strong>Weniger Ueberladung</strong>
            <span>Reduzierte Sektionen mit hoher Relevanz</span>
          </div>
          <div>
            <strong>Einheitliche Angebote</strong>
            <span>Gleiche Logik fuer alle Deal-Karten</span>
          </div>
        </section>

        <ProductRow title="Highlights fuer dich" items={grouped.highlights} />
        <ProductRow title="Empfehlungen auf einen Blick" items={grouped.recommendations} />

        <section className="promo-banner" id="ideen">
          <div>
            <h2>Deal-Alarm aktivieren</h2>
            <p>Erhalte die besten Aktionen zuerst und verpasse keine Osterangebote.</p>
          </div>
          <img
            className="promo-image"
            src="/ai/promo.webp"
            alt="Visual aus dem Aktionsbanner"
          />
          <button className="primary-btn">Jetzt Deal-Alarm starten</button>
        </section>

        <ProductRow title="Aktuelle Aktionen" items={grouped.deals} />
      </main>
    </div>
  )
}
