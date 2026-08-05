import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import AppRouter from "./app/router/AppRouter";
import AppProviders from "./app/providers/AppProviders";
import { AuthProvider } from "./context/AuthContext";
import { PlayerProvider } from "./context/PlayerContext";
import "./styles/globals.css";
import "./styles/scrollbar.css";
import "./styles/animations.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
  <AuthProvider>
    <PlayerProvider>

        <AppProviders>

            <AppRouter />

        </AppProviders>

    </PlayerProvider>
</AuthProvider>
</BrowserRouter>
  </React.StrictMode>
);