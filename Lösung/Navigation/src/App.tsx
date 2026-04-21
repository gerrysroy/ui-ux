import { useEffect, useId, useMemo, useRef, useState } from "react";

type View =
  | "shop"
  | "payment"
  | "order"
  | "shipping"
  | "delivery"
  | "afterSales";
type PaymentStage = "form" | "processing" | "approved";

/** Fortschrittsindex für Screenreader-Hinweise (0 = Shop, 1–4 = Phasen). */
const viewToStep: Record<View, number> = {
  shop: 0,
  payment: 1,
  order: 1,
  shipping: 2,
  delivery: 3,
  afterSales: 4
};

const PHASE_MAX = 4;

const viewLabels: Record<View, string> = {
  shop: "Shop",
  payment: "Zahlung",
  order: "Bestellung",
  shipping: "Versand-Mail",
  delivery: "Lieferung",
  afterSales: "After-Sales"
};

type NavGroup = {
  id: string;
  label: string;
  links: { label: string; href: string }[];
};

const navGroups: NavGroup[] = [
  {
    id: "schuhe",
    label: "Schuhe",
    links: [
      { label: "Herren", href: "#" },
      { label: "Damen", href: "#" },
      { label: "Kinder", href: "#" },
      { label: "Sale", href: "#" }
    ]
  },
  {
    id: "marken",
    label: "Marken",
    links: [
      { label: "Nike", href: "#" },
      { label: "adidas", href: "#" },
      { label: "New Balance", href: "#" },
      { label: "Alle Marken", href: "#" }
    ]
  },
  {
    id: "service",
    label: "Service",
    links: [
      { label: "Hilfe & FAQ", href: "#" },
      { label: "Rückgabe", href: "#" },
      { label: "Kontakt", href: "#" },
      { label: "Store-Finder", href: "#" }
    ]
  }
];

function DesktopMegaNav() {
  return (
    <div className="desktop-nav-wrap" aria-label="Desktop-Navigation (Demonstration)">
      <nav className="desktop-top-nav" aria-label="Hauptnavigation">
        <ul className="desktop-nav-list">
          <li className="desktop-nav-item">
            <a className="desktop-nav-link" href="#shop-demo">
              Shop
            </a>
          </li>
          <li className="desktop-nav-item has-mega">
            <button type="button" className="desktop-nav-trigger">
              Kategorien
              <span className="mega-chevron" aria-hidden="true">
                ▾
              </span>
            </button>
            <div
              className="mega-panel mega-panel-wide"
              role="region"
              aria-label="Alle Kategorien, gruppiert"
            >
              <div className="mega-inner mega-columns">
                {navGroups.map((group) => (
                  <div key={group.id} className="mega-col">
                    <p className="mega-group-title">{group.label}</p>
                    <ul className="mega-links">
                      {group.links.map((link) => (
                        <li key={link.label}>
                          <a href={link.href}>{link.label}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </li>
        </ul>
      </nav>
      <p className="desktop-nav-hint muted">
        Desktop: Top Navigation, Hover öffnet das Mega-Dropdown (Kategorien gruppiert).
      </p>
    </div>
  );
}

type PhoneLayout = "desktop" | "mobile";

function PhoneFlow({
  view,
  paymentStage,
  screenReaderStatus,
  onNext,
  onBack,
  onJump,
  onPaymentAuthorize,
  onPaymentApprove,
  layout,
  simulationVisible = true
}: {
  view: View;
  paymentStage: PaymentStage;
  screenReaderStatus: string;
  onNext: () => void;
  onBack: () => void;
  onJump: (nextView: View) => void;
  onPaymentAuthorize: () => void;
  onPaymentApprove: () => void;
  /** desktop: Shop direkt unter Mega-Dropdown, kein Burger/Akkordeon */
  layout: PhoneLayout;
  simulationVisible?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(navGroups[0]?.id ?? null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const menuHeadingId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!simulationVisible) {
      setMenuOpen(false);
    }
  }, [simulationVisible]);

  const toggleAccordion = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  const isDesktopLayout = layout === "desktop";

  return (
    <article
      className={`phone ${isDesktopLayout ? "phone--desktop-below-nav" : ""}`}
      aria-labelledby={isDesktopLayout ? undefined : "mockup-title"}
    >
      {!isDesktopLayout && (
        <>
          <header className="phone-header">
            <div className="phone-header-left">
              <button
                type="button"
                className="burger-btn"
                aria-expanded={menuOpen}
                aria-controls={menuHeadingId}
                onClick={() => setMenuOpen((o) => !o)}
              >
                <span className="burger-icon" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="sr-only">{menuOpen ? "Menü schliessen" : "Menü öffnen"}</span>
              </button>
              <h2 id="mockup-title" className="brand">
                StyleShop
              </h2>
            </div>
            <span className="status-pill">Live Demo</span>
          </header>

          <div
            className={`offcanvas-backdrop ${menuOpen ? "visible" : ""}`}
            aria-hidden={!menuOpen}
            onClick={() => setMenuOpen(false)}
          />

          <aside
            className={`offcanvas ${menuOpen ? "open" : ""}`}
            aria-hidden={!menuOpen}
            inert={!menuOpen}
          >
            <div className="offcanvas-header">
              <p id={menuHeadingId} className="offcanvas-title">
                Kategorien
              </p>
              <button
                ref={closeBtnRef}
                type="button"
                className="offcanvas-close"
                onClick={() => setMenuOpen(false)}
              >
                Schliessen
              </button>
            </div>
            <nav className="accordion-nav" aria-label="Kategorien">
              {navGroups.map((group) => {
                const expanded = openAccordion === group.id;
                const panelId = `acc-panel-${group.id}`;
                return (
                  <div key={group.id} className="accordion-item">
                    <button
                      type="button"
                      className="accordion-trigger"
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      id={`acc-head-${group.id}`}
                      onClick={() => toggleAccordion(group.id)}
                    >
                      <span>{group.label}</span>
                      <span className="accordion-icon" aria-hidden="true">
                        {expanded ? "−" : "+"}
                      </span>
                    </button>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={`acc-head-${group.id}`}
                      className={`accordion-panel ${expanded ? "expanded" : ""}`}
                      hidden={!expanded}
                    >
                      <ul className="accordion-links">
                        {group.links.map((link) => (
                          <li key={link.label}>
                            <a
                              href={link.href}
                              onClick={() => {
                                setMenuOpen(false);
                              }}
                            >
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </nav>
          </aside>
        </>
      )}

      <p className="sr-only" role="status" aria-live="polite">
        {screenReaderStatus}
      </p>

      {view === "shop" && (
        <section className="screen-block" aria-labelledby="shop-heading">
          <div className="search-row">
            <span className="muted">Suche nach Sneakern</span>
            <span className="cart">
              <span aria-hidden="true">🛒</span> (2)
            </span>
          </div>
          <div className="product-photo">
            <img src="/pictures/sneakers.webp" alt="Premium Sneaker in Seitenansicht" />
          </div>
          <h3 id="shop-heading" className="shop-title">
            Premium Sneaker
          </h3>
          <p className="price">CHF 129.90</p>
          <ul className="shop-meta-list">
            <li>Lieferung in 1-3 Werktagen</li>
            <li>Kostenloser Rückversand</li>
            <li>4.8/5 aus 1.245 Bewertungen</li>
          </ul>
          <p>
            ★★★★★ <span className="muted">Verifiziert</span>
          </p>
          <button type="button" className="cta" onClick={() => onJump("payment")}>
            Jetzt kaufen - zur Zahlung
          </button>
          <div className="trust-row">
            <span>Sicher bezahlen</span>
            <span>30 Tage Rückgabe</span>
          </div>
        </section>
      )}

      {view === "payment" && (
        <section className="screen-block message" aria-labelledby="payment-heading">
          <h3 id="payment-heading">TWINT Zahlung</h3>

          {paymentStage === "form" && (
            <>
              <div className="twint-card">
                <p className="twint-logo">TWINT</p>
                <p>Betrag: CHF 129.90</p>
                <p className="muted">Händler: StyleShop AG</p>
              </div>
              <p className="security-note">
                Sicher bezahlen mit TWINT. Kein Karteneintrag erforderlich.
              </p>
              <button type="button" className="cta" onClick={onPaymentAuthorize}>
                TWINT App öffnen
              </button>
            </>
          )}

          {paymentStage === "processing" && (
            <>
              <p className="processing-badge">Warte auf TWINT Bestätigung...</p>
              <div className="twint-card">
                <p>1. TWINT auf dem Smartphone öffnen</p>
                <p>2. Anfrage von StyleShop bestätigen</p>
                <p>3. Betrag freigeben</p>
              </div>
              <p>
                Simulierter Sicherheitscode: <strong>778 231</strong>
              </p>
              <button type="button" className="cta" onClick={onPaymentApprove}>
                In TWINT bestätigt (simulieren)
              </button>
            </>
          )}

          {paymentStage === "approved" && (
            <>
              <p className="processing-badge success-badge">✓ Zahlung erfolgreich autorisiert</p>
              <p>Betrag: CHF 129.90 • Referenz: PAY-48291</p>
              <button type="button" className="cta" onClick={() => onJump("order")}>
                Bestellung final abschliessen
              </button>
            </>
          )}
        </section>
      )}

      {view === "order" && (
        <section className="screen-block message success" aria-labelledby="order-heading">
          <h3 id="order-heading">Bestellung erfolgreich abgeschlossen</h3>
          <p>Bestellnummer: #48291</p>
          <p>Lieferung: Mittwoch, 14. Mai</p>
          <p className="muted">Sendungsverfolgung per E-Mail</p>
          <button type="button" className="cta" onClick={() => onJump("shipping")}>
            Weiter zur Versand-Mail
          </button>
        </section>
      )}

      {view === "shipping" && (
        <section className="screen-block message" aria-labelledby="shipping-heading">
          <h3 id="shipping-heading">
            <span aria-hidden="true">📧 </span>Deine Bestellung wurde versendet!
          </h3>
          <p>
            Dein Paket ist unterwegs. Hier ist deine Sendungsverfolgung mit
            Live-Status.
          </p>
          <p className="muted">Lieferfenster: 10-12 Uhr</p>
          <button type="button" className="cta ghost">
            Tracking-Link öffnen
          </button>
          <button type="button" className="cta" onClick={() => onJump("delivery")}>
            Lieferung simulieren
          </button>
        </section>
      )}

      {view === "delivery" && (
        <section className="screen-block message success" aria-labelledby="delivery-heading">
          <h3 id="delivery-heading">
            <span aria-hidden="true">📦 </span>Paket zugestellt
          </h3>
          <ul className="clean-list">
            <li>✓ Pünktlich angekommen</li>
            <li>✓ Unbeschädigte Verpackung</li>
            <li>✓ Persönliche Dankeskarte</li>
            <li>✓ Rücksendeaufkleber beigelegt</li>
          </ul>
          <button type="button" className="cta" onClick={() => onJump("afterSales")}>
            2 Tage weiter
          </button>
        </section>
      )}

      {view === "afterSales" && (
        <section className="screen-block message" aria-labelledby="after-sales-heading">
          <h3 id="after-sales-heading">
            <span aria-hidden="true">📧 </span>Passt alles mit deinen Sneakern?
          </h3>
          <p>Wir sind für dich da, falls etwas nicht passen sollte.</p>
          <div className="button-row">
            <button type="button" className="cta ghost">
              Rückgabe starten
            </button>
            <button type="button" className="cta ghost">
              Support-Chat öffnen
            </button>
          </div>
        </section>
      )}

      <nav className="flow-controls" aria-label="Navigation durch die Demo-Schritte">
        <button type="button" className="secondary" onClick={onBack} disabled={view === "shop"}>
          Zurück
        </button>
        <button
          type="button"
          className="secondary"
          onClick={onNext}
          disabled={view === "afterSales" || (view === "payment" && paymentStage !== "approved")}
        >
          Weiter
        </button>
      </nav>

      <footer className="phone-footer-hint muted">
        {isDesktopLayout
          ? "Desktop: Kategorien über das Mega-Dropdown oben; Shop-Inhalt schliesst direkt an."
          : "Mobile: Burger-Icon, Off-Canvas und Akkordeon für die Kategorien."}
      </footer>
    </article>
  );
}

type SimMode = "desktop" | "mobile";

function App() {
  const [view, setView] = useState<View>("shop");
  const [paymentStage, setPaymentStage] = useState<PaymentStage>("form");
  const [simMode, setSimMode] = useState<SimMode>("desktop");
  const phaseIndex = viewToStep[view];

  const orderedViews: View[] = [
    "shop",
    "payment",
    "order",
    "shipping",
    "delivery",
    "afterSales"
  ];

  const setViewSafely = (nextView: View) => {
    setView(nextView);
    if (nextView === "payment") {
      setPaymentStage("form");
    }
  };

  const screenReaderStatus = useMemo(() => {
    if (view === "payment") {
      if (paymentStage === "form") {
        return "Schritt Zahlung. Bitte TWINT Zahlung starten.";
      }
      if (paymentStage === "processing") {
        return "Schritt Zahlung. Warte auf TWINT Bestaetigung.";
      }
      return "Schritt Zahlung. TWINT Zahlung erfolgreich autorisiert.";
    }
    return `Schritt ${phaseIndex} von ${PHASE_MAX}: ${viewLabels[view]}.`;
  }, [view, paymentStage, phaseIndex]);

  const goNext = () => {
    if (view === "payment" && paymentStage !== "approved") {
      return;
    }
    const currentIndex = orderedViews.indexOf(view);
    const nextIndex = Math.min(currentIndex + 1, orderedViews.length - 1);
    setViewSafely(orderedViews[nextIndex]);
  };

  const goBack = () => {
    const currentIndex = orderedViews.indexOf(view);
    const nextIndex = Math.max(currentIndex - 1, 0);
    setViewSafely(orderedViews[nextIndex]);
  };

  return (
    <>
      <main className="page">
        <section className="hero" aria-labelledby="main-title" id="shop-demo">
          <div className="intro-card">
            <p className="eyebrow">UI/UX Unterrichtsbeispiel</p>
            <h1 id="main-title">Klickbares UI/UX Mockup: End-to-End Experience</h1>
            <p>
              Interaktives Unterrichtsbeispiel, das den Übergang von guter UI zu
              ganzheitlicher UX sichtbar macht.
            </p>
            <div className="pill-row">
              <span className="pill">Gute UI: klare visuelle Struktur</span>
              <span className="pill">Gute UX: geringe Reibung</span>
              <span className="pill">Ganzheitlich: Kommunikation + Service</span>
            </div>
          </div>

          <div className="sim-toolbar" aria-label="Viewport-Simulation">
            <div className="sim-toolbar-row">
              <span className="sim-label">
                Ansicht: <strong>{simMode === "desktop" ? "Desktop" : "Mobile"}</strong>
              </span>
              <div className="sim-btn-group" role="group" aria-label="Desktop oder Mobile anzeigen">
                <button
                  type="button"
                  className={`sim-btn ${simMode === "desktop" ? "active" : ""}`}
                  aria-pressed={simMode === "desktop"}
                  onClick={() => setSimMode("desktop")}
                >
                  Desktop
                </button>
                <button
                  type="button"
                  className={`sim-btn ${simMode === "mobile" ? "active" : ""}`}
                  aria-pressed={simMode === "mobile"}
                  onClick={() => setSimMode("mobile")}
                >
                  Mobile
                </button>
              </div>
            </div>
            <p className="sim-hint muted">
              Desktop: Mega-Dropdown, darunter der Shop (ohne Burger/Akkordeon). Mobile:
              Smartphone mit Burger-Menü und Akkordeon. Unabhängig von der Browserbreite.
            </p>
            <p className="sr-only" role="status" aria-live="polite">
              {`Ansicht ${simMode === "desktop" ? "Desktop" : "Mobile"}.`}
            </p>
          </div>

          <div className="sim-viewport-root" data-active={simMode}>
            <div
              className="sim-panel sim-panel-desktop"
              aria-hidden={simMode !== "desktop"}
              inert={simMode !== "desktop" ? true : undefined}
            >
              <DesktopMegaNav />
            </div>
            <div className="sim-panel sim-panel-content">
              <PhoneFlow
                layout={simMode}
                view={view}
                paymentStage={paymentStage}
                screenReaderStatus={screenReaderStatus}
                onNext={goNext}
                onBack={goBack}
                onJump={setViewSafely}
                onPaymentAuthorize={() => setPaymentStage("processing")}
                onPaymentApprove={() => setPaymentStage("approved")}
                simulationVisible={simMode === "mobile"}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
