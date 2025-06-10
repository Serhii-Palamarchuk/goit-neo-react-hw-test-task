import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperById } from "../features/campers/campersSlice";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import BookingForm from "../components/BookingForm";
import Icon from "../components/Icon";
import { Star, MapPin, Heart } from "lucide-react";
import styles from "./CamperDetailPage.module.css";

const CamperDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentCamper, loading, error } = useSelector((s) => s.campers);
  const favorites = useSelector((state) => state.favorites?.items || []);
  const [activeTab, setActiveTab] = useState("features");

  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!currentCamper) return null;

  const isFavorite =
    currentCamper && currentCamper.id
      ? favorites.includes(currentCamper.id)
      : false;
  const averageRating = currentCamper.rating || 0;
  const reviewsCount = currentCamper.reviews?.length || 0;

  const handleFavoriteToggle = () => {
    if (currentCamper && currentCamper.id) {
      console.log("Current camper ID:", currentCamper.id);
      console.log("Current favorites:", favorites);
      dispatch(toggleFavorite(currentCamper.id));
    } else {
      console.error("No camper ID available");
    }
  };

  const getBadges = () => {
    const badges = [];

    if (currentCamper.transmission === "automatic") {
      badges.push({
        icon: <Icon name="automatic" size={20} />,
        text: "Automatic",
      });
    }
    if (currentCamper.engine === "petrol") {
      badges.push({ icon: <Icon name="petrol" size={20} />, text: "Petrol" });
    }
    if (currentCamper.engine === "diesel") {
      badges.push({ icon: <Icon name="diesel" size={20} />, text: "Diesel" });
    }
    if (currentCamper.AC) {
      badges.push({ icon: <Icon name="ac" size={20} />, text: "AC" });
    }
    if (currentCamper.bathroom) {
      badges.push({
        icon: <Icon name="bathroom" size={20} />,
        text: "Bathroom",
      });
    }
    if (currentCamper.kitchen) {
      badges.push({ icon: <Icon name="kitchen" size={20} />, text: "Kitchen" });
    }
    if (currentCamper.TV) {
      badges.push({ icon: <Icon name="tv" size={20} />, text: "TV" });
    }
    if (currentCamper.form === "van") {
      badges.push({ icon: <Icon name="van" size={20} />, text: "Van" });
    }
    if (currentCamper.form === "fullyIntegrated") {
      badges.push({
        icon: <Icon name="integrated" size={20} />,
        text: "Fully Integrated",
      });
    }
    if (currentCamper.form === "alcove") {
      badges.push({ icon: <Icon name="alcove" size={20} />, text: "Alcove" });
    }

    return badges;
  };

  const getVehicleDetails = () => {
    return [
      { label: "Form", value: currentCamper.form },
      { label: "Length", value: currentCamper.length },
      { label: "Width", value: currentCamper.width },
      { label: "Height", value: currentCamper.height },
      { label: "Tank", value: currentCamper.tank },
      { label: "Consumption", value: currentCamper.consumption },
    ].filter((item) => item.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{currentCamper.name}</h1>

        <div className={styles.headerInfo}>
          <div className={styles.ratingLocation}>
            <div className={styles.rating}>
              <Star size={16} className={styles.starIcon} />
              <span className={styles.ratingText}>
                {averageRating}({reviewsCount} Reviews)
              </span>
            </div>
            <div className={styles.location}>
              <MapPin size={16} className={styles.locationIcon} />
              <span>{currentCamper.location}</span>
            </div>
          </div>
        </div>

        <div className={styles.priceAndFav}>
          <span className={styles.price}>
            €{currentCamper.price?.toFixed(2)}
          </span>
          <button
            className={`${styles.favoriteBtn} ${
              isFavorite ? styles.active : ""
            }`}
            onClick={handleFavoriteToggle}
          >
            <Heart size={24} fill={isFavorite ? "#e44848" : "none"} />
          </button>
        </div>
      </div>

      {/* Gallery */}
      <div className={styles.gallery}>
        {currentCamper.gallery?.map((img, index) => (
          <img
            key={index}
            src={img.thumb}
            alt={`${currentCamper.name} ${index + 1}`}
            className={styles.galleryImage}
          />
        ))}
      </div>

      {/* Description */}
      <p className={styles.description}>{currentCamper.description}</p>

      {/* Content */}
      <div className={styles.content}>
        {/* Left side - Tabs */}
        <div className={styles.leftPanel}>
          {/* Tab Navigation */}
          <div className={styles.tabNavigation}>
            <button
              className={`${styles.tabBtn} ${
                activeTab === "features" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("features")}
            >
              Features
            </button>
            <button
              className={`${styles.tabBtn} ${
                activeTab === "reviews" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>

          {/* Tab Content */}
          <div className={styles.tabContent}>
            {activeTab === "features" && (
              <div className={styles.featuresTab}>
                {/* Badges */}
                <div className={styles.badges}>
                  {getBadges().map((badge, index) => (
                    <div key={index} className={styles.badge}>
                      {badge.icon}
                      <span>{badge.text}</span>
                    </div>
                  ))}
                </div>

                {/* Vehicle Details */}
                <div className={styles.vehicleDetails}>
                  <h3 className={styles.detailsTitle}>Vehicle details</h3>
                  <div className={styles.detailsList}>
                    {getVehicleDetails().map((detail, index) => (
                      <div key={index} className={styles.detailItem}>
                        <span className={styles.detailLabel}>
                          {detail.label}
                        </span>
                        <span className={styles.detailValue}>
                          {detail.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className={styles.reviewsTab}>
                {currentCamper.reviews?.length > 0 ? (
                  currentCamper.reviews.map((review, index) => (
                    <div key={index} className={styles.review}>
                      <div className={styles.reviewHeader}>
                        <div className={styles.reviewerAvatar}>
                          {review.reviewer_name.charAt(0).toUpperCase()}
                        </div>
                        <div className={styles.reviewerInfo}>
                          <h4 className={styles.reviewerName}>
                            {review.reviewer_name}
                          </h4>
                          <div className={styles.reviewRating}>
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={`${styles.reviewStar} ${
                                  i < review.reviewer_rating
                                    ? styles.filled
                                    : ""
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className={styles.reviewComment}>
                        {review.comment ||
                          review.review ||
                          "No comment provided"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className={styles.noReviews}>No reviews yet.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right side - Booking Form */}
        <div className={styles.rightPanel}>
          <BookingForm camperId={id} />
        </div>
      </div>
    </div>
  );
};

export default CamperDetailPage;
