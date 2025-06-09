// src/components/FilterPanel.jsx

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MapPin,
  Wind,
  Grid3x3,
  Tv,
  Coffee,
  Droplets,
  Truck,
  Bus,
  Home,
} from "lucide-react";
import {
  setLocation,
  setBodyType,
  toggleFeature,
} from "../features/filters/filtersSlice";
import styles from "./FilterPanel.module.css";

const FilterPanel = () => {
  const dispatch = useDispatch();
  const { location, bodyType, features } = useSelector(
    (state) => state.filters
  );

  const vehicleEquipment = [
    { key: "AC", label: "AC", icon: <Wind size={32} /> },
    { key: "transmission", label: "Automatic", icon: <Grid3x3 size={32} /> },
    { key: "kitchen", label: "Kitchen", icon: <Coffee size={32} /> },
    { key: "TV", label: "TV", icon: <Tv size={32} /> },
    { key: "bathroom", label: "Bathroom", icon: <Droplets size={32} /> },
  ];

  const vehicleTypes = [
    { key: "panelTruck", label: "Van", icon: <Truck size={32} /> },
    {
      key: "fullyIntegrated",
      label: "Fully Integrated",
      icon: <Bus size={32} />,
      shortLabel: true,
    },
    { key: "alcove", label: "Alcove", icon: <Home size={32} /> },
  ];

  return (
    <div className={styles.panel}>
      <div className={styles.section}>
        <label className={styles.sectionLabel}>Location</label>
        <div className={styles.locationInput}>
          <MapPin size={20} color="#6c717b" />
          <input
            type="text"
            placeholder="City"
            value={location}
            onChange={(e) => dispatch(setLocation(e.target.value))}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.filtersSection}>
        <h3 className={styles.sectionTitle}>Filters</h3>

        <div className={styles.subsection}>
          <label className={styles.sectionLabel}>Vehicle equipment</label>
          <div className={styles.divider}></div>
          <div className={styles.filterGrid}>
            {vehicleEquipment.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`${styles.filterButton} ${
                  features.includes(item.key) ? styles.active : ""
                }`}
                onClick={() => dispatch(toggleFeature(item.key))}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.subsection}>
          <label className={styles.sectionLabel}>Vehicle type</label>
          <div className={styles.divider}></div>
          <div className={styles.filterGrid}>
            {vehicleTypes.map((type) => (
              <button
                key={type.key}
                type="button"
                className={`${styles.filterButton} ${
                  bodyType === type.key ? styles.active : ""
                } ${type.shortLabel ? styles.shortText : ""}`}
                onClick={() =>
                  dispatch(setBodyType(type.key === bodyType ? "" : type.key))
                }
              >
                {type.icon}
                <span style={{ fontSize: type.shortLabel ? "14px" : "16px" }}>
                  {type.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button className={styles.searchButton}>Search</button>
    </div>
  );
};

export default FilterPanel;
