import React from "react";
import { createRoot } from "react-dom/client";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { App } from "./App";
import "./styles.css";

type ErrorBoundaryState = {
  hasError: boolean;
  message: string;
};

class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  public constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  public componentDidCatch(error: Error): void {
    console.error("Runtime error in app:", error);
  }

  public render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <main style={{ padding: "24px", fontFamily: "Segoe UI, sans-serif" }}>
          <h1>Anwendungsfehler</h1>
          <p>Die App ist abgestuerzt. Bitte Konsole oeffnen (F12) und Fehler melden.</p>
          <pre>{this.state.message}</pre>
        </main>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <FluentProvider theme={webLightTheme}>
      <App />
    </FluentProvider>
  </ErrorBoundary>,
);
