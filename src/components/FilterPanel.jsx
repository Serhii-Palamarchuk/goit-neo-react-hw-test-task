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
      <div className={styles.group}>
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => dispatch(setLocation(e.target.value))}
          placeholder="Enter city"
        />
      </div>
      <div className={styles.group}>
        <label>Body type:</label>
        <select
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
      <div className={styles.group}>
        <label>Features:</label>
        {ALL_FEATURES.map((f) => (
          <label key={f} className={styles.feature}>
            <input
              type="checkbox"
              checked={features.includes(f)}
              onChange={() => dispatch(toggleFeature(f))}
            />{" "}
            {f}
          </label>
        ))}
      </div>
      <button onClick={() => dispatch(clearFilters())}>Clear</button>
    </div>
  );
};

export default FilterPanel;
