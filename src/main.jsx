import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import CountryView from "./views/CountryView.jsx";
import HomeView from "./views/HomeView.jsx";

const root = document.getElementById("root");

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<HomeView />} />
        <Route path="/country/:id" element={<CountryView />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
