import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Link,
  Text,
  makeStyles,
  shorthands,
  tokens,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  shell: {
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    minHeight: "420px",
    overflow: "hidden",
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.border("1px", "solid", tokens.colorNeutralStroke2),
    ...shorthands.borderRadius(tokens.borderRadiusXLarge),
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
  },
  brand: {
    display: "grid",
    gap: tokens.spacingVerticalXXS,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  navLink: {
    color: tokens.colorNeutralForegroundOnBrand,
  },
  content: {
    display: "grid",
    alignContent: "start",
    gap: tokens.spacingVerticalM,
    ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL),
  },
  panel: {
    display: "grid",
    gap: tokens.spacingVerticalXS,
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border("1px", "solid", tokens.colorNeutralStroke2),
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
  },
  footerLinks: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
  },
});

export const KopfFusszeileMiniDemo = () => {
  const styles = useStyles();

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <Text weight="semibold" size={500}>
            Lernportal
          </Text>
          <Text size={200}>Kopfzeile: Orientierung, Navigation, zentrale Aktion</Text>
        </div>

        <nav className={styles.nav} aria-label="Hauptnavigation">
          <Link className={styles.navLink} href="#">
            Kurse
          </Link>
          <Link className={styles.navLink} href="#">
            Kalender
          </Link>
          <Link className={styles.navLink} href="#">
            Ressourcen
          </Link>
          <Button appearance="primary" size="small">
            Kurs starten
          </Button>
        </nav>
      </header>

      <main className={styles.content}>
        <Text weight="semibold" size={500}>
          Willkommen zur UI/UX-Lerneinheit
        </Text>
        <Text>
          Der Inhaltsbereich bleibt bewusst ruhig, damit Kopf- und Fußzeile die globale
          Orientierung übernehmen.
        </Text>

        <section className={styles.panel} aria-label="Status der aktuellen Lerneinheit">
          <Badge appearance="filled" color="success">
            Aktiv
          </Badge>
          <Text weight="semibold">Nächster Schritt: Standardkomponenten vergleichen</Text>
          <Text size={200}>Nutzen, Priorität und Barrierefreiheit werden im Layout sichtbar.</Text>
        </section>
      </main>

      <footer className={styles.footer}>
        <Text size={200}>© 2026 UX Akademie</Text>
        <Divider vertical />
        <nav className={styles.footerLinks} aria-label="Servicenavigation">
          <Link href="#">Impressum</Link>
          <Link href="#">Datenschutz</Link>
          <Link href="#">Hilfe</Link>
        </nav>
      </footer>
    </div>
  );
};
