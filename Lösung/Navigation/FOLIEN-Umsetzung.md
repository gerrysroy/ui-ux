# Umsetzung – Stichworte (Folien-Stil)

---

## Technologie

- **Vite** + **React** + **TypeScript**
- Ein **SPA** (`App.tsx`), Styles in **`styles.css`**
- Kein Router – alles Zustand in Komponenten

---

## Zwei Navigationsmuster, eine Datenbasis

- **`navGroups`**: Kategorien **Schuhe / Marken / Service** mit Unterlinks
- **Eine Quelle** für Desktop-Mega-Menü **und** Mobile-Akkordeon
- Vermeidet doppelte Pflege, zeigt **Responsive** als **gleiche Information, anderes Layout**

---

## Desktop: Mega-Dropdown

- **Top-Navigation** (dunkle Leiste): Shop, **Kategorien** (Trigger), …
- **Hover + `:focus-within`** öffnet Panel (CSS, kein JS-Toggle)
- **Dreispaltiges Grid** (`mega-columns`): Gruppen nebeneinander
- Panel **absolut positioniert** unter dem Trigger, **z-Index** über Inhalt

---

## Mobile: Burger, Off-Canvas, Akkordeon

- **Burger-Button** → `aria-expanded`, Steuerung Off-Canvas
- **Overlay** (Backdrop) + **Seitenleiste** (`fixed`, `translateX`)
- **Escape** schließt; Fokus-Logik beim Öffnen
- **Akkordeon**: `aria-expanded` pro Gruppe, ein Panel pro `navGroups`-Eintrag
- **`simulationVisible`**: bei Wechsel zur Desktop-Ansicht Menü **schließen** (u. a. `body`-Scroll)

---

## Viewport-Simulation (Lehr-Demo)

- **Nicht** die echte Fensterbreite – **manuelle Umschaltung** Desktop ↔ Mobile
- **`simMode`** (`useState`): `desktop` | `mobile`
- **Toolbar**: Button-Gruppe, aktiver Zustand (`.active`)
- **Container** `data-active` → **CSS** blendet jeweils ein Panel aus (`display: none`)
- Verstecktes Panel: **`inert`** + **`aria-hidden`** (Fokus-Falle vermeiden)
- Desktop-Nav in der Box: **`.sim-panel-desktop .desktop-nav-wrap`** immer sichtbar (`!important`), **unabhängig** von Media-Queries

---

## Shop-Journey (Mockup im Phone)

- **`View`**-Union: Shop → Zahlung (TWINT) → Bestellung → E-Mail → Lieferung → After-Sales
- **`PaymentStage`** für Zahlungs-Flow
- **Zurück / Weiter** + direkte Sprünge (`onJump`)
- **`screenReaderStatus`** + versteckte **Live-Region** (`sr-only`)

---

## CSS-Struktur (Auszug)

- **Simulation**: `.sim-toolbar`, `.sim-viewport-root`, `.sim-panel-*`
- **Mega**: `.has-mega`, `.mega-panel`, `.mega-columns`
- **Phone**: `.phone`, `.offcanvas`, `.accordion-*`
- **`prefers-reduced-motion`**: Transitionen abschalten (global)

---

## Kurzfassung für Studierende

- **Ein Shop-Kontext**, **zwei Darstellungen** der Navigation
- **Simulation** macht den Unterschied **sichtbar**, ohne Browser zu verkleinern
- **Daten zentral**, **Präsentation** getrennt nach Geräte-Idee
