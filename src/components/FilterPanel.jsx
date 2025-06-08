// src/components/FilterPanel.jsx

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLocation,
  setBodyType,
  toggleFeature,
  clearFilters,
} from "../features/filters/filtersSlice";
import styles from "./FilterPanel.module.css";

const ALL_BODY_TYPES = ["alcove", "van", "classC", "classA"];
const ALL_FEATURES = ["AC", "kitchen", "bathroom", "TV", "radio", "microwave"];

const FilterPanel = () => {
  const dispatch = useDispatch();
  const { location, bodyType, features } = useSelector(
    (state) => state.filters
  );

  return (
    <div className={styles.panel}>
      {/* Location */}
      <div className={styles.group}>
        <label htmlFor="loc">Location:</label>
        <input
          id="loc"
          type="text"
          placeholder="Enter city"
          value={location}
          onChange={(e) => dispatch(setLocation(e.target.value))}
        />
      </div>

      {/* Body Type */}
      <div className={styles.group}>
        <label htmlFor="body">Body type:</label>
        <select
          id="body"
          value={bodyType}
          onChange={(e) => dispatch(setBodyType(e.target.value))}
        >
          <option value="">All</option>
          {ALL_BODY_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Features */}
      <div className={styles.features}>
        {ALL_FEATURES.map((f) => (
          <label key={f}>
            <input
              type="checkbox"
              checked={features.includes(f)}
              onChange={() => dispatch(toggleFeature(f))}
            />
            {f}
          </label>
        ))}
      </div>

      {/* Clear */}
      <button
        className={styles.clearBtn}
        onClick={() => dispatch(clearFilters())}
      >
        Clear
      </button>
    </div>
  );
};

export default FilterPanel;
