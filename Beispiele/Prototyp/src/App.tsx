import "./styles/wireframe.css";
import { useMemo, useState } from "react";

const tabs = [
  { id: "home", icon: "\u2302", label: "Home" },
  { id: "search", icon: "\ud83d\udd0d", label: "Suche" },
  { id: "cart", icon: "\ud83d\uded2", label: "Warenkorb" },
  { id: "profile", icon: "\ud83d\udc64", label: "Profil" }
] as const;

const categories = ["Elektronik", "Haushalt", "Mode", "Sport"];

const products = [
  { id: "p1", title: "Bluetooth Lautsprecher", price: 39.99, category: "Elektronik", badge: "Top-Deal" },
  { id: "p2", title: "Smartwatch Active", price: 79.9, category: "Elektronik", badge: "Neu" },
  { id: "p3", title: "Mixer Pro 500", price: 54.5, category: "Haushalt", badge: "Beliebt" },
  { id: "p4", title: "Rucksack Urban", price: 44.9, category: "Mode", badge: "Bestseller" },
  { id: "p5", title: "Yoga Matte Plus", price: 29.0, category: "Sport", badge: "Empfohlen" }
];

const recommendations = [
  { id: "p6", title: "Kabellose Kopfhoerer", info: "Top bewertet", price: 69.9, category: "Elektronik" },
  { id: "p7", title: "Laufshirt DryFit", info: "Bestseller", price: 24.9, category: "Sport" }
];

const profileActions = ["Benachrichtigungen", "Adressen", "Zahlungsmethoden", "Bestellverlauf"];

type Product = (typeof products)[number];
type Recommendation = (typeof recommendations)[number];
type Item = Product | Recommendation;

function formatCurrency(value: number) {
  return `${value.toFixed(2).replace(".", ",")} EUR`;
}

function App() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("home");
  const [activeCategory, setActiveCategory] = useState<string>("Alle");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [selectedProfileAction, setSelectedProfileAction] = useState(profileActions[0]);
  const [message, setMessage] = useState("Willkommen bei ShopNow.");

  const activeTabLabel = useMemo(
    () => tabs.find((tab) => tab.id === activeTab)?.label ?? "Home",
    [activeTab]
  );
  const allCategories = useMemo(() => ["Alle", ...categories], []);
  const allItems = useMemo(() => [...products, ...recommendations], []);

  const visibleOffers = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory === "Alle" || product.category === activeCategory;
      const matchesSearch =
        searchTerm.trim() === "" || product.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const visibleRecommendations = useMemo(() => {
    return recommendations.filter((item) => {
      const matchesCategory = activeCategory === "Alle" || item.category === activeCategory;
      const matchesSearch =
        searchTerm.trim() === "" || item.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const totalCartItems = useMemo(
    () => Object.values(cartItems).reduce((total, qty) => total + qty, 0),
    [cartItems]
  );
  const cartTotal = useMemo(() => {
    return Object.entries(cartItems).reduce((sum, [id, qty]) => {
      const item = allItems.find((product) => product.id === id);
      return sum + (item?.price ?? 0) * qty;
    }, 0);
  }, [allItems, cartItems]);

  const cartList = useMemo(() => {
    return Object.entries(cartItems)
      .map(([id, qty]) => {
        const item = allItems.find((entry) => entry.id === id);
        if (!item) return null;
        return { ...item, qty };
      })
      .filter((item): item is Item & { qty: number } => item !== null);
  }, [allItems, cartItems]);

  function addToCart(item: Item) {
    setCartItems((current) => ({
      ...current,
      [item.id]: (current[item.id] ?? 0) + 1
    }));
    setMessage(`${item.title} wurde zum Warenkorb hinzugefuegt.`);
  }

  function removeFromCart(itemId: string) {
    setCartItems((current) => {
      const count = current[itemId] ?? 0;
      if (count <= 1) {
        const { [itemId]: _removed, ...rest } = current;
        return rest;
      }
      return { ...current, [itemId]: count - 1 };
    });
  }

  function toggleFavorite(itemId: string, title: string) {
    setFavorites((current) => {
      if (current.includes(itemId)) {
        setMessage(`${title} wurde aus Favoriten entfernt.`);
        return current.filter((id) => id !== itemId);
      }
      setMessage(`${title} wurde als Favorit gespeichert.`);
      return [...current, itemId];
    });
  }

  return (
    <main className="page">
      <section className="tablet-shell">
        <div className="camera-dot" />

        <article className="wireframe-card">
          <header className="row row-logo">
            <div className="brand">
              <span className="brand-mark">ShopNow</span>
              <small className="brand-subtitle">
                Aktiver Bereich: {activeTabLabel} | Artikel im Warenkorb: {totalCartItems}
              </small>
            </div>
          </header>

          <nav className="row row-icons" aria-label="Navigation">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`icon-box ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMessage(`${tab.label} geoeffnet.`);
                }}
                aria-label={tab.label}
              >
                {tab.icon}
              </button>
            ))}
          </nav>

          {activeTab !== "cart" && activeTab !== "profile" && (
            <>
              <section className="content-row">
                <h2>Kategorien</h2>
                <div className="chip-list">
                  {allCategories.map((category) => (
                    <button
                      key={category}
                      className={`chip ${activeCategory === category ? "active" : ""}`}
                      onClick={() => {
                        setActiveCategory(category);
                        setMessage(`Kategorie ${category} aktiv.`);
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </section>

              <section className="content-row">
                <h2>{activeTab === "search" ? "Suche" : "Angebote"}</h2>
                <div className="search-wrap">
                  <input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Produkte suchen..."
                    aria-label="Produkte suchen"
                  />
                  <button
                    className="ghost-btn"
                    onClick={() => {
                      setSearchTerm("");
                      setMessage("Suche zurueckgesetzt.");
                    }}
                  >
                    Reset
                  </button>
                </div>
                <ul className="card-list">
                  {visibleOffers.length === 0 && <li className="empty-state">Keine Treffer gefunden.</li>}
                  {visibleOffers.map((offer) => {
                    const isFavorite = favorites.includes(offer.id);
                    return (
                      <li key={offer.id} className="info-card">
                        <div className="info-main">
                          <strong>{offer.title}</strong>
                          <span>{formatCurrency(offer.price)}</span>
                          <small>{offer.badge}</small>
                        </div>
                        <div className="actions">
                          <button className="small-btn" onClick={() => addToCart(offer)}>
                            In den Warenkorb
                          </button>
                          <button
                            className={`small-btn ${isFavorite ? "active" : ""}`}
                            onClick={() => toggleFavorite(offer.id, offer.title)}
                          >
                            {isFavorite ? "Favorit" : "Merken"}
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>

              <section className="content-row">
                <h2>Empfehlungen</h2>
                <ul className="card-list">
                  {visibleRecommendations.length === 0 && (
                    <li className="empty-state">Keine Empfehlungen fuer diesen Filter.</li>
                  )}
                  {visibleRecommendations.map((item) => {
                    const isFavorite = favorites.includes(item.id);
                    return (
                      <li key={item.id} className="info-card">
                        <div className="info-main">
                          <strong>{item.title}</strong>
                          <span>{item.info}</span>
                        </div>
                        <div className="actions">
                          <button className="small-btn" onClick={() => addToCart(item)}>
                            Hinzufuegen
                          </button>
                          <button
                            className={`small-btn ${isFavorite ? "active" : ""}`}
                            onClick={() => toggleFavorite(item.id, item.title)}
                          >
                            {isFavorite ? "Favorit" : "Merken"}
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </>
          )}

          {activeTab === "cart" && (
            <section className="content-row">
              <h2>Warenkorb</h2>
              <ul className="card-list">
                {cartList.length === 0 && <li className="empty-state">Dein Warenkorb ist leer.</li>}
                {cartList.map((item) => (
                  <li key={item.id} className="info-card">
                    <div className="info-main">
                      <strong>{item.title}</strong>
                      <span>
                        {item.qty} x {formatCurrency(item.price)}
                      </span>
                    </div>
                    <div className="actions">
                      <button className="small-btn" onClick={() => addToCart(item)}>
                        +
                      </button>
                      <button className="small-btn" onClick={() => removeFromCart(item.id)}>
                        -
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="checkout-row">
                <strong>Gesamt: {formatCurrency(cartTotal)}</strong>
                <button
                  className="small-btn active"
                  onClick={() => setMessage("Checkout simuliert. Bestellung erfolgreich vorbereitet.")}
                  disabled={cartList.length === 0}
                >
                  Checkout
                </button>
              </div>
            </section>
          )}

          {activeTab === "profile" && (
            <section className="content-row">
              <h2>Profil</h2>
              <div className="chip-list">
                {profileActions.map((action) => (
                  <button
                    key={action}
                    className={`chip ${selectedProfileAction === action ? "active" : ""}`}
                    onClick={() => {
                      setSelectedProfileAction(action);
                      setMessage(`${action} geoeffnet.`);
                    }}
                  >
                    {action}
                  </button>
                ))}
              </div>
              <p className="profile-state">
                Aktive Einstellung: <strong>{selectedProfileAction}</strong>
              </p>
              <button
                className="small-btn"
                onClick={() => {
                  setFavorites([]);
                  setCartItems({});
                  setSearchTerm("");
                  setActiveCategory("Alle");
                  setMessage("Demo-Daten wurden zurueckgesetzt.");
                }}
              >
                Demo zuruecksetzen
              </button>
            </section>
          )}

          <footer className="status-row" aria-live="polite">
            {message}
          </footer>
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
