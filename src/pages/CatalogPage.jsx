import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterPanel from "../components/FilterPanel";
import CamperCard from "../components/CamperCard";
import Loader from "../components/Loader";
import {
  fetchCampers,
  loadMoreCampers,
  clearCampers,
} from "../features/campers/campersSlice";
import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error, hasMore, page } = useSelector(
    (state) => state.campers
  );

  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    // Очищуємо попередні результати перед новим пошуком
    dispatch(clearCampers());
    dispatch(fetchCampers({ ...filters, page: 1 }));
  }, [dispatch, filters]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      dispatch(loadMoreCampers({ ...filters, page: page + 1 }));
    }
  };

  if (loading && items.length === 0) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapper}>
      <FilterPanel />

      <div className={styles.content}>
        {error && <div className={styles.error}>Error: {error}</div>}

        {items.length === 0 && !loading && !error ? (
          <div className={styles.noResults}>
            No campers found matching your criteria.
          </div>
        ) : (
          <div className={styles.catalog}>
            {items.map((camper) => (
              <CamperCard key={camper.id} camper={camper} />
            ))}
          </div>
        )}

        {hasMore && items.length > 0 && (
          <button
            className={styles.loadMore}
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
