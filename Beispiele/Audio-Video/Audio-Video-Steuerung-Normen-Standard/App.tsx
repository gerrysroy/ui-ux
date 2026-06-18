import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { StandardMediaPlayer } from "./Audio-Video-Normen-Standards";

export default function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <main style={{ padding: "24px", fontFamily: "Segoe UI, sans-serif" }}>
        <h1>Audio/Video Steuerung - Normen-Standard</h1>
        <StandardMediaPlayer />
      </main>
    </FluentProvider>
  );
}
