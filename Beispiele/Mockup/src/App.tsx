import "./styles/wireframe.css";
import { useMemo, useState } from "react";

const tabs = [
  { id: "home", icon: "\u2302", label: "Home" },
  { id: "search", icon: "\ud83d\udd0d", label: "Suche" },
  { id: "cart", icon: "\ud83d\uded2", label: "Warenkorb" },
  { id: "profile", icon: "\ud83d\udc64", label: "Profil" }
] as const;

const categories = ["Elektronik", "Haushalt", "Mode", "Sport"];

const offers = [
  { title: "Bluetooth Lautsprecher", price: "39,99 EUR" },
  { title: "Smartwatch Active", price: "79,90 EUR" }
];

const recommendations = [
  { title: "Kabellose Kopfhoerer", info: "Top bewertet" },
  { title: "Rucksack Urban", info: "Bestseller" }
];

function App() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("home");
  const activeTabLabel = useMemo(
    () => tabs.find((tab) => tab.id === activeTab)?.label ?? "Home",
    [activeTab]
  );

  return (
    <main className="page">
      <section className="tablet-shell">
        <div className="camera-dot" />

        <article className="wireframe-card">
          <header className="row row-logo">
            <div className="brand">
              <span className="brand-mark">ShopNow</span>
              <small className="brand-subtitle">Aktiver Bereich: {activeTabLabel}</small>
            </div>
          </header>

          <nav className="row row-icons" aria-label="Navigation">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`icon-box ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
                aria-label={tab.label}
              >
                {tab.icon}
              </button>
            ))}
          </nav>

          <section className="content-row">
            <h2>Kategorien</h2>
            <div className="chip-list">
              {categories.map((category) => (
                <button key={category} className="chip">
                  {category}
                </button>
              ))}
            </div>
          </section>

          <section className="content-row">
            <h2>Angebote</h2>
            <ul className="card-list">
              {offers.map((offer) => (
                <li key={offer.title} className="info-card">
                  <strong>{offer.title}</strong>
                  <span>{offer.price}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="content-row">
            <h2>Empfehlungen</h2>
            <ul className="card-list">
              {recommendations.map((item) => (
                <li key={item.title} className="info-card">
                  <strong>{item.title}</strong>
                  <span>{item.info}</span>
                </li>
              ))}
            </ul>
          </section>
        </article>

        <div className="home-button-wrap">
          <div className="home-button">
            <div className="home-button-inner" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
