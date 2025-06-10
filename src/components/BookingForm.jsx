import React, { useState } from "react";
import styles from "./BookingForm.module.css";

const BookingForm = ({ camperId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking for camper:", camperId, formData);
    // Тут буде логіка відправки форми
    alert("Booking request sent!");
    setFormData({
      name: "",
      email: "",
      bookingDate: "",
      comment: "",
    });
  };

  return (
    <div className={styles.bookingForm}>
      <h3 className={styles.title}>Book your campervan now</h3>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name*"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email*"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <input
          type="date"
          name="bookingDate"
          placeholder="Booking date*"
          value={formData.bookingDate}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <textarea
          name="comment"
          placeholder="Comment"
          value={formData.comment}
          onChange={handleChange}
          rows="4"
          className={styles.textarea}
        />

        <button type="submit" className={styles.submitBtn}>
          Send
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
