// src/pages/CamperDetailPage.jsx
import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperById } from "../features/campers/campersSlice";
import BookingForm from "../components/BookingForm";
import styles from "./CamperDetailPage.module.css";

const CamperDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // Змінюємо detail на currentCamper згідно з campersSlice
  const { currentCamper, loading, error } = useSelector((s) => s.campers);

  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading details…</p>;
  if (error) return <p>Error: {error}</p>;
  if (!currentCamper) return null;

  const {
    name,
    description,
    gallery = [],
    reviews = [],
    transmission,
    engine,
    AC,
    bathroom,
    kitchen,
    TV,
    radio,
    refrigerator,
    microwave,
    gas,
    water,
    form,
    length,
    width,
    height,
    tank,
    consumption,
    price,
  } = currentCamper;

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumbs}>
        <NavLink to="/catalog">&larr; Back to catalog</NavLink>
      </div>

      <h2 className={styles.title}>{name}</h2>
      {description && <p className={styles.description}>{description}</p>}

      {/* Галерея */}
      <div className={styles.gallery}>
        {gallery.map((img, i) => (
          <img key={i} src={img.thumb} alt={`${name} ${i + 1}`} />
        ))}
      </div>

      {/* Характеристики */}
      <ul className={styles.specs}>
        {transmission && <li>Transmission: {transmission}</li>}
        {engine && <li>Engine: {engine}</li>}
        {AC && <li>Air Conditioning</li>}
        {bathroom && <li>Bathroom</li>}
        {kitchen && <li>Kitchen</li>}
        {TV && <li>TV</li>}
        {radio && <li>Radio</li>}
        {refrigerator && <li>Refrigerator</li>}
        {microwave && <li>Microwave</li>}
        {gas && <li>Gas</li>}
        {water && <li>Water</li>}
        {form && <li>Form: {form}</li>}
        {length && <li>Length: {length}</li>}
        {width && <li>Width: {width}</li>}
        {height && <li>Height: {height}</li>}
        {tank && <li>Tank: {tank}</li>}
        {consumption && <li>Consumption: {consumption}</li>}
      </ul>

      <p className={styles.price}>
        Price:{" "}
        {new Intl.NumberFormat("en-IN", {
          minimumFractionDigits: 2,
        }).format(price)}
      </p>

      <div className={styles.bottom}>
        {/* Відгуки */}
        <div className={styles.reviews}>
          <h3>Reviews</h3>
          {reviews.length > 0 ? (
            reviews.map((r, i) => (
              <div key={i} className={styles.review}>
                <strong>{r.reviewer_name}</strong> – {r.reviewer_rating}/5
                <p>{r.review}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>

        {/* Форма бронювання */}
        <BookingForm camperId={id} />
      </div>
    </div>
  );
};

export default CamperDetailPage;
