// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import CamperDetailPage from "./pages/CamperDetailPage";
import Loader from "./components/Loader";

function App() {
  const loading = useSelector(
    (state) =>
      state.campers.status === "loading" ||
      state.campers.detailStatus === "loading"
  );

  return (
    <>
      {loading && <Loader />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CamperDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
