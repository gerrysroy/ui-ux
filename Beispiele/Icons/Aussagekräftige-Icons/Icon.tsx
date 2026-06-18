import { Button } from "@fluentui/react-components";
import {
  Search24Regular,
  Home24Regular,
  Delete24Regular,
  Save24Regular
} from "@fluentui/react-icons";

export function MeaningfulIcons() {
  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Button icon={<Search24Regular />}>Suchen</Button>
      <Button icon={<Home24Regular />}>Startseite</Button>
      <Button icon={<Save24Regular />}>Speichern</Button>
      <Button icon={<Delete24Regular />}>Löschen</Button>
    </div>
  );
}