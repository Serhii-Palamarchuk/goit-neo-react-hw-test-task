import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MapPin } from "lucide-react";
import Icon from "./Icon";
import {
  setLocation,
  setBodyType,
  toggleFeature,
} from "../features/filters/filtersSlice";
import { fetchCampers, clearCampers } from "../features/campers/campersSlice";
import styles from "./FilterPanel.module.css";

const FilterPanel = () => {
  const dispatch = useDispatch();
  const { location, bodyType, features } = useSelector(
    (state) => state.filters
  );

  const vehicleEquipment = [
    { key: "AC", label: "AC", icon: <Icon name="ac" size={32} /> },
    {
      key: "transmission",
      label: "Automatic",
      icon: <Icon name="automatic" size={32} />,
    },
    {
      key: "kitchen",
      label: "Kitchen",
      icon: <Icon name="kitchen" size={32} />,
    },
    { key: "TV", label: "TV", icon: <Icon name="tv" size={32} /> },
    {
      key: "bathroom",
      label: "Bathroom",
      icon: <Icon name="bathroom" size={32} />,
    },
  ];

  const vehicleTypes = [
    { key: "panelTruck", label: "Van", icon: <Icon name="van" size={32} /> },
    {
      key: "fullyIntegrated",
      label: "Fully Integrated",
      icon: <Icon name="integrated" size={32} />,
    },
    { key: "alcove", label: "Alcove", icon: <Icon name="alcove" size={32} /> },
  ];

  const handleSearch = () => {
    dispatch(clearCampers());

    const filterParams = {
      location,
      bodyType,
      features,
      page: 1,
    };

    dispatch(fetchCampers(filterParams));
  };

  return (
    <div className={styles.panel}>
      {/* Location Section */}
      <div className={styles.locationSection}>
        <label className={styles.label}>Location</label>
        <div className={styles.inputWrapper}>
          <MapPin size={20} className={styles.inputIcon} />
          <input
            type="text"
            placeholder="City"
            value={location}
            onChange={(e) => dispatch(setLocation(e.target.value))}
            className={styles.locationInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
      </div>

      {/* Filters Section */}
      <div className={styles.filtersContainer}>
        <h3 className={styles.filtersTitle}>Filters</h3>

        {/* Vehicle Equipment */}
        <div className={styles.filterSection}>
          <h4 className={styles.filterLabel}>Vehicle equipment</h4>
          <hr className={styles.divider} />
          <div className={styles.filterGrid}>
            {vehicleEquipment.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`${styles.filterBtn} ${
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

        {/* Vehicle Type */}
        <div className={styles.filterSection}>
          <h4 className={styles.filterLabel}>Vehicle type</h4>
          <hr className={styles.divider} />
          <div className={styles.filterGrid}>
            {vehicleTypes.map((type) => (
              <button
                key={type.key}
                type="button"
                className={`${styles.filterBtn} ${
                  bodyType === type.key ? styles.active : ""
                }`}
                onClick={() =>
                  dispatch(setBodyType(type.key === bodyType ? "" : type.key))
                }
              >
                {type.icon}
                <span
                  className={
                    type.key === "fullyIntegrated" ? styles.smallText : ""
                  }
                >
                  {type.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Button */}
      <button className={styles.searchBtn} onClick={handleSearch} type="button">
        Search
      </button>
    </div>
  );
};

export default FilterPanel;
