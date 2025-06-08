import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterPanel from "../components/FilterPanel";
import CamperCard from "../components/CamperCard";
import Loader from "../components/Loader";
import {
  fetchCampers,
  resetCampers,
  incrementPage,
} from "../features/campers/campersSlice";
import styles from "./CatalogPage.module.css";
import SkeletonCard from "../components/SkeletonCard";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items, status, error, page, limit, hasMore } = useSelector(
    (state) => state.campers
  );
  const { location, bodyType, features } = useSelector(
    (state) => state.filters
  );

  // Формуємо apiFilters тут (як раніше)
  const apiFilters = {};
  if (bodyType) apiFilters.form = bodyType;
  features.forEach((feat) => (apiFilters[feat] = true));

  useEffect(() => {
    dispatch(resetCampers());
    dispatch(fetchCampers({ page: 1, limit, filters: apiFilters }));
  }, [dispatch, bodyType, JSON.stringify(features), limit]);

  const loadMore = () => {
    const next = page + 1;
    dispatch(incrementPage());
    dispatch(fetchCampers({ page: next, limit, filters: apiFilters }));
  };

  // Локальна фільтрація по location
  const displayedItems = items.filter((c) =>
    !location ? true : c.location.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <div className={styles.wrapper}>
      <FilterPanel />

      {/* Локальний лоадер тільки для секції карток */}
      <div className={styles.cardsContainer}>
        {status === "loading" && items.length === 0 && (
          <div className={styles.cardsLoader}>
            <Loader small />
          </div>
        )}

        <div className={styles.catalog}>
          {status === "loading" && items.length === 0
            ? // поки вперше вантажимо — рендеримо скелетони замість даних
              Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : displayedItems.map((c) => <CamperCard key={c.id} camper={c} />)}
        </div>
      </div>

      {hasMore && status === "succeeded" && (
        <button
          className={styles.loadMore}
          onClick={loadMore}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Loading..." : "Load More"}
        </button>
      )}

      {status === "failed" && <p className={styles.error}>Error: {error}</p>}
    </div>
  );
};

export default CatalogPage;
