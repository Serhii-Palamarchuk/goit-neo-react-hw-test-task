import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCampers,
  resetCampers,
  incrementPage,
} from "../features/campers/campersSlice";
import FilterPanel from "../components/FilterPanel";
import CamperCard from "../components/CamperCard";
import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();

  // стейт з Redux
  const { items, status, error, page, limit, hasMore } = useSelector(
    (state) => state.campers
  );
  const { location, bodyType, features } = useSelector(
    (state) => state.filters
  );

  // API фільтри: тільки ті, які mockapi підтримує (form + булеві)
  const apiFilters = {};
  if (bodyType) apiFilters.form = bodyType;
  features.forEach((feat) => {
    apiFilters[feat] = true;
  });

  // При монтуванні, або зміні тільки bodyType / features – робимо запит
  useEffect(() => {
    dispatch(resetCampers());
    dispatch(fetchCampers({ page: 1, limit, filters: apiFilters }));
  }, [dispatch, bodyType, JSON.stringify(features), limit]);

  // Завантажити більше (Load More)
  const loadMore = () => {
    const next = page + 1;
    dispatch(incrementPage());
    dispatch(fetchCampers({ page: next, limit, filters: apiFilters }));
  };

  // Локальна фільтрація по текстовому полю location
  const displayedItems = items.filter((c) =>
    !location ? true : c.location.toLowerCase().includes(location.toLowerCase())
  );

  if (status === "loading" && items.length === 0) return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className={styles.wrapper}>
      <FilterPanel />
      <div className={styles.catalog}>
        {displayedItems.length ? (
          displayedItems.map((c) => <CamperCard key={c.id} camper={c} />)
        ) : (
          <p>No campers found</p>
        )}
      </div>
      {hasMore && (
        <button
          className={styles.loadMore}
          onClick={loadMore}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default CatalogPage;
