// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Global CSS (Tailwind v4)
import "./index.css";

// App root
import App from "./App.jsx";

// Redux store
import { Provider } from "react-redux";
import store from "./store";

// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// i18n
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

// Initialize React Query client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
);
