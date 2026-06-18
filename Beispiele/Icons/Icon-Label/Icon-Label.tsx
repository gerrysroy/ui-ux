import { Toolbar, ToolbarButton } from "@fluentui/react-components";
import {
  Save24Regular,
  Share24Regular,
  Settings24Regular,
  Delete24Regular
} from "@fluentui/react-icons";

export function ToolbarWithLabels() {
  return (
    <Toolbar aria-label="Dokumentaktionen">
      <ToolbarButton icon={<Save24Regular />}>Speichern</ToolbarButton>
      <ToolbarButton icon={<Share24Regular />}>Teilen</ToolbarButton>
      <ToolbarButton icon={<Settings24Regular />}>Einstellungen</ToolbarButton>
      <ToolbarButton icon={<Delete24Regular />}>Löschen</ToolbarButton>
    </Toolbar>
  );
}