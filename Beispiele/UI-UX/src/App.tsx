import { useState } from "react";

type ScenarioStep = {
  id: number;
  title: string;
  shortLabel: string;
  channel: string;
  lead: string;
  points: string[];
};

const steps: ScenarioStep[] = [
  {
    id: 1,
    title: "Phase 1: Bestellung",
    shortLabel: "Bestellung",
    channel: "Website Checkout",
    lead: "Bestellung erfolgreich abgeschlossen",
    points: [
      "Bestellnummer: #48291",
      "Lieferung: Mittwoch, 14. Mai",
      "Sendungsverfolgung per E-Mail"
    ]
  },
  {
    id: 2,
    title: "Phase 2: Proaktive Kommunikation",
    shortLabel: "Versand-Mail",
    channel: "E-Mail",
    lead: '"Deine Bestellung wurde versendet!"',
    points: ["Tracking-Link", "Voraussichtliches Lieferfenster: 10-12 Uhr"]
  },
  {
    id: 3,
    title: "Phase 3: Lieferung",
    shortLabel: "Lieferung",
    channel: "Paketzustellung",
    lead: "Paket kommt pünktlich",
    points: [
      "Unbeschädigte Verpackung",
      "Persönliche Dankeskarte",
      "Einfacher Rücksendeaufkleber beigelegt"
    ]
  },
  {
    id: 4,
    title: "Phase 4: After-Sales",
    shortLabel: "After-Sales",
    channel: "E-Mail + Support",
    lead: '"Passt alles mit deinen Sneakern?" (2 Tage später)',
    points: ["Direkter Rückgabe-Button", "Support-Chat erreichbar"]
  }
];

type View =
  | "shop"
  | "payment"
  | "order"
  | "shipping"
  | "delivery"
  | "afterSales";
type PaymentStage = "form" | "processing" | "approved";

const viewToStep: Record<View, number> = {
  shop: 0,
  payment: 1,
  order: 1,
  shipping: 2,
  delivery: 3,
  afterSales: 4
};

function PhoneFlow({
  view,
  paymentStage,
  onNext,
  onBack,
  onJump,
  onPaymentAuthorize,
  onPaymentApprove
}: {
  view: View;
  paymentStage: PaymentStage;
  onNext: () => void;
  onBack: () => void;
  onJump: (nextView: View) => void;
  onPaymentAuthorize: () => void;
  onPaymentApprove: () => void;
}) {
  return (
    <article className="phone">
      <header className="phone-header">
        <span className="brand">StyleShop</span>
        <span className="status-pill">Live Demo</span>
      </header>

      {view === "shop" && (
        <section className="screen-block">
          <div className="search-row">
            <span className="muted">Suche nach Sneakern</span>
            <span className="cart">🛒 (2)</span>
          </div>
          <div className="product-photo">
            <img src="/pictures/sneakers.webp" alt="Premium Sneaker in Seitenansicht" />
          </div>
          <h3 className="shop-title">Premium Sneaker</h3>
          <p className="price">CHF 129.90</p>
          <ul className="shop-meta-list">
            <li>Lieferung in 1-3 Werktagen</li>
            <li>Kostenloser Rückversand</li>
            <li>4.8/5 aus 1.245 Bewertungen</li>
          </ul>
          <p>
            ★★★★★ <span className="muted">Verifiziert</span>
          </p>
          <button className="cta" onClick={() => onJump("payment")}>
            Jetzt kaufen - zur Zahlung
          </button>
          <div className="trust-row">
            <span>Sicher bezahlen</span>
            <span>30 Tage Rückgabe</span>
          </div>
        </section>
      )}

      {view === "payment" && (
        <section className="screen-block message">
          <h3>TWINT Zahlung</h3>

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
              <button className="cta" onClick={onPaymentAuthorize}>
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
              <button className="cta" onClick={onPaymentApprove}>
                In TWINT bestätigt (simulieren)
              </button>
            </>
          )}

          {paymentStage === "approved" && (
            <>
              <p className="processing-badge success-badge">✓ Zahlung erfolgreich autorisiert</p>
              <p>Betrag: CHF 129.90 • Referenz: PAY-48291</p>
              <button className="cta" onClick={() => onJump("order")}>
                Bestellung final abschliessen
              </button>
            </>
          )}
        </section>
      )}

      {view === "order" && (
        <section className="screen-block message success">
          <h3>Bestellung erfolgreich abgeschlossen</h3>
          <p>Bestellnummer: #48291</p>
          <p>Lieferung: Mittwoch, 14. Mai</p>
          <p className="muted">Sendungsverfolgung per E-Mail</p>
          <button className="cta" onClick={() => onJump("shipping")}>
            Weiter zur Versand-Mail
          </button>
        </section>
      )}

      {view === "shipping" && (
        <section className="screen-block message">
          <h3>📧 Deine Bestellung wurde versendet!</h3>
          <p>
            Dein Paket ist unterwegs. Hier ist deine Sendungsverfolgung mit
            Live-Status.
          </p>
          <p className="muted">Lieferfenster: 10-12 Uhr</p>
          <button className="cta ghost">Tracking-Link öffnen</button>
          <button className="cta" onClick={() => onJump("delivery")}>
            Lieferung simulieren
          </button>
        </section>
      )}

      {view === "delivery" && (
        <section className="screen-block message success">
          <h3>📦 Paket zugestellt</h3>
          <ul className="clean-list">
            <li>✓ Pünktlich angekommen</li>
            <li>✓ Unbeschädigte Verpackung</li>
            <li>✓ Persönliche Dankeskarte</li>
            <li>✓ Rücksendeaufkleber beigelegt</li>
          </ul>
          <button className="cta" onClick={() => onJump("afterSales")}>
            2 Tage weiter
          </button>
        </section>
      )}

      {view === "afterSales" && (
        <section className="screen-block message">
          <h3>📧 Passt alles mit deinen Sneakern?</h3>
          <p>Wir sind für dich da, falls etwas nicht passen sollte.</p>
          <div className="button-row">
            <button className="cta ghost">Rückgabe starten</button>
            <button className="cta ghost">Support-Chat öffnen</button>
          </div>
        </section>
      )}

      <div className="flow-controls">
        <button className="secondary" onClick={onBack} disabled={view === "shop"}>
          Zurück
        </button>
        <button
          className="secondary"
          onClick={onNext}
          disabled={view === "afterSales" || (view === "payment" && paymentStage !== "approved")}
        >
          Weiter
        </button>
      </div>

      <footer className="tabbar">
        <span className="active-tab">Shop</span>
        <span>Kategorien</span>
        <span>Favoriten</span>
        <span>Profil</span>
      </footer>
    </article>
  );
}

function App() {
  const [view, setView] = useState<View>("shop");
  const [paymentStage, setPaymentStage] = useState<PaymentStage>("form");
  const progress = viewToStep[view];

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
    <main className="page">
      <section className="hero">
        <div className="intro-card">
          <p className="eyebrow">UI/UX Unterrichtsbeispiel</p>
          <h1>Klickbares UI/UX Mockup: End-to-End Experience</h1>
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

        <PhoneFlow
          view={view}
          paymentStage={paymentStage}
          onNext={goNext}
          onBack={goBack}
          onJump={setViewSafely}
          onPaymentAuthorize={() => setPaymentStage("processing")}
          onPaymentApprove={() => setPaymentStage("approved")}
        />
      </section>

      <section className="journey">
        <h2>Customer Journey (klickbar)</h2>
        <div className="timeline">
          {steps.map((step) => {
            const isDone = step.id <= progress;
            const isCurrent = step.id === progress;

            return (
              <article
                key={step.id}
                className={`phase-card ${isDone ? "done" : ""} ${
                  isCurrent ? "current" : ""
                }`}
              >
                <div className="phase-top">
                  <span className="phase-id">{step.id}</span>
                  <span className="phase-channel">{step.channel}</span>
                </div>
                <h3>{step.title}</h3>
                <p className="phase-lead">{step.lead}</p>
                <ul>
                  {step.points.map((item) => (
                    <li key={item}>✓ {item}</li>
                  ))}
                </ul>
                <button
                  className="jump"
                  onClick={() =>
                    setViewSafely(
                      (["order", "shipping", "delivery", "afterSales"][
                        step.id - 1
                      ] as View) ?? "order"
                    )
                  }
                >
                  Zu {step.shortLabel}
                </button>
              </article>
            );
          })}
        </div>
      </section>

    </main>
  );
}

export default App;
