import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import AppRouter from "@/app/router/AppRouter";
import AppProviders from "@/app/providers/AppProviders";
import { PlayerProvider } from "@/context/PlayerContext";

import "./styles/globals.css";
import "./styles/scrollbar.css";
import "./styles/animations.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProviders>
        <PlayerProvider>
          <AppRouter />
        </PlayerProvider>
      </AppProviders>
    </BrowserRouter>
  </React.StrictMode>
);