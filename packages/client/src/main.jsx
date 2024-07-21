import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./Context/context";
import { SearchProvider } from "./Context/searchContext";
import { ThemeProvider } from "./Context/themeContext";
import Layout from "./components/Layout";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider>
        <SearchProvider>
          <Layout>
            <App />
          </Layout>
        </SearchProvider>
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
);
