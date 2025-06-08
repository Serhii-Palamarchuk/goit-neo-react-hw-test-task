import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterPanel from "../components/FilterPanel";
import CamperCard from "../components/CamperCard";
import SkeletonCard from "../components/SkeletonCard";
import {
  fetchCampers,
  resetCampers,
  incrementPage,
} from "../features/campers/campersSlice";
import styles from "./CatalogPage.module.css";

export default function CatalogPage() {
  const dispatch = useDispatch();
  const { items, status, error, page, limit, hasMore } = useSelector(
    (state) => state.campers
  );
  const { location, bodyType, features } = useSelector(
    (state) => state.filters
  );

  // Готуємо фільтри для бекенду
  const apiFilters = {};
  if (bodyType) apiFilters.form = bodyType;
  features.forEach((f) => {
    apiFilters[f] = true;
  });

  // При зміні фільтрів — скинути список і завантажити з початку
  useEffect(() => {
    dispatch(resetCampers());
    dispatch(fetchCampers({ page: 1, limit, filters: apiFilters }));
  }, [dispatch, limit, bodyType, JSON.stringify(features)]);

  // Локальна фільтрація по локації
  const displayed = items.filter((c) =>
    location?.trim()
      ? c.location.toLowerCase().includes(location.toLowerCase())
      : true
  );

  return (
    <div className={styles.wrapper}>
      <FilterPanel />

      <div className={styles.cardsContainer}>
        {status === "loading" && items.length === 0 ? (
          <div className={styles.catalog}>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={`skeleton-${i}`} />
            ))}
          </div>
        ) : (
          <div className={styles.catalog}>
            {displayed.length > 0 ? (
              displayed.map((c, idx) => (
                <CamperCard key={`card-p${page}-i${idx}`} camper={c} />
              ))
            ) : (
              <p>No campers found.</p>
            )}
          </div>
        )}
      </div>

      {status === "failed" && <p className={styles.error}>Error: {error}</p>}

      {hasMore && status === "succeeded" && (
        <button
          className={styles.loadMore}
          onClick={() => {
            dispatch(incrementPage());
            dispatch(
              fetchCampers({ page: page + 1, limit, filters: apiFilters })
            );
          }}
          disabled={status === "loading"}
        >
          Load More
        </button>
      )}
    </div>
  );
}
