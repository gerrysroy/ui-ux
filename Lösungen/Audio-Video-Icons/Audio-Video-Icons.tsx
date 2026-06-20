import { useState } from "react";
import { Button } from "@fluentui/react-components";
import { Circle24Regular, Star24Regular } from "@fluentui/react-icons";

export default function AudioVideoIcons() {
  const [volume, setVolume] = useState(40);
  const [brightness, setBrightness] = useState(70);

  return (
    <section aria-labelledby="media-controls-title" style={{ maxWidth: 420 }}>
      <h2 id="media-controls-title" style={{ marginBottom: 12 }}>
        Mediensteuerung
      </h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <Button
          icon={<Star24Regular />}
          aria-label="Zu Favoriten hinzufügen"
          title="Zu Favoriten hinzufügen"
        >
          Favorit
        </Button>
        <Button
          icon={<Circle24Regular />}
          aria-label="Wiedergabe stoppen"
          title="Wiedergabe stoppen"
        >
          Stopp
        </Button>
      </div>

      <div style={{ display: "grid", gap: 16 }}>
        <div>
          <label htmlFor="volume-slider" style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Lautstärke</span>
            <strong>{volume}%</strong>
          </label>
          <input
            id="volume-slider"
            type="range"
            aria-label="Lautstärke"
            min={0}
            max={100}
            step={1}
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            style={{ width: "100%", accentColor: "#0f6cbd", height: 24, cursor: "pointer" }}
          />
        </div>

        <div>
          <label htmlFor="brightness-slider" style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Helligkeit</span>
            <strong>{brightness}%</strong>
          </label>
          <input
            id="brightness-slider"
            type="range"
            aria-label="Helligkeit"
            min={0}
            max={100}
            step={1}
            value={brightness}
            onChange={(event) => setBrightness(Number(event.target.value))}
            style={{ width: "100%", accentColor: "#0f6cbd", height: 24, cursor: "pointer" }}
          />
        </div>
      </div>
    </section>
  );
}
