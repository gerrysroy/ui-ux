import { Toolbar, ToolbarButton, Tooltip } from "@fluentui/react-components";
import {
  Save24Regular,
  Share24Regular,
  Settings24Regular,
  Delete24Regular
} from "@fluentui/react-icons";

export function ToolbarWithTooltips() {
  const tooltipContentStyle: React.CSSProperties = {
    backgroundColor: "#ffeb3b",
    color: "#000",
    padding: "4px 8px",
    borderRadius: "4px"
  };

  return (
    <Toolbar aria-label="Dokumentaktionen">
      <Tooltip content={<span style={tooltipContentStyle}>Speichern</span>} relationship="label" positioning="below">
        <ToolbarButton aria-label="Speichern" icon={<Save24Regular />} />
      </Tooltip>
      <Tooltip content={<span style={tooltipContentStyle}>Teilen</span>} relationship="label" positioning="below">
        <ToolbarButton aria-label="Teilen" icon={<Share24Regular />} />
      </Tooltip>
      <Tooltip content={<span style={tooltipContentStyle}>Einstellungen</span>} relationship="label" positioning="below">
        <ToolbarButton aria-label="Einstellungen" icon={<Settings24Regular />} />
      </Tooltip>
      <Tooltip content={<span style={tooltipContentStyle}>Löschen</span>} relationship="label" positioning="below">
        <ToolbarButton aria-label="Löschen" icon={<Delete24Regular />} />
      </Tooltip>
    </Toolbar>
  );
}