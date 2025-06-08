import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import FavoritesPage from "./pages/FavoritesPage";
import CamperDetailPage from "./pages/CamperDetailPage";

function App() {
  // Покажемо full-screen Loader лише під час завантаження деталей
  const detailLoading = useSelector(
    (state) => state.campers.detailStatus === "loading"
  );

  return (
    <>
      <Navbar />
      {detailLoading && <Loader />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/catalog/:id" element={<CamperDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
